"use client"

import { DirectionProvider } from "@/registry/refer/ui/direction"
import { Slider } from "@/registry/refer/ui/slider"

export function DirectionDemo() {
  return (
    <DirectionProvider dir="rtl">
      <div dir="rtl" className="flex w-full max-w-sm flex-col gap-3">
        <p className="text-muted-foreground text-sm">
          Radix components read the direction from DirectionProvider: this
          slider fills from the right.
        </p>
        <Slider defaultValue={[60]} max={100} step={1} />
      </div>
    </DirectionProvider>
  )
}
