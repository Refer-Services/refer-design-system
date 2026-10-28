import { Button } from "@/registry/refer/ui/button"
import { Field } from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"

export function InputInlineDemo() {
  return (
    <Field orientation="horizontal" className="max-w-xs">
      <Input type="search" placeholder="Search..." aria-label="Search" />
      <Button>Search</Button>
    </Field>
  )
}
