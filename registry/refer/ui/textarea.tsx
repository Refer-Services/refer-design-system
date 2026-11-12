import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    // What a person writes takes the direction of its own first letters, paragraph by paragraph (unicode-bidi:
    // plaintext): an Arabic note in an English page reads from the right, and the other way round. Not dir="auto": an
    // empty field would turn left-to-right, with an Arabic placeholder on the wrong side.
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input hover:border-primary/30 placeholder:text-muted-foreground/60 focus-visible:border-primary/70 focus-visible:ring-primary/15 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/10 rounded-input bg-card flex field-sizing-content min-h-20 w-full border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none [unicode-bidi:plaintext] focus-visible:border-[1.5px] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
