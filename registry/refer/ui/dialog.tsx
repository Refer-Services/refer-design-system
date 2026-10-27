"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon, ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react"

import { Button } from "@/registry/refer/ui/button"

// Inside a Drawer (Base UI), Radix's Title, Description and Close have no Dialog to attach to: the Drawer provides its
// own parts here and DialogTitle, DialogDescription and DialogClose render those instead, so ResponsiveDialog can share
// children between both. A Dialog resets it for its own subtree.
type DialogParts = {
  Title: React.ElementType
  Description: React.ElementType
  Close: React.ElementType
}

const DialogPartsContext = React.createContext<DialogParts | null>(null)

function Dialog({
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root data-slot="dialog" {...props}>
      <DialogPartsContext.Provider value={null}>
        {children}
      </DialogPartsContext.Provider>
    </DialogPrimitive.Root>
  )
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  const parts = React.useContext(DialogPartsContext)
  if (parts) {
    const render =
      asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
        ? children
        : undefined
    return (
      <parts.Close data-slot="dialog-close" render={render} {...props}>
        {render ? render.props.children : children}
      </parts.Close>
    )
  }
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      asChild={asChild}
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  )
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px]",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  title,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  title?: string
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border p-6 shadow-xl duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}
      >
        {title && (
          <DialogPrimitive.Title className="sr-only">
            {title}
          </DialogPrimitive.Title>
        )}
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-card focus:ring-ring bg-border/60 hover:bg-border [&_svg:not([class*='size-'])]:text-muted-foreground/90 hover:[&_svg:not([class*='size-'])]:text-foreground/80 active:bg-muted absolute top-3.5 right-3.5 rounded-full p-1.5 transition-all duration-200 ease-out hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-90 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const Title =
    React.useContext(DialogPartsContext)?.Title ?? DialogPrimitive.Title
  return (
    <Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const Description =
    React.useContext(DialogPartsContext)?.Description ??
    DialogPrimitive.Description
  return (
    <Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

interface NavigationArrowProps {
  direction: "left" | "right"
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

function NavigationArrow({
  direction,
  onClick,
  disabled = false,
  loading = false,
  className,
}: NavigationArrowProps) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    if (!loading) onClick?.()
  }

  return (
    <div
      className={cn(
        "ease-smooth relative z-[9999] flex size-18 items-center justify-center transition-all duration-300 hover:scale-105",
        className
      )}
    >
      {!disabled ? (
        <button
          onClick={handleClick}
          disabled={loading}
          aria-label={direction === "left" ? "Previous" : "Next"}
          className="group ease-smooth relative z-[9999] flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/6 shadow-2xl ring ring-white/17 backdrop-blur-sm transition-all duration-300 hover:bg-white/12 hover:ring-white/30 focus-visible:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/80 active:scale-[.95] active:bg-white/6"
        >
          {loading ? (
            <Loader2Icon className="size-5.5 animate-spin text-white/80" />
          ) : (
            <Icon className="ease-smooth size-5.5 text-white/80 transition-all duration-600 group-hover:scale-115 group-hover:text-white group-focus-visible:scale-115 group-focus-visible:text-white" />
          )}
        </button>
      ) : (
        <div className="pointer-events-none opacity-30">
          <div className="bg-muted rounded-full border p-4">
            <Icon className="text-muted-foreground size-5.5" />
          </div>
        </div>
      )}
    </div>
  )
}

interface DialogContentWithNavigationProps extends React.ComponentProps<
  typeof DialogPrimitive.Content
> {
  showNavigation?: boolean
  onPrevious?: () => void
  onNext?: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
  isLoadingNext?: boolean
  navigationPosition?: "external" | "internal"
  open?: boolean
  showCloseButton?: boolean
}

function DialogContentWithNavigation({
  className,
  children,
  showNavigation = false,
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = false,
  isLoadingNext = false,
  navigationPosition = "external",
  open = true,
  title,
  showCloseButton = false,
  ...props
}: DialogContentWithNavigationProps & {
  title?: string
  showCloseButton?: boolean
}) {
  React.useEffect(() => {
    if (!showNavigation || !open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && canGoPrevious && onPrevious) {
        event.preventDefault()
        onPrevious()
      } else if (
        event.key === "ArrowRight" &&
        canGoNext &&
        !isLoadingNext &&
        onNext
      ) {
        event.preventDefault()
        onNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [
    showNavigation,
    open,
    onPrevious,
    onNext,
    canGoPrevious,
    canGoNext,
    isLoadingNext,
  ])

  if (!showNavigation || navigationPosition === "internal") {
    return (
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border p-6 shadow-xl duration-200 outline-none sm:max-w-lg",
            className
          )}
          {...props}
        >
          {title && (
            <DialogPrimitive.Title className="sr-only">
              {title}
            </DialogPrimitive.Title>
          )}
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className="ring-offset-card focus:ring-ring bg-border/60 hover:bg-border [&_svg:not([class*='size-'])]:text-muted-foreground/90 hover:[&_svg:not([class*='size-'])]:text-foreground/80 active:bg-muted absolute top-3.5 right-3.5 rounded-full p-1.5 transition-all duration-200 ease-out hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-90 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    )
  }

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="flex w-full max-w-7xl items-center justify-center gap-6">
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 grid w-full max-w-4xl gap-4 rounded-3xl border p-6 shadow-xl duration-200 outline-none",
              className
            )}
            {...props}
          >
            {title && (
              <DialogPrimitive.Title className="sr-only">
                {title}
              </DialogPrimitive.Title>
            )}

            {canGoPrevious && (
              <NavigationArrow
                direction="left"
                onClick={onPrevious}
                disabled={false}
                className="absolute top-1/2 left-[-120px] hidden -translate-y-1/2 sm:flex"
              />
            )}

            {(canGoNext || isLoadingNext) && (
              <NavigationArrow
                direction="right"
                onClick={onNext}
                disabled={false}
                loading={isLoadingNext}
                className="absolute top-1/2 right-[-120px] hidden -translate-y-1/2 sm:flex"
              />
            )}

            {children}

            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                className="ring-offset-card focus:ring-ring bg-border/60 hover:bg-border [&_svg:not([class*='size-'])]:text-muted-foreground/90 hover:[&_svg:not([class*='size-'])]:text-foreground/80 active:bg-muted absolute top-3.5 right-3.5 rounded-full p-1.5 transition-all duration-200 ease-out hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-90 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </div>
      </div>
    </DialogPortal>
  )
}

interface UseDialogNavigationProps {
  items: unknown[]
  initialIndex?: number
}

function useDialogNavigation({
  items,
  initialIndex = 0,
}: UseDialogNavigationProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < items.length - 1

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1))
  }, [items.length])

  const goToIndex = React.useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)))
    },
    [items.length]
  )

  return {
    currentIndex,
    currentItem: items[currentIndex],
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    goToIndex,
    setCurrentIndex,
  }
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentWithNavigation,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPartsContext,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  NavigationArrow,
  useDialogNavigation,
}
