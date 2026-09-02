"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

type SkillOption = { id: string; name: string };

export function BuilderTools({
  pathSlug,
  steps,
  skills,
}: {
  pathSlug: string;
  steps: Step[];
  skills: SkillOption[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [kind, setKind] = useState<"skill" | "custom">("skill");
  const [skillId, setSkillId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState("PERSO");

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

  const add = async () => {
    const ok =
      kind === "skill"
        ? await call("POST", { kind: "skill", skillId, phase })
        : await call("POST", { kind: "custom", title, url: url || undefined, phase });
    if (ok) {
      setSkillId("");
      setTitle("");
      setUrl("");
    }
  };

  const input =
    "block w-full rounded-sm border border-border bg-card px-3 py-2 text-sm text-fg outline-none focus:border-accent";

  return (
    <div className="space-y-3">
      {error && (
        <div className="border-l-2 border-accent bg-accent-light/40 px-3 py-2 text-sm text-accent-dark">
          {error}
        </div>
      )}

      {/* Add a step */}
      <div className="border border-border bg-card p-4">
        <p className="data-label mb-3">Ajouter une étape</p>
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setKind("skill")}
            className={`rounded-sm px-3 py-1.5 font-medium transition-colors ${
              kind === "skill" ? "bg-fg text-card" : "bg-muted text-fg-muted hover:bg-border"
            }`}
          >
            Skill de la bibliothèque
          </button>
          <button
            onClick={() => setKind("custom")}
            className={`rounded-sm px-3 py-1.5 font-medium transition-colors ${
              kind === "custom" ? "bg-fg text-card" : "bg-muted text-fg-muted hover:bg-border"
            }`}
          >
            Lien libre
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {kind === "skill" ? (
            <select value={skillId} onChange={(e) => setSkillId(e.target.value)} className={input}>
              <option value="">Choisir un skill…</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : (
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
          )}
          <input
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            placeholder="Phase — ex: FONDATIONS, CORE, PROJETS"
            className={input}
          />
          <button
            onClick={add}
            disabled={busy || (kind === "skill" ? !skillId : title.length < 2)}
            className="w-full rounded-sm bg-accent py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
          >
            Ajouter l&apos;étape
          </button>
        </div>
      </div>

      {/* Steps list with controls */}
      <div className="border border-border bg-card">
        <p className="data-label border-b border-border px-4 py-3">
          {steps.length} étapes
        </p>
        <ul className="divide-y divide-border">
          {steps.map((step, i) => {
            const label =
              step.skill?.name ??
              (step.course ? `${step.course.code} — ${step.course.title}` : step.customTitle) ??
              "?";
            const href = step.skill
              ? `/skills/${step.skill.slug}`
              : step.course
                ? `/courses/${step.course.slug}`
                : step.customUrl;
            return (
              <li key={step.id} className="flex items-center gap-2 px-3 py-2.5">
                <span className="w-6 shrink-0 text-right font-mono text-xs text-fg-faint">
                  {i + 1}
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
                    {step.phase}
                    {step.customUrl ? " · lien" : ""}
                    {!step.isRequired ? " · optionnel" : ""}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <IconBtn
                    label="Monter"
                    disabled={busy || i === 0}
                    onClick={() => call("PATCH", { stepId: step.id, direction: "up" })}
                  >
                    ↑
                  </IconBtn>
                  <IconBtn
                    label="Descendre"
                    disabled={busy || i === steps.length - 1}
                    onClick={() => call("PATCH", { stepId: step.id, direction: "down" })}
                  >
                    ↓
                  </IconBtn>
                  <IconBtn
                    label={step.isRequired ? "Rendre optionnel" : "Rendre requis"}
                    disabled={busy}
                    onClick={() => call("PATCH", { stepId: step.id, isRequired: !step.isRequired })}
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
          {steps.length === 0 && (
            <li className="px-4 py-6 text-sm text-fg-muted">
              Parcours vide — ajoute ta première étape ci-dessus.
            </li>
          )}
        </ul>
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
        danger ? "hover:border-accent hover:text-accent" : ""
      }`}
    >
      {children}
    </button>
  );
}
