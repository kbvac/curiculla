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
          skill: { select: { slug: true, name: true } },
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

  const skills = await db.skill.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

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
        <BuilderTools pathSlug={slug} steps={path.steps} skills={skills} />
      </div>
    </div>
  );
}
