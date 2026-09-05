"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TYPES = [
  "LECTURE",
  "LECTURE_NOTES",
  "BOOK",
  "EXERCISE",
  "EXAM",
  "VIDEO",
  "DOCUMENTATION",
] as const;

/**
 * Program-team form: attach a hand-picked resource link to a course.
 * Visible only for ADMIN / CONTRIBUTOR. Used when official resources
 * for a program date cannot be found automatically.
 */
export function ContributeResourceForm({ courseSlug }: { courseSlug: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<string>("LECTURE");
  const [instructor, setInstructor] = useState("");
  const [year, setYear] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError("");
    setDone(false);
    try {
      const res = await fetch(`/api/courses/${courseSlug}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          url,
          type,
          instructor: instructor || undefined,
          year: year ? parseInt(year, 10) : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Ajout impossible");
        return;
      }
      setDone(true);
      setTitle("");
      setUrl("");
      setInstructor("");
      setYear("");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-ghost">
        + Ajouter un lien (équipe programme)
      </button>
    );
  }

  const input = "field";

  return (
    <div className="border border-dashed border-accent/50 bg-accent-light/20 p-4">
      <p className="data-label mb-3">Ajouter un lien — équipe du programme</p>
      {error && <p className="mb-2 text-sm text-danger">{error}</p>}
      {done && <p className="mb-2 text-sm text-completed">Lien ajouté ✓</p>}
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre — ex: Lecture 5 (Spring 2022)"
          className={input}
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          type="url"
          className={input}
        />
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
            placeholder="Prof (optionnel)"
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
      <div className="mt-3 flex gap-2">
        <button
          onClick={submit}
          disabled={busy || title.length < 2 || !url}
          className="btn-primary"
        >
          {busy ? "…" : "Publier le lien"}
        </button>
        <button onClick={() => setOpen(false)} className="btn-ghost">
          Annuler
        </button>
      </div>
    </div>
  );
}
