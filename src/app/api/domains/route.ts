import { db } from "@/lib/db";
import { handle, json } from "@/lib/http";

export const GET = handle(async () => {
  const domains = await db.domain.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { subjects: true, paths: true } },
    },
  });
  return json(domains);
});
