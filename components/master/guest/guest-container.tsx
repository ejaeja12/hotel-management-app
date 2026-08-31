"use client"

import { DataTable } from "@/components/data-table"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useMemo } from "react"
import {
  guestColumns,
  GuestColumnType,
} from "@/components/master/guest/guest-column"
import { Button } from "@/components/ui/button"
import GuestFilter from "./guest-filter"
import type { PaginationType } from "@/lib/types"

type Props = {
  data: {
    data: GuestColumnType[]
    meta: PaginationType
  }
  className?: string
}

export default function GuestContainer({ data, className = "" }: Props) {
  function handleEdit(id: string) {
    alert("Handle Edit : " + id)
  }

  function handleDelete(id: string) {
    alert("Handle Delete : " + id)
  }

  function handleCreate() {
    alert("Handle Create")
  }

  const column = useMemo(
    () =>
      guestColumns({
        onDelete: (id) => handleDelete(id),
        onEdit: (id) => handleEdit(id),
      }),
    []
  )
  return (
    <>
      <Card className={`flex flex-col gap-8 ${className}`}>
        <CardHeader className="flex items-center justify-between">
          <GuestFilter></GuestFilter>
          <Button onClick={handleCreate}>Create Guest</Button>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data.data}
            columns={column}
            meta={data.meta}
            buttonAction={<Button onClick={handleCreate}>Create Guest</Button>}
          />
        </CardContent>
      </Card>
    </>
  )
}
