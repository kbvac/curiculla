import Link from "next/link";
import { db } from "@/lib/db";
import { getPathProgress } from "@/lib/skills";

export async function DailyMission({ userId }: { userId: string }) {
  // Get active goal
  const activeGoal = await db.userGoal.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { path: { select: { slug: true, name: true } } },
  });

  if (!activeGoal) return null;

  // ── Priority 1: this week's unchecked sessions from the weekly schedule ────
  const enrollments = await db.scheduleEnrollment.findMany({
    where: { userId, status: "ACTIVE" },
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
              progress: { where: { userId }, select: { status: true } },
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
    // Server component: wall-clock read at request time is intentional.
    // eslint-disable-next-line react-hooks/purity -- not a React hook context
    const elapsed = Math.floor((Date.now() - enrollment.startDate.getTime()) / MS_WEEK) + 1;
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

  // ── Priority 2: path skills ────────────────────────────
  const progress = await getPathProgress(userId, activeGoal.path.slug);

  let count = 0;
  for (const status of progress.statuses) {
    if (count >= 3) break;
    if (status.status === "AVAILABLE" || status.status === "IN_PROGRESS") {
      const skillResources = await db.resourceSkill.findMany({
        where: { skill: { slug: status.slug }, isPrimary: true },
        include: { resource: { select: { id: true, slug: true, title: true, url: true, type: true, durationHours: true } } },
        take: 1,
      });

      const primaryResource = skillResources[0]?.resource;
      let completed = false;
      if (primaryResource) {
        const prog = await db.userProgress.findUnique({
          where: { userId_resourceId: { userId, resourceId: primaryResource.id } },
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activity = await db.dailyActivity.findUnique({
    where: { userId_date: { userId, date: today } },
    select: { actions: true, minutes: true },
  });

  if (deduped.length === 0) return null;

  const completedCount = deduped.filter((m) => m.completed).length;
  const totalEstimated = deduped.reduce((sum, m) => sum + m.estimatedMinutes, 0);

  return (
    <div className="rounded-lg border border-accent/30 bg-accent-light/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-accent-dark">MISSION DU JOUR</span>
          <h2 className="mt-1 font-display text-lg font-semibold text-fg">{activeGoal.path.name}</h2>
        </div>
        {activity && (
          <div className="text-right text-sm text-fg-muted">
            <div>{activity.actions} actions</div>
            <div>{activity.minutes} min aujourd&apos;hui</div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {deduped.map((mission) => (
          <div
            key={mission.skillSlug}
            className={`flex items-center gap-3 rounded-md p-3 transition-colors ${
              mission.completed ? "bg-success-light/50" : "bg-card hover:border-accent/40 border border-transparent"
            }`}
          >
            <span className={`text-lg ${mission.completed ? "text-success" : "text-fg-faint"}`}>
              {mission.completed ? "✓" : "○"}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                href={
                  (mission as { kind?: string }).kind === "course"
                    ? `/courses/${mission.skillSlug}`
                    : `/skills/${mission.skillSlug}`
                }
                className="text-sm font-medium text-fg hover:text-accent transition-colors"
              >
                {mission.skillName}
              </Link>
              {mission.resourceTitle && (
                <p className="truncate text-xs text-fg-faint">{mission.resourceTitle}</p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xs text-fg-faint">~{mission.estimatedMinutes}min</span>
              {mission.resourceUrl && !mission.completed && (
                <a
                  href={mission.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                >
                  Ouvrir
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-fg-muted">
        <span>{completedCount}/{deduped.length} tâches</span>
        <span>~{totalEstimated} min</span>
      </div>
    </div>
  );
}
