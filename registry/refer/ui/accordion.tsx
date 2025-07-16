"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children?: React.ReactNode
}

function Accordion({
  type = "single",
  collapsible,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  if (type === "multiple") {
    return (
      <AccordionPrimitive.Root
        data-slot="accordion"
        type="multiple"
        defaultValue={defaultValue as string[]}
        value={value as string[]}
        onValueChange={onValueChange as (value: string[]) => void}
        className={className}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      type="single"
      collapsible={collapsible}
      defaultValue={defaultValue as string}
      value={value as string}
      onValueChange={onValueChange as (value: string) => void}
      className={className}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  iconPosition = "end",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  iconPosition?: "start" | "end"
}) {
  const isIconStart = iconPosition === "start"
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start gap-2 rounded-md py-4 text-left text-sm font-medium transition-all hover:underline disabled:pointer-events-none disabled:opacity-50",
          isIconStart
            ? "justify-start [&[data-state=open]>svg]:rotate-90"
            : "justify-between [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {isIconStart && (
          <ChevronRightIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-px transition-transform duration-200" />
        )}
        {children}
        {!isIconStart && (
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-px transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
