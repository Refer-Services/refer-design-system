import * as React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import {
  getDocsItem,
  getDocsItems,
  getExampleSections,
  readSource,
} from "@/lib/docs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { demos } from "@/components/docs/demos"
import { DocsCode } from "@/components/docs/docs-code"
import { ExampleSourcesProvider } from "@/components/docs/example-sources"
import { UsagePanel } from "@/components/docs/usage-panel"
import { exampleFile, examples } from "@/components/examples"
import { hasExample } from "@/components/examples/names"
import { Badge } from "@/registry/refer/ui/badge"

export const dynamicParams = false

export function generateStaticParams() {
  return getDocsItems().map((item) => ({ name: item.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const item = getDocsItem(name)
  return item ? { title: item.title, description: item.description } : {}
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getDocsItem(name)
  if (!item) notFound()

  const pageDemos = demos[name] ?? []
  const demoSources = await Promise.all(
    pageDemos.map((demo) => readSource(demo.file))
  )

  const Gallery = hasExample(name) ? examples[name] : null
  const sections = Gallery ? await getExampleSections(exampleFile(name)) : {}
  const sectionCode = Object.fromEntries(
    await Promise.all(
      Object.entries(sections).map(async ([title, code]) => [
        title,
        <DocsCode key={title} code={code} />,
      ])
    )
  )

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-10 md:px-10 md:py-14">
      <header className="flex max-w-2xl flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {item.title}
          </h1>
          {item.isNew && <Badge variant="primary_subtle">New</Badge>}
        </div>
        {item.description && (
          <p className="text-muted-foreground text-pretty">
            {item.description}
          </p>
        )}
      </header>

      {pageDemos.length > 0 ? (
        pageDemos.map((demo, index) => {
          const Demo = demo.component
          return (
            <Section
              key={demo.file}
              title={demo.title}
              description={demo.description}
            >
              <ComponentPreview
                name={item.title}
                preview={<Demo />}
                code={<DocsCode code={demoSources[index]} title={demo.file} />}
              />
            </Section>
          )
        })
      ) : (
        <Section>
          <p className="bg-background rounded-card text-muted-foreground p-6 text-sm">
            No demo yet. The source is in{" "}
            <code className="font-mono">registry/refer/ui/{name}.tsx</code>.
          </p>
        </Section>
      )}

      {item.kind === "component" && (
        <Section title="Installation">
          <DocsCode
            code={`npx shadcn@latest add ${siteConfig.registryNamespace}/${name}`}
            language="bash"
            lineNumbers={false}
          />
        </Section>
      )}

      {Gallery && (
        <Section
          title="Variations"
          description="Ported from shadcn's examples. Open Code on any section to see and copy it."
        >
          <div className="bg-background rounded-card p-4 sm:p-6 lg:p-8">
            <ExampleSourcesProvider sources={sectionCode}>
              <Gallery />
            </ExampleSourcesProvider>
          </div>
        </Section>
      )}

      {item.kind === "component" && (
        <Section
          title="Usage in the apps"
          description="Which apps install this component, whether their copy matches the registry, and which files import it."
        >
          <UsagePanel name={name} />
        </Section>
      )}
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex min-w-0 flex-col gap-4">
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && (
            <p className="text-muted-foreground text-sm">
              <InlineCode text={description} />
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

// Demo descriptions are plain strings; `backticked` names render as inline code.
function InlineCode({ text }: { text: string }) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="bg-muted text-foreground rounded-md px-1 py-0.5 font-mono text-[0.8125rem]"
      >
        {part}
      </code>
    ) : (
      part
    )
  )
}
