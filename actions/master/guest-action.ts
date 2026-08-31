"use server"

import { getGuestData } from "@/lib/services/guest-service"
import { db } from "@/lib/db"

export async function getGuest(idType: string = "", page: string = "") {
  const result = await getGuestData(idType, page)
  return result
}

export async function getGuestByName(par: string) {
  const result = await db.guest.findMany({
    where: {
      name: { contains: par, mode: "insensitive" },
    },
    select: {
      name: true,
    },
  })
  return result
}
