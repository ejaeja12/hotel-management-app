"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import InputCurrency from "@/components/input-currency"
import { PencilIcon, TrashIcon } from "lucide-react"
import { TypeOfRoomType } from "@/lib/validations/room-type-validation"
import { TableFeaturesType } from "@/components/data-table"

const columnHelper = createColumnHelper<TableFeaturesType, TypeOfRoomType>()

type Props = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function roomTypeColumns({ onEdit, onDelete }: Props) {
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
      accessorKey: "price",
      header: () => <div className="w-full">Price</div>,
      cell: ({ row }) => (
        <div className="w-full">
          <span>{row.original.price}</span>
        </div>
      ),
    },
    {
      accessorKey: "color",
      header: () => <div className="w-full">Color</div>,
      cell: ({ row }) => (
        <div style={{ backgroundColor: row.original.color }} className="w-full">
          <span>{row.original.color}</span>
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
