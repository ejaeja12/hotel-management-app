import { db } from "../db"

export async function getReservationByDate(startDate: string, endDate: string) {
  /**
   * ambil stay untuk dapat data check in dan checkout dulu
   */
  const stayD = await db.stay.findMany({
    where: {
      OR: [
        {
          checkIn: {
            gte: startDate,
          },
        },
        {
          checkOut: {
            lte: endDate,
          },
        },
      ],
    },
  })

  /**
   * ambil checkin yang unik (buang duplikat) untuk di-groupkan nanti
   */

  const getArrayDate = [
    ...new Set(stayD.map((stay) => stay.checkIn.toISOString().split("T")[0])),
  ]

  /**
   * ambil data reservation
   */

  const reservation = await db.reservation.findMany({
    where: {
      id: {
        in: stayD.map((st) => st.reservationId),
      },
    },
    include: {
      stay: {
        select: {
          id: true,
          checkIn: true,
          checkOut: true,
          room: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      guest: {
        select: {
          name: true,
        },
      },
    },
  })

  /**
   * peng-groupan duniawi, groupkan reservasi berdasarkan data check in
   */

  const result = getArrayDate.map((date) => ({
    date: date,
    reservation: reservation.filter((reservation) =>
      reservation.stay.some(
        (st) => st.checkIn.toISOString().split("T")[0] === date
      )
    ),
  }))
  console.log(result)
  return result
}
