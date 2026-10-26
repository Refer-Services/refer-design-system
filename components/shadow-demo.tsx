"use client"

import { toast } from "sonner"

import { cn } from "@/lib/utils"

// Class names are written out in full so Tailwind generates them.
const referShadows = [
  {
    className: "shadow-card",
    use: "Cards, list rows and surfaces resting on the page",
  },
  {
    className: "shadow-popover",
    use: "Menus, popovers, selects, toasts: anything floating",
    // Shown on the popover surface it's paired with.
    surface: "bg-popover backdrop-blur-xl",
  },
  {
    className: "shadow-avatar",
    use: "Avatars and logos",
    round: true,
  },
]

const scale = [
  "shadow-2xs",
  "shadow-xs",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
]

function copy(className: string) {
  navigator.clipboard
    .writeText(className)
    .then(() => toast(`Copied ${className}`))
    .catch(() => toast.error("Couldn't copy to the clipboard"))
}

function ShadowTile({
  className,
  use,
  round,
  surface,
}: {
  className: string
  use?: string
  round?: boolean
  surface?: string
}) {
  return (
    <button
      type="button"
      onClick={() => copy(className)}
      title={`Copy ${className}`}
      className="group flex flex-col items-center gap-4 text-center"
    >
      <span
        className={cn(
          "bg-card squircle flex h-28 w-full items-center justify-center rounded-2xl transition-transform group-hover:-translate-y-0.5",
          round && "size-28 rounded-full",
          surface,
          className
        )}
      />
      <span className="flex flex-col gap-0.5">
        <span className="font-mono text-xs font-medium">{className}</span>
        {use && (
          <span className="text-muted-foreground max-w-48 text-xs text-pretty">
            {use}
          </span>
        )}
      </span>
    </button>
  )
}

export function ShadowDemo() {
  return (
    <div className="flex w-full flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">Refer</h3>
          <p className="text-muted-foreground text-sm">
            The shadows Refer components use. Prefer these; click to copy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 @lg:grid-cols-3">
          {referShadows.map((shadow) => (
            <ShadowTile key={shadow.className} {...shadow} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">Scale</h3>
          <p className="text-muted-foreground text-sm">
            Tailwind&apos;s shadow scale, tinted with the Refer brand color in
            light mode.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 @xl:grid-cols-4 @4xl:grid-cols-7">
          {scale.map((className) => (
            <ShadowTile key={className} className={className} />
          ))}
        </div>
      </section>
    </div>
  )
}
