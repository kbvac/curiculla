import Link from "next/link";
import { db } from "@/lib/db";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  type PathResult = Awaited<ReturnType<typeof db.learningPath.findMany>>[number] & { domain: { name: string } };
  type ResourceResult = Awaited<ReturnType<typeof db.resource.findMany>>[number] & { university: { name: string } | null };

  let results: {
    domains: Awaited<ReturnType<typeof db.domain.findMany>>;
    paths: PathResult[];
    skills: Awaited<ReturnType<typeof db.skill.findMany>>;
    universities: Awaited<ReturnType<typeof db.university.findMany>>;
    resources: ResourceResult[];
  } = {
    domains: [],
    paths: [],
    skills: [],
    universities: [],
    resources: [],
  };

  if (query.length >= 2) {
    const pattern = `%${query}%`;
    const [domains, paths, skills, universities, resources] = await Promise.all([
      db.domain.findMany({
        where: { OR: [{ name: { contains: pattern } }, { description: { contains: pattern } }] },
        take: 10,
      }),
      db.learningPath.findMany({
        where: { OR: [{ name: { contains: pattern } }, { tagline: { contains: pattern } }] },
        include: { domain: { select: { name: true } } },
        take: 10,
      }),
      db.skill.findMany({
        where: { OR: [{ name: { contains: pattern } }, { description: { contains: pattern } }] },
        take: 20,
      }),
      db.university.findMany({
        where: { OR: [{ name: { contains: pattern } }] },
        take: 10,
      }),
      db.resource.findMany({
        where: { OR: [{ title: { contains: pattern } }, { description: { contains: pattern } }] },
        include: { university: { select: { name: true } } },
        take: 10,
      }),
    ]);
    results = { domains, paths, skills, universities, resources };
  }

  const totalResults =
    results.domains.length +
    results.paths.length +
    results.skills.length +
    results.universities.length +
    results.resources.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-fg">Recherche</h1>

      <form className="mt-6" action="/search" method="get">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search domains, skills, courses..."
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-fg outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </form>

      {query.length >= 2 && (
        <p className="mt-4 text-sm text-fg-muted">
          {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {query.length < 2 && (
        <p className="mt-8 text-center text-fg-muted">
          Type at least 2 characters to search.
        </p>
      )}

      {/* Results */}
      {results.domains.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-fg">Domaines</h2>
          <div className="mt-3 space-y-2">
            {results.domains.map((d) => (
              <Link
                key={d.id}
                href={`/domains/${d.slug}`}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40"
              >
                <h3 className="font-medium text-fg">{d.name}</h3>
                <p className="mt-1 text-sm text-fg-muted line-clamp-1">{d.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.paths.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-fg">Learning Paths</h2>
          <div className="mt-3 space-y-2">
            {results.paths.map((p) => (
              <Link
                key={p.id}
                href={`/paths/${p.slug}`}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40"
              >
                <span className="text-xs font-medium text-accent">{p.domain.name}</span>
                <h3 className="mt-0.5 font-medium text-fg">{p.name}</h3>
                <p className="mt-1 text-sm text-fg-muted">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.skills.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-fg">Compétences</h2>
          <div className="mt-3 space-y-2">
            {results.skills.map((s) => (
              <Link
                key={s.id}
                href={`/skills/${s.slug}`}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40"
              >
                <h3 className="font-medium text-fg">{s.name}</h3>
                {s.description && (
                  <p className="mt-1 text-sm text-fg-muted line-clamp-1">{s.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.universities.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-fg">Universités</h2>
          <div className="mt-3 space-y-2">
            {results.universities.map((u) => (
              <div key={u.id} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-fg">{u.name}</h3>
                <p className="text-sm text-fg-muted">{u.country}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.resources.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-fg">Resources</h2>
          <div className="mt-3 space-y-2">
            {results.resources.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40"
              >
                <span className="text-xs font-medium text-accent">{r.type}</span>
                <h3 className="mt-0.5 font-medium text-fg">{r.title}</h3>
                {r.university && (
                  <p className="mt-1 text-sm text-fg-muted">{r.university.name}</p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {query.length >= 2 && totalResults === 0 && (
        <div className="mt-12 text-center">
          <p className="text-fg-muted">No results found. Try different keywords.</p>
        </div>
      )}
    </div>
  );
}
