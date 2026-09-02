"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type Domain = { slug: string; name: string };

export default function NewPathPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [domains, setDomains] = useState<Domain[]>([]);
  const [domainSlug, setDomainSlug] = useState("computer-science");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    fetch("/api/domains")
      .then((r) => r.json())
      .then((d) => setDomains(d.data ?? []))
      .catch(() => setDomains([]));
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/my/paths", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tagline: tagline || undefined, domainSlug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Création impossible");
        return;
      }
      router.push(`/paths/${data.data.slug}/edit`);
    } finally {
      setLoading(false);
    }
  };

  const input =
    "mt-1 block w-full rounded-sm border border-border bg-card px-3 py-2 text-sm text-fg outline-none focus:border-accent";

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <p className="data-label">Builder</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-fg">Créer mon parcours</h1>
      <p className="mt-2 text-sm text-fg-muted">
        Assemble tes propres étapes : skills de la bibliothèque ou liens libres. Tu
        pourras tout réordonner ensuite.
      </p>

      <form onSubmit={create} className="mt-6 space-y-4 border border-border bg-card p-5">
        {error && (
          <div className="border-l-2 border-accent bg-accent-light/40 px-3 py-2 text-sm text-accent-dark">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-fg">Nom du parcours</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            placeholder="ex: Backend Node.js en 6 mois"
            className={input}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-fg">Sous-titre</label>
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="optionnel"
            className={input}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-fg">Domaine</label>
          <select value={domainSlug} onChange={(e) => setDomainSlug(e.target.value)} className={input}>
            {domains.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading || !name}
          className="w-full rounded-sm bg-accent py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
        >
          {loading ? "Création…" : "Créer et commencer"}
        </button>
      </form>
    </div>
  );
}
