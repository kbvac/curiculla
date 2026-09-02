import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { recomputeSkillMastery } from "@/lib/skills";
import { handle, badRequest, json, notFound } from "@/lib/http";

export const POST = handle(async (request: Request) => {
  const user = await requireUser();
  const body = await request.json();
  const schema = z.object({
    resourceSlug: z.string(),
    status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]).optional(),
    percent: z.number().min(0).max(100).optional(),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const resource = await db.resource.findUnique({
    where: { slug: parsed.data.resourceSlug },
    include: { skills: { select: { skillId: true } } },
  });
  if (!resource) return notFound("Resource");

  const updateData: Record<string, unknown> = {};
  if (parsed.data.status) updateData.status = parsed.data.status;
  if (parsed.data.percent !== undefined) updateData.percent = parsed.data.percent;
  if (parsed.data.status === "COMPLETED") {
    updateData.percent = 100;
    updateData.completedAt = new Date();
  }
  updateData.lastAccessedAt = new Date();

  const progress = await db.userProgress.upsert({
    where: { userId_resourceId: { userId: user.id, resourceId: resource.id } },
    update: updateData,
    create: {
      userId: user.id,
      resourceId: resource.id,
      status: parsed.data.status ?? "IN_PROGRESS",
      percent:
        parsed.data.status === "COMPLETED" ? 100 : (parsed.data.percent ?? 0),
    },
  });

  // Update daily activity
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await db.dailyActivity.upsert({
    where: { userId_date: { userId: user.id, date: today } },
    update: { actions: { increment: 1 }, minutes: { increment: 1 } },
    create: { userId: user.id, date: today, actions: 1, minutes: 1 },
  });

  // Recompute mastery for associated skills
  for (const rs of resource.skills) {
    await recomputeSkillMastery(user.id, rs.skillId);
  }

  return json(progress);
});
