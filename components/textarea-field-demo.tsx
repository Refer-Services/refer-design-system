import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Textarea } from "@/registry/refer/ui/textarea"

export function TextareaFieldDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="textarea-field-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea
        id="textarea-field-message"
        placeholder="Type your message here."
      />
    </Field>
  )
}
