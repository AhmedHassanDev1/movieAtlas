-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "about" TEXT;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserInterest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Watched" (
    "user_id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Watched_pkey" PRIMARY KEY ("user_id","title_id")
);

-- CreateIndex
CREATE INDEX "Title_title_idx" ON "Title"("title");

-- AddForeignKey
ALTER TABLE "Watched" ADD CONSTRAINT "Watched_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watched" ADD CONSTRAINT "Watched_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
