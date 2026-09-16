"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { CountBadge } from "@/registry/refer/ui/count-badge"
import { Input } from "@/registry/refer/ui/input"

type SearchPanelProps = React.ComponentProps<"section"> & {
  value: string
  onValueChange: (value: string) => void
  count: number
  searchLabel: string
  countLabel?: string
  placeholder?: string
  disabled?: boolean
}

function SearchPanel({
  value,
  onValueChange,
  count,
  searchLabel,
  countLabel,
  placeholder = "Search",
  disabled,
  className,
  children,
  ...props
}: SearchPanelProps) {
  return (
    <section
      {...props}
      data-slot="search-panel"
      className={cn("bg-muted min-h-80 min-w-0 rounded-3xl p-1.5", className)}
    >
      <div className="group/search m-0.5 mb-2 flex items-center gap-2 pr-2">
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            aria-label={searchLabel}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={(event) => onValueChange(event.target.value)}
            className="group-hover/search:not-focus:bg-muted dark:group-hover/search:not-focus:bg-muted focus:bg-card dark:focus:bg-card h-8 rounded-xl border-0 bg-transparent pl-9 shadow-none transition-[color,background-color,box-shadow] duration-150 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none dark:bg-transparent"
          />
        </div>
        <CountBadge count={count} countLabel={countLabel} />
      </div>
      <div className="space-y-0.5">{children}</div>
    </section>
  )
}

export { SearchPanel }
export type { SearchPanelProps }
