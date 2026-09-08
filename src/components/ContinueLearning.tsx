import Link from "next/link";
import { db } from "@/lib/db";

export async function ContinueLearning({ userId }: { userId: string }) {
  // Continue learning: find last accessed resource
  const lastProgress = await db.userProgress.findFirst({
    where: { userId, status: "IN_PROGRESS" },
    include: { resource: { select: { slug: true, title: true, url: true, type: true } } },
    orderBy: { lastAccessedAt: "desc" },
  });

  const activeGoal = await db.userGoal.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { path: { select: { slug: true, name: true } } },
  });

  if (!lastProgress || !lastProgress.resource) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <span className="text-xs font-medium text-fg-faint">REPRENDRE</span>
      {activeGoal && (
        <h3 className="mt-1 font-display text-lg font-semibold text-fg">
          {activeGoal.path.name}
        </h3>
      )}

      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-fg">{lastProgress.resource.title}</p>
          <p className="text-xs text-fg-faint">{lastProgress.resource.type}</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-accent">{Math.round(lastProgress.percent)}%</span>
        </div>
      </div>

      <div className="progress-bar mt-3">
        <div className="progress-bar-fill bg-accent" style={{ width: `${Math.round(lastProgress.percent)}%` }} />
      </div>

      <div className="mt-4 flex gap-3">
        {lastProgress.resource.url && (
          <a
            href={lastProgress.resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark transition-colors"
          >
            Resume
          </a>
        )}
        {activeGoal && (
          <Link
            href={`/paths/${activeGoal.path.slug}`}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg hover:border-accent/40 transition-colors"
          >
            View path
          </Link>
        )}
      </div>
    </div>
  );
}
