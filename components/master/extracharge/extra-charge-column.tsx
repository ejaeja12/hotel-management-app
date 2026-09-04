"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { PencilIcon, TrashIcon } from "lucide-react"
import { ExtraChargeType } from "@/lib/validations/extra-charge-validation"
import { TableFeaturesType } from "@/components/data-table"

const columnHelper = createColumnHelper<TableFeaturesType, ExtraChargeType>()

type Props = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function extraChargeColumns({ onEdit, onDelete }: Props) {
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <>
          <span>{row.original.status}</span>
        </>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="w-full">Phone</div>,
      cell: ({ row }) => (
        <>
          <span>{row.original.price}</span>
        </>
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
