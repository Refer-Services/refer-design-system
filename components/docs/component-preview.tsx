"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/registry/refer/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/refer/ui/tabs"

// A demo with Preview and Code tabs. `code` is rendered on the server (DocsCode).
export function ComponentPreview({
  name,
  preview,
  code,
  className,
}: {
  name: string
  preview: React.ReactNode
  code: React.ReactNode
  className?: string
}) {
  return (
    <Tabs defaultValue="preview" className="gap-4">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {/* Scrolls instead of clipping when a demo is wider than the page; the padding stays inside the scroll area
            so shadows and focus rings aren't cut at the edges. */}
        <ScrollArea className="bg-background rounded-card @container w-full">
          <div
            className={cn(
              "flex min-h-[320px] w-max min-w-full items-center justify-center p-6 sm:p-10",
              className
            )}
          >
            <PreviewErrorBoundary name={name}>{preview}</PreviewErrorBoundary>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="code">{code}</TabsContent>
    </Tabs>
  )
}

class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error(`Error rendering the ${this.props.name} demo:`, error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-destructive-content text-sm">
          The {this.props.name} demo failed to render. See the console.
        </p>
      )
    }
    return this.props.children
  }
}
