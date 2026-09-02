import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
import { handle, badRequest, json, unauthorized } from "@/lib/http";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const POST = handle(async (request: Request) => {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid input", parsed.error.issues.map((i) => i.message));
  }

  const { email, password } = parsed.data;

  const user = await db.user.findUnique({ where: { email } });
  // OAuth-only accounts (no password) must sign in with Google
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return unauthorized("Invalid email or password");
  }

  await createSession(user.id);

  return json({ id: user.id, email: user.email, name: user.name });
});
