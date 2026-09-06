import { useState } from "react"
import { Field, FieldLabel, FieldContent } from "./ui/field"
import { Input } from "./ui/input"
import { HexColorPicker } from "react-colorful"
import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  className?: string
  label?: string
  onChangeValue?: (color: string) => void
  value?: string
}
export default function ColorPicker({ className = "", label = "", onChangeValue = () => {}, value = "" }: Props) {
  const [popOverState, setPopOverState] = useState(false)
  return (
    <>
      <Field className={`${className}`}>
        <FieldLabel>{label}</FieldLabel>
        <FieldContent className="flex h-full w-full justify-center">
          <Popover open={popOverState} onOpenChange={() => setPopOverState(!popOverState)}>
            <PopoverTrigger>
              {" "}
              <Input style={{ backgroundColor: `${value}` }} className="border border-foreground" readOnly></Input>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <HexColorPicker color={value} onChange={onChangeValue} />
              <Button onClick={() => setPopOverState(false)}>Select Color</Button>
            </PopoverContent>
          </Popover>
        </FieldContent>
      </Field>
    </>
  )
}
