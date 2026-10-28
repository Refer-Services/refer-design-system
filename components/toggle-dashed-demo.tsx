import { PlusIcon } from "lucide-react"

import { Toggle } from "@/registry/refer/ui/toggle"

export function ToggleDashedDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="dashed" size="sm" aria-label="Filter by remote">
        <PlusIcon />
        Remote
      </Toggle>
      <Toggle
        variant="dashed"
        size="sm"
        aria-label="Filter by full-time"
        defaultPressed
      >
        <PlusIcon />
        Full-time
      </Toggle>
      <Toggle variant="dashed" size="sm" aria-label="Filter by senior">
        <PlusIcon />
        Senior
      </Toggle>
    </div>
  )
}
