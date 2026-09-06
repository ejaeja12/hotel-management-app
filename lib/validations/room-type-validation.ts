import z from "zod"

export const roomTypeValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  price: z.number().min(100000),
  color: z.string().min(7, { message: "Color must be at least 7 characters. # Included" }),
})

export type RoomTypeValidationType = z.infer<typeof roomTypeValidation>

export type TypeOfRoomType = RoomTypeValidationType & {
  id: string
}
