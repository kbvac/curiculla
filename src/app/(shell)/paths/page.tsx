import Link from "next/link";
import { db } from "@/lib/db";

export default async function PathsPage() {
  const paths = await db.learningPath.findMany({
    orderBy: { order: "asc" },
    include: {
      domain: { select: { name: true, slug: true } },
      _count: { select: { steps: true } },
    },
  });

  // Official paths carry catalog courses (built from a university program);
  // library paths are skill sequences curated around domains.
  const official = paths.filter((p) =>
    // cheap discriminator: slug starts with a university slug
    /^(ucsd|mit|stanford|berkeley|harvard|yale|cmu|caltech|princeton|columbia|duke|michigan|uc-davis|eth|oxford)-/.test(p.slug),
  );
  const library = paths.filter((p) => !official.includes(p));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="data-label">Parcours</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-fg">
          Suivre un cursus ou des compétences
        </h1>
        <p className="mt-2 max-w-2xl text-fg-muted">
          Les parcours officiels reproduisent le programme d&apos;une université, cours par
          cours. Les parcours de bibliothèque assemblent des compétences avec les
          meilleures ressources trouvées.
        </p>
        </div>
        <a
          href="/paths/new"
          className="rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          + Créer mon parcours
        </a>
      </header>

      {/* ── Parcours officiels ─────────────────────────────────────────────── */}
      <section className="mb-12">
        <p className="data-label mb-3">Parcours officiels — programmes d&apos;université</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {official.map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.slug}`}
              className="block border-l-4 border-accent bg-card p-5 transition-colors hover:border-accent-dark"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                Officiel · {path.domain.name}
              </span>
              <h2 className="mt-1.5 font-display text-lg font-semibold text-fg">
                {path.name}
              </h2>
              <p className="mt-1 text-sm text-fg-muted">{path.tagline}</p>
              <div className="mt-3 flex items-center gap-4 font-mono text-xs text-fg-faint">
                <span>{path._count.steps} étapes cours</span>
                {path.estimatedMonths && <span>~{path.estimatedMonths} mois</span>}
              </div>
            </Link>
          ))}
          {official.length === 0 && (
            <p className="text-sm text-fg-muted">Aucun parcours officiel importé.</p>
          )}
        </div>
      </section>

      {/* ── Bibliothèque de compétences ────────────────────────────────────── */}
      <section>
        <p className="data-label mb-3">Bibliothèque — séquences de compétences</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {library.map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.slug}`}
              className="card-hover border border-border bg-card p-4"
            >
              <span className="font-mono text-xs text-fg-faint">{path.domain.name}</span>
              <h2 className="mt-1 font-display font-semibold text-fg">{path.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{path.tagline}</p>
              <p className="mt-2 font-mono text-xs text-fg-faint">
                {path._count.steps} skills
                {path.estimatedMonths ? ` · ~${path.estimatedMonths} mois` : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
