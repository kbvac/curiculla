import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { handle, json, badRequest } from "@/lib/http";
import { enroll, unenroll, getScheduleView } from "@/lib/schedule";

/**
 * GET /api/schedule — the user's weekly schedule view (all enrolled courses).
 */
export const GET = handle(async () => {
  const user = await requireUser();
  const view = await getScheduleView(user.id);
  return json(view);
});

const enrollSchema = z.object({
  courseSlug: z.string().min(1),
  startDate: z.string().datetime().optional(),
});

/**
 * POST /api/schedule — enroll a course in the personal weekly schedule.
 */
export const POST = handle(async (request: Request) => {
  const user = await requireUser();
  const parsed = enrollSchema.safeParse(await request.json());
  if (!parsed.success) return badRequest("Invalid input");

  await enroll(
    user.id,
    parsed.data.courseSlug,
    parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
  );
  return json({ enrolled: parsed.data.courseSlug });
});

/**
 * DELETE /api/schedule?courseSlug= — leave the schedule for a course.
 */
export const DELETE = handle(async (request: Request) => {
  const user = await requireUser();
  const courseSlug = new URL(request.url).searchParams.get("courseSlug");
  if (!courseSlug) return badRequest("Missing 'courseSlug' parameter");

  await unenroll(user.id, courseSlug);
  return json({ left: courseSlug });
});
