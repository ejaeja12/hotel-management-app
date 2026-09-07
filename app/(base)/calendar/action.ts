import { db } from "@/lib/db"

export async function getReservationCalendarData() {
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

  const reservationList = await db.stay.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      checkIn: true,
      checkOut: true,
      checkInAt: true,
      checkOutAt: true,
      reservation: {
        select: { id: true, guest: { select: { name: true, prefix: true } } },
      },
      room: {
        select: { id: true },
      },
    },
  })

  const roomTypeList = await db.roomType.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      room: {
        select: { id: true, name: true },
      },
    },
  })

  const reservationData = reservationList.map((item) => ({
    id: item.reservation.id,
    guest: `${item.reservation.guest.prefix ? item.reservation.guest.prefix + " " : ""}${item.reservation.guest.name}`,
    status: setRoomStatus(item.checkIn, item.checkOut, item.checkInAt ?? undefined, item.checkOutAt ?? undefined),
    start: new Date(item.checkIn).toISOString(),
    end: new Date(item.checkOut).toISOString(),
    room: {
      id: item.room.id,
    },
  }))

  const roomTypeData = roomTypeList.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
    room: item.room.map((room) => ({
      id: room.id,
      name: room.name,
    })),
  }))

  return {
    reservationData,
    roomTypeData,
  }
}
