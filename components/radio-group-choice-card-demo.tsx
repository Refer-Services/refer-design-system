import { RadioGroup } from "@/registry/refer/ui/radio-group"
import {
  RadioGroupItemBoxed,
  RadioGroupItemBoxedDescription,
  RadioGroupItemBoxedTitle,
} from "@/registry/refer/ui/radio-group-boxed"

const plans = [
  {
    value: "plus",
    title: "Plus",
    description: "For individuals and small teams.",
  },
  {
    value: "pro",
    title: "Pro",
    description: "For growing businesses.",
  },
  {
    value: "enterprise",
    title: "Enterprise",
    description: "For large teams and enterprises.",
  },
] as const

const options = ["Option 1", "Option 2", "Option 3"] as const

export function RadioGroupChoiceCardDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <RadioGroup defaultValue="plus">
        {plans.map((plan) => (
          <RadioGroupItemBoxed
            key={plan.value}
            id={plan.value}
            name={`choice-card-${plan.value}`}
          >
            <RadioGroupItemBoxedTitle>{plan.title}</RadioGroupItemBoxedTitle>
            <RadioGroupItemBoxedDescription>
              {plan.description}
            </RadioGroupItemBoxedDescription>
          </RadioGroupItemBoxed>
        ))}
      </RadioGroup>
      <RadioGroup defaultValue="option-1" className="flex flex-row gap-2">
        {options.map((option, index) => (
          <RadioGroupItemBoxed
            key={option}
            id={`option-${index + 1}`}
            name={`choice-card-option-${index + 1}`}
          >
            <RadioGroupItemBoxedTitle>{option}</RadioGroupItemBoxedTitle>
          </RadioGroupItemBoxed>
        ))}
      </RadioGroup>
    </div>
  )
}
