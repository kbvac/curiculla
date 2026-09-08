"use client";

import { useState } from "react";

type University = {
  name: string;
  slug: string;
  country: string | null;
};

type Resource = {
  slug: string;
  title: string;
  type: string;
  url: string;
  description: string | null;
  instructor: string | null;
  level: string | null;
  durationHours: number | null;
  year: number | null;
  qualityScore: number | null;
  qualityMeta: string | null;
  verified: boolean;
  university: University | null;
  isPrimary: boolean;
};

type Props = {
  resources: Resource[];
};

export function ResourceList({ resources }: Props) {
  const [filterUni, setFilterUni] = useState<string>("all");

  // Get unique universities
  const universities = Array.from(
    new Map(
      resources
        .filter((r) => r.university)
        .map((r) => [r.university!.slug, r.university!]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  // Filter resources
  const filtered =
    filterUni === "all"
      ? resources
      : resources.filter((r) => r.university?.slug === filterUni);

  // Sort: verified first, then by year (newest first), then by quality score
  const sorted = [...filtered].sort((a, b) => {
    // Verified first
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    // Year descending
    if (a.year && b.year) return b.year - a.year;
    if (a.year) return -1;
    if (b.year) return 1;
    // Quality score descending
    if (a.qualityScore && b.qualityScore) return b.qualityScore - a.qualityScore;
    return 0;
  });

  // Group by university for university-specific resources
  const uniResources = sorted.filter((r) => r.verified && r.university);
  const otherResources = sorted.filter((r) => !r.verified || !r.university);

  const groupedByUni = new Map<string, Resource[]>();
  for (const r of uniResources) {
    const key = r.university!.slug;
    const existing = groupedByUni.get(key) || [];
    existing.push(r);
    groupedByUni.set(key, existing);
  }

  return (
    <div>
      {/* University filter */}
      {universities.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterUni("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filterUni === "all"
                ? "bg-fg text-card"
                : "bg-muted text-fg-muted hover:bg-border"
            }`}
          >
            All ({resources.length})
          </button>
          {universities.map((u) => {
            const count = resources.filter((r) => r.university?.slug === u.slug).length;
            return (
              <button
                key={u.slug}
                onClick={() => setFilterUni(u.slug)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filterUni === u.slug
                    ? "bg-fg text-card"
                    : "bg-muted text-fg-muted hover:bg-border"
                }`}
              >
                {u.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* University-grouped resources */}
      {filterUni === "all" ? (
        <>
          {Array.from(groupedByUni.entries()).map(([uniSlug, uniRes]) => {
            const uni = uniRes[0].university!;
            return (
              <div key={uniSlug} className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-fg">{uni.name}</h3>
                  {uni.country && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-fg-faint">
                      {uni.country}
                    </span>
                  )}
                  <span className="rounded-full bg-success-light px-2 py-0.5 text-xs font-medium text-success">
                    Official
                  </span>
                </div>
                <div className="space-y-3">
                  {uniRes.map((r) => (
                    <ResourceCard key={r.slug} resource={r} />
                  ))}
                </div>
              </div>
            );
          })}

          {otherResources.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-1 font-display text-lg font-semibold text-fg">
                Compléments — hors catalogue universitaire
              </h3>
              <p className="mb-3 text-sm text-fg-muted">
                Ressources générales (Khan Academy, documentation officielle, MOOC)
                pour les skills qui n&apos;ont pas encore de matière universitaire.
              </p>
              <div className="space-y-3">
                {otherResources.map((r) => (
                  <ResourceCard key={r.slug} resource={r} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          {sorted.map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      )}

      {sorted.length === 0 && (
        <p className="py-8 text-center text-fg-muted">Aucune ressource trouvée.</p>
      )}
    </div>
  );
}

function ResourceCard({ resource: r }: { resource: Resource }) {
  const qualityReasons = (() => {
    try {
      const meta = JSON.parse(r.qualityMeta ?? "{}");
      return meta.reasons ?? [];
    } catch {
      return [];
    }
  })();

  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover block rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-accent">{r.type}</span>
            {r.isPrimary && (
              <span className="rounded bg-accent/10 px-1.5 py-0.5 text-xs font-medium text-accent">
                Recommended
              </span>
            )}
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
          <h4 className="mt-1 font-medium text-fg">{r.title}</h4>
          {r.instructor && (
            <p className="mt-1 text-sm text-fg-muted">{r.instructor}</p>
          )}
          {r.description && (
            <p className="mt-2 line-clamp-2 text-sm text-fg-faint">{r.description}</p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-fg-faint">
            {r.level && <span>{r.level}</span>}
            {r.durationHours && <span>{r.durationHours}h</span>}
          </div>
        </div>
        {r.qualityScore && (
          <div className="shrink-0 text-right">
            <div className="text-lg font-bold text-success">{Math.round(r.qualityScore)}</div>
            <div className="text-xs text-fg-faint">quality</div>
          </div>
        )}
      </div>
      {qualityReasons.length > 0 && (
        <div className="mt-3 border-t border-border pt-3">
          <ul className="space-y-0.5">
            {qualityReasons.map((reason: string, i: number) => (
              <li key={i} className="text-xs text-fg-muted">✓ {reason}</li>
            ))}
          </ul>
        </div>
      )}
    </a>
  );
}
