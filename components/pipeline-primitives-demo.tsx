"use client"

import * as React from "react"
import { Info } from "lucide-react"

import { CountBadge } from "@/registry/refer/ui/count-badge"
import { CountedCollapsible } from "@/registry/refer/ui/counted-collapsible"
import { SearchPanel } from "@/registry/refer/ui/search-panel"
import { SelectableAvatar } from "@/registry/refer/ui/selectable-avatar"

export function SelectableAvatarDemo() {
  const [selected, setSelected] = React.useState(false)

  return (
    <div className="flex items-center gap-4">
      <SelectableAvatar
        aria-label="Select Alex"
        src="https://github.com/shadcn.png"
        fallback="AL"
        selected={selected}
        onSelectedChange={setSelected}
      />
      <SelectableAvatar
        aria-label="Select Sam"
        fallback="SA"
        selected={!selected}
        onSelectedChange={(next) => setSelected(!next)}
      />
      <SelectableAvatar
        aria-label="Selection unavailable"
        fallback="NA"
        selected={false}
        onSelectedChange={() => {}}
        disabled
      />
    </div>
  )
}

export function CountBadgeDemo() {
  return (
    <div className="flex items-center gap-3">
      <CountBadge count={0} countLabel="items" />
      <CountBadge count={3} countLabel="items" variant="primary" />
      <CountBadge count={12} countLabel="items" variant="info" />
      <CountBadge count={1234} countLabel="items" />
    </div>
  )
}

export function CountedCollapsibleDemo() {
  const [open, setOpen] = React.useState(true)
  const [emptyOpen, setEmptyOpen] = React.useState(false)

  return (
    <div className="w-full space-y-4">
      <CountedCollapsible
        title="Messages"
        titleSuffix={<Info aria-hidden="true" className="size-3.5" />}
        count={2}
        countLabel="messages"
        tone="info"
        open={open}
        onOpenChange={setOpen}
      >
        <p className="bg-card text-foreground rounded-xl p-3">First message</p>
        <p className="bg-card text-foreground rounded-xl p-3">Second message</p>
      </CountedCollapsible>
      <CountedCollapsible
        title="Archive"
        count={0}
        countLabel="messages"
        open={emptyOpen}
        onOpenChange={setEmptyOpen}
      />
    </div>
  )
}

const names = ["Alex Morgan", "Sam Lee", "Taylor James"]

export function SearchPanelDemo() {
  const [query, setQuery] = React.useState("")
  const visibleNames = names.filter((name) =>
    name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <SearchPanel
      aria-label="People"
      searchLabel="Search people by name"
      value={query}
      onValueChange={setQuery}
      count={visibleNames.length}
      countLabel="people shown"
      className="w-full"
    >
      {visibleNames.length ? (
        visibleNames.map((name) => (
          <p key={name} className="bg-card rounded-xl p-3">
            {name}
          </p>
        ))
      ) : (
        <p role="status" className="text-muted-foreground p-4">
          No matching people.
        </p>
      )}
    </SearchPanel>
  )
}
