import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SkillStatusBadge } from "@/components/SkillStatusBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ResourceList } from "@/components/ResourceList";

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();

  const skill = await db.skill.findUnique({
    where: { slug },
    include: {
      topic: {
        select: {
          name: true,
          slug: true,
          subject: {
            select: {
              name: true,
              slug: true,
              domain: { select: { name: true, slug: true } },
            },
          },
        },
      },
      resources: {
        include: {
          resource: {
            include: {
              university: { select: { name: true, slug: true, country: true } },
            },
          },
        },
        orderBy: { isPrimary: "desc" },
      },
      prerequisites: {
        select: {
          prerequisite: { select: { slug: true, name: true, difficulty: true } },
        },
      },
      unlocks: {
        select: {
          skill: { select: { slug: true, name: true } },
        },
      },
    },
  });

  if (!skill) notFound();

  let userSkill = null;
  if (user) {
    userSkill = await db.userSkill.findUnique({
      where: { userId_skillId: { userId: user.id, skillId: skill.id } },
      select: { status: true, mastery: true, selfDeclared: true },
    });
  }

  const domain = skill.topic.subject.domain;
  const subject = skill.topic.subject;

  // Format resources for the client component
  const formattedResources = skill.resources.map((rs) => ({
    ...rs.resource,
    isPrimary: rs.isPrimary,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-fg-muted">
        <Link href="/domains" className="hover:text-fg">Domains</Link>
        <span>/</span>
        <Link href={`/domains/${domain.slug}`} className="hover:text-fg">{domain.name}</Link>
        <span>/</span>
        <span className="text-fg">{skill.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-fg">{skill.name}</h1>
          {skill.description && (
            <p className="mt-2 max-w-2xl text-fg-muted">{skill.description}</p>
          )}
          <div className="mt-3 flex items-center gap-3 text-sm text-fg-faint">
            <span>{subject.name}</span>
            {skill.difficulty && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                Niveau {skill.difficulty}/5
              </span>
            )}
          </div>
        </div>
        {userSkill && (
          <div className="shrink-0 text-right">
            <SkillStatusBadge status={userSkill.status} />
            {userSkill.mastery > 0 && (
              <div className="mt-1 text-2xl font-bold text-accent">
                {Math.round(userSkill.mastery)}%
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quiz link + bookmark */}
      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/quiz/${slug}`}
          className="rounded-lg border border-accent/30 bg-accent-light/30 px-4 py-2 text-sm font-medium text-accent-dark hover:bg-accent-light/50"
        >
          Passer le quiz
        </Link>
        <BookmarkButton targetType="SKILL" targetId={slug} />
        {user && (
          <span className="text-xs text-fg-faint">
            Teste tes connaissances et suis ta maîtrise
          </span>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Resources grouped by university */}
          <section>
            <h2 className="font-display text-xl font-semibold text-fg">Ressources</h2>
            <p className="mt-1 text-sm text-fg-muted">
              {skill.resources.length} ressources disponibles
            </p>
            <div className="mt-4">
              <ResourceList resources={formattedResources} />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prerequisites */}
          {skill.prerequisites.length > 0 && (
            <section className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-fg">Prérequis</h3>
              <div className="mt-3 space-y-2">
                {skill.prerequisites.map((p) => (
                  <Link
                    key={p.prerequisite.slug}
                    href={`/skills/${p.prerequisite.slug}`}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-accent/40"
                  >
                    <span className="text-fg">{p.prerequisite.name}</span>
                    {p.prerequisite.difficulty && (
                      <span className="text-xs text-fg-faint">L{p.prerequisite.difficulty}</span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Unlocks */}
          {skill.unlocks.length > 0 && (
            <section className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-fg">Débloque</h3>
              <div className="mt-3 space-y-2">
                {skill.unlocks.map((u) => (
                  <Link
                    key={u.skill.slug}
                    href={`/skills/${u.skill.slug}`}
                    className="block rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-accent/40"
                  >
                    {u.skill.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Skill gap declaration */}
          {user && (
            <section className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-fg">Tu connais déjà ?</h3>
              <p className="mt-1 text-xs text-fg-muted">
                Marque comme maîtrisé pour avancer plus vite dans ton parcours.
              </p>
              <DeclareSkillButton slug={slug} currentStatus={userSkill?.status} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function DeclareSkillButton({ slug, currentStatus }: { slug: string; currentStatus?: string }) {
  return (
    <form
      action={async () => {
        "use server";
      }}
      className="mt-3"
    >
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        className="w-full rounded-md border border-border px-3 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
      >
        {currentStatus === "MASTERED" ? "Maîtrisé ✓" : "Je connais déjà"}
      </button>
    </form>
  );
}
