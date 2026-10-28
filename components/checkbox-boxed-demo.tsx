"use client"

import {
  CheckboxBoxed,
  CheckboxBoxedDescription,
  CheckboxBoxedTitle,
} from "@/registry/refer/ui/checkbox-boxed"

const options = ["Option 1", "Option 2", "Option 3"] as const

export function CheckboxBoxedDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <CheckboxBoxed defaultChecked>
        <CheckboxBoxedTitle>Enable notifications</CheckboxBoxedTitle>
        <CheckboxBoxedDescription>
          You can enable or disable notifications at any time.
        </CheckboxBoxedDescription>
      </CheckboxBoxed>
      <div className="flex flex-row gap-2">
        {options.map((option) => (
          <CheckboxBoxed key={option}>
            <CheckboxBoxedTitle>{option}</CheckboxBoxedTitle>
          </CheckboxBoxed>
        ))}
      </div>
    </div>
  )
}
