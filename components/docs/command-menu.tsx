"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import type { DocsItem } from "@/lib/docs"
import { Button } from "@/registry/refer/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/refer/ui/command"
import { Kbd, KbdGroup } from "@/registry/refer/ui/kbd"

// Search by component name, opened from the header or with ⌘K / Ctrl+K or "/".
export function CommandMenu({ items }: { items: DocsItem[] }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing =
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(name: string) {
    setOpen(false)
    router.push(name ? `/components/${name}` : "/")
  }

  const foundations = items.filter((item) => item.kind === "foundation")
  const components = items.filter((item) => item.kind === "component")

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-muted-foreground w-full justify-start gap-2 font-normal sm:w-64"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        <span>Search components…</span>
        <KbdGroup className="ml-auto hidden sm:inline-flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search components"
        description="Find a component by name"
      >
        <CommandInput placeholder="Search components…" />
        <CommandList className="scroll-fade-y">
          <CommandEmpty>No component found.</CommandEmpty>
          <CommandGroup heading="Overview">
            <CommandItem value="all components" onSelect={() => go("")}>
              All components
            </CommandItem>
            {foundations.map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.title} ${item.name}`}
                onSelect={() => go(item.name)}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {components.map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.title} ${item.name} ${item.description ?? ""}`}
                onSelect={() => go(item.name)}
              >
                <span className="shrink-0">{item.title}</span>
                {item.description && (
                  <span className="text-muted-foreground group-data-[selected=true]/command-item:text-primary-foreground/80 ml-2 truncate text-xs">
                    {item.description}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
