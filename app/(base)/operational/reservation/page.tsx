import { getReservation } from "@/actions/operational/reservation/reservation"
import { GroupedDataTable } from "@/components/operational/reservation/reservation-data-table"
import { columns } from "@/components/operational/reservation/column"
import type { ReservationColumnType } from "@/components/operational/reservation/column"

export default async function Reservation() {
  const reservationData = await getReservation()
  // console.log("data reservation :", reservationData)
  // console.log("get date time : ", getDate(-2))

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
  // console.log(ss())
  return (
    <>
      <div className="flex flex-col">
        <GroupedDataTable
          data={flatenReservationData()}
          columns={columns}
        ></GroupedDataTable>
      </div>
    </>
  )
}
