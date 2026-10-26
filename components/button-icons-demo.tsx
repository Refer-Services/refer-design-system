import { ArrowRightIcon, Loader2Icon, Plus, Trash2 } from "lucide-react"

import { Button } from "@/registry/refer/ui/button"

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <Plus /> New referral
      </Button>
      <Button variant="outline">
        <Plus /> Add
      </Button>
      {/* The size's has-[>svg] padding assumes a leading icon; swap it for a trailing one. */}
      <Button variant="outline" className="has-[>svg]:pr-3.5 has-[>svg]:pl-4">
        Learn more <ArrowRightIcon />
      </Button>
      <Button variant="destructive">
        <Trash2 /> Delete
      </Button>
      <Button variant="outline" disabled>
        <Loader2Icon className="animate-spin" /> Please wait
      </Button>
    </div>
  )
}
