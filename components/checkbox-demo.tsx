"use client"

import { Checkbox } from "@/registry/refer/ui/checkbox"
import { Label } from "@/registry/refer/ui/label"
import {
  CheckboxBoxed,
  CheckboxBoxedTitle,
  CheckboxBoxedDescription
} from "@/registry/refer/ui/checkbox-boxed"

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

      {/* <Label className="hover:bg-accent has-[[aria-checked=true]]:border-primary-border has-[[aria-checked=true]]:bg-primary-subtle group flex items-start gap-2 rounded-xl border px-3.5 py-3 has-[[aria-checked=true]]:border-t-[2px] has-[[aria-checked=true]]:pt-[11px] dark:has-[[aria-checked=true]]:border-t-[1px] dark:has-[[aria-checked=true]]:pt-3">
        <Checkbox id="toggle-2" defaultChecked className="" />
        <div className="grid gap-0.5 font-normal">
          <p className="group-has-[[aria-checked=true]]:text-primary-content dark:group-has-[[aria-checked=true]]:text-foreground text-sm leading-none font-medium">
            Enable notifications
          </p>
          <p className="text-muted-foreground group-has-[[aria-checked=true]]:text-primary-content/80 dark:group-has-[[aria-checked=true]]:text-primary-content text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label> */}

      <CheckboxBoxed>
          <CheckboxBoxedTitle> 
            Enable notificationsss
          </CheckboxBoxedTitle>
          <CheckboxBoxedDescription>
            You can enable or disable notifications at any time.
          </CheckboxBoxedDescription>
      </CheckboxBoxed>

      <div className="flex flex-row gap-2">
        <CheckboxBoxed>
          <CheckboxBoxedTitle> 
            Option 1
          </CheckboxBoxedTitle>
        </CheckboxBoxed>
        <CheckboxBoxed>
          <CheckboxBoxedTitle> 
            Option 2
          </CheckboxBoxedTitle>
        </CheckboxBoxed>
        <CheckboxBoxed>
          <CheckboxBoxedTitle> 
            Option 3
          </CheckboxBoxedTitle>
        </CheckboxBoxed>
      </div>
    </div>
  )
}
