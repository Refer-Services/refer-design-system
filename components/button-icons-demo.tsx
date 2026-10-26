import {
  ArrowRightIcon,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  Info,
  Loader2Icon,
  Plus,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react"

import { Button } from "@/registry/refer/ui/button"

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted-foreground font-mono text-xs">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// The size's has-[>svg] padding assumes a leading icon; a trailing one swaps it with
// className="has-[>svg]:pr-3.5 has-[>svg]:pl-4" (md).
const trailing = "has-[>svg]:pr-3.5 has-[>svg]:pl-4"

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Row label="leading">
        <Button>
          <Plus /> New referral
        </Button>
        <Button variant="primary_subtle">
          <Sparkles /> Suggest
        </Button>
        <Button variant="positive">
          <Check /> Approve
        </Button>
        <Button variant="destructive_subtle">
          <Trash2 /> Delete
        </Button>
        <Button variant="info_subtle">
          <Info /> Details
        </Button>
        <Button variant="outline">
          <Download /> Export
        </Button>
        <Button variant="subtle">
          <Copy /> Copy link
        </Button>
      </Row>
      <Row label="trailing">
        <Button className={trailing}>
          Continue <ArrowRightIcon />
        </Button>
        <Button variant="primary_ghost" className={trailing}>
          Send invite <Send />
        </Button>
        <Button variant="info_ghost" className={trailing}>
          Open docs <ExternalLink />
        </Button>
        <Button variant="outline" className={trailing}>
          Status <ChevronDown />
        </Button>
        <Button variant="secondary" className={trailing}>
          Learn more <ArrowRightIcon />
        </Button>
      </Row>
      <Row label="loading / disabled">
        <Button disabled>
          <Loader2Icon className="animate-spin" /> Saving
        </Button>
        <Button variant="outline" disabled>
          <Loader2Icon className="animate-spin" /> Please wait
        </Button>
        <Button variant="destructive_subtle" disabled>
          <Loader2Icon className="animate-spin" /> Deleting
        </Button>
        <Button variant="positive_subtle" disabled>
          <Check /> Approved
        </Button>
      </Row>
    </div>
  )
}
