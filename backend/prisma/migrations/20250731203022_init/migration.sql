-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('OFFICE', 'HOTEL', 'FOOD');

-- CreateTable
CREATE TABLE "public"."Game" (
    "id" SERIAL NOT NULL,
    "category" "public"."Category" NOT NULL,
    "objectOneX" INTEGER NOT NULL,
    "objectOneY" INTEGER NOT NULL,
    "objectTwoX" INTEGER NOT NULL,
    "objectTwoY" INTEGER NOT NULL,
    "objectThreeX" INTEGER NOT NULL,
    "objectThreeY" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Score" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
