import { Avatar, AvatarFallback } from "@/registry/refer/ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/registry/refer/ui/bubble"
import { Button } from "@/registry/refer/ui/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/registry/refer/ui/message"

export function MessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>
            <span>Marina Silva</span>
            <span className="ml-auto font-normal">2m ago</span>
          </MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              I referred Ana for the product designer role. She worked with me
              for three years.
            </BubbleContent>
            <BubbleReactions>
              <Button variant="ghost" size="xs">
                Thanks
              </Button>
            </BubbleReactions>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <MessageHeader className="justify-end">You</MessageHeader>
          <Bubble>
            <BubbleContent>
              Great, I&apos;ll move her to the interview stage today.
            </BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>Delivered</span>
            <Button variant="ghost" size="xs">
              Undo
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
