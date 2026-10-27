"use client"

import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUILabels } from "@/registry/refer/ui/ui-labels"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const labels = useUILabels()

  return (
    <Loader2Icon
      role="status"
      aria-label={labels.loading}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
