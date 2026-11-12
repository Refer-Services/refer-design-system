"use client"

import * as React from "react"
import { DirectionProvider as BaseUIDirectionProvider } from "@base-ui/react/direction-provider"
import * as Direction from "@radix-ui/react-direction"

// Radix and Base UI each keep the reading direction in their own context: without its provider, Base UI's
// useDirection() reads "ltr" (the combobox's chip arrows, popup sides). Wrap the app once here, not in either one.
function DirectionProvider({
  dir,
  direction,
  children,
}: {
  children?: React.ReactNode
  /** The reading direction (Radix's name for it). */
  dir?: "ltr" | "rtl"
  /** The same, by Base UI's name; either one works. */
  direction?: "ltr" | "rtl"
}) {
  const value = direction ?? dir ?? "ltr"
  return (
    <Direction.DirectionProvider dir={value}>
      <BaseUIDirectionProvider direction={value}>
        {children}
      </BaseUIDirectionProvider>
    </Direction.DirectionProvider>
  )
}

// The components that need the direction (carousel, calendar, dialog, sidebar, toast) read it here.
const useDirection = Direction.useDirection

export { DirectionProvider, useDirection }
