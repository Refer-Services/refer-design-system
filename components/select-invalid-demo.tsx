import { Field, FieldError, FieldLabel } from "@/registry/refer/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/refer/ui/select"

export function SelectInvalidDemo() {
  return (
    <Field data-invalid className="w-full max-w-48">
      <FieldLabel htmlFor="select-invalid">Fruit</FieldLabel>
      <Select>
        <SelectTrigger id="select-invalid" aria-invalid>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  )
}
