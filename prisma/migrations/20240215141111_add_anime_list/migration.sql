-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('Watching', 'Completed', 'OnHold', 'Dropped', 'PlanToWatch');

-- CreateEnum
CREATE TYPE "AnimeKindEnum" AS ENUM ('tv', 'movie', 'ova', 'ona', 'special', 'tv_special', 'music', 'pv', 'cm');

-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "animeListId" TEXT;

-- CreateTable
CREATE TABLE "AnimeList" (
    "id" TEXT NOT NULL,
    "status" "AnimeStatus" NOT NULL,

    CONSTRAINT "AnimeList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeListToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeListToUser_AB_unique" ON "_AnimeListToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeListToUser_B_index" ON "_AnimeListToUser"("B");

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_animeListId_fkey" FOREIGN KEY ("animeListId") REFERENCES "AnimeList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeListToUser" ADD CONSTRAINT "_AnimeListToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "AnimeList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeListToUser" ADD CONSTRAINT "_AnimeListToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
