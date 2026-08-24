import { IdentificationType, Prefix } from "@/generated/prisma/enums"
import { generateId } from "@/lib/id-generator"

function setId() {
  return generateId("GST")
}

export const guestData = [
  {
    id: setId(),
    name: "Jhon Doe",
    prefix: Prefix.Mr,
    identificationType: IdentificationType.ktp,
    identificationNumber: "123456789",
    phone: "123456789",
  },
  {
    id: setId(),
    name: "Roxane doe",
    prefix: Prefix.Mrs,
    identificationType: IdentificationType.passport,
    identificationNumber: "123456789",
    phone: "123456789",
  },
  {
    id: setId(),
    name: "Jane Doe",
    prefix: Prefix.Ms,
    identificationType: IdentificationType.ktp,
    identificationNumber: "123456789",
    phone: "123456789",
  },
]
