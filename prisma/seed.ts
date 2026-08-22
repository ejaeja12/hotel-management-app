import "dotenv/config"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"
import { extraChargeData } from "./seeder/extraChargeSeeder"
import { bookingTypeData } from "./seeder/bookingTypeSeeder"
const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
import { roomTypeData, roomData } from "./seeder/roomSeeder"
import { guestData } from "./seeder/guestSeeder"
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
async function main() {
  // Room Type
  await prisma.roomType.createMany({
    data: [...roomTypeData],
  })

  // Booking Type
  await prisma.bookingType.createMany({
    data: [...bookingTypeData],
  })

  await prisma.room.createMany({
    data: [...roomData],
  })

  await prisma.guest.createMany({
    data: [...guestData],
  })

  await prisma.extraCharge.createMany({
    data: [...extraChargeData],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })
