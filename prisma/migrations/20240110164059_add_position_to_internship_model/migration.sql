/*
  Warnings:

  - Added the required column `position` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "position" TEXT NOT NULL,
ALTER COLUMN "hireRate" DROP NOT NULL;
