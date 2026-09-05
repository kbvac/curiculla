"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type ManagedResource = {
  id: string;
  slug: string;
  title: string;
  url: string;
  type: string;
  instructor: string | null;
  year: number | null;
};

const TYPES = [
  "LECTURE",
  "LECTURE_NOTES",
  "BOOK",
  "EXERCISE",
  "EXAM",
  "VIDEO",
  "DOCUMENTATION",
];

/**
 * Edit / delete controls for a team-added resource link.
 * Rendered only for ADMIN / CONTRIBUTOR, only on `team-*` resources
 * (official imports are rebuilt and must stay untouched).
 */
export function ResourceActions({
  courseSlug,
  resource,
}: {
  courseSlug: string;
  resource: ManagedResource;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(resource.title);
  const [url, setUrl] = useState(resource.url);
  const [type, setType] = useState(resource.type);
  const [instructor, setInstructor] = useState(resource.instructor ?? "");
  const [year, setYear] = useState(resource.year ? String(resource.year) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);

  const base = `/api/courses/${courseSlug}/resources/${resource.id}`;
  const input = "field";

  const save = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(base, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          url,
          type,
          instructor: instructor || null,
          year: year ? parseInt(year, 10) : null,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Modification impossible");
        return;
      }
      setEditing(false);
      setConfirming(false);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      const res = await fetch(base, { method: "DELETE" });
      if (!res.ok) return;
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (!editing) {
    return (
      <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
        <span className="font-mono text-[11px] text-fg-faint">lien d&apos;équipe</span>
        <span className="ml-auto flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="font-mono text-xs text-fg-muted underline-offset-2 hover:text-accent hover:underline"
          >
            Modifier
          </button>
          {confirming ? (
            <>
              <span className="font-mono text-xs text-danger">Supprimer ?</span>
              <button
                onClick={remove}
                disabled={busy}
                className="font-mono text-xs font-bold text-danger underline-offset-2 hover:underline"
              >
                Oui
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="font-mono text-xs text-fg-muted hover:text-fg"
              >
                Non
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="font-mono text-xs text-fg-muted underline-offset-2 hover:text-danger hover:underline"
            >
              Supprimer
            </button>
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-2 border-t border-border pt-3">
      {error && <p className="mb-2 text-sm text-danger">{error}</p>}
      <div className="grid gap-2 sm:grid-cols-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={input} />
        <input value={url} onChange={(e) => setUrl(e.target.value)} type="url" className={input} />
        <select value={type} onChange={(e) => setType(e.target.value)} className={input}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="Prof"
            className={input}
          />
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Année"
            type="number"
            className={input}
          />
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={save} disabled={busy || title.length < 2 || !url} className="btn-primary">
          {busy ? "…" : "Enregistrer"}
        </button>
        <button onClick={() => setEditing(false)} className="btn-ghost">
          Annuler
        </button>
      </div>
    </div>
  );
}
