import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MasterNav } from "@/components/navlink-sidebar/master-nav"

export default function OperationalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 44)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset">
          <MasterNav></MasterNav>
        </AppSidebar>
        <SidebarInset className="px-4 py-4 md:py-6 lg:px-6">{children}</SidebarInset>
      </SidebarProvider>
      {/* <SidebarLayout sidebar={AppSidebar({ variant: "inset" })}>
        {children}
      </SidebarLayout> */}
    </>
  )
}
