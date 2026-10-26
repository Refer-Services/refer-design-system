import {
  Check,
  Info,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react"

import { Button } from "@/registry/refer/ui/button"

const tones = [
  { name: "primary", icon: Plus, label: "Add" },
  { name: "destructive", icon: Trash2, label: "Delete" },
  { name: "positive", icon: Check, label: "Approve" },
  { name: "info", icon: Info, label: "Details" },
] as const

const sizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground w-24 font-mono text-xs">
      {children}
    </span>
  )
}

// Icon buttons are round by default. For a square one, override the radius with the CSS-variable form:
// tailwind-merge doesn't know `rounded-input`, so `className="rounded-input"` would only win by CSS order.
const square = "rounded-(--radius-input)"

export function ButtonIconDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start justify-items-start gap-3">
        <span />
        {["solid", "_subtle", "_ghost"].map((style) => (
          <span key={style} className="text-muted-foreground font-mono text-xs">
            {style}
          </span>
        ))}
        {tones.map(({ name, icon: Icon, label }) => (
          <div key={name} className="contents">
            <Label>{name}</Label>
            <Button size="icon" variant={name} aria-label={label}>
              <Icon />
            </Button>
            <Button size="icon" variant={`${name}_subtle`} aria-label={label}>
              <Icon />
            </Button>
            <Button size="icon" variant={`${name}_ghost`} aria-label={label}>
              <Icon />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-4">
        <Label>neutral</Label>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" variant="secondary" aria-label="Settings">
            <Settings />
          </Button>
          <Button size="icon" variant="outline" aria-label="Edit">
            <Pencil />
          </Button>
          <Button size="icon" variant="subtle" aria-label="Close">
            <X />
          </Button>
          <Button size="icon" variant="ghost" aria-label="More">
            <MoreHorizontal />
          </Button>
        </div>

        <Label>square</Label>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" className={square} aria-label="Add">
            <Plus />
          </Button>
          <Button
            size="icon"
            variant="destructive_subtle"
            className={square}
            aria-label="Delete"
          >
            <Trash2 />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className={square}
            aria-label="Edit"
          >
            <Pencil />
          </Button>
          <Button
            size="icon"
            variant="subtle"
            className={square}
            aria-label="Close"
          >
            <X />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={square}
            aria-label="More"
          >
            <MoreHorizontal />
          </Button>
        </div>

        <Label>sizes</Label>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size} variant="outline" aria-label="Add">
              <Plus />
            </Button>
          ))}
          {sizes.map((size) => (
            <Button
              key={size}
              size={size}
              variant="subtle"
              className={square}
              aria-label="Close"
            >
              <X />
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
