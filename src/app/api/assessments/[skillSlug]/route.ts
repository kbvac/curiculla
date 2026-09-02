import { db } from "@/lib/db";
import { handle, json, notFound } from "@/lib/http";

export const GET = handle(async (_request: Request, context?: Record<string, unknown>) => {
  const { skillSlug } = await (context!.params as Promise<{ skillSlug: string }>);

  const skill = await db.skill.findUnique({
    where: { slug: skillSlug },
    select: { id: true, name: true },
  });

  if (!skill) return notFound("Skill");

  const assessment = await db.assessment.findFirst({
    where: { skillId: skill.id },
    include: {
      questions: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          prompt: true,
          choices: true,
          order: true,
        },
      },
    },
  });

  if (!assessment) return notFound("Assessment for this skill");

  // Don't send answerIndex to the client
  const questions = assessment.questions.map((q) => ({
    ...q,
    choices: JSON.parse(q.choices) as string[],
  }));

  return json({
    id: assessment.id,
    title: assessment.title,
    description: assessment.description,
    passScore: assessment.passScore,
    skill: skill.name,
    questions,
  });
});
