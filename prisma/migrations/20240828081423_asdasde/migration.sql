/*
  Warnings:

  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `depth` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `threadId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnimeListToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnimeToAnimeList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentToReply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ReplyToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `animeId` to the `AnimeList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `AnimeList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeListToUser" DROP CONSTRAINT "_AnimeListToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeListToUser" DROP CONSTRAINT "_AnimeListToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToAnimeList" DROP CONSTRAINT "_AnimeToAnimeList_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToAnimeList" DROP CONSTRAINT "_AnimeToAnimeList_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToReply" DROP CONSTRAINT "_CommentToReply_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToReply" DROP CONSTRAINT "_CommentToReply_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToUser" DROP CONSTRAINT "_CommentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToUser" DROP CONSTRAINT "_CommentToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ReplyToUser" DROP CONSTRAINT "_ReplyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReplyToUser" DROP CONSTRAINT "_ReplyToUser_B_fkey";

-- AlterTable
ALTER TABLE "AnimeList" ADD COLUMN     "animeId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
DROP COLUMN "depth",
DROP COLUMN "threadId",
ADD COLUMN     "animeId" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Reply";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "_AnimeListToUser";

-- DropTable
DROP TABLE "_AnimeToAnimeList";

-- DropTable
DROP TABLE "_CommentToReply";

-- DropTable
DROP TABLE "_CommentToUser";

-- DropTable
DROP TABLE "_ReplyToUser";

-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","commentId")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeList" ADD CONSTRAINT "AnimeList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeList" ADD CONSTRAINT "AnimeList_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
