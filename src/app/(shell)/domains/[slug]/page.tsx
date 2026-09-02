import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function DomainDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const domain = await db.domain.findUnique({
    where: { slug },
    include: {
      subjects: {
        include: {
          topics: {
            include: {
              skills: {
                include: {
                  _count: { select: { resources: true, prerequisites: true } },
                },
              },
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
      paths: {
        include: { _count: { select: { steps: true } } },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!domain) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <Link href="/domains" className="text-sm text-fg-muted hover:text-fg">
          &larr; All domains
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold text-fg">{domain.name}</h1>
        <p className="mt-2 text-fg-muted">{domain.description}</p>
      </div>

      {/* Learning Paths */}
      <section className="mb-12">
        <h2 className="font-display text-xl font-semibold text-fg">Learning Paths</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domain.paths.map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.slug}`}
              className="card-hover rounded-lg border border-border bg-card p-5"
            >
              <h3 className="font-display text-lg font-semibold text-fg">{path.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">{path.tagline}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-fg-faint">
                <span>{path._count.steps} skills</span>
                {path.estimatedMonths && <span>{path.estimatedMonths} months</span>}
                {path.level && (
                  <span className="rounded-full bg-muted px-2 py-0.5">{path.level}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section>
        <h2 className="font-display text-xl font-semibold text-fg">Matières</h2>
        <div className="mt-4 space-y-6">
          {domain.subjects.map((subject) => (
            <div key={subject.id} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-fg">{subject.name}</h3>
              {subject.description && (
                <p className="mt-1 text-sm text-fg-muted">{subject.description}</p>
              )}
              <div className="mt-4 space-y-3">
                {subject.topics.map((topic) => (
                  <div key={topic.id}>
                    <h4 className="text-sm font-medium text-fg">{topic.name}</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {topic.skills.map((skill) => (
                        <Link
                          key={skill.id}
                          href={`/skills/${skill.slug}`}
                          className="rounded-md border border-border px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {skill.name}
                          <span className="ml-1 text-fg-faint">({skill._count.resources})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
