"use client"

import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"

import { Example, ExampleWrapper } from "@/components/examples/example"
import { Button } from "@/registry/refer/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/refer/ui/combobox"
import { DialogClose, DialogDescription } from "@/registry/refer/ui/dialog"
import { Label } from "@/registry/refer/ui/label"
import { Switch } from "@/registry/refer/ui/switch"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/refer/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/refer/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/refer/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/refer/ui/tooltip"

export function DrawerExample() {
  return (
    <ExampleWrapper>
      <DrawerScrollableContent />
      <DrawerWithSides />
      <DrawerMobileHeader />
      <DrawerWithControls />
    </ExampleWrapper>
  )
}

const DRAWER_SIDES = [
  { label: "top", swipe: "up" },
  { label: "right", swipe: "right" },
  { label: "bottom", swipe: "down" },
  { label: "left", swipe: "left" },
] as const

function DrawerWithSides() {
  return (
    <Example title="Sides">
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map(({ label, swipe }) => (
          <Drawer key={label} swipeDirection={swipe}>
            <DrawerTrigger
              render={
                <Button
                  variant="outline"
                  className="style-sera:uppercase capitalize"
                />
              }
            >
              {label}
            </DrawerTrigger>
            <DrawerContent className="data-[swipe-axis=y]:max-h-[50vh]">
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
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
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
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button variant="outline" />}>
          Scrollable Content
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
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
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
        <DrawerTrigger render={<Button variant="outline" />}>
          Open bottom drawer
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
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
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

const STAGES = ["Applied", "Screening", "Interview", "Offer", "Hired"]

// Refer: regression check for the Base UI drawer. Radix popups (select, menu, popover, tooltip) and the Base UI
// combobox open inside it, Dialog parts work inside it (ResponsiveDialog relies on that), and dismissible={false}
// keeps it open on outside press, Escape and swipe. Escape in an open popup closes only that popup. It keeps
// asChild on purpose: the apps still pass it, so this also checks the compatibility path.
function DrawerWithControls() {
  const [open, setOpen] = React.useState(false)
  const [dismissible, setDismissible] = React.useState(true)

  return (
    <Example title="With controls inside">
      <div className="flex items-center gap-2">
        <Switch
          id="drawer-dismissible"
          checked={dismissible}
          onCheckedChange={setDismissible}
        />
        <Label htmlFor="drawer-dismissible">
          Closes on outside press, Escape and swipe
        </Label>
      </div>
      <Drawer open={open} onOpenChange={setOpen} dismissible={dismissible}>
        <DrawerTrigger asChild>
          <Button variant="outline">Open drawer with controls</Button>
        </DrawerTrigger>
        <DrawerContent title="Edit candidate">
          <DrawerHeader>
            <DrawerTitle>Edit candidate</DrawerTitle>
            <DialogDescription>
              {dismissible
                ? "Closes on outside press, Escape, swipe or the buttons."
                : "Only the buttons below close this drawer."}
            </DialogDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-3 px-4">
            <Select defaultValue="Interview">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Combobox items={STAGES}>
              <ComboboxInput placeholder="Search a stage" />
              <ComboboxContent>
                <ComboboxEmpty>No stage found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="More">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Notes</Button>
                </PopoverTrigger>
                <PopoverContent>Ana prefers mornings.</PopoverContent>
              </Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip inside a drawer</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Save</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  )
}
