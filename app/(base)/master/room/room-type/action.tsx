"use server"

import { getRoomTypeService, createRoomTypeService, editRoomTypeService } from "@/lib/services/room-type-service"

import { db } from "@/lib/db"

import { TypeOfRoomType, roomTypeValidation } from "@/lib/validations/room-type-validation"

export type PrevState = {
  success: boolean
  action?: string
  error?: string
  message?: string
}

export async function getroomType(page: string = "") {
  const result = await getRoomTypeService(page)
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

export async function showRoomType(id: string) {
  const data = await db.roomType.findUnique({
    where: {
      id: id,
    },
  })

  return data
}

export async function createRoomType(prev: PrevState, form: TypeOfRoomType): Promise<PrevState> {
  const validated = roomTypeValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await createRoomTypeService(validated.data)
}

export async function editRoomType(prev: PrevState, form: TypeOfRoomType): Promise<PrevState> {
  const validated = roomTypeValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await editRoomTypeService(form.id, validated.data)
}
