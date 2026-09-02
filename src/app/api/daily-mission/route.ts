import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getPathProgress } from "@/lib/skills";
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

  // ── Priority 1: this week's unchecked sessions from the weekly schedule ────
  // The weekly schedule is the most concrete "what to do now" the product has.
  const enrollments = await db.scheduleEnrollment.findMany({
    where: { userId: user.id, status: "ACTIVE" },
    include: {
      course: {
        select: {
          slug: true,
          code: true,
          title: true,
          resources: {
            where: { weekNumber: { not: null } },
            orderBy: [{ weekNumber: "asc" }, { lectureNumber: "asc" }],
            select: {
              slug: true,
              title: true,
              url: true,
              weekNumber: true,
              lectureNumber: true,
              progress: { where: { userId: user.id }, select: { status: true } },
            },
          },
        },
      },
    },
  });

  const missions: Array<{
    skillSlug: string;
    skillName: string;
    resourceTitle: string | null;
    resourceUrl: string | null;
    type: string;
    estimatedMinutes: number;
    completed: boolean;
  }> = [];

  const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
  for (const enrollment of enrollments) {
    if (missions.length >= 3) break;
    const { course } = enrollment;
    const maxWeek = Math.max(0, ...course.resources.map((r) => r.weekNumber ?? 0));
    if (maxWeek === 0) continue;
    const elapsed =
      Math.floor((Date.now() - enrollment.startDate.getTime()) / MS_WEEK) + 1;
    const week = Math.min(Math.max(elapsed, 1), maxWeek);

    for (const r of course.resources) {
      if (missions.length >= 3) break;
      if (r.weekNumber !== week) continue;
      if (r.progress[0]?.status === "COMPLETED") continue;
      missions.push({
        skillSlug: course.slug,
        skillName: `${course.code} — semaine ${week}`,
        resourceTitle: r.title,
        resourceUrl: r.url,
        type: "LECTURE",
        estimatedMinutes: 50,
        completed: false,
      });
    }
  }

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
