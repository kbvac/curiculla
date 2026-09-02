/*
  Warnings:

  - You are about to drop the `CrawlJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscoveredCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscoveredResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UniversityPlatform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CrawlJob";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DiscoveredCourse";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DiscoveredResource";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UniversityPlatform";
PRAGMA foreign_keys=on;
