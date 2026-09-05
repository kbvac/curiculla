import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";
import { handle, badRequest, created } from "@/lib/http";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8).max(100),
  universitySlug: z.string().min(1).max(100).optional(),
});

export const POST = handle(async (request: Request) => {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const { email, name, password, universitySlug } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return badRequest("Email already registered");
  }

  let universityId: string | undefined;
  if (universitySlug) {
    const university = await db.university.findUnique({
      where: { slug: universitySlug },
      select: { id: true },
    });
    if (!university) {
      return badRequest(`Unknown university: ${universitySlug}`);
    }
    universityId = university.id;
  }

  const userCount = await db.user.count();
  const user = await db.user.create({
    data: {
      email,
      name,
      passwordHash: hashPassword(password),
      universityId,
      // Bootstrap: the very first account owns the platform
      role: userCount === 0 ? "ADMIN" : "USER",
    },
  });

  await createSession(user.id);

  return created({ id: user.id, email: user.email, name: user.name });
});
