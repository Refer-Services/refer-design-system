import { Field, FieldGroup, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputGridDemo() {
  return (
    <FieldGroup className="grid w-full max-w-sm grid-cols-2">
      <Field>
        <FieldLabel htmlFor="input-grid-first-name">First Name</FieldLabel>
        <Input id="input-grid-first-name" placeholder="Jordan" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-grid-last-name">Last Name</FieldLabel>
        <Input id="input-grid-last-name" placeholder="Lee" />
      </Field>
    </FieldGroup>
  )
}
