"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"

/**
 *
 * set key dan value url filter / query param.
 * kalau value null, remove key dari url
 */
export function useFilterParam() {
  const router = useRouter()
  const param = new URLSearchParams(useSearchParams().toString())
  const pathName = usePathname()

  function set(key: string, val: string | number | null) {
    if (val === "" || val === null) param.delete(key)
    else param.set(key, val.toString())
    router.replace(`${pathName}?${param.toString()}`)
  }

  function has(key: string) {
    return param.has(key)
  }

  function get(key: string) {
    return param.get(key)
  }

  function remove(key: string) {
    param.delete(key)
    router.replace(`${pathName}?${param.toString()}`)
  }

  return { set, has, get, remove }
}
