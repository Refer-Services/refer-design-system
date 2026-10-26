import { Button } from "@/registry/refer/ui/button"

const tones = [
  { name: "primary", label: "Primary" },
  { name: "destructive", label: "Destructive" },
  { name: "positive", label: "Positive" },
  { name: "info", label: "Info" },
] as const

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start justify-items-start gap-3">
        <span />
        {["solid", "_subtle", "_ghost"].map((style) => (
          <span key={style} className="text-muted-foreground font-mono text-xs">
            {style}
          </span>
        ))}
        {tones.map(({ name, label }) => (
          <div key={name} className="contents">
            <span className="text-muted-foreground pr-3 font-mono text-xs">
              {name}
            </span>
            <Button variant={name}>{label}</Button>
            <Button variant={`${name}_subtle`}>{label}</Button>
            <Button variant={`${name}_ghost`}>{label}</Button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground font-mono text-xs">neutral</span>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  )
}
