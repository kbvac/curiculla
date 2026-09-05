import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, json, badRequest } from "@/lib/http";

/**
 * GET /api/my/paths — the user's personally built paths.
 */
export const GET = handle(async () => {
  const user = await requireUser();
  const paths = await db.learningPath.findMany({
    where: { ownerId: user.id },
    include: { _count: { select: { steps: true } }, domain: { select: { name: true, slug: true } } },
    orderBy: { name: "asc" },
  });
  return json(paths);
});

const createSchema = z.object({
  name: z.string().min(2).max(120),
  tagline: z.string().max(200).optional(),
  domainSlug: z.string().min(1),
  cloneFrom: z.string().min(1).optional(),
});

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * POST /api/my/paths — create a personal path owned by the user.
 */
export const POST = handle(async (request: Request) => {
  const user = await requireUser();
  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) return badRequest("Invalid input");

  const domain = await db.domain.findUnique({ where: { slug: parsed.data.domainSlug } });
  if (!domain) return badRequest(`Domaine inconnu: ${parsed.data.domainSlug}`);

  const base = `u-${slugify(parsed.data.name)}`;
  let slug = base;
  let i = 1;
  while (await db.learningPath.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  const path = await db.learningPath.create({
    data: {
      slug,
      domainId: domain.id,
      ownerId: user.id,
      name: parsed.data.name,
      tagline: parsed.data.tagline ?? "Parcours personnel",
      order: 200,
    },
  });

  // Clone mode: deep-copy every step of an existing path (official or library)
  let cloned = 0;
  if (parsed.data.cloneFrom) {
    const source = await db.learningPath.findUnique({
      where: { slug: parsed.data.cloneFrom },
      include: { steps: { orderBy: { order: "asc" } } },
    });
    if (!source) return badRequest("Parcours source inconnu");
    await db.learningPathStep.createMany({
      data: source.steps.map((st) => ({
        pathId: path.id,
        skillId: st.skillId,
        courseId: st.courseId,
        customTitle: st.customTitle,
        customUrl: st.customUrl,
        phase: st.phase,
        order: st.order,
        isRequired: st.isRequired,
        origin: "MANUAL", // personal copy: everything is hand-owned from here
      })),
    });
    cloned = source.steps.length;
  }

  return json({ ...path, cloned }, { status: 201 });
});
