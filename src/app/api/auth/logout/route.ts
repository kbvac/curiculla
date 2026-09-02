import { destroySession } from "@/lib/auth";
import { handle, noContent } from "@/lib/http";

export const POST = handle(async () => {
  await destroySession();
  return noContent();
});
