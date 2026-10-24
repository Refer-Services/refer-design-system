"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "default" | "sm"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "group peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input/50 dark:data-[state=unchecked]:bg-input/80 hover:border-border-low inline-flex h-[22px] w-10 shrink-0 items-center rounded-full border border-transparent transition-all hover:inset-shadow-sm disabled:cursor-not-allowed disabled:opacity-50 data-[size=sm]:h-[18px] data-[size=sm]:w-8",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block h-[18px] w-[18px] rounded-full shadow-md ring-0 transition-all group-active:w-[22px] group-data-[size=sm]:h-[14px] group-data-[size=sm]:w-[14px] group-data-[size=sm]:group-active:w-[18px] data-[state=checked]:translate-x-[19px] data-[state=checked]:group-active:translate-x-[15px] group-data-[size=sm]:data-[state=checked]:translate-x-[15px] group-data-[size=sm]:data-[state=checked]:group-active:translate-x-[11px] data-[state=unchecked]:translate-x-px"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
