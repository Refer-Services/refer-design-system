"use client"

import * as React from "react"

import { DirectionProvider } from "@/registry/refer/ui/direction"
import { ToggleGroup, ToggleGroupItem } from "@/registry/refer/ui/toggle-group"

type Direction = "ltr" | "rtl"

const DocsDirectionContext = React.createContext<{
  direction: Direction
  setDirection: (direction: Direction) => void
} | null>(null)

// The whole page turns, as an app in Arabic does: <html dir> and lang (the dev server writes logical classes as
// :lang() rules, so the language has to say it too), and DirectionProvider for Radix and Base UI. Dialogs, toasts and popovers
// render outside the preview, so a direction for the preview alone would leave them left to right.
export function DocsDirectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [direction, setDirection] = React.useState<Direction>("ltr")

  React.useEffect(() => {
    const html = document.documentElement
    html.dir = direction
    html.lang = direction === "rtl" ? "ar" : "en"
  }, [direction])

  const value = React.useMemo(() => ({ direction, setDirection }), [direction])

  return (
    <DocsDirectionContext.Provider value={value}>
      <DirectionProvider direction={direction}>{children}</DirectionProvider>
    </DocsDirectionContext.Provider>
  )
}

export function DirectionSwitch() {
  const context = React.useContext(DocsDirectionContext)
  if (!context) return null

  return (
    <ToggleGroup
      type="single"
      size="sm"
      spacing={0}
      variant="outline"
      aria-label="Reading direction"
      value={context.direction}
      onValueChange={(value) =>
        value && context.setDirection(value as Direction)
      }
    >
      <ToggleGroupItem value="ltr" className="font-mono text-xs">
        LTR
      </ToggleGroupItem>
      <ToggleGroupItem value="rtl" className="font-mono text-xs">
        RTL
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
