import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPathProgress, computeStreak } from "@/lib/skills";
import { db } from "@/lib/db";
import { DailyMission } from "@/components/DailyMission";
import { ContinueLearning } from "@/components/ContinueLearning";
import { UniversityPicker } from "@/components/UniversityPicker";
import { ScheduleEnrollButton } from "@/components/ScheduleControls";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [userData, activeGoal, streak, recentProgress, allBookmarks] = await Promise.all([
    db.user.findUnique({
      where: { id: user.id },
      select: {
        university: {
          select: {
            slug: true,
            name: true,
            country: true,
            _count: { select: { courses: true, resources: true } },
          },
        },
      },
    }),
    db.userGoal.findFirst({
      where: { userId: user.id, status: "ACTIVE" },
      include: {
        path: {
          include: {
            domain: { select: { name: true, slug: true } },
          },
        },
      },
    }),
    computeStreak(user.id),
    db.userProgress.findMany({
      where: { userId: user.id },
      include: { resource: { select: { slug: true, title: true, type: true } } },
      orderBy: { lastAccessedAt: "desc" },
      take: 5,
    }),
    db.bookmark.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const bookmarksWithTitles = await Promise.all(
    allBookmarks.map(async (b) => {
      let title = b.targetId;
      let href = "#";
      if (b.targetType === "COURSE") {
        const res = await db.course.findUnique({ where: { slug: b.targetId }, select: { title: true } });
        if (res) title = res.title;
        href = `/courses/${b.targetId}`;
      } else if (b.targetType === "SKILL") {
        const res = await db.skill.findUnique({ where: { slug: b.targetId }, select: { name: true } });
        if (res) title = res.name;
        href = `/skills/${b.targetId}`;
      } else if (b.targetType === "LEARNING_PATH") {
        const res = await db.learningPath.findUnique({ where: { slug: b.targetId }, select: { name: true } });
        if (res) title = res.name;
        href = `/paths/${b.targetId}`;
      } else if (b.targetType === "UNIVERSITY") {
        const res = await db.university.findUnique({ where: { slug: b.targetId }, select: { name: true } });
        if (res) title = res.name;
        href = `/universities/${b.targetId}`;
      }
      return { ...b, title, href };
    })
  );

  const university = userData?.university ?? null;

  const uniPaths = university
    ? await db.learningPath.findMany({
        where: { slug: { startsWith: `${university.slug}-` } },
        include: {
          domain: { select: { name: true, slug: true } },
          _count: { select: { steps: true } },
        },
        take: 4,
      })
    : [];

  const progress = activeGoal ? await getPathProgress(user.id, activeGoal.path.slug) : null;

  // Bridge Goal ↔ weekly schedule: when the active goal is an official
  // (course-based) path, suggest enrolling its first required courses.
  const firstCourses = activeGoal
    ? await db.learningPathStep.findMany({
        where: { pathId: activeGoal.pathId, courseId: { not: null }, isRequired: true },
        include: { course: { select: { slug: true, code: true, title: true } } },
        orderBy: { order: "asc" },
        take: 4,
      })
    : [];
  const enrolledCourseIds = firstCourses.length
    ? (
        await db.scheduleEnrollment.findMany({
          where: { userId: user.id },
          select: { courseId: true },
        })
      ).map((e) => e.courseId)
    : [];
  const enrolledSlugs = enrolledCourseIds.length
    ? (
        await db.course.findMany({
          where: { id: { in: enrolledCourseIds } },
          select: { slug: true },
        })
      ).map((c) => c.slug)
    : [];
  const suggestions = firstCourses.filter((s) => s.course && !enrolledSlugs.includes(s.course.slug));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* ── Header sobre ───────────────────────────────────────────────────── */}
      <header className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="data-label">Tableau de bord</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-fg">
            {user.name ?? user.email}
          </h1>
        </div>
        {streak > 0 && (
          <p className="font-mono text-sm text-fg-muted">{streak} jours de suite</p>
        )}
      </header>

      {/* ── Onboarding université ──────────────────────────────────────────── */}
      {!university && (
        <div className="mb-10">
          <UniversityPicker currentSlug={null} />
        </div>
      )}

      {/* ── NEXT UP — le seul appel à l'action qui compte ──────────────────── */}
      {progress?.nextTask ? (
        <section className="mb-10 border-l-4 border-accent bg-card p-6">
          <p className="data-label text-accent">À faire maintenant</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-fg">
            {progress.nextTask.name}
          </h2>
          {activeGoal && (
            <p className="mt-1 text-sm text-fg-muted">
              dans{" "}
              <Link href={`/paths/${activeGoal.path.slug}`} className="underline hover:text-fg">
                {activeGoal.path.name}
              </Link>
              {progress.currentPhase ? ` · phase ${progress.currentPhase}` : ""}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={progress.nextTask.href}
              className="rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Ouvrir
            </Link>
            {progress.nextTask.resourceUrl && (
              <a
                href={progress.nextTask.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted underline hover:text-fg"
              >
                Commencer la ressource officielle
              </a>
            )}
          </div>

          {/* Transcript compact */}
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-baseline justify-between">
              <p className="data-label">Progression</p>
              <p className="font-mono text-sm font-semibold text-fg">
                {progress.completedSteps}/{progress.totalSteps}
                <span className="ml-2 font-sans font-normal text-fg-faint">
                  {progress.percentage}%
                </span>
              </p>
            </div>
            <div className="progress-bar mt-2">
              <div
                className="progress-bar-fill bg-completed"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {/* Weekly schedule bridge */}
          {suggestions.length > 0 && (
            <div className="mt-6 border-t border-border pt-4">
              <p className="data-label">
                Ajoute ces cours à ton emploi du temps hebdomadaire
              </p>
              <ul className="mt-3 space-y-2">
                {suggestions.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="course-code text-accent">{s.course!.code}</span>
                      <span className="ml-2 truncate text-sm text-fg">{s.course!.title}</span>
                    </div>
                    <ScheduleEnrollButton courseSlug={s.course!.slug} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ) : activeGoal && progress ? (
        <section className="mb-10 border-l-4 border-completed bg-card p-6">
          <p className="data-label text-completed">Parcours terminé</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-fg">
            {activeGoal.path.name}
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Tout est validé — choisis un nouveau parcours pour continuer.
          </p>
          <Link
            href="/paths"
            className="mt-4 inline-block rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Explorer les parcours
          </Link>
        </section>
      ) : (
        <section className="mb-10 border-l-4 border-border bg-card p-6">
          <p className="data-label">Aucun objectif</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-fg">
            Choisis un parcours à suivre
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Fixe un objectif pour que Curricula calcule ta prochaine étape chaque jour.
          </p>
          <Link
            href="/paths"
            className="mt-4 inline-block rounded-sm bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Voir les parcours
          </Link>
        </section>
      )}

      {/* ── Université ─────────────────────────────────────────────────────── */}
      {university && (
        <section className="mb-10 border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <p className="data-label">Ton université</p>
            <UniversityPicker currentSlug={university.slug} compact />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-fg">
                <Link href={`/universities/${university.slug}`} className="hover:text-accent">
                  {university.name}
                </Link>
              </h2>
              <p className="mt-0.5 font-mono text-xs text-fg-faint">
                {university._count.courses} cours · {university._count.resources} ressources
                officielles
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/courses?university=${university.slug}`}
                className="rounded-sm border border-border px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                Catalogue
              </Link>
              {uniPaths.slice(0, 1).map((p) => (
                <Link
                  key={p.slug}
                  href={`/paths/${p.slug}`}
                  className="rounded-sm border border-border px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {p.name.replace(`${university.name} `, "")}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Mission du jour ────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="data-label mb-3">Mission du jour</p>
        <DailyMission userId={user.id} />
      </section>

      {/* ── Reprendre ──────────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="data-label mb-3">Reprendre</p>
        <ContinueLearning userId={user.id} />
      </section>

      {/* ── Activité récente / favoris ─────────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="data-label mb-3">Activité récente</p>
          {recentProgress.length === 0 ? (
            <p className="text-sm text-fg-muted">
              Rien encore — ouvre une ressource pour commencer.
            </p>
          ) : (
            <ul className="divide-y divide-border border border-border bg-card">
              {recentProgress.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg">{p.resource.title}</p>
                    <p className="font-mono text-xs text-fg-faint">{p.resource.type}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm font-semibold text-accent">
                    {Math.round(p.percent)}%
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <p className="data-label mb-3">Favoris</p>
          {bookmarksWithTitles.length === 0 ? (
            <p className="text-sm text-fg-muted">Aucun favori — épingle un cours ou un skill.</p>
          ) : (
            <ul className="divide-y divide-border border border-border bg-card">
              {bookmarksWithTitles.map((b) => (
                <li key={b.id} className="px-4 py-3">
                  <Link href={b.href} className="text-sm font-medium text-fg hover:text-accent transition-colors block">
                    {b.title}
                  </Link>
                  <p className="font-mono text-[10px] text-fg-faint mt-1">{b.targetType}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
