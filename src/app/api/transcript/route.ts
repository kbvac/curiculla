import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, json } from "@/lib/http";
import { computeStreak } from "@/lib/skills";

/**
 * GET /api/transcript — the user's verifiable learning record.
 *
 * - Validated skills (COMPLETED/MASTERED), with lineage (domain › subject)
 * - Validated courses: every weekly session completed, or — for courses
 *   without a weekly split — the primary resource completed
 * - Passed quiz attempts (best score per assessment)
 * - Goals and current streak
 */
export const GET = handle(async () => {
  const user = await requireUser();

  const [userSkills, attempts, goals, streak, courses] = await Promise.all([
    db.userSkill.findMany({
      where: {
        userId: user.id,
        status: { in: ["COMPLETED", "MASTERED"] },
      },
      include: {
        skill: {
          select: {
            slug: true,
            name: true,
            topic: {
              select: {
                name: true,
                subject: {
                  select: {
                    name: true,
                    domain: { select: { name: true, slug: true } },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    db.assessmentAttempt.findMany({
      where: { userId: user.id, passed: true },
      include: {
        assessment: {
          select: {
            title: true,
            skill: { select: { slug: true, name: true } },
          },
        },
      },
      orderBy: { score: "desc" },
    }),
    db.userGoal.findMany({
      where: { userId: user.id },
      include: {
        path: { select: { slug: true, name: true } },
      },
    }),
    computeStreak(user.id),
    db.course.findMany({
      where: { universityId: { not: null } },
      include: {
        university: { select: { name: true, slug: true } },
        resources: {
          where: { weekNumber: { not: null } },
          select: {
            id: true,
            progress: { where: { userId: user.id }, select: { status: true } },
          },
        },
        _count: { select: { resources: true } },
      },
    }),
  ]);

  // Courses: validated when every weekly session is COMPLETED.
  // Courses without a weekly split are validated when their primary
  // (course-level, isPrimary) resource is completed.
  const primaryProgress = courses.length
    ? await db.userProgress.findMany({
        where: {
          userId: user.id,
          resource: {
            courseId: { in: courses.map((c) => c.id) },
            weekNumber: null,
          },
        },
        select: { status: true, resource: { select: { courseId: true } } },
      })
    : [];
  const primaryDone = new Set(
    primaryProgress
      .filter((p) => p.status === "COMPLETED")
      .map((p) => p.resource.courseId),
  );

  const validatedCourses = courses
    .filter((c) => {
      if (c.resources.length > 0) {
        return c.resources.every((r) => r.progress[0]?.status === "COMPLETED");
      }
      return c.id !== null && primaryDone.has(c.id);
    })
    .map((c) => ({
      slug: c.slug,
      code: c.code,
      title: c.title,
      university: c.university?.name ?? null,
      units: c.units,
    }));

  // Best score per assessment
  const bestByAssessment = new Map<string, { title: string; skill: string; score: number }>();
  for (const a of attempts) {
    const key = a.assessment.title;
    const prev = bestByAssessment.get(key);
    if (!prev || a.score > prev.score) {
      bestByAssessment.set(key, {
        title: a.assessment.title,
        skill: a.assessment.skill.name,
        score: a.score,
      });
    }
  }

  const fullUser = await db.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true, createdAt: true },
  });

  return json({
    student: {
      name: fullUser?.name ?? null,
      email: fullUser?.email ?? null,
      memberSince: fullUser?.createdAt ?? null,
    },
    generatedAt: new Date().toISOString(),
    streakDays: streak,
    goals: goals.map((g) => ({
      path: g.path.name,
      slug: g.path.slug,
      status: g.status,
    })),
    courses: validatedCourses,
    skills: userSkills.map((us) => ({
      slug: us.skill.slug,
      name: us.skill.name,
      status: us.status,
      mastery: Math.round(us.mastery),
      lineage: `${us.skill.topic.subject.domain.name} › ${us.skill.topic.subject.name} › ${us.skill.topic.name}`,
    })),
    quizzes: [...bestByAssessment.values()],
    totals: {
      courses: validatedCourses.length,
      skills: userSkills.length,
      quizzes: bestByAssessment.size,
    },
  });
});
