/*
  Warnings:

  - You are about to drop the column `univeristy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "univeristy",
ADD COLUMN     "university" TEXT;
