/*
  Warnings:

  - The values [inhouse,available,reserve] on the enum `RoomStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `price` on the `room` table. All the data in the column will be lost.
  - Added the required column `price` to the `roomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoomStatus_new" AS ENUM ('ready', 'maintenance', 'dirty', 'cleaning');
ALTER TABLE "public"."room" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "room" ALTER COLUMN "status" TYPE "RoomStatus_new" USING ("status"::text::"RoomStatus_new");
ALTER TYPE "RoomStatus" RENAME TO "RoomStatus_old";
ALTER TYPE "RoomStatus_new" RENAME TO "RoomStatus";
DROP TYPE "public"."RoomStatus_old";
ALTER TABLE "room" ALTER COLUMN "status" SET DEFAULT 'ready';
COMMIT;

-- AlterTable
ALTER TABLE "room" DROP COLUMN "price",
ALTER COLUMN "status" SET DEFAULT 'ready';

-- AlterTable
ALTER TABLE "roomType" ADD COLUMN     "price" INTEGER NOT NULL;
