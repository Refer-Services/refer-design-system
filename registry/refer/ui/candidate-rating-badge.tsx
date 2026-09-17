import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/refer/ui/badge"
import { ThumbsUpIcon } from "@/registry/refer/ui/thumbs-up-icon"
import { ThumbsDownIcon } from "@/registry/refer/ui/thumbs-down-icon"
import { TwoThumbsUpIcon } from "@/registry/refer/ui/two-thumbs-up-icon"
import { TwoThumbsDownIcon } from "@/registry/refer/ui/two-thumbs-down-icon"

const RATING_CONFIG = {
  strong_yes: {
    label: "Strong yes",
    icon: TwoThumbsUpIcon,
    variant: "positive_subtle",
  },
  yes: {
    label: "Yes",
    icon: ThumbsUpIcon,
    variant: "positive_subtle",
  },
  no: {
    label: "No",
    icon: ThumbsDownIcon,
    variant: "destructive_subtle",
  },
  strong_no: {
    label: "Strong no",
    icon: TwoThumbsDownIcon,
    variant: "destructive_subtle",
  },
} as const

type CandidateRating = keyof typeof RATING_CONFIG

type CandidateRatingBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  "children" | "variant" | "asChild"
> & {
  variant: CandidateRating
}

function CandidateRatingBadge({
  variant,
  className,
  ...props
}: CandidateRatingBadgeProps) {
  const { label, icon: Icon, variant: badgeVariant } = RATING_CONFIG[variant]
  const isDouble = variant === "strong_yes" || variant === "strong_no"

  return (
    <Badge
      {...props}
      data-slot="candidate-rating-badge"
      data-rating={variant}
      variant={badgeVariant}
      className={cn(
        "gap-[3px] rounded-md border-0 p-1 text-xs leading-none font-normal has-[>svg]:pl-1",
        isDouble && "[&>svg]:w-[18px]",
        className
      )}
    >
      <Icon aria-hidden="true" className="shrink-0" />
      <span className="sr-only">{label}</span>
    </Badge>
  )
}

export { CandidateRatingBadge }
export type { CandidateRating, CandidateRatingBadgeProps }
