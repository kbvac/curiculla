/**
 * UCSD Adapter
 *
 * URL logic (2022–23 archive shown; same shape for every catalog year):
 *   Course catalog : https://catalog.ucsd.edu/archive/{year}/courses/{DEPT}.html
 *   Program (UG)   : https://catalog.ucsd.edu/archive/{year}/curric/{DEPT}-ug.html
 *   Program (GR)   : https://catalog.ucsd.edu/archive/{year}/curric/{DEPT}-gr.html
 *   Podcasts (ETS) : https://podcast.ucsd.edu/watch/{term}/{course}_{section}[/{lecture}]
 *                    term: fa25, wi26, sp26, s126 (summer session 1), s226
 *                    course: "CSE 21" → "cse21", section: "a00", lecture: 1..N
 */

import type {
  CourseCatalogParseResult,
  ParsedCourse,
  ParsedProgram,
  RequirementArea,
  UniversityAdapter,
} from "./types";

// ─── URL builders ──────────────────────────────────────────────────────────────

const CATALOG_BASE = "https://catalog.ucsd.edu";
const PODCAST_BASE = "https://podcast.ucsd.edu";

function catalogRoot(catalogYear?: string): string {
  return catalogYear
    ? `${CATALOG_BASE}/archive/${catalogYear}`
    : CATALOG_BASE; // current catalog lives at the root
}

export function courseCatalogUrl(dept: string, catalogYear?: string): string {
  return `${catalogRoot(catalogYear)}/courses/${dept.toUpperCase()}.html`;
}

export function ugCurriculumUrl(dept: string, catalogYear?: string): string {
  return `${catalogRoot(catalogYear)}/curric/${dept.toUpperCase()}-ug.html`;
}

export function grCurriculumUrl(dept: string, catalogYear?: string): string {
  return `${catalogRoot(catalogYear)}/curric/${dept.toUpperCase()}-gr.html`;
}

/** "CSE 21" → "cse21" (podcast course identifier) */
export function podcastCourseId(courseCode: string): string {
  return courseCode.toLowerCase().replace(/\s+/g, "");
}

/** Course podcast index page (lists every lecture, grouped by week) */
export function podcastIndexUrl(
  term: string,
  courseCode: string,
  section = "a00",
): string {
  return `${PODCAST_BASE}/watch/${term}/${podcastCourseId(courseCode)}_${section}`;
}

export function watchUrl(
  term: string,
  courseCode: string,
  section = "a00",
  lecture?: number,
): string {
  const base = `${PODCAST_BASE}/watch/${term}/${podcastCourseId(courseCode)}_${section}`;
  return lecture ? `${base}/${lecture}` : base;
}

/** Quarter terms for a calendar year: fa25, wi26, sp26, s126, s226 */
export function termCodes(startYear: number): string[] {
  const yy = startYear % 100;
  return [`fa${yy}`, `wi${yy + 1}`, `sp${yy + 1}`, `s1${yy + 1}`, `s2${yy + 1}`];
}

// ─── Text normalization ────────────────────────────────────────────────────────

/** Strip HTML tags and markdown markers, keep line structure. */
export function normalizeText(raw: string): string {
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    // Block-level tags create line breaks; inline tags are just spaces
    .replace(/<\/?(p|div|br|li|ul|ol|h[1-6]|tr|table|section|article|header|footer|nav)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    // Markdown heading markers ("### BS Computer Science Program")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*\*?|__?)(.*?)\1/g, "$2")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

// UCSD course code: CSE 8B, MATH 20A, CSE 140L, ECE 15, BILD 1, ENG 100D
const COURSE_CODE = /[A-Z]{2,5}\s\d{1,3}[A-Z]{0,2}/g;

// ─── Course catalog parser ─────────────────────────────────────────────────────

const COURSE_HEADER = /^([A-Z]{2,5}\s\d{1,3}[A-Z]{0,2})\.\s+(.+?)\s+\((\d+(?:–\d+)?)\)\s*$/;

function parsePrerequisites(description: string): string[] {
  const match = description.match(/Prerequisites?:\s*(.+?)(?:\.\s|$)/i);
  if (!match) return [];
  // Concurrent enrollment / corequisites are NOT sequential prerequisites
  // (e.g. "CSE 8B or CSE 11, and concurrent enrollment with CSE 15L")
  const segments = match[1].split(/[;()]|,\s*(?=and\s+concurrent|corequisite)/i);
  const sequential = segments
    .filter((seg) => !/concurrent|corequisite/i.test(seg))
    .join(" ");
  const codes = sequential.match(COURSE_CODE) ?? [];
  return [...new Set(codes)];
}

export function parseCourseCatalog(raw: string): CourseCatalogParseResult {
  const text = normalizeText(raw);
  const lines = text.split("\n");
  const warnings: string[] = [];
  const courses: ParsedCourse[] = [];

  let section: ParsedCourse["catalogLevel"] = "LOWER_DIVISION";
  let current: { code: string; title: string; units: number | null; body: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const description = current.body.join(" ").trim();
    const self = current.code;
    const prerequisites = parsePrerequisites(description).filter((c) => c !== self);
    courses.push({
      code: current.code,
      title: current.title,
      units: current.units,
      description,
      prerequisites,
      catalogLevel: section,
    });
    current = null;
  };

  for (const line of lines) {
    // Section switch (must be checked before course header — "Upper Division" isn't a course)
    if (/^Upper[- ]?Division/i.test(line)) {
      flush();
      section = "UPPER_DIVISION";
      continue;
    }
    if (/^Lower[- ]?Division/i.test(line)) {
      flush();
      section = "LOWER_DIVISION";
      continue;
    }
    if (/^Professional Courses?|^Graduate Courses?/i.test(line)) {
      flush();
      section = "GRADUATE";
      continue;
    }

    const header = line.match(COURSE_HEADER);
    if (header) {
      flush();
      const [, code, title, unitsRaw] = header;
      const units = /^\d+$/.test(unitsRaw) ? parseInt(unitsRaw, 10) : null;
      if (units === null) {
        warnings.push(`${code}: variable units "${unitsRaw}" stored as null`);
      }
      current = { code, title, units, body: [] };
      continue;
    }

    if (current) {
      current.body.push(line);
    }
  }
  flush();

  return { courses, warnings };
}

// ─── Curriculum (program) parser ───────────────────────────────────────────────

function splitDegreeSections(text: string): Array<{ name: string; body: string[] }> {
  const lines = text.split("\n");
  const sections: Array<{ name: string; body: string[] }> = [];
  let current: { name: string; body: string[] } | null = null;

  for (const line of lines) {
    // "BS Computer Science Program" (markdown renders ### as plain line)
    const degreeMatch = line.match(/^((?:BS|BA)\b.*?)\s+Program\s*$/);
    if (degreeMatch) {
      if (current) sections.push(current);
      current = { name: degreeMatch[1].trim(), body: [] };
      continue;
    }
    if (current) current.body.push(line);
  }
  if (current) sections.push(current);
  return sections;
}

function parseTotalUnits(body: string[]): number | null {
  const m = body.join(" ").match(/requires?\s+a\s+total\s+of\s+(\d+)\s+units/i);
  return m ? parseInt(m[1], 10) : null;
}

function parseLowerDivision(body: string[]): string[] {
  const start = body.findIndex((l) => /Lower-Division Requirements/i.test(l));
  const end = body.findIndex((l) => /Upper-Division Requirements/i.test(l));
  if (start === -1) return [];
  const block = body.slice(start, end === -1 ? body.length : end).join("\n");
  // Only the CS requirement lines mention course codes; keep all codes found in block
  const codes = block.match(COURSE_CODE) ?? [];
  return [...new Set(codes)];
}

function isAreaLine(line: string): boolean {
  // Markdown "- Name: CODE" or HTML <li>Name: CODE</li> (dash already stripped)
  return (
    /:\s*/.test(line) &&
    (line.match(COURSE_CODE) ?? []).length > 0 &&
    !/^Prerequisites/i.test(line)
  );
}

function parseAreaLine(line: string): RequirementArea | null {
  const nameMatch = line.match(/^(.+?):\s*(.+)$/);
  if (!nameMatch) return null;
  const name = nameMatch[1].replace(/[*_]/g, "").replace(/^-\s+/, "").trim();
  const rest = nameMatch[2];
  const codes = [...new Set(rest.match(COURSE_CODE) ?? [])];
  if (codes.length === 0) return null;
  // Area names are short labels; anything longer is prose, not an area
  if (name.length < 3 || name.length > 80) return null;
  const isAlternative = /\bor\b/i.test(rest);
  return { name, codes, isAlternative };
}

function parseCoreAreas(body: string[]): RequirementArea[] {
  // Exact heading match — "1. Core Courses" — prose mentions are ignored
  const start = body.findIndex((l) => /^(\d+\.\s*)?Core Courses$/i.test(l.trim()));
  if (start === -1) return [];
  const end = body.findIndex(
    (l, i) => i > start && /^(\d+\.\s*)?Electives\b/i.test(l.trim()),
  );
  const block = body.slice(start, end === -1 ? body.length : end);

  const areas: RequirementArea[] = [];
  for (const line of block) {
    if (!isAreaLine(line)) continue;
    const area = parseAreaLine(line);
    // Skip generic lines without a meaningful area name (e.g. units totals)
    if (area && area.name.length > 2 && !/^\d/.test(area.name)) {
      areas.push(area);
    }
  }
  return areas;
}

export function parseCurriculum(raw: string, sourceUrl: string): ParsedProgram[] {
  const text = normalizeText(raw);
  const sections = splitDegreeSections(text);

  return sections.map((section) => ({
    degreeName: section.name,
    totalUnits: parseTotalUnits(section.body),
    lowerDivisionCodes: parseLowerDivision(section.body),
    coreAreas: parseCoreAreas(section.body),
    sourceUrl,
  }));
}

// ─── Podcast schedule parser (weekly emploi du temps) ──────────────────────────

import type { PodcastScheduleParseResult, ScheduleSession, ScheduleWeek } from "./types";

/** Like normalizeText, but keeps link targets as `text ⟨url⟩` markers. */
function normalizeTextKeepLinks(raw: string): string {
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    // Preserve <a href> as "text ⟨url⟩" before stripping tags
    .replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_m, href: string, text: string) =>
      `${text.replace(/<[^>]+>/g, " ").trim()} ⟨${href}⟩`,
    )
    // Markdown links too ([Mon 4/1](url))
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1 ⟨$2⟩")
    .replace(/<\/?(p|div|br|li|ul|ol|h[1-6]|tr|table|section|article|header|footer|nav)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*\*?|__?)(.*?)\1/g, "$2")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

const SESSION_LINE =
  /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2}\/\d{1,2})(?:\s*\[([A-Za-z]\d{2})\])?\s*⟨(https?:\/\/[^⟩]+)⟩\s*$/;

export function parsePodcastSchedule(
  raw: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- signature parity with other parsers
  sourceUrl: string,
): PodcastScheduleParseResult {
  const text = normalizeTextKeepLinks(raw);
  const lines = text.split("\n");
  const warnings: string[] = [];

  // Header: title, instructor, term
  const titleLine = lines.find((l) => /^CSE\s/.test(l) && / - /.test(l));
  const courseTitle = titleLine?.replace(/\s*-\s*Course Podcasts.*$/i, "").trim() ?? "";
  const instructor =
    lines.find((l) => /^[-•\s]*Professor\s/.test(l))?.replace(/^[-•\s]+/, "").trim() ?? null;
  const termLabel =
    lines.find((l) => /^(Winter|Spring|Fall|Summer)\s+\d{4}$/i.test(l.trim()))?.trim() ?? "";

  const weeks: ScheduleWeek[] = [];
  let currentWeek: ScheduleWeek | null = null;

  for (const line of lines) {
    const weekMatch = line.match(/^Week\s+(\d+)$/i);
    if (weekMatch) {
      currentWeek = { weekNumber: parseInt(weekMatch[1], 10), sessions: [] };
      weeks.push(currentWeek);
      continue;
    }
    if (!currentWeek) continue;

    const sessionMatch = line.match(SESSION_LINE);
    if (!sessionMatch) continue;

    const [, day, date, sectionLabel, url] = sessionMatch;
    const lectureStr = url.split("/").pop() ?? "";
    const lectureNumber = parseInt(lectureStr, 10);
    if (!Number.isFinite(lectureNumber)) {
      warnings.push(`Unparseable lecture number in ${url}`);
      continue;
    }
    const isDiscussion = Boolean(sectionLabel);
    const session: ScheduleSession = {
      lectureNumber,
      sessionKind: isDiscussion ? "DISCUSSION" : "LECTURE",
      section: (sectionLabel ?? "a00").toLowerCase(),
      dateLabel: `${day} ${date}`,
      url,
    };
    currentWeek.sessions.push(session);
  }

  if (weeks.length === 0) {
    warnings.push("No weeks found on the podcast page");
  }

  return {
    courseTitle,
    instructor,
    termLabel,
    weeks: weeks.filter((w) => w.sessions.length > 0),
    warnings,
  };
}

// ─── Adapter export ────────────────────────────────────────────────────────────

export const ucsdAdapter: UniversityAdapter = {
  id: "ucsd",
  universitySlug: "ucsd",
  courseCatalogUrl,
  ugCurriculumUrl,
  grCurriculumUrl,
  watchUrl,
  podcastIndexUrl,
  termCodes,
  parseCourseCatalog,
  parseCurriculum,
  parsePodcastSchedule,
};
