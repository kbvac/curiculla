import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle, json, badRequest } from "@/lib/http";
import { normalizeAvailability } from "@/lib/schedule";

/**
 * GET /api/availability — le profil de disponibilités (null si jamais rempli).
 */
export const GET = handle(async () => {
  const user = await requireUser();
  const profile = await db.studyProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return json(null);
  let days: unknown = [];
  try {
    days = JSON.parse(profile.days);
  } catch {
    days = [];
  }
  return json({
    ...normalizeAvailability({
      days,
      minutesPerDay: profile.minutesPerDay,
      startTime: profile.startTime,
      sessionMinutes: profile.sessionMinutes,
    }),
  });
});

const putSchema = z.object({
  days: z.array(z.number().int().min(0).max(6)).min(1).max(7),
  minutesPerDay: z.number().int().min(15).max(480),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  sessionMinutes: z.number().int().min(15).max(180).optional(),
});

/**
 * PUT /api/availability — questionnaire : jours, minutes/jour, heure.
 */
export const PUT = handle(async (request: Request) => {
  const user = await requireUser();
  const parsed = putSchema.safeParse(await request.json());
  if (!parsed.success) return badRequest("Réponse invalide (1 jour minimum)");

  const availability = normalizeAvailability(parsed.data);
  await db.studyProfile.upsert({
    where: { userId: user.id },
    update: {
      days: JSON.stringify(availability.days),
      minutesPerDay: availability.minutesPerDay,
      startTime: availability.startTime,
      sessionMinutes: availability.sessionMinutes,
    },
    create: {
      userId: user.id,
      days: JSON.stringify(availability.days),
      minutesPerDay: availability.minutesPerDay,
      startTime: availability.startTime,
      sessionMinutes: availability.sessionMinutes,
    },
  });
  return json(availability);
});
