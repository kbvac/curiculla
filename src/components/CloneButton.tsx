"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CloneButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const clone = async () => {
    setBusy(true);
    setError("");
    try {
      // domainSlug is required by the API — reuse the source path's domain
      const src = await fetch(`/api/paths/${slug}`).then((r) => r.json());
      const domainSlug = src.data?.domain?.slug ?? "computer-science";
      const res = await fetch("/api/my/paths", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Copie — ${name}`,
          domainSlug,
          cloneFrom: slug,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Duplication impossible");
        return;
      }
      router.push(`/paths/${data.data.slug}/edit`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        onClick={clone}
        disabled={busy}
        className="btn-ghost"
      >
        {busy ? "Duplication…" : "⧉ Dupliquer ce parcours"}
      </button>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
