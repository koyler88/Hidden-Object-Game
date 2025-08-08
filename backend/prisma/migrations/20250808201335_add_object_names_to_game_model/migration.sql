/*
  Warnings:

  - Added the required column `objectOneName` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectThreeName` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectTwoName` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "objectOneName" TEXT NOT NULL,
ADD COLUMN     "objectThreeName" TEXT NOT NULL,
ADD COLUMN     "objectTwoName" TEXT NOT NULL;
