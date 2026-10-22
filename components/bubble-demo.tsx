import { Bubble, BubbleContent } from "@/registry/refer/ui/bubble"

export function BubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Bubble align="end">
        <BubbleContent>Can you share the shortlist for the design role?</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>
          Sure. Three candidates passed screening this week.
        </BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted bubbles work for quiet system notes.</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>Tinted bubbles soften the primary fill.</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline bubbles frame quoted content.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>The referral link could not be sent.</BubbleContent>
      </Bubble>
    </div>
  )
}
