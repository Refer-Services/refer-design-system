"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/registry/refer/hooks/use-mobile"
import { Dialog, DialogContent, DialogTitle } from "@/registry/refer/ui/dialog"
import { Drawer, DrawerContent } from "@/registry/refer/ui/drawer"

/**
 * Dialog on desktop, bottom Drawer below md (768px). DialogHeader, DialogFooter,
 * DialogDescription and DialogClose work inside either: inside the Drawer they
 * render its own parts (see DialogPartsContext in dialog.tsx). Only the root, the
 * content and the title switch.
 */

const ResponsiveDialogContext = React.createContext({
  isMobile: false,
  dismissible: true,
})

interface ResponsiveDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** `false` when only the dialog's own buttons may close it: on mobile it also can't be dragged down. */
  dismissible?: boolean
  children: React.ReactNode
}

function ResponsiveDialog({
  open,
  onOpenChange,
  dismissible = true,
  children,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile()
  const context = React.useMemo(
    () => ({ isMobile, dismissible }),
    [isMobile, dismissible]
  )

  return (
    <ResponsiveDialogContext.Provider value={context}>
      {isMobile ? (
        <Drawer
          open={open}
          onOpenChange={onOpenChange}
          dismissible={dismissible}
        >
          {children}
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      )}
    </ResponsiveDialogContext.Provider>
  )
}

type ResponsiveDialogContentProps = React.ComponentProps<
  typeof DialogContent
> & {
  /** Accessible name. The Drawer always renders its own (hidden) title, so it needs the text up front. */
  title: string
  /** No ResponsiveDialogTitle inside: `title` is rendered hidden on both, as the accessible name only. */
  hideTitle?: boolean
  /**
   * The Drawer's own classes, for layouts that differ per device (e.g. full
   * height on mobile). When set, `className` styles only the desktop Dialog and
   * the children lay themselves out in the Drawer. Without it, `className` lays
   * out both: the Dialog box, and a grid with the Dialog's padding in the Drawer.
   */
  drawerClassName?: string
}

function ResponsiveDialogContent({
  title,
  hideTitle = false,
  className,
  drawerClassName,
  children,
  showCloseButton,
  ...props
}: ResponsiveDialogContentProps) {
  const { isMobile, dismissible } = React.useContext(ResponsiveDialogContext)

  if (isMobile) {
    return (
      <DrawerContent
        title={title}
        hideTitle
        showDragHandle={dismissible}
        className={drawerClassName}
        {...props}
      >
        {drawerClassName !== undefined ? (
          children
        ) : (
          <div
            className={cn(
              "mx-auto grid min-h-0 w-full gap-4 overflow-y-auto p-6",
              className
            )}
          >
            {children}
          </div>
        )}
      </DrawerContent>
    )
  }

  return (
    <DialogContent
      title={hideTitle ? title : undefined}
      showCloseButton={showCloseButton}
      className={className}
      {...props}
    >
      {children}
    </DialogContent>
  )
}

/** The visible title. In the Drawer it's a plain heading: the Drawer's hidden title already names it. */
function ResponsiveDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  const { isMobile } = React.useContext(ResponsiveDialogContext)

  if (isMobile) {
    return (
      <h2
        aria-hidden
        data-slot="dialog-title"
        className={cn("text-lg leading-none font-medium", className)}
        {...(props as React.ComponentProps<"h2">)}
      />
    )
  }

  return <DialogTitle className={className} {...props} />
}

export { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTitle }
