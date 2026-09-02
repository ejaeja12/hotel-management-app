import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const appEnv = `${process.env.APP_ENV}`
const connectionString = appEnv === "production" ? `${process.env.DATABASE_URL}` : `${process.env.LOCAL_DATABASE_URL}`
const adapter = appEnv === "production" ? new PrismaNeon({ connectionString }) : new PrismaPg({ connectionString })
console.log(appEnv, adapter)
const db = new PrismaClient({ adapter })

export { db }
