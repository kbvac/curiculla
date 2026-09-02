import { db } from "@/lib/db";
import { handle, json } from "@/lib/http";

/**
 * GET /api/courses?university=ucsd&level=UPPER_DIVISION
 * List courses, optionally filtered by university slug.
 */
export const GET = handle(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const universitySlug = searchParams.get("university");
  const catalogLevel = searchParams.get("level");

  const where = {
    ...(universitySlug ? { university: { slug: universitySlug } } : {}),
    ...(catalogLevel ? { catalogLevel } : {}),
  };

  const courses = await db.course.findMany({
    where,
    include: {
      university: { select: { name: true, slug: true } },
      _count: {
        select: { prerequisites: true, unlocks: true, resources: true },
      },
    },
    orderBy: [{ university: { name: "asc" } }, { code: "asc" }],
  });

  return json(courses);
});
