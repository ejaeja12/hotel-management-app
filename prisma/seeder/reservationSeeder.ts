import { guestData } from "./guestSeeder"
import { roomData } from "./roomSeeder"
import { InvoiceStatus } from "@/generated/prisma/enums"
import { InvoiceItemType } from "@/generated/prisma/enums"

const id = ["AAA1", "BBB2", "CCC3"]
const setId = (prefix: string, id: string) => {
  return `${prefix}-${id}`
}

const dummyData = [
  {
    reservation: { id: setId("RSV", id[0]), guestId: guestData[0].id },
    stay: {
      id: setId("STY", id[0]),
      roomId: roomData[0].id,
      checkIn: new Date("2026-08-05"),
      checkOut: new Date("2026-08-08"),
    },
    invoice: {
      id: setId("INV", id[0]),
      status: InvoiceStatus.open,
      total: 0,
    },
    invoiceItem: {
      id: setId("INVIT", id[0]),
      type: InvoiceItemType.room,
      price: roomData[0].price,
      itemCount: 1,
    },
  },
  {
    reservation: { id: setId("RSV", id[1]), guestId: guestData[0].id },
    stay: {
      id: setId("STY", id[1]),
      roomId: roomData[1].id,
      checkIn: new Date("2026-08-05"),
      checkOut: new Date("2026-08-08"),
    },
    invoice: {
      id: setId("INV", id[1]),
      status: InvoiceStatus.open,
      total: 0,
    },
    invoiceItem: {
      id: setId("INVIT", id[1]),
      type: InvoiceItemType.room,
      price: roomData[1].price,
      itemCount: 1,
    },
  },
]

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
