import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const [user, officialPath, universityCount, courseCount, prereqCount] = await Promise.all([
    getCurrentUser(),
    db.learningPath.findUnique({
      where: { slug: "ucsd-bs-computer-science" },
      include: {
        _count: { select: { steps: true } },
        steps: {
          where: { courseId: { not: null }, isRequired: true },
          include: {
            course: { select: { code: true, title: true, slug: true, units: true } },
          },
          orderBy: { order: "asc" },
          take: 5,
        },
      },
    }),
    db.university.count(),
    db.course.count(),
    db.coursePrerequisite.count(),
  ]);

  const userUniversity = user
    ? await db.user.findUnique({
        where: { id: user.id },
        select: { university: { select: { slug: true, name: true } } },
      })
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* ── Hero: le produit, pas une promesse ─────────────────────────────── */}
      <section className="mb-14">
        {officialPath && (
          <p className="data-label">
            Plan of study — {officialPath.name.replace("UCSD ", "")} ·{" "}
            {officialPath.estimatedMonths ?? 48} mois
          </p>
        )}
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-fg sm:text-5xl">
          Le cursus officiel, dans l&apos;ordre.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-fg-muted">
          Les catalogues officiels des universités — cours réels, prérequis officiels,
          enregistrements de cours du département — transformés en un parcours que tu peux
          suivre jusqu&apos;au bout.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {userUniversity?.university ? (
            <Link
              href={`/courses?university=${userUniversity.university.slug}`}
              className="rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Catalogue {userUniversity.university.name}
            </Link>
          ) : (
            <Link
              href="/universities"
              className="rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Choisir mon université
            </Link>
          )}
          {officialPath && (
            <Link
              href={`/paths/${officialPath.slug}`}
              className="rounded-sm border border-border-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-ink"
            >
              Voir le parcours complet
            </Link>
          )}
        </div>
      </section>

      {/* ── Signature: l'extrait du rail de catalogue ──────────────────────── */}
      {officialPath && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <p className="data-label">Extrait — les premières étapes</p>
            <Link
              href={`/paths/${officialPath.slug}`}
              className="font-mono text-xs text-accent hover:text-accent-dark"
            >
              le parcours entier →
            </Link>
          </div>
          <ol className="mt-5">
            {officialPath.steps.map((step, i) => {
              if (!step.course) return null;
              const c = step.course;
              return (
                <li key={step.id} className="rail-line relative pl-7">
                  <div className="rail-node" data-state="available" />
                  <Link
                    href={`/courses/${c.slug}`}
                    className="-mx-3 block rounded px-3 py-3 transition-colors hover:bg-card"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-xs font-semibold text-fg-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="course-code text-accent">{c.code}</span>
                      <span className="font-medium text-fg">{c.title}</span>
                      {c.units && (
                        <span className="ml-auto font-mono text-xs text-fg-faint">
                          {c.units}u
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 border-t border-border pt-3 font-mono text-xs text-fg-faint">
            {officialPath && officialPath._count.steps - officialPath.steps.length} étapes
            après — chaque cours attend ses prérequis
          </p>
        </section>
      )}

      {/* ── Ce que contient la plateforme ──────────────────────────────────── */}
      <section className="mb-14 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-3">
        <div className="bg-card p-5">
          <p className="font-mono text-2xl font-semibold text-fg">{universityCount}</p>
          <p className="mt-1 text-sm text-fg-muted">universités partenaires</p>
        </div>
        <div className="bg-card p-5">
          <p className="font-mono text-2xl font-semibold text-fg">{courseCount}</p>
          <p className="mt-1 text-sm text-fg-muted">cours catalogués (UCSD CSE)</p>
        </div>
        <div className="bg-card p-5">
          <p className="font-mono text-2xl font-semibold text-fg">{prereqCount}</p>
          <p className="mt-1 text-sm text-fg-muted">prérequis officiels vérifiés</p>
        </div>
      </section>

      {/* ── Où commencer ───────────────────────────────────────────────────── */}
      <section>
        <p className="data-label">Où commencer</p>
        <div className="mt-4 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2">
          <Link href="/universities" className="group bg-card p-5 transition-colors hover:bg-muted">
            <h2 className="font-display font-semibold text-fg">Choisir une université</h2>
            <p className="mt-1 text-sm text-fg-muted">
              Ton catalogue, tes ressources officielles, ton cursus — filtrés par ta fac.
            </p>
            <p className="mt-3 font-mono text-xs text-accent group-hover:text-accent-dark">
              voir les universités →
            </p>
          </Link>
          <Link href="/paths" className="group bg-card p-5 transition-colors hover:bg-muted">
            <h2 className="font-display font-semibold text-fg">Explorer un parcours</h2>
            <p className="mt-1 text-sm text-fg-muted">
              Parcours officiels (catalogue + programme) et parcours de compétences.
            </p>
            <p className="mt-3 font-mono text-xs text-accent group-hover:text-accent-dark">
              voir les parcours →
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
