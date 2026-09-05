/**
 * Promote a user to ADMIN or CONTRIBUTOR (program team).
 *
 *   npm run promote -- email@example.com [ADMIN|CONTRIBUTOR]
 *
 * ADMIN / CONTRIBUTOR can add resource links to any course from its page.
 */
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../src/generated/prisma/client.js";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2];
  const role = (process.argv[3] ?? "ADMIN").toUpperCase();
  if (!email || !["ADMIN", "CONTRIBUTOR"].includes(role)) {
    console.log("Usage: npm run promote -- email@example.com [ADMIN|CONTRIBUTOR]");
    process.exit(1);
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log(`User not found: ${email}`);
    process.exit(1);
  }
  await prisma.user.update({ where: { id: user.id }, data: { role } });
  console.log(`✓ ${email} → ${role}`);
  await prisma.$disconnect();
}

main();
