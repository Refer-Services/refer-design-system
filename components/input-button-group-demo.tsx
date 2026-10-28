import { Button } from "@/registry/refer/ui/button"
import { ButtonGroup } from "@/registry/refer/ui/button-group"
import { Field, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputButtonGroupDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  )
}
