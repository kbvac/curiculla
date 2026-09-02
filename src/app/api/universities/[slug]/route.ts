import { db } from "@/lib/db";
import { handle, json, notFound } from "@/lib/http";

export const GET = handle(async (_request: Request, context?: Record<string, unknown>) => {
  const { slug } = await (context!.params as Promise<{ slug: string }>);

  const university = await db.university.findUnique({
    where: { slug },
    include: {
      degrees: {
        include: {
          curricula: {
            include: {
              courses: {
                include: { course: { select: { slug: true, code: true, title: true } } },
                orderBy: { order: "asc" },
              },
            },
          },
        },
      },
      _count: { select: { courses: true, resources: true } },
    },
  });

  if (!university) return notFound("University");
  return json(university);
});
