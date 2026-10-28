import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputDisabledDemo() {
  return (
    <Field data-disabled className="max-w-xs">
      <FieldLabel htmlFor="input-disabled-email">Email</FieldLabel>
      <Input
        id="input-disabled-email"
        type="email"
        placeholder="Email"
        disabled
      />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
