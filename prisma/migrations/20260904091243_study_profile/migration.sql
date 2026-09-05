-- CreateTable
CREATE TABLE "StudyProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "days" TEXT NOT NULL DEFAULT '[1,2,3,4,5]',
    "minutesPerDay" INTEGER NOT NULL DEFAULT 60,
    "startTime" TEXT NOT NULL DEFAULT '09:00',
    "sessionMinutes" INTEGER NOT NULL DEFAULT 50,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyProfile_userId_key" ON "StudyProfile"("userId");
