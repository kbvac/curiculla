"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Step = {
  id: string;
  phase: string;
  order: number;
  isRequired: boolean;
  skill: { slug: string; name: string } | null;
  course: { slug: string; code: string | null; title: string } | null;
  customTitle: string | null;
  customUrl: string | null;
};

type Option = { id: string; label: string; sub?: string };

export function BuilderTools({
  pathSlug,
  steps,
  skills,
  courses,
  suggestions,
}: {
  pathSlug: string;
  steps: Step[];
  skills: Option[];
  courses: Option[];
  suggestions: { id: string; name: string; reason: string }[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [kind, setKind] =
    useState<"skill" | "course" | "custom">("skill");
  const [query, setQuery] = useState("");
  const [pickedId, setPickedId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState("PERSO");

  const options = kind === "skill" ? skills : courses;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? options.filter((o) => o.label.toLowerCase().includes(q))
      : options;
    return pool.slice(0, 8);
  }, [options, query]);

  const call = async (method: string, body?: unknown, qs = "") => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/my/paths/${pathSlug}/steps${qs}`, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Action impossible");
        return false;
      }
      router.refresh();
      return true;
    } finally {
      setBusy(false);
    }
  };

  const add = async (override?: { kind: "skill" | "course"; id: string }) => {
    const k = override?.kind ?? kind;
    const id = override?.id ?? pickedId;
    let ok = false;
    if (k === "skill" && id) ok = await call("POST", { kind: "skill", skillId: id, phase });
    else if (k === "course" && id) ok = await call("POST", { kind: "course", courseId: id, phase });
    else if (k === "custom") ok = await call("POST", { kind: "custom", title, url: url || undefined, phase });
    if (ok) {
      setPickedId("");
      setQuery("");
      setTitle("");
      setUrl("");
    }
  };

  const toggleKind = (k: "skill" | "course" | "custom") => {
    setKind(k);
    setPickedId("");
    setQuery("");
  };

  // Group steps by phase for a readable outline
  const grouped = useMemo(() => {
    const map = new Map<string, Step[]>();
    for (const s of steps) {
      const arr = map.get(s.phase) ?? [];
      arr.push(s);
      map.set(s.phase, arr);
    }
    return [...map.entries()];
  }, [steps]);

  const input = "field";

  return (
    <div className="space-y-3">
      {error && (
        <div className="border-l-2 border-danger bg-danger-light/40 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      {/* Add a step */}
      <div className="border border-border bg-card p-4">
        <p className="data-label mb-3">Ajouter une étape</p>
        <div className="flex gap-2 text-sm">
          {(
            [
              ["skill", "Skill"],
              ["course", "Cours"],
              ["custom", "Lien libre"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => toggleKind(k)}
              className={`rounded-sm px-3 py-1.5 font-medium transition-colors ${
                kind === k ? "bg-fg text-card" : "bg-muted text-fg-muted hover:bg-border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {kind === "custom" ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre — ex: Article sur les index B-tree"
                className={input}
              />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL (optionnel)"
                type="url"
                className={input}
              />
            </>
          ) : (
            <>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={kind === "skill" ? "Rechercher un skill…" : "Rechercher un cours (CSE, 6.00…)"}
                className={input}
              />
              <select
                value={pickedId}
                onChange={(e) => setPickedId(e.target.value)}
                className={input}
                size={Math.min(6, Math.max(2, filtered.length + 1))}
              >
                <option value="">
                  {kind === "skill" ? "Choisir un skill…" : "Choisir un cours…"}
                </option>
                {filtered.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                    {o.sub ? ` — ${o.sub}` : ""}
                  </option>
                ))}
              </select>
              <p className="font-mono text-[11px] text-fg-faint">
                {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
                {query ? ` pour « ${query} »` : ""}
              </p>
            </>
          )}
          <input
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            placeholder="Phase — ex: FONDATIONS, CORE, PROJETS"
            className={input}
          />
          <button
            onClick={() => add()}
            disabled={
              busy ||
              (kind === "custom" ? title.length < 2 : !pickedId)
            }
            className="btn-primary w-full"
          >
            Ajouter l&apos;étape
          </button>
        </div>

        {/* Suggestions: what the graph unlocks next */}
        {suggestions.length > 0 && (
          <div className="mt-4 border-t border-border pt-3">
            <p className="data-label mb-2">Suggéré ensuite (le graphe débloque)</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  disabled={busy}
                  onClick={() => add({ kind: "skill", id: s.id })}
                  title={s.reason}
                  className="rounded-sm border border-border px-2.5 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                >
                  + {s.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Steps outline, grouped by phase */}
      <div className="border border-border bg-card">
        <p className="data-label border-b border-border px-4 py-3">
          {steps.length} étapes
        </p>
        {grouped.map(([phaseName, phaseSteps]) => (
          <div key={phaseName}>
            <p className="border-b border-border bg-muted px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
              {phaseName}
            </p>
            <ul className="divide-y divide-border">
              {phaseSteps.map((step) => {
                const label =
                  step.skill?.name ??
                  (step.course
                    ? `${step.course.code} — ${step.course.title}`
                    : step.customTitle) ??
                  "?";
                const href = step.skill
                  ? `/skills/${step.skill.slug}`
                  : step.course
                    ? `/courses/${step.course.slug}`
                    : step.customUrl;
                const globalIndex = steps.findIndex((s) => s.id === step.id);
                return (
                  <li key={step.id} className="flex items-center gap-2 px-3 py-2.5">
                    <span className="w-6 shrink-0 text-right font-mono text-xs text-fg-faint">
                      {globalIndex + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="block truncate text-sm text-fg hover:text-accent"
                        >
                          {label}
                        </a>
                      ) : (
                        <span className="block truncate text-sm text-fg">{label}</span>
                      )}
                      <span className="font-mono text-[10px] text-fg-faint">
                        {step.course ? "cours · " : ""}
                        {step.customUrl ? "lien · " : ""}
                        {!step.isRequired ? "optionnel" : "requis"}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <IconBtn
                        label="Monter"
                        disabled={busy || globalIndex === 0}
                        onClick={() => call("PATCH", { stepId: step.id, direction: "up" })}
                      >
                        ↑
                      </IconBtn>
                      <IconBtn
                        label="Descendre"
                        disabled={busy || globalIndex === steps.length - 1}
                        onClick={() => call("PATCH", { stepId: step.id, direction: "down" })}
                      >
                        ↓
                      </IconBtn>
                      <IconBtn
                        label={step.isRequired ? "Rendre optionnel" : "Rendre requis"}
                        disabled={busy}
                        onClick={() =>
                          call("PATCH", { stepId: step.id, isRequired: !step.isRequired })
                        }
                      >
                        {step.isRequired ? "req" : "opt"}
                      </IconBtn>
                      <IconBtn
                        label="Supprimer"
                        disabled={busy}
                        danger
                        onClick={() => call("DELETE", undefined, `?stepId=${step.id}`)}
                      >
                        ✕
                      </IconBtn>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {steps.length === 0 && (
          <p className="px-4 py-6 text-sm text-fg-muted">
            Parcours vide — ajoute ta première étape ci-dessus, ou duplique un
            parcours officiel depuis sa page.
          </p>
        )}
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`rounded-sm border border-border px-1.5 py-1 font-mono text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30 ${
        danger ? "hover:border-danger hover:text-danger" : ""
      }`}
    >
      {children}
    </button>
  );
}
