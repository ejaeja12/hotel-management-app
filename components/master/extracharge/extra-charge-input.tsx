"use client"

import React, { useState, useEffect, useActionState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogClose, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { showGuest, createGuest, editGuest } from "@/app/(base)/master/guest/action"
import { createExtraCharge, showExtraCharge, editExtraCharge } from "@/app/(base)/master/extracharge/action"
import { ExtraChargeType, extraChargeValidation } from "@/lib/validations/extra-charge-validation"
import InputCurrency from "@/components/input-currency"
import { ActivationStatus } from "@/generated/prisma/enums"
import { useUpdateDifferences } from "@/hooks/use-update-differences"
import { toastSuccess, toastError } from "@/components/toast-status"
import { Spinner } from "@/components/ui/spinner"
import SelectField from "@/components/select-field"
import InputField from "@/components/input-field"
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
export default function ExtraChargeInput({ dialogState, onStateChange = () => {} }: Props) {
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
  data: ExtraChargeType
  onChangeData: (e: ExtraChargeType) => void
}

function FieldForm({ data, onChangeData }: FieldFormProps) {
  const statusActivationItems = [
    { value: ActivationStatus.active, label: "Active" },
    { value: ActivationStatus.nonactive, label: "Non Active" },
  ]

  return (
    <>
      <div className="flex flex-col gap-10 px-5 py-5">
        <div className="grid grid-cols-12 gap-5">
          {/* Name*/}

          <InputField
            className="col-span-8"
            label="name"
            inputName="name"
            value={data.name}
            onChange={(e) => onChangeData({ ...data, name: e.target.value })}
          ></InputField>

          {/* Status */}
          <SelectField
            label="Prefix"
            className="col-span-4"
            value={data.status}
            onValueChange={(e) => onChangeData({ ...data, status: e as ActivationStatus })}
            name="prefix"
            selectItems={statusActivationItems}
          />
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* price */}
          <InputCurrency
            className="col-span-12"
            label="price"
            displayValue={data.price}
            handleInput={(e) => onChangeData({ ...data, price: Number(e) })}
          ></InputCurrency>
        </div>
      </div>
    </>
  )
}

function CreateField({ onStateChange }: { onStateChange: () => void }) {
  const [state, formAction, isPending] = useActionState(createExtraCharge, {
    success: false,
    action: "",
    error: "",
  })

  const [formValues, setformValues] = useState<ExtraChargeType>({
    id: "", // di action create sebenarnya ga pake id. ini di inisiasi buat nyenengin type safety aj

    name: "",
    price: 0,
    status: "" as ActivationStatus,
  })

  useEffect(() => {
    if (state.success) {
      toastSuccess("Success", state.action === "create" ? "Guest Data Created" : "Guest Data Updated")
      return onStateChange()
    }
    if (state.error) toastError("Error", state.error ?? "Error")
  }, [state, onStateChange])

  function handleSubmit() {
    const result = extraChargeValidation.safeParse(formValues)

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
  const [state, formAction, isPending] = useActionState(editExtraCharge, {
    success: false,
    action: "",
    error: "",
  })

  const [initialFormValues, setInitialFormValues] = useState<ExtraChargeType | null>(null)

  const [formValues, setformValues] = useState<ExtraChargeType>({
    id: "",
    name: "",
    price: 0,
    status: "" as ActivationStatus,
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
      const extraChargeData = id ? await showExtraCharge(id) : null
      if (extraChargeData) {
        setInitialFormValues(extraChargeData)
        setformValues(extraChargeData)
      }
    }

    fetchGuest()
  }, [id, state, onStateChange])

  // Ini supaya di dialog confirm guest key nya rapi
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
    const result = extraChargeValidation.safeParse(formValues)

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
        <FieldForm data={formValues} onChangeData={setformValues}></FieldForm>
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
                <span className="col-span-3 text-center">{initialFormValues[k as keyof ExtraChargeType]}</span>
                <span className="col-span-3 flex justify-center text-center">
                  <MoveRightIcon />
                </span>
                <span className="col-span-3 text-center">{formValues[k as keyof ExtraChargeType]}</span>
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
