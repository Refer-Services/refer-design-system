import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Textarea } from "@/registry/refer/ui/textarea"

export function TextareaInvalidDemo() {
  return (
    <Field data-invalid className="max-w-xs">
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid
      />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}
