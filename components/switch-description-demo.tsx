import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/refer/ui/field"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchDescriptionDemo() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-description-focus-mode">
          Share across devices
        </FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-description-focus-mode" />
    </Field>
  )
}
