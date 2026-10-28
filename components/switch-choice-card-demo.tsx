import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/registry/refer/ui/field"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchChoiceCardDemo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-choice-card-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-choice-card-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-choice-card-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-choice-card-notifications" defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
