"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { NotebookPenIcon, PencilIcon, TrashIcon } from "lucide-react"
import { TypeOfRoom } from "@/lib/validations/room-validation"
import { TableFeaturesType } from "@/components/data-table"

const columnHelper = createColumnHelper<TableFeaturesType, TypeOfRoom>()

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

function badgeRoomStatus(par: string | undefined) {
  switch (par) {
    case "ready":
      return "border-2 border-green-600 "
    case " maintenance":
      return "border-2 border-orange-600"
    case "dirty":
      return "border-2 border-slate-600"
    case "cleaning":
      return "border-2 border-blue-600"
    default:
      return "border-2 border-black "
  }
}

type Props = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function roomColumns({ onEdit, onDelete }: Props) {
  return columnHelper.columns([
    columnHelper.display({
      id: "spacer",
    }),

    {
      accessorKey: "name",
      header: () => <div className="w-full">Name</div>,
      cell: ({ row }) => (
        <div className="w-full">
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "roomType",
      header: () => <div className="w-full">Room Type</div>,
      cell: ({ row }) => (
        <Badge style={{ backgroundColor: row.original.color }} className="w-1/2 font-bold text-slate-200">
          <span>{row.original.roomType}</span>
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="w-full">Status</div>,
      cell: ({ row }) => (
        <div className="flex w-full gap-2">
          <div className="flex gap-0">
            <Badge className={badgeOccupancyStatus(row.original.occupancyStatus)}>{row.original.occupancyStatus}</Badge>
          </div>
          <div>
            <Badge variant={"outline"} className={badgeRoomStatus(row.original.status)}>
              {row.original.status}
            </Badge>
          </div>
        </div>
      ),
    },

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            onClick={() => {
              onEdit(row.original.id)
            }}
          >
            <PencilIcon />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              onDelete(row.original.id)
            }}
          >
            <TrashIcon color="var(--color-destructive)" />
          </Button>
        </div>
      ),
    }),
  ])
}
