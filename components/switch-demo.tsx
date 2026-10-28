import { Label } from "@/registry/refer/ui/label"
import { Switch } from "@/registry/refer/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch-demo-airplane-mode" />
      <Label htmlFor="switch-demo-airplane-mode">Airplane Mode</Label>
    </div>
  )
}
