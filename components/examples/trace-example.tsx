"use client"

import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BrainIcon,
  ChevronRightIcon,
  FileSearchIcon,
  FileTextIcon,
  GlobeIcon,
  LinkIcon,
  SearchIcon,
  SunIcon,
  TerminalIcon,
} from "lucide-react"
import * as React from "react"
import { Example, ExampleWrapper } from "@/components/examples/example"
import { Badge } from "@/registry/refer/ui/badge"
import { Bubble, BubbleContent } from "@/registry/refer/ui/bubble"
import { Button } from "@/registry/refer/ui/button"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/registry/refer/ui/code-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/refer/ui/dialog"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/refer/ui/item"
import { Message, MessageContent } from "@/registry/refer/ui/message"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/refer/ui/sheet"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/refer/ui/trace"

const REASONING = `The user wants to know why the checkout deploy is slow, so I should start from the build log instead of guessing.

The install and compile steps finish in under a minute. Image optimization takes almost four, and it runs on every deploy because the cache key includes the commit hash.

Keying the cache on the lockfile and the image directory should let most deploys skip that step entirely.`

export function TraceExample() {
  return (
    <ExampleWrapper>
      <TraceRows />
      <TraceToolCalls />
      <TraceChainOfThought />
      <TraceTask />
      <TraceSources />
      <TraceTurn />
    </ExampleWrapper>
  )
}

type ApprovalResponse = { id: string; approved: boolean }

function ActivityRow({
  status,
  icon,
  title,
  children,
}: {
  status?: "running" | "error"
  icon: React.ReactNode
  title: React.ReactNode
  children?: React.ReactNode
}) {
  if (!children) {
    return (
      <TraceLine status={status}>
        <TraceIcon>{icon}</TraceIcon>
        <TraceTitle>{title}</TraceTitle>
      </TraceLine>
    )
  }

  return (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine status={status}>
          <TraceIcon>{icon}</TraceIcon>
          <TraceTitle>{title}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>{children}</TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

// A pending approval is a prompt, not activity, so it is an Item. Once
// answered, the tool part renders as a Trace row again.
function LinkActivity({ href, title }: { href: string; title: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <TraceLine>
        <TraceIcon>
          <GlobeGlyph />
        </TraceIcon>
        <TraceTitle>
          {title}
          <span className="sr-only"> (opens in a new tab)</span>
        </TraceTitle>
        <TraceIcon>
          <ArrowUpRightGlyph />
        </TraceIcon>
      </TraceLine>
    </a>
  )
}

function FileActivity({ path, content }: { path: string; content: string }) {
  return (
    <Sheet>
      <SheetTrigger>
        <TraceLine>
          <TraceIcon>
            <FileGlyph />
          </TraceIcon>
          <TraceTitle>Read {path}</TraceTitle>
          <TraceIcon>
            <ChevronRightGlyph />
          </TraceIcon>
        </TraceLine>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-mono">{path}</SheetTitle>
          <SheetDescription>
            {content.split("\n").length} lines
          </SheetDescription>
        </SheetHeader>
        <CodeBlock className="mx-4 mb-4 min-h-0 w-auto flex-1">
          <CodeBlockContent wrap>{content}</CodeBlockContent>
        </CodeBlock>
      </SheetContent>
    </Sheet>
  )
}

function ToolInputOutput({
  input,
  output,
}: {
  input: unknown
  output: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>Input</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent wrap className="max-h-64">
          {JSON.stringify(input)}
        </CodeBlockContent>
      </CodeBlock>
      <CodeBlock size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle>Output</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent wrap className="max-h-64">
          {output}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}

function TraceRows() {
  return (
    <Example title="Rows">
      <Trace className="max-w-md">
        <TraceLine status="running">
          <TraceIcon>
            <FileSearchGlyph />
          </TraceIcon>
          <TraceTitle>Scanning 52 files</TraceTitle>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <TerminalGlyph />
              </TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap className="max-h-64">
                v24.18.0
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <a href="#rows">
          <TraceLine>
            <TraceIcon>
              <FileGlyph />
            </TraceIcon>
            <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
            <TraceIcon>
              <ChevronRightGlyph />
            </TraceIcon>
          </TraceLine>
        </a>
        <Sheet>
          <SheetTrigger>
            <TraceLine>
              <TraceIcon>
                <FileSearchGlyph />
              </TraceIcon>
              <TraceTitle>Explored 4 files</TraceTitle>
              <TraceIcon>
                <ChevronRightGlyph />
              </TraceIcon>
            </TraceLine>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Explored 4 files</SheetTitle>
              <SheetDescription>
                Files read while preparing the response.
              </SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-2 px-4 font-mono text-xs">
              <li>apps/v4/lib/docs.ts</li>
              <li>apps/v4/lib/components.ts</li>
              <li>apps/v4/next.config.mjs</li>
              <li>apps/v4/package.json</li>
            </ul>
          </SheetContent>
        </Sheet>
        <Dialog>
          <DialogTrigger>
            <TraceLine>
              <TraceIcon>
                <GlobeGlyph />
              </TraceIcon>
              <TraceTitle>Searched the web for cache keys</TraceTitle>
              <TraceIcon>
                <ChevronRightGlyph />
              </TraceIcon>
            </TraceLine>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Searched the web for cache keys</DialogTitle>
              <DialogDescription>
                Three results were used in the response.
              </DialogDescription>
            </DialogHeader>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Caching build outputs</li>
              <li>Image optimization reference</li>
              <li>Deploy hooks and cache keys</li>
            </ul>
          </DialogContent>
        </Dialog>
      </Trace>
    </Example>
  )
}

function TraceToolCalls() {
  return (
    <Example title="Tool Calls">
      <Trace className="max-w-md">
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="running">
              <TraceIcon>
                <TerminalGlyph />
              </TraceIcon>
              <TraceTitle>Running npm --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap className="max-h-64">
                $ npm --version
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <GlobeGlyph />
              </TraceIcon>
              <TraceTitle>
                Searched the web for app getting started installation
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent className="flex flex-wrap gap-1.5">
            <Badge variant="secondary">example.com/docs/install</Badge>
            <Badge variant="secondary">example.com/blog/getting-started</Badge>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceLine>
          <TraceIcon>
            <SearchGlyph />
          </TraceIcon>
          <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
        </TraceLine>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <TerminalGlyph />
              </TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent
                wrap
              >{`$ node --version\nv24.18.0`}</CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <TerminalGlyph />
              </TraceIcon>
              <TraceTitle>Failed to run pnpm --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm" variant="destructive">
              <CodeBlockContent wrap className="max-h-64">
                command not found: pnpm
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </Example>
  )
}

function ThinkingTrace({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>()

  return (
    <TraceCollapsible
      open={open ?? (running && text.length > 0)}
      onOpenChange={setOpen}
    >
      <TraceCollapsibleTrigger>
        <TraceLine status={running ? "running" : undefined}>
          <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent className="whitespace-pre-wrap">
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function TraceChainOfThought() {
  return (
    <Example title="Chain of Thought">
      <TraceCollapsible className="max-w-md" defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="running">
            <TraceTitle>Looking into the slow deploy</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <SearchGlyph />
                  </TraceIcon>
                  <TraceTitle>Searched for the checkout build log</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">vercel.com</Badge>
                <Badge variant="secondary">github.com</Badge>
                <Badge variant="secondary">nextjs.org</Badge>
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible defaultOpen>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <FileGlyph />
                  </TraceIcon>
                  <TraceTitle>Read the last twelve deploys</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                Image optimization takes almost four minutes on every deploy.
                The other steps finish in under a minute.
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine status="running">
                  <TraceIcon>
                    <SearchGlyph />
                  </TraceIcon>
                  <TraceTitle>Searching for the cache key</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <CodeBlock size="sm">
                  <CodeBlockContent wrap className="max-h-64">
                    cache key image optimization
                  </CodeBlockContent>
                </CodeBlock>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

function TraceTask() {
  return (
    <Example title="Task">
      <TraceCollapsible className="max-w-md" defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>Found the project files</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <SearchGlyph />
              </TraceIcon>
              <TraceTitle>Searched for app/page.tsx</TraceTitle>
            </TraceLine>
            <a href="#task">
              <TraceLine>
                <TraceIcon>
                  <FileGlyph />
                </TraceIcon>
                <TraceTitle>Read app/page.tsx</TraceTitle>
                <TraceIcon>
                  <ChevronRightGlyph />
                </TraceIcon>
              </TraceLine>
            </a>
            <TraceLine>
              <TraceIcon>
                <FileSearchGlyph />
              </TraceIcon>
              <TraceTitle>Scanned 52 files</TraceTitle>
            </TraceLine>
            <a href="#task">
              <TraceLine>
                <TraceIcon>
                  <FileGlyph />
                </TraceIcon>
                <TraceTitle>Read app/layout.tsx</TraceTitle>
                <TraceIcon>
                  <ChevronRightGlyph />
                </TraceIcon>
              </TraceLine>
            </a>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

const SOURCES = [
  {
    title: "Caching build outputs | example.com",
    href: "https://example.com/docs/caching",
  },
  {
    title: "Image optimization reference | example.com",
    href: "https://example.com/docs/images",
  },
  {
    title: "Deploy hooks and cache keys | example.com",
    href: "https://example.com/docs/deploy-hooks",
  },
]

function TraceSources() {
  return (
    <Example title="Sources">
      <TraceCollapsible className="max-w-md" defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>Used {SOURCES.length} sources</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {SOURCES.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <TraceLine>
                  <TraceIcon>
                    <GlobeGlyph />
                  </TraceIcon>
                  <TraceTitle>
                    {source.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <ArrowUpRightGlyph />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

function TraceTurn() {
  return (
    <Example title="Whole Turn" containerClassName="md:col-span-2">
      <TraceCollapsible className="max-w-md" defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceTitle>Worked for 2m 4s, 1 command failed</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent className="flex flex-col gap-2">
          <Trace>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <BrainGlyph />
                  </TraceIcon>
                  <TraceTitle>Thought for 12 seconds</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent className="whitespace-pre-wrap">
                {REASONING}
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible defaultOpen>
              <TraceCollapsibleTrigger>
                <TraceLine status="error">
                  <TraceIcon>
                    <TerminalGlyph />
                  </TraceIcon>
                  <TraceTitle>Ran 3 commands, 1 failed</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <Trace>
                  <TraceCollapsible>
                    <TraceCollapsibleTrigger>
                      <TraceLine>
                        <TraceIcon>
                          <TerminalGlyph />
                        </TraceIcon>
                        <TraceTitle>Ran node --version</TraceTitle>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent>
                      <CodeBlock size="sm">
                        <CodeBlockContent wrap className="max-h-64">
                          v24.18.0
                        </CodeBlockContent>
                      </CodeBlock>
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                  <TraceLine>
                    <TraceIcon>
                      <TerminalGlyph />
                    </TraceIcon>
                    <TraceTitle>Ran mkdir -p dist</TraceTitle>
                  </TraceLine>
                  <TraceCollapsible>
                    <TraceCollapsibleTrigger>
                      <TraceLine status="error">
                        <TraceIcon>
                          <TerminalGlyph />
                        </TraceIcon>
                        <TraceTitle>Failed to run pnpm --version</TraceTitle>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent>
                      <CodeBlock size="sm" variant="destructive">
                        <CodeBlockContent wrap className="max-h-64">
                          command not found: pnpm
                        </CodeBlockContent>
                      </CodeBlock>
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                </Trace>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
          <p>Node is installed and pnpm is not. Reading the docs config.</p>
          <Trace>
            <a href="#whole-turn">
              <TraceLine>
                <TraceIcon>
                  <FileGlyph />
                </TraceIcon>
                <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
                <TraceIcon>
                  <ChevronRightGlyph />
                </TraceIcon>
              </TraceLine>
            </a>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

function ChevronRightGlyph() {
  return <ChevronRightIcon />
}

function ArrowUpRightGlyph() {
  return <ArrowUpRightIcon />
}

function BrainGlyph() {
  return <BrainIcon />
}

function SearchGlyph() {
  return <SearchIcon />
}

function FileGlyph() {
  return <FileTextIcon />
}

function FileSearchGlyph() {
  return <FileSearchIcon />
}

function TerminalGlyph() {
  return <TerminalIcon />
}

function SunGlyph() {
  return <SunIcon />
}

function BookGlyph() {
  return <BookOpenIcon />
}

function LinkGlyph() {
  return <LinkIcon />
}

function GlobeGlyph() {
  return <GlobeIcon />
}
