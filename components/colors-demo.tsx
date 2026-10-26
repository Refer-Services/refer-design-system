"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

// Class names are written out in full so Tailwind generates them (it only emits classes it finds in the source).

type Swatch = { name: string; className: string }

const semantic: { title: string; tokens: Swatch[] }[] = [
  {
    title: "Base",
    tokens: [
      { name: "background", className: "bg-background" },
      { name: "foreground", className: "bg-foreground" },
      { name: "card", className: "bg-card" },
      { name: "card-foreground", className: "bg-card-foreground" },
      { name: "popover", className: "bg-popover" },
      { name: "popover-foreground", className: "bg-popover-foreground" },
      { name: "muted", className: "bg-muted" },
      { name: "muted-foreground", className: "bg-muted-foreground" },
      { name: "accent", className: "bg-accent" },
      { name: "accent-foreground", className: "bg-accent-foreground" },
      { name: "secondary", className: "bg-secondary" },
      { name: "secondary-foreground", className: "bg-secondary-foreground" },
    ],
  },
  {
    title: "Primary",
    tokens: [
      { name: "primary", className: "bg-primary" },
      { name: "primary-foreground", className: "bg-primary-foreground" },
      { name: "primary-content", className: "bg-primary-content" },
      { name: "primary-subtle", className: "bg-primary-subtle" },
      { name: "primary-border", className: "bg-primary-border" },
    ],
  },
  {
    title: "Destructive",
    tokens: [
      { name: "destructive", className: "bg-destructive" },
      {
        name: "destructive-foreground",
        className: "bg-destructive-foreground",
      },
      { name: "destructive-content", className: "bg-destructive-content" },
      { name: "destructive-subtle", className: "bg-destructive-subtle" },
    ],
  },
  {
    title: "Positive",
    tokens: [
      { name: "positive", className: "bg-positive" },
      { name: "positive-foreground", className: "bg-positive-foreground" },
      { name: "positive-content", className: "bg-positive-content" },
      { name: "positive-subtle", className: "bg-positive-subtle" },
    ],
  },
  {
    title: "Info",
    tokens: [
      { name: "info", className: "bg-info" },
      { name: "info-foreground", className: "bg-info-foreground" },
      { name: "info-content", className: "bg-info-content" },
      { name: "info-subtle", className: "bg-info-subtle" },
    ],
  },
  {
    title: "Borders",
    tokens: [
      { name: "border-high", className: "bg-border-high" },
      { name: "border", className: "bg-border" },
      { name: "border-low", className: "bg-border-low" },
      { name: "input", className: "bg-input" },
      { name: "ring", className: "bg-ring" },
    ],
  },
  {
    title: "Chart",
    tokens: [
      { name: "chart-1", className: "bg-chart-1" },
      { name: "chart-2", className: "bg-chart-2" },
      { name: "chart-3", className: "bg-chart-3" },
      { name: "chart-4", className: "bg-chart-4" },
      { name: "chart-5", className: "bg-chart-5" },
    ],
  },
  {
    title: "Sidebar",
    tokens: [
      { name: "sidebar", className: "bg-sidebar" },
      { name: "sidebar-foreground", className: "bg-sidebar-foreground" },
      { name: "sidebar-primary", className: "bg-sidebar-primary" },
      {
        name: "sidebar-primary-foreground",
        className: "bg-sidebar-primary-foreground",
      },
      { name: "sidebar-accent", className: "bg-sidebar-accent" },
      {
        name: "sidebar-accent-foreground",
        className: "bg-sidebar-accent-foreground",
      },
      { name: "sidebar-border", className: "bg-sidebar-border" },
      { name: "sidebar-ring", className: "bg-sidebar-ring" },
    ],
  },
]

const brand: Swatch[] = [
  { name: "refer-50", className: "bg-refer-50" },
  { name: "refer-100", className: "bg-refer-100" },
  { name: "refer-200", className: "bg-refer-200" },
  { name: "refer-300", className: "bg-refer-300" },
  { name: "refer-400", className: "bg-refer-400" },
  { name: "refer-500", className: "bg-refer-500" },
  { name: "refer-600", className: "bg-refer-600" },
  { name: "refer-700", className: "bg-refer-700" },
  { name: "refer-800", className: "bg-refer-800" },
  { name: "refer-900", className: "bg-refer-900" },
  { name: "refer-950", className: "bg-refer-950" },
]

// stone and neutral are the Refer theme's light and dark neutrals.
const themeNeutrals = ["stone", "neutral"]

const tailwind: { name: string; shades: Swatch[] }[] = [
  {
    name: "slate",
    shades: [
      { name: "slate-50", className: "bg-slate-50" },
      { name: "slate-100", className: "bg-slate-100" },
      { name: "slate-200", className: "bg-slate-200" },
      { name: "slate-300", className: "bg-slate-300" },
      { name: "slate-400", className: "bg-slate-400" },
      { name: "slate-500", className: "bg-slate-500" },
      { name: "slate-600", className: "bg-slate-600" },
      { name: "slate-700", className: "bg-slate-700" },
      { name: "slate-800", className: "bg-slate-800" },
      { name: "slate-900", className: "bg-slate-900" },
      { name: "slate-950", className: "bg-slate-950" },
    ],
  },
  {
    name: "gray",
    shades: [
      { name: "gray-50", className: "bg-gray-50" },
      { name: "gray-100", className: "bg-gray-100" },
      { name: "gray-200", className: "bg-gray-200" },
      { name: "gray-300", className: "bg-gray-300" },
      { name: "gray-400", className: "bg-gray-400" },
      { name: "gray-500", className: "bg-gray-500" },
      { name: "gray-600", className: "bg-gray-600" },
      { name: "gray-700", className: "bg-gray-700" },
      { name: "gray-800", className: "bg-gray-800" },
      { name: "gray-900", className: "bg-gray-900" },
      { name: "gray-950", className: "bg-gray-950" },
    ],
  },
  {
    name: "zinc",
    shades: [
      { name: "zinc-50", className: "bg-zinc-50" },
      { name: "zinc-100", className: "bg-zinc-100" },
      { name: "zinc-200", className: "bg-zinc-200" },
      { name: "zinc-300", className: "bg-zinc-300" },
      { name: "zinc-400", className: "bg-zinc-400" },
      { name: "zinc-500", className: "bg-zinc-500" },
      { name: "zinc-600", className: "bg-zinc-600" },
      { name: "zinc-700", className: "bg-zinc-700" },
      { name: "zinc-800", className: "bg-zinc-800" },
      { name: "zinc-900", className: "bg-zinc-900" },
      { name: "zinc-950", className: "bg-zinc-950" },
    ],
  },
  {
    name: "neutral",
    shades: [
      { name: "neutral-50", className: "bg-neutral-50" },
      { name: "neutral-100", className: "bg-neutral-100" },
      { name: "neutral-200", className: "bg-neutral-200" },
      { name: "neutral-300", className: "bg-neutral-300" },
      { name: "neutral-400", className: "bg-neutral-400" },
      { name: "neutral-500", className: "bg-neutral-500" },
      { name: "neutral-600", className: "bg-neutral-600" },
      { name: "neutral-700", className: "bg-neutral-700" },
      { name: "neutral-800", className: "bg-neutral-800" },
      { name: "neutral-900", className: "bg-neutral-900" },
      { name: "neutral-950", className: "bg-neutral-950" },
    ],
  },
  {
    name: "stone",
    shades: [
      { name: "stone-50", className: "bg-stone-50" },
      { name: "stone-100", className: "bg-stone-100" },
      { name: "stone-200", className: "bg-stone-200" },
      { name: "stone-300", className: "bg-stone-300" },
      { name: "stone-400", className: "bg-stone-400" },
      { name: "stone-500", className: "bg-stone-500" },
      { name: "stone-600", className: "bg-stone-600" },
      { name: "stone-700", className: "bg-stone-700" },
      { name: "stone-800", className: "bg-stone-800" },
      { name: "stone-900", className: "bg-stone-900" },
      { name: "stone-950", className: "bg-stone-950" },
    ],
  },
  {
    name: "red",
    shades: [
      { name: "red-50", className: "bg-red-50" },
      { name: "red-100", className: "bg-red-100" },
      { name: "red-200", className: "bg-red-200" },
      { name: "red-300", className: "bg-red-300" },
      { name: "red-400", className: "bg-red-400" },
      { name: "red-500", className: "bg-red-500" },
      { name: "red-600", className: "bg-red-600" },
      { name: "red-700", className: "bg-red-700" },
      { name: "red-800", className: "bg-red-800" },
      { name: "red-900", className: "bg-red-900" },
      { name: "red-950", className: "bg-red-950" },
    ],
  },
  {
    name: "orange",
    shades: [
      { name: "orange-50", className: "bg-orange-50" },
      { name: "orange-100", className: "bg-orange-100" },
      { name: "orange-200", className: "bg-orange-200" },
      { name: "orange-300", className: "bg-orange-300" },
      { name: "orange-400", className: "bg-orange-400" },
      { name: "orange-500", className: "bg-orange-500" },
      { name: "orange-600", className: "bg-orange-600" },
      { name: "orange-700", className: "bg-orange-700" },
      { name: "orange-800", className: "bg-orange-800" },
      { name: "orange-900", className: "bg-orange-900" },
      { name: "orange-950", className: "bg-orange-950" },
    ],
  },
  {
    name: "amber",
    shades: [
      { name: "amber-50", className: "bg-amber-50" },
      { name: "amber-100", className: "bg-amber-100" },
      { name: "amber-200", className: "bg-amber-200" },
      { name: "amber-300", className: "bg-amber-300" },
      { name: "amber-400", className: "bg-amber-400" },
      { name: "amber-500", className: "bg-amber-500" },
      { name: "amber-600", className: "bg-amber-600" },
      { name: "amber-700", className: "bg-amber-700" },
      { name: "amber-800", className: "bg-amber-800" },
      { name: "amber-900", className: "bg-amber-900" },
      { name: "amber-950", className: "bg-amber-950" },
    ],
  },
  {
    name: "yellow",
    shades: [
      { name: "yellow-50", className: "bg-yellow-50" },
      { name: "yellow-100", className: "bg-yellow-100" },
      { name: "yellow-200", className: "bg-yellow-200" },
      { name: "yellow-300", className: "bg-yellow-300" },
      { name: "yellow-400", className: "bg-yellow-400" },
      { name: "yellow-500", className: "bg-yellow-500" },
      { name: "yellow-600", className: "bg-yellow-600" },
      { name: "yellow-700", className: "bg-yellow-700" },
      { name: "yellow-800", className: "bg-yellow-800" },
      { name: "yellow-900", className: "bg-yellow-900" },
      { name: "yellow-950", className: "bg-yellow-950" },
    ],
  },
  {
    name: "lime",
    shades: [
      { name: "lime-50", className: "bg-lime-50" },
      { name: "lime-100", className: "bg-lime-100" },
      { name: "lime-200", className: "bg-lime-200" },
      { name: "lime-300", className: "bg-lime-300" },
      { name: "lime-400", className: "bg-lime-400" },
      { name: "lime-500", className: "bg-lime-500" },
      { name: "lime-600", className: "bg-lime-600" },
      { name: "lime-700", className: "bg-lime-700" },
      { name: "lime-800", className: "bg-lime-800" },
      { name: "lime-900", className: "bg-lime-900" },
      { name: "lime-950", className: "bg-lime-950" },
    ],
  },
  {
    name: "green",
    shades: [
      { name: "green-50", className: "bg-green-50" },
      { name: "green-100", className: "bg-green-100" },
      { name: "green-200", className: "bg-green-200" },
      { name: "green-300", className: "bg-green-300" },
      { name: "green-400", className: "bg-green-400" },
      { name: "green-500", className: "bg-green-500" },
      { name: "green-600", className: "bg-green-600" },
      { name: "green-700", className: "bg-green-700" },
      { name: "green-800", className: "bg-green-800" },
      { name: "green-900", className: "bg-green-900" },
      { name: "green-950", className: "bg-green-950" },
    ],
  },
  {
    name: "emerald",
    shades: [
      { name: "emerald-50", className: "bg-emerald-50" },
      { name: "emerald-100", className: "bg-emerald-100" },
      { name: "emerald-200", className: "bg-emerald-200" },
      { name: "emerald-300", className: "bg-emerald-300" },
      { name: "emerald-400", className: "bg-emerald-400" },
      { name: "emerald-500", className: "bg-emerald-500" },
      { name: "emerald-600", className: "bg-emerald-600" },
      { name: "emerald-700", className: "bg-emerald-700" },
      { name: "emerald-800", className: "bg-emerald-800" },
      { name: "emerald-900", className: "bg-emerald-900" },
      { name: "emerald-950", className: "bg-emerald-950" },
    ],
  },
  {
    name: "teal",
    shades: [
      { name: "teal-50", className: "bg-teal-50" },
      { name: "teal-100", className: "bg-teal-100" },
      { name: "teal-200", className: "bg-teal-200" },
      { name: "teal-300", className: "bg-teal-300" },
      { name: "teal-400", className: "bg-teal-400" },
      { name: "teal-500", className: "bg-teal-500" },
      { name: "teal-600", className: "bg-teal-600" },
      { name: "teal-700", className: "bg-teal-700" },
      { name: "teal-800", className: "bg-teal-800" },
      { name: "teal-900", className: "bg-teal-900" },
      { name: "teal-950", className: "bg-teal-950" },
    ],
  },
  {
    name: "cyan",
    shades: [
      { name: "cyan-50", className: "bg-cyan-50" },
      { name: "cyan-100", className: "bg-cyan-100" },
      { name: "cyan-200", className: "bg-cyan-200" },
      { name: "cyan-300", className: "bg-cyan-300" },
      { name: "cyan-400", className: "bg-cyan-400" },
      { name: "cyan-500", className: "bg-cyan-500" },
      { name: "cyan-600", className: "bg-cyan-600" },
      { name: "cyan-700", className: "bg-cyan-700" },
      { name: "cyan-800", className: "bg-cyan-800" },
      { name: "cyan-900", className: "bg-cyan-900" },
      { name: "cyan-950", className: "bg-cyan-950" },
    ],
  },
  {
    name: "sky",
    shades: [
      { name: "sky-50", className: "bg-sky-50" },
      { name: "sky-100", className: "bg-sky-100" },
      { name: "sky-200", className: "bg-sky-200" },
      { name: "sky-300", className: "bg-sky-300" },
      { name: "sky-400", className: "bg-sky-400" },
      { name: "sky-500", className: "bg-sky-500" },
      { name: "sky-600", className: "bg-sky-600" },
      { name: "sky-700", className: "bg-sky-700" },
      { name: "sky-800", className: "bg-sky-800" },
      { name: "sky-900", className: "bg-sky-900" },
      { name: "sky-950", className: "bg-sky-950" },
    ],
  },
  {
    name: "blue",
    shades: [
      { name: "blue-50", className: "bg-blue-50" },
      { name: "blue-100", className: "bg-blue-100" },
      { name: "blue-200", className: "bg-blue-200" },
      { name: "blue-300", className: "bg-blue-300" },
      { name: "blue-400", className: "bg-blue-400" },
      { name: "blue-500", className: "bg-blue-500" },
      { name: "blue-600", className: "bg-blue-600" },
      { name: "blue-700", className: "bg-blue-700" },
      { name: "blue-800", className: "bg-blue-800" },
      { name: "blue-900", className: "bg-blue-900" },
      { name: "blue-950", className: "bg-blue-950" },
    ],
  },
  {
    name: "indigo",
    shades: [
      { name: "indigo-50", className: "bg-indigo-50" },
      { name: "indigo-100", className: "bg-indigo-100" },
      { name: "indigo-200", className: "bg-indigo-200" },
      { name: "indigo-300", className: "bg-indigo-300" },
      { name: "indigo-400", className: "bg-indigo-400" },
      { name: "indigo-500", className: "bg-indigo-500" },
      { name: "indigo-600", className: "bg-indigo-600" },
      { name: "indigo-700", className: "bg-indigo-700" },
      { name: "indigo-800", className: "bg-indigo-800" },
      { name: "indigo-900", className: "bg-indigo-900" },
      { name: "indigo-950", className: "bg-indigo-950" },
    ],
  },
  {
    name: "violet",
    shades: [
      { name: "violet-50", className: "bg-violet-50" },
      { name: "violet-100", className: "bg-violet-100" },
      { name: "violet-200", className: "bg-violet-200" },
      { name: "violet-300", className: "bg-violet-300" },
      { name: "violet-400", className: "bg-violet-400" },
      { name: "violet-500", className: "bg-violet-500" },
      { name: "violet-600", className: "bg-violet-600" },
      { name: "violet-700", className: "bg-violet-700" },
      { name: "violet-800", className: "bg-violet-800" },
      { name: "violet-900", className: "bg-violet-900" },
      { name: "violet-950", className: "bg-violet-950" },
    ],
  },
  {
    name: "purple",
    shades: [
      { name: "purple-50", className: "bg-purple-50" },
      { name: "purple-100", className: "bg-purple-100" },
      { name: "purple-200", className: "bg-purple-200" },
      { name: "purple-300", className: "bg-purple-300" },
      { name: "purple-400", className: "bg-purple-400" },
      { name: "purple-500", className: "bg-purple-500" },
      { name: "purple-600", className: "bg-purple-600" },
      { name: "purple-700", className: "bg-purple-700" },
      { name: "purple-800", className: "bg-purple-800" },
      { name: "purple-900", className: "bg-purple-900" },
      { name: "purple-950", className: "bg-purple-950" },
    ],
  },
  {
    name: "fuchsia",
    shades: [
      { name: "fuchsia-50", className: "bg-fuchsia-50" },
      { name: "fuchsia-100", className: "bg-fuchsia-100" },
      { name: "fuchsia-200", className: "bg-fuchsia-200" },
      { name: "fuchsia-300", className: "bg-fuchsia-300" },
      { name: "fuchsia-400", className: "bg-fuchsia-400" },
      { name: "fuchsia-500", className: "bg-fuchsia-500" },
      { name: "fuchsia-600", className: "bg-fuchsia-600" },
      { name: "fuchsia-700", className: "bg-fuchsia-700" },
      { name: "fuchsia-800", className: "bg-fuchsia-800" },
      { name: "fuchsia-900", className: "bg-fuchsia-900" },
      { name: "fuchsia-950", className: "bg-fuchsia-950" },
    ],
  },
  {
    name: "pink",
    shades: [
      { name: "pink-50", className: "bg-pink-50" },
      { name: "pink-100", className: "bg-pink-100" },
      { name: "pink-200", className: "bg-pink-200" },
      { name: "pink-300", className: "bg-pink-300" },
      { name: "pink-400", className: "bg-pink-400" },
      { name: "pink-500", className: "bg-pink-500" },
      { name: "pink-600", className: "bg-pink-600" },
      { name: "pink-700", className: "bg-pink-700" },
      { name: "pink-800", className: "bg-pink-800" },
      { name: "pink-900", className: "bg-pink-900" },
      { name: "pink-950", className: "bg-pink-950" },
    ],
  },
  {
    name: "rose",
    shades: [
      { name: "rose-50", className: "bg-rose-50" },
      { name: "rose-100", className: "bg-rose-100" },
      { name: "rose-200", className: "bg-rose-200" },
      { name: "rose-300", className: "bg-rose-300" },
      { name: "rose-400", className: "bg-rose-400" },
      { name: "rose-500", className: "bg-rose-500" },
      { name: "rose-600", className: "bg-rose-600" },
      { name: "rose-700", className: "bg-rose-700" },
      { name: "rose-800", className: "bg-rose-800" },
      { name: "rose-900", className: "bg-rose-900" },
      { name: "rose-950", className: "bg-rose-950" },
    ],
  },
]

function copy(className: string) {
  navigator.clipboard
    .writeText(className)
    .then(() => toast(`Copied ${className}`))
    .catch(() => toast.error("Couldn't copy to the clipboard"))
}

function useComputedColor(ref: React.RefObject<HTMLElement | null>) {
  const { resolvedTheme } = useTheme()
  const [value, setValue] = React.useState("")
  React.useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).backgroundColor)
  }, [ref, resolvedTheme])
  return value
}

function SemanticSwatch({ swatch }: { swatch: Swatch }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const value = useComputedColor(ref)
  return (
    <button
      type="button"
      onClick={() => copy(swatch.className)}
      className="hover:bg-accent rounded-input group flex min-w-0 items-center gap-3 p-1.5 text-left transition-colors"
      title={`Copy ${swatch.className}`}
    >
      <span
        ref={ref}
        className={cn(
          "squircle ring-border-low size-10 shrink-0 rounded-[10px] ring-1 ring-inset",
          swatch.className
        )}
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium">{swatch.name}</span>
        <span className="text-muted-foreground truncate font-mono text-[11px]">
          {value || swatch.className}
        </span>
      </span>
    </button>
  )
}

function ScaleSwatch({ swatch, label }: { swatch: Swatch; label: string }) {
  return (
    <button
      type="button"
      onClick={() => copy(swatch.className)}
      title={`Copy ${swatch.className}`}
      className="group flex min-w-0 flex-1 flex-col gap-1.5"
    >
      <span
        className={cn(
          "ring-border-low h-10 w-full rounded-lg ring-1 transition-transform ring-inset group-hover:scale-105",
          swatch.className
        )}
      />
      <span className="text-muted-foreground font-mono text-[10px]">
        {label}
      </span>
    </button>
  )
}

export function ColorsDemo() {
  return (
    <div className="flex w-full flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">Semantic</h3>
          <p className="text-muted-foreground text-sm">
            The Refer theme&apos;s tokens, defined in{" "}
            <code className="font-mono">app/globals.css</code>. Prefer these
            over raw palette colors. Values update with the theme; click to copy
            the class.
          </p>
        </div>
        {semantic.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h4 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {group.title}
            </h4>
            <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {group.tokens.map((swatch) => (
                <SemanticSwatch key={swatch.name} swatch={swatch} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">Brand</h3>
          <p className="text-muted-foreground text-sm">
            The refer scale. <code className="font-mono">primary</code> is
            refer-600 in light mode and refer-500 in dark mode.
          </p>
        </div>
        <div className="flex gap-2">
          {brand.map((swatch) => (
            <ScaleSwatch
              key={swatch.name}
              swatch={swatch}
              label={swatch.name.replace("refer-", "")}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold">Tailwind palette</h3>
          <p className="text-muted-foreground text-sm">
            Tailwind&apos;s default colors, all available as utilities. Stone
            and neutral are the theme&apos;s light and dark neutrals.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {tailwind.map((color) => (
            <div key={color.name} className="flex items-start gap-3">
              <span
                className={cn(
                  "w-20 shrink-0 pt-2.5 text-sm",
                  themeNeutrals.includes(color.name)
                    ? "text-primary-content font-medium"
                    : "text-muted-foreground"
                )}
              >
                {color.name}
              </span>
              <div className="flex min-w-0 flex-1 gap-1.5">
                {color.shades.map((swatch) => (
                  <ScaleSwatch
                    key={swatch.name}
                    swatch={swatch}
                    label={swatch.name.replace(`${color.name}-`, "")}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
