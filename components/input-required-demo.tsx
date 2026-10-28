import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputRequiredDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-required">
        Required Field <span className="text-destructive-content">*</span>
      </FieldLabel>
      <Input
        id="input-required"
        placeholder="This field is required"
        required
      />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  )
}
