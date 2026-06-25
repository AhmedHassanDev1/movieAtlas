/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.
  - Made the column `public_id` on table `Avatar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Avatar" ALTER COLUMN "public_id" SET NOT NULL,
ADD CONSTRAINT "Avatar_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_public_id_key" ON "Avatar"("public_id");
