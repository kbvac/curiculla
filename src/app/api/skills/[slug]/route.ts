import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { handle, json, notFound } from "@/lib/http";

export const GET = handle(async (request: Request, context?: Record<string, unknown>) => {
  const { slug } = await (context!.params as Promise<{ slug: string }>);
  const user = await getCurrentUser();

  const skill = await db.skill.findUnique({
    where: { slug },
    include: {
      topic: { select: { name: true, slug: true, subject: { select: { name: true, slug: true, domain: { select: { name: true, slug: true } } } } } },
      resources: {
        include: {
          resource: {
            include: {
              university: { select: { name: true, slug: true } },
            },
          },
        },
        orderBy: { isPrimary: "desc" },
      },
      prerequisites: {
        select: {
          prerequisite: {
            select: { slug: true, name: true, difficulty: true },
          },
        },
      },
      unlocks: {
        select: {
          skill: {
            select: { slug: true, name: true },
          },
        },
      },
    },
  });

  if (!skill) return notFound("Skill");

  let userSkill = null;
  if (user) {
    userSkill = await db.userSkill.findUnique({
      where: { userId_skillId: { userId: user.id, skillId: skill.id } },
      select: { status: true, mastery: true, selfDeclared: true },
    });
  }

  return json({
    ...skill,
    userStatus: userSkill?.status ?? null,
    mastery: userSkill?.mastery ?? 0,
  });
});
