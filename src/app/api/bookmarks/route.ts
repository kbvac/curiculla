import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, badRequest, json, noContent, notFound } from "@/lib/http";

export const GET = handle(async () => {
  const user = await requireUser();
  const bookmarks = await db.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return json(bookmarks);
});

export const POST = handle(async (request: Request) => {
  const user = await requireUser();
  const body = await request.json();
  const schema = z.object({
    targetType: z.enum(["SKILL", "RESOURCE", "LEARNING_PATH", "UNIVERSITY"]),
    targetId: z.string(),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const existing = await db.bookmark.findUnique({
    where: { userId_targetType_targetId: { userId: user.id, targetType: parsed.data.targetType, targetId: parsed.data.targetId } },
  });

  if (existing) {
    return badRequest("Already bookmarked");
  }

  const bookmark = await db.bookmark.create({
    data: { userId: user.id, targetType: parsed.data.targetType, targetId: parsed.data.targetId },
  });

  return json(bookmark);
});

export const DELETE = handle(async (request: Request) => {
  const user = await requireUser();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return badRequest("Missing id parameter");

  const bookmark = await db.bookmark.findUnique({ where: { id } });
  if (!bookmark || bookmark.userId !== user.id) return notFound("Bookmark");

  await db.bookmark.delete({ where: { id } });
  return noContent();
});
