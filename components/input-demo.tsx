import { Field, FieldDescription, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>
        Your API key is encrypted and stored securely.
      </FieldDescription>
    </Field>
  )
}
