"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useMemo } from "react"
// import { guestColumns, GuestColumnType } from "@/components/master/guest/guest-column"
import { Button } from "@/components/ui/button"
import { DialogStateType } from "./extra-charge-input"
import { extraChargeColumns } from "./extra-charge-column"
// import GuestFilter from "./guest-filter"
import type { PaginationType } from "@/lib/types"
import { ExtraChargeType } from "@/lib/validations/extra-charge-validation"
import ExtraChargeFilter from "./extra-charge-filter"
import ExtraChargeInput from "./extra-charge-input"

type Props = {
  data: {
    data: ExtraChargeType[]
    meta: PaginationType
  }
  className?: string
}

export default function ExtraChargeContainer({ data, className = "" }: Props) {
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
      extraChargeColumns({
        onDelete: (id) => handleDialog("delete", id),
        onEdit: (id) => handleDialog("edit", id),
      }),
    []
  )
  return (
    <>
      {/* Dialog */}
      {/* <GuestInput dialogState={dialogState} onStateChange={() => handleDialog("close")}></GuestInput> */}
      <ExtraChargeInput dialogState={dialogState} onStateChange={() => handleDialog("close")}></ExtraChargeInput>

      {/* Table */}

      <Card className={`flex flex-col gap-8 ${className}`}>
        <CardHeader className="flex items-center justify-between">
          <ExtraChargeFilter></ExtraChargeFilter>
          <Button onClick={() => handleDialog("create")}>Create Guest</Button>
        </CardHeader>
        <CardContent>
          <DataTable data={data.data} columns={column} meta={data.meta} />
        </CardContent>
      </Card>
    </>
  )
}
