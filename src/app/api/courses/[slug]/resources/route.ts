import { z } from "zod";
import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, json, error, badRequest, forbidden } from "@/lib/http";

const contributeSchema = z.object({
  title: z.string().min(2).max(200),
  url: z.string().url().max(500),
  type: z
    .enum(["LECTURE", "LECTURE_NOTES", "BOOK", "EXERCISE", "EXAM", "VIDEO", "DOCUMENTATION"])
    .default("LECTURE"),
  instructor: z.string().max(120).optional(),
  year: z.number().int().min(1990).max(2035).optional(),
});

/**
 * POST /api/courses/[slug]/resources
 * Program team only (ADMIN / CONTRIBUTOR): attach a hand-picked resource
 * link to a course — for resources the official import cannot find.
 */
export const POST = handle(
  async (request: Request, context?: Record<string, unknown>) => {
    const user = await requireUser();
    if (user.role !== "ADMIN" && user.role !== "CONTRIBUTOR") {
      return forbidden("Réservé à l'équipe du programme");
    }
    const { slug } = await (context!.params as Promise<{ slug: string }>);
    const course = await db.course.findUnique({
      where: { slug },
      select: { id: true, code: true, universityId: true },
    });
    if (!course) return error(404, "Course not found");

    const parsed = contributeSchema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Lien invalide (titre + URL requis)");

    const resource = await db.resource.create({
      data: {
        slug: `team-${randomBytes(6).toString("hex")}`,
        title: parsed.data.title,
        type: parsed.data.type,
        url: parsed.data.url,
        instructor: parsed.data.instructor,
        year: parsed.data.year,
        language: "en",
        universityId: course.universityId,
        courseId: course.id,
        verified: true,
        qualityScore: 80,
        qualityMeta: JSON.stringify({
          reasons: [`Ajouté par l'équipe du programme (${user.email})`],
        }),
      },
    });
    return json(resource, { status: 201 });
  },
);
