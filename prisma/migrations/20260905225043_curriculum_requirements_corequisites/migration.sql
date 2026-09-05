-- CreateTable
CREATE TABLE "CurriculumRequirement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "curriculumId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "minimumUnits" INTEGER,
    "minimumCount" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "sourceText" TEXT,
    CONSTRAINT "CurriculumRequirement_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurriculumRequirementOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requirementId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "groupKey" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CurriculumRequirementOption_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "CurriculumRequirement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CurriculumRequirementOption_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseCorequisite" (
    "courseId" TEXT NOT NULL,
    "corequisiteId" TEXT NOT NULL,

    PRIMARY KEY ("courseId", "corequisiteId"),
    CONSTRAINT "CourseCorequisite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CourseCorequisite_corequisiteId_fkey" FOREIGN KEY ("corequisiteId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "CurriculumRequirement_curriculumId_idx" ON "CurriculumRequirement"("curriculumId");

-- CreateIndex
CREATE INDEX "CurriculumRequirementOption_courseId_idx" ON "CurriculumRequirementOption"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumRequirementOption_requirementId_courseId_key" ON "CurriculumRequirementOption"("requirementId", "courseId");

-- CreateIndex
CREATE INDEX "CourseCorequisite_corequisiteId_idx" ON "CourseCorequisite"("corequisiteId");
