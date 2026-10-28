import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/refer/ui/field"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchInvalidDemo() {
  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-invalid-terms">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-invalid-terms" aria-invalid />
    </Field>
  )
}
