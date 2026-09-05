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

      {/* Courses grouped by university — registrar table */}
      {courses.length === 0 ? (
        <p className="py-12 text-center text-fg-muted">Aucun cours.</p>
      ) : (
        [...grouped.entries()].map(([uniName, uniCourses]) => (
          <section key={uniName} className="mb-10">
            <div className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
              <h2 className="font-display text-lg font-semibold text-fg">{uniName}</h2>
              <span className="font-mono text-xs text-fg-faint">
                {uniCourses.length} cours
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="hidden grid-cols-[110px_1fr_90px_90px_90px] gap-3 border-b border-border bg-muted px-4 py-2 sm:grid">
                <span className="data-label">Code</span>
                <span className="data-label">Intitulé</span>
                <span className="data-label text-right">Unités</span>
                <span className="data-label text-right">Prérequis</span>
                <span className="data-label text-right">Ressources</span>
              </div>
              <div className="divide-y divide-border">
                {uniCourses.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/courses/${c.slug}`}
                    className="grid grid-cols-1 gap-1 px-4 py-3 transition-colors hover:bg-muted/60 sm:grid-cols-[110px_1fr_90px_90px_90px] sm:items-baseline sm:gap-3"
                  >
                    <span className="course-code text-accent">{c.code}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-fg">{c.title}</span>
                      {c.catalogLevel && (
                        <span className="font-mono text-[11px] text-fg-faint">
                          {c.catalogLevel === "LOWER_DIVISION" ? "lower div." : "upper div."}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-fg-muted sm:text-right">
                      {c.units ? `${c.units}u` : "—"}
                    </span>
                    <span className="font-mono text-xs text-fg-muted sm:text-right">
                      {c._count.prerequisites || "—"}
                    </span>
                    <span className="font-mono text-xs text-fg-muted sm:text-right">
                      {c._count.resources || "—"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
}
