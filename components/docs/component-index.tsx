"use client"

import * as React from "react"
import Link from "next/link"

import type { DocsItem } from "@/lib/docs"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/refer/ui/tabs"

type IndexItem = DocsItem & { uses: number }

export function ComponentIndex({ items }: { items: IndexItem[] }) {
  const fresh = items.filter((item) => item.isNew)
  const unused = items.filter((item) => item.uses === 0)

  return (
    <Tabs defaultValue="all" className="gap-6">
      <TabsList>
        <TabsTrigger value="all">
          All <Count value={items.length} />
        </TabsTrigger>
        <TabsTrigger value="new">
          New <Count value={fresh.length} />
        </TabsTrigger>
        <TabsTrigger value="unused">
          Unused <Count value={unused.length} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Grid items={items} />
      </TabsContent>
      <TabsContent value="new">
        <Grid items={fresh} />
      </TabsContent>
      <TabsContent value="unused" className="flex flex-col gap-4">
        <p className="text-muted-foreground max-w-prose text-sm">
          Components no app imports yet. Candidates to adopt, or to review
          before the next upstream sync.
        </p>
        <Grid items={unused} />
      </TabsContent>
    </Tabs>
  )
}

function Count({ value }: { value: number }) {
  return (
    <span className="text-muted-foreground/70 text-xs tabular-nums">
      {value}
    </span>
  )
}

function Grid({ items }: { items: IndexItem[] }) {
  return (
    <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.name}
          href={`/components/${item.name}`}
          className="hover:bg-accent rounded-input -mx-2.5 flex items-baseline gap-2 px-2.5 py-2.5 transition-colors"
        >
          <span className="font-medium">{item.title}</span>
          {item.isNew && (
            <span
              aria-label="New"
              className="bg-primary size-1.5 self-center rounded-full"
            />
          )}
          <span className="text-muted-foreground ml-auto text-xs tabular-nums">
            {item.uses === 0 ? "Unused" : `${item.uses} uses`}
          </span>
        </Link>
      ))}
    </div>
  )
}
