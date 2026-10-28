import { Button } from "@/registry/refer/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/refer/ui/field"
import { Input } from "@/registry/refer/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/refer/ui/select"

export function InputFormDemo() {
  return (
    <form className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-form-name">Name</FieldLabel>
          <Input
            id="input-form-name"
            type="text"
            placeholder="Jordan Lee"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-form-email">Email</FieldLabel>
          <Input
            id="input-form-email"
            type="email"
            placeholder="jordan@example.com"
          />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="input-form-phone">Phone</FieldLabel>
            <Input
              id="input-form-phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-form-country">Country</FieldLabel>
            <Select defaultValue="us">
              <SelectTrigger id="input-form-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="input-form-address">Address</FieldLabel>
          <Input
            id="input-form-address"
            type="text"
            placeholder="123 Main St"
          />
        </Field>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
