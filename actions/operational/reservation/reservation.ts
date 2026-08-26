import { getReservationByDate } from "@/lib/services/reservation-service"
import { getStartOfDay, getEndOfDay } from "@/lib/utils"

export async function getReservation() {
  const yesterday = getStartOfDay(-1)
  const tomorrow = getEndOfDay(1)

  const result = await getReservationByDate(yesterday, tomorrow)
  return result
}
