import { db } from "@/lib/db";
import { handle, json } from "@/lib/http";

export const GET = handle(async (request: Request) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return json({ domains: [], paths: [], skills: [], universities: [], resources: [] });
  }

  const pattern = `%${q}%`;

  const [domains, paths, skills, universities, resources] = await Promise.all([
    db.domain.findMany({
      where: { OR: [{ name: { contains: pattern } }, { description: { contains: pattern } }] },
      take: 10,
    }),
    db.learningPath.findMany({
      where: { OR: [{ name: { contains: pattern } }, { tagline: { contains: pattern } }] },
      include: { domain: { select: { name: true } } },
      take: 10,
    }),
    db.skill.findMany({
      where: { OR: [{ name: { contains: pattern } }, { description: { contains: pattern } }] },
      include: { topic: { select: { name: true, subject: { select: { domain: { select: { name: true } } } } } } },
      take: 20,
    }),
    db.university.findMany({
      where: { OR: [{ name: { contains: pattern } }] },
      take: 10,
    }),
    db.resource.findMany({
      where: { OR: [{ title: { contains: pattern } }, { description: { contains: pattern } }] },
      include: { university: { select: { name: true } } },
      take: 10,
    }),
  ]);

  return json({ domains, paths, skills, universities, resources });
});
