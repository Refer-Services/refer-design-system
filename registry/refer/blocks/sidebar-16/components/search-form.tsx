import { Search } from "lucide-react"

import { Label } from "@/registry/refer/ui/label"
import { SidebarInput } from "@/registry/refer/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-8 ps-7"
        />
        <Search className="pointer-events-none absolute inset-s-2 top-1/2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  )
}
