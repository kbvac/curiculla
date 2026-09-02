import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ university?: string; level?: string }>;
}) {
  const { university: universityParam, level } = await searchParams;

  const user = await getCurrentUser();
  const userUniversity = user
    ? await db.user.findUnique({
        where: { id: user.id },
        select: { university: { select: { slug: true } } },
      })
    : null;

  // Default to the user's home university when no filter is given
  const universitySlug = universityParam ?? userUniversity?.university?.slug ?? null;

  const universities = await db.university.findMany({
    where: { courses: { some: {} } },
    include: { _count: { select: { courses: true } } },
    orderBy: { name: "asc" },
  });

  const courses = await db.course.findMany({
    where: {
      ...(universitySlug ? { university: { slug: universitySlug } } : {}),
      ...(level ? { catalogLevel: level } : {}),
      universityId: { not: null },
    },
    include: {
      university: { select: { name: true, slug: true } },
      _count: { select: { prerequisites: true, unlocks: true, resources: true } },
    },
    orderBy: [{ university: { name: "asc" } }, { code: "asc" }],
  });

  // Group by university
  const grouped = new Map<string, typeof courses>();
  for (const c of courses) {
    const key = c.university?.name ?? "Unknown";
    const arr = grouped.get(key) ?? [];
    arr.push(c);
    grouped.set(key, arr);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-fg">Catalogues de cours</h1>
        <p className="mt-2 text-fg-muted">
          Les catalogues officiels des départements — cours réels, prérequis officiels,
          ordre du programme.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/courses"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !universitySlug ? "bg-fg text-card" : "bg-muted text-fg-muted hover:bg-border"
          }`}
        >
          All ({courses.length})
        </Link>
        {universities.map((u) => (
          <Link
            key={u.slug}
            href={`/courses?university=${u.slug}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              universitySlug === u.slug
                ? "bg-fg text-card"
                : "bg-muted text-fg-muted hover:bg-border"
            }`}
          >
            {u.name} ({u._count.courses})
          </Link>
        ))}
      </div>

      {/* Courses grouped by university */}
      {courses.length === 0 ? (
        <p className="py-12 text-center text-fg-muted">Aucun cours.</p>
      ) : (
        [...grouped.entries()].map(([uniName, uniCourses]) => (
          <section key={uniName} className="mb-10">
            <h2 className="mb-4 font-display text-xl font-semibold text-fg">
              {uniName}
              <span className="ml-2 text-sm font-normal text-fg-faint">
                {uniCourses.length} cours
              </span>
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {uniCourses.map((c) => (
                <Link
                  key={c.slug}
                  href={`/courses/${c.slug}`}
                  className="card-hover block rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                          {c.code}
                        </span>
                        {c.catalogLevel && (
                          <span className="text-xs text-fg-faint">
                            {c.catalogLevel === "LOWER_DIVISION" ? "Lower div" : "Upper div"}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 font-medium text-fg">{c.title}</h3>
                      {c.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-fg-faint">
                          {c.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right text-xs text-fg-faint">
                      {c.units && <div>{c.units} units</div>}
                      <div className="mt-1">{c._count.prerequisites} prereqs</div>
                      <div className="mt-1">{c._count.resources} resources</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
