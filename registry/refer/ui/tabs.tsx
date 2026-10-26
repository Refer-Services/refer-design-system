"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  {
    variants: {
      variant: {
        // Refer's segmented control.
        default:
          "bg-muted h-10 gap-x-0.5 gap-y-0.5 rounded-[14px] squircle p-1 shadow-[0px_1px_0px_0px_--alpha(var(--color-foreground)_/_6%)_inset]",
        // Underlined tabs for page-level navigation.
        line: "h-auto gap-5 border-b bg-transparent p-0 data-[orientation=vertical]:gap-1 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l",
        // Tabs in a card's top bar: the selected one looks like a subtle button, the rest like ghost buttons.
        subtle: "h-auto gap-1 bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground/80 dark:data-[state=active]:bg-background data-[state=active]:text-foreground dark:text-muted-foreground group squircle inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Vertical: full-width rows aligned to the start.
        "data-[orientation=vertical]:h-9 data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-none data-[orientation=vertical]:justify-start",
        // line
        "group-data-[variant=line]/tabs-list:hover:text-foreground group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground group-data-[variant=line]/tabs-list:relative group-data-[variant=line]/tabs-list:h-auto group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:pt-0 group-data-[variant=line]/tabs-list:pb-2.5 group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-primary group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:inset-x-0 group-data-[variant=line]/tabs-list:after:-bottom-px group-data-[variant=line]/tabs-list:after:h-0.5 group-data-[variant=line]/tabs-list:after:rounded-full",
        "data-[orientation=vertical]:group-data-[variant=line]/tabs-list:h-9 data-[orientation=vertical]:group-data-[variant=line]/tabs-list:px-3 data-[orientation=vertical]:group-data-[variant=line]/tabs-list:pb-0 data-[orientation=vertical]:group-data-[variant=line]/tabs-list:after:inset-x-auto data-[orientation=vertical]:group-data-[variant=line]/tabs-list:after:inset-y-1 data-[orientation=vertical]:group-data-[variant=line]/tabs-list:after:-left-px data-[orientation=vertical]:group-data-[variant=line]/tabs-list:after:h-auto data-[orientation=vertical]:group-data-[variant=line]/tabs-list:after:w-0.5",
        // subtle (from portal's PipelineCandidateDialog)
        "group-data-[variant=subtle]/tabs-list:squircle group-data-[variant=subtle]/tabs-list:hover:bg-muted/70 group-data-[variant=subtle]/tabs-list:hover:text-foreground group-data-[variant=subtle]/tabs-list:data-[state=active]:bg-muted group-data-[variant=subtle]/tabs-list:data-[state=active]:text-foreground dark:group-data-[variant=subtle]/tabs-list:data-[state=active]:bg-muted group-data-[variant=subtle]/tabs-list:h-8 group-data-[variant=subtle]/tabs-list:flex-none group-data-[variant=subtle]/tabs-list:rounded-(--radius-input) group-data-[variant=subtle]/tabs-list:px-2.5 group-data-[variant=subtle]/tabs-list:data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
