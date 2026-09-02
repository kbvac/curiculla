import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, json, badRequest, notFound, forbidden } from "@/lib/http";

/** Guard: the path must exist and belong to the caller. */
async function requireOwnedPath(userId: string, slug: string) {
  const path = await db.learningPath.findUnique({ where: { slug } });
  if (!path) return notFound("Parcours");
  if (path.ownerId !== userId) return forbidden("Ce parcours n'est pas le tien");
  return path;
}

async function nextOrder(pathId: string): Promise<number> {
  const last = await db.learningPathStep.findFirst({
    where: { pathId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  return (last?.order ?? -1) + 1;
}

/**
 * POST /api/my/paths/[slug]/steps
 * Add a step: either an existing skill (skillId) or a free entry (title + url).
 */
export const POST = handle(
  async (request: Request, context?: Record<string, unknown>) => {
    const user = await requireUser();
    const { slug } = await (context!.params as Promise<{ slug: string }>);
    const owned = await requireOwnedPath(user.id, slug);
    if (owned instanceof Response) return owned;

    const schema = z.union([
      z.object({
        kind: z.literal("skill"),
        skillId: z.string().min(1),
        phase: z.string().max(40).default("PERSO"),
      }),
      z.object({
        kind: z.literal("custom"),
        title: z.string().min(2).max(200),
        url: z.string().url().optional(),
        phase: z.string().max(40).default("PERSO"),
      }),
    ]);
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Étape invalide");

    const order = await nextOrder(owned.id);

    if (parsed.data.kind === "skill") {
      const skill = await db.skill.findUnique({ where: { id: parsed.data.skillId } });
      if (!skill) return badRequest("Skill inconnu");
      const dup = await db.learningPathStep.findFirst({
        where: { pathId: owned.id, skillId: skill.id },
        select: { id: true },
      });
      if (dup) return badRequest("Ce skill est déjà dans le parcours");
      const step = await db.learningPathStep.create({
        data: {
          pathId: owned.id,
          skillId: skill.id,
          phase: parsed.data.phase,
          order,
          isRequired: true,
        },
        include: { skill: { select: { slug: true, name: true } } },
      });
      return json(step, { status: 201 });
    }

    // Custom step: free title (+ optional URL), self-contained on the step
    const step = await db.learningPathStep.create({
      data: {
        pathId: owned.id,
        skillId: null,
        courseId: null,
        customTitle: parsed.data.title,
        customUrl: parsed.data.url ?? null,
        phase: parsed.data.phase,
        order,
        isRequired: true,
      },
    });
    return json(step, { status: 201 });
  },
);

/**
 * PATCH /api/my/paths/[slug]/steps
 * { stepId, direction: "up" | "down" } — reorder
 * { stepId, isRequired } — toggle
 * { stepId, phase } — rename phase
 */
export const PATCH = handle(
  async (request: Request, context?: Record<string, unknown>) => {
    const user = await requireUser();
    const { slug } = await (context!.params as Promise<{ slug: string }>);
    const owned = await requireOwnedPath(user.id, slug);
    if (owned instanceof Response) return owned;

    const schema = z.union([
      z.object({ stepId: z.string(), direction: z.enum(["up", "down"]) }),
      z.object({ stepId: z.string(), isRequired: z.boolean() }),
      z.object({ stepId: z.string(), phase: z.string().max(40) }),
    ]);
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Requête invalide");
    const { stepId } = parsed.data;

    const step = await db.learningPathStep.findFirst({
      where: { id: stepId, pathId: owned.id },
    });
    if (!step) return notFound("Étape");

    if ("direction" in parsed.data) {
      const swap = await db.learningPathStep.findFirst({
        where: {
          pathId: owned.id,
          order: parsed.data.direction === "up" ? { lt: step.order } : { gt: step.order },
        },
        orderBy: { order: parsed.data.direction === "up" ? "desc" : "asc" },
      });
      if (swap) {
        await db.$transaction([
          db.learningPathStep.update({ where: { id: swap.id }, data: { order: step.order } }),
          db.learningPathStep.update({ where: { id: step.id }, data: { order: swap.order } }),
        ]);
      }
      return json({ moved: true });
    }

    if ("isRequired" in parsed.data) {
      await db.learningPathStep.update({
        where: { id: step.id },
        data: { isRequired: parsed.data.isRequired },
      });
      return json({ isRequired: parsed.data.isRequired });
    }

    await db.learningPathStep.update({
      where: { id: step.id },
      data: { phase: parsed.data.phase },
    });
    return json({ phase: parsed.data.phase });
  },
);

/**
 * DELETE /api/my/paths/[slug]/steps?stepId=
 */
export const DELETE = handle(
  async (request: Request, context?: Record<string, unknown>) => {
    const user = await requireUser();
    const { slug } = await (context!.params as Promise<{ slug: string }>);
    const owned = await requireOwnedPath(user.id, slug);
    if (owned instanceof Response) return owned;

    const stepId = new URL(request.url).searchParams.get("stepId");
    if (!stepId) return badRequest("Missing stepId");

    const step = await db.learningPathStep.findFirst({
      where: { id: stepId, pathId: owned.id },
    });
    if (!step) return notFound("Étape");

    await db.learningPathStep.delete({ where: { id: step.id } });
    return json({ removed: stepId });
  },
);
