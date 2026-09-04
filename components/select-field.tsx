import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

type SelectItemType = {
  value: string
  label: string
}

type Props = {
  className?: string
  value?: string
  label: string
  onValueChange: (value: string) => void
  name?: string
  selectItems?: SelectItemType[]
}

export default function SelectField({
  className = "",
  value,
  onValueChange = () => {},
  name,
  selectItems,
  label = "",
}: Props) {
  return (
    <>
      <Field className={`${className}`}>
        <FieldLabel>{label}</FieldLabel>
        <Select value={value} onValueChange={(e) => e && onValueChange(e)} name={name}>
          <SelectTrigger>
            <SelectValue placeholder="Select Prefix" />
          </SelectTrigger>
          {selectItems && (
            <SelectContent>
              {selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </Field>
    </>
  )
}
