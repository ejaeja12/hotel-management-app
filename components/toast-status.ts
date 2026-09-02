import { toast } from "@/components/ui/toast"

export function toastSuccess(title: string = "", desc: string = "") {
  toast.add({
    title: title,
    description: desc,
    type: '{"bodyClass" : "bg-green-600", "titleClass" : "text-white", "descClass" : "text-white" } | success',
  })
}

export function toastError(title: string = "", desc: string = "") {
  toast.add({
    title: title,
    description: desc,
    type: '{"bodyClass" : "bg-red-600", "titleClass" : "text-white", "descClass" : "text-white" } | error',
  })
}
