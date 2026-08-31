"use client"
import { useState, useEffect } from "react"
import { getGuestByName } from "@/actions/master/guest-action"
import { useFilterParam } from "@/hooks/use-filterParam"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { countryList } from "@/lib/coutry_list"
import { SearchIcon } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import { GuestType } from "@/lib/types"

const itemIdType = [
  { label: "All", value: null },
  { label: "KTP", value: "ktp" },
  { label: "Passport", value: "passport" },
]

export default function GuestFilter() {
  const [guestSearch, setGuestSearch] = useState<string>("")

  const [data, setData] = useState<Pick<GuestType, "name">[] | undefined>([])

  const [isLoading, setLoading] = useState(false)

  const filterParam = useFilterParam()

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const x = guestSearch === "" ? [] : await getGuestByName(guestSearch)
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

  function handleCountryFilterValueChange(e: (typeof countryList)[0] | null) {
    if (e === null) filterParam.remove("country")
    else filterParam.set("country", e.code)
  }

  return (
    <div className="flex justify-end gap-5">
      {/* Search Guest */}
      <Field className="w-fit">
        <FieldLabel className="text-[.8rem]">Search Guest</FieldLabel>

        <Combobox
          onInputValueChange={(e) => handleSearchGuestValueChange(e)}
          items={data ?? []}
          defaultValue={""}
          autoHighlight
        >
          <ComboboxInput
            className="flex justify-start!"
            showTrigger={false}
            placeholder="Search guest..."
          >
            <SearchIcon size={15}></SearchIcon>
          </ComboboxInput>
          <ComboboxContent>
            {isLoading ? (
              <ComboboxEmpty>Searching...</ComboboxEmpty>
            ) : (
              data?.length === 0 && (
                <ComboboxEmpty>No guest found</ComboboxEmpty>
              )
            )}

            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.name} value={item.name}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>

      {/* Filter Identification Type */}
      <Field className="w-36">
        <FieldLabel
          htmlFor="align-item"
          className="text-[.8rem] whitespace-nowrap"
        >
          Identification Type
        </FieldLabel>
        <Select
          items={itemIdType}
          onValueChange={(item) => filterParam.set("idType", item)}
          value={
            // cek apakah value dari param idType, ada dalam itemIdType, klo gak ada return null
            itemIdType.find((item) => item.value === filterParam.get("idType"))
              ?.value
          }
        >
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {itemIdType.map((item) => (
                <SelectItem
                  // onClick={() => filterParam.set("idType", item.value)}
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {/* Filter Country List */}
      <Field className="w-40">
        <FieldLabel className="text-[.8rem]">Nationality</FieldLabel>
        <Combobox
          items={countryList}
          onValueChange={(item) => handleCountryFilterValueChange(item)}
          value={
            countryList.find(
              (item) => item.code === filterParam.get("country")
            ) ?? null
          }
          itemToStringLabel={(country: (typeof countryList)[number]) =>
            country.name
          }

          autoHighlight
        >
          <ComboboxInput
            placeholder="Select Country"
            showTrigger={false}
            showClear
          ></ComboboxInput>
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.code} value={item}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}
