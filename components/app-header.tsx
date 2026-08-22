"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import UserNav from "./user-nav"

const navUrl = [
  {
    url: "/calendar",
    label: "Calendar",
  },
  {
    url: "/operational/dashboard",
    label: "Operational",
  },
  {
    url: "/#",
    label: "Master Data",
  },
  {
    url: "/#",
    label: "Report",
  },
]
export default function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-30 flex h-nav-header w-full bg-header">
      {/* nav */}
      <div className="flex w-full justify-start bg-header text-text-header">
        {navUrl.map((item, index) => {
          const prefix = "/" + item.url.split("/")[1]
          const isActive = pathname.startsWith(prefix)

          return (
            <Link href={item.url} key={index}>
              <Button
                className={`h-full! w-32 rounded-none bg-header text-text-header hover:bg-button-header/70 ${isActive && "bg-button-header/50"}`}
              >
                {item.label}
              </Button>
            </Link>
          )
        })}
      </div>
      {/* user */}
      <div className="row-span-2 flex w-full items-center justify-end bg-header px-8 py-2">
        <UserNav></UserNav>
      </div>
    </header>
  )
}
