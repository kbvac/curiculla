import Link from "next/link";
import { db } from "@/lib/db";

export default async function UniversitiesPage() {
  const universities = await db.university.findMany({
    include: {
      _count: {
        select: { resources: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-fg">Universités</h1>
        <p className="mt-2 text-fg-muted">
          Les ressources par université — uniquement les plateformes officielles (catalogue, podcasts ETS, OCW).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {universities
          .slice()
          .sort((a, b) => b._count.resources - a._count.resources)
          .map((uni) => (
          <Link
            key={uni.slug}
            href={`/universities/${uni.slug}`}
            className="card-hover block rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-fg">{uni.name}</h2>
                {uni.country && (
                  <p className="mt-1 text-sm text-fg-muted">{uni.country}</p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{uni._count.resources}</div>
                <div className="text-xs text-fg-faint">ressources</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-fg-faint">{uni.website}</p>
            {uni._count.resources === 0 && (
              <p className="mt-2 font-mono text-xs text-fg-faint">
                catalogue à venir — aucune donnée officielle importée
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
