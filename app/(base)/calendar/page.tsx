import CalendarReservation from "@/components/calendar_scheduler/calendar-reservation"

export default function Calendar() {
  return (
    <div className="max-h-[calc(100vh-var(--height-nav-header))] overflow-x-auto">
      <CalendarReservation></CalendarReservation>
    </div>
  )
}
