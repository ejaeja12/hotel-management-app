import { useRef, useEffect, useState, RefObject } from "react"
import { DayPilot, DayPilotScheduler } from "@daypilot/daypilot-lite-react"

export function useDrag(elRef: RefObject<HTMLElement | null>) {
  const [delta, setDelta] = useState(0)
  const [scheduler, setScheduler] = useState<DayPilot.Scheduler>()
  const isDragging = useRef(false)
  const [direction, setDirection] = useState(0)
  const startX = useRef(0)

  const DIRECTION_STEP = 100

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const onMouseEnter = () => {
      el.style.cursor = "grab"
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      startX.current = e.pageX
      el.style.cursor = "grabbing"
    }

    let curr = 0
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      setDelta(e.pageX - startX.current)
      const currentX = e.pageX

      setDirection(curr == 0 ? 0 : (currentX - curr) * 1.5)
      // console.log(
      //   "current x : ",
      //   currentX,
      //   "curr : ",
      //   curr,
      //   "direction : ",
      //   curr == 0 ? 0 : currentX - curr
      // )
      curr = currentX
    }

    const onMouseUp = () => {
      isDragging.current = false
      setDirection(0)
      el.style.cursor = "default"
      curr = 0
      // reset saat mouse dilepas
    }

    el.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    // el.addEventListener("mouseenter", onMouseEnter)

    return () => {
      el.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      // el.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [elRef])

  return { delta, direction }
}
