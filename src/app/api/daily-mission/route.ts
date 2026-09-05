import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getPathProgress } from "@/lib/skills";
import { getDueSessions } from "@/lib/schedule";
import { handle, json } from "@/lib/http";

export const GET = handle(async () => {
  const user = await getCurrentUser();
  if (!user) {
    return json({ missions: [], streak: 0 });
  }

  // Get active goal
  const activeGoal = await db.userGoal.findFirst({
    where: { userId: user.id, status: "ACTIVE" },
    include: { path: { select: { slug: true, name: true } } },
  });

  if (!activeGoal) {
    return json({ missions: [], streak: 0 });
  }

  // ── Priority 1: sessions dues du plan personnel (distribuées sur les
  // disponibilités de l'apprenant). C'est le "quoi faire maintenant" concret.
  const due = await getDueSessions(user.id, 3);

  const missions: Array<{
    kind: "skill" | "course";
    skillSlug: string;
    skillName: string;
    resourceTitle: string | null;
    resourceUrl: string | null;
    type: string;
    estimatedMinutes: number;
    completed: boolean;
  }> = due.map((s) => ({
    kind: "course" as const,
    skillSlug: s.courseSlug,
    skillName: `${s.code} — ${s.date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}`,
    resourceTitle: s.title,
    resourceUrl: s.url,
    type: "LECTURE",
    estimatedMinutes: 50,
    completed: false,
  }));

  // ── Priority 2: path skills (existing behavior) ────────────────────────────
  const progress = await getPathProgress(user.id, activeGoal.path.slug);

  // Find next available/in-progress skills and their primary resources
  let count = 0;
  for (const status of progress.statuses) {
    if (count >= 3) break;
    if (status.status === "AVAILABLE" || status.status === "IN_PROGRESS") {
      // Find the skill's primary resource
      const skillResources = await db.resourceSkill.findMany({
        where: {
          skill: { slug: status.slug },
          isPrimary: true,
        },
        include: { resource: { select: { id: true, slug: true, title: true, url: true, type: true, durationHours: true } } },
        take: 1,
      });

      const primaryResource = skillResources[0]?.resource;

      // Check if already completed
      let completed = false;
      if (primaryResource) {
        const prog = await db.userProgress.findUnique({
          where: { userId_resourceId: { userId: user.id, resourceId: primaryResource.id } },
          select: { status: true },
        });
        completed = prog?.status === "COMPLETED";
      }

      missions.push({
        kind: "skill",
        skillSlug: status.slug,
        skillName: status.name,
        resourceTitle: primaryResource?.title ?? null,
        resourceUrl: primaryResource?.url ?? null,
        type: primaryResource?.type ?? "RESOURCE",
        estimatedMinutes: primaryResource?.durationHours ? Math.round(primaryResource.durationHours * 60 / 10) : 30,
        completed,
      });
      count++;
    }
  }

  const deduped = missions.slice(0, 3);

  // Check today's activity
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activity = await db.dailyActivity.findUnique({
    where: { userId_date: { userId: user.id, date: today } },
    select: { actions: true, minutes: true },
  });

  return json({
    missions: deduped,
    todayActivity: activity,
    goalName: activeGoal.path.name,
  });
});
