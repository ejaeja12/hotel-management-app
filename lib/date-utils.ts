export function getDate(par: number = 0) {
  const date = new Date()
  date.setDate(date.getDate() + par)

  return date.toISOString()
}

// export function getDateOnly(par: number = 0) {
//   const date = new Date()
//   date.setDate(date.getDate() + par)
//   date.setHours(0, 0, 0, 0)
//   return date.toISOString()
// }

export function getStartOfDay(par: string = "") {
  const date = new Date(par)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

export function getEndOfDay(par: string = "") {
  const fallBack = new Date()
  fallBack.setHours(23, 59, 59, 999)

  const date = new Date(par)
  if (date.toString() === "Invalid Date") return fallBack.toISOString()
  date.setHours(23, 59, 59, 999)
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

export function dateSeeder(par: number = 0) {
  const date = new Date()
  const sevenHoursInMs = 17 * 60 * 60 * 1000
  const resultDate = new Date(date.getTime() - sevenHoursInMs)
  resultDate.setUTCDate(resultDate.getUTCDate() + par)
  resultDate.setUTCHours(17, 0, 0, 0)

  return resultDate.toISOString()
}

export function tesGetDate() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 0)

  return date.toISOString()
}
