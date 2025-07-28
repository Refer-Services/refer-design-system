"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon, ArrowLeft, ArrowRight } from "lucide-react";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border p-6 shadow-xl duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-card focus:ring-ring bg-border/60 hover:bg-border [&_svg:not([class*='size-'])]:text-muted-foreground/90 hover:[&_svg:not([class*='size-'])]:text-foreground/80 absolute top-3.5 right-3.5 rounded-full p-1.5 hover:scale-[1.05] transition-all duration-200 ease-out active:bg-muted active:scale-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-medium", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function NavigationArrow({
  direction,
  onClick,
  disabled = false,
  className,
}: NavigationArrowProps) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onClick?.();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center min-w-[80px] h-[80px] relative z-[9999]",
        className,
      )}
    >
      {!disabled ? (
        <button
          onClick={handleClick}
          aria-label={direction === "left" ? "Previous" : "Next"}
          className="relative z-[9999] cursor-pointer h-full w-full flex items-center justify-center"
        >
          <Icon className="w-6 h-6 text-white" />
        </button>
      ) : (
        <div className="opacity-30 pointer-events-none">
          <div className="bg-muted rounded-full p-4 border">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

interface DialogContentWithNavigationProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  navigationPosition?: "external" | "internal";
}

function DialogContentWithNavigation({
  className,
  children,
  showNavigation = false,
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = false,
  navigationPosition = "external",
  ...props
}: DialogContentWithNavigationProps) {
  React.useEffect(() => {
    if (!showNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && canGoPrevious && onPrevious) {
        event.preventDefault();
        onPrevious();
      } else if (event.key === "ArrowRight" && canGoNext && onNext) {
        event.preventDefault();
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showNavigation, onPrevious, onNext, canGoPrevious, canGoNext]);

  if (!showNavigation || navigationPosition === "internal") {
    return (
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border p-6 shadow-xl duration-200 sm:max-w-lg",
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="ring-offset-card focus:ring-ring bg-border/60 hover:bg-border [&_svg:not([class*='size-'])]:text-muted-foreground/90 hover:[&_svg:not([class*='size-'])]:text-foreground/80 absolute top-3.5 right-3.5 rounded-full p-1.5 hover:scale-[1.05] transition-all duration-200 ease-out active:bg-muted active:scale-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="flex items-center justify-center gap-6 w-full max-w-7xl">
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 grid w-full max-w-4xl gap-4 rounded-3xl border p-6 shadow-xl duration-200",
              className,
            )}
            {...props}
          >
            {canGoPrevious && (
              <NavigationArrow
                direction="left"
                onClick={onPrevious}
                disabled={false}
                className="hidden sm:flex absolute left-[-120px] top-1/2 -translate-y-1/2"
              />
            )}

            {canGoNext && (
              <NavigationArrow
                direction="right"
                onClick={onNext}
                disabled={false}
                className="hidden sm:flex absolute right-[-120px] top-1/2 -translate-y-1/2"
              />
            )}

            {children}

            <DialogPrimitive.Close className="ring-offset-card focus:ring-ring bg-border/60 hover:bg-border [&_svg:not([class*='size-'])]:text-muted-foreground/90 hover:[&_svg:not([class*='size-'])]:text-foreground/80 absolute top-3.5 right-3.5 rounded-full p-1.5 hover:scale-[1.05] transition-all duration-200 ease-out active:bg-muted active:scale-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </div>
      </div>
    </DialogPortal>
  );
}

interface UseDialogNavigationProps {
  items: unknown[];
  initialIndex?: number;
}

function useDialogNavigation({
  items,
  initialIndex = 0,
}: UseDialogNavigationProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < items.length - 1;

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
  }, [items.length]);

  const goToIndex = React.useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)));
    },
    [items.length],
  );

  return {
    currentIndex,
    currentItem: items[currentIndex],
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    goToIndex,
    setCurrentIndex,
  };
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
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  NavigationArrow,
  useDialogNavigation,
};
