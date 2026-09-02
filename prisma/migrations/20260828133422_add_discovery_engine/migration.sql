-- CreateTable
CREATE TABLE "UniversityPlatform" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "departmentUrl" TEXT,
    "catalogUrl" TEXT,
    "lastCrawledAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UniversityPlatform_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CrawlJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platformId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "pagesCrawled" INTEGER NOT NULL DEFAULT 0,
    "coursesFound" INTEGER NOT NULL DEFAULT 0,
    "resourcesFound" INTEGER NOT NULL DEFAULT 0,
    "errors" TEXT,
    "config" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CrawlJob_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "UniversityPlatform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiscoveredCourse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platformId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructor" TEXT,
    "term" TEXT,
    "year" INTEGER,
    "url" TEXT NOT NULL,
    "department" TEXT,
    "level" TEXT,
    "metadata" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DISCOVERED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DiscoveredCourse_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "UniversityPlatform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiscoveredResource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "crawlJobId" TEXT NOT NULL,
    "courseId" TEXT,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "weekNumber" INTEGER,
    "lectureNumber" INTEGER,
    "durationMinutes" INTEGER,
    "metadata" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DISCOVERED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DiscoveredResource_crawlJobId_fkey" FOREIGN KEY ("crawlJobId") REFERENCES "CrawlJob" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DiscoveredResource_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "DiscoveredCourse" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversityPlatform_slug_key" ON "UniversityPlatform"("slug");

-- CreateIndex
CREATE INDEX "UniversityPlatform_universityId_idx" ON "UniversityPlatform"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityPlatform_universityId_slug_key" ON "UniversityPlatform"("universityId", "slug");

-- CreateIndex
CREATE INDEX "CrawlJob_platformId_idx" ON "CrawlJob"("platformId");

-- CreateIndex
CREATE INDEX "CrawlJob_status_idx" ON "CrawlJob"("status");

-- CreateIndex
CREATE INDEX "DiscoveredCourse_platformId_idx" ON "DiscoveredCourse"("platformId");

-- CreateIndex
CREATE INDEX "DiscoveredCourse_status_idx" ON "DiscoveredCourse"("status");

-- CreateIndex
CREATE UNIQUE INDEX "DiscoveredCourse_platformId_code_term_key" ON "DiscoveredCourse"("platformId", "code", "term");

-- CreateIndex
CREATE INDEX "DiscoveredResource_crawlJobId_idx" ON "DiscoveredResource"("crawlJobId");

-- CreateIndex
CREATE INDEX "DiscoveredResource_courseId_idx" ON "DiscoveredResource"("courseId");

-- CreateIndex
CREATE INDEX "DiscoveredResource_status_idx" ON "DiscoveredResource"("status");
