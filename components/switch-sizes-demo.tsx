import { Field, FieldGroup, FieldLabel } from "@/registry/refer/ui/field"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchSizesDemo() {
  return (
    <FieldGroup className="w-full max-w-[10rem]">
      <Field orientation="horizontal">
        <Switch id="switch-sizes-sm" size="sm" />
        <FieldLabel htmlFor="switch-sizes-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-sizes-default" size="default" />
        <FieldLabel htmlFor="switch-sizes-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
