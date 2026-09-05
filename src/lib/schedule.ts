import { db } from "./db";

/**
 * Dynamic weekly schedule.
 *
 * The student enrolls in N courses in parallel (they cohabit, like a real
 * quarter). Each enrollment anchors the course's official week structure
 * (Week 1..10 from the podcast platform) to the student's own start date:
 * "week 1" is their first week, whatever the calendar says.
 */


export type ScheduleSessionView = {
  resourceSlug: string;
  title: string;
  url: string;
  sessionKind: string;
  lectureNumber: number;
  dateLabel: string | null;
  status: string;
  percent: number;
};



export async function enroll(
  userId: string,
  courseSlug: string,
  startDate?: Date,
): Promise<void> {
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
  });
  if (!course) throw new Error(`Course not found: ${courseSlug}`);

  await db.scheduleEnrollment.upsert({
    where: { userId_courseId: { userId, courseId: course.id } },
    update: { startDate: startDate ?? new Date(), status: "ACTIVE" },
    create: {
      userId,
      courseId: course.id,
      startDate: startDate ?? new Date(),
      status: "ACTIVE",
    },
  });
}

export async function unenroll(userId: string, courseSlug: string): Promise<void> {
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
  });
  if (!course) return;
  await db.scheduleEnrollment.deleteMany({
    where: { userId, courseId: course.id },
  });
}

// ─── Planificateur personnel (emploi du temps dynamique) ─────────────────────
// Les sessions officielles sont distribuées, dans l'ordre, uniquement sur les
// jours disponibles de l'apprenant, à son heure, dans sa capacité journalière.

export type Availability = {
  days: number[]; // index getDay(): 0=Dim … 6=Sam
  minutesPerDay: number;
  startTime: string; // "HH:MM"
  sessionMinutes: number;
};

export const DEFAULT_AVAILABILITY: Availability = {
  days: [1, 2, 3, 4, 5],
  minutesPerDay: 60,
  startTime: "09:00",
  sessionMinutes: 50,
};

export function normalizeAvailability(raw: {
  days?: unknown;
  minutesPerDay?: unknown;
  startTime?: unknown;
  sessionMinutes?: unknown;
}): Availability {
  const days = Array.isArray(raw.days)
    ? raw.days.filter((d): d is number => Number.isInteger(d) && d >= 0 && d <= 6)
    : [];
  const minutesPerDay =
    typeof raw.minutesPerDay === "number" && raw.minutesPerDay >= 15 && raw.minutesPerDay <= 480
      ? Math.round(raw.minutesPerDay)
      : DEFAULT_AVAILABILITY.minutesPerDay;
  const startTime =
    typeof raw.startTime === "string" && /^\d{2}:\d{2}$/.test(raw.startTime)
      ? raw.startTime
      : DEFAULT_AVAILABILITY.startTime;
  const sessionMinutes =
    typeof raw.sessionMinutes === "number" && raw.sessionMinutes >= 15 && raw.sessionMinutes <= 180
      ? Math.round(raw.sessionMinutes)
      : DEFAULT_AVAILABILITY.sessionMinutes;
  return {
    days: days.length > 0 ? [...new Set(days)] : [...DEFAULT_AVAILABILITY.days],
    minutesPerDay,
    startTime,
    sessionMinutes,
  };
}

export type PlannedSession<T> = { session: T; date: Date };

/**
 * Distribue des sessions ordonnées sur les jours disponibles à partir d'une
 * date de départ. Pure et testable : aucune dépendance DB.
 */
export function planSessions<T>(
  sessions: T[],
  startDate: Date,
  availability: Availability,
): PlannedSession<T>[] {
  const perDay = Math.max(1, Math.floor(availability.minutesPerDay / availability.sessionMinutes));
  const [hh, mm] = availability.startTime.split(":").map(Number);
  const planned: PlannedSession<T>[] = [];
  const cursor = new Date(startDate);
  cursor.setHours(0, 0, 0, 0);
  let usedToday = 0;

  for (const session of sessions) {
    // Avance jusqu'au prochain jour disponible (borne anti-boucle infinie)
    let guard = 0;
    while (!availability.days.includes(cursor.getDay()) && guard < 14) {
      cursor.setDate(cursor.getDate() + 1);
      guard++;
    }
    if (guard >= 14) break;
    if (usedToday >= perDay) {
      cursor.setDate(cursor.getDate() + 1);
      usedToday = 0;
      let guard2 = 0;
      while (!availability.days.includes(cursor.getDay()) && guard2 < 14) {
        cursor.setDate(cursor.getDate() + 1);
        guard2++;
      }
      if (guard2 >= 14) break;
    }
    const date = new Date(cursor);
    date.setHours(hh, mm, 0, 0);
    planned.push({ session, date });
    usedToday++;
  }
  return planned;
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export type PersonalSessionView = ScheduleSessionView & { date: Date };

export type PersonalCourseView = {
  courseSlug: string;
  code: string;
  title: string;
  term: string | null;
  sessions: PersonalSessionView[];
  doneCount: number;
  totalCount: number;
};

export type EnrichedSession = PersonalSessionView & {
  courseSlug: string;
  code: string;
};

export type PersonalPlan = {
  today: Date;
  availability: Availability;
  hasProfile: boolean;
  due: EnrichedSession[];
  upcoming: { date: Date; sessions: EnrichedSession[] }[];
  courses: PersonalCourseView[];
};

async function loadAvailability(userId: string): Promise<{
  availability: Availability;
  hasProfile: boolean;
}> {
  const profile = await db.studyProfile.findUnique({ where: { userId } });
  if (!profile) return { availability: { ...DEFAULT_AVAILABILITY }, hasProfile: false };
  let days: unknown = [];
  try {
    days = JSON.parse(profile.days);
  } catch {
    days = [];
  }
  return {
    availability: normalizeAvailability({
      days,
      minutesPerDay: profile.minutesPerDay,
      startTime: profile.startTime,
      sessionMinutes: profile.sessionMinutes,
    }),
    hasProfile: true,
  };
}

type LectureRow = {
  id: string;
  slug: string;
  title: string;
  url: string;
  type: string;
  term: string | null;
  lectureNumber: number | null;
  sessionKind: string | null;
  dateLabel: string | null;
  progress: { status: string; percent: number }[];
};

async function loadLectures(userId: string) {
  const enrollments = await db.scheduleEnrollment.findMany({
    where: { userId, status: "ACTIVE" },
    include: {
      course: {
        select: {
          slug: true,
          code: true,
          title: true,
          resources: {
            where: { weekNumber: { not: null } },
            orderBy: [{ weekNumber: "asc" }, { lectureNumber: "asc" }],
            select: {
              id: true,
              slug: true,
              title: true,
              url: true,
              type: true,
              term: true,
              lectureNumber: true,
              sessionKind: true,
              dateLabel: true,
              progress: { where: { userId }, select: { status: true, percent: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
  return enrollments.map((e) => ({
    startDate: e.startDate,
    course: e.course,
    resources: e.course.resources as LectureRow[],
  }));
}

/**
 * Le plan personnel : sessions distribuées sur les disponibilités,
 * sessions dues (date dépassée, non terminées), 7 prochains jours.
 */
export async function getPersonalPlan(userId: string, now = new Date()): Promise<PersonalPlan> {
  const [{ availability, hasProfile }, tracks] = await Promise.all([
    loadAvailability(userId),
    loadLectures(userId),
  ]);
  const today = startOfDay(now);
  const weekAhead = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const courses: PersonalCourseView[] = [];
  const allPlanned: (PersonalSessionView & {
    courseSlug: string;
    code: string;
  })[] = [];

  for (const track of tracks) {
    const planned = planSessions(track.resources, track.startDate, availability);
    const sessions: PersonalSessionView[] = planned.map(({ session: r, date }) => ({
      resourceSlug: r.slug,
      title: r.title,
      url: r.url,
      sessionKind: r.sessionKind ?? "LECTURE",
      lectureNumber: r.lectureNumber ?? 0,
      dateLabel: r.dateLabel,
      status: r.progress[0]?.status ?? "NOT_STARTED",
      percent: r.progress[0]?.percent ?? 0,
      date,
    }));
    const code = track.course.code ?? track.course.slug;
    courses.push({
      courseSlug: track.course.slug,
      code,
      title: track.course.title,
      term: track.course.resources[0]?.term ?? null,
      sessions,
      doneCount: sessions.filter((s) => s.status === "COMPLETED").length,
      totalCount: sessions.length,
    });
    for (const s of sessions) {
      allPlanned.push({ ...s, courseSlug: track.course.slug, code });
    }
  }

  const due = allPlanned
    .filter((s) => s.status !== "COMPLETED" && startOfDay(s.date) <= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const upcomingMap = new Map<number, EnrichedSession[]>();
  for (const s of allPlanned) {
    const day = startOfDay(s.date).getTime();
    if (day <= today.getTime() || day > weekAhead.getTime()) continue;
    if (s.status === "COMPLETED") continue;
    const arr = upcomingMap.get(day) ?? [];
    arr.push(s);
    upcomingMap.set(day, arr);
  }
  const upcoming = [...upcomingMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([day, sessions]) => ({ date: new Date(day), sessions }));

  courses.sort((a, b) => a.code.localeCompare(b.code));
  return { today: now, availability, hasProfile, due, upcoming, courses };
}

/** Sessions dues pour la mission du jour (limite N). */
export async function getDueSessions(
  userId: string,
  limit = 3,
): Promise<EnrichedSession[]> {
  const plan = await getPersonalPlan(userId);
  return plan.due.slice(0, limit);
}

// ─── Calendar export (.ics) ──────────────────────────────────────────────────
// Each official session (e.g. "Wed 4/3") carries a weekday. In the student's
// personal timeline, week N starts at startDate + (N-1) weeks; the session is
// placed on that week's matching weekday so the rhythm (Mon/Wed/Fri) survives.

/** "Wed 4/3" → 3 (JS getDay index). Unknown → null. */
/**
 * Absolute date of a session: personal week start, then the week's matching
 * weekday. Sessions without a known weekday fall on the week start.
 */
export type ScheduleEvent = {
  uid: string;
  title: string;
  description: string;
  url: string;
  start: Date;
  end: Date;
};

/** Every session of every active enrollment, mapped onto personal dates. */
export async function getScheduleEvents(userId: string): Promise<ScheduleEvent[]> {
  const plan = await getPersonalPlan(userId);
  const events: ScheduleEvent[] = [];
  for (const course of plan.courses) {
    for (const s of course.sessions) {
      const end = new Date(
        s.date.getTime() + plan.availability.sessionMinutes * 60 * 1000,
      );
      const bare =
        course.code && s.title.startsWith(course.code)
          ? s.title
          : `${course.code} — ${s.title}`.trim();
      events.push({
        uid: `${s.resourceSlug}@curricula`,
        title: bare,
        description: `${course.title}\\n${s.url}`,
        url: s.url,
        start: new Date(s.date),
        end,
      });
    }
  }
  events.sort((a, b) => a.start.getTime() - b.start.getTime());
  return events;
}

/** Minimal RFC 5545 escaping for TEXT values. */
export function icsEscape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function toIcsDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `T${p(d.getHours())}${p(d.getMinutes())}00`
  );
}

export function eventsToIcs(events: ScheduleEvent[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Curricula//Emploi du temps//FR",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Curricula — Emploi du temps",
  ];
  const stamp = toIcsDate(new Date());
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${icsEscape(e.uid)}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toIcsDate(e.start)}`,
      `DTEND:${toIcsDate(e.end)}`,
      `SUMMARY:${icsEscape(e.title)}`,
      `DESCRIPTION:${icsEscape(e.description)}`,
      `URL:${e.url}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

