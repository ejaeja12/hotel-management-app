import { webcrypto as crypto } from "crypto"

function randomHex(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
}

export function generateId(prefix: string): string {
  const date = new Date().getTime()
  return `${prefix}-${randomHex(8)}${date}`
}
