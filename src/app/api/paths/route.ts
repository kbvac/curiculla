import { db } from "@/lib/db";
import { handle, json } from "@/lib/http";

export const GET = handle(async () => {
  const paths = await db.learningPath.findMany({
    orderBy: { order: "asc" },
    include: {
      domain: { select: { name: true, slug: true } },
      _count: { select: { steps: true, userGoals: true } },
    },
  });
  return json(paths);
});
