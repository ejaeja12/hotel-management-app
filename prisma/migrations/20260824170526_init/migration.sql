-- DropForeignKey
ALTER TABLE "invoiceItem" DROP CONSTRAINT "invoiceItem_extraChargeId_fkey";

-- AlterTable
ALTER TABLE "invoiceItem" ADD COLUMN     "stayId" TEXT,
ALTER COLUMN "extraChargeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoiceItem" ADD CONSTRAINT "invoiceItem_extraChargeId_fkey" FOREIGN KEY ("extraChargeId") REFERENCES "extraCharge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoiceItem" ADD CONSTRAINT "invoiceItem_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
