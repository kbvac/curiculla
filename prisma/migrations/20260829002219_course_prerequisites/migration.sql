-- AlterTable
ALTER TABLE "Course" ADD COLUMN "catalogLevel" TEXT;
ALTER TABLE "Course" ADD COLUMN "term" TEXT;
ALTER TABLE "Course" ADD COLUMN "units" INTEGER;
ALTER TABLE "Course" ADD COLUMN "year" INTEGER;

-- CreateTable
CREATE TABLE "CoursePrerequisite" (
    "courseId" TEXT NOT NULL,
    "prerequisiteId" TEXT NOT NULL,

    PRIMARY KEY ("courseId", "prerequisiteId"),
    CONSTRAINT "CoursePrerequisite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoursePrerequisite_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "CoursePrerequisite_prerequisiteId_idx" ON "CoursePrerequisite"("prerequisiteId");
