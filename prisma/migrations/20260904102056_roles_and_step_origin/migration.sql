-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LearningPathStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pathId" TEXT NOT NULL,
    "skillId" TEXT,
    "courseId" TEXT,
    "customTitle" TEXT,
    "customUrl" TEXT,
    "origin" TEXT NOT NULL DEFAULT 'IMPORT',
    "phase" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "LearningPathStep_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "LearningPath" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningPathStep_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LearningPathStep_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_LearningPathStep" ("courseId", "customTitle", "customUrl", "id", "isRequired", "order", "pathId", "phase", "skillId") SELECT "courseId", "customTitle", "customUrl", "id", "isRequired", "order", "pathId", "phase", "skillId" FROM "LearningPathStep";
DROP TABLE "LearningPathStep";
ALTER TABLE "new_LearningPathStep" RENAME TO "LearningPathStep";
CREATE INDEX "LearningPathStep_skillId_idx" ON "LearningPathStep"("skillId");
CREATE INDEX "LearningPathStep_courseId_idx" ON "LearningPathStep"("courseId");
CREATE UNIQUE INDEX "LearningPathStep_pathId_skillId_key" ON "LearningPathStep"("pathId", "skillId");
CREATE UNIQUE INDEX "LearningPathStep_pathId_courseId_key" ON "LearningPathStep"("pathId", "courseId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "googleId" TEXT,
    "universityId" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "googleId", "id", "name", "passwordHash", "universityId", "updatedAt") SELECT "createdAt", "email", "googleId", "id", "name", "passwordHash", "universityId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
