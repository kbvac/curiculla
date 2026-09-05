"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SetGoalButton({ pathSlug }: { pathSlug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSetGoal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathSlug }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSetGoal}
      disabled={loading}
      className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
    >
      {loading ? "…" : "Fixer comme objectif"}
    </button>
  );
}
