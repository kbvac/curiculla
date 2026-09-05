import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { handle, json, badRequest } from "@/lib/http";
import { enroll, unenroll, getPersonalPlan } from "@/lib/schedule";

/**
 * GET /api/schedule — personal plan: due sessions, next 7 days, per-course
 * progress, all distributed on the learner's availability.
 */
export const GET = handle(async () => {
  const user = await requireUser();
  const plan = await getPersonalPlan(user.id);
  return json({
    ...plan,
    today: plan.today.toISOString(),
    upcoming: plan.upcoming.map((u) => ({
      date: u.date.toISOString(),
      sessions: u.sessions.map((s) => ({ ...s, date: s.date.toISOString() })),
    })),
    due: plan.due.map((s) => ({ ...s, date: s.date.toISOString() })),
    courses: plan.courses.map((c) => ({
      ...c,
      sessions: c.sessions.map((s) => ({ ...s, date: s.date.toISOString() })),
    })),
  });
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
