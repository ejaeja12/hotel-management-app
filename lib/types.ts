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
  prefix: PrefixEnum
  name: string
  phone: string
  identficationType: EnumIdentificationType
  createdAt?: string
  updatedAt?: string
}

export type StayType = {
  id: string
  reservationId?: string
  room: TypeRoom
  checkIn: string | Date
  cehckOut?: string | Date
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
  createdAt?: string
  updatedAt?: string
}

export type ExtraChargeType = {
  id: string
  createdAt?: string
  updatedAt?: string
}
