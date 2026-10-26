"use client"

import { Example, ExampleWrapper } from "@/components/examples/example"
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

export function DrawerExample() {
  return (
    <ExampleWrapper>
      <DrawerScrollableContent />
      <DrawerWithSides />
      <DrawerMobileHeader />
    </ExampleWrapper>
  )
}

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

function DrawerWithSides() {
  return (
    <Example title="Sides">
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map((side) => (
          <Drawer
            key={side}
            direction={
              side === "bottom" ? undefined : (side as "top" | "right" | "left")
            }
          >
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="style-sera:uppercase capitalize"
              >
                {side}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="scroll-fade-y scrollbar-none overflow-y-auto px-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <p
                    key={index}
                    className="style-lyra:mb-2 style-lyra:leading-relaxed style-sera:leading-relaxed mb-4 leading-normal"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </Example>
  )
}

function DrawerScrollableContent() {
  return (
    <Example title="Scrollable Content">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Scrollable Content</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="scroll-fade-y scrollbar-none overflow-y-auto px-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <p
                key={index}
                className="style-lyra:mb-2 style-lyra:leading-relaxed style-sera:leading-relaxed mb-4 leading-normal"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  )
}

// Refer: DrawerHeader centers its text on bottom/top drawers below md (768px).
function DrawerMobileHeader() {
  return (
    <Example title="Mobile header (bottom drawer)">
      <p className="text-muted-foreground text-sm">
        Below 768px, the title and description of a bottom or top drawer are
        centered; from md up they align left. Open it with a narrow window or on
        a phone, or see the frame below.
      </p>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open bottom drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move to interview</DrawerTitle>
            <DrawerDescription>
              Ana will get the scheduling link.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Move</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div
        aria-hidden="true"
        className="bg-muted flex w-full justify-center rounded-2xl px-4 pt-10"
      >
        <div className="bg-background w-[320px] rounded-t-[20px] border border-b-0 shadow-xl">
          <div className="bg-border mx-auto mt-2 h-1 w-10 rounded-full" />
          {/* Static frame: forces the mobile layout so it shows on a wide window. */}
          <DrawerHeader className="text-center">
            <div className="text-foreground font-semibold">
              Move to interview
            </div>
            <div className="text-muted-foreground text-sm">
              Ana will get the scheduling link.
            </div>
          </DrawerHeader>
          <div className="flex flex-col gap-2 p-4 pt-0">
            <Button>Move</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </Example>
  )
}
