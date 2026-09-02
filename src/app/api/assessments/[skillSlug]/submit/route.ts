import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, badRequest, json, notFound } from "@/lib/http";

const submitSchema = z.object({
  answers: z.array(z.number().min(0).max(3)),
});

export const POST = handle(async (request: Request, context?: Record<string, unknown>) => {
  const { skillSlug } = await (context!.params as Promise<{ skillSlug: string }>);

  const user = await requireUser();

  const body = await request.json();
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const skill = await db.skill.findUnique({
    where: { slug: skillSlug },
    select: { id: true },
  });
  if (!skill) return notFound("Skill");

  const assessment = await db.assessment.findFirst({
    where: { skillId: skill.id },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!assessment) return notFound("Assessment");

  if (parsed.data.answers.length !== assessment.questions.length) {
    return badRequest(`Expected ${assessment.questions.length} answers, got ${parsed.data.answers.length}`);
  }

  // Grade
  let correct = 0;
  const results = assessment.questions.map((q, i) => {
    const isCorrect = parsed.data.answers[i] === q.answerIndex;
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      prompt: q.prompt,
      choices: JSON.parse(q.choices) as string[],
      selected: parsed.data.answers[i],
      correct: q.answerIndex,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const score = Math.round((correct / assessment.questions.length) * 100);
  const passed = score >= assessment.passScore;

  // Record attempt
  const attempt = await db.assessmentAttempt.create({
    data: {
      userId: user.id,
      assessmentId: assessment.id,
      score,
      passed,
    },
  });

  return json({
    attemptId: attempt.id,
    score,
    passed,
    correct,
    total: assessment.questions.length,
    passScore: assessment.passScore,
    results,
  });
});
