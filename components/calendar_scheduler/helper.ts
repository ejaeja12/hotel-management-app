import { DayPilot } from "@daypilot/daypilot-lite-react"

type Room = {
  id: string
  name?: string
}

type RoomTypeWithRoom = {
  id: string
  name: string
  color?: string
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

const colorSchedule = {
  BLUE: "#2563EB",
  GREEN: "#46a142",
  PURPLE: "#7C3AED",
  RED: "#DC2626",
  ORANGE: "#EA580C",
  YELLOW: "#ffd200",
}

enum reservationStatus {
  RESERVE = "reserve",
  CANCEL = "cancel",
  CHECKIN = "checkin",
  CHECKOUT = "checkout",
  INHOUSE = "inhouse",
  ALREADY_CHECKOUT = "already_checkout",
}

function setColorSchedule(status: string): string {
  switch (status) {
    case reservationStatus.RESERVE:
      return colorSchedule.GREEN
    case reservationStatus.CANCEL:
      return colorSchedule.RED
    case reservationStatus.CHECKIN:
      return colorSchedule.BLUE
    case reservationStatus.CHECKOUT:
      return colorSchedule.ORANGE
    case reservationStatus.ALREADY_CHECKOUT:
      return colorSchedule.PURPLE
    case reservationStatus.INHOUSE:
      return colorSchedule.YELLOW
    default:
      return colorSchedule.BLUE
  }
}

function setTextColor(status: string) {
  switch (status) {
    case reservationStatus.INHOUSE:
      return "text-slate-700"

    default:
      return "text-white"
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
      backColor: item.color,
      html: `<div class='font-bold text-lg  w-40   text-center'>
                <span class=''>${item.name}</span>
            </div>`,
    }

    const rooms = item.room.map((room) => {
      return {
        name: room.name !== undefined ? room.name : room.id,
        id: room.id,
        html: `<div class=' w-40   text-center'>
                <span  >${room.name}</span>
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
      text: `${res.guest} - ${res.status}`,
      start: res.start,
      end: res.end,
      html: `<div class=${setTextColor(res.status)}>${res.guest} - ${res.status}</div>`,
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
    color: colorSchedule.RED,
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
    color: colorSchedule.GREEN,
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
    color: colorSchedule.PURPLE,
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
    color: colorSchedule.BLUE,
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
    guest: "Mr. Udin",
    status: reservationStatus.CHECKIN,
    start: sampleStart,
    end: sampleStart.addDays(3),
    room: {
      id: dummyRoom.DEL_01.id,
    },
  },
  {
    id: "050256",
    guest: "Ms. Jane Doe",
    status: reservationStatus.INHOUSE,
    start: sampleStart.addDays(-1),
    end: sampleStart.addDays(1),
    room: {
      id: dummyRoom.DEL_02.id,
    },
  },
  {
    id: "0501513",
    guest: "Ms. Anna Koe",
    status: reservationStatus.CHECKOUT,
    start: sampleStart.addDays(-4),
    end: sampleStart.addHours(12),
    room: {
      id: dummyRoom.SDL_01.id,
    },
  },
  {
    id: "0501511",
    guest: "Mr. Armin Artlert",
    status: reservationStatus.RESERVE,
    start: sampleStart.addDays(1).addHours(12),
    end: sampleStart.addDays(4),
    room: {
      id: dummyRoom.SDL_01.id,
    },
  },
  {
    id: "0584579",
    guest: "Mr. Bark Barker",
    status: reservationStatus.INHOUSE,
    start: sampleStart.addDays(-3),
    end: sampleStart.addDays(1),
    room: {
      id: dummyRoom.SDL_03.id,
    },
  },
  {
    id: "05865456",
    guest: "Mr. Alan robertsoon",
    status: reservationStatus.ALREADY_CHECKOUT,
    start: sampleStart.addDays(-6),
    end: sampleStart.addDays(-2),
    room: {
      id: dummyRoom.DBL_02.id,
    },
  },
  {
    id: "058616",
    guest: "Mrs. Anne Nicole",
    status: reservationStatus.CANCEL,
    start: sampleStart.addDays(-8),
    end: sampleStart.addDays(-4),
    room: {
      id: dummyRoom.DEL_03.id,
    },
  },
]
