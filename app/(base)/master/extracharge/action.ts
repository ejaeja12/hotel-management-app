"use server"

import {
  getExtraChargeService,
  createExtraChargeService,
  editExtraChargeService,
} from "@/lib/services/extra-charge-service"

import { db } from "@/lib/db"

import { ExtraChargeType, extraChargeValidation } from "@/lib/validations/extra-charge-validation"

export type PrevState = {
  success: boolean
  action?: string
  error?: string
}

export async function getExtraCharge(page: string = "") {
  const result = await getExtraChargeService(page)
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

export async function showExtraCharge(id: string) {
  const data = await db.extraCharge.findUnique({
    where: {
      id: id,
    },
  })

  return data
}

export async function createExtraCharge(prev: PrevState, form: ExtraChargeType): Promise<PrevState> {
  const validated = extraChargeValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await createExtraChargeService(validated.data)
}

export async function editExtraCharge(prev: PrevState, form: ExtraChargeType): Promise<PrevState> {
  const validated = extraChargeValidation.safeParse(form)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  return await editExtraChargeService(form.id, validated.data)
}
