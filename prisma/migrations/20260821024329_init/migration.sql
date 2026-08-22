-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('inhouse', 'available', 'reserve');

-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('active', 'nonactive');

-- CreateEnum
CREATE TYPE "Prefix" AS ENUM ('Mr', 'Mrs', 'Ms');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('passport', 'ktp');

-- CreateTable
CREATE TABLE "roomType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest" (
    "id" TEXT NOT NULL,
    "prefix" "Prefix" NOT NULL,
    "name" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "identificationType" "IdentificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extraCharge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "ActivationStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "extraCharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookingType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bookingType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "roomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
