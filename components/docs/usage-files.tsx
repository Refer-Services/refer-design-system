"use client"

import { ChevronRightIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/refer/ui/collapsible"

export function UsageFiles({ files }: { files: string[] }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="text-muted-foreground hover:text-foreground group flex items-center gap-1 text-xs">
        <ChevronRightIcon className="size-3.5 transition-transform group-data-[state=open]:rotate-90" />
        Show files
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="text-muted-foreground mt-2 flex flex-col gap-1 font-mono text-xs">
          {files.map((file) => (
            <li key={file} className="truncate">
              {file}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
