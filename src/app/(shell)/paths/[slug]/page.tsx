import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPathProgress } from "@/lib/skills";
import { SkillStatusBadge } from "@/components/SkillStatusBadge";
import { SetGoalButton } from "@/components/SetGoalButton";

type StepStatus = "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETED" | "MASTERED";

async function loadPath(slug: string) {
  return db.learningPath.findUnique({
    where: { slug },
    include: {
      domain: { select: { name: true, slug: true } },
      steps: {
        include: {
          skill: {
            include: {
              resources: {
                include: { resource: { select: { slug: true, title: true, university: { select: { name: true } } } } },
                where: { isPrimary: true },
                take: 1,
              },
              prerequisites: { select: { prerequisite: { select: { slug: true, name: true } } } },
            },
          },
          course: {
            include: {
              prerequisites: {
                include: { prerequisite: { select: { slug: true, code: true, title: true } } },
              },
              unlocks: { include: { course: { select: { code: true } } } },
              _count: { select: { resources: true } },
            },
          },
        },
        orderBy: { order: "asc" },
      },
      userGoals: true,
    },
  });
}

type PathWithSteps = NonNullable<Awaited<ReturnType<typeof loadPath>>>;
type CourseStep = NonNullable<PathWithSteps["steps"][number]["course"]>;
type SkillStep = NonNullable<PathWithSteps["steps"][number]["skill"]>;

export default async function PathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();

  const path = await loadPath(slug);
  if (!path) notFound();
  const hasGoal = user ? path.userGoals.some((g) => g.userId === user.id) : false;

  const progress = user ? await getPathProgress(user.id, slug) : null;

  // ── Hierarchical blocks: numbered sequence + condensed choice groups ────────
  type Block =
    | { kind: "course"; n: number; course: CourseStep }
    | { kind: "skill"; n: number; skill: SkillStep }
    | { kind: "choice"; n: number; courses: CourseStep[] };

  const phases = new Map<string, Block[]>();
  let n = 0;

  for (const step of path.steps) {
    const blocks = phases.get(step.phase) ?? [];

    if (step.course) {
      const course = step.course;
      if (!step.isRequired) {
        const last = blocks[blocks.length - 1];
        if (last && last.kind === "choice") {
          last.courses.push(course);
        } else {
          n++;
          blocks.push({ kind: "choice", n, courses: [course] });
        }
      } else {
        n++;
        blocks.push({ kind: "course", n, course });
      }
    } else if (step.skill) {
      n++;
      blocks.push({ kind: "skill", n, skill: step.skill });
    }

    phases.set(step.phase, blocks);
  }

  const nextTaskSlug = progress?.nextTask?.slug ?? null;
  const courseCount = path.steps.filter((s) => s.courseId).length;
  const isOfficial = courseCount > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* ── Registrar document header ─────────────────────────────────────── */}
      <header className="mb-10">
        <p className="data-label">
          {isOfficial ? "Plan of study — parcours officiel" : "Learning path"}
        </p>
        <h1 className="mt-1 font-display text-4xl font-bold text-fg">{path.name}</h1>
        <p className="mt-2 max-w-2xl text-fg-muted">{path.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-3">
          <span className="font-mono text-xs text-fg-muted">{phases.size} phases</span>
          <span className="font-mono text-xs text-fg-muted">{courseCount} cours</span>
          <span className="font-mono text-xs text-fg-muted">{n} étapes</span>
          {path.estimatedMonths && (
            <span className="font-mono text-xs text-fg-muted">~{path.estimatedMonths} mois</span>
          )}
          <Link
            href="/paths"
            className="ml-auto font-mono text-xs text-fg-faint hover:text-fg"
          >
            ← tous les parcours
          </Link>
        </div>
      </header>

      {/* ── Transcript bar — la progression par phase ─────────────────────── */}
      {progress && (
        <div className="mb-10">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="data-label">Transcript</p>
            <p className="font-mono text-sm font-semibold text-fg">
              {progress.completedSteps}/{progress.totalSteps}
              <span className="ml-2 font-sans font-normal text-fg-faint">
                {progress.percentage}%
              </span>
            </p>
          </div>
          <div className="flex gap-0">
            {[...phases.entries()].map(([phase, blocks], i) => {
              const done = blocks.filter((b) => {
                if (b.kind === "course")
                  return progress.courseStatuses.find((c) => c.slug === b.course.slug)?.status === "COMPLETED";
                if (b.kind === "skill") {
                  const st = progress.statuses.find((s) => s.slug === b.skill.slug);
                  return st?.status === "COMPLETED" || st?.status === "MASTERED";
                }
                return b.courses.some(
                  (c) => progress.courseStatuses.find((cs) => cs.slug === c.slug)?.status === "COMPLETED",
                );
              }).length;
              const pct = blocks.length ? Math.round((done / blocks.length) * 100) : 0;
              return (
                <div
                  key={phase}
                  className="transcript-segment"
                  title={`${i + 1}. ${phase} — ${done}/${blocks.length}`}
                >
                  <div className="transcript-fill" style={{ width: `${pct}%` }} />
                </div>
              );
            })}
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-fg-faint">
            {[...phases.keys()].map((phase, i) => (
              <span key={phase} className="truncate">{i + 1}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions ────────────────────────────────────────────────────────── */}
      {!user && (
        <div className="mb-10 border-l-2 border-accent bg-accent-light/40 py-3 pl-4">
          <p className="text-sm text-accent-dark">
            <Link href="/login" className="font-medium underline">Log in</Link> pour suivre ta
            progression et fixer ce parcours comme objectif.
          </p>
        </div>
      )}
      {user && !hasGoal && (
        <div className="mb-10">
          <SetGoalButton pathSlug={slug} />
        </div>
      )}

      {/* ── Phases — le rail de catalogue ─────────────────────────────────── */}
      <div className="space-y-12">
        {[...phases.entries()].map(([phase, blocks], phaseIdx) => {
          const done = blocks.filter((b) => {
            if (b.kind === "course")
              return progress?.courseStatuses.find((c) => c.slug === b.course.slug)?.status === "COMPLETED";
            if (b.kind === "skill") {
              const st = progress?.statuses.find((s) => s.slug === b.skill.slug);
              return st?.status === "COMPLETED" || st?.status === "MASTERED";
            }
            return b.courses.some(
              (c) => progress?.courseStatuses.find((cs) => cs.slug === c.slug)?.status === "COMPLETED",
            );
          }).length;

          return (
            <section key={phase}>
              {/* Phase header */}
              <div className="sticky top-14 z-10 -mx-1 mb-5 flex items-baseline gap-3 border-b border-border bg-background px-1 pb-2 lg:top-0">
                <span className="font-mono text-sm font-semibold text-accent">
                  {String(phaseIdx + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-lg font-semibold text-fg">{phase}</h2>
                <span className="ml-auto font-mono text-xs text-fg-faint">
                  {done}/{blocks.length}
                </span>
              </div>

              {/* Sequence rail */}
              <div className="ml-3 space-y-3">
                {blocks.map((block) => {
                  /* ── Required course ── */
                  if (block.kind === "course") {
                    const st = progress?.courseStatuses.find((c) => c.slug === block.course.slug);
                    const status: StepStatus = st?.status ?? "AVAILABLE";
                    const isNext = nextTaskSlug === block.course.slug;

                    return (
                      <div key={block.course.slug} className="rail-line relative pl-7">
                        <div className="rail-node" data-state={status.toLowerCase()} />
                        <CourseCard
                          course={block.course}
                          number={block.n}
                          status={status}
                          percent={st?.percent ?? 0}
                          isNext={isNext}
                          prereqDone={block.course.prerequisites.map((p) => {
                            const code = p.prerequisite.code ?? p.prerequisite.slug;
                            return {
                              code,
                              title: p.prerequisite.title,
                              done:
                                progress?.courseStatuses.find(
                                  (c) => c.code === code,
                                )?.status === "COMPLETED",
                            };
                          })}
                          unlocks={block.course.unlocks
                            .map((u) => u.course.code ?? "")
                            .filter(Boolean)
                            .slice(0, 4)}
                        />
                      </div>
                    );
                  }

                  /* ── Choice group ── */
                  if (block.kind === "choice") {
                    const groupDone = block.courses.some(
                      (c) => progress?.courseStatuses.find((cs) => cs.slug === c.slug)?.status === "COMPLETED",
                    );
                    const state = groupDone ? "completed" : "available";

                    return (
                      <div key={`choice-${block.n}`} className="rail-line relative pl-7">
                        <div className="rail-node" data-state={state} />
                        <div
                          className={`rounded border-2 border-dashed p-4 ${
                            groupDone
                              ? "border-completed/50 bg-success-light/40"
                              : "border-accent/40 bg-accent-light/30"
                          }`}
                        >
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-mono text-xs font-semibold text-fg-muted">
                              {String(block.n).padStart(2, "0")}
                            </span>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-dark">
                              au choix
                            </span>
                            <span className="text-sm text-fg-muted">
                              {block.courses.length > 1 ? `1 parmi ${block.courses.length}` : ""}
                            </span>
                            {groupDone && (
                              <span className="font-mono text-xs font-medium text-completed">
                                validé ✓
                              </span>
                            )}
                          </div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {block.courses.map((c) => {
                              const cst = progress?.courseStatuses.find((cs) => cs.slug === c.slug);
                              return (
                                <Link
                                  key={c.slug}
                                  href={`/courses/${c.slug}`}
                                  className={`flex items-center justify-between gap-2 rounded border bg-card px-3 py-2 transition-colors hover:border-accent/50 ${
                                    cst?.status === "COMPLETED" ? "border-completed/40" : "border-border"
                                  }`}
                                >
                                  <div className="min-w-0">
                                    <span className="course-code text-accent">{c.code}</span>
                                    <p className="truncate text-sm text-fg">{c.title}</p>
                                  </div>
                                  {c.units && (
                                    <span className="shrink-0 font-mono text-xs text-fg-faint">
                                      {c.units}u
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  /* ── Skill ── */
                  const skill = block.skill;
                  const st = progress?.statuses.find((s) => s.slug === skill.slug);
                  const status: StepStatus = st?.status ?? "AVAILABLE";
                  const primaryResource = skill.resources[0]?.resource;

                  return (
                    <div key={block.skill.slug} className="rail-line relative pl-7">
                      <div className="rail-node" data-state={status.toLowerCase()} />
                      <Link
                        href={`/skills/${skill.slug}`}
                        className={`block rounded border p-4 transition-all bg-card ${
                          status === "LOCKED"
                            ? "border-border opacity-60"
                            : "border-border hover:border-accent/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="font-mono text-xs font-semibold text-fg-muted">
                                {String(block.n).padStart(2, "0")}
                              </span>
                              <h3 className="font-medium text-fg">{skill.name}</h3>
                              <SkillStatusBadge status={status} />
                            </div>
                            {skill.description && (
                              <p className="mt-1 line-clamp-2 text-sm text-fg-muted">
                                {skill.description}
                              </p>
                            )}
                            {primaryResource && (
                              <p className="mt-2 font-mono text-xs text-fg-faint">
                                {primaryResource.university?.name} — {primaryResource.title}
                              </p>
                            )}
                          </div>
                          {st && st.mastery > 0 && (
                            <span className="shrink-0 font-mono text-sm font-semibold text-accent">
                              {Math.round(st.mastery)}%
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ── Carte cours requise — la chaîne de dépendances visible ───────────────── */

function CourseCard({
  course,
  number,
  status,
  percent,
  prereqDone,
  unlocks,
  isNext,
}: {
  course: CourseStep;
  number: number;
  status: StepStatus;
  percent: number;
  prereqDone: Array<{ code: string; title: string; done: boolean }>;
  unlocks: string[];
  isNext: boolean;
}) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`block rounded border p-4 transition-all ${
        status === "LOCKED"
          ? "border-border bg-card opacity-60"
          : isNext
            ? "border-accent bg-accent-light/40"
            : "border-border bg-card hover:border-accent/40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs font-semibold text-fg-muted">
              {String(number).padStart(2, "0")}
            </span>
            <span className="course-code text-accent">{course.code}</span>
            <h3 className="font-medium text-fg">{course.title}</h3>
            {course.units && (
              <span className="font-mono text-xs text-fg-faint">{course.units}u</span>
            )}
            {isNext && (
              <span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                à faire maintenant
              </span>
            )}
          </div>

          {course.description && (
            <p className="mt-1.5 line-clamp-2 text-sm text-fg-muted">{course.description}</p>
          )}

          {prereqDone.length > 0 && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="data-label">après</span>
              {prereqDone.map((p) => (
                <span
                  key={p.code}
                  title={p.title}
                  className={`course-code rounded-sm px-1.5 py-0.5 text-[11px] ${
                    p.done ? "bg-success-light text-completed" : "bg-muted text-fg-faint"
                  }`}
                >
                  {p.done ? "✓ " : ""}{p.code}
                </span>
              ))}
            </div>
          )}

          {unlocks.length > 0 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="data-label">ouvre</span>
              {unlocks.map((code) => (
                <span
                  key={code}
                  className="course-code rounded-sm border border-border px-1.5 py-0.5 text-[11px] font-normal text-fg-muted"
                >
                  {code}
                </span>
              ))}
            </div>
          )}

          {course._count.resources > 0 && (
            <p className="mt-2 font-mono text-xs text-fg-faint">
              {course._count.resources} ressources officielles
            </p>
          )}
        </div>

        {percent > 0 && (
          <span className="shrink-0 font-mono text-sm font-semibold text-accent">
            {Math.round(percent)}%
          </span>
        )}
      </div>
    </Link>
  );
}
