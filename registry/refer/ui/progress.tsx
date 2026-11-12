"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/10 relative h-1.5 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {/* The bar fills from the start of the line: the offset is a variable so a right-to-left page can mirror it. */}
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary/90 h-full w-full flex-1 -translate-x-(--progress-offset) transition-all rtl:translate-x-(--progress-offset)"
        style={
          {
            "--progress-offset": `${100 - (value || 0)}%`,
          } as React.CSSProperties
        }
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
