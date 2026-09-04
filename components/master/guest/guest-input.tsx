"use client"

import React, { useState, useEffect, useActionState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogClose, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { showGuest, createGuest, editGuest } from "@/app/(base)/master/guest/action"
import { guestValidation } from "@/lib/validations/guest-validation"
import { Prefix, IdentificationType } from "@/generated/prisma/enums"

import { GuestType } from "@/lib/validations/guest-validation"
import { useUpdateDifferences } from "@/hooks/use-update-differences"
import { toastSuccess, toastError } from "@/components/toast-status"
import { Spinner } from "@/components/ui/spinner"
import { MoveRightIcon } from "lucide-react"
import InputField from "@/components/input-field"
import SelectField from "@/components/select-field"

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
          {dialogState.action === "edit" && (
            <EditField id={dialogState.id ?? ""} onStateChange={() => onStateChange()} />
          )}
          {dialogState.action === "create" && <CreateField onStateChange={() => onStateChange()} />}

          {dialogState.action === "delete" && <DeleteField id={dialogState.id ?? ""} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

type FieldFormProps = {
  actionSubmit?: () => void
  data: GuestType
  onChangeData: (e: GuestType) => void
}

function FieldForm({ data, onChangeData }: FieldFormProps) {
  const idTypeItems = [
    { value: IdentificationType.ktp, label: "KTP" },
    { value: IdentificationType.passport, label: "Passport" },
  ]
  const prefixItems = [
    { value: Prefix.Mr, label: "Mr" },
    { value: Prefix.Ms, label: "Ms" },
    { value: Prefix.Mrs, label: "Mrs" },
  ]
  return (
    <>
      <div className="flex flex-col gap-10 px-5 py-5">
        <div className="grid grid-cols-12 gap-5">
          {/* Prefix */}

          <SelectField
            label="Prefix"
            className="col-span-4"
            value={data.prefix}
            onValueChange={(e) => onChangeData({ ...data, prefix: e })}
            name="prefix"
            selectItems={prefixItems}
          />

          {/* Guest Name */}
          <InputField
            className="col-span-8"
            label="name"
            inputName="name"
            value={data.name}
            onChange={(e) => onChangeData({ ...data, name: e.target.value })}
          ></InputField>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* ID Type */}
          <SelectField
            label="ID Type"
            className="col-span-4"
            value={data.identificationType}
            onValueChange={(e) => onChangeData({ ...data, identificationType: e })}
            name="identificationType"
            selectItems={idTypeItems}
          />

          {/* ID Number */}
          <InputField
            className="col-span-8"
            label="ID numbers"
            inputName="identificationNumber"
            value={data.identificationNumber}
            onChange={(e) => onChangeData({ ...data, identificationNumber: e.target.value })}
          ></InputField>
        </div>

        {/* Phone */}
        <InputField
          className="col-span-8"
          label="Phones"
          inputName="identificationNumber"
          value={data.phone}
          onChange={(e) => onChangeData({ ...data, phone: e.target.value })}
        ></InputField>
      </div>
    </>
  )
}

function CreateField({ onStateChange }: { onStateChange: () => void }) {
  const [state, formAction, isPending] = useActionState(createGuest, {
    success: false,
    action: "",
    error: "",
  })

  const [formValues, setformValues] = useState<GuestType>({
    id: "", // di action create sebenarnya ga pake id. ini di inisiasi buat nyenengin type safety aj
    prefix: "",
    name: "",
    phone: "",
    identificationNumber: "",
    identificationType: "",
  })

  useEffect(() => {
    if (state.success) {
      toastSuccess("Success", state.action === "create" ? "Guest Data Created" : "Guest Data Updated")
      return onStateChange()
    }
    if (state.error) toastError("Error", state.error ?? "Error")
  }, [state, onStateChange])

  function handleSubmit() {
    const result = guestValidation.safeParse(formValues)

    if (!result.success) {
      const err = result.error.issues[0].message
      return toastError("Error", err)
    }
    formAction(formValues)
  }

  return (
    <>
      <DialogHeader className="text-lg">Create Guest</DialogHeader>
      <form id="guest-form" action={handleSubmit}>
        <FieldForm data={formValues} onChangeData={setformValues}></FieldForm>
      </form>
      <DialogFooter>
        <DialogClose render={<Button>Cancel</Button>}></DialogClose>

        <Button type="submit" form="guest-form" disabled={isPending}>
          {isPending && <Spinner />}
          Create
        </Button>
      </DialogFooter>
    </>
  )
}

function EditField({ id, onStateChange }: { id: string; onStateChange: () => void }) {
  const [state, formAction, isPending] = useActionState(editGuest, {
    success: false,
    action: "",
    error: "",
  })

  const [initialFormValues, setInitialFormValues] = useState<GuestType | null>(null)

  const [formValues, setFormValues] = useState<GuestType>({
    id: "",
    prefix: "",
    name: "",
    phone: "",
    identificationNumber: "",
    identificationType: "",
  })

  const updateDiff = useUpdateDifferences(initialFormValues, formValues)

  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)

  useEffect(() => {
    if (state.success) {
      toastSuccess("Success", "Guest Data Updated")
      return onStateChange()
    }
    if (state.error) return toastError("Error", state.error ?? "Error")

    async function fetchGuest() {
      const data = id ? await showGuest(id) : null
      if (data) {
        setInitialFormValues(data)
        setFormValues(data)
      }
    }

    fetchGuest()
  }, [id, state, onStateChange])

  // Ini supaya field name di dialog confirm guest key nya rapi
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
    const result = guestValidation.safeParse(formValues)

    if (!result.success) {
      const err = result.error.issues[0].message
      return toastError("Error", err)
    }
    formAction(formValues)
  }

  return (
    <>
      <DialogHeader className="text-lg">Edit Guest Data</DialogHeader>
      <form id="guest-form" action={handleSubmit}>
        <FieldForm data={formValues} onChangeData={setFormValues}></FieldForm>
      </form>
      <DialogFooter>
        <DialogClose render={<Button>Cancel</Button>}></DialogClose>

        <Button onClick={() => setConfirmDialog(true)} disabled={!updateDiff.isDiff}>
          Confirm
        </Button>
      </DialogFooter>
      {/* Confirm Dialog untuk action update */}
      <DialogConfirm
        disableTrigger={!updateDiff.isDiff}
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
        <div className="flex w-full flex-col gap-3 rounded-t-xl border">
          <div className="grid w-full grid-cols-12 rounded-t-xl bg-muted/90 py-2 text-foreground">
            <span className="col-span-3 text-center font-bold">Field</span>
            <span className="col-span-3 text-center font-bold">Before</span>
            <span className="col-span-3"></span>
            <span className="col-span-3 text-center font-bold">After</span>
          </div>

          {initialFormValues &&
            Object.keys(updateDiff.changedValue).map((k, i) => (
              <div key={i} className="grid w-full grid-cols-12 border-b pb-2">
                <span className="col-span-3 text-center font-bold">{makeGuestKeyReadable(k)}</span>
                <span className="col-span-3 text-center">{initialFormValues[k as keyof GuestType]}</span>
                <span className="col-span-3 flex justify-center text-center">
                  <MoveRightIcon />
                </span>
                <span className="col-span-3 text-center">{formValues[k as keyof GuestType]}</span>
              </div>
            ))}
        </div>
      </DialogConfirm>
    </>
  )
}

// ===============================================================================

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
        <DialogHeader className="text-xl font-bold">{title}</DialogHeader>
        <div className="flex min-h-48 justify-center pt-5">{children}</div>

        <DialogFooter>
          <DialogClose render={<Button>Cancel</Button>} />
          {buttonConfirm}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
