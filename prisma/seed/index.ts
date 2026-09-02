import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { universities } from "./data/universities.js";
import { computerScience } from "./data/computer-science.js";
import { dataScience } from "./data/data-science.js";
import { mathematics } from "./data/mathematics.js";
import { physics } from "./data/physics.js";
import { economicsFinance } from "./data/economics-finance.js";
import type { DomainSeed } from "./types.js";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const domains: DomainSeed[] = [
  computerScience,
  dataScience,
  mathematics,
  physics,
  economicsFinance,
];

// ─── Validation ──────────────────────────────────────────────────────────────

function validateDomain(domain: DomainSeed, globalSkills: Set<string>): string[] {
  const errors: string[] = [];
  const seenSkillSlugs = new Set<string>();

  for (const subject of domain.subjects) {
    for (const topic of subject.topics) {
      for (const skill of topic.skills) {
        if (seenSkillSlugs.has(skill.slug)) {
          errors.push(`[${domain.slug}] Duplicate skill slug: ${skill.slug}`);
        }
        seenSkillSlugs.add(skill.slug);

        for (const res of skill.resources) {
          if (!res.url.startsWith("http")) {
            errors.push(`[${domain.slug}] Invalid URL for ${res.slug}: ${res.url}`);
          }
        }
      }
    }
  }

  for (const path of domain.paths) {
    for (const phase of path.phases) {
      for (const skillSlug of phase.skillSlugs) {
        if (!globalSkills.has(skillSlug)) {
          errors.push(
            `[${domain.slug}] Path "${path.slug}" references unknown skill: ${skillSlug}`
          );
        }
      }
    }
  }

  for (const subject of domain.subjects) {
    for (const topic of subject.topics) {
      for (const skill of topic.skills) {
        for (const prereq of skill.prerequisites ?? []) {
          if (!globalSkills.has(prereq)) {
            errors.push(
              `[${domain.slug}] Skill "${skill.slug}" has unknown prerequisite: ${prereq}`
            );
          }
        }
      }
    }
  }

  return errors;
}

function validateAll(): string[] {
  const allErrors: string[] = [];
  const globalSkillSlugs = new Set<string>();

  // First pass: collect all skills globally
  for (const domain of domains) {
    for (const subject of domain.subjects) {
      for (const topic of subject.topics) {
        for (const skill of topic.skills) {
          globalSkillSlugs.add(skill.slug);
        }
      }
    }
  }

  // Second pass: validate each domain
  for (const domain of domains) {
    allErrors.push(...validateDomain(domain, globalSkillSlugs));
  }

  return allErrors;
}

// ─── Seed helpers ────────────────────────────────────────────────────────────

async function seedUniversity(u: (typeof universities)[number]) {
  return prisma.university.upsert({
    where: { slug: u.slug },
    update: {},
    create: {
      slug: u.slug,
      name: u.name,
      country: u.country,
      website: u.website,
      reputation: u.reputation,
    },
  });
}

async function seedDomain(domain: DomainSeed) {
  const dom = await prisma.domain.upsert({
    where: { slug: domain.slug },
    update: { name: domain.name, description: domain.description },
    create: {
      slug: domain.slug,
      name: domain.name,
      description: domain.description,
    },
  });

  let subjectOrder = 0;
  for (const subj of domain.subjects) {
    const subject = await prisma.subject.upsert({
      where: { slug: subj.slug },
      update: { name: subj.name, description: subj.description, domainId: dom.id },
      create: {
        slug: subj.slug,
        name: subj.name,
        description: subj.description,
        domainId: dom.id,
        order: subjectOrder++,
      },
    });

    let topicOrder = 0;
    for (const top of subj.topics) {
      const topic = await prisma.topic.upsert({
        where: { slug: top.slug },
        update: { name: top.name, description: top.description, subjectId: subject.id },
        create: {
          slug: top.slug,
          name: top.name,
          description: top.description,
          subjectId: subject.id,
          order: topicOrder++,
        },
      });

      let skillOrder = 0;
      for (const sk of top.skills) {
        const skill = await prisma.skill.upsert({
          where: { slug: sk.slug },
          update: {
            name: sk.name,
            description: sk.description,
            difficulty: sk.difficulty,
            topicId: topic.id,
          },
          create: {
            slug: sk.slug,
            name: sk.name,
            description: sk.description,
            difficulty: sk.difficulty,
            topicId: topic.id,
            order: skillOrder++,
          },
        });

        // Resources
        for (const res of sk.resources) {
          let universityId: string | undefined;
          if (res.universitySlug && res.universitySlug !== "") {
            const university = await prisma.university.findUnique({
              where: { slug: res.universitySlug },
            });
            if (!university) {
              console.warn(`  ⚠ University "${res.universitySlug}" not found for resource "${res.slug}", creating without university link`);
            } else {
              universityId = university.id;
            }
          }

          const resource = await prisma.resource.upsert({
            where: { slug: res.slug },
            update: {
              title: res.title,
              type: res.type,
              url: res.url,
              description: res.description,
              instructor: res.instructor,
              language: res.language ?? "en",
              level: res.level,
              durationHours: res.durationHours,
              year: res.year,
              certificate: res.certificate ?? false,
              qualityScore: res.quality.score,
              qualityMeta: JSON.stringify({ reasons: res.quality.reasons }),
              universityId: universityId ?? null,
            },
            create: {
              slug: res.slug,
              title: res.title,
              type: res.type,
              url: res.url,
              description: res.description,
              instructor: res.instructor,
              language: res.language ?? "en",
              level: res.level,
              durationHours: res.durationHours,
              year: res.year,
              certificate: res.certificate ?? false,
              qualityScore: res.quality.score,
              qualityMeta: JSON.stringify({ reasons: res.quality.reasons }),
              universityId: universityId ?? null,
              verified: false,
            },
          });

          await prisma.resourceSkill.upsert({
            where: { resourceId_skillId: { resourceId: resource.id, skillId: skill.id } },
            update: { isPrimary: sk.resources.indexOf(res) === 0 },
            create: {
              resourceId: resource.id,
              skillId: skill.id,
              isPrimary: sk.resources.indexOf(res) === 0,
            },
          });
        }
      }
    }
  }

  // Learning paths
  let pathOrder = 0;
  for (const path of domain.paths) {
    const lp = await prisma.learningPath.upsert({
      where: { slug: path.slug },
      update: {
        name: path.name,
        tagline: path.tagline,
        description: path.description,
        level: path.level,
        estimatedMonths: path.estimatedMonths,
        domainId: dom.id,
      },
      create: {
        slug: path.slug,
        name: path.name,
        tagline: path.tagline,
        description: path.description,
        level: path.level,
        estimatedMonths: path.estimatedMonths,
        domainId: dom.id,
        order: pathOrder++,
      },
    });

    let stepOrder = 0;
    for (const phase of path.phases) {
      for (const skillSlug of phase.skillSlugs) {
        // Look up skill globally (may belong to another domain)
        const skill = await prisma.skill.findUnique({ where: { slug: skillSlug } });
        if (!skill) {
          console.warn(`  ⚠ Skill "${skillSlug}" not found for path "${path.slug}", skipping step`);
          continue;
        }

        await prisma.learningPathStep.upsert({
          where: { pathId_skillId: { pathId: lp.id, skillId: skill.id } },
          update: { phase: phase.name, order: stepOrder },
          create: {
            pathId: lp.id,
            skillId: skill.id,
            phase: phase.name,
            order: stepOrder++,
            isRequired: true,
          },
        });
      }
    }
  }

  // Courses + curricula
  if (domain.courses) {
    for (const c of domain.courses) {
      const uni = await prisma.university.findUnique({ where: { slug: c.universitySlug } });
      const subj = await prisma.subject.findUnique({ where: { slug: c.subjectSlug } });
      if (!uni || !subj) {
        console.warn(`  ⚠ Missing uni/subject for course "${c.slug}", skipping`);
        continue;
      }

      const course = await prisma.course.upsert({
        where: { slug: c.slug },
        update: { title: c.title, code: c.code, description: c.description, level: c.level, url: c.url, universityId: uni.id, subjectId: subj.id },
        create: {
          slug: c.slug,
          title: c.title,
          code: c.code,
          description: c.description,
          level: c.level,
          url: c.url,
          universityId: uni.id,
          subjectId: subj.id,
        },
      });

      // Also create a Resource entry of type COURSE
      const resSlug = `resource-${c.slug}`;
      const existingRes = await prisma.resource.findUnique({ where: { slug: resSlug } });
      if (!existingRes) {
        await prisma.resource.create({
          data: {
            slug: resSlug,
            title: c.title,
            type: "COURSE",
            url: c.url ?? `https://ocw.mit.edu/courses/${c.slug}/`,
            description: c.description ?? c.title,
            level: c.level,
            universityId: uni.id,
            courseId: course.id,
            verified: false,
          },
        });
      }

      // Link course resources to skills
      if (c.skillSlugs) {
        for (const skillSlug of c.skillSlugs) {
          const skill = await prisma.skill.findUnique({ where: { slug: skillSlug } });
          if (skill && existingRes) {
            await prisma.resourceSkill.upsert({
              where: { resourceId_skillId: { resourceId: existingRes.id, skillId: skill.id } },
              update: {},
              create: { resourceId: existingRes.id, skillId: skill.id, isPrimary: false },
            });
          }
        }
      }
    }
  }

  if (domain.curricula) {
    for (const curr of domain.curricula) {
      const uni = await prisma.university.findUnique({ where: { slug: curr.universitySlug } });
      if (!uni) {
        console.warn(`  ⚠ University "${curr.universitySlug}" not found for curriculum, skipping`);
        continue;
      }

      const degree = await prisma.degree.upsert({
        where: { slug: curr.degreeSlug },
        update: { name: curr.degreeName, level: curr.degreeLevel, universityId: uni.id },
        create: {
          slug: curr.degreeSlug,
          name: curr.degreeName,
          level: curr.degreeLevel,
          universityId: uni.id,
        },
      });

      const curriculum = await prisma.curriculum.upsert({
        where: { id: `curr-${curr.degreeSlug}` },
        update: { name: curr.name, source: curr.sourceUrl, degreeId: degree.id },
        create: {
          id: `curr-${curr.degreeSlug}`,
          name: curr.name,
          source: curr.sourceUrl,
          degreeId: degree.id,
        },
      });

      for (const cc of curr.courses) {
        const course = await prisma.course.findUnique({ where: { slug: cc.courseSlug } });
        if (!course) {
          console.warn(`  ⚠ Course "${cc.courseSlug}" not found for curriculum, skipping`);
          continue;
        }

        await prisma.curriculumCourse.upsert({
          where: { curriculumId_courseId: { curriculumId: curriculum.id, courseId: course.id } },
          update: { year: cc.year, semester: cc.semester, order: cc.order },
          create: {
            curriculumId: curriculum.id,
            courseId: course.id,
            year: cc.year,
            semester: cc.semester,
            order: cc.order,
          },
        });
      }
    }
  }

  return dom;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 Validating seed data...");
  const errors = validateAll();
  if (errors.length > 0) {
    console.error("❌ Validation failed:");
    for (const e of errors) console.error(`  • ${e}`);
    process.exit(1);
  }
  console.log("✅ Validation passed\n");

  console.log("🏫 Seeding universities...");
  for (const u of universities) {
    await seedUniversity(u);
    console.log(`  ✓ ${u.name}`);
  }

  for (const domain of domains) {
    console.log(`\n📚 Seeding domain: ${domain.name}...`);
    await seedDomain(domain);
    console.log(`  ✓ ${domain.name} complete`);
  }

  // Stats
  const counts = await Promise.all([
    prisma.university.count(),
    prisma.domain.count(),
    prisma.subject.count(),
    prisma.topic.count(),
    prisma.skill.count(),
    prisma.resource.count(),
    prisma.learningPath.count(),
    prisma.learningPathStep.count(),
    prisma.course.count(),
    prisma.curriculum.count(),
  ]);

  console.log("\n📊 Seed summary:");
  console.log(`  Universities:  ${counts[0]}`);
  console.log(`  Domains:       ${counts[1]}`);
  console.log(`  Subjects:      ${counts[2]}`);
  console.log(`  Topics:        ${counts[3]}`);
  console.log(`  Skills:        ${counts[4]}`);
  console.log(`  Resources:     ${counts[5]}`);
  console.log(`  Learning Paths:${counts[6]}`);
  console.log(`  Path Steps:    ${counts[7]}`);
  console.log(`  Courses:       ${counts[8]}`);
  console.log(`  Curricula:     ${counts[9]}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n🎉 Seed complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
