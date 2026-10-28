import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/refer/ui/toggle-group"

export function ToggleGroupVerticalDemo() {
  return (
    <ToggleGroup
      type="multiple"
      orientation="vertical"
      spacing={1}
      defaultValue={["bold", "italic"]}
      className="flex-col *:data-[slot=toggle-group-item]:flex-none"
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
