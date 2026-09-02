import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getPathProgress, computeStreak } from "@/lib/skills";
import { handle, json } from "@/lib/http";

export const GET = handle(async () => {
  const user = await requireUser();

  const activeGoal = await db.userGoal.findFirst({
    where: { userId: user.id, status: "ACTIVE" },
    include: {
      path: {
        include: {
          domain: { select: { name: true, slug: true } },
          _count: { select: { steps: true } },
        },
      },
    },
  });

  let progress = null;
  if (activeGoal) {
    progress = await getPathProgress(user.id, activeGoal.path.slug);
  }

  const streak = await computeStreak(user.id);

  // Continue learning: find last accessed resource
  const lastProgress = await db.userProgress.findFirst({
    where: { userId: user.id, status: "IN_PROGRESS" },
    include: { resource: { select: { slug: true, title: true, url: true } } },
    orderBy: { lastAccessedAt: "desc" },
  });

  return json({
    goal: activeGoal,
    progress,
    streak,
    lastAccessed: lastProgress,
  });
});
