/*
  Warnings:

  - The values [Watching,Completed,OnHold,Dropped,PlanToWatch] on the enum `AnimeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnimeStatus_new" AS ENUM ('WATCHING', 'COMPLETED', 'DELAYED', 'DROPPED', 'PLANNED');
ALTER TABLE "AnimeList" ALTER COLUMN "status" TYPE "AnimeStatus_new" USING ("status"::text::"AnimeStatus_new");
ALTER TYPE "AnimeStatus" RENAME TO "AnimeStatus_old";
ALTER TYPE "AnimeStatus_new" RENAME TO "AnimeStatus";
DROP TYPE "AnimeStatus_old";
COMMIT;
