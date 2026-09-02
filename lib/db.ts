import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const connectionString = `${process.env.DATABASE_URL}`
const appEnv = `${process.env.APP_ENV}`
const adapter = appEnv === "production" ? new PrismaNeon({ connectionString }) : new PrismaPg({ connectionString })
console.log(appEnv, adapter)
const db = new PrismaClient({ adapter })

export { db }
