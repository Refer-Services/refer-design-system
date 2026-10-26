import { Plus } from "lucide-react"

import { Button } from "@/registry/refer/ui/button"

const sizes = [
  { size: "xs", icon: "icon-xs" },
  { size: "sm", icon: "icon-sm" },
  { size: "md", icon: "icon" },
  { size: "lg", icon: "icon-lg" },
] as const

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map(({ size, icon }) => (
        <div key={size} className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground w-8 font-mono text-xs">
            {size}
          </span>
          <Button size={size}>Primary</Button>
          <Button size={size} variant="outline">
            Outline
          </Button>
          <Button size={size} variant="subtle">
            Subtle
          </Button>
          <Button size={size} variant="outline">
            <Plus /> Add
          </Button>
          <Button size={icon} variant="outline" aria-label="Add">
            <Plus />
          </Button>
        </div>
      ))}
    </div>
  )
}
