"use client"
import { useState, useEffect } from "react"
import { searchGuestByName } from "@/app/(base)/master/guest/action"
import { useFilterParam } from "@/hooks/use-filterParam"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// import {
//   Combobox,
//   ComboboxContent,
//   ComboboxEmpty,
//   ComboboxInput,
//   ComboboxItem,
//   ComboboxList,
// } from "@/components/ui/combobox"
// import { countryList } from "@/lib/coutry_list"
// import { SearchIcon } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import { ActivationStatus } from "@/generated/prisma/enums"
import { GuestType } from "@/lib/types"

const statusItem = [
  { label: "All", value: null },
  { label: "Active", value: ActivationStatus.active },
  { label: "Non-active", value: ActivationStatus.nonactive },
]

export default function ExtraChargeFilter() {
  const [guestSearch, setGuestSearch] = useState<string>("")

  const [data, setData] = useState<Pick<GuestType, "name">[] | undefined>([])

  const [isLoading, setLoading] = useState(false)

  const filterParam = useFilterParam()

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const x = guestSearch === "" ? [] : await searchGuestByName(guestSearch)
        if (x !== undefined) setData(x)
      } catch (error) {
        console.log("error : ", error)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [guestSearch])

  function handleSearchGuestValueChange(e: string) {
    setGuestSearch(e)
    setLoading(true)
  }

  return (
    <div className="flex justify-end gap-5">
      {/* Search Guest */}
      {/* <Field className="w-fit">
        <FieldLabel className="text-[.8rem]">Search Guest</FieldLabel>

        <Combobox
          onInputValueChange={(e) => handleSearchGuestValueChange(e)}
          items={data ?? []}
          defaultValue={""}
          autoHighlight
        >
          <ComboboxInput className="flex justify-start!" showTrigger={false} placeholder="Search guest...">
            <SearchIcon size={15}></SearchIcon>
          </ComboboxInput>
          <ComboboxContent>
            {isLoading ? (
              <ComboboxEmpty>Searching...</ComboboxEmpty>
            ) : (
              data?.length === 0 && <ComboboxEmpty>No guest found</ComboboxEmpty>
            )}

            <ComboboxList>
              {(item, i) => (
                <ComboboxItem key={i} value={item.name}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field> */}

      {/* Filter Activation Status */}
      <Field className="w-36">
        <FieldLabel htmlFor="align-item" className="text-[.8rem] whitespace-nowrap">
          Status
        </FieldLabel>
        <Select
          items={statusItem}
          onValueChange={(item) => filterParam.set("status", item)}
          value={
            // sinkronisasi value dari select status dengan query param status
            statusItem.find((item) => item.value === filterParam.get("status"))?.value
          }
        >
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {statusItem.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}
