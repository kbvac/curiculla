import { db } from "@/lib/db";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SkillStatus = "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETED" | "MASTERED";

export type SkillNode = {
  slug: string;
  name: string;
  difficulty: number | null;
  prerequisites: string[];
};

export type SkillStatusResult = {
  slug: string;
  name: string;
  status: SkillStatus;
  mastery: number;
  missingPrerequisites: string[];
  selfDeclared: boolean;
};

// ─── Status computation ──────────────────────────────────────────────────────

export function computeSkillStatus(
  skill: SkillNode,
  userSkillMap: Map<string, { status: string; mastery: number; selfDeclared: boolean }>,
): SkillStatusResult {
  const userSkill = userSkillMap.get(skill.slug);

  // Check which prerequisites are met
  const missingPrerequisites = skill.prerequisites.filter((prereqSlug) => {
    const prereq = userSkillMap.get(prereqSlug);
    if (!prereq) return true;
    if (prereq.selfDeclared) return false;
    return prereq.status !== "COMPLETED" && prereq.status !== "MASTERED";
  });

  // If any non-self-declared prerequisite is missing → LOCKED
  if (missingPrerequisites.length > 0) {
    return {
      slug: skill.slug,
      name: skill.name,
      status: "LOCKED",
      mastery: 0,
      missingPrerequisites,
      selfDeclared: userSkill?.selfDeclared ?? false,
    };
  }

  // If user has no record → AVAILABLE
  if (!userSkill) {
    return {
      slug: skill.slug,
      name: skill.name,
      status: "AVAILABLE",
      mastery: 0,
      missingPrerequisites: [],
      selfDeclared: false,
    };
  }

  // Determine status from mastery
  let status: SkillStatus;
  if (userSkill.mastery >= 90) {
    status = "MASTERED";
  } else if (userSkill.mastery >= 80) {
    status = "COMPLETED";
  } else if (userSkill.mastery > 0) {
    status = "IN_PROGRESS";
  } else if (userSkill.status === "COMPLETED" || userSkill.status === "MASTERED") {
    status = userSkill.status as SkillStatus;
  } else {
    status = "AVAILABLE";
  }

  return {
    slug: skill.slug,
    name: skill.name,
    status,
    mastery: userSkill.mastery,
    missingPrerequisites: [],
    selfDeclared: userSkill.selfDeclared,
  };
}

// ─── Path progress ───────────────────────────────────────────────────────────

export type CourseStepStatus = {
  slug: string;
  code: string;
  title: string;
  status: SkillStatus;
  percent: number;
  isRequired: boolean;
};

export type PathProgress = {
  totalSteps: number;
  completedSteps: number;
  percentage: number;
  currentPhase: string | null;
  currentSkill: SkillStatusResult | null;
  currentCourse: { slug: string; code: string; title: string } | null;
  nextTask: {
    kind: "SKILL" | "COURSE";
    slug: string;
    name: string;
    href: string;
    resourceUrl: string | null;
  } | null;
  statuses: SkillStatusResult[];
  courseStatuses: CourseStepStatus[];
};

type NextTask = NonNullable<PathProgress["nextTask"]>;

export async function getPathProgress(
  userId: string,
  pathSlug: string,
): Promise<PathProgress> {
  const path = await db.learningPath.findUnique({
    where: { slug: pathSlug },
    include: {
      steps: {
        include: {
          skill: {
            include: {
              resources: { include: { resource: true } },
              prerequisites: { select: { prerequisite: { select: { slug: true } } } },
            },
          },
          course: {
            include: {
              resources: {
                select: { id: true, url: true },
              },
              prerequisites: {
                include: {
                  prerequisite: { select: { slug: true, code: true, title: true } },
                },
              },
            },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!path) {
    throw new Error(`Path not found: ${pathSlug}`);
  }

  // ── Skill steps ────────────────────────────────────────────────────────────
  const skillSteps = path.steps.filter((s) => s.skillId && s.skill);
  const userSkills = await db.userSkill.findMany({
    where: { userId },
    select: { skillId: true, status: true, mastery: true, selfDeclared: true },
  });

  const skillIdToSlug = new Map<string, string>();
  for (const step of skillSteps) {
    if (step.skill) skillIdToSlug.set(step.skill.id, step.skill.slug);
  }

  const userSkillMap = new Map<string, { status: string; mastery: number; selfDeclared: boolean }>();
  for (const us of userSkills) {
    const slug = skillIdToSlug.get(us.skillId);
    if (slug) {
      userSkillMap.set(slug, { status: us.status, mastery: us.mastery, selfDeclared: us.selfDeclared });
    }
  }

  const statuses: SkillStatusResult[] = skillSteps.map((step) => {
    if (!step.skill) throw new Error("Inconsistent step");
    const prereqs = step.skill.prerequisites.map((p) => p.prerequisite.slug);
    return computeSkillStatus(
      { slug: step.skill.slug, name: step.skill.name, difficulty: step.skill.difficulty, prerequisites: prereqs },
      userSkillMap,
    );
  });

  // ── Course steps ───────────────────────────────────────────────────────────
  const courseSteps = path.steps.filter((s) => s.courseId && s.course);
  const courseIds = courseSteps.map((s) => s.courseId!);

  const courseResources = courseIds.length
    ? await db.resource.findMany({
        where: { courseId: { in: courseIds } },
        select: { id: true, courseId: true, url: true },
      })
    : [];
  const resourceProgress = courseResources.length
    ? await db.userProgress.findMany({
        where: { userId, resourceId: { in: courseResources.map((r) => r.id) } },
        select: { resourceId: true, status: true, percent: true },
      })
    : [];
  const progressByResource = new Map(resourceProgress.map((p) => [p.resourceId, p]));
  const primaryResourceByCourse = new Map<string, string>();
  for (const r of courseResources) {
    if (r.courseId && !primaryResourceByCourse.has(r.courseId)) {
      primaryResourceByCourse.set(r.courseId, r.url);
    }
  }

  const courseStatuses: CourseStepStatus[] = courseSteps.map((step) => {
    const course = step.course!;
    const resources = courseResources.filter((r) => r.courseId === course.id);
    const progresses = resources
      .map((r) => progressByResource.get(r.id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));

    const anyCompleted = progresses.some((p) => p.status === "COMPLETED" || p.percent >= 100);
    const anyStarted = progresses.some((p) => p.percent > 0 || p.status === "IN_PROGRESS");

    return {
      slug: course.slug,
      code: course.code ?? course.slug,
      title: course.title,
      status: anyCompleted ? "COMPLETED" : anyStarted ? "IN_PROGRESS" : "AVAILABLE",
      percent: progresses.length ? Math.max(...progresses.map((p) => p.percent)) : 0,
      isRequired: step.isRequired,
    };
  });

  // ── Aggregates ─────────────────────────────────────────────────────────────
  const completedSkillSteps = statuses.filter(
    (s) => s.status === "COMPLETED" || s.status === "MASTERED",
  ).length;
  const completedCourseSteps = courseStatuses.filter((s) => s.status === "COMPLETED").length;
  const totalSteps = statuses.length + courseStatuses.length;
  const completedSteps = completedSkillSteps + completedCourseSteps;

  // Current phase: first step (in path order) that is IN_PROGRESS or AVAILABLE
  let currentPhase: string | null = null;
  let currentSkill: SkillStatusResult | null = null;
  let currentCourse: PathProgress["currentCourse"] = null;
  for (const step of path.steps) {
    if (step.skillId && step.skill) {
      const st = statuses.find((s) => s.slug === step.skill!.slug);
      if (st && (st.status === "IN_PROGRESS" || st.status === "AVAILABLE")) {
        currentPhase = step.phase;
        currentSkill = st.status === "IN_PROGRESS" ? st : currentSkill ?? st;
        break;
      }
    }
    if (step.courseId && step.course) {
      const st = courseStatuses.find((s) => s.slug === step.course!.slug);
      if (st && (st.status === "IN_PROGRESS" || st.status === "AVAILABLE")) {
        currentPhase = step.phase;
        if (st.status === "IN_PROGRESS") {
          currentCourse = { slug: st.slug, code: st.code, title: st.title };
        }
        break;
      }
    }
  }

  // Next task: first non-completed required step in path order
  let nextTask: NextTask | null = null;
  for (const step of path.steps) {
    if (step.skillId && step.skill) {
      const st = statuses.find((s) => s.slug === step.skill!.slug);
      if (st && (st.status === "IN_PROGRESS" || st.status === "AVAILABLE")) {
        const primaryResource = step.skill.resources.find((r) => r.isPrimary)?.resource;
        nextTask = {
          kind: "SKILL",
          slug: st.slug,
          name: st.name,
          href: `/skills/${st.slug}`,
          resourceUrl: primaryResource?.url ?? null,
        };
        break;
      }
    }
    if (step.courseId && step.course) {
      const st = courseStatuses.find((s) => s.slug === step.course!.slug);
      if (st && st.status === "IN_PROGRESS") {
        nextTask = {
          kind: "COURSE",
          slug: st.slug,
          name: `${st.code} — ${st.title}`,
          href: `/courses/${st.slug}`,
          resourceUrl: primaryResourceByCourse.get(step.courseId) ?? null,
        };
        break;
      }
    }
  }
  if (!nextTask) {
    for (const step of path.steps) {
      if (step.courseId && step.course) {
        const st = courseStatuses.find((s) => s.slug === step.course!.slug);
        if (st && st.status === "AVAILABLE" && st.isRequired) {
          nextTask = {
            kind: "COURSE",
            slug: st.slug,
            name: `${st.code} — ${st.title}`,
            href: `/courses/${st.slug}`,
            resourceUrl: primaryResourceByCourse.get(step.courseId) ?? null,
          };
          break;
        }
      }
    }
  }

  return {
    totalSteps,
    completedSteps,
    percentage: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
    currentPhase,
    currentSkill,
    currentCourse,
    nextTask,
    statuses,
    courseStatuses,
  };
}

// ─── Mastery recomputation ───────────────────────────────────────────────────

export async function recomputeSkillMastery(
  userId: string,
  skillId: string,
): Promise<{ mastery: number; status: string }> {
  // Get resource progress for this skill
  const resourceSkills = await db.resourceSkill.findMany({
    where: { skillId },
    include: {
      resource: {
        include: {
          progress: { where: { userId }, select: { percent: true, status: true } },
        },
      },
    },
  });

  if (resourceSkills.length === 0) {
    return { mastery: 0, status: "AVAILABLE" };
  }

  // Weighted average: courses 40%, others avg 60%
  let totalWeight = 0;
  let weightedSum = 0;

  // Mastery covers ALL linked resources: untouched ones count as 0 so that
  // completing 1 lecture out of 37 does not complete the skill.
  for (const rs of resourceSkills) {
    if (!rs.resource) continue; // orphaned link, resource purged
    totalWeight += 1;
    weightedSum += rs.resource.progress[0]?.percent ?? 0;
  }

  const mastery = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  // Determine status
  let status: string;
  if (mastery >= 90) {
    // Check if any assessment passed
    const passedAssessment = await db.assessmentAttempt.findFirst({
      where: { userId, assessment: { skillId }, passed: true },
    });
    status = passedAssessment ? "MASTERED" : "COMPLETED";
  } else if (mastery >= 80) {
    status = "COMPLETED";
  } else if (mastery > 0) {
    status = "IN_PROGRESS";
  } else {
    status = "AVAILABLE";
  }

  // Upsert user skill
  await db.userSkill.upsert({
    where: { userId_skillId: { userId, skillId } },
    update: { mastery, status },
    create: { userId, skillId, mastery, status },
  });

  return { mastery, status };
}

// ─── Streak computation ──────────────────────────────────────────────────────

export async function computeStreak(userId: string): Promise<number> {
  const activities = await db.dailyActivity.findMany({
    where: { userId },
    select: { date: true },
    orderBy: { date: "desc" },
    take: 100,
  });

  if (activities.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < activities.length; i++) {
    const activityDate = new Date(activities[i].date);
    activityDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (activityDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
