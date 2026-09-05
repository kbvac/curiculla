import { describe, expect, it } from "vitest";
import {
  normalizeAvailability,
  planSessions,
  icsEscape,
  eventsToIcs,
  type Availability,
  type ScheduleEvent,
} from "@/lib/schedule";

const AVAIL: Availability = {
  days: [1, 2, 3, 4, 5], // Lun–Ven
  minutesPerDay: 60,
  startTime: "09:00",
  sessionMinutes: 50,
};

describe("schedule — normalizeAvailability", () => {
  it("valide et borne les entrées", () => {
    expect(normalizeAvailability({})).toEqual({
      days: [1, 2, 3, 4, 5],
      minutesPerDay: 60,
      startTime: "09:00",
      sessionMinutes: 50,
    });
    expect(
      normalizeAvailability({ days: [0, 6, 9, -1, 0], minutesPerDay: 5, startTime: "nope", sessionMinutes: 999 }),
    ).toEqual({
      days: [0, 6],
      minutesPerDay: 60,
      startTime: "09:00",
      sessionMinutes: 50,
    });
    expect(
      normalizeAvailability({ days: [2, 4], minutesPerDay: 90, startTime: "18:30", sessionMinutes: 30 }),
    ).toEqual({ days: [2, 4], minutesPerDay: 90, startTime: "18:30", sessionMinutes: 30 });
  });
});

describe("schedule — planSessions", () => {
  it("distribue dans l'ordre uniquement sur les jours dispos", () => {
    // Départ lundi 6 octobre 2025, 1 session/jour (60/50)
    const start = new Date(2025, 9, 6);
    const planned = planSessions(["a", "b", "c", "d", "e", "f"], start, AVAIL);
    expect(planned.map((p) => p.session)).toEqual(["a", "b", "c", "d", "e", "f"]);
    const dates = planned.map((p) => p.date);
    // Lun–Ven puis saute le week-end
    expect(dates.map((d) => d.getDate())).toEqual([6, 7, 8, 9, 10, 13]);
    expect(dates.every((d) => d.getHours() === 9 && d.getMinutes() === 0)).toBe(true);
  });

  it("remplit la capacité journalière (2 sessions à 90 min/jour)", () => {
    const avail: Availability = { ...AVAIL, minutesPerDay: 90, sessionMinutes: 30 };
    const start = new Date(2025, 9, 6); // lundi
    const planned = planSessions(["a", "b", "c", "d"], start, avail);
    expect(planned.map((p) => p.date.getDate())).toEqual([6, 6, 6, 7]);
  });

  it("démarre au prochain jour dispo si le départ tombe un jour off", () => {
    const avail: Availability = { ...AVAIL, days: [2, 4] }; // Mar + Jeu
    const start = new Date(2025, 9, 6); // lundi
    const planned = planSessions(["a", "b"], start, avail);
    expect(planned[0].date.getDate()).toBe(7); // mardi
    expect(planned[1].date.getDate()).toBe(9); // jeudi
  });

  it("garantit au moins une session par jour dispo", () => {
    const avail: Availability = { ...AVAIL, minutesPerDay: 20, sessionMinutes: 50 };
    const start = new Date(2025, 9, 6);
    const planned = planSessions(["a", "b"], start, avail);
    expect(planned.map((p) => p.date.getDate())).toEqual([6, 7]);
  });
});

describe("schedule — ICS", () => {
  it("icsEscape protège les caractères spéciaux", () => {
    expect(icsEscape("a;b,c\\d\ne")).toBe("a\\;b\\,c\\\\d\\ne");
  });

  it("eventsToIcs produit un calendrier valide", () => {
    const events: ScheduleEvent[] = [
      {
        uid: "x@curricula",
        title: "CSE 30 — Lecture 1",
        description: "cours;\nurl",
        url: "https://podcast.ucsd.edu/watch/sp24/cse30_a00/1",
        start: new Date(2025, 9, 6, 9, 0),
        end: new Date(2025, 9, 6, 9, 50),
      },
    ];
    const ics = eventsToIcs(events);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("SUMMARY:CSE 30 — Lecture 1");
    expect(ics).toContain("DTSTART:20251006T090000");
    expect(ics).toContain("DTEND:20251006T095000");
    expect(ics).toContain("DESCRIPTION:cours\\;\\nurl");
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
  });
});
