import { db } from "./db";

/**
 * Dynamic weekly schedule.
 *
 * The student enrolls in N courses in parallel (they cohabit, like a real
 * quarter). Each enrollment anchors the course's official week structure
 * (Week 1..10 from the podcast platform) to the student's own start date:
 * "week 1" is their first week, whatever the calendar says.
 */

const MS_WEEK = 7 * 24 * 60 * 60 * 1000;

export type ScheduleSessionView = {
  resourceSlug: string;
  title: string;
  url: string;
  sessionKind: string;
  lectureNumber: number;
  dateLabel: string | null;
  status: string;
  percent: number;
};

export type ScheduleCourseView = {
  courseSlug: string;
  code: string;
  title: string;
  term: string | null;
  enrollmentId: string;
  startDate: Date;
  currentWeek: number;
  maxWeek: number;
  weekStart: Date;
  weekEnd: Date;
  sessions: ScheduleSessionView[];
  weekDone: number;
  weekTotal: number;
  overallDone: number;
  overallTotal: number;
};

export type ScheduleView = {
  today: Date;
  courses: ScheduleCourseView[];
};

export async function enroll(
  userId: string,
  courseSlug: string,
  startDate?: Date,
): Promise<void> {
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
  });
  if (!course) throw new Error(`Course not found: ${courseSlug}`);

  await db.scheduleEnrollment.upsert({
    where: { userId_courseId: { userId, courseId: course.id } },
    update: { startDate: startDate ?? new Date(), status: "ACTIVE" },
    create: {
      userId,
      courseId: course.id,
      startDate: startDate ?? new Date(),
      status: "ACTIVE",
    },
  });
}

export async function unenroll(userId: string, courseSlug: string): Promise<void> {
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
  });
  if (!course) return;
  await db.scheduleEnrollment.deleteMany({
    where: { userId, courseId: course.id },
  });
}

function currentWeekOf(startDate: Date, maxWeek: number, now: Date): number {
  if (maxWeek <= 0) return 1;
  const elapsed = Math.floor((now.getTime() - startDate.getTime()) / MS_WEEK) + 1;
  return Math.min(Math.max(elapsed, 1), maxWeek);
}

export async function getScheduleView(userId: string): Promise<ScheduleView> {
  const now = new Date();

  const enrollments = await db.scheduleEnrollment.findMany({
    where: { userId, status: "ACTIVE" },
    include: {
      course: {
        include: {
          resources: {
            where: { weekNumber: { not: null } },
            orderBy: [{ weekNumber: "asc" }, { lectureNumber: "asc" }],
            select: {
              id: true,
              slug: true,
              title: true,
              url: true,
              type: true,
              term: true,
              weekNumber: true,
              lectureNumber: true,
              sessionKind: true,
              dateLabel: true,
              progress: {
                where: { userId },
                select: { status: true, percent: true },
              },
            },
          },
        },
      },
    },
  });

  const courses: ScheduleCourseView[] = [];

  for (const enrollment of enrollments) {
    const { course } = enrollment;
    const byWeek = new Map<number, typeof course.resources>();
    for (const r of course.resources) {
      const w = r.weekNumber!;
      const arr = byWeek.get(w) ?? [];
      arr.push(r);
      byWeek.set(w, arr);
    }
    const maxWeek = Math.max(0, ...byWeek.keys());
    if (maxWeek === 0) continue;

    const currentWeek = currentWeekOf(enrollment.startDate, maxWeek, now);
    const weekStart = new Date(enrollment.startDate.getTime() + (currentWeek - 1) * MS_WEEK);
    const weekEnd = new Date(weekStart.getTime() + MS_WEEK - 1);

    const weekResources = byWeek.get(currentWeek) ?? [];
    const allProgress = course.resources.flatMap((r) =>
      r.progress.length > 0 ? [r.progress[0]] : [],
    );

    const toSession = (r: (typeof course.resources)[number]): ScheduleSessionView => ({
      resourceSlug: r.slug,
      title: r.title,
      url: r.url,
      sessionKind: r.sessionKind ?? "LECTURE",
      lectureNumber: r.lectureNumber ?? 0,
      dateLabel: r.dateLabel,
      status: r.progress[0]?.status ?? "NOT_STARTED",
      percent: r.progress[0]?.percent ?? 0,
    });

    courses.push({
      courseSlug: course.slug,
      code: course.code ?? course.slug,
      title: course.title,
      term: course.resources[0]?.term ?? null,
      enrollmentId: enrollment.id,
      startDate: enrollment.startDate,
      currentWeek,
      maxWeek,
      weekStart,
      weekEnd,
      sessions: weekResources.map(toSession),
      weekDone: weekResources.filter((r) => r.progress[0]?.status === "COMPLETED").length,
      weekTotal: weekResources.length,
      overallDone: allProgress.filter((p) => p.status === "COMPLETED").length,
      overallTotal: course.resources.length,
    });
  }

  courses.sort((a, b) => a.code.localeCompare(b.code));
  return { today: now, courses };
}
