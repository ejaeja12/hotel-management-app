import z from "zod"
import { RoomStatus } from "@/generated/prisma/enums"

export const roomValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  typeId: z.string().min(2, { message: "Please Choose The Type Of Room" }),
  // status: z.enum(RoomStatus, { error: "Chose status" }),
})

export type RoomValidationType = z.infer<typeof roomValidation>

export type TypeOfRoom = RoomValidationType & {
  id: string
  roomType?: string
  color?: string
  status?: string
  occupancyStatus?: string
}
