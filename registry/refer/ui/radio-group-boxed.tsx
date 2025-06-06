import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/registry/refer/ui/label"
import { RadioGroupItem } from "@/registry/refer/ui/radio-group"

interface RadioGroupItemBoxedProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  id: string
  name: string
  children?: React.ReactNode
}

interface CheckboxBoxedSubComponentProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

function RadioGroupItemBoxed({
  className,
  children,
  id,
  name,
  ...props
}: RadioGroupItemBoxedProps) {
  return (
    <Label
      className={cn(
        "hover:bg-accent has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle group flex items-start gap-2 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] dark:has-[[aria-checked=true]]:border-t-[1px] dark:has-[[aria-checked=true]]:pt-3",
        className
      )}
      {...props}
    >
      <RadioGroupItem value={id} id={name} />
      <div className="grid gap-0.5 font-normal">{children}</div>
    </Label>
  )
}

function RadioGroupItemBoxedTitle({
  className,
  ...props
}: CheckboxBoxedSubComponentProps) {
  return (
    <p
      className={cn(
        "group-has-[[aria-checked=true]]:text-primary-content dark:group-has-[[aria-checked=true]]:text-foreground pt-px text-sm leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function RadioGroupItemBoxedDescription({
  className,
  ...props
}: CheckboxBoxedSubComponentProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground group-has-[[aria-checked=true]]:text-primary-content/80 dark:group-has-[[aria-checked=true]]:text-primary-content text-sm",
        className
      )}
      {...props}
    />
  )
}

RadioGroupItemBoxed.Title = RadioGroupItemBoxedTitle
RadioGroupItemBoxed.Description = RadioGroupItemBoxedDescription

export {
  RadioGroupItemBoxed,
  RadioGroupItemBoxedTitle,
  RadioGroupItemBoxedDescription,
}
