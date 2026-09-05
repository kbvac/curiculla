/**
 * University Adapter — contract
 *
 * Each university gets an adapter encoding how its official systems work:
 *   - catalog: department course catalog URLs + parser
 *   - curric:  degree program pages (requirements → learning path phases)
 *   - media:   lecture recording / podcast URL builders
 *
 * Everything is deterministic: URL templates + pure-text parsers, no scraping.
 */

export type ParsedCourse = {
  code: string; // "CSE 100"
  title: string;
  units: number | null;
  description: string;
  prerequisites: string[]; // all course codes mentioned
  corequisites: string[]; // courses explicitly taken concurrently
  catalogLevel: "LOWER_DIVISION" | "UPPER_DIVISION" | "GRADUATE";
};

export type RequirementArea = {
  name: string; // "Algorithms/theory"
  codes: string[]; // ["CSE 101", "CSE 105"]
  isAlternative: boolean; // "or" group — student picks one
};

export type ParsedProgram = {
  degreeName: string; // "BS Computer Science"
  totalUnits: number | null;
  lowerDivisionCodes: string[];
  coreAreas: RequirementArea[];
  sourceUrl: string;
};

export type CourseCatalogParseResult = {
  courses: ParsedCourse[];
  warnings: string[];
};

export type ScheduleSession = {
  lectureNumber: number; // sequential recording number on the platform
  sessionKind: "LECTURE" | "DISCUSSION";
  section: string; // "a00" | "a01"
  dateLabel: string; // "Mon 4/1"
  url: string;
};

export type ScheduleWeek = {
  weekNumber: number; // 1..10
  sessions: ScheduleSession[];
};

export type PodcastScheduleParseResult = {
  courseTitle: string;
  instructor: string | null;
  termLabel: string; // "Spring 2024"
  weeks: ScheduleWeek[];
  warnings: string[];
};

export type UniversityAdapter = {
  id: string; // "ucsd"
  universitySlug: string;

  // ── URL builders (deterministic templates) ──────────────────────────────────
  /** Department course catalog, e.g. /courses/CSE.html */
  courseCatalogUrl(dept: string, catalogYear?: string): string;
  /** Undergraduate program page, e.g. /curric/CSE-ug.html */
  ugCurriculumUrl(dept: string, catalogYear?: string): string;
  /** Graduate program page, e.g. /curric/CSE-gr.html */
  grCurriculumUrl(dept: string, catalogYear?: string): string;
  /** Lecture recording watch URL, e.g. podcast.ucsd.edu/watch/wi24/cse21_a00/1 */
  watchUrl(term: string, courseCode: string, section?: string, lecture?: number): string;
  /** Course podcast index page, e.g. podcast.ucsd.edu/watch/wi24/cse21_a00 */
  podcastIndexUrl(term: string, courseCode: string, section?: string): string;
  /** Term codes for a given calendar year, e.g. ["fa25", "wi26", "sp26", "s126", "s226"] */
  termCodes(startYear: number): string[];

  // ── Parsers (pure functions on extracted text) ──────────────────────────────
  parseCourseCatalog(text: string): CourseCatalogParseResult;
  parseCurriculum(text: string, sourceUrl: string): ParsedProgram[];
  parsePodcastSchedule(text: string, sourceUrl: string): PodcastScheduleParseResult;
};
