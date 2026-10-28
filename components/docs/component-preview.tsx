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
  surface = "background",
}: {
  name: string
  preview: React.ReactNode
  code: React.ReactNode
  className?: string
  // The stage's color: the page background, or a card for components that mostly sit on cards.
  surface?: "background" | "card"
}) {
  return (
    <Tabs defaultValue="preview" className="gap-4">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {/* Demos fit the stage width (w-full children wrap or truncate). A demo wider than the stage scrolls from its
            start instead of being cut (justify-center-safe); padding stays inside so shadows aren't clipped. */}
        <ScrollArea
          className={cn(
            "rounded-card @container w-full [&_[data-slot=scroll-area-viewport]>div]:block!",
            surface === "card" ? "bg-card border" : "bg-background"
          )}
        >
          <div
            className={cn(
              "flex min-h-[320px] w-full items-center justify-center-safe p-6 sm:p-10",
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
