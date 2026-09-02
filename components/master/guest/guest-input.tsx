"use client"

import React, { useState, useEffect, useActionState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogClose, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { showGuest, createGuest, editGuest } from "@/app/(base)/master/guest/action"
import { guestValidation, GuestFormType } from "@/lib/validations/guest-validation"
import { IdentificationType, Prefix } from "@/generated/prisma/enums"
import { toastSuccess, toastError } from "@/components/toast-status"
import { Spinner } from "@/components/ui/spinner"
import { MoveRightIcon } from "lucide-react"

export type DialogStateType = {
  isOpen: boolean
  action: "close" | "create" | "edit" | "delete"
  id: string | null
}

type Props = {
  dialogState: DialogStateType
  onStateChange?: () => void
}
export default function GuestInput({ dialogState, onStateChange = () => {} }: Props) {
  return (
    <div>
      <Dialog open={dialogState.isOpen} onOpenChange={onStateChange}>
        <DialogContent className="min-w-1/3">
          {["create", "edit"].includes(dialogState.action) && (
            <InputField id={dialogState.id ?? ""} onStateChange={() => onStateChange()} />
          )}
          {dialogState.action === "delete" && <DeleteField id={dialogState.id ?? ""} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InputField({ id = "", onStateChange }: { id?: string; onStateChange: () => void }) {
  const [state, formAction, isPending] = useActionState(id ? editGuest : createGuest, {
    success: false,
    action: "",
    error: "",
  })

  const [initialGuest, setInitialGuest] = useState<GuestFormType | null>(null)

  const [guest, setGuest] = useState<GuestFormType>({
    id: id,
    prefix: "",
    name: "",
    phone: "",
    identificationNumber: "",
    identificationType: "",
  })

  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)

  useEffect(() => {
    if (state.success) {
      toastSuccess("Success", state.action === "create" ? "Guest Data Created" : "Guest Data Updated")
      return onStateChange()
    }
    if (state.error) toastError("Error", state.error ?? "Error")

    async function fetchGuest() {
      const guestData = id ? await showGuest(id) : null
      if (guestData) {
        setInitialGuest(guestData)
        setGuest(guestData)
      }
    }

    fetchGuest()
  }, [id, state, onStateChange])

  const idTypeItems = [
    { value: IdentificationType.ktp, label: "KTP" },
    { value: IdentificationType.passport, label: "Passport" },
  ]
  const prefixItems = [
    { value: Prefix.Mr, label: "Mr" },
    { value: Prefix.Ms, label: "Ms" },
    { value: Prefix.Mrs, label: "Mrs" },
  ]

  // cek perubahan value awal guest, ini dipakai di action update aja
  function getDiff() {
    const changedValue: Partial<GuestFormType> = {}
    const checkDiff = (Object.keys(guest) as Array<keyof GuestFormType>).filter(
      (key) => guest[key] !== initialGuest?.[key]
    )

    const isDiff = checkDiff.length > 0

    if (isDiff) {
      checkDiff.map((r) => (changedValue[r] = guest[r]))
    }

    return { changedValue, isDiff }
  }

  // Ini pun supaya di dialog confirm guest key nya rapih, enak dibaca
  function makeGuestKeyReadable(par: string) {
    switch (par) {
      case "identificationNumber":
        return "ID Number"
      case "identificationType":
        return "ID Type"
      default:
        return par
    }
  }

  function handleSubmit() {
    const result = guestValidation.safeParse(guest)

    if (!result.success) {
      const err = result.error.issues[0].message
      return toastError("Error", err)
    }
    formAction(guest)
  }

  return (
    <>
      {/* <button onClick={() => tes()}>tes</button> */}
      <DialogHeader className="text-lg">{id ? "Edit Guest Data" : "Create Guest"}</DialogHeader>

      <form id="guest-form" action={handleSubmit}>
        <div className="flex flex-col gap-10 px-5 py-5">
          <div className="grid grid-cols-12 gap-5">
            {/* Prefix */}

            <Field className="col-span-4">
              <FieldLabel>Prefix</FieldLabel>
              <Select value={guest.prefix} onValueChange={(e) => e && setGuest({ ...guest, prefix: e })} name="prefix">
                <SelectTrigger>
                  <SelectValue placeholder="Select Prefix" />
                </SelectTrigger>
                <SelectContent>
                  {prefixItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Guest Name */}
            <Field className="col-span-8">
              <FieldLabel>Name</FieldLabel>
              <Input
                name="name"
                value={guest.name}
                onChange={(e) => setGuest({ ...guest, name: e.target.value })}
              ></Input>
            </Field>
          </div>

          <div className="grid grid-cols-12 gap-5">
            {/* ID Type */}
            <Field className="col-span-4">
              <FieldLabel>ID Type</FieldLabel>
              <Select
                value={guest.identificationType}
                onValueChange={(e) => e && setGuest({ ...guest, identificationType: e })}
                name="identificationType"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ID Type" />
                </SelectTrigger>
                <SelectContent>
                  {idTypeItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* ID Number */}
            <Field className="col-span-8">
              <FieldLabel>ID number</FieldLabel>
              <Input
                name="identificationNumber"
                value={guest.identificationNumber}
                onChange={(e) => setGuest({ ...guest, identificationNumber: e.target.value })}
              ></Input>
            </Field>
          </div>

          {/* Phone */}
          <Field className="col-span-8">
            <FieldLabel>Phone Number</FieldLabel>
            <Input
              name="identificationNumber"
              value={guest.phone}
              onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            ></Input>
          </Field>
        </div>
      </form>

      <DialogFooter>
        <DialogClose render={<Button>Cancel</Button>}></DialogClose>

        {/* Munculkan Dialog confirm kalau action edit, ditandai dengan id tidak null atau undefined */}
        {id ? (
          <Button onClick={() => setConfirmDialog(true)} disabled={!getDiff().isDiff}>
            Confirm
          </Button>
        ) : (
          <Button type="submit" form="guest-form" disabled={isPending}>
            {isPending && <Spinner />}
            Create
          </Button>
        )}
      </DialogFooter>

      {/* Confirm Dialog untuk action update */}
      <DialogConfirm
        disableTrigger={!getDiff().isDiff}
        confirmState={confirmDialog}
        handleOpenChange={() => setConfirmDialog(false)}
        title="Confirm Edit"
        buttonConfirm={
          <Button type="submit" form="guest-form" disabled={isPending}>
            {isPending && <Spinner />}
            Update
          </Button>
        }
      >
        <div className="flex w-full flex-col gap-3">
          <div className="grid w-full grid-cols-12">
            <span className="col-span-3 text-center font-bold">Field</span>
            <span className="col-span-3 text-center font-bold">Before</span>
            <span className="col-span-3"></span>
            <span className="col-span-3 text-center font-bold">After</span>
          </div>

          {initialGuest &&
            Object.keys(getDiff().changedValue).map((k, i) => (
              <div key={i} className="grid w-full grid-cols-12 border-b pb-2">
                <span className="col-span-3 text-center font-bold">{makeGuestKeyReadable(k)} : </span>
                <span className="col-span-3 text-center">{initialGuest[k as keyof GuestFormType]}</span>
                <span className="col-span-3 flex justify-center text-center">
                  <MoveRightIcon />
                </span>
                <span className="col-span-3 text-center">{guest[k as keyof GuestFormType]}</span>
              </div>
            ))}
        </div>
      </DialogConfirm>
    </>
  )
}

function DeleteField({ id = "" }: { id?: string }) {
  return (
    <>
      <DialogHeader className="text-lg">Delete Guest</DialogHeader>
      Delete : {id}
      <DialogFooter>
        <Button>Close</Button>
        <DialogConfirm buttonConfirm={<Button>Confirm</Button>}>Sure ?</DialogConfirm>
      </DialogFooter>
    </>
  )
}

function DialogConfirm({
  children,
  title = "",
  handleOpenChange = () => {},
  confirmState = false,
  buttonConfirm,
}: {
  children: React.ReactNode
  handleOpenChange?: () => void
  confirmState?: boolean
  title?: string
  disableTrigger?: boolean
  buttonConfirm: React.ReactNode
}) {
  return (
    <Dialog open={confirmState} onOpenChange={() => handleOpenChange()}>
      {/* <DialogTrigger
        disabled={disableTrigger}
        render={<Button onClick={() => handleOpen()}>Confirm</Button>}
      ></DialogTrigger> */}
      <DialogOverlay forceRender></DialogOverlay>
      <DialogContent className="min-w-1/3">
        <DialogHeader className="text-xl">{title}</DialogHeader>
        <div className="flex min-h-96 justify-center pt-10">{children}</div>

        <DialogFooter>
          <DialogClose render={<Button>Cancel</Button>} />
          {buttonConfirm}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
