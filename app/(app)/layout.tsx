import { cookies } from "next/headers"

import { getDocsItems } from "@/lib/docs"
import { SiteHeader } from "@/components/docs/site-header"
import { SiteSidebar } from "@/components/docs/site-sidebar"
import { SidebarInset, SidebarProvider } from "@/registry/refer/ui/sidebar"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"
  const items = getDocsItems()

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SiteSidebar items={items} />
      <SidebarInset className="bg-card md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:shadow-(--shadow-card)">
        <SiteHeader items={items} />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
