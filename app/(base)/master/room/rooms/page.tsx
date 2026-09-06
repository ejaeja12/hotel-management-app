import { getRoom } from "./action"
import RoomContainer from "@/components/master/room/room-container"

export default async function ExtraChargePage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams
  const result = await getRoom(page)

  return (
    <div className="flex w-full justify-center">
      <RoomContainer className="w-full" data={result}></RoomContainer>
    </div>
  )
}
