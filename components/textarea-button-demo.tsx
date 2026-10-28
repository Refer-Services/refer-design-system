import { Button } from "@/registry/refer/ui/button"
import { Textarea } from "@/registry/refer/ui/textarea"

export function TextareaButtonDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Textarea placeholder="Type your message here." aria-label="Message" />
      <Button>Send message</Button>
    </div>
  )
}
