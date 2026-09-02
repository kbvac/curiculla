import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getPathProgress } from "@/lib/skills";
import { handle, json, notFound } from "@/lib/http";

export const GET = handle(async (request: Request, context?: Record<string, unknown>) => {
  const { slug } = await (context!.params as Promise<{ slug: string }>);
  const user = await getCurrentUser();

  const path = await db.learningPath.findUnique({
    where: { slug },
    include: {
      domain: { select: { name: true, slug: true } },
      steps: {
        include: {
          skill: {
            include: {
              resources: {
                include: { resource: true },
                where: { isPrimary: true },
                take: 1,
              },
              prerequisites: { select: { prerequisite: { select: { slug: true, name: true } } } },
            },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!path) return notFound("Learning Path");

  let progress = null;
  if (user) {
    progress = await getPathProgress(user.id, slug);
  }

  return json({ ...path, progress });
});
