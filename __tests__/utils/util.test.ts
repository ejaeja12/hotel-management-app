import { expect, test, vi } from "vitest"

test("adds 1 + 2 to equal 3", () => {
  const sum = vi.fn((a, b) => a + b)

  expect(sum(1, 2)).toBe(3)
})
