"use client"

import { CheckCheck, House, TextSearch, Users } from "lucide-react"

import { Badge } from "@/registry/refer/ui/badge"
import { ReferMenuItem } from "@/registry/refer/ui/refer-menu-item"

export function MenuItemDemo() {
  return (
    <div className="flex w-56 flex-col gap-1">
      <ReferMenuItem>
        <House className="size-5" />
        Home
      </ReferMenuItem>
      <ReferMenuItem variant="selected">
        <TextSearch className="size-5 opacity-70" />
        Search
      </ReferMenuItem>
      <ReferMenuItem>
        <CheckCheck className="size-5" />
        Requests
        <Badge className="h-4.5 min-w-4.5 rounded-full px-1 font-mono tabular-nums opacity-90">
          5
        </Badge>
      </ReferMenuItem>
      <ReferMenuItem>
        <Users className="size-5" />
        Connections
      </ReferMenuItem>
    </div>
  )
}
