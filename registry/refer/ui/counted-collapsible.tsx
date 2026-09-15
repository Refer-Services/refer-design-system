"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/refer/ui/collapsible"
import { CountBadge } from "@/registry/refer/ui/count-badge"

const countedCollapsibleVariants = cva("", {
  variants: {
    tone: {
      neutral: "rounded-2xl bg-muted text-muted-foreground",
      info: "rounded-3xl bg-info-subtle text-info-content",
      primary: "rounded-3xl bg-primary-subtle text-primary-content",
    },
  },
  defaultVariants: { tone: "neutral" },
})

const badgeVariants = {
  neutral: "secondary",
  info: "info",
  primary: "primary",
} as const

type CountedCollapsibleProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  "defaultOpen" | "open" | "onOpenChange" | "title"
> &
  VariantProps<typeof countedCollapsibleVariants> & {
    title: string
    titleSuffix?: React.ReactNode
    count: number
    countLabel?: string
    open: boolean
    onOpenChange: (open: boolean) => void
  }

function CountedCollapsible({
  title,
  titleSuffix,
  count,
  countLabel,
  open,
  onOpenChange,
  tone = "neutral",
  disabled,
  className,
  children,
  ...props
}: CountedCollapsibleProps) {
  const hasItems = count > 0
  const resolvedTone = tone ?? "neutral"

  return (
    <Collapsible
      {...props}
      data-slot="counted-collapsible"
      open={hasItems && open}
      onOpenChange={onOpenChange}
      disabled={disabled || !hasItems}
      className={cn(
        countedCollapsibleVariants({ tone: resolvedTone }),
        className
      )}
    >
      <CollapsibleTrigger className="group focus-visible:outline-ring flex min-h-11 w-full items-center gap-2 rounded-[inherit] px-4 py-3 text-left text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default">
        <ChevronRight
          aria-hidden="true"
          className="size-3.5 shrink-0 transition-transform group-data-[state=open]:rotate-90"
        />
        <span>{title}</span>
        {titleSuffix}
        <CountBadge
          count={count}
          countLabel={countLabel}
          variant={badgeVariants[resolvedTone]}
          className={cn(
            "ml-auto",
            resolvedTone === "primary" && "bg-primary/80"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-0.5 px-1.5 pb-1.5">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export { CountedCollapsible }
export type { CountedCollapsibleProps }
