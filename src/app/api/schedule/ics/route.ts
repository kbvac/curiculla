import { requireUser } from "@/lib/auth";
import { handle } from "@/lib/http";
import { getScheduleEvents, eventsToIcs } from "@/lib/schedule";

/**
 * GET /api/schedule/ics — télécharge l'emploi du temps au format iCalendar.
 * Importable dans Google Calendar / Apple Calendar / Outlook.
 */
export const GET = handle(async () => {
  const user = await requireUser();
  const events = await getScheduleEvents(user.id);
  const ics = eventsToIcs(events);

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="curricula-emploi-du-temps.ics"',
    },
  });
});
