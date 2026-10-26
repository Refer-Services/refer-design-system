import Link from "next/link"

import { getDocsItems, getUsageCount, getUsageMeta } from "@/lib/docs"
import { ComponentIndex } from "@/components/docs/component-index"

export default function ComponentsPage() {
  const items = getDocsItems()
  const foundations = items.filter((item) => item.kind === "foundation")
  const components = items
    .filter((item) => item.kind === "component")
    .map((item) => ({ ...item, uses: getUsageCount(item.name) }))
  const meta = getUsageMeta()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10 md:px-10 md:py-14">
      <header className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Components
        </h1>
        <p className="text-muted-foreground text-pretty">
          Everything the Refer apps can install from this registry. Open a
          component for its demo, code and where it&apos;s used. Install any of
          them with{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-sm">
            npx shadcn@latest add @refer/&lt;name&gt;
          </code>
          .
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Foundations
        </h2>
        <div className="flex flex-wrap gap-2">
          {foundations.map((item) => (
            <Link
              key={item.name}
              href={`/components/${item.name}`}
              className="bg-background hover:bg-accent rounded-input px-3.5 py-2 text-sm font-medium transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <ComponentIndex items={components} />

      <p className="text-muted-foreground text-xs">
        Usage counts are files importing the component in {meta.apps.join(", ")}
        , from {meta.source.repo}@{meta.source.commit}.
      </p>
    </div>
  )
}
