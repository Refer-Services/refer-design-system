import { InfoIcon } from "lucide-react"

import { Field, FieldLabel } from "@/registry/refer/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/refer/ui/input-group"

export function InputInputGroupDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
