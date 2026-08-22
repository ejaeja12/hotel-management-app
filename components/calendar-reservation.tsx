"use client"

import { useState, useEffect } from "react"
import { DayPilot, DayPilotScheduler } from "@daypilot/daypilot-lite-react"
import "@/app/scheduler_diagonal.css"

// Source : https://code.daypilot.org/79813/react-scheduler-with-horizontal-timeline-open-source

export default function CalendarReservation() {
  const [scheduler, setScheduler] = useState<DayPilot.Scheduler>()

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
  const [events, setEvents] = useState<DayPilot.EventData[]>(() => {
    const sampleStart = DayPilot.Date.today()
    return [
      {
        id: 1,
        text: "Mr. Jhon Doe",
        start: sampleStart.addHours(10),
        end: sampleStart.addHours(12),
        resource: "R1",
      },
      {
        id: 2,
        text: "Ms, Jane Doe",
        start: new DayPilot.Date("2022-08-23"),
        end: new DayPilot.Date("2026-08-23"),
        resource: "R2",
        barColor: "#000000",
        barBackColor: "#000000",
      },
      {
        id: 3,
        text: "Mrs. June Doe",
        start: sampleStart.addHours(10),
        end: sampleStart.addHours(11),
        resource: "R2",
        barColor: "#38761d",
        barBackColor: "#93c47d",
      },
    ]
  })
  const [resources, setResources] = useState<DayPilot.ResourceData[]>(() => [
    { name: "Room 1", id: "R1" },
    { name: "Room 2", id: "R2" },
    { name: "Room 3", id: "R3" },
    { name: "Room 4", id: "R4" },
  ])

  return (
    <DayPilotScheduler
      cellWidth={100}
      eventHeight={60}
      days={days}
      eventDeleteHandling={"Disabled"}
      eventMoveHandling={"Disabled"}
      eventClickHandling={"Enabled"}
      eventResizeHandling={"Update"}
      onEventClick={(e) => alert(e.e.text())}
      onEventDeleted={onEventDeleted}

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
