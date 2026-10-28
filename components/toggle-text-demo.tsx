import { ItalicIcon } from "lucide-react"

import { Toggle } from "@/registry/refer/ui/toggle"

export function ToggleTextDemo() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
