"use server"

import { getGuestService, createGuestService, editGuestService } from "@/lib/services/guest-service"
import { guestValidation } from "@/lib/validations/guest-validation"
import { db } from "@/lib/db"
import { type GuestFormType } from "@/lib/validations/guest-validation"

export type PrevState = {
  success: boolean
  action?: string
  error?: string
}

export async function getGuest(idType: string = "", page: string = "") {
  const result = await getGuestService(idType, page)
  return result
}

export async function searchGuestByName(par: string) {
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

export async function showGuest(id: string) {
  const data = await db.guest.findUnique({
    where: {
      id: id,
    },
  })

  return data
}

export async function createGuest(prev: PrevState, form: GuestFormType): Promise<PrevState> {
  const validated = guestValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await createGuestService(validated.data)
}

export async function editGuest(prev: PrevState, form: GuestFormType): Promise<PrevState> {
  const validated = guestValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await editGuestService(form.id, validated.data)
}
