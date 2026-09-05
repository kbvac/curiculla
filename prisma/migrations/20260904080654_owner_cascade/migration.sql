-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LearningPath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "ownerId" TEXT,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT,
    "level" TEXT,
    "estimatedMonths" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "LearningPath_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningPath_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LearningPath" ("description", "domainId", "estimatedMonths", "id", "level", "name", "order", "ownerId", "slug", "tagline") SELECT "description", "domainId", "estimatedMonths", "id", "level", "name", "order", "ownerId", "slug", "tagline" FROM "LearningPath";
DROP TABLE "LearningPath";
ALTER TABLE "new_LearningPath" RENAME TO "LearningPath";
CREATE UNIQUE INDEX "LearningPath_slug_key" ON "LearningPath"("slug");
CREATE INDEX "LearningPath_domainId_idx" ON "LearningPath"("domainId");
CREATE INDEX "LearningPath_ownerId_idx" ON "LearningPath"("ownerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
