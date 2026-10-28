import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function LabelFieldDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="label-field-email">Your email address</FieldLabel>
      <Input
        id="label-field-email"
        type="email"
        placeholder="jordan@example.com"
      />
      <FieldDescription>
        We&apos;ll email you when your referral moves forward.
      </FieldDescription>
    </Field>
  )
}
