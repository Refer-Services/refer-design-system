import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground *:data-[slot=bubble-content]:shadow-xs [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/90",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        muted:
          "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
        tinted:
          "*:data-[slot=bubble-content]:border-primary-border *:data-[slot=bubble-content]:bg-primary-subtle *:data-[slot=bubble-content]:text-primary-content dark:*:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/8",
        outline:
          "*:data-[slot=bubble-content]:bg-card *:data-[slot=bubble-content]:shadow-card [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
        destructive:
          "*:data-[slot=bubble-content]:bg-destructive-subtle *:data-[slot=bubble-content]:text-destructive-content [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-2xl rounded-bl-md border border-transparent px-3.5 py-2.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end group-data-[align=end]/bubble:rounded-br-md group-data-[align=end]/bubble:rounded-bl-2xl group-data-[align=end]/message:rounded-br-md group-data-[align=end]/message:rounded-bl-2xl [button]:text-left [button,a]:transition-colors",
        className
      )}
      {...props}
    />
  )
}

const bubbleReactionsVariants = cva(
  "bg-card shadow-card absolute z-10 flex w-fit shrink-0 items-center justify-center gap-0.5 rounded-full px-2 py-0.5 text-xs has-[button]:p-0.5 [&_[data-slot=button]]:h-6 [&_[data-slot=button]]:gap-1 [&_[data-slot=button]]:px-2 [&_[data-slot=button]]:text-xs",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-1/2",
        bottom: "bottom-0 translate-y-1/2",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
