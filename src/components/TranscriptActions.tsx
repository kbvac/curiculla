"use client";

import { useState } from "react";

export function TranscriptActions() {
  const [downloading, setDownloading] = useState(false);

  const downloadJson = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/transcript");
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `curricula-transcript-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex gap-2 print:hidden">
      <button onClick={downloadJson} disabled={downloading} className="btn-ghost">
        {downloading ? "…" : "↓ JSON vérifiable"}
      </button>
      <button onClick={() => window.print()} className="btn-ghost">
        🖨 Imprimer
      </button>
    </div>
  );
}
