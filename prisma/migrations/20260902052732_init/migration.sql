/*
  Warnings:

  - A unique constraint covering the columns `[identificationNumber]` on the table `guest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "guest_identificationNumber_key" ON "guest"("identificationNumber");
