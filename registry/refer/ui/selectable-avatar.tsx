"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/refer/ui/avatar"

type SelectableAvatarProps = Omit<
  React.ComponentProps<"button">,
  "children" | "aria-pressed"
> & {
  "aria-label": string
  selected: boolean
  onSelectedChange: (selected: boolean) => void
  src?: string
  fallback: React.ReactNode
}

function SelectableAvatar({
  selected,
  onSelectedChange,
  src,
  fallback,
  className,
  disabled,
  onClick,
  ...props
}: SelectableAvatarProps) {
  const blurClassName = cn(
    "transition-[filter] duration-150 group-hover/photo:blur-[5px] group-focus-visible/photo:blur-[5px]",
    selected && "blur-[5px]"
  )

  return (
    <button
      {...props}
      type="button"
      data-slot="selectable-avatar"
      aria-pressed={selected}
      disabled={disabled}
      className={cn(
        "group/photo bg-card focus-visible:outline-ring hover:after:border-primary/85 focus-visible:after:border-primary/85 relative inline-flex size-[52px] shrink-0 cursor-pointer rounded-2xl p-0 transition-transform duration-150 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-transparent after:transition-colors after:duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
        selected &&
          "after:border-primary/85 hover:after:border-primary scale-[0.92]",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) {
          onSelectedChange(!selected)
        }
      }}
    >
      <span
        data-slot="photo-surface"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] transition-[inset,border-radius] duration-150 group-hover/photo:inset-[3px] group-focus-visible/photo:inset-[3px]",
          "group-hover/photo:rounded-[calc(var(--radius-2xl)-3px)] group-focus-visible/photo:rounded-[calc(var(--radius-2xl)-3px)]",
          selected && "inset-[3px] rounded-[calc(var(--radius-2xl)-3px)]"
        )}
      >
        <Avatar className="shadow-avatar size-full rounded-[inherit] border-0 md:size-full">
          {src && (
            <AvatarImage
              src={src}
              alt=""
              className={cn("object-cover object-center", blurClassName)}
            />
          )}
          <AvatarFallback
            className={cn(
              "text-muted-foreground/70 rounded-[inherit] font-medium",
              blurClassName
            )}
          >
            {fallback}
          </AvatarFallback>
        </Avatar>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 grid place-items-center rounded-[inherit] bg-linear-to-br from-white/5 to-black/15 transition-[opacity,background-color] duration-150",
            selected
              ? "bg-primary/55 group-hover/photo:bg-primary/65"
              : "bg-black/20 opacity-0 group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100"
          )}
        >
          <Check className="size-5 text-white" strokeWidth={2.4} />
        </span>
      </span>
    </button>
  )
}

export { SelectableAvatar }
export type { SelectableAvatarProps }
