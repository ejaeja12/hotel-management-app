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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  LayoutDashboardIcon,
  ListIcon,
  SquareTerminal,
  ChevronRight,
} from "lucide-react"
import { getYesterdayDate, getTomorrowDate } from "@/lib/utils"

const data = {
  main: [
    {
      title: "Guest",
      url: "/master/guest",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Extra Charge",
      url: "/master/extracharge",
      icon: <ListIcon />,
    },
  ],
  room: {
    title: "Room",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Room Type",
        url: "/master/room/room-type",
        icon: <LayoutDashboardIcon />,
      },
      {
        title: "Rooms",
        url: "/master/room/rooms",
        icon: <LayoutDashboardIcon />,
      },
    ],
  },
}

export function MasterNav() {
  const pathName = usePathname()

  return (
    <SidebarGroup className="w-fit">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2"></SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="flex flex-col gap-1">
          {data.main.map((item) => (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathName === item.url}
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

        {/* ================== */}

        <SidebarMenu className="w-full">
          <Collapsible
            key={data.room.title}
            defaultOpen={data.room.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton tooltip={data.room.title} className="px-5">
                    {/* {data.room.icon && <item.icon />} */}
                    <data.room.icon />
                    <span>{data.room.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                  </SidebarMenuButton>
                }
              ></CollapsibleTrigger>
              <CollapsibleContent
                render={
                  <SidebarMenuSub className="pr-0 pl-5">
                    {data.room.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          isActive={pathName === subItem.url}

                          render={
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          }
                        ></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                }
              ></CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
