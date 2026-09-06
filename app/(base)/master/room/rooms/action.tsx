"use server"

import { getRoomService, createRoomService, editRoomService } from "@/lib/services/room-service"

import { db } from "@/lib/db"

import { TypeOfRoom, roomValidation } from "@/lib/validations/room-validation"
import { getRoomTypeAsList } from "@/lib/services/room-type-service"

export type PrevState = {
  success: boolean
  action?: string
  error?: string
  message?: string
}

export async function getRoom(page: string = "") {
  const result = await getRoomService(page)
  return result
}

export async function getRoomType() {
  const result = await getRoomTypeAsList()
  return result
}

// export async function searchGuestByName(par: string) {
//   const result = await db.guest.findMany({
//     where: {
//       name: { contains: par, mode: "insensitive" },
//     },
//     select: {
//       name: true,
//     },
//   })
//   return result
// }

export async function showRoom(id: string) {
  const data = await db.room.findUnique({
    where: {
      id: id,
    },
  })

  return data
}

export async function createRoom(prev: PrevState, form: TypeOfRoom): Promise<PrevState> {
  const validated = roomValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await createRoomService(validated.data)
}

export async function editRoom(prev: PrevState, form: TypeOfRoom): Promise<PrevState> {
  const validated = roomValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await editRoomService(form.id, validated.data)
}
