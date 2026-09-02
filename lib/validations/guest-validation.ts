import z from "zod"
import { Prefix, IdentificationType } from "@/generated/prisma/enums"

export const guestValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  prefix: z.enum(Prefix, { error: "Chose prefix" }),
  phone: z.string().min(2, { message: "Phone must be at least 2 characters" }),
  identificationType: z.enum(IdentificationType, { error: "Chose id type" }),
  identificationNumber: z
    .string()
    .min(2, { message: "ID must be at least 2 characters" }),
})

export type GuestValidationType = z.infer<typeof guestValidation>

export type GuestFormType = Omit<
  GuestValidationType,
  "prefix" | "identificationType"
> & {
  id: string
  prefix: string | Prefix
  identificationType: string | IdentificationType
}
