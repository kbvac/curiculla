/**
 * UCSD department importer — adapter-driven, deterministic.
 *
 *   tsx prisma/seed/import-ucsd-dept.ts CSE [2022-23]
 *
 * 1. Fetches the official course catalog  …/archive/{year}/courses/{DEPT}.html
 * 2. Fetches the official program page    …/archive/{year}/curric/{DEPT}-ug.html
 * 3. Upserts courses (+ prerequisite graph from the official prerequisites)
 * 4. Creates Degree + Curriculum per program found
 * 5. Rebuilds the learning path from the official core areas (each area = phase)
 *
 * Noise filter: seminars & special studies are excluded by default.
 */

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { ucsdAdapter } from "../../src/lib/catalog/adapters/ucsd.js";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

// Seul le graduate (numéros >= 200) est exclu : tout le programme undergrad
// officiel — y compris séminaires (87/90/91/99) et special studies (190-199)
// — fait partie du catalogue de référence 2022–23.
function isNoise(code: string): boolean {
  const m = code.match(/\d+/);
  if (!m) return true;
  return parseInt(m[0], 10) >= 200;
}



async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Curricula/1.0 University Catalog Import" },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function degreeSlugify(degreeName: string): string {
  return degreeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function importUcsdDepartment(dept: string, catalogYear?: string) {
  const deptUpper = dept.toUpperCase();
  const catalogUrl = ucsdAdapter.courseCatalogUrl(deptUpper, catalogYear);
  const curriculumUrl = ucsdAdapter.ugCurriculumUrl(deptUpper, catalogYear);

  console.log(`🏛  UCSD adapter — department ${deptUpper}`);
  console.log(`   Catalog:   ${catalogUrl}`);
  console.log(`   Program:   ${curriculumUrl}\n`);

  // ── 1. Course catalog ────────────────────────────────────────────────────────
  const catalogText = await fetchText(catalogUrl);
  const { courses: parsed, warnings } = ucsdAdapter.parseCourseCatalog(catalogText);
  const keep = parsed.filter((c) => !isNoise(c.code));
  const excluded = parsed.length - keep.length;

  const university = await prisma.university.findUnique({ where: { slug: "ucsd" } });
  if (!university) throw new Error("University 'ucsd' not found — run base seed first.");

  console.log(`📚 Catalog parsed: ${parsed.length} courses (${excluded} graduate courses excluded, undergrad fully kept)`);

  const courseIdByCode = new Map<string, string>();
  let created = 0;
  let updated = 0;

  for (const c of keep) {
    const slug = `ucsd-${c.code.toLowerCase().replace(/\s+/g, "-")}`;
    const level =
      c.catalogLevel === "LOWER_DIVISION"
        ? "BEGINNER"
        : c.catalogLevel === "GRADUATE"
          ? "ADVANCED"
          : (parseInt(c.code.split(" ")[1] ?? "0", 10) >= 120 ? "ADVANCED" : "INTERMEDIATE");

    const existing = await prisma.course.findUnique({ where: { slug }, select: { id: true } });
    const course = await prisma.course.upsert({
      where: { slug },
      update: {
        title: c.title,
        description: c.description.slice(0, 4000),
        units: c.units,
        catalogLevel: c.catalogLevel,
        level,
        url: catalogUrl,
        universityId: university.id,
      },
      create: {
        slug,
        code: c.code,
        title: c.title,
        description: c.description.slice(0, 4000),
        units: c.units,
        catalogLevel: c.catalogLevel,
        level,
        url: catalogUrl,
        universityId: university.id,
      },
    });
    if (existing) updated++;
    else created++;
    courseIdByCode.set(c.code, course.id);
  }
  console.log(`   ✓ Courses: ${created} created, ${updated} updated`);

  // ── 2. Prerequisites (official text → edges; external depts logged) ─────────
  // The catalog import is authoritative: rebuild the dept's edge set from scratch
  const importedIds = [...courseIdByCode.values()];
  await prisma.coursePrerequisite.deleteMany({
    where: { OR: [{ courseId: { in: importedIds } }, { prerequisiteId: { in: importedIds } }] },
  });

  let prereqCreated = 0;
  const external = new Set<string>();
  for (const c of keep) {
    const courseId = courseIdByCode.get(c.code);
    if (!courseId) continue;
    for (const preCode of c.prerequisites) {
      const preId = courseIdByCode.get(preCode);
      if (preId) {
        const exists = await prisma.coursePrerequisite.findUnique({
          where: { courseId_prerequisiteId: { courseId, prerequisiteId: preId } },
        });
        if (!exists) {
          await prisma.coursePrerequisite.create({ data: { courseId, prerequisiteId: preId } });
          prereqCreated++;
        }
      } else {
        external.add(preCode);
      }
    }
  }
  console.log(`   ✓ Prerequisites: ${prereqCreated} edges created`);
  console.log(`   ℹ  External prerequisite codes (other departments, kept out of the graph): ${[...external].sort().join(", ") || "none"}`);
  for (const w of warnings) console.log(`   ⚠ ${w}`);

  // ── 3. Programs → Degrees + Curricula ───────────────────────────────────────
  const curriculumText = await fetchText(curriculumUrl);
  const programs = ucsdAdapter.parseCurriculum(curriculumText, curriculumUrl);
  console.log(`\n🎓 Programs found: ${programs.map((p) => p.degreeName).join(" | ")}`);

  const degreesCreated: Array<{ slug: string; program: (typeof programs)[number] }> = [];

  for (const program of programs) {
    const dSlug = `ucsd-${degreeSlugify(program.degreeName)}`;
    const degree = await prisma.degree.upsert({
      where: { slug: dSlug },
      update: { name: program.degreeName, universityId: university.id },
      create: {
        slug: dSlug,
        name: program.degreeName,
        level: "BACHELOR",
        universityId: university.id,
      },
    });

    let curriculum = await prisma.curriculum.findFirst({
      where: { degreeId: degree.id, name: `Catalog ${catalogYear ?? "current"}` },
    });
    if (!curriculum) {
      curriculum = await prisma.curriculum.create({
        data: {
          degreeId: degree.id,
          name: `Catalog ${catalogYear ?? "current"}`,
          source: program.sourceUrl,
        },
      });
    }

    // Curriculum membership: lower-division + core courses
    const memberCodes = new Set<string>([
      ...program.lowerDivisionCodes.filter((code) => courseIdByCode.has(code)),
      ...program.coreAreas.flatMap((a) => a.codes).filter((code) => courseIdByCode.has(code)),
    ]);
    for (const code of memberCodes) {
      const courseId = courseIdByCode.get(code)!;
      await prisma.curriculumCourse.upsert({
        where: { curriculumId_courseId: { curriculumId: curriculum.id, courseId } },
        update: {},
        create: { curriculumId: curriculum.id, courseId },
      });
    }
    console.log(`   ✓ Degree "${program.degreeName}": ${memberCodes.size} catalog courses linked (${program.totalUnits ?? "?"} units)`);
    degreesCreated.push({ slug: dSlug, program });
  }

  // ── 4. Learning path from the official program (primary BS CS) ──────────────
  // Steps are the ACTUAL catalog courses, in the official requirement order.
  // Core areas with "or" groups become "choose one" steps (isRequired=false).
  const primary = degreesCreated.find((d) => d.program.degreeName === "BS Computer Science") ?? degreesCreated[0];
  if (primary) {
    const csDomain = await prisma.domain.findUnique({ where: { slug: "computer-science" } });
    if (!csDomain) throw new Error("Domain 'computer-science' not found — run base seed first.");

    const pathSlug = `ucsd-${degreeSlugify(primary.program.degreeName)}`;
    const path = await prisma.learningPath.upsert({
      where: { slug: pathSlug },
      update: { name: `UCSD ${primary.program.degreeName}`, domainId: csDomain.id },
      create: {
        slug: pathSlug,
        domainId: csDomain.id,
        name: `UCSD ${primary.program.degreeName}`,
        tagline: "Parcours officiel du programme UCSD CSE — cours réels du catalogue",
        description: `Learning path fidèle au programme officiel (${primary.program.sourceUrl}) : lower-division, core courses par domaine exigé, alternatives "au choix", electives.`,
        estimatedMonths: primary.program.totalUnits ? Math.round(primary.program.totalUnits / 12) : 48,
        order: 100,
      },
    });

    // Rebuild official steps only — MANUAL steps (hand-added enrichments)
    // are preserved and official steps continue after them.
    await prisma.learningPathStep.deleteMany({
      where: { pathId: path.id, origin: "IMPORT" },
    });
    const maxStep = await prisma.learningPathStep.findFirst({
      where: { pathId: path.id },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    let order = (maxStep?.order ?? -1) + 1;
    const missing = new Set<string>();
    const program = primary.program;

    const addCourseStep = async (phase: string, code: string, isRequired: boolean) => {
      const courseId = courseIdByCode.get(code);
      if (!courseId) {
        missing.add(code);
        return;
      }
      // Courses already placed earlier in the path are not repeated
      const already = await prisma.learningPathStep.findFirst({
        where: { pathId: path.id, courseId },
        select: { id: true },
      });
      if (already) return;
      await prisma.learningPathStep.create({
        data: { pathId: path.id, courseId, phase, order, isRequired, origin: "IMPORT" },
      });
      order++;
    };

    // Phase 1 — Lower division hierarchy:
    //   entry choices (8A/8B/11/6R/3...) → required sequence (12, 15L, 20, 21, 30, 103)
    //   → 2-unit "any time" extras (42, 86, 180...), which may require CSE 12.
    const lower = program.lowerDivisionCodes.filter((c) => courseIdByCode.has(c));
    const entryChoices = new Set(["CSE 3", "CSE 6R", "CSE 6GS", "CSE 8A", "CSE 8B", "CSE 11"]);
    const extraChoices = new Set([
      "CSE 4GS", "CSE 42", "CSE 86", "CSE 90", "CSE 91", "CSE 95", "CSE 99", "CSE 180", "CSE 180R",
    ]);
    const byNumber = (a: string, b: string) => {
      const na = parseInt(a.replace(/\D+/g, ""), 10) || 0;
      const nb = parseInt(b.replace(/\D+/g, ""), 10) || 0;
      return na - nb || a.localeCompare(b);
    };
    const lowerOrdered = [
      ...lower.filter((c) => entryChoices.has(c)).sort(byNumber),
      ...lower.filter((c) => !entryChoices.has(c) && !extraChoices.has(c)),
      ...lower.filter((c) => extraChoices.has(c)).sort(byNumber),
    ];
    for (const code of lowerOrdered) {
      await addCourseStep("LOWER DIVISION", code, !(entryChoices.has(code) || extraChoices.has(code)));
    }

    // Phases 2..N — one phase per official core area, exact order
    for (const area of program.coreAreas) {
      for (const code of area.codes) {
        await addCourseStep(area.name, code, !area.isAlternative);
      }
    }

    // Final phase — Electives (suggested, choose 7 per the program)
    const electiveCodes = [
      "CSE 151A", "CSE 151B", "CSE 158", "CSE 132C", "CSE 160",
      "CSE 123", "CSE 127", "CSE 152A", "CSE 156", "CSE 131",
    ];
    for (const code of electiveCodes) {
      await addCourseStep("ELECTIVES", code, false);
    }

    const stepCount = await prisma.learningPathStep.count({ where: { pathId: path.id } });

    // ── Topological validation: a course must never appear before its prereqs ──
    const allSteps = await prisma.learningPathStep.findMany({
      where: { pathId: path.id },
      include: { course: { include: { prerequisites: { include: { prerequisite: { select: { id: true, code: true } } } } } } },
      orderBy: { order: "asc" },
    });
    const positionByCourseId = new Map<string, number>();
    allSteps.forEach((s, i) => {
      if (s.courseId) positionByCourseId.set(s.courseId, i);
    });
    const violations: string[] = [];
    for (const s of allSteps) {
      if (!s.course) continue;
      for (const edge of s.course.prerequisites) {
        const prePos = positionByCourseId.get(edge.prerequisite.id);
        if (prePos !== undefined && prePos > (positionByCourseId.get(s.courseId!) ?? 0)) {
          violations.push(`${edge.prerequisite.code} must come before ${s.course.code}`);
        }
      }
    }
    if (violations.length > 0) {
      console.log(`   ⚠ Sequence violations (prereq after dependent):`);
      for (const v of violations) console.log(`     - ${v}`);
    } else {
      console.log(`   ✓ Sequence valid: every course appears after all its prerequisites`);
    }

    console.log(`\n🛤  Path "${path.name}" (${pathSlug}) — ${stepCount} COURSE steps from the official program`);
    console.log(`   Phases: LOWER DIVISION → ${program.coreAreas.map((a) => a.name).join(" → ")} → ELECTIVES`);
    if (missing.size > 0) {
      console.log(`   ℹ  Program courses absent from this catalog (external depts): ${[...missing].sort().join(", ")}`);
    }
  }
}

// Run directly: tsx prisma/seed/import-ucsd-dept.ts CSE [2022-23]
if (process.argv[1]?.includes("import-ucsd-dept")) {
  const dept = process.argv[2] ?? "CSE";
  const year = process.argv[3];

  importUcsdDepartment(dept, year)
    .then(async () => {
      await prisma.$disconnect();
      console.log("\n🎉 Import complete!");
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
