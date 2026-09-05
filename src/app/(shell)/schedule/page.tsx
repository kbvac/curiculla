import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPersonalPlan } from "@/lib/schedule";
import { LectureCheck } from "@/components/ScheduleControls";
import { AvailabilityForm } from "@/components/AvailabilityForm";

function fmtDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
}

function SessionRow({
  s,
}: {
  s: {
    resourceSlug: string;
    title: string;
    url: string;
    sessionKind: string;
    lectureNumber: number;
    status: string;
    code: string;
  };
}) {
  const code = s.code;
  return (
    <li className="flex items-center gap-3 py-2.5">
      <LectureCheck resourceSlug={s.resourceSlug} done={s.status === "COMPLETED"} />
      <a href={s.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1">
        <span className="block truncate text-sm text-fg hover:text-accent">{s.title}</span>
      </a>
      <span className="hidden shrink-0 font-mono text-xs text-fg-faint md:block">
        {code}
      </span>
      <span className="shrink-0 font-mono text-xs text-fg-faint">
        {s.sessionKind === "DISCUSSION" ? "disc." : `lect. ${s.lectureNumber}`}
      </span>
    </li>
  );
}

export default async function SchedulePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const plan = await getPersonalPlan(user.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="data-label">Emploi du temps</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-fg">
            Ton programme, à ton rythme
          </h1>
        </div>
        {plan.courses.length > 0 && (
          <a href="/api/schedule/ics" className="btn-ghost">
            📅 Exporter (.ics)
          </a>
        )}
      </header>

      {/* ── Disponibilités : le questionnaire pilote tout ──────────────────── */}
      <section className="mb-8">
        {!plan.hasProfile && (
          <p className="data-label mb-3">Étape 1 — dis-nous quand tu es dispo</p>
        )}
        <AvailabilityForm
          initial={
            plan.hasProfile
              ? {
                  days: plan.availability.days,
                  minutesPerDay: plan.availability.minutesPerDay,
                  startTime: plan.availability.startTime,
                }
              : null
          }
        />
      </section>

      {plan.courses.length === 0 ? (
        <div className="border-l-4 border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold text-fg">
            Aucun cours dans ton emploi du temps
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Ouvre un cours du catalogue et clique « Suivre cet emploi du temps » —
            les sessions se répartiront seules sur tes jours disponibles.
          </p>
          <Link href="/courses" className="btn-primary mt-4 inline-block">
            Voir le catalogue
          </Link>
        </div>
      ) : (
        <>
          {/* ── Aujourd'hui ────────────────────────────────────────────────── */}
          <section className="mb-8 border border-border bg-card">
            <p className="data-label border-b border-border px-5 py-3">
              Aujourd&apos;hui — {plan.due.length} session{plan.due.length > 1 ? "s" : ""} due
              {plan.due.length > 1 ? "s" : ""}
            </p>
            {plan.due.length === 0 ? (
              <p className="px-5 py-4 text-sm text-fg-muted">
                Rien en retard — tu es à jour. ✓
              </p>
            ) : (
              <ul className="divide-y divide-border px-5">
                {plan.due.map((s) => (
                  <SessionRow key={s.resourceSlug} s={s} />
                ))}
              </ul>
            )}
          </section>

          {/* ── 7 prochains jours ──────────────────────────────────────────── */}
          {plan.upcoming.length > 0 && (
            <section className="mb-8">
              <p className="data-label mb-3">Les 7 prochains jours</p>
              <div className="space-y-3">
                {plan.upcoming.map((u) => (
                  <div key={u.date.toISOString()} className="border border-border bg-card">
                    <p className="border-b border-border px-5 py-2 font-mono text-xs font-semibold capitalize text-fg">
                      {fmtDate(u.date)}
                      <span className="ml-2 font-normal text-fg-faint">
                        {u.sessions.length} session{u.sessions.length > 1 ? "s" : ""}
                      </span>
                    </p>
                    <ul className="divide-y divide-border px-5">
                      {u.sessions.map((s) => (
                        <SessionRow key={s.resourceSlug} s={s} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Progression par cours ──────────────────────────────────────── */}
          <section>
            <p className="data-label mb-3">Tes cours suivis</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {plan.courses.map((c) => {
                const pct = c.totalCount ? Math.round((c.doneCount / c.totalCount) * 100) : 0;
                return (
                  <Link
                    key={c.courseSlug}
                    href={`/courses/${c.courseSlug}`}
                    className="card-hover block border border-border bg-card p-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="course-code text-accent">{c.code}</span>
                      <span className="font-mono text-xs text-fg-faint">
                        {c.doneCount}/{c.totalCount} · {pct}%
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-fg-muted">{c.title}</p>
                    <div className="progress-bar mt-2">
                      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
