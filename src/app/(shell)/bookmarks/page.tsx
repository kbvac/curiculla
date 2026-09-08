import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const bookmarks = await db.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-fg">Favoris</h1>
      <p className="mt-2 text-fg-muted">Tes éléments enregistrés, accessibles rapidement.</p>

      {bookmarks.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-fg-muted">Aucun favori — épingle un cours ou un skill.</p>
          <Link href="/domains" className="mt-4 inline-block text-sm text-accent hover:text-accent-dark">
            Browse domains to find something to save
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {bookmarks.map((b) => {
            const href =
              b.targetType === "SKILL"
                ? `/skills/${b.targetId}`
                : b.targetType === "LEARNING_PATH"
                ? `/paths/${b.targetId}`
                : null; // resources have no detail page — they are outbound links

            return (
              <Link
                key={b.id}
                href={href ?? "#"}
                className={`flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40 ${
                  href ? "" : "pointer-events-none opacity-70"
                }`}
              >
                <div>
                  <span className="text-xs font-medium text-accent">{b.targetType}</span>
                  <h3 className="mt-0.5 font-medium text-fg">{b.targetId}</h3>
                </div>
                <span className="text-xs text-fg-faint">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
