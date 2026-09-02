"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type University = {
  slug: string;
  name: string;
  country: string | null;
  _count?: { courses: number; resources: number };
};

export function UniversityPicker({
  currentSlug,
  compact = false,
}: {
  currentSlug: string | null;
  compact?: boolean;
}) {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [selected, setSelected] = useState(currentSlug ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    fetch("/api/universities")
      .then((r) => r.json())
      .then((d) => setUniversities(d.data ?? []))
      .catch(() => setUniversities([]));
  }, []);

  const save = async (slug: string) => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/user/university", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universitySlug: slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save");
        return;
      }
      setSelected(slug);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={compact ? "" : "rounded-xl border border-border bg-card p-6"}>
      {!compact && (
        <>
          <h2 className="font-display text-lg font-semibold text-fg">
            Choose your home university
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            Your courses, official resources and curriculum paths will be organized around it.
          </p>
        </>
      )}
      <div className={`flex gap-2 ${compact ? "" : "mt-4"}`}>
        <select
          value={selected}
          onChange={(e) => save(e.target.value)}
          disabled={saving || universities.length === 0}
          className="flex-1 rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
        >
          <option value="">
            {universities.length === 0 ? "Loading…" : "No university selected"}
          </option>
          {universities.map((u) => (
            <option key={u.slug} value={u.slug}>
              {u.name}
              {u.country ? ` — ${u.country}` : ""}
            </option>
          ))}
        </select>
        {saving && <span className="self-center text-xs text-fg-faint">Saving…</span>}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
