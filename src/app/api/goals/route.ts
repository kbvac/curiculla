import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, badRequest, json, notFound, created } from "@/lib/http";

export const GET = handle(async () => {
  const user = await requireUser();
  const goals = await db.userGoal.findMany({
    where: { userId: user.id },
    include: {
      path: {
        include: {
          domain: { select: { name: true, slug: true } },
          _count: { select: { steps: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return json(goals);
});

export const POST = handle(async (request: Request) => {
  const user = await requireUser();
  const body = await request.json();
  const schema = z.object({ pathSlug: z.string() });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const path = await db.learningPath.findUnique({ where: { slug: parsed.data.pathSlug } });
  if (!path) return notFound("Learning Path");

  const existing = await db.userGoal.findUnique({
    where: { userId_pathId: { userId: user.id, pathId: path.id } },
  });

  if (existing) {
    return badRequest("Goal already exists for this path");
  }

  const goal = await db.userGoal.create({
    data: { userId: user.id, pathId: path.id },
    include: { path: { select: { name: true, slug: true } } },
  });

  return created(goal);
});
