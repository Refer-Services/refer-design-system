import { Field, FieldLabel } from "@/registry/refer/ui/field"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchDisabledDemo() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled-demo" disabled />
      <FieldLabel htmlFor="switch-disabled-demo">Disabled</FieldLabel>
    </Field>
  )
}
