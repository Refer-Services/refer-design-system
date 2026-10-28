import { Field, FieldLabel } from "@/registry/refer/ui/field"
import { Textarea } from "@/registry/refer/ui/textarea"

export function TextareaDisabledDemo() {
  return (
    <Field data-disabled className="max-w-xs">
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}
