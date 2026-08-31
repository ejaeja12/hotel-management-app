enum PrefixEnum {
  Mr,
  Ms,
  Mrs,
}

enum EnumIdentificationType {
  passport,
  ktp,
}

export type ReservationType = {
  id: string
  guestId: string
  createdAt?: string
  updatedAt?: string
}

export type GuestType = {
  id: string
  prefix: PrefixEnum | string
  name: string
  phone: string
  identificationNumber: string
  identificationType: EnumIdentificationType | string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type StayType = {
  id: string
  reservationId?: string
  room: TypeRoom
  checkIn: string | Date
  checkOut: string | Date
  createdAt?: string
  updatedAt?: string
}

export type TypeRoomType = {
  id: string
  createdAt?: string
  updatedAt?: string
}
export type TypeRoom = {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export type ExtraChargeType = {
  id: string
  createdAt?: string
  updatedAt?: string
}

export type PaginationType = {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}
