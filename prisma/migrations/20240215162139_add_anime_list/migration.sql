/*
  Warnings:

  - You are about to drop the column `animeListId` on the `Anime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_animeListId_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "animeListId";

-- CreateTable
CREATE TABLE "_AnimeToAnimeList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToAnimeList_AB_unique" ON "_AnimeToAnimeList"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToAnimeList_B_index" ON "_AnimeToAnimeList"("B");

-- AddForeignKey
ALTER TABLE "_AnimeToAnimeList" ADD CONSTRAINT "_AnimeToAnimeList_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAnimeList" ADD CONSTRAINT "_AnimeToAnimeList_B_fkey" FOREIGN KEY ("B") REFERENCES "AnimeList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
