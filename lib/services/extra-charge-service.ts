import { IdentificationType, Prefix, Prisma } from "@/generated/prisma/client"
import { ActivationStatus } from "@/generated/prisma/enums"
import { formatPageNumber, buildPaginationMeta } from "../utils"
import { GuestValidationType } from "../validations/guest-validation"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { generateId } from "../id-generator"
import { ExtraChargeValidationType } from "../validations/extra-charge-validation"

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

export async function getExtraChargeService(page = "") {
  const limit = 10

  const { skippedRow, pageNumber } = formatPageNumber(page, limit)

  // const filter: Prisma.GuestWhereInput = {
  //   ...(checkIdType(idType) !== undefined && {
  //     identificationType: checkIdType(idType),
  //   }),
  // }
  const [data, totalPage] = await Promise.all([
    db.extraCharge.findMany({
      // where: filter,
      skip: skippedRow,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.extraCharge.count(),
  ])

  return {
    data,
    meta: buildPaginationMeta(pageNumber, limit, totalPage),
  }
}

export async function createExtraChargeService(data: ExtraChargeValidationType) {
  try {
    await db.extraCharge.create({
      data: {
        id: generateId("GUEST"),
        name: data.name,
        status: data.status,
        price: data.price,
      },
    })
    revalidatePath("/master/extracharge")
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

export async function editExtraChargeService(id: string, data: ExtraChargeValidationType) {
  try {
    await db.extraCharge.update({
      where: {
        id: id,
      },
      data: {
        status: ActivationStatus.active,
        name: data.name,
        price: data.price,
      },
    })
    revalidatePath("/master/guest")
    return {
      success: true,
      action: "update",
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
