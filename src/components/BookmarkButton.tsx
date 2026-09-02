"use client";

import { useEffect, useState } from "react";

type Props = {
  targetType: "SKILL" | "RESOURCE" | "LEARNING_PATH" | "UNIVERSITY";
  targetId: string;
};

export function BookmarkButton({ targetType, targetId }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((r) => r.json())
      .then((d) => {
        const existing = d.data?.find(
          (b: { targetType: string; targetId: string; id: string }) =>
            b.targetType === targetType && b.targetId === targetId,
        );
        if (existing) {
          setBookmarked(true);
          setBookmarkId(existing.id);
        }
      })
      .catch(() => {});
  }, [targetType, targetId]);

  const toggle = async () => {
    setLoading(true);
    try {
      if (bookmarked && bookmarkId) {
        await fetch(`/api/bookmarks?id=${bookmarkId}`, { method: "DELETE" });
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetType, targetId }),
        });
        const data = await res.json();
        if (data.data) {
          setBookmarked(true);
          setBookmarkId(data.data.id);
        }
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
        bookmarked
          ? "border-accent/30 bg-accent-light text-accent-dark"
          : "border-border text-fg-muted hover:border-accent/40 hover:text-fg"
      }`}
    >
      {bookmarked ? "★ Saved" : "☆ Save"}
    </button>
  );
}
