"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useMemo } from "react"
// import { guestColumns, GuestColumnType } from "@/components/master/guest/guest-column"
import { Button } from "@/components/ui/button"
import { DialogStateType } from "./room-type-input"
import { roomTypeColumns } from "./room-type-column"
// import GuestFilter from "./guest-filter"
import type { PaginationType } from "@/lib/types"
import { ExtraChargeType } from "@/lib/validations/extra-charge-validation"
// import ExtraChargeFilter from "./extra-charge-filter"
import RoomTypeInput from "./room-type-input"
import { TypeOfRoomType } from "@/lib/validations/room-type-validation"

type Props = {
  data: {
    data: TypeOfRoomType[]
    meta: PaginationType
  }
  className?: string
}

export default function RoomTypeContainer({ data, className = "" }: Props) {
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
      roomTypeColumns({
        onDelete: (id) => handleDialog("delete", id),
        onEdit: (id) => handleDialog("edit", id),
      }),
    []
  )
  return (
    <>
      {/* Dialog */}
      {/* <GuestInput dialogState={dialogState} onStateChange={() => handleDialog("close")}></GuestInput> */}
      <RoomTypeInput dialogState={dialogState} onStateChange={() => handleDialog("close")}></RoomTypeInput>

      {/* Table */}

      <Card className={`flex flex-col gap-8 ${className}`}>
        <CardHeader className="flex items-center justify-between">
          {/* <ExtraChargeFilter></ExtraChargeFilter> */}
          <Button onClick={() => handleDialog("create")}>Create Room Type</Button>
        </CardHeader>
        <CardContent>
          <DataTable data={data.data} columns={column} meta={data.meta} />
        </CardContent>
      </Card>
    </>
  )
}
