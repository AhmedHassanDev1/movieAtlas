/*
  Warnings:

  - The primary key for the `Avatar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_pkey",
ADD CONSTRAINT "Avatar_pkey" PRIMARY KEY ("user_id", "public_id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider",
DROP COLUMN "providerId";
