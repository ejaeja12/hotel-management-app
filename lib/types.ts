export enum PrefixEnum {
  Mr = "Mr",
  Ms = "Ms",
  Mrs = "Mrs",
}

export enum IdentificationTypeEnum {
  passport = "passport",
  ktp = "ktp",
}
export type ReservationType = {
  id: string
  guestId: string
  createdAt?: string
  updatedAt?: string
}

export type GuestType = {
  id: string
  prefix: string | PrefixEnum
  name: string
  phone: string
  identificationNumber: string
  identificationType: IdentificationTypeEnum | string
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
