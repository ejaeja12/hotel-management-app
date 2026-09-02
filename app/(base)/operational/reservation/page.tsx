import { getReservation } from "./action"
import { GroupedDataTable } from "@/components/operational/reservation/reservation-data-table"
import { columns } from "@/components/operational/reservation/column"
import type { ReservationColumnType } from "@/components/operational/reservation/column"
import { Card } from "@/components/ui/card"

export default async function Reservation({
  searchParams,
}: {
  searchParams: Promise<{ checkin: string; checkout: string }>
}) {
  const { checkin, checkout } = await searchParams
  const reservationData = await getReservation(checkin, checkout)

  /**
   * date atau label group per-tanggal dibuat jadi objek yang selevel dengan data reservasinya, jadi satu array
   * karena tanstack tabel ga bisa grouping, kyak sticky header per-rownya.
   * jadinya isi objek group nya, cuma ada key value date, eg : [{date : yyyy-mm-dd},{...item reservasi}]
   * @returns
   */
  function flatenReservationData() {
    const result: ReservationColumnType[] = []
    reservationData.map((res) => {
      result.push({
        date: res.date,
      })

      res.reservation.map((x) =>
        result.push({
          ...x,
        })
      )
    })
    return result
  }

  return (
    <>
      <Card className="flex flex-col p-3">
        <GroupedDataTable
          data={flatenReservationData()}
          columns={columns}
        ></GroupedDataTable>
      </Card>
    </>
  )
}
