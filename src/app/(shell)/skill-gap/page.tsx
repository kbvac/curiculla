"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Path = {
  id: string;
  slug: string;
  name: string;
  domain: { name: string };
  _count: { steps: number };
};

type GapResult = {
  path: string;
  missingSkills: {
    slug: string;
    name: string;
    status: string;
    mastery: number;
  }[];
};

export default function SkillGapPage() {
  const [paths, setPaths] = useState<Path[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [gaps, setGaps] = useState<GapResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [declaring, setDeclaring] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/paths")
      .then((r) => r.json())
      .then((d) => setPaths(d.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadGaps = async (pathSlug: string) => {
    setSelectedPath(pathSlug);
    setGaps(null);
    try {
      const res = await fetch(`/api/gaps?path=${pathSlug}`);
      const data = await res.json();
      setGaps(data.data);
    } catch {}
  };

  const declareSkill = async (slug: string, known: boolean) => {
    setDeclaring(slug);
    try {
      await fetch(`/api/skills/${slug}/declare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ known }),
      });
      // Refresh gaps
      if (selectedPath) {
        await loadGaps(selectedPath);
      }
    } catch {
    } finally {
      setDeclaring(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-96 rounded bg-muted" />
          <div className="h-64 rounded-lg bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-fg">Skill Gap Analysis</h1>
      <p className="mt-2 text-fg-muted">
        Tell us what you already know, and we&apos;ll show you what&apos;s left to learn.
      </p>

      {/* Path selector */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-fg">Choisis ton parcours cible</label>
        <select
          value={selectedPath}
          onChange={(e) => loadGaps(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-fg outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="">Choisir un parcours…</option>
          {paths.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.domain.name} — {p.name} ({p._count.steps} skills)
            </option>
          ))}
        </select>
      </div>

      {/* Gaps results */}
      {gaps && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-fg">
              Skills to master
            </h2>
            <span className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent-dark">
              {gaps.missingSkills.length} remaining
            </span>
          </div>

          {gaps.missingSkills.length === 0 ? (
            <div className="mt-6 rounded-lg border border-success/30 bg-success-light/30 p-8 text-center">
              <h3 className="font-display text-lg font-semibold text-fg">You&apos;re all set!</h3>
              <p className="mt-2 text-sm text-fg-muted">
                You&apos;ve declared all the skills needed for this path.
              </p>
              <Link
                href={`/paths/${selectedPath}`}
                className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
              >
                Voir ton parcours
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {gaps.missingSkills.map((skill) => {
                const href =
                  (skill as { kind?: string }).kind === "course"
                    ? `/courses/${skill.slug}`
                    : `/skills/${skill.slug}`;
                const isCourse = href.startsWith("/courses/");
                return (
                <div
                  key={skill.slug}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex-1">
                    <Link
                      href={href}
                      className="font-medium text-fg hover:text-accent"
                    >
                      {isCourse && (
                        <span className="course-code mr-2 text-accent">cours</span>
                      )}
                      {skill.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-fg-faint">
                      {skill.status === "LOCKED" ? "Prérequis manquants" : "Prêt à commencer"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCourse && (
                      <button
                        onClick={() => declareSkill(skill.slug, true)}
                        disabled={declaring === skill.slug}
                        className="rounded-md border border-success/30 bg-success-light/50 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success-light disabled:opacity-50"
                      >
                        {declaring === skill.slug ? "..." : "Je connais"}
                      </button>
                    )}
                    <Link
                      href={href}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
                    >
                      Ouvrir
                    </Link>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Quick declare section */}
      {!selectedPath && (
        <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="font-display text-lg font-semibold text-fg">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-lg font-bold text-accent">
                1
              </div>
              <p className="mt-3 text-sm text-fg-muted">Choisis un parcours comme objectif</p>
            </div>
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-lg font-bold text-accent">
                2
              </div>
              <p className="mt-3 text-sm text-fg-muted">Declare skills you already know</p>
            </div>
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-lg font-bold text-accent">
                3
              </div>
              <p className="mt-3 text-sm text-fg-muted">See exactly what&apos;s left to learn</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
