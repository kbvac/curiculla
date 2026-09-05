import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, json, error, badRequest, forbidden, notFound } from "@/lib/http";

/** Only hand-added team resources are editable — official imports are rebuilt. */
async function requireTeamResource(
  userId: string,
  role: string,
  slug: string,
  resourceId: string,
) {
  if (role !== "ADMIN" && role !== "CONTRIBUTOR") {
    return { error: forbidden("Réservé à l'équipe du programme") as Response };
  }
  const course = await db.course.findUnique({ where: { slug }, select: { id: true } });
  if (!course) return { error: error(404, "Course not found") as Response };
  const resource = await db.resource.findUnique({ where: { id: resourceId } });
  if (!resource || resource.courseId !== course.id) {
    return { error: notFound("Resource") as Response };
  }
  if (!resource.slug.startsWith("team-")) {
    return {
      error: forbidden("Seuls les liens ajoutés par l'équipe sont modifiables") as Response,
    };
  }
  void userId;
  return { course, resource };
}

const patchSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  url: z.string().url().max(500).optional(),
  type: z
    .enum(["LECTURE", "LECTURE_NOTES", "BOOK", "EXERCISE", "EXAM", "VIDEO", "DOCUMENTATION"])
    .optional(),
  instructor: z.string().max(120).nullable().optional(),
  year: z.number().int().min(1990).max(2035).nullable().optional(),
});

/**
 * PATCH /api/courses/[slug]/resources/[resourceId]
 * Edit a team-added resource link.
 */
export const PATCH = handle(
  async (request: Request, context?: Record<string, unknown>) => {
    const user = await requireUser();
    const params = (await (context!.params as Promise<{
      slug: string;
      resourceId: string;
    }>));
    const checked = await requireTeamResource(user.id, user.role, params.slug, params.resourceId);
    if ("error" in checked) return checked.error;

    const parsed = patchSchema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Données invalides");

    const updated = await db.resource.update({
      where: { id: checked.resource.id },
      data: {
        ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
        ...(parsed.data.url !== undefined ? { url: parsed.data.url } : {}),
        ...(parsed.data.type !== undefined ? { type: parsed.data.type } : {}),
        ...(parsed.data.instructor !== undefined
          ? { instructor: parsed.data.instructor || null }
          : {}),
        ...(parsed.data.year !== undefined ? { year: parsed.data.year } : {}),
      },
    });
    return json(updated);
  },
);

/**
 * DELETE /api/courses/[slug]/resources/[resourceId]
 * Remove a team-added resource link (plus its skill links and progress rows).
 */
export const DELETE = handle(
  async (_request: Request, context?: Record<string, unknown>) => {
    const user = await requireUser();
    const params = (await (context!.params as Promise<{
      slug: string;
      resourceId: string;
    }>));
    const checked = await requireTeamResource(user.id, user.role, params.slug, params.resourceId);
    if ("error" in checked) return checked.error;

    await db.resourceSkill.deleteMany({ where: { resourceId: checked.resource.id } });
    await db.userProgress.deleteMany({ where: { resourceId: checked.resource.id } });
    await db.resource.delete({ where: { id: checked.resource.id } });
    return json({ removed: checked.resource.id });
  },
);
