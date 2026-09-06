"use client"

import * as React from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ReservationType, StayType, GuestType } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"

import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

function badgeOccupancyStatus(par: string | undefined) {
  switch (par) {
    case "checkin":
      return " bg-blue-600 text-white"
    case "checkout":
      return "bg-slate-600 text-white"
    case "inhouse":
      return "bg-green-600 text-white"
    case "checkout":
      return "bg-purple-600 text-white"
    case "already_checkout":
      return "bg-slate-600 text-white"
    case "available":
      return "bg-slate-100 text-black"

    default:
      return par
  }
}

export type ReservationColumnType = {
  date?: string
  id?: string
  guestName?: string
  roomName?: string
  checkIn?: string
  checkOut?: string
  occupancyStatus?: string
}

const columnHelper = createColumnHelper<TableFeaturesType, ReservationColumnType>()

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
    accessorKey: "guestName",
    accessorFn: (row) => (row.date ? null : row.guestName),
    header: "Guest Name",
    cell: ({ row }) => (
      <div className="w-full">
        <span className="text-left">{row.original.guestName}</span>
      </div>
    ),
  },
  {
    accessorKey: "roomName",
    header: "Room Number",
    cell: ({ row }) => (
      <div className="">
        <span className="">{row.original.roomName}</span>
      </div>
    ),
  },
  {
    accessorKey: "occupancyStatus",
    header: "Status",
    cell: ({ row }) => (
      <div className="">
        <Badge className={badgeOccupancyStatus(row.original.occupancyStatus)}>{row.original.occupancyStatus}</Badge>
      </div>
    ),
  },

  {
    accessorKey: "checkIn",
    header: "Check in",
    cell: ({ row }) => (
      <div className="">
        <span className="">{row.original.checkIn && new Date(row.original.checkIn).toDateString()}</span>
      </div>
    ),
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
    cell: ({ row }) => (
      <div className="">
        <span className="">{row.original.checkOut && new Date(row.original.checkOut).toDateString()}</span>
      </div>
    ),
  },

  columnHelper.display({
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="flex size-8 text-muted-foreground data-open:bg-muted" size="icon" />
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
