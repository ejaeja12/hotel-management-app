import { IdentificationType, Prefix } from "@/generated/prisma/enums"

export const guestData = [
  {
    id: "1DCscsC-SDC12s",
    name: "Jhon Doe",
    prefix: Prefix.Mr,
    identificationType: IdentificationType.ktp,
    identificationNumber: "123456789",
    phone: "123456789",
  },
  {
    id: "VSvsV23-sC123HT",
    name: "Roxane doe",
    prefix: Prefix.Mrs,
    identificationType: IdentificationType.passport,
    identificationNumber: "123456789",
    phone: "123456789",
  },
  {
    id: "CD123S1DS-CD1DCA",
    name: "Jane Doe",
    prefix: Prefix.Ms,
    identificationType: IdentificationType.ktp,
    identificationNumber: "123456789",
    phone: "123456789",
  },
]
