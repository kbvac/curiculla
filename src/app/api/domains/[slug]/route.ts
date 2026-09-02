import { db } from "@/lib/db";
import { handle, json, notFound } from "@/lib/http";

export const GET = handle(async (_request: Request, context?: Record<string, unknown>) => {
  const { slug } = await (context!.params as Promise<{ slug: string }>);
  const domain = await db.domain.findUnique({
    where: { slug },
    include: {
      subjects: {
        include: {
          topics: {
            include: {
              skills: {
                include: {
                  _count: { select: { resources: true, prerequisites: true } },
                },
              },
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
      paths: {
        include: { _count: { select: { steps: true } } },
        orderBy: { order: "asc" },
      },
    },
  });
  if (!domain) return notFound("Domain");
  return json(domain);
});
