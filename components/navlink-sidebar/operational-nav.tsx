"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon } from "lucide-react"
import { getYesterdayDate, getTomorrowDate } from "@/lib/utils"

const data = [
  {
    title: "Dashboard",
    url: "/operational/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Reservation",
    url: `/operational/reservation?checkin=${getYesterdayDate()}&checkout=${getTomorrowDate()}`,
    icon: <ListIcon />,
  },
]

export function OperationalNav() {
  const pathName = usePathname()

  return (
    <SidebarGroup className="w-fit">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2"></SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="flex flex-col gap-1">
          {data.map((item) => (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathName.split("?")[0] === item.url.split("?")[0]}
                  tooltip={item.title}
                  className="px-5!"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
