-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('open', 'closed');

-- CreateEnum
CREATE TYPE "InvoiceItemType" AS ENUM ('room', 'extracharge');

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stay" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "checkInAt" TIMESTAMP(3),
    "cehckOutAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "type" "InvoiceItemType" NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "itemCount" INTEGER NOT NULL,
    "extraChargeId" TEXT,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stay_roomId_key" ON "stay"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_reservationId_key" ON "invoice"("reservationId");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stay" ADD CONSTRAINT "stay_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stay" ADD CONSTRAINT "stay_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_extraChargeId_fkey" FOREIGN KEY ("extraChargeId") REFERENCES "extraCharge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
