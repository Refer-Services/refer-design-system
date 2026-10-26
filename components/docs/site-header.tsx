import type { DocsItem } from "@/lib/docs"
import { CommandMenu } from "@/components/docs/command-menu"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Separator } from "@/registry/refer/ui/separator"
import { SidebarTrigger } from "@/registry/refer/ui/sidebar"

export function SiteHeader({ items }: { items: DocsItem[] }) {
  return (
    <header className="bg-card/80 border-border-low sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 rounded-t-2xl border-b px-4 backdrop-blur-xl">
      <SidebarTrigger className="-ml-1.5" />
      <Separator
        orientation="vertical"
        className="mr-1 data-[orientation=vertical]:h-4"
      />
      <CommandMenu items={items} />
      <div className="ml-auto flex items-center gap-2">
        <ModeSwitcher />
      </div>
    </header>
  )
}
