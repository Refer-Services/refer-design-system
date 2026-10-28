import { Badge } from "@/registry/refer/ui/badge"
import { Field, FieldLabel } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputBadgeDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary_subtle" className="ml-auto">
          Beta
        </Badge>
      </FieldLabel>
      <Input
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </Field>
  )
}
