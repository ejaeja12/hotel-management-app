"use client"

import { useState, useLayoutEffect, useEffect, useRef } from "react"
import { DayPilot, DayPilotScheduler } from "@daypilot/daypilot-lite-react"
import { useTheme } from "next-themes"
import { setResourceScheduler, setEventData } from "./helper"
import { useDrag } from "@/hooks/use-drag"
import { useMounted } from "@/hooks/use-mounted"
import "@/components/css/scheduler_dark.css"
import "@/components/css/scheduler_green.css"

// dummy data
import { dataTipeKamar, dataReservasi } from "./helper"
import { reservationData } from "@/prisma/seeder/reservationSeeder"

// Source : https://code.daypilot.org/79813/react-scheduler-with-horizontal-timeline-open-source

const colorSchedule = {
  BLUE: "#2563EB",
  GREEN: "#059669",
  PURPLE: "#7C3AED",
  RED: "#DC2626",
  ORANGE: "#EA580C",
}

type ReservationCalendar = {
  id: string
  guest: string
  status: string
  start: string
  end: string
  room: {
    id: string
  }
}

type RoomTypeCalendar = {
  id: string
  name: string
  color: string
  room: {
    id: string
    name: string
  }[]
}

type Props = {
  reservationData: ReservationCalendar[]
  roomTypeData: RoomTypeCalendar[]
}

export default function CalendarReservation({ reservationData, roomTypeData }: Props) {
  const reservations = setEventData(reservationData)
  const roomType = setResourceScheduler(roomTypeData)

  const [scheduler, setScheduler] = useState<DayPilot.Scheduler>()
  const { resolvedTheme } = useTheme()
  const [innerHeight, setInnerheight] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const [xx, setXx] = useState(0)
  const { delta, direction } = useDrag(boxRef)

  useLayoutEffect(() => {
    const updateHeight = () => setInnerheight(window.innerHeight - 20)
    // const updateHeight = () => setInnerheight(window.innerHeight - 117)
    console.log(window.innerHeight)
    updateHeight() // set nilai awal
    window.addEventListener("resize", updateHeight)

    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  useEffect(() => {
    if (!scheduler) {
      return
    }
    scheduler.setScrollX(scheduler.getScrollX() - direction)
  }, [delta])

  useEffect(() => {
    if (!scheduler) {
      return
    }

    scheduler.scrollTo(DayPilot.Date.today().addDays(-10))
  }, [scheduler])

  const days = 365

  const onEventDeleted: DayPilot.EventHandler<DayPilot.SchedulerEventDeletedArgs> = (args) => {
    console.log("Event deleted: " + args.e.text())
  }
  const onEventMoved: DayPilot.EventHandler<DayPilot.SchedulerEventMovedArgs> = (args) => {
    console.log("Event moved: " + args.e.text())
  }
  const onEventResized: DayPilot.EventHandler<DayPilot.SchedulerEventResizedArgs> = (args) => {
    console.log("Event resized: " + args.e.text())
  }
  const onTimeRangeSelected: DayPilot.EventHandler<DayPilot.SchedulerTimeRangeSelectedArgs> = async (args) => {
    const scheduler = args.control
    const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1")
    scheduler.clearSelection()
    if (modal.canceled) {
      return
    }
    scheduler.events.add({
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      resource: args.resource,
      text: modal.result,
    })
  }
  const startDate = DayPilot.Date.today().firstDayOfYear()
  console.log(startDate)
  const timeHeaders: DayPilot.TimeHeaderData[] = [{ groupBy: "Month" }, { format: "d", groupBy: "Day" }]

  // const [events, setEvents] = useState<DayPilot.EventData[]>(() => {
  //   const sampleStart = DayPilot.Date.today()
  //   return setEventData(dataReservasi)
  // })

  // const [resources, setResources] = useState<DayPilot.ResourceData[]>(() => setResourceScheduler(dataTipeKamar))

  return (
    <div ref={boxRef} style={{ userSelect: "none" }}>
      {/* <div className="flex flex-col">
        <span>scroll x : {xx}</span>
        <span>delta x : {delta}</span>
        <span>direction x : {direction}</span>
      </div> */}
      <DayPilotScheduler
        cellWidth={105}
        rowHeaderWidth={200}
        eventHeight={45}
        days={days}
        theme={resolvedTheme === "dark" ? "scheduler_dark" : "scheduler_green"}
        eventDeleteHandling={"Disabled"}
        eventMoveHandling={"Disabled"}
        eventClickHandling={"Enabled"}
        eventResizeHandling={"Update"}
        onEventClick={(e) => alert(e.e.text())}
        onEventDeleted={onEventDeleted}
        durationBarVisible={false}
        height={innerHeight - 100}
        heightSpec="Max"
        onEventMoved={onEventMoved}
        onEventResized={onEventResized}
        onTimeRangeSelected={onTimeRangeSelected}
        scale={"Day"}
        startDate={startDate}
        timeHeaders={timeHeaders}
        timeRangeSelectedHandling={"Disabled"}
        events={reservations}
        resources={roomType}
        controlRef={setScheduler}
      />
    </div>
  )
}
