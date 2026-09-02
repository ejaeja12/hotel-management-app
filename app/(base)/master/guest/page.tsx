import { getGuest } from "./action"
import GuestContainer from "@/components/master/guest/guest-container"

export default async function GuestPage({
  searchParams,
}: {
  searchParams: Promise<{ idType: string; page: string }>
}) {
  const { idType, page } = await searchParams
  const result = await getGuest(idType, page)

  return (
    <div className="flex w-full justify-center">
      <GuestContainer className="w-full" data={result}></GuestContainer>
    </div>
  )
}
