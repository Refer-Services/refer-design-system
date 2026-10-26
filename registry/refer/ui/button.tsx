import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:outline-destructive/20 dark:aria-invalid:outline-destructive/40 aria-invalid:border-destructive cursor-pointer active:scale-pressed duration-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary border-black/20 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        primary_subtle:
          "bg-primary-subtle text-primary-content hover:shadow-xs hover:bg-primary/8 active:bg-primary/12 border-primary-border border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        primary_ghost:
          "text-primary-content border border-transparent hover:border-primary-border/25 hover:bg-primary-subtle active:bg-primary/8",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:bg-destructive dark:bg-destructive/80 dark:hover:bg-destructive/70 border-black/20 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        destructive_subtle:
          "bg-destructive-subtle text-destructive-content hover:shadow-xs hover:bg-destructive/15 active:bg-destructive/20 border-destructive/10 dark:border-destructive/15 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        destructive_ghost:
          "text-destructive-content border border-transparent hover:border-destructive/5 hover:bg-destructive-subtle active:bg-destructive/15",
        positive:
          "bg-positive text-white shadow-xs hover:bg-positive/90 active:bg-positive dark:bg-positive/80 dark:hover:bg-positive/70 border-black/20 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        positive_subtle:
          "bg-positive-subtle text-positive-content hover:shadow-xs hover:bg-positive/15 active:bg-positive/20 border-positive/10 dark:border-positive/15 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        positive_ghost:
          "text-positive-content border border-transparent hover:border-positive/5 hover:bg-positive-subtle active:bg-positive/15",
        info: "bg-info text-white shadow-xs hover:bg-info/90 active:bg-info dark:bg-info/80 dark:hover:bg-info/70 border-black/20 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        info_subtle:
          "bg-info-subtle text-info-content hover:shadow-xs hover:bg-info/15 active:bg-info/20 border-info/10 dark:border-info/15 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        info_ghost:
          "text-info-content border border-transparent hover:border-info/5 hover:bg-info-subtle active:bg-info/15",
        outline:
          "border border-input bg-card shadow-xs hover:bg-background active:bg-stone-100  dark:hover:bg-accent dark:active:bg-accent/60 hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90 active:bg-secondary border-black/20 border-[0.5px] border-b-[2px] active:border-b-[0.5px]",
        ghost:
          "hover:bg-muted hover:text-accent-foreground active:bg-border/70 dark:hover:bg-accent dark:active:bg-accent/60 [&_svg:not([class*='text-'])]:text-muted-foreground",
        subtle:
          "bg-muted hover:bg-border/60 hover:border-border-low hover:shadow-xs border border-transparent active:bg-stone-200/65 dark:active:bg-border/90 [&_svg:not([class*='text-'])]:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 gap-1.5 px-3.5 has-[>svg]:pl-3",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:pl-3.5",
        md: "h-10 px-4 py-2 has-[>svg]:pl-3.5",
        lg: "h-11 px-5 has-[>svg]:pl-4",
        icon: "size-10",
        "icon-xs": "size-8",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
