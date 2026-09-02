import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { handle, json, badRequest } from "@/lib/http";

/**
 * GET /api/user/university
 * Current user's home university.
 */
export const GET = handle(async () => {
  const user = await getCurrentUser();
  if (!user) return json(null);

  const university = await db.user.findUnique({
    where: { id: user.id },
    select: {
      university: {
        select: {
          slug: true,
          name: true,
          country: true,
          website: true,
          _count: { select: { courses: true, resources: true } },
        },
      },
    },
  });

  return json(university?.university ?? null);
});

const updateSchema = z.object({
  universitySlug: z.string().min(1),
});

/**
 * PUT /api/user/university
 * Set (or clear with null) the user's home university.
 */
export const PUT = handle(async (request: Request) => {
  const user = await requireUser();

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return badRequest("Invalid input");
  }

  const university = await db.university.findUnique({
    where: { slug: parsed.data.universitySlug },
    select: { id: true },
  });
  if (!university) {
    return badRequest(`Unknown university: ${parsed.data.universitySlug}`);
  }

  await db.user.update({
    where: { id: user.id },
    data: { universityId: university.id },
  });

  return json({ universitySlug: parsed.data.universitySlug });
});

/**
 * DELETE /api/user/university
 * Clear the home university.
 */
export const DELETE = handle(async () => {
  const user = await requireUser();
  await db.user.update({
    where: { id: user.id },
    data: { universityId: null },
  });
  return json({ cleared: true });
});
