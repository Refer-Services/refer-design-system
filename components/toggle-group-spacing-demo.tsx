import { ToggleGroup, ToggleGroupItem } from "@/registry/refer/ui/toggle-group"

const items = ["top", "bottom", "left", "right"]

export function ToggleGroupSpacingDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      {[2, 0].map((spacing) => (
        <ToggleGroup
          key={spacing}
          type="single"
          size="sm"
          defaultValue="top"
          variant="outline"
          spacing={spacing}
        >
          {items.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              aria-label={`Toggle ${item}`}
              className="capitalize"
            >
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ))}
    </div>
  )
}
