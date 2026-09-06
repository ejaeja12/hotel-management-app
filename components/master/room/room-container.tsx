"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useMemo } from "react"
// import { guestColumns, GuestColumnType } from "@/components/master/guest/guest-column"
import { Button } from "@/components/ui/button"
import { DialogStateType } from "./room-input"
import { roomColumns } from "./room-column"
// import GuestFilter from "./guest-filter"
import type { PaginationType } from "@/lib/types"
import { ExtraChargeType } from "@/lib/validations/extra-charge-validation"
// import ExtraChargeFilter from "./extra-charge-filter"
import RoomInput from "./room-input"
import { TypeOfRoom } from "@/lib/validations/room-validation"

import { getDate, getStartOfDay, tesGetDate } from "@/lib/date-utils"

type Props = {
  data: {
    data: TypeOfRoom[]
    meta: PaginationType
  }
  className?: string
}

export default function RoomContainer({ data, className = "" }: Props) {
  const [dialogState, setDialogState] = useState<DialogStateType>({
    isOpen: false,
    id: null,
    action: "close",
  })

  function handleDialog(state: DialogStateType["action"], id: string | null = null) {
    switch (state) {
      case "create":
        return setDialogState({ isOpen: true, id: null, action: "create" })
      case "edit":
        return setDialogState({ isOpen: true, id: id, action: "edit" })
      case "delete":
        return setDialogState({ isOpen: true, id: id, action: "delete" })
      default:
        return setDialogState({ isOpen: false, id: null, action: "close" })
    }
  }

  const column = useMemo(
    () =>
      roomColumns({
        onDelete: (id) => handleDialog("delete", id),
        onEdit: (id) => handleDialog("edit", id),
      }),
    []
  )
  // const newDate = new Date()

  // console.log("tes start date", getStartOfDay("2026-09-06"))
  // console.log("tes new date : ", newDate.toISOString())
  // console.log("tes getDate : ", getDate())
  const tesDate = tesGetDate()

  const gDate = getDate(1)

  console.log("tes get date : ", tesDate)
  console.log("tes g date : ", gDate)
  return (
    <>
      {/* Dialog */}
      {/* <GuestInput dialogState={dialogState} onStateChange={() => handleDialog("close")}></GuestInput> */}
      <RoomInput dialogState={dialogState} onStateChange={() => handleDialog("close")}></RoomInput>

      {/* Table */}

      <Card className={`flex flex-col gap-8 ${className}`}>
        <CardHeader className="flex items-center justify-between">
          {/* <ExtraChargeFilter></ExtraChargeFilter> */}
          <Button onClick={() => handleDialog("create")}>Create Room</Button>
        </CardHeader>
        <CardContent>
          <DataTable data={data.data} columns={column} meta={data.meta} />
        </CardContent>
      </Card>
    </>
  )
}
