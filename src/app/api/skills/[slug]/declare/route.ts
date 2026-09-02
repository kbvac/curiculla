import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, badRequest, json, notFound } from "@/lib/http";

export const POST = handle(async (request: Request, context?: Record<string, unknown>) => {
  const { slug } = await (context!.params as Promise<{ slug: string }>);
  const user = await requireUser();

  const body = await request.json();
  const schema = z.object({ known: z.boolean() });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const skill = await db.skill.findUnique({ where: { slug } });
  if (!skill) return notFound("Skill");

  if (parsed.data.known) {
    await db.userSkill.upsert({
      where: { userId_skillId: { userId: user.id, skillId: skill.id } },
      update: { status: "MASTERED", mastery: 100, selfDeclared: true },
      create: { userId: user.id, skillId: skill.id, status: "MASTERED", mastery: 100, selfDeclared: true },
    });
  } else {
    await db.userSkill.upsert({
      where: { userId_skillId: { userId: user.id, skillId: skill.id } },
      update: { status: "AVAILABLE", mastery: 0, selfDeclared: false },
      create: { userId: user.id, skillId: skill.id, status: "AVAILABLE", mastery: 0, selfDeclared: false },
    });
  }

  return json({ slug, known: parsed.data.known });
});
