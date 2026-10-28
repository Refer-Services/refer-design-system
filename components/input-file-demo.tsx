import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputFileDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-file-resume">Resume</FieldLabel>
      <Input id="input-file-resume" type="file" />
      <FieldDescription>Select a resume to upload.</FieldDescription>
    </Field>
  )
}
