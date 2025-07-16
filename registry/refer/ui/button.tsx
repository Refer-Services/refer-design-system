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
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary border-black/20 border-x-[0.5px] border-t-[0.5px] border-b-[2px]",
        primary_subtle:
          "bg-primary-subtle text-primary-content hover:shadow-xs hover:bg-primary/8 active:bg-primary/12 border-primary-border border-t-[0.5px] border-x-[0.5px] border-b-[1.5px]",
        primary_ghost:
          "text-primary-content border border-transparent hover:border-primary-border/25 hover:bg-primary-subtle active:bg-primary/8",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:bg-destructive dark:bg-destructive/80 dark:hover:bg-destructive/70 border-black/20 border-t-[0.5px] border-x-[0.5px] border-b-[2px]",
        outline:
          "border border-input bg-card shadow-xs hover:bg-accent active:bg-stone-100  dark:hover:bg-accent dark:active:bg-accent/60 hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:outline-offset-5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90 active:bg-secondary border-black/20 border-t-[0.5px] border-x-[0.5px] border-b-[2px]",
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
  variant,
  size,
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
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
