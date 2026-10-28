import { Field, FieldLabel } from "@/registry/refer/ui/field"
import { Switch } from "@/registry/refer/ui/switch"

export function FieldSwitchDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="field-switch-2fa">
        Multi-factor authentication
      </FieldLabel>
      <Switch id="field-switch-2fa" />
    </Field>
  )
}
