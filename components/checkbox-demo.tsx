"use client"

import { Checkbox } from "@/registry/refer/ui/checkbox"
import {
  CheckboxBoxed,
  CheckboxBoxedDescription,
  CheckboxBoxedTitle,
} from "@/registry/refer/ui/checkbox-boxed"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/refer/ui/field"
import { Label } from "@/registry/refer/ui/label"

export function CheckboxDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-2"
          name="terms-checkbox-2"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-2">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
        <FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel>
      </Field>
      <CheckboxBoxed>
        <CheckboxBoxedTitle>Enable notifications</CheckboxBoxedTitle>
        <CheckboxBoxedDescription>
          You can enable or disable notifications at any time.
        </CheckboxBoxedDescription>
      </CheckboxBoxed>
    </FieldGroup>
  )
}
