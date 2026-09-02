"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { PencilIcon, TrashIcon } from "lucide-react"
import type { GuestType } from "@/lib/types"

import { TableFeaturesType } from "@/components/data-table"

export type GuestColumnType = GuestType

const columnHelper = createColumnHelper<TableFeaturesType, GuestColumnType>()

type Props = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function guestColumns({ onEdit, onDelete }: Props) {
  return columnHelper.columns([
    columnHelper.display({
      id: "spacer",
    }),

    {
      accessorKey: "name",
      header: () => <div className="w-full">Name</div>,
      cell: ({ row }) => (
        <div className="w-full">
          <span>
            {row.original.prefix}. {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <div className="w-full">Phone</div>,
      cell: ({ row }) => (
        <>
          <span>{row.original.phone}</span>
        </>
      ),
    },
    {
      accessorKey: "identificationNumber",
      header: "ID Number",
      cell: ({ row }) => (
        <>
          <span>{row.original.identificationNumber}</span>
        </>
      ),
    },
    {
      accessorKey: "identificationType",
      header: "ID Type",
      cell: ({ row }) => (
        <>
          <span>{row.original.identificationType}</span>
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
