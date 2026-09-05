import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { TranscriptActions } from "@/components/TranscriptActions";

type Transcript = {
  student: { name: string | null; email: string | null; memberSince: string | null };
  generatedAt: string;
  streakDays: number;
  goals: { path: string; slug: string; status: string }[];
  courses: { slug: string; code: string | null; title: string; university: string | null; units: number | null }[];
  skills: { slug: string; name: string; status: string; mastery: number; lineage: string }[];
  quizzes: { title: string; skill: string; score: number }[];
  totals: { courses: number; skills: number; quizzes: number };
};

async function loadTranscript(): Promise<Transcript> {
  // Server-side: reuse the same queries via direct DB access would duplicate
  // logic; instead this page fetches its own data through the API-shaped
  // helpers. To keep a single source of truth, we call the DB here with the
  // same semantics as /api/transcript (see that route for reference).
  const { db } = await import("@/lib/db");
  const { computeStreak } = await import("@/lib/skills");
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [userSkills, attempts, goals, streak, courses] = await Promise.all([
    db.userSkill.findMany({
      where: { userId: user.id, status: { in: ["COMPLETED", "MASTERED"] } },
      include: {
        skill: {
          select: {
            slug: true,
            name: true,
            topic: {
              select: {
                name: true,
                subject: {
                  select: {
                    name: true,
                    domain: { select: { name: true, slug: true } },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    db.assessmentAttempt.findMany({
      where: { userId: user.id, passed: true },
      include: {
        assessment: { select: { title: true, skill: { select: { slug: true, name: true } } } },
      },
      orderBy: { score: "desc" },
    }),
    db.userGoal.findMany({
      where: { userId: user.id },
      include: { path: { select: { slug: true, name: true } } },
    }),
    computeStreak(user.id),
    db.course.findMany({
      where: { universityId: { not: null } },
      include: {
        university: { select: { name: true, slug: true } },
        resources: {
          where: { weekNumber: { not: null } },
          select: {
            id: true,
            progress: { where: { userId: user.id }, select: { status: true } },
          },
        },
      },
    }),
  ]);

  const primaryProgress = courses.length
    ? await db.userProgress.findMany({
        where: {
          userId: user.id,
          resource: { courseId: { in: courses.map((c) => c.id) }, weekNumber: null },
        },
        select: { status: true, resource: { select: { courseId: true } } },
      })
    : [];
  const primaryDone = new Set(
    primaryProgress.filter((p) => p.status === "COMPLETED").map((p) => p.resource.courseId),
  );

  const validatedCourses = courses
    .filter((c) =>
      c.resources.length > 0
        ? c.resources.every((r) => r.progress[0]?.status === "COMPLETED")
        : primaryDone.has(c.id),
    )
    .map((c) => ({
      slug: c.slug,
      code: c.code,
      title: c.title,
      university: c.university?.name ?? null,
      units: c.units,
    }));

  const bestByAssessment = new Map<string, { title: string; skill: string; score: number }>();
  for (const a of attempts) {
    const prev = bestByAssessment.get(a.assessment.title);
    if (!prev || a.score > prev.score) {
      bestByAssessment.set(a.assessment.title, {
        title: a.assessment.title,
        skill: a.assessment.skill.name,
        score: a.score,
      });
    }
  }

  const fullUser = await db.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true, createdAt: true },
  });

  return {
    student: {
      name: fullUser?.name ?? null,
      email: fullUser?.email ?? null,
      memberSince: fullUser?.createdAt?.toISOString() ?? null,
    },
    generatedAt: new Date().toISOString(),
    streakDays: streak,
    goals: goals.map((g) => ({ path: g.path.name, slug: g.path.slug, status: g.status })),
    courses: validatedCourses,
    skills: userSkills.map((us) => ({
      slug: us.skill.slug,
      name: us.skill.name,
      status: us.status,
      mastery: Math.round(us.mastery),
      lineage: `${us.skill.topic.subject.domain.name} › ${us.skill.topic.subject.name} › ${us.skill.topic.name}`,
    })),
    quizzes: [...bestByAssessment.values()],
    totals: {
      courses: validatedCourses.length,
      skills: userSkills.length,
      quizzes: bestByAssessment.size,
    },
  };
}

export default async function TranscriptPage() {
  const t = await loadTranscript();
  const empty =
    t.totals.courses === 0 && t.totals.skills === 0 && t.totals.quizzes === 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="data-label">Relevé officiel d&apos;apprentissage</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-fg">Transcript</h1>
        </div>
        <TranscriptActions />
      </header>

      {/* ── En-tête du document ──────────────────────────────────────────── */}
      <section className="border border-border bg-card">
        <div className="border-b border-border px-6 py-5">
          <p className="font-display text-lg font-bold text-fg">Curricula</p>
          <p className="mt-0.5 font-mono text-xs text-fg-faint">
            relevé généré le{" "}
            {new Date(t.generatedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-3">
          {[
            ["Étudiant", t.student.name ?? t.student.email ?? "—"],
            ["Email", t.student.email ?? "—"],
            ["Série active", t.streakDays > 0 ? `${t.streakDays} jours` : "—"],
          ].map(([label, value]) => (
            <div key={label} className="bg-card px-6 py-4">
              <p className="data-label">{label}</p>
              <p className="mt-1 truncate text-sm font-medium text-fg">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {empty ? (
        <div className="mt-6 border border-dashed border-border bg-card p-8 text-center">
          <h2 className="font-display text-lg font-semibold text-fg">
            Relevé vierge — pour l&apos;instant
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
            Termine des sessions de cours, valide des skills par quiz, fixe un
            objectif : chaque preuve apparaîtra ici, avec sa source officielle.
          </p>
          <Link href="/paths" className="btn-primary mt-5 inline-block">
            Choisir un parcours
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Cours validés */}
          {t.courses.length > 0 && (
            <section className="border border-border bg-card">
              <p className="data-label border-b border-border px-6 py-3">
                Cours validés — {t.courses.length}
              </p>
              <ul className="divide-y divide-border">
                {t.courses.map((c) => (
                  <li key={c.slug} className="flex items-baseline justify-between gap-3 px-6 py-3">
                    <div className="min-w-0">
                      <span className="course-code text-accent">{c.code}</span>
                      <span className="ml-2 text-sm font-medium text-fg">{c.title}</span>
                      {c.university && (
                        <p className="mt-0.5 font-mono text-[11px] text-fg-faint">
                          {c.university}
                        </p>
                      )}
                    </div>
                    {c.units && (
                      <span className="shrink-0 font-mono text-xs text-fg-faint">
                        {c.units}u
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills validés */}
          {t.skills.length > 0 && (
            <section className="border border-border bg-card">
              <p className="data-label border-b border-border px-6 py-3">
                Compétences validées — {t.skills.length}
              </p>
              <ul className="divide-y divide-border">
                {t.skills.map((s) => (
                  <li key={s.slug} className="flex items-center justify-between gap-3 px-6 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-fg">{s.name}</p>
                      <p className="mt-0.5 truncate font-mono text-[11px] text-fg-faint">
                        {s.lineage}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-accent">
                      {s.mastery}%
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Quiz réussis */}
          {t.quizzes.length > 0 && (
            <section className="border border-border bg-card">
              <p className="data-label border-b border-border px-6 py-3">
                Examens réussis — {t.quizzes.length}
              </p>
              <ul className="divide-y divide-border">
                {t.quizzes.map((q) => (
                  <li key={q.title} className="flex items-center justify-between gap-3 px-6 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-fg">{q.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-fg-faint">{q.skill}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-accent">
                      {Math.round(q.score)}%
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Objectifs */}
          {t.goals.length > 0 && (
            <section className="border border-border bg-card">
              <p className="data-label border-b border-border px-6 py-3">Objectifs</p>
              <ul className="divide-y divide-border">
                {t.goals.map((g) => (
                  <li key={g.slug} className="flex items-center justify-between gap-3 px-6 py-3">
                    <Link href={`/paths/${g.slug}`} className="text-sm text-fg hover:text-accent">
                      {g.path}
                    </Link>
                    <span className="font-mono text-[11px] text-fg-faint">{g.status}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <p className="mt-8 text-center font-mono text-[11px] text-fg-faint">
        Curricula — relevé calculé depuis tes sessions cochées, quiz réussis et
        objectifs. Données issues de catalogues officiels.
      </p>
    </div>
  );
}
