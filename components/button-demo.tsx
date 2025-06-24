import { ArrowRightIcon, Loader2Icon, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/registry/refer/ui/button"
import { Separator } from "@/registry/refer/ui/separator"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="xs">xSmall</Button>
        <Button variant="primary_subtle" size="xs">Subtle</Button>
        <Button variant="primary_ghost" size="xs">Ghost</Button>
        <Button variant="outline" size="xs">
          Outline
        </Button>
        <Button variant="subtle" size="xs">
          Subtle
        </Button>
        <Button variant="ghost" size="xs">
          Ghost
        </Button>
        <Button variant="destructive" size="xs">
          Destructive
        </Button>
        <Button variant="secondary" size="xs">
          Secondary
        </Button>
        <Button variant="link" size="xs">
          Link
        </Button>
        <Button variant="outline" size="xs">
          <Plus /> Add
        </Button>
        <Button variant="outline" size="xs" className="has-[>svg]:pl-3.5 has-[>svg]:pr-3">
          Learn <ArrowRightIcon />
        </Button>
        <Button disabled size="xs" variant="outline">
          <Loader2Icon className="animate-spin" />
          Wait
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="sm">Small</Button>
        <Button variant="primary_subtle" size="sm">Subtle</Button>
        <Button variant="primary_ghost" size="sm">Ghost</Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="subtle" size="sm">
          Subtle
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button variant="destructive" size="sm">
          Destructive
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
        <Button variant="link" size="sm">
          Link
        </Button>
        <Button variant="outline" size="sm">
          <Plus /> Add
        </Button>
        <Button variant="outline" size="sm" className="has-[>svg]:pl-4 has-[>svg]:pr-3.5">
          Learn <ArrowRightIcon />
        </Button>
        <Button disabled size="sm" variant="outline">
          <Loader2Icon className="animate-spin" />
          Wait
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Medium</Button>
        <Button variant="primary_subtle">Subtle</Button>
        <Button variant="primary_ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">
          <Plus /> Add
        </Button>
        <Button variant="outline" className="has-[>svg]:pl-4 has-[>svg]:pr-3.5">
          Learn <ArrowRightIcon />
        </Button>
        <Button disabled variant="outline">
          <Loader2Icon className="animate-spin" />
          Wait
        </Button>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="lg">Large</Button>
        <Button variant="primary_subtle" size="lg">Subtle</Button>
        <Button variant="primary_ghost" size="lg">Ghost</Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
        <Button variant="subtle" size="lg">
          Subtle
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
        <Button variant="destructive" size="lg">
          Destructive
        </Button>
        <Button variant="secondary" size="lg">
          Secondary
        </Button>
        <Button variant="link" size="lg">
          Link
        </Button>
        <Button variant="outline" size="lg">
          <Plus /> Add
        </Button>
        <Button variant="outline" size="lg" className="has-[>svg]:pl-5 has-[>svg]:pr-4">
          Learn <ArrowRightIcon />
        </Button>
        <Button disabled size="lg" variant="outline">
          <Loader2Icon className="animate-spin" />
          Wait
        </Button>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="primary" size="icon" className="rounded-lg">
          <X />
        </Button>
        <Button variant="primary_subtle" size="icon" className="rounded-lg">
          <X />
        </Button>
        <Button variant="primary_ghost" size="icon" className="rounded-lg">
          <X />
        </Button>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
        <Button variant="secondary" size="icon" className="size-9 rounded-lg">
          <ArrowRightIcon />
        </Button>
        <Button variant="outline" size="icon" className="size-8 rounded-lg">
          <Trash2 />
        </Button>
        <Button variant="subtle" size="icon" className="size-8">
          <X />
        </Button>
        <Button variant="ghost" size="icon" className="size-8 rounded-lg">
          <X />
        </Button>
      </div>
    </div>
  )
}
