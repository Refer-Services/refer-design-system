"use client"

import * as React from "react"

import { Button } from "@/registry/refer/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/refer/ui/drawer"
import { Label } from "@/registry/refer/ui/label"
import { RadioGroup } from "@/registry/refer/ui/radio-group"
import {
  RadioGroupItemBoxed,
  RadioGroupItemBoxedDescription,
  RadioGroupItemBoxedTitle,
} from "@/registry/refer/ui/radio-group-boxed"
import { Switch } from "@/registry/refer/ui/switch"

const SLOTS = [
  {
    id: "tomorrow-10",
    title: "Tomorrow, 10:00",
    description: "Marina and Leo",
  },
  { id: "tomorrow-14", title: "Tomorrow, 14:30", description: "Marina only" },
  { id: "thursday-11", title: "Thursday, 11:00", description: "Whole panel" },
  {
    id: "friday-9",
    title: "Friday, 09:00",
    description: "Last slot this week",
  },
]

// Refer: drawers float 8px from the edges with all corners rounded, like a Dialog. floating={false} attaches them to the
// edge they come from.
export function DrawerFloatingDemo() {
  const [floating, setFloating] = React.useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id="drawer-floating"
          checked={floating}
          onCheckedChange={setFloating}
        />
        <Label htmlFor="drawer-floating">Floating</Label>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {(["down", "right"] as const).map((swipe) => (
          <Drawer key={swipe} swipeDirection={swipe}>
            <DrawerTrigger render={<Button variant="outline" />}>
              {swipe === "down" ? "Bottom" : "Right"}
            </DrawerTrigger>
            <DrawerContent floating={floating} title="Pick an interview slot">
              <DrawerHeader>
                <DrawerTitle>Pick an interview slot</DrawerTitle>
                <DrawerDescription>
                  Ana gets the invite as soon as you confirm.
                </DrawerDescription>
              </DrawerHeader>
              <RadioGroup
                defaultValue={SLOTS[0].id}
                className="gap-2 overflow-y-auto px-4"
              >
                {SLOTS.map((slot) => (
                  <RadioGroupItemBoxed
                    key={slot.id}
                    id={slot.id}
                    name={`${swipe}-${slot.id}`}
                  >
                    <RadioGroupItemBoxedTitle>
                      {slot.title}
                    </RadioGroupItemBoxedTitle>
                    <RadioGroupItemBoxedDescription>
                      {slot.description}
                    </RadioGroupItemBoxedDescription>
                  </RadioGroupItemBoxed>
                ))}
              </RadioGroup>
              <DrawerFooter>
                <Button>Confirm slot</Button>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  )
}
