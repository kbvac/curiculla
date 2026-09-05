"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = [
  { idx: 1, label: "Lun" },
  { idx: 2, label: "Mar" },
  { idx: 3, label: "Mer" },
  { idx: 4, label: "Jeu" },
  { idx: 5, label: "Ven" },
  { idx: 6, label: "Sam" },
  { idx: 0, label: "Dim" },
];

const MINUTES_OPTIONS = [30, 45, 60, 90, 120];

export type AvailabilityValue = {
  days: number[];
  minutesPerDay: number;
  startTime: string;
};

/**
 * Petit questionnaire de disponibilités : jours, minutes par jour, heure.
 * Pilote l'emploi du temps dynamique.
 */
export function AvailabilityForm({
  initial,
  compact = false,
}: {
  initial: AvailabilityValue | null;
  compact?: boolean;
}) {
  const router = useRouter();
  const [days, setDays] = useState<number[]>(initial?.days ?? [1, 2, 3, 4, 5]);
  const [minutes, setMinutes] = useState(initial?.minutesPerDay ?? 60);
  const [time, setTime] = useState(initial?.startTime ?? "09:00");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(!initial);

  const toggleDay = (idx: number) =>
    setDays((prev) => (prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]));

  const save = async () => {
    if (days.length === 0) {
      setError("Choisis au moins un jour");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, minutesPerDay: minutes, startTime: time }),
      });
      if (!res.ok) {
        setError("Enregistrement impossible");
        return;
      }
      setEditing(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const dayNames = (idxs: number[]) =>
    idxs
      .slice()
      .sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7))
      .map((i) => DAYS.find((d) => d.idx === i)?.label)
      .join(" · ");

  if (initial && !editing) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-fg-muted">
          <span className="font-medium text-fg">{dayNames(initial.days)}</span>
          {" · "}
          {initial.minutesPerDay} min/jour
          {" · "}
          {initial.startTime}
        </p>
        <button
          onClick={() => setEditing(true)}
          className="rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent"
        >
          Modifier mes dispos
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "border border-border bg-card p-5"}>
      {!compact && (
        <>
          <h2 className="font-display text-lg font-semibold text-fg">
            Quand peux-tu étudier ?
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            Ton emploi du temps se génère tout seul à partir de ça — uniquement
            sur tes jours, à ton rythme.
          </p>
        </>
      )}

      <p className="data-label mb-2 mt-4">Jours disponibles</p>
      <div className="flex flex-wrap gap-2">
        {DAYS.map((d) => {
          const on = days.includes(d.idx);
          return (
            <button
              key={d.idx}
              onClick={() => toggleDay(d.idx)}
              aria-pressed={on}
              className={`h-10 w-12 rounded-sm border text-sm font-medium transition-colors ${
                on
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-card text-fg-muted hover:border-accent/50"
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      <p className="data-label mb-2 mt-4">Minutes par jour</p>
      <div className="flex flex-wrap gap-2">
        {MINUTES_OPTIONS.map((m) => (
          <button
            key={m}
            onClick={() => setMinutes(m)}
            aria-pressed={minutes === m}
            className={`rounded-sm border px-3 py-1.5 font-mono text-sm transition-colors ${
              minutes === m
                ? "border-accent bg-accent text-white"
                : "border-border bg-card text-fg-muted hover:border-accent/50"
            }`}
          >
            {m}′
          </button>
        ))}
      </div>

      <p className="data-label mb-2 mt-4">Heure habituelle</p>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="field max-w-[140px]"
      />

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      <button onClick={save} disabled={saving} className="btn-primary mt-4">
        {saving ? "…" : initial ? "Mettre à jour" : "Générer mon emploi du temps"}
      </button>
    </div>
  );
}
