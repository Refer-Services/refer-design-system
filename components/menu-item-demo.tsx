"use client"

import { ReferMenuItem } from "@/registry/refer/ui/refer-menu-item"
import { Badge } from "@/registry/refer/ui/badge"
import { Users, House, TextSearch, CheckCheck } from "lucide-react"


export function MenuItemDemo() {
  return (
    <div className="flex flex-col gap-1 w-56">
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
