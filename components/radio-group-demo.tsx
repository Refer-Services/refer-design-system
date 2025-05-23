import { Label } from "@/registry/refer/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/refer/ui/radio-group"

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description:
      "Perfect for small businesses getting started with our platform",
    price: "$10",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Advanced features for growing businesses with higher demands",
    price: "$20",
  },
] as const

export function RadioGroupDemo() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="starter" className="max-w-sm">
        {plans.map((plan) => (
          <Label
            className="hover:bg-accent/50 flex items-start gap-2 rounded-xl border px-3.5 py-3 has-[[data-state=checked]]:border-primary-border has-[[data-state=checked]]:bg-primary-subtle has-[[data-state=checked]]:border-t-[2px] has-[[data-state=checked]]:pt-[11px] group"
            key={plan.id}
          >
            <RadioGroupItem
              value={plan.id}
              id={plan.name}
            />
            <div className="grid gap-1 font-normal">
              <div className="font-medium group-has-[[data-state=checked]]:text-primary">{plan.name}</div>
              <div className="text-muted-foreground leading-snug group-has-[[data-state=checked]]:text-primary/70">
                {plan.description}
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
