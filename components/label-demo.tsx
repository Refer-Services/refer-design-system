import { Checkbox } from "@/registry/refer/ui/checkbox"
import { Label } from "@/registry/refer/ui/label"

export function LabelDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </div>
  )
}
