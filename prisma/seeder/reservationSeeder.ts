import { guestData } from "./guestSeeder"
import { roomData } from "./roomSeeder"
import { InvoiceStatus } from "@/generated/prisma/enums"
import { InvoiceItemType } from "@/generated/prisma/enums"
import { roomTypeData } from "./roomSeeder"
import { dateSeeder, seederSetCheckout, seederSetCheckin } from "@/lib/date-utils"
import { generateId } from "@/lib/id-generator"

const setId = (prefix: string, id: string) => {
  return `${prefix}-${id}`
}

// const id = [generateId(), generateId(), generateId()] // ["AAA1", "BBB2", "CCC3"]

// const dummyData = [
//   {
//     reservation: { id: setId("RSV", id[0]), guestId: guestData[0].id },
//     stay: {
//       id: setId("STY", id[0]),
//       roomId: roomData[0].id,
//       checkIn: dateSeeder(0),
//       checkOut: dateSeeder(1),
//     },
//     invoice: {
//       id: setId("INV", id[0]),
//       status: InvoiceStatus.open,
//       total: 0,
//     },
//     invoiceItem: {
//       id: setId("INVIT", id[0]),
//       type: InvoiceItemType.room,
//       price: roomTypeData[0].price,
//       itemCount: 1,
//     },
//   },
//   {
//     reservation: { id: setId("RSV", id[1]), guestId: guestData[0].id },
//     stay: {
//       id: setId("STY", id[1]),
//       roomId: roomData[1].id,
//       checkIn: dateSeeder(-1),
//       checkOut: dateSeeder(1),
//     },
//     invoice: {
//       id: setId("INV", id[1]),
//       status: InvoiceStatus.open,
//       total: 0,
//     },
//     invoiceItem: {
//       id: setId("INVIT", id[1]),
//       type: InvoiceItemType.room,
//       price: roomTypeData[1].price,
//       itemCount: 1,
//     },
//   },
//   {
//     reservation: { id: setId("RSV", id[2]), guestId: guestData[0].id },
//     stay: {
//       id: setId("STY", id[2]),
//       roomId: roomData[2].id,
//       checkIn: dateSeeder(-2),
//       checkOut: dateSeeder(0),
//     },
//     invoice: {
//       id: setId("INV", id[2]),
//       status: InvoiceStatus.open,
//       total: 0,
//     },
//     invoiceItem: {
//       id: setId("INVIT", id[2]),
//       type: InvoiceItemType.room,
//       price: roomTypeData[3].price,
//       itemCount: 1,
//     },
//   },
// ]

// =======================================================

function getPriceByRoomId(roomId: string): number {
  const room = roomData.find((r) => r.id === roomId)
  const roomType = roomTypeData.find((rt) => rt.id === room?.typeId)
  return roomType?.price ?? 0
}

function setCheckinAt() {
  const date = new Date()
  date.setUTCHours(9, 0, 0, 0)
  return date.toISOString()
}

const stayConfig: {
  roomId: string
  checkInOffset: number
  checkOutOffset: number
  checkInAt?: string
  checkOutAt?: string
}[] = [
  // DEL1 — 3 stay (solo -30, grup -15, grup 13)
  // DEL1 — 3 stay (solo -15, grup -10, grup 8)
  { roomId: "DEL1", checkInOffset: -15, checkOutOffset: -12 },
  { roomId: "DEL1", checkInOffset: -10, checkOutOffset: -6 },
  { roomId: "DEL1", checkInOffset: 8, checkOutOffset: 13 },

  // DEL2 — 3 stay (solo -13, grup -7, grup 11)
  { roomId: "DEL2", checkInOffset: -13, checkOutOffset: -10 },
  { roomId: "DEL2", checkInOffset: -7, checkOutOffset: -3 },
  { roomId: "DEL2", checkInOffset: 11, checkOutOffset: 15 },

  // FAM1 — 3 stay (khusus -1, grup 5, solo 14)
  { roomId: "FAM1", checkInOffset: -1, checkOutOffset: 3 },
  { roomId: "FAM1", checkInOffset: 5, checkOutOffset: 8 },
  { roomId: "FAM1", checkInOffset: 14, checkOutOffset: 15 },

  // STDR2 — 3 stay (grup -10, khusus 0, grup 11)
  { roomId: "STDR2", checkInOffset: -10, checkOutOffset: -6 },
  { roomId: "STDR2", checkInOffset: 0, checkOutOffset: 5, checkInAt: seederSetCheckin(0) },
  { roomId: "STDR2", checkInOffset: 11, checkOutOffset: 15 },

  // DEL3 — 2 stay (grup -10, grup 5)
  { roomId: "DEL3", checkInOffset: -10, checkOutOffset: -6 },
  { roomId: "DEL3", checkInOffset: 5, checkOutOffset: 10 },

  // SDEL1 — 2 stay (grup -7, grup 8)
  { roomId: "SDEL1", checkInOffset: -1, checkOutOffset: 0 },
  { roomId: "SDEL1", checkInOffset: 8, checkOutOffset: 13 },

  // SDEL2 — 2 stay (grup -7, khusus -1)
  { roomId: "SDEL2", checkInOffset: -7, checkOutOffset: -3 },
  { roomId: "SDEL2", checkInOffset: -1, checkOutOffset: 3 },

  // SDEL3 — 2 stay (khusus 0, grup 8)
  { roomId: "SDEL3", checkInOffset: 0, checkOutOffset: 4, checkInAt: seederSetCheckin(0) },
  { roomId: "SDEL3", checkInOffset: 8, checkOutOffset: 13 },

  // FAM2 — 2 stay (grup -10, khusus 1)
  { roomId: "FAM2", checkInOffset: -10, checkOutOffset: -6 },
  { roomId: "FAM2", checkInOffset: 1, checkOutOffset: 6 },

  // FAM3 — 2 stay (grup -7, khusus -1)
  { roomId: "FAM3", checkInOffset: -7, checkOutOffset: -4 },
  { roomId: "FAM3", checkInOffset: -1, checkOutOffset: 4 },

  // STDR1 — 2 stay (khusus 0, grup 5)
  { roomId: "STDR1", checkInOffset: 0, checkOutOffset: 4 },
  { roomId: "STDR1", checkInOffset: 5, checkOutOffset: 11 },

  // HNMS1 — 2 stay (khusus 1, grup 11)
  { roomId: "HNMS1", checkInOffset: 1, checkOutOffset: 5 },
  { roomId: "HNMS1", checkInOffset: 11, checkOutOffset: 15 },

  // HNMS2 — 2 stay (khusus 0, solo 13)
  { roomId: "HNMS2", checkInOffset: 0, checkOutOffset: 4, checkInAt: seederSetCheckin(0) },
  { roomId: "HNMS2", checkInOffset: 13, checkOutOffset: 15 },
]

const dummyData = stayConfig.map((config, index) => {
  const uid = generateId()
  const guest = guestData[index % guestData.length]

  return {
    reservation: {
      id: setId("RSV", uid),
      guestId: guest.id,
    },
    stay: {
      id: setId("STY", uid),
      roomId: config.roomId,
      checkIn: dateSeeder(config.checkInOffset),
      checkOutAt: config.checkOutOffset < 0 ? seederSetCheckout(config.checkOutOffset) : null,
      checkOut: dateSeeder(config.checkOutOffset),
      checkInAt: config.checkInOffset < 0 ? seederSetCheckin(config.checkInOffset) : (config.checkInAt ?? null),
    },
    invoice: {
      id: setId("INV", uid),
      status: InvoiceStatus.open,
      total: 0,
    },
    invoiceItem: {
      id: setId("INVIT", uid),
      type: InvoiceItemType.room,
      price: getPriceByRoomId(config.roomId),
      itemCount: 1,
    },
  }
})

/**
 * =================================================
 *
 */

export const reservationData = dummyData.map((data) => ({
  id: data.reservation.id,
  guestId: data.reservation.guestId,
}))

export const stayData = dummyData.map((data) => ({
  id: data.stay.id,
  reservationId: data.reservation.id,
  roomId: data.stay.roomId,
  checkInAt: data.stay.checkInAt,
  checkOutAt: data.stay.checkOutAt ?? null,
  checkIn: data.stay.checkIn,
  checkOut: data.stay.checkOut,
}))

export const invoiceData = dummyData.map((data) => ({
  id: data.invoice.id,
  reservationId: data.reservation.id,
  status: data.invoice.status,
  total: data.invoice.total,
}))

export const invoiceItemData = dummyData.map((data) => ({
  id: data.invoiceItem.id,
  invoiceId: data.invoice.id,
  stayId: data.stay.id,
  type: data.invoiceItem.type,
  price: data.invoiceItem.price,
  itemCount: data.invoiceItem.itemCount,
}))
