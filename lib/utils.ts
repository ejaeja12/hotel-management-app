import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function getStartOfDay(par: number = 0) {
  const date = new Date()
  date.setDate(date.getDate() + par)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

export function getEndOfDay(par: number = 0) {
  const date = new Date()
  date.setDate(date.getDate() + par)
  date.setHours(23, 59, 59, 999)
  return date.toISOString()
}

export function getYesterdayDate() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" })
}

export function getTomorrowDate() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" })
}
