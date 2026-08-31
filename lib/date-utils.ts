export function getDateWib(par: number = 0) {
  const date = new Date()
  date.setDate(date.getDate() + par)
  return date.toISOString()
}

export function getDate(par: number = 0) {
  const date = new Date()
  date.setDate(date.getDate() + par)

  return date.toISOString()
}

export function getDateOnly(par: number = 0) {
  const date = new Date()
  date.setDate(date.getDate() + par)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

export function getStartOfDay(par: string = "") {
  const date = new Date(par)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

export function getEndOfDay(par: string = "") {
  const fallBack = new Date()
  fallBack.setUTCHours(16, 59, 59, 999)

  const date = new Date(par)
  if (date.toString() === "Invalid Date") return fallBack.toISOString()
  date.setUTCHours(16, 59, 59, 999)
  return date.toISOString()
}

export function getYesterdayDate() {
  const date = new Date()
  date.setDate(date.getDate() - 2)
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" })
}

export function getTomorrowDate() {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" })
}
