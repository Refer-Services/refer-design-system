import { Button } from "@/registry/refer/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputFieldgroupDemo() {
  return (
    <FieldGroup className="max-w-xs">
      <Field>
        <FieldLabel htmlFor="input-fieldgroup-name">Name</FieldLabel>
        <Input id="input-fieldgroup-name" placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-fieldgroup-email">Email</FieldLabel>
        <Input
          id="input-fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />
        <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
  )
}
