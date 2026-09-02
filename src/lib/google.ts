import "server-only";

import { OAuth2Client } from "google-auth-library";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

/** Shared upsert logic for a verified Google profile. Returns the user id. */
export async function upsertGoogleUser(profile: {
  sub: string;
  email: string;
  name?: string | null;
  email_verified?: boolean;
}): Promise<string | { error: string }> {
  if (!profile.email_verified) return { error: "Email Google non vérifié" };

  const googleId = profile.sub;
  const email = profile.email.toLowerCase();

  let user = await db.user.findUnique({ where: { googleId } });
  if (!user) {
    user = await db.user.findUnique({ where: { email } });
    if (user) {
      user = await db.user.update({ where: { id: user.id }, data: { googleId } });
    }
  }
  if (!user) {
    user = await db.user.create({
      data: { email, name: profile.name ?? email.split("@")[0], googleId },
    });
  }
  await createSession(user.id);
  return user.id;
}
