import { IdentificationType, Prefix, Prisma } from "@/generated/prisma/client"
import { formatPageNumber, buildPaginationMeta } from "../utils"
import { GuestValidationType } from "../validations/guest-validation"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { generateId } from "../id-generator"

// const buat pagination

const checkIdType = (idType: string) => {
  switch (idType) {
    case "ktp":
      return IdentificationType.ktp
    case "passport":
      return IdentificationType.passport
    default:
      return undefined
  }
}

export async function getGuestService(idType: string = "", page = "") {
  const limit = 10

  const { skippedRow, pageNumber } = formatPageNumber(page, limit)

  const filter: Prisma.GuestWhereInput = {
    ...(checkIdType(idType) !== undefined && {
      identificationType: checkIdType(idType),
    }),
  }
  const [data, totalPage] = await Promise.all([
    db.guest.findMany({
      where: filter,
      skip: skippedRow,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.guest.count({ where: filter }),
  ])

  return {
    data,
    meta: buildPaginationMeta(pageNumber, limit, totalPage),
  }
}

export async function createGuestService(data: GuestValidationType) {
  try {
    await db.guest.create({
      data: {
        id: generateId("GUEST"),
        prefix: data.prefix as Prefix,
        name: data.name,
        phone: data.phone,
        identificationNumber: data.identificationNumber,
        identificationType: data.identificationType as IdentificationType,
      },
    })
    revalidatePath("/master/guest")
    return {
      success: true,
      action: "create",
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: "Unique kk",
    }
  }
}

export async function editGuestService(id: string, data: GuestValidationType) {
  try {
    await db.guest.update({
      where: {
        id: id,
      },
      data: {
        prefix: data.prefix as Prefix,
        name: data.name,
        phone: data.phone,
        identificationNumber: data.identificationNumber,
        identificationType: data.identificationType as IdentificationType,
      },
    })
    revalidatePath("/master/guest")
    return {
      success: true,
      action: "update",
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: "Unique kk",
    }
  }
}
