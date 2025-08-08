/*
  Warnings:

  - Added the required column `objectOneUrl` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectThreeUrl` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectTwoUrl` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "objectOneUrl" TEXT NOT NULL,
ADD COLUMN     "objectThreeUrl" TEXT NOT NULL,
ADD COLUMN     "objectTwoUrl" TEXT NOT NULL;
