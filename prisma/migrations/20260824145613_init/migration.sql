/*
  Warnings:

  - You are about to drop the `InvoiceItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_extraChargeId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_invoiceId_fkey";

-- DropIndex
DROP INDEX "stay_roomId_key";

-- DropTable
DROP TABLE "InvoiceItem";

-- CreateTable
CREATE TABLE "invoiceItem" (
    "id" TEXT NOT NULL,
    "type" "InvoiceItemType" NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "itemCount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "extraChargeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoiceItem" ADD CONSTRAINT "invoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoiceItem" ADD CONSTRAINT "invoiceItem_extraChargeId_fkey" FOREIGN KEY ("extraChargeId") REFERENCES "extraCharge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
