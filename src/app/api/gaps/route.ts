import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { computeSkillStatus } from "@/lib/skills";
import { handle, json, badRequest } from "@/lib/http";

type MissingEntry = {
  kind: "skill" | "course";
  slug: string;
  name: string;
  status: string;
  mastery: number;
};

export const GET = handle(async (request: Request) => {
  const user = await requireUser();
  const url = new URL(request.url);
  const pathSlug = url.searchParams.get("path");
  if (!pathSlug) return badRequest("Missing 'path' query parameter");

  const path = await db.learningPath.findUnique({
    where: { slug: pathSlug },
    include: {
      steps: {
        include: {
          skill: {
            include: {
              prerequisites: { select: { prerequisite: { select: { slug: true } } } },
            },
          },
          course: {
            select: { slug: true, code: true, title: true },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!path) return badRequest("Path not found");

  // Get all user skills
  const userSkills = await db.userSkill.findMany({
    where: { userId: user.id },
    select: { skillId: true, status: true, mastery: true, selfDeclared: true },
  });

  const skillIdToSlug = new Map<string, string>();
  for (const step of path.steps) {
    if (step.skill) skillIdToSlug.set(step.skill.id, step.skill.slug);
  }

  const userSkillMap = new Map<string, { status: string; mastery: number; selfDeclared: boolean }>();
  for (const us of userSkills) {
    const slug = skillIdToSlug.get(us.skillId);
    if (slug) {
      userSkillMap.set(slug, { status: us.status, mastery: us.mastery, selfDeclared: us.selfDeclared });
    }
  }

  // Compute statuses for all steps in the path
  const missingSkills: MissingEntry[] = [];

  for (const step of path.steps) {
    if (!step.skill) {
      // Course step: missing unless the user completed any of its resources
      const course = step.course;
      if (!course) continue;
      const progresses = await db.userProgress.findMany({
        where: { userId: user.id, resource: { courseId: step.courseId! } },
        select: { status: true },
      });
      const done = progresses.some((p) => p.status === "COMPLETED");
      const started = progresses.some((p) => p.status === "IN_PROGRESS");
      if (!done) {
        missingSkills.push({
          kind: "course",
          slug: course.slug,
          name: `${course.code ?? ""} — ${course.title}`.trim(),
          status: started ? "IN_PROGRESS" : "AVAILABLE",
          mastery: 0,
        });
      }
      continue;
    }
    const prereqs = step.skill.prerequisites.map((p) => p.prerequisite.slug);
    const result = computeSkillStatus(
      { slug: step.skill.slug, name: step.skill.name, difficulty: step.skill.difficulty, prerequisites: prereqs },
      userSkillMap,
    );
    if (result.status === "LOCKED" || result.status === "AVAILABLE") {
      missingSkills.push({
        kind: "skill",
        slug: result.slug,
        name: result.name,
        status: result.status,
        mastery: result.mastery,
      });
    }
  }

  return json({ path: pathSlug, missingSkills });
});
