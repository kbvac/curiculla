export type ResourceType =
  | "COURSE"
  | "LECTURE"
  | "LECTURE_NOTES"
  | "BOOK"
  | "EXERCISE"
  | "PROBLEM_SET"
  | "EXAM"
  | "PROJECT"
  | "LAB"
  | "SYLLABUS"
  | "VIDEO"
  | "DOCUMENTATION";

export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface ResourceSeed {
  slug: string;
  title: string;
  type: ResourceType;
  url: string;
  universitySlug: string;
  instructor?: string;
  description: string;
  language?: string;
  level?: Level;
  durationHours?: number;
  year?: number;
  certificate?: boolean;
  quality: { score: number; reasons: string[] };
}

export interface SkillSeed {
  slug: string;
  name: string;
  description?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prerequisites?: string[];
  resources: ResourceSeed[];
}

export interface TopicSeed {
  slug: string;
  name: string;
  description?: string;
  skills: SkillSeed[];
}

export interface SubjectSeed {
  slug: string;
  name: string;
  description?: string;
  topics: TopicSeed[];
}

export interface PathPhase {
  name: string;
  skillSlugs: string[];
}

export interface PathSeed {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  level: Level;
  estimatedMonths: number;
  phases: PathPhase[];
}

export interface CourseSeed {
  code?: string;
  slug: string;
  title: string;
  universitySlug: string;
  subjectSlug: string;
  level?: Level;
  description?: string;
  url?: string;
  skillSlugs?: string[];
}

export interface CurriculumSeed {
  degreeSlug: string;
  degreeName: string;
  degreeLevel: "BACHELOR" | "MASTER" | "CERTIFICATE";
  universitySlug: string;
  name: string;
  sourceUrl?: string;
  courses: {
    courseSlug: string;
    year?: number;
    semester?: number;
    order: number;
  }[];
}

export interface DomainSeed {
  slug: string;
  name: string;
  description: string;
  subjects: SubjectSeed[];
  paths: PathSeed[];
  courses?: CourseSeed[];
  curricula?: CurriculumSeed[];
}

// Canonical cross-domain prerequisite slugs (defined by Mathematics & CS domains).
// Other domains may reference these as prerequisites.
export const CANONICAL_MATH_SLUGS = [
  "calculus-1",
  "calculus-2",
  "calculus-3",
  "linear-algebra",
  "differential-equations",
  "probability",
  "statistics",
  "discrete-mathematics",
  "real-analysis",
  "optimization",
] as const;

export const CANONICAL_CS_SLUGS = [
  "python-basics",
  "python-oop",
  "data-structures",
  "algorithms",
  "complexity-analysis",
  "databases-sql",
  "git-version-control",
  "computer-architecture",
  "operating-systems",
  "networking-basics",
] as const;
