import Link from "next/link";
import { db } from "@/lib/db";

export default async function DomainsPage() {
  const domains = await db.domain.findMany({
    orderBy: { order: "asc" },
    include: {
      subjects: {
        include: { _count: { select: { topics: true } } },
        orderBy: { order: "asc" },
      },
      _count: { select: { paths: true, subjects: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-fg">Academic Domains</h1>
      <p className="mt-2 text-fg-muted">
        Explore structured learning paths across {domains.length} fields of study.
      </p>

      <div className="mt-8 space-y-4">
        {domains.map((domain) => (
          <Link
            key={domain.id}
            href={`/domains/${domain.slug}`}
            className="card-hover block rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-fg">{domain.name}</h2>
                <p className="mt-1 max-w-xl text-sm text-fg-muted">{domain.description}</p>
              </div>
              <span className="ml-4 shrink-0 rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent-dark">
                {domain._count.paths} paths
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {domain.subjects.map((subject) => (
                <span
                  key={subject.id}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-fg-muted"
                >
                  {subject.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
