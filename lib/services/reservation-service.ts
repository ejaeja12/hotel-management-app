import { db } from "../db"

export async function getReservationByDate(startDate: string, endDate: string) {
  const reservationData = db.stay.findMany({
    where: {
      OR: [
        {
          checkIn: {
            gte: startDate,
            lte: endDate,
          },
        },
        {
          checkOut: {
            lte: endDate,
            gte: startDate,
          },
        },
      ],
    },
    include: {
      reservation: {
        include: {
          guest: {
            select: {
              name: true,
              prefix: true,
            },
          },
        },
      },
      room: {
        select: {
          name: true,
        },
      },
    },
  })

  function setRoomStatus(checkin: Date, checkout: Date, checkinAt?: Date, checkoutAt?: Date) {
    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)
    const checkInAt = checkinAt ? new Date(checkinAt) : null
    const checkOutAt = checkoutAt ? new Date(checkoutAt) : null

    const now = new Date()

    if (now >= checkinDate && now <= checkoutDate) {
      if (!checkInAt) {
        return "checkin"
      }

      if (now >= checkInAt) {
        return "inhouse"
      }
    }

    if (now > checkoutDate) {
      if (!checkOutAt) {
        return "checkout"
      }

      if (now > checkOutAt) {
        return "already_checkout"
      }
    }

    return "available"
  }

  const result = (await reservationData).map((r) => ({
    id: r.id,
    guestName: `${r.reservation.guest.prefix} ${r.reservation.guest.name}`,
    roomName: r.room.name,
    checkIn: r.checkIn,
    checkOut: r.checkOut,
    occupancyStatus: setRoomStatus(r.checkIn, r.checkOut, r.checkInAt ?? undefined, r.checkOutAt ?? undefined),
  }))

  return result
}
