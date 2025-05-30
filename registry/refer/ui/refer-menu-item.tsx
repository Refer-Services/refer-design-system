import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const menuItemVariants = cva(
  "inline-flex items-center justify-start gap-3 whitespace-nowrap rounded-full text-md leading-none font-regular transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground hover:bg-accent focus-visible:bg-accent/50 active:bg-foreground/10 [&_svg:not([class*='text-'])]:text-muted-foreground active:scale-pressed duration-150 ease-out",
        selected:
          "bg-primary/7 dark:bg-primary-subtle text-primary-content font-medium cursor-default border-primary/10 border-t-[0.5px] border-x-[0.5px] border-b-[2px] shadow-[0px_12px_16px_-4px_--alpha(var(--color-primary)_/_4%),_0px_1px_2px_0px_--alpha(var(--color-refer-950)_/_5%)] dark:shadow-none",
      },
      size: {
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3.5",
        default: "px-4 py-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function ReferMenuItem({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof menuItemVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(menuItemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { ReferMenuItem, menuItemVariants }
