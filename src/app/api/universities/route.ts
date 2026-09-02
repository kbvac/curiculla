import { db } from "@/lib/db";
import { handle, json } from "@/lib/http";

export const GET = handle(async () => {
  const universities = await db.university.findMany({
    orderBy: { reputation: "desc" },
    include: {
      _count: { select: { degrees: true, courses: true, resources: true } },
    },
  });
  return json(universities);
});
