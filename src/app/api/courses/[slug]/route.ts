import { db } from "@/lib/db";
import { handle, json, error } from "@/lib/http";

/**
 * GET /api/courses/[slug]
 * Course detail: prerequisites, unlocks, resources, curriculum placement.
 */
export const GET = handle(
  async (_request: Request, context?: Record<string, unknown>) => {
    const { slug } = await (context!.params as Promise<{ slug: string }>);

    const course = await db.course.findUnique({
      where: { slug },
      include: {
        university: { select: { name: true, slug: true, country: true } },
        prerequisites: {
          include: {
            prerequisite: { select: { slug: true, code: true, title: true, units: true } },
          },
        },
        unlocks: {
          include: {
            course: { select: { slug: true, code: true, title: true, units: true } },
          },
        },
        resources: {
          select: {
            slug: true,
            title: true,
            type: true,
            url: true,
            year: true,
            qualityScore: true,
            verified: true,
            instructor: true,
          },
        },
        entries: {
          include: {
            curriculum: {
              select: {
                name: true,
                degree: {
                  select: { name: true, slug: true, university: { select: { name: true } } },
                },
              },
            },
          },
        },
      },
    });

    if (!course) return error(404, "Course not found");
    return json(course);
  },
);

