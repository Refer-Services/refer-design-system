import { exec } from "child_process"
import { promises as fs, readFileSync } from "fs"
import path from "path"
import postcss from "postcss"
import { rimraf } from "rimraf"
import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

const ROOT = process.cwd()
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ds.tryrefer.com"

const registry = {
  name: "refer",
  homepage: BASE_URL,
  items: z.array(registryItemSchema).parse([
    {
      name: "accordion",
      description: "Vertically stacked sections that expand and collapse.",
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
      description: "Callout for important messages, with title and description.",
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
      description: "Modal confirmation dialog that interrupts the user; size sm for compact confirms.",
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
      description: "Displays content within a fixed aspect ratio.",
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
      name: "attachment",
      description: "File or image card with media, metadata, upload state and actions.",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/attachment.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "avatar",
      description: "User image with fallback initials; AvatarGroup and AvatarGroupCount for stacks.",
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
      description: "Pill label for status and metadata, with semantic variants.",
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
      name: "bubble",
      description: "Chat message surface with variants, alignment, reactions and collapsible content.",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      files: [
        {
          path: "ui/bubble.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "breadcrumb",
      description: "Path navigation using Next.js Link.",
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
      description: "Refer button (rounded-full) with primary, subtle, ghost, outline, destructive and link variants; sizes xs-lg and icon.",
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
      name: "button-group",
      description: "Groups buttons (and inputs, selects, dropdowns) into one joined control, horizontal or vertical.",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      registryDependencies: ["separator"],
      files: [
        {
          path: "ui/button-group.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "calendar",
      description: "Date grid for single, multiple or range selection (react-day-picker v9).",
      type: "registry:ui",
      dependencies: ["react-day-picker"],
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
      description: "Squircle container with header, content and footer slots.",
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
      description: "Embla-based carousel with previous/next controls.",
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
      description: "Recharts wrapper with theme-aware config, tooltip and legend.",
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
      description: "Checkbox with indeterminate state.",
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
      description: "Checkbox rendered as a selectable bordered card.",
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
      name: "code-block",
      description: "Code, terminal, log or diff display with header, copy button, line numbers and highlights (shiki).",
      type: "registry:ui",
      registryDependencies: ["button", "use-highlighted-code"],
      files: [
        {
          path: "ui/code-block.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "collapsible",
      description: "Shows and hides a single section of content.",
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
      name: "combobox",
      description: "Searchable select (Base UI) with single/multiple selection and chips; works inside dialogs and drawers.",
      type: "registry:ui",
      dependencies: ["@base-ui/react"],
      registryDependencies: ["button", "input-group"],
      files: [
        {
          path: "ui/combobox.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "command",
      description: "Command palette and searchable list (cmdk), also as CommandDialog.",
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
      description: "Right-click menu with items, submenus, checkboxes and radios.",
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
      description: "Modal dialog with optional built-in close button, sr-only title and prev/next navigation arrows.",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-dialog"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/dialog.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "direction",
      description: "DirectionProvider and useDirection for right-to-left layouts.",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-direction"],
      files: [
        {
          path: "ui/direction.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "drawer",
      description: "Bottom sheet for mobile (vaul).",
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
      description: "Menu opened from a trigger, with items, submenus, checkboxes and radios.",
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
      name: "empty",
      description: "Empty state with icon, title, description and actions.",
      type: "registry:ui",
      files: [
        {
          path: "ui/empty.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "field",
      description: "Accessible form field layout: FieldSet, FieldLegend, FieldGroup, Field, FieldLabel, FieldDescription, FieldError.",
      type: "registry:ui",
      registryDependencies: ["label", "separator"],
      files: [
        {
          path: "ui/field.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "form",
      description: "react-hook-form bindings: FormField, FormItem, FormLabel, FormMessage.",
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
      description: "Preview card shown on hover.",
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
      description: "Text input (rounded-input) with Refer focus and invalid states.",
      type: "registry:ui",
      files: [
        {
          path: "ui/input.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "input-group",
      description: "Input or textarea with inline/block addons, buttons and text.",
      type: "registry:ui",
      registryDependencies: ["button", "input", "textarea"],
      files: [
        {
          path: "ui/input-group.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "input-otp",
      description: "One-time password input with slots.",
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
      name: "item",
      description: "Flexible row for lists and cards: media, title, description and actions.",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      registryDependencies: ["separator"],
      files: [
        {
          path: "ui/item.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "kbd",
      description: "Keyboard key and shortcut display (Kbd, KbdGroup).",
      type: "registry:ui",
      files: [
        {
          path: "ui/kbd.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "label",
      description: "Accessible form label.",
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
      name: "marker",
      description: "Status row or labeled separator in a conversation or timeline (date breaks, a thinking indicator).",
      type: "registry:ui",
      dependencies: ["@radix-ui/react-slot"],
      files: [
        {
          path: "ui/marker.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "message",
      description: "One conversation row: avatar, alignment, header, content and footer.",
      type: "registry:ui",
      files: [
        {
          path: "ui/message.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "message-scroller",
      description: "Chat scroll container: follows streaming output, keeps position on history prepend, jump-to and scroll-to-bottom.",
      type: "registry:ui",
      dependencies: ["@shadcn/react@^0.3.1"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/message-scroller.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "menubar",
      description: "Desktop-style horizontal menu bar.",
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
      name: "native-select",
      description: "Styled native HTML select with options and option groups.",
      type: "registry:ui",
      files: [
        {
          path: "ui/native-select.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "navigation-menu",
      description: "Site navigation with dropdown panels.",
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
      description: "Page navigation with previous/next and page links.",
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
      description: "Floating panel anchored to a trigger, with header, title and description slots.",
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
      description: "Horizontal progress bar.",
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
      name: "questionnaire",
      description: "Multi-step question flow with single, multiple, free-form and skippable questions.",
      type: "registry:ui",
      dependencies: ["@shadcn/react@^0.3.1"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/questionnaire.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "radio-group",
      description: "Radio buttons for picking one option.",
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
      name: "radio-group-boxed",
      description: "Radio options rendered as selectable bordered cards.",
      type: "registry:ui",
      registryDependencies: ["radio-group", "label"],
      files: [
        {
          path: "ui/radio-group-boxed.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "resizable",
      description: "Resizable panel groups (react-resizable-panels).",
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
      description: "Scrollable area with custom scrollbars.",
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
      description: "Select dropdown (Radix) with sizes xs-lg.",
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
      name: "responsive-dialog",
      description: "Dialog on desktop, bottom drawer below 768px.",
      type: "registry:ui",
      registryDependencies: ["dialog", "drawer", "use-mobile"],
      files: [
        {
          path: "ui/responsive-dialog.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "separator",
      description: "Horizontal or vertical divider.",
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
      description: "Side panel that slides in from an edge.",
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
      description: "Composable, collapsible app sidebar.",
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
      // Tokens (incl. --sidebar-*) come from app/globals.css via the globals item.
      // The template's own cssVars here overwrote them with shadcn's on install.
    },
    {
      name: "skeleton",
      description: "Loading placeholder.",
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
      description: "Range input with one or more thumbs.",
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
      description: "Toast notifications (sonner) themed for Refer.",
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
      name: "spinner",
      description: "Loading spinner icon.",
      type: "registry:ui",
      files: [
        {
          path: "ui/spinner.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "switch",
      description: "On/off toggle switch.",
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
      description: "Styled table primitives.",
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
      description: "Tabbed panels.",
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
      description: "Multi-line text input.",
      type: "registry:ui",
      files: [
        {
          path: "ui/textarea.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "toast",
      description: "Base UI toast with actions, status types, promises and stacking. Apps on Radix keep using sonner.",
      type: "registry:ui",
      dependencies: ["@base-ui/react"],
      registryDependencies: ["button"],
      files: [
        {
          path: "ui/toast.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "toggle",
      description: "Two-state button.",
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
      description: "Set of toggles, joined or spaced, single or multiple selection.",
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
      name: "trace",
      description: "List of agent steps (reasoning, tool calls, sources) with running, error and pending states.",
      type: "registry:ui",
      registryDependencies: ["collapsible"],
      files: [
        {
          path: "ui/trace.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "tooltip",
      description: "Short label shown on hover or focus.",
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
      description: "Hook that returns true below the mobile breakpoint (768px).",
      type: "registry:hook",
      files: [
        {
          path: "hooks/use-mobile.ts",
          type: "registry:hook",
        },
      ],
    },
    {
      name: "use-highlighted-code",
      description: "Hook that highlights code with shiki, used by code-block.",
      type: "registry:hook",
      dependencies: ["shiki"],
      files: [
        {
          path: "hooks/use-highlighted-code.ts",
          type: "registry:hook",
        },
        {
          path: "lib/highlighter.tsx",
          type: "registry:lib",
        },
      ],
    },
    {
      name: "refer-utils",
      type: "registry:file",
      title: "Refer utilities",
      description: "Tailwind v4 utilities from shadcn: scroll-fade, shimmer. Installed with globals.",
      files: [
        {
          path: "styles/refer-utils.css",
          type: "registry:file",
          // "~/" anchors the target at the consumer's project root.
          target: "~/app/refer-utils.css",
        },
      ],
    },
  ]),
} satisfies Registry

// Imports every consumer already has from `shadcn init`; the CLI can't place them reliably.
const CONSUMER_IMPORTS = new Set(['"tailwindcss"', '"tw-animate-css"'])

/** Converts a CSS container into the CSS-in-JSON shape the shadcn CLI expects for `css`. */
function cssToJson(container: postcss.Container, nested = false): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  container.each((node) => {
    if (node.type === "decl") {
      out[node.prop] = node.value
    } else if (node.type === "rule") {
      out[node.selector] = cssToJson(node, true)
    } else if (node.type === "atrule") {
      const key = `@${node.name} ${node.params}`.trim()
      // The CLI appends nested at-rule blocks on every install instead of replacing them.
      if (nested && node.nodes) {
        throw new Error(`app/globals.css: nested "${key}" would duplicate on each install; flatten it.`)
      }
      // Body-less at-rules (e.g. `@apply ...`) become `"@apply ...": {}`, not a property.
      out[key] = node.nodes ? cssToJson(node, true) : {}
    }
  })
  return out
}

/** cssVars keys are written without the leading `--`; the CLI adds it back. */
function varsOf(container: postcss.Container): Record<string, string> {
  const vars: Record<string, string> = {}
  container.each((node) => {
    if (node.type === "decl" && node.prop.startsWith("--")) {
      vars[node.prop.slice(2)] = node.value.replace(/\s+/g, " ")
    }
  })
  return vars
}

/** Splits app/globals.css into the style item's `cssVars` (light/dark/theme) and `css`. */
function styleFromGlobals(globalsPath: string) {
  const root = postcss.parse(readFileSync(globalsPath, "utf-8"))
  const cssVars = { light: {}, dark: {}, theme: {} }
  const rest = postcss.root()

  root.each((node) => {
    if (node.type === "comment") return
    if (node.type === "rule" && node.selector === ":root") {
      cssVars.light = varsOf(node)
    } else if (node.type === "rule" && node.selector === ".dark") {
      cssVars.dark = varsOf(node)
    } else if (node.type === "atrule" && node.name === "theme" && node.params === "inline") {
      cssVars.theme = varsOf(node)
    } else if (node.type === "atrule" && node.name === "import" && CONSUMER_IMPORTS.has(node.params)) {
      return
    } else if (node.type === "atrule" && node.name === "import" && node.params.includes("registry/refer/styles/")) {
      // Registry CSS files land next to the consumer's globals.css (target ~/app/<file>).
      rest.append(node.clone({ params: `"./${path.basename(node.params.replace(/["']/g, ""))}"` }))
    } else {
      rest.append(node.clone())
    }
  })

  return { cssVars, css: cssToJson(rest) }
}

/**
 * Items list their registry dependencies by bare name ("button"), but the
 * shadcn CLI resolves a bare name against shadcn's own registry: installing a
 * Refer item would pull in stock shadcn components over the Refer ones. Point
 * every bare name at the Refer item instead, and fail the build on a name that
 * isn't one, or on a Refer import an item doesn't declare.
 */
function resolveRegistryDependencies() {
  const names = new Set(registry.items.map((item) => item.name))

  for (const item of registry.items) {
    const deps = item.registryDependencies ?? []
    for (const dep of deps) {
      if (!dep.startsWith("http") && !names.has(dep)) {
        throw new Error(
          `${item.name}: registry dependency "${dep}" isn't a Refer item; use a full URL for an external one.`
        )
      }
    }

    const declared = new Set(deps.map((dep) => path.basename(dep, ".json")))
    for (const file of item.files ?? []) {
      const filePath = typeof file === "string" ? file : file.path
      const source = readFileSync(path.join(ROOT, "registry/refer", filePath), "utf-8")
      for (const [, used] of source.matchAll(/@\/registry\/refer\/(?:ui|hooks)\/([\w-]+)/g)) {
        if (used !== item.name && !declared.has(used)) {
          throw new Error(`${item.name}: imports "${used}" without listing it in registryDependencies.`)
        }
      }
    }

    if (deps.length) {
      item.registryDependencies = deps.map((dep) =>
        dep.startsWith("http") ? dep : `${BASE_URL}/r/refer/${dep}.json`
      )
    }
  }
}

async function addStyleItem() {
  // 2. Add global style witch is in registry/refer/styles/refer-stylel.json
  const REG_DIR = path.join(ROOT, "registry") // pasta registry
  const REGISTRY_PATH = `${BASE_URL}/r/refer`

  /** Atualiza o index item */
  const stylePath = path.join(REG_DIR, "refer/styles/refer-style.json")
  const style = JSON.parse(readFileSync(stylePath, "utf-8"))

  // Global CSS ships as its own item, generated from app/globals.css (the single source of truth),
  // so apps can sync it without reinstalling every component: `shadcn add .../globals.json`.
  registry.items.push({
    name: "globals",
    type: "registry:style",
    title: "Refer global CSS",
    description: "Design tokens, base styles and utilities from app/globals.css.",
    // globals.css imports ./refer-utils.css, so installing globals must bring that file too.
    registryDependencies: [`${REGISTRY_PATH}/refer-utils.json`],
    files: [],
    ...styleFromGlobals(path.join(ROOT, "app/globals.css")),
  })

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

    // Only React modules get a lazy preview component; CSS and other files don't.
    const componentPath = /\.tsx?$/.test(item.files?.[0]?.path ?? "")
      ? `@/registry/refer/${item.files![0].path}`
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
  console.log("🔗 Resolving registry dependencies to Refer URLs...")
  resolveRegistryDependencies()

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
