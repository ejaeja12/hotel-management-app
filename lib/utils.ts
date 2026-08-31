import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 *
 * @param par inputan page yang diterima dari param query
 * @param limit limit yang di set untuk menampilkan jumlah data
 * @returns
 */
export function formatPageNumber(par: string, limit: number = 10) {
  const parseNumber = Number(par)
  const pageNumber =
    Number.isNaN(parseNumber) ||
    parseNumber < 1 ||
    !Number.isInteger(parseNumber)
      ? 1
      : parseNumber
  const skippedRow = (pageNumber - 1) * limit

  return { skippedRow, pageNumber }
}

export function buildPaginationMeta(
  currentPage: number,
  limit: number,
  totalCount: number
) {
  const totalPages = Math.ceil(totalCount / limit)
  return {
    currentPage,
    totalPages,
    totalCount,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
  }
}
