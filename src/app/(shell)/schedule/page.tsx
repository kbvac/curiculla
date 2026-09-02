import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getScheduleView } from "@/lib/schedule";
import { LectureCheck } from "@/components/ScheduleControls";

function fmtDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default async function SchedulePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const view = await getScheduleView(user.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <p className="data-label">Emploi du temps</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-fg">Ta semaine</h1>
        <p className="mt-2 text-fg-muted">
          Chaque cours suit sa structure officielle (semaines 1→10 du département), calée
          sur ta date de début. Coche ce que tu as regardé.
        </p>
      </header>

      {view.courses.length === 0 ? (
        <div className="border-l-4 border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold text-fg">
            Aucun cours dans ton emploi du temps
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Ouvre un cours du catalogue et clique « Suivre cet emploi du temps » — la
            semaine 1 commence à ta date de départ, pas à celle de l&apos;université.
          </p>
          <Link
            href="/courses"
            className="mt-4 inline-block rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Voir le catalogue
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {view.courses.map((c) => {
            const allDone = c.weekTotal > 0 && c.weekDone === c.weekTotal;
            return (
              <section key={c.courseSlug} className="border border-border bg-card">
                {/* Course header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
                  <div className="flex items-baseline gap-3">
                    <span className="course-code text-accent">{c.code}</span>
                    <Link href={`/courses/${c.courseSlug}`} className="font-medium text-fg hover:text-accent">
                      {c.title}
                    </Link>
                    {c.term && <span className="font-mono text-xs text-fg-faint">{c.term}</span>}
                  </div>
                  <span className="font-mono text-xs text-fg-muted">
                    semaine {c.currentWeek}/{c.maxWeek} · {fmtDate(c.weekStart)} →{" "}
                    {fmtDate(c.weekEnd)} · {c.weekDone}/{c.weekTotal}
                  </span>
                </div>

                {/* Week progress strip */}
                <div className="px-5 pt-3">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: c.weekTotal ? (c.weekDone / c.weekTotal) * 100 : 0 }}
                    />
                  </div>
                  <p className="mt-1.5 font-mono text-xs text-fg-faint">
                    cursus complet : {c.overallDone}/{c.overallTotal} sessions
                  </p>
                </div>

                {/* Sessions */}
                <ul className="divide-y divide-border px-5 py-2">
                  {c.sessions.map((s) => (
                    <li key={s.resourceSlug} className="flex items-center gap-3 py-2.5">
                      <LectureCheck resourceSlug={s.resourceSlug} done={s.status === "COMPLETED"} />
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-0 flex-1"
                      >
                        <span className="block truncate text-sm text-fg hover:text-accent">
                          {s.title}
                        </span>
                      </a>
                      <span className="shrink-0 font-mono text-xs text-fg-faint">
                        {s.sessionKind === "DISCUSSION" ? "disc." : `lect. ${s.lectureNumber}`}
                      </span>
                      {s.dateLabel && (
                        <span className="hidden shrink-0 font-mono text-xs text-fg-faint sm:block">
                          {s.dateLabel}
                        </span>
                      )}
                    </li>
                  ))}
                  {c.sessions.length === 0 && (
                    <li className="py-3 text-sm text-fg-muted">
                      Semaine {c.currentWeek} — aucune session cette semaine
                      {allDone ? " (tout est fait ✓)" : ""}.
                    </li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
