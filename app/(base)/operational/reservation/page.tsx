import { getReservation } from "./action"
import { GroupedDataTable } from "@/components/operational/reservation/reservation-data-table"
import { columns } from "@/components/operational/reservation/column"
import type { ReservationColumnType } from "@/components/operational/reservation/column"
import { groupBy } from "lodash-es"
import { Card } from "@/components/ui/card"

export default async function Reservation({
  searchParams,
}: {
  searchParams: Promise<{ checkin: string; checkout: string }>
}) {
  const { checkin, checkout } = await searchParams
  const reservationData = await getReservation(checkin, checkout)

  const groupByDate = groupBy(reservationData, "checkIn")

  /**
   * date atau label group per-tanggal dibuat jadi objek yang selevel dengan data reservasinya, jadi satu array
   * karena tanstack tabel ga bisa grouping, kyak sticky header per-rownya.
   * jadinya isi objek group nya, cuma ada key value date, eg : [{date : yyyy-mm-dd},{...item reservasi}]
   * @returns
   */
  const flattenData = Object.keys(groupByDate).reduce<Record<string, unknown>[]>(
    (acc, key) => {
      acc.push({ date: key })

      groupByDate[key].map((item) => {
        acc.push(item)
      })

      return acc
    },

    []
  )

  return (
    <>
      <Card className="flex flex-col p-3">
        <GroupedDataTable data={flattenData} columns={columns}></GroupedDataTable>
      </Card>
    </>
  )
}
