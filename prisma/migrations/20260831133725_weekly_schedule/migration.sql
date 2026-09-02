-- AlterTable
ALTER TABLE "Resource" ADD COLUMN "dateLabel" TEXT;
ALTER TABLE "Resource" ADD COLUMN "lectureNumber" INTEGER;
ALTER TABLE "Resource" ADD COLUMN "sessionKind" TEXT;
ALTER TABLE "Resource" ADD COLUMN "term" TEXT;
ALTER TABLE "Resource" ADD COLUMN "weekNumber" INTEGER;

-- CreateTable
CREATE TABLE "ScheduleEnrollment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ScheduleEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ScheduleEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ScheduleEnrollment_userId_idx" ON "ScheduleEnrollment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleEnrollment_userId_courseId_key" ON "ScheduleEnrollment"("userId", "courseId");

-- CreateIndex
CREATE INDEX "Resource_courseId_weekNumber_idx" ON "Resource"("courseId", "weekNumber");
