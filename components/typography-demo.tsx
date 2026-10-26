"use client"

import * as React from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

// Class names are written out in full so Tailwind generates them.

const typefaces = [
  {
    name: "Geist",
    className: "font-sans",
    variable: "--font-sans",
    use: "Everything: UI, headings and body text.",
  },
  {
    name: "Geist Mono",
    className: "font-mono",
    variable: "--font-mono",
    use: "Code, keyboard shortcuts, IDs and tabular data.",
  },
]

const scale = [
  { className: "text-5xl", size: "48px", leading: "48px" },
  { className: "text-4xl", size: "36px", leading: "40px" },
  { className: "text-3xl", size: "30px", leading: "36px" },
  { className: "text-2xl", size: "24px", leading: "32px" },
  { className: "text-xl", size: "20px", leading: "28px" },
  { className: "text-lg", size: "18px", leading: "28px" },
  { className: "text-base", size: "16px", leading: "24px" },
  { className: "text-sm", size: "14px", leading: "20px" },
  { className: "text-xs", size: "12px", leading: "16px" },
]

const weights = [
  { className: "font-normal", value: "400" },
  { className: "font-medium", value: "500" },
  { className: "font-semibold", value: "550", note: "Refer: 550, not 600" },
  { className: "font-bold", value: "700" },
]

const styles = [
  {
    name: "Page title",
    className: "text-3xl font-semibold tracking-tight",
    sample: "Candidates",
  },
  {
    name: "Section title",
    className: "text-lg font-semibold",
    sample: "Referral details",
  },
  {
    name: "Body",
    className: "text-sm",
    sample: "Ana worked with Marina for three years on the design team.",
  },
  {
    name: "Secondary text",
    className: "text-muted-foreground text-sm",
    sample: "Moved to Interview two days ago.",
  },
  {
    name: "Label",
    className:
      "text-muted-foreground text-xs font-medium tracking-wide uppercase",
    sample: "Open roles",
  },
  {
    name: "Mono caption",
    className: "text-muted-foreground font-mono text-xs",
    sample: "job_8f2c41 · updated 12:04",
  },
]

function copy(className: string) {
  navigator.clipboard
    .writeText(className)
    .then(() => toast(`Copied ${className}`))
    .catch(() => toast.error("Couldn't copy to the clipboard"))
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground font-mono text-xs">{children}</span>
  )
}

export function TypographyDemo() {
  return (
    <div className="flex w-full flex-col gap-14">
      <Section
        title="Typefaces"
        description="Two families, loaded with next/font and exposed as CSS variables."
      >
        <div className="grid gap-4 @2xl:grid-cols-2">
          {typefaces.map((face) => (
            <button
              key={face.name}
              type="button"
              onClick={() => copy(face.className)}
              title={`Copy ${face.className}`}
              className="bg-card shadow-card squircle hover:bg-background flex flex-col gap-6 rounded-2xl p-6 text-left transition-colors"
            >
              <span className={cn("text-6xl leading-none", face.className)}>
                Aa
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-semibold">{face.name}</span>
                <span className="text-muted-foreground text-sm">
                  {face.use}
                </span>
              </span>
              <span
                className={cn("text-muted-foreground text-sm", face.className)}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </span>
              <Meta>
                {face.className} · var({face.variable})
              </Meta>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Scale"
        description="Tailwind's type scale with its default line heights."
      >
        <div className="divide-border-low flex flex-col divide-y">
          {scale.map((step) => (
            <button
              key={step.className}
              type="button"
              onClick={() => copy(step.className)}
              title={`Copy ${step.className}`}
              className="hover:bg-background -mx-3 flex items-baseline gap-6 rounded-lg px-3 py-3 text-left transition-colors"
            >
              <span className="flex w-28 shrink-0 flex-col">
                <span className="font-mono text-xs font-medium">
                  {step.className}
                </span>
                <Meta>
                  {step.size} / {step.leading}
                </Meta>
              </span>
              <span className={cn("min-w-0 truncate", step.className)}>
                Refer the people you&apos;d hire again
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Weights"
        description="The four weights in use. Refer sets font-semibold to 550 in the theme."
      >
        <div className="grid grid-cols-2 gap-4 @xl:grid-cols-4">
          {weights.map((weight) => (
            <button
              key={weight.className}
              type="button"
              onClick={() => copy(weight.className)}
              title={`Copy ${weight.className}`}
              className="bg-card shadow-card squircle hover:bg-background flex flex-col gap-4 rounded-2xl p-5 text-left transition-colors"
            >
              <span className={cn("text-4xl leading-none", weight.className)}>
                Aa
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-mono text-xs font-medium">
                  {weight.className}
                </span>
                <Meta>{weight.note ?? weight.value}</Meta>
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Text styles in use"
        description="Combinations the DS and its apps repeat. Click a row to copy its classes."
      >
        <div className="divide-border-low flex flex-col divide-y">
          {styles.map((style) => (
            <button
              key={style.name}
              type="button"
              onClick={() => copy(style.className)}
              title={`Copy ${style.className}`}
              className="hover:bg-background -mx-3 grid gap-2 rounded-lg px-3 py-4 text-left transition-colors @xl:grid-cols-[11rem_1fr] @xl:items-baseline @xl:gap-6"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{style.name}</span>
                <Meta>{style.className}</Meta>
              </span>
              <span className={cn("min-w-0", style.className)}>
                {style.sample}
              </span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  )
}
