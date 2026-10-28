import { Textarea } from "@/registry/refer/ui/textarea"

export function TextareaDemo() {
  return (
    <Textarea
      className="max-w-xs"
      placeholder="Type your message here."
      aria-label="Message"
    />
  )
}
