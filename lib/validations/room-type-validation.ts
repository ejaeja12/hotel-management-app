import z from "zod"
import { Prefix, IdentificationType } from "@/generated/prisma/enums"

export const roomTypeValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  prefix: z.enum(Prefix, { error: "Chose prefix" }),
  phone: z
    .string()
    .min(2, { message: "Phone must be at least 2 characters" })
    .transform((t) => t.replace(/\s/g, "")),
  identificationType: z.enum(IdentificationType, { error: "Chose id type" }),
  identificationNumber: z
    .string()
    .min(2, { message: "ID must be at least 2 characters" })
    .transform((t) => t.replace(/\s/g, "")),
})

export type RoomTypeValidationType = z.infer<typeof roomTypeValidation>

export type TypeOfRoomType = Omit<RoomTypeValidationType, "prefix" | "identificationType"> & {
  id: string
  prefix: string | Prefix
  identificationType: string | IdentificationType
}
