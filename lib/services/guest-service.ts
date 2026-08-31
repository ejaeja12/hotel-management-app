import { IdentificationType, Prisma } from "@/generated/prisma/client"
import { formatPageNumber, buildPaginationMeta } from "../utils"
import { db } from "@/lib/db"

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

export async function getGuestData(idType: string = "", page = "") {
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
    }),
    db.guest.count({ where: filter }),
  ])

  return {
    data,
    meta: buildPaginationMeta(pageNumber, limit, totalPage),
  }
}
