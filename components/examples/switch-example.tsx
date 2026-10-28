"use client"

import { Example, ExampleWrapper } from "@/components/examples/example"
import { Field, FieldLabel } from "@/registry/refer/ui/field"
import { Label } from "@/registry/refer/ui/label"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchExample() {
  return (
    <ExampleWrapper>
      <SwitchBasic />
      <SwitchWithDescription />
      <SwitchWithLabel />
      <SwitchDisabled />
      <SwitchSizes />
    </ExampleWrapper>
  )
}

function SwitchBasic() {
  return (
    <Example title="Basic">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </Example>
  )
}

function SwitchWithLabel() {
  return (
    <Example title="With Label">
      <div className="flex items-center gap-2">
        <Switch id="switch-bluetooth" defaultChecked />
        <Label htmlFor="switch-bluetooth">Bluetooth</Label>
      </div>
    </Example>
  )
}

function SwitchWithDescription() {
  return (
    <Example title="With Description">
      {/* Same card as RadioGroupItemBoxed and CheckboxBoxed. */}
      <Label
        htmlFor="switch-focus-mode"
        className="hover:bg-accent has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle group flex items-start gap-3 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] dark:has-[[aria-checked=true]]:border-t-[1px] dark:has-[[aria-checked=true]]:pt-3"
      >
        <div className="grid flex-1 gap-0.5 font-normal">
          <p className="group-has-[[aria-checked=true]]:text-primary-content dark:group-has-[[aria-checked=true]]:text-foreground pt-px text-sm leading-none font-medium">
            Share across devices
          </p>
          <p className="text-muted-foreground group-has-[[aria-checked=true]]:text-primary-content/80 dark:group-has-[[aria-checked=true]]:text-primary-content text-sm">
            Focus is shared across devices, and turns off when you leave the
            app.
          </p>
        </div>
        <Switch id="switch-focus-mode" />
      </Label>
    </Example>
  )
}

function SwitchDisabled() {
  return (
    <Example title="Disabled">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-2">
          <Switch id="switch-disabled-unchecked" disabled />
          <Label htmlFor="switch-disabled-unchecked">
            Disabled (Unchecked)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-disabled-checked" defaultChecked disabled />
          <Label htmlFor="switch-disabled-checked">Disabled (Checked)</Label>
        </div>
      </div>
    </Example>
  )
}

function SwitchSizes() {
  return (
    <Example title="Sizes">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-2">
          <Switch id="switch-size-sm" size="sm" />
          <Label htmlFor="switch-size-sm">Small</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="switch-size-default" size="default" />
          <Label htmlFor="switch-size-default">Default</Label>
        </div>
      </div>
    </Example>
  )
}
