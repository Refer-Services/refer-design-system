import * as React from "react"

import { cn } from "@/lib/utils"

// An e-mail address, a URL or a phone number reads left to right in every language, a right-to-left page included.
const LEFT_TO_RIGHT_TYPES = new Set(["email", "url", "tel"])

function Input({
  className,
  type,
  dir,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      dir={dir ?? (type && LEFT_TO_RIGHT_TYPES.has(type) ? "ltr" : undefined)}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground dark:bg-input/10 border-input hover:border-primary/30 rounded-input bg-card h-10 w-full min-w-0 border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary/70 focus-visible:ring-primary/15 focus-visible:border-[1.5px] focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
