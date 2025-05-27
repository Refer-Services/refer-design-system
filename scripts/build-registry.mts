import { exec } from "child_process"
import { promises as fs, readFileSync } from "fs"
import path from "path"
import { rimraf } from "rimraf"
import { registryItemSchema, type Registry } from "shadcn/registry"
import { z } from "zod"

const ROOT = process.cwd()

const registry = {
  name: "shadcn/ui",
  homepage: "https://ds.tryrefer.com",
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
      dependencies: ["react-day-picker@8.10.1", "date-fns"],
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
      name: "dashboard-01",
      type: "registry:block",
      description: "A dashboard with sidebar, charts and data table.",
      dependencies: [
        "@dnd-kit/core",
        "@dnd-kit/modifiers",
        "@dnd-kit/sortable",
        "@dnd-kit/utilities",
        "@tanstack/react-table",
        "zod",
        "@tabler/icons-react",
      ],
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "label",
        "chart",
        "card",
        "select",
        "tabs",
        "table",
        "toggle-group",
        "badge",
        "button",
        "checkbox",
        "dropdown-menu",
        "drawer",
        "input",
        "avatar",
        "sheet",
        "sonner",
      ],
      files: [
        {
          path: "blocks/dashboard-01/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/dashboard-01/data.json",
          type: "registry:file",
          target: "app/dashboard/data.json",
        },
        {
          path: "blocks/dashboard-01/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/chart-area-interactive.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/data-table.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/nav-documents.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/nav-secondary.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/nav-user.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/section-cards.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/dashboard-01/components/site-header.tsx",
          type: "registry:component",
        },
      ],
      categories: ["dashboard"],
    },
    {
      name: "sidebar-01",
      type: "registry:block",
      description: "A simple sidebar with navigation grouped by section.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "label",
        "dropdown-menu",
      ],
      files: [
        {
          path: "blocks/sidebar-01/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-01/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-01/components/search-form.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-01/components/version-switcher.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-02",
      type: "registry:block",
      description: "A sidebar with collapsible sections.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "label",
        "dropdown-menu",
      ],
      files: [
        {
          path: "blocks/sidebar-02/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-02/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-02/components/search-form.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-02/components/version-switcher.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-03",
      type: "registry:block",
      description: "A sidebar with submenus.",
      registryDependencies: ["sidebar", "breadcrumb"],
      files: [
        {
          path: "blocks/sidebar-03/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-03/components/app-sidebar.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-04",
      type: "registry:block",
      description: "A floating sidebar with submenus.",
      registryDependencies: ["sidebar", "breadcrumb", "separator"],
      files: [
        {
          path: "blocks/sidebar-04/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-04/components/app-sidebar.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-05",
      type: "registry:block",
      description: "A sidebar with collapsible submenus.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "label",
        "collapsible",
      ],
      files: [
        {
          path: "blocks/sidebar-05/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-05/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-05/components/search-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-06",
      type: "registry:block",
      description: "A sidebar with submenus as dropdowns.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "card",
        "dropdown-menu",
      ],
      files: [
        {
          path: "blocks/sidebar-06/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-06/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-06/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-06/components/sidebar-opt-in-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-07",
      type: "registry:block",
      description: "A sidebar that collapses to icons.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "collapsible",
        "dropdown-menu",
        "avatar",
      ],
      files: [
        {
          path: "blocks/sidebar-07/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-07/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-07/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-07/components/nav-projects.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-07/components/nav-user.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-07/components/team-switcher.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-08",
      type: "registry:block",
      description: "An inset sidebar with secondary navigation.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "collapsible",
        "dropdown-menu",
        "avatar",
      ],
      files: [
        {
          path: "blocks/sidebar-08/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-08/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-08/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-08/components/nav-projects.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-08/components/nav-secondary.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-08/components/nav-user.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-09",
      type: "registry:block",
      description: "Collapsible nested sidebars.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "collapsible",
        "dropdown-menu",
        "avatar",
        "switch",
        "label",
      ],
      files: [
        {
          path: "blocks/sidebar-09/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-09/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-09/components/nav-user.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-10",
      type: "registry:block",
      description: "A sidebar in a popover.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "popover",
        "collapsible",
        "dropdown-menu",
      ],
      files: [
        {
          path: "blocks/sidebar-10/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-10/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-10/components/nav-actions.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-10/components/nav-favorites.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-10/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-10/components/nav-secondary.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-10/components/nav-workspaces.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-10/components/team-switcher.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-11",
      type: "registry:block",
      description: "A sidebar with a collapsible file tree.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "collapsible",
      ],
      files: [
        {
          path: "blocks/sidebar-11/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-11/components/app-sidebar.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-12",
      type: "registry:block",
      description: "A sidebar with a calendar.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "collapsible",
        "calendar",
        "dropdown-menu",
        "avatar",
      ],
      files: [
        {
          path: "blocks/sidebar-12/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-12/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-12/components/calendars.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-12/components/date-picker.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-12/components/nav-user.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-13",
      type: "registry:block",
      description: "A sidebar in a dialog.",
      registryDependencies: ["sidebar", "breadcrumb", "button", "dialog"],
      files: [
        {
          path: "blocks/sidebar-13/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-13/components/settings-dialog.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-14",
      type: "registry:block",
      description: "A sidebar on the right.",
      registryDependencies: ["sidebar", "breadcrumb"],
      files: [
        {
          path: "blocks/sidebar-14/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-14/components/app-sidebar.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-15",
      type: "registry:block",
      description: "A left and right sidebar.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "popover",
        "collapsible",
        "dropdown-menu",
        "calendar",
        "avatar",
      ],
      files: [
        {
          path: "blocks/sidebar-15/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-15/components/calendars.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/date-picker.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/nav-favorites.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/nav-secondary.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/nav-user.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/nav-workspaces.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/sidebar-left.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/sidebar-right.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-15/components/team-switcher.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "sidebar-16",
      type: "registry:block",
      description: "A sidebar with a sticky site header.",
      registryDependencies: [
        "sidebar",
        "breadcrumb",
        "separator",
        "collapsible",
        "dropdown-menu",
        "avatar",
        "button",
        "label",
      ],
      files: [
        {
          path: "blocks/sidebar-16/page.tsx",
          type: "registry:page",
          target: "app/dashboard/page.tsx",
        },
        {
          path: "blocks/sidebar-16/components/app-sidebar.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-16/components/nav-main.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-16/components/nav-projects.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-16/components/nav-secondary.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-16/components/nav-user.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-16/components/search-form.tsx",
          type: "registry:component",
        },
        {
          path: "blocks/sidebar-16/components/site-header.tsx",
          type: "registry:component",
        },
      ],
      categories: ["sidebar", "dashboard"],
    },
    {
      name: "login-01",
      type: "registry:block",
      description: "A simple login form.",
      registryDependencies: ["button", "card", "input", "label"],
      files: [
        {
          path: "blocks/login-01/page.tsx",
          type: "registry:page",
          target: "app/login/page.tsx",
        },
        {
          path: "blocks/login-01/components/login-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["authentication", "login"],
    },
    {
      name: "login-02",
      type: "registry:block",
      description: "A two column login page with a cover image.",
      registryDependencies: ["button", "card", "input", "label"],
      files: [
        {
          path: "blocks/login-02/page.tsx",
          type: "registry:page",
          target: "app/login/page.tsx",
        },
        {
          path: "blocks/login-02/components/login-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["authentication", "login"],
    },
    {
      name: "login-03",
      type: "registry:block",
      description: "A login page with a muted background color.",
      registryDependencies: ["button", "card", "input", "label"],
      files: [
        {
          path: "blocks/login-03/page.tsx",
          type: "registry:page",
          target: "app/login/page.tsx",
        },
        {
          path: "blocks/login-03/components/login-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["authentication", "login"],
    },
    {
      name: "login-04",
      type: "registry:block",
      description: "A login page with form and image.",
      registryDependencies: ["button", "card", "input", "label"],
      files: [
        {
          path: "blocks/login-04/page.tsx",
          type: "registry:page",
          target: "app/login/page.tsx",
        },
        {
          path: "blocks/login-04/components/login-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["authentication", "login"],
    },
    {
      name: "login-05",
      type: "registry:block",
      description: "A simple email-only login page.",
      registryDependencies: ["button", "card", "input", "label"],
      files: [
        {
          path: "blocks/login-05/page.tsx",
          type: "registry:page",
          target: "app/login/page.tsx",
        },
        {
          path: "blocks/login-05/components/login-form.tsx",
          type: "registry:component",
        },
      ],
      categories: ["authentication", "login"],
    },
    {
      name: "chart-area-axes",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-axes.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-default",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-default.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-gradient",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-gradient.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-icons",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-icons.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-interactive",
      type: "registry:block",
      registryDependencies: ["card", "chart", "select"],
      files: [
        {
          path: "charts/chart-area-interactive.tsx",
          type: "registry:component",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-legend",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-legend.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-linear",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-linear.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-stacked-expand",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-stacked-expand.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-stacked",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-stacked.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-area-step",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-area-step.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-area"],
    },
    {
      name: "chart-bar-active",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-active.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-default",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-default.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-horizontal",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-horizontal.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-interactive",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-interactive.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-label-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-label-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-label",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-label.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-mixed",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-mixed.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-multiple",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-multiple.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-negative",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-negative.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-bar-stacked",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-bar-stacked.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-bar"],
    },
    {
      name: "chart-line-default",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-default.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-dots-colors",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-dots-colors.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-dots-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-dots-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-dots",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-dots.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-interactive",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-interactive.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-label-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-label-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-label",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-label.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-linear",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-linear.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-multiple",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-multiple.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-line-step",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-line-step.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-line"],
    },
    {
      name: "chart-pie-donut-active",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-donut-active.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-donut-text",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-donut-text.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-donut",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-donut.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-interactive",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-interactive.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-label-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-label-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-label-list",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-label-list.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-label",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-label.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-legend",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-legend.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-separator-none",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-separator-none.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-simple",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-simple.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-pie-stacked",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-pie-stacked.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-pie"],
    },
    {
      name: "chart-radar-default",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-default.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-dots",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-dots.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-grid-circle-fill",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-grid-circle-fill.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-grid-circle-no-lines",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-grid-circle-no-lines.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-grid-circle",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-grid-circle.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-grid-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-grid-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-grid-fill",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-grid-fill.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-grid-none",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-grid-none.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-icons",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-icons.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-label-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-label-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-legend",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-legend.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-lines-only",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-lines-only.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-multiple",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-multiple.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radar-radius",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radar-radius.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radar"],
    },
    {
      name: "chart-radial-grid",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radial-grid.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radial"],
    },
    {
      name: "chart-radial-label",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radial-label.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radial"],
    },
    {
      name: "chart-radial-shape",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radial-shape.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radial"],
    },
    {
      name: "chart-radial-simple",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radial-simple.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radial"],
    },
    {
      name: "chart-radial-stacked",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radial-stacked.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radial"],
    },
    {
      name: "chart-radial-text",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-radial-text.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-radial"],
    },
    {
      name: "chart-tooltip-default",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-default.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-indicator-line",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-indicator-line.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-indicator-none",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-indicator-none.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-label-none",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-label-none.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-label-custom",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-label-custom.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-label-formatter",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-label-formatter.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-formatter",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-formatter.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-icons",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-icons.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "chart-tooltip-advanced",
      type: "registry:block",
      registryDependencies: ["card", "chart"],
      files: [
        {
          path: "charts/chart-tooltip-advanced.tsx",
          type: "registry:block",
        },
      ],
      categories: ["charts", "charts-tooltip"],
    },
    {
      name: "utils",
      type: "registry:lib",
      dependencies: ["clsx", "tailwind-merge"],
      files: [
        {
          path: "lib/utils.ts",
          type: "registry:lib",
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
    {
      name: "products-01",
      type: "registry:block",
      description: "A table of products",
      registryDependencies: [
        "checkbox",
        "badge",
        "button",
        "dropdown-menu",
        "pagination",
        "table",
        "tabs",
        "select",
      ],
      files: [
        {
          path: "blocks/products-01/page.tsx",
          type: "registry:page",
          target: "app/products/page.tsx",
        },
        {
          path: "blocks/products-01/components/products-table.tsx",
          type: "registry:component",
        },
      ],
    },
  ]),
} satisfies Registry

async function addStyleItem() {
  // 2. Add global style witch is in registry/refer/styles/refer-stylel.json
  const REG_DIR = path.join(ROOT, "registry") // pasta registry
  const BASE_URL = "https://ds.tryrefer.com/r/refer"

  /** Atualiza o index item */
  const stylePath = path.join(REG_DIR, "refer/styles/refer-style.json")
  const style = JSON.parse(readFileSync(stylePath, "utf-8"))

  // adiciona todos os items
  style.registryDependencies = ["utils"]

  for (const item of registry.items) {
    style.registryDependencies.push(`${BASE_URL}/${item.name}.json`)
    // style.registryDependencies.push(item.name)
  }

  // adiciona o style ao registry
  registry.items.push(style)
}

// async function buildRegistryIndex() {
//   let index = `/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // @ts-nocheck
// // This file is autogenerated by scripts/build-registry.ts
// // Do not edit this file directly.
// import * as React from "react"

// export const Index: Record<string, any> = {`
//   for (const item of registry.items) {
//     const resolveFiles = item.files?.map((file) => `${file.path}`)
//     if (!resolveFiles) {
//       continue
//     }

//     const componentPath = item.files?.[0]?.path
//       ? `@/registry/refer/${item.files[0].path}`
//       : ""

//     index += `
//   "${item.name}": {
//     name: "${item.name}",
//     description: "${item.description ?? ""}",
//     type: "${item.type}",
//     registryDependencies: ${JSON.stringify(item.registryDependencies)},
//     files: [${item.files?.map((file) => {
//       const filePath = `registry/${typeof file === "string" ? file : file.path}`
//       const resolvedFilePath = path.resolve(filePath)
//       return typeof file === "string"
//         ? `"${resolvedFilePath}"`
//         : `{
//       path: "${filePath}",
//       type: "${file.type}",
//       target: "${file.target ?? ""}"
//     }`
//     })}],
//     component: ${
//       componentPath
//         ? `React.lazy(async () => {
//       const mod = await import("${componentPath}")
//       const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
//       return { default: mod.default || mod[exportName] }
//     })`
//         : "null"
//     },
//     meta: ${JSON.stringify(item.meta)},
//   },`
//   }

//   index += `
//   }`

//   // Write style index.
//   rimraf.sync(path.join(process.cwd(), "__registry__/index.tsx"))
//   await fs.writeFile(path.join(process.cwd(), "__registry__/index.tsx"), index)
// }

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

  // console.log("🗂️ Building registry/__index__.tsx...")
  // await buildRegistryIndex()

  console.log("💅 Building registry.json...")
  await buildRegistryJsonFile()

  console.log("🏗️ Building registry...")
  await buildRegistry()
} catch (error) {
  console.error(error)
  process.exit(1)
}
