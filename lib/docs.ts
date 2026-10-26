// Server-side data for the docs site: which pages exist, usage in the apps, and demo source code.
import { promises as fs } from "fs"
import path from "path"

import { foundations, newComponents, titleFromName } from "@/config/docs"
import usage from "@/data/usage.json"
import registry from "@/registry.json"

export type DocsItem = {
  name: string
  title: string
  description?: string
  kind: "component" | "foundation"
  isNew: boolean
}

export type AppUsage = {
  status: "identical" | "diverged" | "missing"
  files: string[]
}

export function getDocsItems(): DocsItem[] {
  const components = registry.items
    .filter((item) => item.type === "registry:ui")
    .map(
      (item): DocsItem => ({
        name: item.name,
        title: titleFromName(item.name),
        description: "description" in item ? item.description : undefined,
        kind: "component",
        isNew: newComponents.includes(item.name),
      })
    )
    .sort((a, b) => a.title.localeCompare(b.title))

  const pages = foundations.map(
    (page): DocsItem => ({ ...page, kind: "foundation", isNew: false })
  )

  return [...pages, ...components]
}

export function getDocsItem(name: string) {
  return getDocsItems().find((item) => item.name === name)
}

export function getUsage(name: string): Record<string, AppUsage> | undefined {
  return (usage.components as Record<string, Record<string, AppUsage>>)[name]
}

export function getUsageMeta() {
  return {
    generatedAt: usage.generatedAt,
    source: usage.source,
    apps: usage.apps,
  }
}

// Number of files importing the component across all apps.
export function getUsageCount(name: string) {
  const byApp = getUsage(name)
  if (!byApp) return 0
  return Object.values(byApp).reduce(
    (total, app) => total + app.files.length,
    0
  )
}

export async function readSource(file: string) {
  return (await fs.readFile(path.join(process.cwd(), file), "utf-8")).trimEnd()
}

// Splits a gallery file (components/examples/*-example.tsx) into the source of each <Example title="…"> section,
// keyed by title, so each section can show its own code.
export async function getExampleSections(file: string) {
  const source = await readSource(file)
  const sections: Record<string, string> = {}
  const starts = [...source.matchAll(/^(?:export )?function \w+\(/gm)].map(
    (match) => match.index!
  )

  starts.forEach((start, index) => {
    const end = index + 1 < starts.length ? starts[index + 1] : source.length
    const block = source.slice(start, end).trimEnd()
    const title = block.match(/<Example\s[^>]*?title="([^"]+)"/)?.[1]
    if (title && !(title in sections)) sections[title] = block
  })

  return sections
}
