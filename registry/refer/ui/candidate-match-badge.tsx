import * as React from "react"
import { Check, CheckCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/refer/ui/badge"

const MATCH_CONFIG = {
  strong: {
    label: "Strong match",
    icon: CheckCheck,
    variant: "positive_subtle",
  },
  match: {
    label: "Match",
    icon: Check,
    variant: "info_subtle",
  },
  almost: {
    label: "Almost a match",
    icon: null,
    variant: "destructive_subtle",
  },
} as const

type CandidateMatch = keyof typeof MATCH_CONFIG

type CandidateMatchBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  "children" | "variant" | "asChild"
> & {
  variant: CandidateMatch
}

function CandidateMatchBadge({
  variant,
  className,
  ...props
}: CandidateMatchBadgeProps) {
  const { label, icon: Icon, variant: badgeVariant } = MATCH_CONFIG[variant]

  return (
    <Badge
      {...props}
      data-slot="candidate-match-badge"
      data-match={variant}
      variant={badgeVariant}
      className={cn(
        "gap-[3px] rounded-md border-0 px-[5px] py-1 text-xs leading-none font-normal has-[>svg]:pl-[5px]",
        className
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-3 shrink-0" />}
      {label}
    </Badge>
  )
}

export { CandidateMatchBadge }
export type { CandidateMatch, CandidateMatchBadgeProps }
