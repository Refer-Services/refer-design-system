import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/refer/ui/badge"

type CountBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  "children" | "asChild"
> & {
  count: number
  countLabel?: string
}

function CountBadge({
  count,
  countLabel,
  variant = "secondary",
  className,
  ...props
}: CountBadgeProps) {
  return (
    <Badge
      {...props}
      data-slot="count-badge"
      variant={variant}
      className={cn(
        "h-[18px] min-w-[18px] shrink-0 rounded-md border-0 px-1 py-0 text-xs leading-none tabular-nums",
        className
      )}
    >
      {count}
      {countLabel && <span className="sr-only"> {countLabel}</span>}
    </Badge>
  )
}

export { CountBadge }
export type { CountBadgeProps }
