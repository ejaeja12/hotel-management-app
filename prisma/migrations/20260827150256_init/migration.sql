/*
  Warnings:

  - You are about to drop the column `cehckOutAt` on the `stay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stay" DROP COLUMN "cehckOutAt",
ADD COLUMN     "checkOutAt" TIMESTAMP(3);
