import AppHeader from "@/components/app-header"
import { Separator } from "@/components/ui/separator"

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppHeader></AppHeader>
      <Separator
        orientation="horizontal"
        className={"border border-b-foreground"}
      ></Separator>
      <div className="mt-below-header w-full">{children}</div>
    </>
  )
}
