import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ResourceList } from "@/components/ResourceList";

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const university = await db.university.findUnique({
    where: { slug },
    include: {
      courses: {
        include: {
          _count: { select: { prerequisites: true, resources: true } },
        },
        orderBy: { code: "asc" },
      },
      resources: {
        include: {
          skills: {
            include: {
              skill: {
                select: { slug: true, name: true, difficulty: true },
              },
            },
          },
        },
        orderBy: { year: "desc" },
      },
    },
  });

  if (!university) notFound();

  // Group by year
  const byYear = new Map<number, typeof university.resources>();
  for (const r of university.resources) {
    const year = r.year ?? 0;
    const existing = byYear.get(year) || [];
    existing.push(r);
    byYear.set(year, existing);
  }

  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-fg-muted">
        <Link href="/universities" className="hover:text-fg">Universités</Link>
        <span>/</span>
        <span className="text-fg">{university.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-fg">{university.name}</h1>
        {university.country && (
          <p className="mt-2 text-fg-muted">{university.country}</p>
        )}
        <p className="mt-1 text-sm text-fg-faint">{university.website}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-fg-muted">
          <span>{university.resources.length} resources</span>
          <span>{university.courses.length} courses</span>
          <span>{years.length} years</span>
        </div>
      </div>

      {/* Courses */}
      {university.courses.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-fg">Catalogue de cours</h2>
            <Link href={`/courses?university=${university.slug}`} className="text-sm text-accent hover:underline">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {university.courses.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="card-hover block rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                      {c.code}
                    </span>
                    <h3 className="mt-1.5 font-medium text-fg">{c.title}</h3>
                  </div>
                  <div className="shrink-0 text-right text-xs text-fg-faint">
                    {c.units && <div>{c.units} units</div>}
                    <div className="mt-1">{c._count.prerequisites} prereqs</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Resources grouped by year */}
      {years.map((year) => {
        const formatted = (byYear.get(year) || []).map((r) => ({
          ...r,
          university: { name: university.name, slug: university.slug, country: university.country },
          isPrimary: false,
        }));
        return (
          <section key={year} className="mb-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-fg">
              {year === 0 ? "Unknown Year" : year}
            </h2>
            <ResourceList resources={formatted} />
          </section>
        );
      })}

      {university.resources.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-fg-muted">Aucune ressource pour cette université pour le moment.</p>
          <Link href="/universities" className="mt-4 inline-block text-accent hover:underline">
            Voir les autres universités
          </Link>
        </div>
      )}
    </div>
  );
}
