/**
 * UCSD lecture importer — weekly schedule from the official ETS podcast pages.
 *
 *   npm run import:ucsd:lectures
 *
 * For every course with a verified podcast resource, fetches the course
 * podcast index page (podcast.ucsd.edu/watch/{term}/{course}_{section}),
 * parses the Week 1..N structure via the UCSD adapter, and stores each
 * session as a Resource (LECTURE / DISCUSSION) positioned in the week grid.
 */

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { ucsdAdapter } from "../../src/lib/catalog/adapters/ucsd.js";
import { ucsdPodcastResources } from "./data/ucsd-resources.js";
import { ucsdCseCatalog } from "./data/ucsd-cse-skills.js";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Curricula/1.0 University Schedule Import" },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

async function importLectures() {
  const university = await prisma.university.findUnique({ where: { slug: "ucsd" } });
  if (!university) throw new Error("University 'ucsd' not found");

  console.log("📅 Importing weekly schedules from official UCSD podcast pages...\n");

  // Course code → skill slugs (curated mapping). Lectures are linked to the
  // same skills as their course (isPrimary=false) so that watching a session
  // feeds skill mastery via the existing /api/progress recomputation.
  const skillsByCode = new Map(ucsdCseCatalog.map((c) => [c.code, c.skillSlugs]));
  const allSkills = await prisma.skill.findMany({ select: { id: true, slug: true } });
  const skillBySlug = new Map(allSkills.map((s) => [s.slug, s]));

  let totalSessions = 0;

  for (const r of ucsdPodcastResources) {
    // The platform serves the full week listing on any lecture page (e.g. /1),
    // but returns 500/empty on the bare section index — always fetch /1.
    const fetchUrl = r.url.endsWith("/1") ? r.url : `${r.url.replace(/\/+$/, "")}/1`;
    const courseSlug = `ucsd-${r.code.toLowerCase().replace(/\s+/g, "-")}`;
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      select: { id: true, code: true },
    });
    if (!course) {
      console.log(`  ⚠ ${r.code}: course not in catalog, skipped`);
      continue;
    }

    try {
      const html = await fetchText(fetchUrl);
      const schedule = ucsdAdapter.parsePodcastSchedule(html, fetchUrl);

      let created = 0;
      let updated = 0;

      for (const week of schedule.weeks) {
        for (const s of week.sessions) {
          const slug = `ucsd-${r.code.toLowerCase().replace(/\s+/g, "-")}-${r.term}-l${String(s.lectureNumber).padStart(3, "0")}`;
          const title =
            s.sessionKind === "DISCUSSION"
              ? `${r.code} — Discussion [${s.section.toUpperCase()}] · ${s.dateLabel}`
              : `${r.code} — Lecture ${s.lectureNumber} · ${s.dateLabel}`;

          const existing = await prisma.resource.findUnique({ where: { slug }, select: { id: true } });
          const resource = await prisma.resource.upsert({
            where: { slug },
            update: {
              title,
              url: s.url,
              weekNumber: week.weekNumber,
              lectureNumber: s.lectureNumber,
              sessionKind: s.sessionKind,
              dateLabel: s.dateLabel,
              courseId: course.id,
              universityId: university.id,
              verified: true,
            },
            create: {
              slug,
              title,
              type: s.sessionKind === "DISCUSSION" ? "DISCUSSION" : "LECTURE",
              url: s.url,
              description: `${r.title} — ${schedule.termLabel}, semaine ${week.weekNumber} (${s.dateLabel})`,
              instructor: schedule.instructor ?? r.instructor,
              language: "en",
              level: "INTERMEDIATE",
              year: r.year,
              term: r.term,
              weekNumber: week.weekNumber,
              lectureNumber: s.lectureNumber,
              sessionKind: s.sessionKind,
              dateLabel: s.dateLabel,
              universityId: university.id,
              courseId: course.id,
              qualityScore: 90,
              verified: true,
            },
          });
          if (existing) updated++;
          else created++;

          // Link the session to the course's skills (secondary weight)
          for (const skillSlug of skillsByCode.get(r.code) ?? []) {
            const skill = skillBySlug.get(skillSlug);
            if (!skill) continue;
            await prisma.resourceSkill.upsert({
              where: {
                resourceId_skillId: { resourceId: resource.id, skillId: skill.id },
              },
              update: {},
              create: { resourceId: resource.id, skillId: skill.id, isPrimary: false },
            });
          }
        }
      }

      const weeksCount = schedule.weeks.length;
      const sessionsCount = schedule.weeks.reduce((acc, w) => acc + w.sessions.length, 0);
      totalSessions += sessionsCount;
      console.log(
        `  ✓ ${course.code} ${r.term}: ${weeksCount} semaines, ${sessionsCount} sessions (${created} créées, ${updated} maj) — ${schedule.instructor ?? "?"}`,
      );
    } catch (e) {
      console.log(`  ✗ ${r.code} ${r.term}: ${(e as Error).message}`);
    }
  }

  console.log(`\n📊 ${totalSessions} sessions hebdomadaires importées`);
}

importLectures()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🎉 Lecture import complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
