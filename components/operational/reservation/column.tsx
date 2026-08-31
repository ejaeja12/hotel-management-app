"use client"

import * as React from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ReservationType, StayType, GuestType } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"

import { TableCell, TableRow } from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { TableFeaturesType } from "@/components/operational/reservation/reservation-data-table"
import { EllipsisVerticalIcon } from "lucide-react"

type GuestTableType = Pick<GuestType, "name" | "prefix">

// type ReservationColumnType = {
//   id: string
//   stay: StayType[]
//   guest: GuestTableType
// }

export type ReservationColumnType = {
  date?: string
  id?: string
  stay?: StayType[]
  guest?: GuestTableType
}

const columnHelper = createColumnHelper<
  TableFeaturesType,
  ReservationColumnType
>()

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "spacer",
  }),
  {
    accessorKey: "id",
    header: "Reservation Id",
    cell: ({ row }) => (
      <div className="h-fit max-w-36 truncate">
        <span className="text-left break-all">{row.original.id}</span>
      </div>
    ),
  },
  {
    accessorKey: "guest.name",
    accessorFn: (row) => (row.date ? null : row.guest?.name),
    header: "Guest Name",
    cell: ({ row }) => (
      <div className="w-full">
        <span className="text-left">{`${row.original.guest?.prefix}. ${row.original.guest?.name}`}</span>
      </div>
    ),
  },
  {
    accessorKey: "stay.0.room.name",
    header: "Room Number",
    cell: ({ row }) => (
      <div className="">
        <span className="">{row.original.stay?.[0]?.room?.name}</span>
      </div>
    ),
  },

  {
    accessorKey: "stay.0.checkIn",
    header: "Check in",
    cell: ({ row }) => (
      <div className="">
        <span className="">
          {row.original.stay &&
            new Date(row.original.stay[0]?.checkIn).toDateString()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "stay.0.checkOut",
    header: "Check Out",
    cell: ({ row }) => (
      <div className="">
        <span className="">
          {row.original.stay &&
            new Date(row.original.stay[0]?.checkOut).toDateString()}
        </span>
      </div>
    ),
  },

  columnHelper.display({
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-open:bg-muted"
              size="icon"
            />
          }
        >
          <EllipsisVerticalIcon />
          <span className="sr-only">Open menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
])

// export const columns = columnHelper.columns([
//    columnHelper.accessor("id", {

//    })
// ])
