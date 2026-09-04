import z from "zod"
import { ActivationStatus } from "@/generated/prisma/enums"

export const extraChargeValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  price: z.number(),
  status: z.enum(ActivationStatus, { error: "Chose status" }),
})

export type ExtraChargeValidationType = z.infer<typeof extraChargeValidation>

export type ExtraChargeType = ExtraChargeValidationType & {
  id: string
}
