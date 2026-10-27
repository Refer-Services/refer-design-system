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

const DRAWER_SIDES = [
  { label: "Top", swipe: "up" },
  { label: "Right", swipe: "right" },
  { label: "Bottom", swipe: "down" },
  { label: "Left", swipe: "left" },
] as const

export function DrawerSidesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {DRAWER_SIDES.map(({ label, swipe }) => (
        <Drawer key={swipe} swipeDirection={swipe}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {label}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-40 group-data-[swipe-axis=y]/drawer-popup:w-full" />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button />}>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
