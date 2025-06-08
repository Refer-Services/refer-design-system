import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/registry/refer/ui/label";
import { Checkbox } from "@/registry/refer/ui/checkbox";

interface CheckboxBoxedProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
}

interface CheckboxBoxedSubComponentProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

function CheckboxBoxed({
  className,
  children,
  checked = false,
  onChange,
  value,
  disabled = false,
  ...props
}: CheckboxBoxedProps) {
  const id = React.useId();
  return (
    <Label
      htmlFor={id}
      className={cn(
        "hover:bg-accent has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle group flex items-start gap-2 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] dark:has-[[aria-checked=true]]:border-t-[1px] dark:has-[[aria-checked=true]]:pt-3",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checkedState) => {
          if (onChange) {
            const syntheticEvent = {
              target: {
                checked: checkedState === true,
                value: value || "",
                type: "checkbox",
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }
        }}
        disabled={disabled}
        value={value}
      />
      <div className="grid gap-1 font-normal">{children}</div>
    </Label>
  );
}

function CheckboxBoxedTitle({
  className,
  ...props
}: CheckboxBoxedSubComponentProps) {
  return (
    <p
      className={cn(
        "group-has-[[aria-checked=true]]:text-primary-content dark:group-has-[[aria-checked=true]]:text-foreground text-sm leading-none font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CheckboxBoxedDescription({
  className,
  ...props
}: CheckboxBoxedSubComponentProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground group-has-[[aria-checked=true]]:text-primary-content/80 dark:group-has-[[aria-checked=true]]:text-primary-content text-sm",
        className,
      )}
      {...props}
    />
  );
}

CheckboxBoxed.Title = CheckboxBoxedTitle;
CheckboxBoxed.Description = CheckboxBoxedDescription;

export { CheckboxBoxed, CheckboxBoxedTitle, CheckboxBoxedDescription };
