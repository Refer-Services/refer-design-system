"use client"

import { ChevronRightIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/refer/ui/collapsible"
import { ScrollArea } from "@/registry/refer/ui/scroll-area"

export function UsageFiles({ files }: { files: string[] }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="text-muted-foreground hover:text-foreground group flex items-center gap-1 text-xs">
        <ChevronRightIcon className="size-3.5 transition-transform group-data-[state=open]:rotate-90" />
        Show files
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="[&_[data-slot=scroll-area-viewport]]:scroll-fade-y mt-2 max-h-56 [&_[data-slot=scroll-area-viewport]]:max-h-56 [&_[data-slot=scroll-area-viewport]>div]:block!">
          <ul className="text-muted-foreground flex flex-col gap-1 pr-3 font-mono text-xs">
            {files.map((file) => (
              <li key={file} className="truncate">
                {file}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  )
}
