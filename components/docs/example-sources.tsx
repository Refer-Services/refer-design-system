"use client"

import * as React from "react"

// Server-rendered code for each gallery section, keyed by the section's <Example title>.
const ExampleSourcesContext = React.createContext<
  Record<string, React.ReactNode>
>({})

export function ExampleSourcesProvider({
  sources,
  children,
}: {
  sources: Record<string, React.ReactNode>
  children: React.ReactNode
}) {
  return (
    <ExampleSourcesContext.Provider value={sources}>
      {children}
    </ExampleSourcesContext.Provider>
  )
}

export function useExampleSource(title?: string) {
  const sources = React.useContext(ExampleSourcesContext)
  return title ? sources[title] : undefined
}
