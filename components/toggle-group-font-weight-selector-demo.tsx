"use client"

import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/registry/refer/ui/toggle-group"

const weights = [
  { value: "light", label: "Light", className: "font-light" },
  { value: "normal", label: "Normal", className: "font-normal" },
  { value: "medium", label: "Medium", className: "font-medium" },
  { value: "bold", label: "Bold", className: "font-bold" },
]

export function ToggleGroupFontWeightSelectorDemo() {
  const [fontWeight, setFontWeight] = React.useState("normal")

  return (
    <Field className="max-w-xs">
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        type="single"
        value={fontWeight}
        onValueChange={(value) => value && setFontWeight(value)}
        variant="outline"
        spacing={2}
        size="lg"
      >
        {weights.map((weight) => (
          <ToggleGroupItem
            key={weight.value}
            value={weight.value}
            aria-label={weight.label}
            className="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span className={`text-2xl leading-none ${weight.className}`}>
              Aa
            </span>
            <span className="text-muted-foreground text-xs">
              {weight.label}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <FieldDescription>
        Use{" "}
        <code className="bg-muted rounded-md px-1 py-0.5 font-mono">
          font-{fontWeight}
        </code>{" "}
        to set the font weight.
      </FieldDescription>
    </Field>
  )
}
