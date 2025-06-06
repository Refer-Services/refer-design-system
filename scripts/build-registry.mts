import { exec } from "child_process"
import { promises as fs, readFileSync } from "fs"
import path from "path"
import { rimraf } from "rimraf"
import { registryItemSchema, type Registry } from "shadcn/registry"
import { z } from "zod"

const ROOT = process.cwd()
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ds.tryrefer.com"

const registry = {
  name: "shadcn/ui",
  homepage: BASE_URL,
  items: z.array(registryItemSchema).parse([
    {
      name: "accordion",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-accordion"],
      files: [
        {
          path: "ui/accordion.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "alert",
      type: "registry:ui",
      files: [
        {
          path: "ui/alert.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "alert-dialog",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-alert-dialog"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/alert-dialog.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "aspect-ratio",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-aspect-ratio"],
      files: [
        {
          path: "ui/aspect-ratio.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "avatar",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-avatar"],
      files: [
        {
          path: "ui/avatar.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "badge",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      files: [
        {
          path: "ui/badge.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "breadcrumb",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      files: [
        {
          path: "ui/breadcrumb.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "button",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      files: [
        {
          path: "ui/button.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "calendar",
      type: "registry:ui",
      dependencies: ["react-day-picker@9.7.0", "date-fns@3.6.0"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/calendar.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "card",
      type: "registry:ui",
      files: [
        {
          path: "ui/card.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "carousel",
      type: "registry:ui",
      dependencies: ["embla-carousel-react"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/carousel.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "chart",
      type: "registry:ui",
      dependencies: ["recharts", "lucide-react"],
      registryDependencies: ["card"],
      files: [
        {
          path: "ui/chart.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "checkbox",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-checkbox"],
      files: [
        {
          path: "ui/checkbox.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "checkbox-boxed",
      type: "registry:ui",
      registryDependencies: ["checkbox", "label"],
      files: [
        {
          path: "ui/checkbox-boxed.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "collapsible",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-collapsible"],
      files: [
        {
          path: "ui/collapsible.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "command",
      type: "registry:ui",
      dependencies: ["cmdk"],
      registryDependencies: ["dialog"],
      files: [
        {
          path: "ui/command.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "context-menu",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-context-menu"],
      files: [
        {
          path: "ui/context-menu.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "dialog",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-dialog"],
      files: [
        {
          path: "ui/dialog.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "drawer",
      type: "registry:ui",
      dependencies: ["vaul", "@radix-ui/react-dialog"],
      files: [
        {
          path: "ui/drawer.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "dropdown-menu",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-dropdown-menu"],
      files: [
        {
          path: "ui/dropdown-menu.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "form",
      type: "registry:ui",
      dependencies: [
        "@radix-ui/react-label",
        "@radix-ui/react-slot",
        "@hookform/resolvers",
        "zod",
        "react-hook-form",
      ],
      registryDependencies: ["button", "label"],
      files: [
        {
          path: "ui/form.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "hover-card",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-hover-card"],
      files: [
        {
          path: "ui/hover-card.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "input",
      type: "registry:ui",
      files: [
        {
          path: "ui/input.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "input-otp",
      type: "registry:ui",
      dependencies: ["input-otp"],
      files: [
        {
          path: "ui/input-otp.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "label",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-label"],
      files: [
        {
          path: "ui/label.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "menubar",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-menubar"],
      files: [
        {
          path: "ui/menubar.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "navigation-menu",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-navigation-menu"],
      files: [
        {
          path: "ui/navigation-menu.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "pagination",
      type: "registry:ui",
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/pagination.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "popover",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-popover"],
      files: [
        {
          path: "ui/popover.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "progress",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-progress"],
      files: [
        {
          path: "ui/progress.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "radio-group",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-radio-group"],
      files: [
        {
          path: "ui/radio-group.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "resizable",
      type: "registry:ui",
      dependencies: ["react-resizable-panels"],
      files: [
        {
          path: "ui/resizable.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "scroll-area",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-scroll-area"],
      files: [
        {
          path: "ui/scroll-area.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "select",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-select"],
      files: [
        {
          path: "ui/select.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "separator",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-separator"],
      files: [
        {
          path: "ui/separator.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "sheet",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-dialog"],
      files: [
        {
          path: "ui/sheet.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "sidebar",
      type: "registry:ui",
      dependencies: [
        "@radix-ui/react-slot",
        "class-variance-authority",
        "lucide-react",
      ],
      registryDependencies: [
        "button",
        "separator",
        "sheet",
        "tooltip",
        "input",
        "use-mobile",
        "skeleton",
      ],
      files: [
        {
          path: "ui/sidebar.tsx",
          type: "registry:ui",
        },
      ],
      tailwind: {
        config: {
          theme: {
            extend: {
              colors: {
                sidebar: {
                  DEFAULT: "hsl(var(--sidebar-background))",
                  foreground: "hsl(var(--sidebar-foreground))",
                  primary: "hsl(var(--sidebar-primary))",
                  "primary-foreground":
                    "hsl(var(--sidebar-primary-foreground))",
                  accent: "hsl(var(--sidebar-accent))",
                  "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                  border: "hsl(var(--sidebar-border))",
                  ring: "hsl(var(--sidebar-ring))",
                },
              },
            },
          },
        },
      },
      cssVars: {
        light: {
          "sidebar-background": "0 0% 98%",
          "sidebar-foreground": "240 5.3% 26.1%",
          "sidebar-primary": "240 5.9% 10%",
          "sidebar-primary-foreground": "0 0% 98%",
          "sidebar-accent": "240 4.8% 95.9%",
          "sidebar-accent-foreground": "240 5.9% 10%",
          "sidebar-border": "220 13% 91%",
          "sidebar-ring": "217.2 91.2% 59.8%",
        },
        dark: {
          "sidebar-background": "240 5.9% 10%",
          "sidebar-foreground": "240 4.8% 95.9%",
          "sidebar-primary": "224.3 76.3% 48%",
          "sidebar-primary-foreground": "0 0% 100%",
          "sidebar-accent": "240 3.7% 15.9%",
          "sidebar-accent-foreground": "240 4.8% 95.9%",
          "sidebar-border": "240 3.7% 15.9%",
          "sidebar-ring": "217.2 91.2% 59.8%",
        },
      },
    },
    {
      name: "skeleton",
      type: "registry:ui",
      files: [
        {
          path: "ui/skeleton.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "slider",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slider"],
      files: [
        {
          path: "ui/slider.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "sonner",
      type: "registry:ui",
      dependencies: ["sonner", "next-themes"],
      files: [
        {
          path: "ui/sonner.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "switch",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-switch"],
      files: [
        {
          path: "ui/switch.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "table",
      type: "registry:ui",
      files: [
        {
          path: "ui/table.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "tabs",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-tabs"],
      files: [
        {
          path: "ui/tabs.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "textarea",
      type: "registry:ui",
      files: [
        {
          path: "ui/textarea.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "toggle",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-toggle"],
      files: [
        {
          path: "ui/toggle.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "toggle-group",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-toggle-group"],
      registryDependencies: ["toggle"],
      files: [
        {
          path: "ui/toggle-group.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "tooltip",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-tooltip"],
      files: [
        {
          path: "ui/tooltip.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "use-mobile",
      type: "registry:hook",
      files: [
        {
          path: "hooks/use-mobile.ts",
          type: "registry:hook",
        },
      ],
    },
  ]),
} satisfies Registry

async function addStyleItem() {
  // 2. Add global style witch is in registry/refer/styles/refer-stylel.json
  const REG_DIR = path.join(ROOT, "registry") // pasta registry
  const REGISTRY_PATH = `${BASE_URL}/r/refer`

  /** Atualiza o index item */
  const stylePath = path.join(REG_DIR, "refer/styles/refer-style.json")
  const style = JSON.parse(readFileSync(stylePath, "utf-8"))

  // adiciona todos os items
  style.registryDependencies = []

  for (const item of registry.items) {
    style.registryDependencies.push(`${REGISTRY_PATH}/${item.name}.json`)
    // style.registryDependencies.push(item.name)
  }

  // adiciona o style ao registry
  registry.items.push(style)
}

async function buildRegistryIndex() {
  let index = `/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {`
  for (const item of registry.items) {
    // const resolveFiles = item.files?.map((file) => `${file.path}`)
    // if (!resolveFiles) {
    //   continue
    // }

    const componentPath = item.files?.[0]?.path
      ? `@/registry/refer/${item.files[0].path}`
      : ""

    index += `
  "${item.name}": {
    name: "${item.name}",
    description: "${item.description ?? ""}",
    type: "${item.type}",
    registryDependencies: ${JSON.stringify(item.registryDependencies)},
    files: [${item.files?.map((file) => {
      const filePath = `registry/${typeof file === "string" ? file : file.path}`
      const resolvedFilePath = path.resolve(filePath)
      return typeof file === "string"
        ? `"${resolvedFilePath}"`
        : `{
      path: "${filePath}",
      type: "${file.type}",
      target: "${file.target ?? ""}"
    }`
    })}],
    component: ${
      componentPath
        ? `React.lazy(async () => {
      const mod = await import("${componentPath}")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    })`
        : "null"
    },
    meta: ${JSON.stringify(item.meta)},
    tailwind: ${JSON.stringify(item.tailwind || {})},
    cssVars: ${JSON.stringify(item.cssVars || {})},
  },`
  }

  index += `
  }`

  // Write style index.
  rimraf.sync(path.join(process.cwd(), "__registry__/index.tsx"))
  await fs.writeFile(path.join(process.cwd(), "__registry__/index.tsx"), index)
}

async function buildRegistryJsonFile() {
  // 1. Fix the path for registry items.
  const fixedRegistry = {
    ...registry,
    items: registry.items.map((item) => {
      const files = item.files?.map((file) => {
        return {
          ...file,
          path: `registry/refer/${file.path}`,
        }
      })

      return {
        ...item,
        files,
      }
    }),
  }

  // 3. Write the content of the registry to `registry.json`
  rimraf.sync(path.join(process.cwd(), `registry.json`))
  await fs.writeFile(
    path.join(process.cwd(), `registry.json`),
    JSON.stringify(fixedRegistry, null, 2)
  )
}

async function buildRegistry() {
  return new Promise((resolve, reject) => {
    const process = exec(
      `pnpm dlx shadcn build registry.json --output public/r/refer`
    )

    process.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}

try {
  console.log("📝 Adding style item to registry...")
  await addStyleItem()

  console.log("🗂️ Building registry/__index__.tsx...")
  await buildRegistryIndex()

  console.log("💅 Building registry.json...")
  await buildRegistryJsonFile()

  console.log("🏗️ Building registry...")
  await buildRegistry()

  console.log("✅ Registry build completed successfully!")
} catch (error) {
  console.error(error)
  process.exit(1)
}
