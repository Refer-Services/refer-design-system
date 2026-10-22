"use client"

import * as React from "react"

import { Bubble, BubbleContent } from "@/registry/refer/ui/bubble"
import { Button } from "@/registry/refer/ui/button"
import { Message, MessageContent } from "@/registry/refer/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/registry/refer/ui/message-scroller"

const replies = [
  "Which roles are open right now?",
  "Product Designer, Senior Backend Engineer and Data Analyst.",
  "Who referred the most candidates this month?",
  "Marina, with four referrals. Two are already in interviews.",
]

export function MessageScrollerDemo() {
  const [messages, setMessages] = React.useState(() =>
    Array.from({ length: 8 }, (_, index) => ({
      id: String(index),
      role: index % 2 === 0 ? "user" : "assistant",
      text: replies[index % replies.length],
    }))
  )

  function addMessage() {
    setMessages((current) => [
      ...current,
      {
        id: String(current.length),
        role: current.length % 2 === 0 ? "user" : "assistant",
        text: replies[current.length % replies.length],
      },
    ])
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="bg-card h-80 overflow-hidden rounded-xl border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.role === "user"}
                  >
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        <Bubble
                          variant={
                            message.role === "user" ? "default" : "muted"
                          }
                        >
                          <BubbleContent>{message.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <Button variant="outline" size="sm" onClick={addMessage}>
        Add message
      </Button>
    </div>
  )
}
