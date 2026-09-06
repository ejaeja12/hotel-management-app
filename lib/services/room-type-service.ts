import { ActivationStatus } from "@/generated/prisma/enums"
import { formatPageNumber, buildPaginationMeta } from "../utils"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { generateId } from "../id-generator"
import { RoomTypeValidationType } from "../validations/room-type-validation"
import { Prisma } from "@/generated/prisma/client"

// const buat pagination

// const checkIdType = (idType: string) => {
//   switch (idType) {
//     case "ktp":
//       return IdentificationType.ktp
//     case "passport":
//       return IdentificationType.passport
//     default:
//       return undefined
//   }
// }

export async function getRoomTypeService(page = "") {
  const limit = 10

  const { skippedRow, pageNumber } = formatPageNumber(page, limit)

  // const filter: Prisma.GuestWhereInput = {
  //   ...(checkIdType(idType) !== undefined && {
  //     identificationType: checkIdType(idType),
  //   }),
  // }
  const [data, totalPage] = await Promise.all([
    db.roomType.findMany({
      // where: filter,
      skip: skippedRow,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.roomType.count(),
  ])

  return {
    data,
    meta: buildPaginationMeta(pageNumber, limit, totalPage),
  }
}

export async function createRoomTypeService(data: RoomTypeValidationType) {
  try {
    await db.roomType.create({
      data: {
        id: generateId("GUEST"),
        name: data.name,
        price: data.price,
        color: data.color,
      },
    })
    revalidatePath("/master/roomtype")
    return {
      success: true,
      action: "create",
      message: "Room Type Created",
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: "Unique kk",
    }
  }
}

export async function editRoomTypeService(id: string, data: RoomTypeValidationType) {
  try {
    await db.roomType.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        price: data.price,
        color: data.color,
      },
    })
    revalidatePath("/master/roomtype")
    return {
      success: true,
      action: "update",
      message: "Room Type Updated",
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2002":
          return {
            success: false,
            error: "Another guest has this ID number, please change it",
          }
      }
    }
    console.log(e)
    return {
      success: false,
      error: "There is something wrong",
    }
  }
}

export async function getRoomTypeAsList() {
  const data = await db.roomType.findMany({
    orderBy: { createdAt: "desc" },
  })

  return {
    data,
  }
}
