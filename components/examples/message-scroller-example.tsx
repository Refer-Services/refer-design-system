"use client"

import * as React from "react"

import { Example, ExampleWrapper } from "@/components/examples/example"
import { Bubble, BubbleContent } from "@/registry/refer/ui/bubble"
import { Button } from "@/registry/refer/ui/button"
import { Marker, MarkerContent, MarkerIcon } from "@/registry/refer/ui/marker"
import { Message, MessageContent } from "@/registry/refer/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/registry/refer/ui/message-scroller"
import { Spinner } from "@/registry/refer/ui/spinner"

// shadcn's own example drives this with the AI SDK; these are static stand-ins.

const script = [
  "Which roles are open right now?",
  "Product Designer, Senior Backend Engineer and Data Analyst.",
  "Who referred the most candidates this month?",
  "Marina, with four referrals. Two are already in interviews.",
  "Can you draft a thank-you note to her?",
  "Sure. Here's a short note you can send from the referrals page.",
]

type ChatMessage = { id: string; role: "user" | "assistant"; text: string }

function seed(count: number): ChatMessage[] {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index),
    role: index % 2 === 0 ? "user" : "assistant",
    text: script[index % script.length],
  }))
}

function ChatList({ messages }: { messages: ChatMessage[] }) {
  return messages.map((message) => (
    <MessageScrollerItem
      key={message.id}
      messageId={message.id}
      scrollAnchor={message.role === "user"}
    >
      <Message align={message.role === "user" ? "end" : "start"}>
        <MessageContent>
          <Bubble variant={message.role === "user" ? "default" : "muted"}>
            <BubbleContent>{message.text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  ))
}

function MessageScrollerChat() {
  const [messages, setMessages] = React.useState(() => seed(6))
  const [thinking, setThinking] = React.useState(false)

  function send() {
    setMessages((current) => [
      ...current,
      {
        id: String(current.length),
        role: "user",
        text: script[current.length % script.length],
      },
    ])
    setThinking(true)
    window.setTimeout(() => {
      setThinking(false)
      setMessages((current) => [
        ...current,
        {
          id: String(current.length),
          role: "assistant",
          text: script[current.length % script.length],
        },
      ])
    }, 900)
  }

  return (
    <Example title="Chat" containerClassName="md:col-span-2">
      <div className="bg-background h-96 w-full overflow-hidden rounded-xl border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                <ChatList messages={messages} />
                {thinking ? (
                  <MessageScrollerItem scrollAnchor={false}>
                    <Marker role="status">
                      <MarkerIcon>
                        <Spinner />
                      </MarkerIcon>
                      <MarkerContent className="shimmer">
                        Thinking...
                      </MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <Button size="sm" onClick={send} disabled={thinking}>
        Send next message
      </Button>
    </Example>
  )
}

function MessageScrollerHistory() {
  const [messages, setMessages] = React.useState(() =>
    seed(4).map((m) => ({ ...m, id: `h${m.id}` }))
  )

  function loadOlder() {
    setMessages((current) => [
      ...seed(4).map((m) => ({ ...m, id: `o${current.length}-${m.id}` })),
      ...current,
    ])
  }

  return (
    <Example title="Prepending history">
      <div className="bg-background h-72 w-full overflow-hidden rounded-xl border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                <ChatList messages={messages} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <Button variant="outline" size="sm" onClick={loadOlder}>
        Load older messages
      </Button>
    </Example>
  )
}

function MessageScrollerLong() {
  return (
    <Example title="Scroll to bottom">
      <div className="bg-background h-72 w-full overflow-hidden rounded-xl border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                <ChatList messages={seed(14)} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
    </Example>
  )
}

export function MessageScrollerExample() {
  return (
    <ExampleWrapper>
      <MessageScrollerChat />
      <MessageScrollerHistory />
      <MessageScrollerLong />
    </ExampleWrapper>
  )
}
