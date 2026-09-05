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

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="hidden grid-cols-[1fr_140px_110px] gap-3 border-b border-border bg-muted px-4 py-2 sm:grid">
          <span className="data-label">Université</span>
          <span className="data-label text-right">Ressources</span>
          <span className="data-label text-right">Catalogue</span>
        </div>
        <div className="divide-y divide-border">
        {universities
          .slice()
          .sort((a, b) => b._count.resources - a._count.resources)
          .map((uni) => (
          <Link
            key={uni.slug}
            href={`/universities/${uni.slug}`}
            className="grid grid-cols-1 gap-1 px-4 py-3 transition-colors hover:bg-muted/60 sm:grid-cols-[1fr_140px_110px] sm:items-baseline sm:gap-3"
          >
            <span className="min-w-0">
              <span className="block truncate font-display font-semibold text-fg">
                {uni.name}
              </span>
              <span className="font-mono text-[11px] text-fg-faint">
                {uni.country ?? uni.website ?? ""}
              </span>
            </span>
            <span className="font-mono text-xs text-fg-muted sm:text-right">
              {uni._count.resources > 0 ? uni._count.resources : "—"}
            </span>
            <span className="sm:text-right">
              {uni._count.resources === 0 ? (
                <span className="font-mono text-[11px] text-fg-faint">à venir</span>
              ) : (
                <span className="font-mono text-[11px] font-medium text-accent">officiel ✓</span>
              )}
            </span>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
