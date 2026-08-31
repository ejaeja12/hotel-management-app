import { getGuest } from "@/actions/master/guest-action"
import GuestContainer from "@/components/master/guest/guest-container"

export default async function GuestPage({
  searchParams,
}: {
  searchParams: Promise<{ idType: string; page: string }>
}) {
  const { idType, page } = await searchParams
  const result = await getGuest(idType, page)
  console.log("Guests meta: ", result.meta)

  return (
    <div className="flex w-full justify-center">
      <GuestContainer className="w-full" data={result}></GuestContainer>
    </div>
  )
}
