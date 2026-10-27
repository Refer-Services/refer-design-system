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

const PARAGRAPHS = [
  "Your changes are saved automatically as you type.",
  "Delivery usually takes three to five business days, depending on your location and the shipping method you selected at checkout.",
  "We use your email address for account notifications and order updates. You can change this anytime from your profile settings.",
  "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a code from your authenticator app in addition to your password. We recommend enabling it if you store payment methods or sensitive information.",
  "By continuing, you agree to our Terms of Service and Privacy Policy. We collect usage data to improve the product, personalize your experience, and troubleshoot issues. You can export or delete your data at any time from the account settings page. Third-party integrations may have their own policies, and you should review them before connecting external services.",
  "Refunds are processed within five to ten business days after we receive your return. Items must be unused and in their original packaging to qualify. Shipping costs are non-refundable unless the return is due to our error or a defective product. Once approved, the refund is issued to your original payment method; credit card refunds may take an additional billing cycle to appear on your statement. If you paid with store credit, the balance is restored to your account immediately. Contact support if you haven't received your refund after two weeks.",
  "Last updated March 12, 2026.",
  "Upgrade to Pro for unlimited projects, priority support, and advanced analytics. Cancel anytime from billing settings.",
  "You haven't verified your email yet. Check your inbox for a confirmation link—we sent it when you signed up. The link expires after 24 hours, but you can request a new one below.",
  "API requests are rate-limited to 1,000 calls per hour on the free plan. Exceeding the limit returns a 429 response with a Retry-After header. Upgrade to a paid plan for higher limits and dedicated support. Webhook deliveries are retried up to three times with exponential backoff if your endpoint returns a non-2xx status.",
  "No payment method on file.",
  "Our design team rebuilt the checkout flow last quarter after interviews with forty-two customers. The biggest friction point was surprise fees at the final step, so we moved shipping and tax estimates earlier in the process. Early tests show a twelve percent drop in cart abandonment. We're still rolling out the update region by region, and you may see the old flow until your account is migrated.",
]

export function DrawerExample() {
  return (
    <ExampleWrapper>
      <DrawerDemo />
      <DrawerSwipeHandleExample />
      <DrawerPosition />
      <DrawerCustomWidthAndHeight />
      <DrawerScrollable />
      <DrawerSnapPoints />
      <DrawerNested />
      <DrawerNonModal />
      <DrawerMobileHeader />
      <DrawerWithControls />
    </ExampleWrapper>
  )
}

function DrawerDemo() {
  return (
    <Example title="Demo">
      <div className="flex flex-wrap gap-2">
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open Drawer
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <div className="bg-muted h-80 w-full rounded-xl" />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Header
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="bg-muted h-80 w-full rounded-xl" />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Footer
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <div className="bg-muted h-80 w-full rounded-xl" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Header and Footer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="bg-muted h-80 w-full rounded-xl" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Edge to Edge
          </DrawerTrigger>
          <DrawerContent>
            <div className="bg-primary-subtle h-80 w-full" />
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
  )
}

function DrawerSwipeHandleExample() {
  return (
    <Example title="Swipe Handle">
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side} showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="capitalize">Drawer</DrawerTitle>
                <DrawerDescription>
                  Drawer with a swipe handle.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </Example>
  )
}

function DrawerCustomWidthAndHeight() {
  return (
    <Example title="Custom Width and Height">
      <div className="flex flex-wrap gap-2">
        <Drawer swipeDirection="down">
          <DrawerTrigger render={<Button variant="outline" />}>
            Down
          </DrawerTrigger>
          <DrawerContent className="data-[swipe-direction=down]:h-64">
            <DrawerHeader>
              <DrawerTitle>Down drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div className="scroll-fade flex-1 scrollbar-thin overflow-y-auto p-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipeDirection="up">
          <DrawerTrigger render={<Button variant="outline" />}>
            Up
          </DrawerTrigger>
          <DrawerContent className="data-[swipe-direction=up]:h-[50vh]">
            <DrawerHeader>
              <DrawerTitle>Up drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div className="scroll-fade flex-1 overflow-y-auto p-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipeDirection="left">
          <DrawerTrigger render={<Button variant="outline" />}>
            Left
          </DrawerTrigger>
          <DrawerContent className="data-[swipe-direction=left]:w-xl">
            <DrawerHeader>
              <DrawerTitle>Left drawer</DrawerTitle>
              <DrawerDescription>Drawer with a custom width.</DrawerDescription>
            </DrawerHeader>
            <div className="scroll-fade flex-1 overflow-y-auto p-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipeDirection="right">
          <DrawerTrigger render={<Button variant="outline" />}>
            Right
          </DrawerTrigger>
          <DrawerContent className="data-[swipe-direction=right]:w-xs">
            <DrawerHeader>
              <DrawerTitle>Right drawer</DrawerTitle>
              <DrawerDescription>Drawer with a custom width.</DrawerDescription>
            </DrawerHeader>
            <div className="scroll-fade flex-1 overflow-y-auto p-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>
  )
}

const DRAWER_SIDES = ["up", "right", "down", "left"] as const

function DrawerPosition() {
  return (
    <Example title="Position">
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side}>
            <DrawerTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
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

function DrawerScrollable() {
  return (
    <Example title="Scrollable Content">
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side}>
            <DrawerTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="scroll-fade flex-1 overflow-y-auto p-4">
                {Array.from({ length: 20 }).map((_, index) => (
                  <p key={index} className="mb-4 leading-normal">
                    {PARAGRAPHS[index % PARAGRAPHS.length]}
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

const SNAP_POINTS = ["31rem", 1]

function DrawerSnapPoints() {
  return (
    <Example title="Snap Points">
      <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
        <DrawerTrigger render={<Button variant="outline" />}>
          Open Snap Drawer
        </DrawerTrigger>
        <DrawerContent className="max-h-[calc(100dvh-1rem)]">
          <DrawerHeader>
            <DrawerTitle>Snap points</DrawerTitle>
            <DrawerDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </DrawerDescription>
          </DrawerHeader>
          <div className="scroll-fade grid flex-1 gap-3 overflow-y-auto p-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="bg-muted h-12 rounded-lg" />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </Example>
  )
}

function DrawerNested() {
  return (
    <Example title="Nested">
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side} showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="capitalize">{side} drawer</DrawerTitle>
                <DrawerDescription>
                  Open another drawer from the same direction.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
              </div>
              <DrawerFooter>
                <Drawer swipeDirection={side}>
                  <DrawerTrigger render={<Button />}>
                    Open nested drawer
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Nested drawer</DrawerTitle>
                      <DrawerDescription>
                        The parent drawer stays mounted behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 p-4">
                      <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
                    </div>
                    <DrawerFooter>
                      <Drawer swipeDirection={side}>
                        <DrawerTrigger render={<Button />}>
                          Open third drawer
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Third drawer</DrawerTitle>
                            <DrawerDescription>
                              This is the frontmost drawer in the stack.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="flex-1 p-4">
                            <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
                          </div>
                          <DrawerFooter>
                            <DrawerClose render={<Button variant="outline" />}>
                              Close
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose render={<Button variant="outline" />}>
                        Close
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </Example>
  )
}

function DrawerNonModal() {
  return (
    <Example title="Non Modal">
      <Drawer modal={false} disablePointerDismissal swipeDirection="right">
        <DrawerTrigger render={<Button variant="outline" />}>
          Non Modal
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Non Modal Drawer</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <div className="bg-muted rounded-xl group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>
              Close
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
