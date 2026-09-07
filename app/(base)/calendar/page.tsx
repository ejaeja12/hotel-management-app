import CalendarReservation from "@/components/calendar_scheduler/calendar-reservation"
import { getReservationCalendarData } from "./action"

export default async function Calendar() {
  const data = await getReservationCalendarData()
  return (
    <div className="max-h-[calc(100vh-var(--height-nav-header))] overflow-x-auto">
      <CalendarReservation
        reservationData={data.reservationData}
        roomTypeData={data.roomTypeData}
      ></CalendarReservation>
    </div>
  )
}
