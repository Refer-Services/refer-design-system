import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-1.5 has-[>svg]:pl-2 text-xs font-medium leading-none w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        primary_subtle:
          "border border-primary-border bg-primary-subtle text-primary-content [a&]:hover:bg-primary/20",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        secondary_subtle:
          "border bg-muted text-muted-foreground [a&]:hover:bg-foreground/20",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/80",
        destructive_subtle:
          "border border-destructive-subtle bg-destructive-subtle text-destructive-content [a&]:hover:bg-destructive/20",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        positive:
          "border-transparent bg-positive text-positive-foreground [a&]:hover:bg-positive/90",
        positive_subtle:
          "border border-positive-subtle bg-positive-subtle text-positive-content [a&]:hover:bg-positive/20",
        info: "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/90",
        info_subtle:
          "border border-info-subtle bg-info-subtle text-info-content [a&]:hover:bg-info/20",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
