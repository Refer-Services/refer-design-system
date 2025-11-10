"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group peer data-[state=checked]:bg-primary hover:inset-shadow-sm data-[state=unchecked]:bg-input/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[22px] w-10 shrink-0 items-center rounded-full border border-transparent hover:border-border-low transition-all disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block w-[18px] group-active:w-[22px] h-[18px] rounded-full shadow-md ring-0 transition-all data-[state=checked]:translate-x-[19px] data-[state=checked]:group-active:translate-x-[15px] data-[state=unchecked]:translate-x-px"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
