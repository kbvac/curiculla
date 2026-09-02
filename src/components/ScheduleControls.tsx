"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LectureCheck({
  resourceSlug,
  done,
}: {
  resourceSlug: string;
  done: boolean;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(done);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    setBusy(true);
    const next = !checked;
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceSlug,
          status: next ? "COMPLETED" : "NOT_STARTED",
        }),
      });
      setChecked(next);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={checked ? "Marquer comme à faire" : "Marquer comme fait"}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors ${
        checked
          ? "border-completed bg-completed text-white"
          : "border-border-strong bg-card hover:border-accent"
      }`}
    >
      {checked && (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

export function EnrollButton({
  courseSlug,
  enrolled,
}: {
  courseSlug: string;
  enrolled: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(enrolled);

  const toggle = async () => {
    setBusy(true);
    try {
      if (active) {
        await fetch(`/api/schedule?courseSlug=${courseSlug}`, { method: "DELETE" });
        setActive(false);
      } else {
        await fetch("/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseSlug }),
        });
        setActive(true);
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
        active
          ? "border border-border text-fg-muted hover:border-accent hover:text-accent"
          : "bg-accent text-white hover:bg-accent-dark"
      }`}
    >
      {active ? "Quitter l'emploi du temps" : "Suivre cet emploi du temps"}
    </button>
  );
}

export function ScheduleEnrollButton({ courseSlug }: { courseSlug: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);

  const add = async () => {
    setBusy(true);
    try {
      await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug }),
      });
      setAdded(true);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (added) {
    return (
      <Link href="/schedule" className="shrink-0 font-mono text-xs text-accent hover:text-accent-dark">
        ajouté → emploi du temps
      </Link>
    );
  }

  return (
    <button
      onClick={add}
      disabled={busy}
      className="shrink-0 rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
    >
      {busy ? "…" : "+ semaine"}
    </button>
  );
}
