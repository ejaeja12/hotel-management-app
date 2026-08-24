import { generateId } from "@/lib/id-generator"

function setId() {
  return generateId("EXC")
}

export const extraChargeData = [
  {
    id: setId(),
    name: "Extra Bed",
    price: 200000,
  },
  {
    id: setId(),
    name: "Air Port",
    price: 150000,
  },
  {
    id: setId(),
    name: "Break Fast",
    price: 75000,
  },
]
