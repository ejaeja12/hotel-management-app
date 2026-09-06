import { prismaMock } from "../prisma-mock" //
import { describe, it, expect } from "vitest"
import { getGuestService } from "@/lib/services/guest-service"

describe("guestService", () => {
  it("harus mengembalikan data guest", async () => {
    // Tentukan nilai kembalian mock
    prismaMock.guest.findMany.mockResolvedValue([])
    prismaMock.guest.count.mockResolvedValue(0)

    const result = await getGuestService("", "iks")
    expect(result.data).toEqual([])
  })
})
