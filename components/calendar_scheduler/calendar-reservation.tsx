"use client"

import { useState, useEffect } from "react"
import { DayPilot, DayPilotScheduler } from "@daypilot/daypilot-lite-react"
import { useTheme } from "next-themes"
import { setResourceScheduler, setEventData } from "./helper"
import "@/components/css/scheduler_dark.css"
import "@/components/css/scheduler_green.css"

// dummy data
import { dataTipeKamar, dataReservasi } from "./helper"

// Source : https://code.daypilot.org/79813/react-scheduler-with-horizontal-timeline-open-source

const colorSchedule = {
  BLUE: "#2563EB",
  GREEN: "#059669",
  PURPLE: "#7C3AED",
  RED: "#DC2626",
  ORANGE: "#EA580C",
}

export default function CalendarReservation() {
  const [scheduler, setScheduler] = useState<DayPilot.Scheduler>()
  const { resolvedTheme } = useTheme()

  //

  console.log(setResourceScheduler(dataTipeKamar))

  useEffect(() => {
    if (!scheduler) {
      return
    }

    scheduler.scrollTo(DayPilot.Date.today().addDays(-10))
  }, [scheduler])

  const days = 365

  const onEventDeleted: DayPilot.EventHandler<
    DayPilot.SchedulerEventDeletedArgs
  > = (args) => {
    console.log("Event deleted: " + args.e.text())
  }
  const onEventMoved: DayPilot.EventHandler<
    DayPilot.SchedulerEventMovedArgs
  > = (args) => {
    console.log("Event moved: " + args.e.text())
  }
  const onEventResized: DayPilot.EventHandler<
    DayPilot.SchedulerEventResizedArgs
  > = (args) => {
    console.log("Event resized: " + args.e.text())
  }
  const onTimeRangeSelected: DayPilot.EventHandler<
    DayPilot.SchedulerTimeRangeSelectedArgs
  > = async (args) => {
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
  const timeHeaders: DayPilot.TimeHeaderData[] = [
    { groupBy: "Month" },
    { format: "d", groupBy: "Day" },
  ]

  // const [events, setEvents] = useState<DayPilot.EventData[]>(() => {
  //   const sampleStart = DayPilot.Date.today()
  //   return [
  //     {
  //       id: 1,
  //       text: "Mr. Jhon Doe",
  //       start: sampleStart.addHours(10),
  //       end: sampleStart.addDays(2),
  //       resource: "del-01",
  //       backColor: colorSchedule.BLUE,
  //     },
  //     {
  //       id: 2,
  //       text: "Ms, Jane Doe",
  //       start: sampleStart.addDays(-4),
  //       end: sampleStart.addDays(-1),
  //       resource: "R2",
  //       backColor: colorSchedule.GREEN,
  //     },
  //     {
  //       id: 3,
  //       text: "Mrs. June Doe",
  //       start: sampleStart.addHours(10),
  //       end: sampleStart.addDays(+4),
  //       resource: "R2",

  //       backColor: colorSchedule.RED,
  //     },
  //     {
  //       id: 4,
  //       text: "Mrs. June Doe",
  //       start: sampleStart.addDays(-9),
  //       end: sampleStart.addDays(-3),
  //       resource: "R4",
  //       backColor: colorSchedule.PURPLE,
  //     },
  //   ]
  // })

  const [events, setEvents] = useState<DayPilot.EventData[]>(() => {
    const sampleStart = DayPilot.Date.today()
    return setEventData(dataReservasi)
  })

  // const [resources, setResources] = useState<DayPilot.ResourceData[]>(() => [
  //   { name: "Room 1", id: "R1" },
  //   { name: "Room 2", id: "R2" },
  //   { name: "Room 3", id: "R3" },
  //   { name: "Room 4", id: "R4" },
  // ])

  // const [resources, setResources] = useState<DayPilot.ResourceData[]>(() => [
  //   {
  //     name: "Deluxe",
  //     id: "del",
  //     expanded: true,
  //     type: "group",
  //     children: [],
  //     backColor: colorSchedule.BLUE,
  //     html: "<h1 class='font-bold text-lg underline  text-center'>Deluxe</h1>",

  //     borderColor: "black",
  //   },
  //   { name: "Deluxe 01", id: "R1" },
  //   { name: "Room 2", id: "R2" },
  //   { name: "Room 3", id: "R3" },
  //   { name: "Room 4", id: "R4" },
  // ])

  const [resources, setResources] = useState<DayPilot.ResourceData[]>(() =>
    setResourceScheduler(dataTipeKamar)
  )

  return (
    <DayPilotScheduler
      cellWidth={100}
      rowHeaderWidth={200}
      eventHeight={60}
      days={days}
      theme={resolvedTheme === "dark" ? "scheduler_dark" : "scheduler_green"}
      eventDeleteHandling={"Disabled"}
      eventMoveHandling={"Disabled"}
      eventClickHandling={"Enabled"}
      eventResizeHandling={"Update"}
      onEventClick={(e) => alert(e.e.text())}
      onEventDeleted={onEventDeleted}
      durationBarVisible={false}
      height={1000}
      onEventMoved={onEventMoved}
      onEventResized={onEventResized}
      onTimeRangeSelected={onTimeRangeSelected}
      scale={"Day"}
      startDate={startDate}
      timeHeaders={timeHeaders}
      timeRangeSelectedHandling={"Disabled"}
      events={events}
      resources={resources}
      controlRef={setScheduler}
    />
  )
}
