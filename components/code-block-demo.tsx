"use client"

import { FileCodeIcon } from "lucide-react"

import { useHighlightedCode } from "@/registry/refer/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/registry/refer/ui/code-block"

const source = `import { Button } from "@/components/ui/button"

export function ReferButton() {
  return <Button variant="primary">Refer a friend</Button>
}`

export function CodeBlockDemo() {
  const lines = useHighlightedCode(source, "tsx")

  return (
    <CodeBlock className="w-full max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon />
          refer-button.tsx
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={source} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
