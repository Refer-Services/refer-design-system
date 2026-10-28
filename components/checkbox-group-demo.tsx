import { Checkbox } from "@/registry/refer/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/refer/ui/field"

const items = [
  { id: "hard-disks", label: "Hard disks", checked: true },
  { id: "external-disks", label: "External disks", checked: true },
  { id: "cds-dvds", label: "CDs, DVDs, and iPods", checked: false },
  { id: "connected-servers", label: "Connected servers", checked: false },
] as const

export function CheckboxGroupDemo() {
  return (
    <FieldSet>
      <FieldLegend variant="label">
        Show these items on the desktop:
      </FieldLegend>
      <FieldDescription>
        Select the items you want to show on the desktop.
      </FieldDescription>
      <FieldGroup className="gap-3">
        {items.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox
              id={`checkbox-group-${item.id}`}
              name={`checkbox-group-${item.id}`}
              defaultChecked={item.checked}
            />
            <FieldLabel
              htmlFor={`checkbox-group-${item.id}`}
              className="font-normal"
            >
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
