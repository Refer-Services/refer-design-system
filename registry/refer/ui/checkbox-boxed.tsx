import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/refer/ui/checkbox"
import { Label } from "@/registry/refer/ui/label"

interface CheckboxBoxedProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  className?: string
  children?: React.ReactNode
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  disabled?: boolean
  defaultChecked?: boolean
}

interface CheckboxBoxedSubComponentProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

function CheckboxBoxed({
  className,
  children,
  checked,
  onChange,
  value,
  disabled = false,
  defaultChecked = false,
  ...props
}: CheckboxBoxedProps) {
  const id = React.useId()
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const isControlled = checked !== undefined && onChange !== undefined
  const checkedValue = isControlled ? checked : internalChecked

  return (
    <Label
      htmlFor={id}
      className={cn(
        "hover:bg-accent hover:has-[[aria-checked=true]]:bg-primary/8 has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle group flex items-start gap-2 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] dark:has-[[aria-checked=true]]:border-t-[1px] dark:has-[[aria-checked=true]]:pt-3",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <Checkbox
        id={id}
        checked={checkedValue}
        onCheckedChange={(checkedState) => {
          if (isControlled && onChange) {
            const syntheticEvent = {
              target: {
                checked: checkedState === true,
                value: value || "",
                type: "checkbox",
              },
            } as React.ChangeEvent<HTMLInputElement>
            onChange(syntheticEvent)
          } else if (!isControlled) {
            setInternalChecked(checkedState === true)
          }
        }}
        disabled={disabled}
        value={value}
      />
      <div className="grid gap-1 font-normal">{children}</div>
    </Label>
  )
}

function CheckboxBoxedTitle({
  className,
  ...props
}: CheckboxBoxedSubComponentProps) {
  return (
    <p
      className={cn(
        "group-has-[[aria-checked=true]]:text-primary-content dark:group-has-[[aria-checked=true]]:text-foreground text-sm leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function CheckboxBoxedDescription({
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

CheckboxBoxed.Title = CheckboxBoxedTitle
CheckboxBoxed.Description = CheckboxBoxedDescription

export { CheckboxBoxed, CheckboxBoxedTitle, CheckboxBoxedDescription }
