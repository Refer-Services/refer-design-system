"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { DialogPartsContext } from "@/registry/refer/ui/dialog"

// Base UI drawer (wave 5; it was vaul). The Vaul/Radix props the apps already pass keep working and are marked
// @deprecated where Base UI has a direct equivalent: direction, activeSnapPoint, asChild, onOpenAutoFocus,
// onInteractOutside, onPointerDownOutside and onEscapeKeyDown.

type SwipeDirection = NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
type SnapPoint = DrawerPrimitive.Root.SnapPoint

// Method syntax so Radix's narrower event types (PointerDownOutsideEvent...) are accepted.
type DismissHandlers = {
  onInteractOutside?(event: Event): void
  onPointerDownOutside?(event: Event): void
  onEscapeKeyDown?(event: KeyboardEvent): void
}

type DrawerContextProps = {
  hasSnapPoints: boolean
  swipeDirection: SwipeDirection
  swipeAxis: "x" | "y"
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean | undefined
  dismissHandlers: React.RefObject<DismissHandlers>
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }
  return context
}

const vaulDirections: Record<string, SwipeDirection> = {
  top: "up",
  bottom: "down",
  left: "left",
  right: "right",
}

// DialogTitle, DialogDescription and DialogClose render these inside a Drawer (ResponsiveDialog shares children).
const drawerDialogParts = {
  Title: DrawerPrimitive.Title,
  Description: DrawerPrimitive.Description,
  Close: DrawerPrimitive.Close,
}

// Radix's asChild as Base UI's render: the child becomes the element, its children stay the content.
function asChildToRender(
  asChild: boolean | undefined,
  children: React.ReactNode
) {
  if (
    asChild &&
    React.isValidElement<{ children?: React.ReactNode }>(children)
  ) {
    return { render: children, children: children.props.children }
  }
  return { children }
}

function Drawer({
  modal = true,
  dismissible = true,
  showSwipeHandle,
  swipeDirection,
  direction,
  snapPoints,
  snapPoint,
  activeSnapPoint,
  onSnapPointChange,
  setActiveSnapPoint,
  disablePointerDismissal,
  onOpenChange,
  ...props
}: DrawerPrimitive.Root.Props & {
  /** `false`: outside press, Escape and swipe don't close it, only the drawer's own controls. */
  dismissible?: boolean
  /** The grab bar. By default it shows on bottom drawers only; `true` shows it on any side, `false` hides it. */
  showSwipeHandle?: boolean
  /** @deprecated Vaul's prop: use `swipeDirection` ("down" for "bottom", "up" for "top"). */
  direction?: "top" | "bottom" | "left" | "right"
  /** @deprecated Vaul's prop: use `snapPoint`. */
  activeSnapPoint?: SnapPoint | null
  /** @deprecated Vaul's prop: use `onSnapPointChange`. */
  setActiveSnapPoint?: (snapPoint: SnapPoint | null) => void
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const resolvedDirection =
    swipeDirection ?? (direction ? vaulDirections[direction] : "down")
  const swipeAxis: DrawerContextProps["swipeAxis"] =
    resolvedDirection === "left" || resolvedDirection === "right" ? "x" : "y"
  const dismissHandlers = React.useRef<DismissHandlers>({})
  const contextValue = React.useMemo(
    () => ({
      hasSnapPoints,
      swipeDirection: resolvedDirection,
      swipeAxis,
      modal,
      showSwipeHandle,
      dismissHandlers,
    }),
    [hasSnapPoints, resolvedDirection, swipeAxis, modal, showSwipeHandle]
  )

  const handleOpenChange: DrawerPrimitive.Root.Props["onOpenChange"] = (
    open,
    details
  ) => {
    if (!open) {
      const { reason } = details
      const handlers = dismissHandlers.current
      if (reason === "outside-press") {
        const event = new CustomEvent("pointerDownOutside", {
          cancelable: true,
          detail: { originalEvent: details.event },
        })
        handlers.onPointerDownOutside?.(event)
        handlers.onInteractOutside?.(event)
        if (event.defaultPrevented) return details.cancel()
      }
      if (reason === "escape-key" && details.event instanceof KeyboardEvent) {
        handlers.onEscapeKeyDown?.(details.event)
        if (details.event.defaultPrevented) return details.cancel()
      }
      if (
        !dismissible &&
        (reason === "outside-press" ||
          reason === "escape-key" ||
          reason === "swipe" ||
          reason === "close-watcher")
      ) {
        return details.cancel()
      }
    }
    onOpenChange?.(open, details)
  }

  return (
    <DrawerContext.Provider value={contextValue}>
      <DialogPartsContext.Provider value={drawerDialogParts}>
        <DrawerPrimitive.Root
          data-slot="drawer"
          modal={modal}
          swipeDirection={resolvedDirection}
          snapPoints={snapPoints}
          {...(hasSnapPoints && {
            snapPoint: snapPoint !== undefined ? snapPoint : activeSnapPoint,
            onSnapPointChange: (
              point: SnapPoint | null,
              details: DrawerPrimitive.Root.SnapPointChangeEventDetails
            ) => {
              onSnapPointChange?.(point, details)
              setActiveSnapPoint?.(point)
            },
          })}
          disablePointerDismissal={disablePointerDismissal ?? !dismissible}
          onOpenChange={handleOpenChange}
          {...props}
        />
      </DialogPartsContext.Provider>
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({
  asChild,
  children,
  ...props
}: DrawerPrimitive.Trigger.Props & {
  /** @deprecated Radix's prop: use `render={<Button />}`. */
  asChild?: boolean
}) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      {...props}
      {...asChildToRender(asChild, children)}
    />
  )
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  asChild,
  children,
  ...props
}: DrawerPrimitive.Close.Props & {
  /** @deprecated Radix's prop: use `render={<Button />}`. */
  asChild?: boolean
}) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      {...props}
      {...asChildToRender(asChild, children)}
    />
  )
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 min-h-dvh bg-black/50 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] backdrop-blur-[1px] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

// The grab bar sits on the edge facing the content: top of a bottom drawer, left of a right one.
function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last active:cursor-grabbing",
        "after:bg-border after:block after:shrink-0 after:rounded-full",
        "group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=up]/drawer-popup:items-start group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-10",
        "group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-axis=x]/drawer-popup:after:h-10 group-data-[swipe-axis=x]/drawer-popup:after:w-1",
        className
      )}
      {...props}
    />
  )
}

const drawerContentVariants = cva(
  [
    "group/drawer-popup text-foreground pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) flex-col outline-none select-none data-[swipe-axis=x]:flex-row",
    // Motion and swipe (from upstream's base drawer).
    "transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [interpolate-size:allow-keywords]",
    "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
    // Bleed: on swipe overshoot, fills the gap between the drawer and the edge.
    "after:pointer-events-none after:absolute data-[swipe-direction=down]:after:inset-x-0 data-[swipe-direction=down]:after:top-full data-[swipe-direction=down]:after:h-(--bleed) data-[swipe-direction=left]:after:inset-y-0 data-[swipe-direction=left]:after:right-full data-[swipe-direction=left]:after:w-(--bleed) data-[swipe-direction=right]:after:inset-y-0 data-[swipe-direction=right]:after:left-full data-[swipe-direction=right]:after:w-(--bleed) data-[swipe-direction=up]:after:inset-x-0 data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=up]:after:h-(--bleed)",
    // Sizing: bottom/top up to 80vh (as with vaul), sides 3/4 of the width up to 24rem.
    "[--drawer-content-height:var(--drawer-height,auto)] data-snap-points:[--drawer-content-height:100dvh] data-[swipe-direction=down]:[--drawer-content-max-height:80vh] data-[swipe-direction=left]:[--drawer-content-width:75%] data-[swipe-direction=right]:[--drawer-content-width:75%] data-[swipe-direction=up]:[--drawer-content-max-height:80vh] sm:data-[swipe-direction=left]:[--drawer-content-width:24rem] sm:data-[swipe-direction=right]:[--drawer-content-width:24rem]",
    // Stack (nested drawers).
    "[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
    // Transitions.
    "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
    // Directions.
    "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))] data-[swipe-direction=down]:data-nested-drawer-open:h-(--stack-height)",
    "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))] data-[swipe-direction=up]:data-nested-drawer-open:h-(--stack-height)",
    "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
    "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
  ],
  {
    variants: {
      variant: {
        // Flush with the edge it comes from.
        default:
          "bg-background data-[swipe-direction=down]:rounded-t-lg data-[swipe-direction=down]:border-t data-[swipe-direction=left]:border-r data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-b-lg data-[swipe-direction=up]:border-b after:bg-inherit",
        // Floats 8px from the edges with all corners rounded, like a Dialog (no bleed: there's a gap to show).
        floating:
          "bg-card rounded-3xl border shadow-xl [--drawer-inset:--spacing(2)] after:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function DrawerContent({
  className,
  children,
  title = "Dialog",
  // The title is always hidden now; hideTitle stays accepted for the apps that pass it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hideTitle: _hideTitle,
  showDragHandle,
  variant = "default",
  initialFocus,
  onOpenAutoFocus,
  onInteractOutside,
  onPointerDownOutside,
  onEscapeKeyDown,
  ...props
}: DrawerPrimitive.Popup.Props &
  VariantProps<typeof drawerContentVariants> & {
    /** Accessible name, rendered hidden. */
    title?: string
    /** @deprecated The title is always hidden. */
    hideTitle?: boolean
    /** @deprecated Use the Drawer's `showSwipeHandle`. `false` still hides the grab bar. */
    showDragHandle?: boolean
    /** @deprecated Radix's prop: use `initialFocus` (`false`, a ref, or a function returning the element). */
    onOpenAutoFocus?(event: Event): void
    /** @deprecated Radix's prop: use the Drawer's `onOpenChange` and `eventDetails.cancel()` for reason "outside-press". */
    onInteractOutside?(event: Event): void
    /** @deprecated Radix's prop: use the Drawer's `onOpenChange` and `eventDetails.cancel()` for reason "outside-press". */
    onPointerDownOutside?(event: Event): void
    /** @deprecated Radix's prop: use the Drawer's `onOpenChange` and `eventDetails.cancel()` for reason "escape-key". */
    onEscapeKeyDown?(event: KeyboardEvent): void
  }) {
  const {
    hasSnapPoints,
    swipeDirection,
    swipeAxis,
    modal,
    showSwipeHandle,
    dismissHandlers,
  } = useDrawer()
  const showHandle =
    showDragHandle !== false && (showSwipeHandle ?? swipeDirection === "down")

  React.useEffect(() => {
    dismissHandlers.current = {
      onInteractOutside,
      onPointerDownOutside,
      onEscapeKeyDown,
    }
  }, [
    dismissHandlers,
    onInteractOutside,
    onPointerDownOutside,
    onEscapeKeyDown,
  ])

  const focusOnOpen = onOpenAutoFocus
    ? () => {
        const event = new Event("openAutoFocus", { cancelable: true })
        onOpenAutoFocus(event)
        return !event.defaultPrevented
      }
    : initialFocus

  return (
    <DrawerPortal>
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          initialFocus={focusOnOpen}
          data-variant={variant}
          className={cn(drawerContentVariants({ variant }), className)}
          {...props}
        >
          <DrawerPrimitive.Title className="sr-only">
            {title}
          </DrawerPrimitive.Title>
          {showHandle && <DrawerSwipeHandle />}
          {/* Content lets mouse users select text without starting a swipe. It fades out under a nested drawer. */}
          <DrawerPrimitive.Content
            data-slot="drawer-body"
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-0.5 p-4 max-md:group-data-[swipe-direction=down]/drawer-popup:text-center max-md:group-data-[swipe-direction=up]/drawer-popup:text-center md:gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/** @deprecated Use the `sr-only` class. Kept for apps that import it. */
function VisuallyHidden({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("sr-only", className)} {...props} />
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  VisuallyHidden,
}
