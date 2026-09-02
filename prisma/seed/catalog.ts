/**
 * Course Catalog Builder — single source of truth.
 *
 *   npm run catalog:build
 *
 * The catalog is built ONLY from university adapters. For now, exactly one
 * catalog is valid: UCSD CSE (official catalog + official program).
 *
 * Pipeline:
 *   1. CLEAN   — purge everything not issued from a valid adapter import
 *                (courses from other sources, non-UCSD university resources)
 *   2. BUILD   — UCSD CSE: official course catalog → Course + prerequisite graph
 *                official program → Degrees + Curricula + official learning path
 *   3. LIBRARY — attach verified official resources (UCSD ETS podcasts)
 */

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { importUcsdDepartment } from "./import-ucsd-dept.js";
import { ucsdPodcastResources } from "./data/ucsd-resources.js";
import { ucsdCseCatalog } from "./data/ucsd-cse-skills.js";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const VALID_COURSE_PREFIX = "ucsd-cse-";
const CATALOG_YEAR = "2022-23";

// ─── 1. Clean ──────────────────────────────────────────────────────────────────

async function cleanInvalidCatalog() {
  console.log("🧹 Cleaning invalid catalog data...");

  // Courses not issued from the valid adapter import
  const invalidCourses = await prisma.course.findMany({
    where: { slug: { not: { startsWith: VALID_COURSE_PREFIX } } },
    select: { id: true },
  });
  const invalidIds = invalidCourses.map((c) => c.id);

  if (invalidIds.length > 0) {
    await prisma.resource.updateMany({
      where: { courseId: { in: invalidIds } },
      data: { courseId: null },
    });
    await prisma.curriculumCourse.deleteMany({ where: { courseId: { in: invalidIds } } });
    await prisma.coursePrerequisite.deleteMany({
      where: { OR: [{ courseId: { in: invalidIds } }, { prerequisiteId: { in: invalidIds } }] },
    });
    await prisma.course.deleteMany({ where: { id: { in: invalidIds } } });
  }
  console.log(`   ✓ Courses purged: ${invalidIds.length} (kept: ${VALID_COURSE_PREFIX}*)`);

  // University resources from universities without a valid adapter catalog
  const invalidResources = await prisma.resource.findMany({
    where: { university: { slug: { not: "ucsd" } } },
    select: { id: true },
  });
  const invalidResourceIds = invalidResources.map((r) => r.id);

  if (invalidResourceIds.length > 0) {
    await prisma.resourceSkill.deleteMany({ where: { resourceId: { in: invalidResourceIds } } });
    await prisma.userProgress.deleteMany({ where: { resourceId: { in: invalidResourceIds } } });
    await prisma.resource.deleteMany({ where: { id: { in: invalidResourceIds } } });
  }
  console.log(`   ✓ University resources purged: ${invalidResourceIds.length} (kept: UCSD only)`);

  // Degrees not issued from a valid UCSD program import
  const invalidDegrees = await prisma.degree.findMany({
    where: { slug: { not: { startsWith: "ucsd-bs-" } } },
    select: { id: true },
  });
  const invalidDegreeIds = invalidDegrees.map((d) => d.id);

  if (invalidDegreeIds.length > 0) {
    const curricula = await prisma.curriculum.findMany({
      where: { degreeId: { in: invalidDegreeIds } },
      select: { id: true },
    });
    const curriculumIds = curricula.map((c) => c.id);
    if (curriculumIds.length > 0) {
      await prisma.curriculumCourse.deleteMany({ where: { curriculumId: { in: curriculumIds } } });
      await prisma.curriculum.deleteMany({ where: { id: { in: curriculumIds } } });
    }
    await prisma.degree.deleteMany({ where: { id: { in: invalidDegreeIds } } });
  }
  console.log(`   ✓ Orphan degrees purged: ${invalidDegreeIds.length} (kept: ucsd-bs-*)`);

  // Curricula not created by the official import (e.g. hand-built drafts)
  const invalidCurricula = await prisma.curriculum.findMany({
    where: { name: { not: `Catalog ${CATALOG_YEAR}` } },
    select: { id: true },
  });
  const invalidCurriculumIds = invalidCurricula.map((c) => c.id);

  if (invalidCurriculumIds.length > 0) {
    await prisma.curriculumCourse.deleteMany({ where: { curriculumId: { in: invalidCurriculumIds } } });
    await prisma.curriculum.deleteMany({ where: { id: { in: invalidCurriculumIds } } });
  }
  console.log(`   ✓ Draft curricula purged: ${invalidCurriculumIds.length} (kept: "Catalog ${CATALOG_YEAR}")`);
}

// ─── 3. Library (verified official resources) ──────────────────────────────────

async function seedUcsdResources() {
  console.log("\n🔗 Attaching verified UCSD ETS podcast resources...");

  const university = await prisma.university.findUnique({ where: { slug: "ucsd" } });
  if (!university) throw new Error("University 'ucsd' not found");

  const allSkills = await prisma.skill.findMany({ select: { id: true, slug: true } });
  const skillBySlug = new Map(allSkills.map((s) => [s.slug, s]));
  const skillsByCode = new Map(ucsdCseCatalog.map((c) => [c.code, c.skillSlugs]));

  let linked = 0;
  for (const r of ucsdPodcastResources) {
    const slug = `ucsd-${r.code.toLowerCase().replace(/\s+/g, "-")}-${r.term}`;

    const resource = await prisma.resource.upsert({
      where: { slug },
      update: {
        title: `${r.code} - ${r.title}`,
        url: r.url,
        instructor: r.instructor,
        year: r.year,
        universityId: university.id,
        verified: true,
      },
      create: {
        slug,
        title: `${r.code} - ${r.title}`,
        type: "LECTURE",
        url: r.url,
        description: `${r.title} — official lecture recordings (UCSD Educational Technology Services)`,
        instructor: r.instructor,
        language: "en",
        level: "INTERMEDIATE",
        year: r.year,
        universityId: university.id,
        qualityScore: 85 + Math.floor(Math.random() * 15),
        qualityMeta: JSON.stringify({
          reasons: [
            "Official UCSD ETS lecture recordings",
            `Instructor: ${r.instructor}`,
            `Term: ${r.term}`,
          ],
        }),
        verified: true,
      },
    });

    // Link to its course
    const courseSlug = `ucsd-${r.code.toLowerCase().replace(/\s+/g, "-")}`;
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      select: { id: true },
    });
    if (course) {
      await prisma.resource.update({
        where: { id: resource.id },
        data: { courseId: course.id },
      });
    }

    // Link to matching skills via the curated catalog mapping
    for (const skillSlug of skillsByCode.get(r.code) ?? []) {
      const skill = skillBySlug.get(skillSlug);
      if (!skill) continue;
      await prisma.resourceSkill.upsert({
        where: {
          resourceId_skillId: { resourceId: resource.id, skillId: skill.id },
        },
        update: { isPrimary: true },
        create: { resourceId: resource.id, skillId: skill.id, isPrimary: true },
      });
    }

    linked++;
  }
  console.log(`   ✓ ${linked} official resources attached`);
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

async function printStats() {
  const [courses, prereqs, resources, degrees, curricula, pathSteps] = await Promise.all([
    prisma.course.count(),
    prisma.coursePrerequisite.count(),
    prisma.resource.count(),
    prisma.degree.count(),
    prisma.curriculum.count(),
    prisma.learningPathStep.count({ where: { path: { slug: "ucsd-bs-computer-science" } } }),
  ]);

  console.log("\n📊 Catalog state:");
  console.log(`   Courses: ${courses} (all UCSD CSE)`);
  console.log(`   Official prerequisites: ${prereqs}`);
  console.log(`   Degrees: ${degrees} · Curricula: ${curricula}`);
  console.log(`   Learning path steps (official BS CS): ${pathSteps}`);
  console.log(`   Resources: ${resources}`);
}

async function main() {
  await cleanInvalidCatalog();
  console.log("\n🏗  Building UCSD CSE catalog via adapter...");
  await importUcsdDepartment("CSE", CATALOG_YEAR);
  await seedUcsdResources();
  await printStats();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n🎉 Catalog build complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
