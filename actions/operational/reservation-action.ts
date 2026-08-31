import { getReservationByDate } from "@/lib/services/reservation-service"
import { getStartOfDay, getEndOfDay } from "@/lib/date-utils"

export async function getReservation(checkin: string, checkout: string) {
  // const yesterday = `${checkin}T00:00:00.000Z`
  const yesterday = getStartOfDay(checkin)
  // const tomorrow = `${checkout}T23:59:59.999Z`
  const tomorrow = getEndOfDay(checkout)

  console.log("yesterday : ", yesterday, "tomorrow : ", tomorrow)

  const result = await getReservationByDate(yesterday, tomorrow)
  return result
}
