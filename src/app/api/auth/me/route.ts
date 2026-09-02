import { getCurrentUser } from "@/lib/auth";
import { handle, json, unauthorized } from "@/lib/http";

export const GET = handle(async () => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  return json(user);
});
