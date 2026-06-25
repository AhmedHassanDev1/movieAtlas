-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allow_interest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allow_rating" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allow_reviews" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allow_watched" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allow_watchlist" BOOLEAN NOT NULL DEFAULT true;
