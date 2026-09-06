/*
  Warnings:

  - Added the required column `color` to the `roomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roomType" ADD COLUMN     "color" TEXT NOT NULL;
