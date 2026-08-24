import { generateId } from "@/lib/id-generator"

function setId() {
  return generateId("BOK")
}

export const bookingTypeData = [
  { id: setId(), name: "Traveloka" },
  { id: setId(), name: "Agoda" },
  { id: setId(), name: "walk-in" },
]
