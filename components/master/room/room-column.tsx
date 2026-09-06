"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { PencilIcon, TrashIcon } from "lucide-react"
import { TypeOfRoom } from "@/lib/validations/room-validation"
import { TableFeaturesType } from "@/components/data-table"

const columnHelper = createColumnHelper<TableFeaturesType, TypeOfRoom>()

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
        <Badge style={{ backgroundColor: row.original.color }} className="w-1/2 font-bold text-black">
          <span>{row.original.roomType}</span>
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="w-full">Status</div>,
      cell: ({ row }) => (
        <div className="w-full">
          <span>
            {row.original.status} | {row.original.occupancyStatus}
          </span>
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
