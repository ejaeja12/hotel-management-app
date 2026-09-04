import { getExtraCharge } from "./action"
import ExtraChargeContainer from "@/components/master/extracharge/extra-charge-container"

export default async function ExtraChargePage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams
  const result = await getExtraCharge(page)

  return (
    <div className="flex w-full justify-center">
      <ExtraChargeContainer className="w-full" data={result}></ExtraChargeContainer>
    </div>
  )
}
