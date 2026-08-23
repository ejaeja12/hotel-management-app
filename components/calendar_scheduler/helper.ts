import { DayPilot } from "@daypilot/daypilot-lite-react"

type Room = {
  id: string
  name?: string
}

type RoomTypeWithRoom = {
  id: string
  name: string
  room: Room[]
}

type ResourceScheduler = {
  name: string
  id: string
  backColor?: string
  html?: string
}

type Reservation = {
  id: string
  guest: string
  status: string
  start: DayPilot.Date | string
  end: DayPilot.Date | string
  room: Room
}

// type eventData = {
//   id: string
//   text: string
//   start: DayPilot.Date | Date
//   end: DayPilot.Date | Date
//   resource: string
//   backColor: string
// }

const colorSchedule = {
  BLUE: "#2563EB",
  GREEN: "#059669",
  PURPLE: "#7C3AED",
  RED: "#DC2626",
  ORANGE: "#EA580C",
}

enum reservationStatus {
  RESERVE = "reserve",
  CANCEL = "cancel",
  CHECKIN = "checkin",
  CHECKOUT = "checkout",
}

function setColorSchedule(status: string): string {
  switch (status) {
    case reservationStatus.RESERVE:
      return colorSchedule.BLUE
    case reservationStatus.CANCEL:
      return colorSchedule.RED
    case reservationStatus.CHECKIN:
      return colorSchedule.GREEN
    case reservationStatus.CHECKOUT:
      return colorSchedule.ORANGE
    default:
      return colorSchedule.BLUE
  }
}

/**
 * fungsi untuk set row label tipe kamar dan nomor kamar yang letaknya kapa kolom paling kiri
 * hasilnya tidak ada objek bertingkat atau objek di dalam objek, semua nya objek selevel
 * @param res
 * @returns Array <ResourceScheduler>
 */
export function setResourceScheduler(
  res: Array<RoomTypeWithRoom>
): Array<ResourceScheduler> {
  const temp: Array<ResourceScheduler> = []
  res.map((item) => {
    const roomType = {
      name: item.name,
      id: item.id,
      backColor: "#2563EB",
      html: `<div class='font-bold text-lg  w-40   text-center'>
                <span>${item.name}</span>
            </div>`,
    }

    const rooms = item.room.map((room) => {
      return {
        name: room.name !== undefined ? room.name : room.id,
        id: room.id,
        html: `<div class=' w-40   text-center'>
                <span>${room.name}</span>
            </div>`,
      }
    })
    temp.push(roomType, ...rooms)
  })
  return temp
}

/**
 * fungsi untuk set buble reservasi yang berwarna sesuai status reservasi,
 * kenapa nama nya event data, karena biar sesuai sama dokumentasi daypilot
 *
 * @param arg
 * @returns Array <eventData>
 */

export function setEventData(
  arg: Array<Reservation>
): Array<DayPilot.EventData> {
  const result: Array<DayPilot.EventData> = []
  arg.map((res) => {
    const temp = {
      id: res.id,
      text: res.guest,
      start: res.start,
      end: res.end,
      resource: res.room.id,
      backColor: setColorSchedule(res.status),
    }
    result.push(temp)
  })
  return result
}

/**
 * ===========================================================================
 *                           Per dumy-an duniawi
 * ===========================================================================
 */

const dummyRoomType = {
  DELUXE: { id: "DEL", name: "Deluxe" },
  SUPERDELUXE: { id: "SDL", name: "Super Deluxe" },
  DOUBLE: { id: "DBL", name: "Double" },
  SUITE: { id: "SUIT", name: "Suite" },
}

const dummyRoom = {
  DEL_01: { id: "DEL-01", name: "Deluxe 01" },
  DEL_02: { id: "DEL-02", name: "Deluxe 02" },
  DEL_03: { id: "DEL-03", name: "Deluxe 03" },
  SDL_01: { id: "SDL-01", name: "Super Deluxe 01" },
  SDL_02: { id: "SDL-02", name: "Super Deluxe 02" },
  SDL_03: { id: "SDL-03", name: "Super Deluxe 03" },
  DBL_01: { id: "DBL-01", name: "Double 01" },
  DBL_02: { id: "DBL-02", name: "Double 02" },
  DBL_03: { id: "DBL-03", name: "Double 03" },
  SUIT_01: { id: "SUIT-01", name: "SUIT 01" },
  SUIT_02: { id: "SUIT-02", name: "SUIT 02" },
  SUIT_03: { id: "SUIT-03", name: "SUIT 03" },
}

export const dataTipeKamar = [
  {
    id: dummyRoomType.DELUXE.id,
    name: dummyRoomType.DELUXE.name,
    room: [
      {
        id: dummyRoom.DEL_01.id,
        name: dummyRoom.DEL_01.name,
      },
      {
        id: dummyRoom.DEL_02.id,
        name: dummyRoom.DEL_02.name,
      },
      {
        id: dummyRoom.DEL_03.id,
        name: dummyRoom.DEL_03.name,
      },
    ],
  },
  {
    id: dummyRoomType.SUPERDELUXE.id,
    name: dummyRoomType.SUPERDELUXE.name,
    room: [
      {
        id: dummyRoom.SDL_01.id,
        name: dummyRoom.SDL_01.name,
      },
      {
        id: dummyRoom.SDL_02.id,
        name: dummyRoom.SDL_02.name,
      },
      {
        id: dummyRoom.SDL_03.id,
        name: dummyRoom.SDL_03.name,
      },
    ],
  },
  {
    id: dummyRoomType.DOUBLE.id,
    name: dummyRoomType.DOUBLE.name,
    room: [
      {
        id: dummyRoom.DBL_01.id,
        name: dummyRoom.DBL_01.name,
      },
      {
        id: dummyRoom.DBL_02.id,
        name: dummyRoom.DBL_02.name,
      },
      {
        id: dummyRoom.DBL_03.id,
        name: dummyRoom.DBL_03.name,
      },
    ],
  },
  {
    id: dummyRoomType.SUITE.id,
    name: dummyRoomType.SUITE.name,
    room: [
      {
        id: dummyRoom.SUIT_01.id,
        name: dummyRoom.SUIT_01.name,
      },
      {
        id: dummyRoom.SUIT_02.id,
        name: dummyRoom.SUIT_02.name,
      },
      {
        id: dummyRoom.SUIT_03.id,
        name: dummyRoom.SUIT_03.name,
      },
    ],
  },
]
const sampleStart = DayPilot.Date.today()

export const dataReservasi = [
  {
    id: "050231",
    guest: "Udin",
    start: sampleStart,
    status: reservationStatus.CHECKIN,
    end: sampleStart.addDays(1),
    room: {
      id: dummyRoom.DEL_01.id,
    },
  },
  {
    id: "050256",
    guest: "Ms. Jane Doe",
    status: reservationStatus.RESERVE,
    start: sampleStart.addDays(-3),
    end: sampleStart.addDays(1),
    room: {
      id: dummyRoom.DEL_02.id,
    },
  },
  {
    id: "0501513",
    guest: "Ms. Anna Koe",
    status: reservationStatus.CHECKOUT,
    start: sampleStart.addDays(-3),
    end: sampleStart.addDays(1),
    room: {
      id: dummyRoom.SDL_01.id,
    },
  },
  {
    id: "0501511",
    guest: "Mr. Armin Artlert",
    status: reservationStatus.RESERVE,
    start: sampleStart.addDays(1),
    end: sampleStart.addDays(4),
    room: {
      id: dummyRoom.SDL_01.id,
    },
  },
]
