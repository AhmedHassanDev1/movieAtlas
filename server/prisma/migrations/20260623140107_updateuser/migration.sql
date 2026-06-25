-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "provider" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "Provider",
    "providerId" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
