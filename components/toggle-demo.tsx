import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/registry/refer/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:[&_svg]:fill-current"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}
