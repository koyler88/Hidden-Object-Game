/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "public"."Game"("name");
