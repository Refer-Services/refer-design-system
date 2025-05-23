"use client"

import { Checkbox } from "@/registry/refer/ui/checkbox"
import { Label } from "@/registry/refer/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-start gap-2">
        <Checkbox id="terms-2" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="terms-2">Accept terms and conditions</Label>
          <p className="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Checkbox id="toggle" disabled />
        <Label htmlFor="toggle">Enable notifications</Label>
      </div>

      <Label className="hover:bg-accent/50 flex items-start gap-2 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] group">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className=""
        />
        <div className="grid gap-0.5 font-normal">
          <p className="text-sm leading-none font-medium group-has-[[aria-checked=true]]:text-primary">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm group-has-[[aria-checked=true]]:text-primary/70">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>

    </div>
  )
}
