import { isEqual } from "lodash-es"

export function useUpdateDifferences<T extends Record<string, unknown>>(
  initialValue: Partial<T> | null,
  currentValue: T
) {
  const changedValue = (Object.keys(currentValue) as Array<keyof T>).reduce((acc, key) => {
    if (!isEqual(currentValue[key], initialValue?.[key])) {
      acc[key] = currentValue[key]
    }
    return acc
  }, {} as Partial<T>)

  const isDiff = Object.keys(changedValue).length > 0

  return { changedValue, isDiff }
}
