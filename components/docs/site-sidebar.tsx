"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { DocsItem } from "@/lib/docs"
import { ScrollArea } from "@/registry/refer/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/refer/ui/sidebar"

export function SiteSidebar({
  items,
  ...props
}: React.ComponentProps<typeof Sidebar> & { items: DocsItem[] }) {
  const pathname = usePathname()
  const foundations = items.filter((item) => item.kind === "foundation")
  const components = items.filter((item) => item.kind === "component")
  const fresh = components.filter((item) => item.isNew)

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src="/apple-touch-icon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="squircle size-7 rounded-lg shadow-xs"
                  priority
                />
                <span className="text-sm font-semibold">Refer Design System</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0 overflow-hidden">
        <ScrollArea className="[&_[data-slot=scroll-area-viewport]]:scroll-fade-y min-h-0 flex-1 [&_[data-slot=scroll-area-viewport]>div]:block!">
          <NavGroup label="Overview">
            <NavLink href="/" active={pathname === "/"}>
              All components
            </NavLink>
            {foundations.map((item) => (
              <NavLink
                key={item.name}
                href={`/components/${item.name}`}
                active={pathname === `/components/${item.name}`}
              >
                {item.title}
              </NavLink>
            ))}
          </NavGroup>
          <NavGroup label="New">
            {fresh.map((item) => (
              <NavLink
                key={item.name}
                href={`/components/${item.name}`}
                active={pathname === `/components/${item.name}`}
              >
                {item.title}
              </NavLink>
            ))}
          </NavGroup>
          <NavGroup label="Components">
            {components.map((item) => (
              <NavLink
                key={item.name}
                href={`/components/${item.name}`}
                active={pathname === `/components/${item.name}`}
                isNew={item.isNew}
              >
                {item.title}
              </NavLink>
            ))}
          </NavGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}

function NavGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu className="gap-0.5">{children}</SidebarMenu>
    </SidebarGroup>
  )
}

function NavLink({
  href,
  active,
  isNew,
  children,
}: {
  href: string
  active: boolean
  isNew?: boolean
  children: React.ReactNode
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} size="sm" className="text-sm font-medium">
        <Link href={href}>
          <span>{children}</span>
          {isNew && (
            <span
              aria-label="New"
              className="bg-primary ml-auto size-1.5 rounded-full"
            />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
