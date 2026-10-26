"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
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
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          className={cn(
            "bg-background rounded-card @container flex min-h-[320px] w-full items-center justify-center overflow-x-auto p-6 sm:p-10",
            className
          )}
        >
          <PreviewErrorBoundary name={name}>{preview}</PreviewErrorBoundary>
        </div>
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
