import { googleClient, upsertGoogleUser } from "@/lib/google";
import { NextResponse } from "next/server";

/**
 * GET /api/auth/google/callback
 * Exchanges the authorization code, opens a session, redirects.
 */
export async function GET(request: Request) {
  const origin = process.env.APP_URL ?? new URL(request.url).origin;
  const code = new URL(request.url).searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=google`);
  }

  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile = (await res.json()) as {
      sub: string;
      email: string;
      name?: string;
      email_verified?: boolean;
    };

    const result = await upsertGoogleUser(profile);
    if (typeof result === "string") {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(result.error)}`);
  } catch {
    return NextResponse.redirect(`${origin}/login?error=google`);
  }
}
