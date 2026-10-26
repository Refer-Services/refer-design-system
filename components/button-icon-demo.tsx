import { ArrowRightIcon, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/registry/refer/ui/button"

// Icon buttons are round by default. For a square one, override the radius with the CSS-variable form:
// tailwind-merge doesn't know `rounded-input`, so `className="rounded-input"` would only win by CSS order.
export function ButtonIconDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-muted-foreground w-14 font-mono text-xs">
          round
        </span>
        <Button size="icon" aria-label="Add">
          <Plus />
        </Button>
        <Button size="icon" variant="primary_subtle" aria-label="Add">
          <Plus />
        </Button>
        <Button size="icon" variant="outline" aria-label="Next">
          <ArrowRightIcon />
        </Button>
        <Button size="icon" variant="subtle" aria-label="Close">
          <X />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Close">
          <X />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-muted-foreground w-14 font-mono text-xs">
          square
        </span>
        <Button
          size="icon"
          className="rounded-(--radius-input)"
          aria-label="Add"
        >
          <Plus />
        </Button>
        <Button
          size="icon"
          variant="primary_subtle"
          className="rounded-(--radius-input)"
          aria-label="Add"
        >
          <Plus />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="rounded-(--radius-input)"
          aria-label="Delete"
        >
          <Trash2 />
        </Button>
        <Button
          size="icon"
          variant="subtle"
          className="rounded-(--radius-input)"
          aria-label="Close"
        >
          <X />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-(--radius-input)"
          aria-label="Close"
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
