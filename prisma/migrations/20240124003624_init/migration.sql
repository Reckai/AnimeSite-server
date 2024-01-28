-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentId" TEXT,
    "threadId" TEXT,
    "viewerCanDelete" BOOLEAN NOT NULL,
    "viewerCanUpdate" BOOLEAN NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "viewerCanDelete" BOOLEAN NOT NULL,
    "viewerCanUpdate" BOOLEAN NOT NULL,
    "threadId" TEXT,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "licenseNameRu" TEXT,
    "description" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "russian" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poster" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommentToReply" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReplyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToStudio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToPoster" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_slug_key" ON "Anime"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToReply_AB_unique" ON "_CommentToReply"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToReply_B_index" ON "_CommentToReply"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToUser_AB_unique" ON "_CommentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToUser_B_index" ON "_CommentToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReplyToUser_AB_unique" ON "_ReplyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReplyToUser_B_index" ON "_ReplyToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToGenre_AB_unique" ON "_AnimeToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToGenre_B_index" ON "_AnimeToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToStudio_AB_unique" ON "_AnimeToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToStudio_B_index" ON "_AnimeToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToPoster_AB_unique" ON "_AnimeToPoster"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToPoster_B_index" ON "_AnimeToPoster"("B");

-- AddForeignKey
ALTER TABLE "_CommentToReply" ADD CONSTRAINT "_CommentToReply_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToReply" ADD CONSTRAINT "_CommentToReply_B_fkey" FOREIGN KEY ("B") REFERENCES "Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToUser" ADD CONSTRAINT "_CommentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToUser" ADD CONSTRAINT "_CommentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReplyToUser" ADD CONSTRAINT "_ReplyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReplyToUser" ADD CONSTRAINT "_ReplyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToStudio" ADD CONSTRAINT "_AnimeToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToStudio" ADD CONSTRAINT "_AnimeToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToPoster" ADD CONSTRAINT "_AnimeToPoster_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToPoster" ADD CONSTRAINT "_AnimeToPoster_B_fkey" FOREIGN KEY ("B") REFERENCES "Poster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
