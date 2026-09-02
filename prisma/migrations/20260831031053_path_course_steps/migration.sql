-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LearningPathStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pathId" TEXT NOT NULL,
    "skillId" TEXT,
    "courseId" TEXT,
    "phase" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "LearningPathStep_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "LearningPath" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningPathStep_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LearningPathStep_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_LearningPathStep" ("id", "isRequired", "order", "pathId", "phase", "skillId") SELECT "id", "isRequired", "order", "pathId", "phase", "skillId" FROM "LearningPathStep";
DROP TABLE "LearningPathStep";
ALTER TABLE "new_LearningPathStep" RENAME TO "LearningPathStep";
CREATE INDEX "LearningPathStep_skillId_idx" ON "LearningPathStep"("skillId");
CREATE INDEX "LearningPathStep_courseId_idx" ON "LearningPathStep"("courseId");
CREATE UNIQUE INDEX "LearningPathStep_pathId_skillId_key" ON "LearningPathStep"("pathId", "skillId");
CREATE UNIQUE INDEX "LearningPathStep_pathId_courseId_key" ON "LearningPathStep"("pathId", "courseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
