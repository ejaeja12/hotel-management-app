import { ActivationStatus } from "@/generated/prisma/enums"
import { formatPageNumber, buildPaginationMeta } from "../utils"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { generateId } from "../id-generator"
import { RoomValidationType } from "../validations/room-validation"
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

export async function getRoomService(page = "") {
  const limit = 10

  const { skippedRow, pageNumber } = formatPageNumber(page, limit)

  // const filter: Prisma.GuestWhereInput = {
  //   ...(checkIdType(idType) !== undefined && {
  //     identificationType: checkIdType(idType),
  //   }),
  // }
  const [room, totalPage] = await Promise.all([
    db.room.findMany({
      // where: filter,
      skip: skippedRow,
      take: limit,
      orderBy: {
        roomType: {
          name: "asc",
        },
      },
      include: {
        roomType: {
          select: {
            name: true,
            color: true,
          },
        },
        stay: true,
      },
    }),
    db.room.count(),
  ])

  function setRoomStatus(checkin: Date, checkout: Date, checkinAt?: Date, checkoutAt?: Date) {
    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)

    const now = new Date()

    const limitCheckIn = new Date(checkinDate.getTime() + 12 * 60 * 60 * 1000)
    const limitCheckOut = new Date(checkoutDate.getTime() + 12 * 60 * 60 * 1000)

    // tesCheckin.setUTCHours(5, 0, 0, 0)

    // cek apakah tanggal sekarang ada dalam range
    const isInDateRange = checkinDate <= now && now <= checkoutDate
    // cek apa waktu sekarang sudah melewati batas checkin
    const isLateCheckin = now > limitCheckIn
    // cek apakah checkinAt ada, dan
    const isSetCheckinAt = checkinAt ? new Date(checkinAt) : null
    // cek apakah tanggal sudah masuk masa checkout
    const isInCheckoutTime = now > checkoutDate
    // cek apa waktu sekarang sudah melewati batas checkout
    const isLateCheckout = now > limitCheckOut
    // check apakah checkoutAt sudah ada
    const isSetCheckoutAt = checkoutAt ? new Date(checkoutAt) : null

    if (isInDateRange) {
      if (!isSetCheckinAt) {
        if (isLateCheckin) return "late-checkin"
        return "checkin"
      } else {
        return "inhouse"
      }
    }

    if (isInCheckoutTime) {
      if (!isSetCheckoutAt) {
        if (isLateCheckout) return "late-checkout"
        return "checkout"
      } else {
        return "already_checkout"
      }
    }

    return "available"
  }

  const data = room.map((item) => ({
    ...item,
    roomType: item.roomType.name,
    color: item.roomType.color,
    occupancyStatus: item.stay.length > 0 ? setRoomStatus(item.stay[0].checkIn, item.stay[0].checkOut) : "available",
  }))

  return {
    data,
    meta: buildPaginationMeta(pageNumber, limit, totalPage),
  }
}

export async function createRoomService(data: RoomValidationType) {
  try {
    await db.room.create({
      data: {
        id: generateId("GUEST"),
        name: data.name,
        typeId: data.typeId,
      },
    })
    revalidatePath("/master/room")
    return {
      success: true,
      action: "create",
      message: "Room Created",
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: "Unique kk",
    }
  }
}

export async function editRoomService(id: string, data: RoomValidationType) {
  try {
    await db.room.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
      },
    })
    revalidatePath("/master/room")
    return {
      success: true,
      action: "update",
      message: "Room Updated",
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
