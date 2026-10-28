import { Label } from "@/registry/refer/ui/label"
import { Switch } from "@/registry/refer/ui/switch"

// Same card as RadioGroupItemBoxed and CheckboxBoxed: the switch's aria-checked drives the checked look.
const options = [
  {
    id: "switch-choice-card-share",
    title: "Share across devices",
    description:
      "Focus is shared across devices, and turns off when you leave the app.",
  },
  {
    id: "switch-choice-card-notifications",
    title: "Enable notifications",
    description:
      "Receive notifications when focus mode is enabled or disabled.",
    defaultChecked: true,
  },
]

export function SwitchChoiceCardDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {options.map((option) => (
        <Label
          key={option.id}
          htmlFor={option.id}
          className="hover:bg-accent has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle group flex items-start gap-3 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] dark:has-[[aria-checked=true]]:border-t-[1px] dark:has-[[aria-checked=true]]:pt-3"
        >
          <div className="grid flex-1 gap-0.5 font-normal">
            <p className="group-has-[[aria-checked=true]]:text-primary-content dark:group-has-[[aria-checked=true]]:text-foreground pt-px text-sm leading-none font-medium">
              {option.title}
            </p>
            <p className="text-muted-foreground group-has-[[aria-checked=true]]:text-primary-content/80 dark:group-has-[[aria-checked=true]]:text-primary-content text-sm">
              {option.description}
            </p>
          </div>
          <Switch id={option.id} defaultChecked={option.defaultChecked} />
        </Label>
      ))}
    </div>
  )
}
