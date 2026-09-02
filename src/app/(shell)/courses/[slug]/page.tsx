import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { EnrollButton } from "@/components/ScheduleControls";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      university: { select: { name: true, slug: true, country: true } },
      prerequisites: {
        include: {
          prerequisite: {
            select: { slug: true, code: true, title: true, units: true, catalogLevel: true },
          },
        },
      },
      unlocks: {
        include: {
          course: {
            select: { slug: true, code: true, title: true, units: true, catalogLevel: true },
          },
        },
      },
      resources: {
        select: {
          slug: true,
          title: true,
          type: true,
          url: true,
          year: true,
          qualityScore: true,
          verified: true,
          instructor: true,
        },
      },
      entries: {
        include: {
          curriculum: {
            select: {
              name: true,
              degree: {
                select: {
                  name: true,
                  slug: true,
                  university: { select: { name: true, slug: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const user = await getCurrentUser();
  const [lectureCount, maxWeek, enrollment] = await Promise.all([
    db.resource.count({ where: { courseId: course.id, weekNumber: { not: null } } }),
    db.resource.aggregate({
      where: { courseId: course.id, weekNumber: { not: null } },
      _max: { weekNumber: true },
    }),
    user
      ? db.scheduleEnrollment.findUnique({
          where: {
            userId_courseId: { userId: user.id, courseId: course.id },
          },
          select: { id: true },
        })
      : null,
  ]);
  const hasSchedule = lectureCount > 0 && (maxWeek._max.weekNumber ?? 0) > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        <Link href="/courses" className="hover:text-fg">
          Courses
        </Link>
        <span>/</span>
        {course.university && (
          <>
            <Link href={`/universities/${course.university.slug}`} className="hover:text-fg">
              {course.university.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-fg">{course.code}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded bg-accent/10 px-3 py-1 font-mono text-sm font-bold text-accent">
            {course.code}
          </span>
          {course.units && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-fg-muted">
              {course.units} units
            </span>
          )}
          {course.catalogLevel && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-fg-muted">
              {course.catalogLevel === "LOWER_DIVISION"
                ? "Lower Division"
                : course.catalogLevel === "UPPER_DIVISION"
                  ? "Upper Division"
                  : course.catalogLevel}
            </span>
          )}
          {course.level && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-fg-muted">
              {course.level}
            </span>
          )}
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold text-fg">{course.title}</h1>
        {course.university && (
          <p className="mt-2 text-fg-muted">
            <Link href={`/universities/${course.university.slug}`} className="hover:text-fg">
              {course.university.name}
            </Link>
            {course.university.country && ` · ${course.university.country}`}
          </p>
        )}
        {course.description && (
          <p className="mt-4 max-w-3xl leading-relaxed text-fg-muted">{course.description}</p>
        )}
        {course.url && (
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-accent hover:underline"
          >
            Page du catalogue officiel ↗
          </a>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          {/* Weekly schedule */}
          {hasSchedule && (
            <section className="border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
                <div>
                  <p className="data-label">Programme hebdomadaire</p>
                  <p className="mt-1 font-mono text-xs text-fg-muted">
                    {maxWeek._max.weekNumber} semaines · {lectureCount} sessions officielles
                    {enrollment ? " · inscrit" : ""}
                  </p>
                </div>
                {user ? (
                  <EnrollButton courseSlug={course.slug} enrolled={Boolean(enrollment)} />
                ) : (
                  <Link href="/login" className="text-sm text-accent underline">
                    Connexion pour suivre
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-sm text-fg-muted">
                  La semaine 1 commence à ta date de départ — coche chaque session
                  regardée depuis ton emploi du temps.
                </p>
                {enrollment && (
                  <Link
                    href="/schedule"
                    className="shrink-0 font-mono text-xs text-accent hover:text-accent-dark"
                  >
                    ouvrir l&apos;emploi du temps →
                  </Link>
                )}
              </div>
            </section>
          )}

          {/* Resources */}
          <section>
            <h2 className="font-display text-xl font-semibold text-fg">
              Ressources
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Official material from {course.university?.name ?? "l'université"}.
            </p>
            <div className="mt-4 space-y-3">
              {course.resources.length === 0 ? (
                <p className="rounded-lg border border-border bg-card p-4 text-sm text-fg-muted">
                  Aucune ressource liée.
                </p>
              ) : (
                course.resources.map((r) => (
                  <a
                    key={r.slug}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover block rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-accent">{r.type}</span>
                          {r.verified && (
                            <span className="rounded bg-success-light px-1.5 py-0.5 text-xs font-medium text-success">
                              Verified
                            </span>
                          )}
                          {r.year && (
                            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-fg-faint">
                              {r.year}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-medium text-fg">{r.title}</h3>
                        {r.instructor && (
                          <p className="mt-1 text-sm text-fg-muted">{r.instructor}</p>
                        )}
                      </div>
                      {r.qualityScore && (
                        <div className="shrink-0 text-right">
                          <div className="text-lg font-bold text-success">
                            {Math.round(r.qualityScore)}
                          </div>
                          <div className="text-xs text-fg-faint">quality</div>
                        </div>
                      )}
                    </div>
                  </a>
                ))
              )}
            </div>
          </section>

          {/* Curriculum placement */}
          {course.entries.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-fg">
                Placement dans le cursus
              </h2>
              <div className="mt-3 space-y-2">
                {course.entries.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-fg">{e.curriculum.degree.name}</p>
                      <p className="text-xs text-fg-faint">{e.curriculum.name}</p>
                    </div>
                    <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent-dark">
                      Year {e.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prerequisites */}
          <section className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-fg">
              Prerequisites
              <span className="ml-1.5 font-normal text-fg-faint">
                ({course.prerequisites.length})
              </span>
            </h3>
            <div className="mt-3 space-y-2">
              {course.prerequisites.length === 0 ? (
                <p className="text-xs text-fg-faint">Aucun prérequis.</p>
              ) : (
                course.prerequisites.map((p) => (
                  <Link
                    key={p.prerequisite.slug}
                    href={`/courses/${p.prerequisite.slug}`}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-accent/40"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-semibold text-accent">
                        {p.prerequisite.code}
                      </span>
                      <p className="truncate text-fg">{p.prerequisite.title}</p>
                    </div>
                    {p.prerequisite.units && (
                      <span className="shrink-0 text-xs text-fg-faint">
                        {p.prerequisite.units}u
                      </span>
                    )}
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Unlocks */}
          {course.unlocks.length > 0 && (
            <section className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-fg">
                Unlocks
                <span className="ml-1.5 font-normal text-fg-faint">
                  ({course.unlocks.length})
                </span>
              </h3>
              <div className="mt-3 space-y-2">
                {course.unlocks.map((u) => (
                  <Link
                    key={u.course.slug}
                    href={`/courses/${u.course.slug}`}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-accent/40"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-semibold text-accent">
                        {u.course.code}
                      </span>
                      <p className="truncate text-fg">{u.course.title}</p>
                    </div>
                    {u.course.units && (
                      <span className="shrink-0 text-xs text-fg-faint">{u.course.units}u</span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
