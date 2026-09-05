import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { BuilderTools } from "@/components/BuilderTools";

export default async function PathEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const path = await db.learningPath.findUnique({
    where: { slug },
    include: {
      domain: { select: { name: true, slug: true } },
      steps: {
        include: {
          skill: { select: { id: true, slug: true, name: true } },
          course: { select: { slug: true, code: true, title: true } },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!path) notFound();
  if (path.ownerId !== user.id) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-xl font-bold text-fg">Ce parcours n&apos;est pas le tien</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Seul le propriétaire peut modifier un parcours.
        </p>
        <Link href={`/paths/${slug}`} className="mt-4 inline-block text-accent hover:underline">
          Voir le parcours →
        </Link>
      </div>
    );
  }

  const [skills, courses] = await Promise.all([
    db.skill.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    db.course.findMany({
      where: { universityId: { not: null } },
      orderBy: { code: "asc" },
      select: { id: true, code: true, title: true },
    }),
  ]);

  // Suggestions: skills unlocked by the last skill step, not already in the path
  const lastSkillStep = [...path.steps].reverse().find((s) => s.skill);
  const inPathSkillIds = new Set(
    path.steps.map((s) => s.skill?.id).filter((id): id is string => Boolean(id)),
  );
  const suggestions = lastSkillStep?.skill
    ? await db.skill.findMany({
        where: {
          id: { notIn: [...inPathSkillIds] },
          prerequisites: { some: { prerequisiteId: lastSkillStep.skill.id } },
        },
        select: { id: true, name: true },
        take: 5,
      })
    : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="data-label">Builder de parcours</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-fg">{path.name}</h1>
      <p className="mt-1 text-sm text-fg-muted">
        {path.domain.name} · {path.steps.length} étapes —{" "}
        <Link href={`/paths/${slug}`} className="text-accent hover:underline">
          vue étudiant →
        </Link>
      </p>

      <div className="mt-6">
        <BuilderTools
          pathSlug={slug}
          steps={path.steps}
          skills={skills.map((s) => ({ id: s.id, label: s.name }))}
          courses={courses.map((c) => ({
            id: c.id,
            label: `${c.code ?? "?"} — ${c.title}`,
          }))}
          suggestions={suggestions.map((s) => ({
            id: s.id,
            name: s.name,
            reason: `Débloqué par ${lastSkillStep?.skill?.name ?? "ta dernière étape"}`,
          }))}
        />
      </div>
    </div>
  );
}
