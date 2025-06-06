import { Label } from "@/registry/refer/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/refer/ui/radio-group"
import { RadioGroupItemBoxed, RadioGroupItemBoxedTitle, RadioGroupItemBoxedDescription} from "@/registry/refer/ui/radio-group-boxed"

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

const options = [
  {
    id: "op-1",
    name: "Option 1",
  },
  {
    id: "op-2",
    name: "Option 2",
  },
  {
    id: "op-3",
    name: "Option 3",
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
          <RadioGroupItemBoxed id={plan.id} name={plan.name} key={plan.id}>
            <RadioGroupItemBoxedTitle>
              {plan.name}
            </RadioGroupItemBoxedTitle>
            <RadioGroupItemBoxedDescription>
                {plan.description}
            </RadioGroupItemBoxedDescription>
          </RadioGroupItemBoxed>
        ))}
      </RadioGroup>

      <RadioGroup defaultValue="1" className="flex flex-row gap-2">
        {options.map((option) => (
          <RadioGroupItemBoxed id={option.id} name={option.name} key={option.id}>
            <RadioGroupItemBoxedTitle>
              {option.name}
            </RadioGroupItemBoxedTitle>
          </RadioGroupItemBoxed>
        ))}
      </RadioGroup>
    </div>
  )
}
