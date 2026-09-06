import { getroomType } from "./action"
import RoomTypeContainer from "@/components/master/room-type/room-type-container"

export default async function ExtraChargePage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams
  const result = await getroomType(page)

  return (
    <div className="flex w-full justify-center">
      <RoomTypeContainer className="w-full" data={result}></RoomTypeContainer>
    </div>
  )
}
