/*
  Warnings:

  - Added the required column `country` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employees` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headquarters` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "employees" INTEGER NOT NULL,
ADD COLUMN     "headquarters" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "payRangeEnd" INTEGER,
ADD COLUMN     "payRangeStart" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company_id" TEXT;
