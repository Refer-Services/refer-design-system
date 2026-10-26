import * as React from "react"

import { cn } from "@/lib/utils"
import { loadHighlighter } from "@/registry/refer/lib/highlighter"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/registry/refer/ui/code-block"

// Highlighted on the server with the DS's own highlighter and shown in the DS's own CodeBlock.
export async function DocsCode({
  code,
  title,
  language = "tsx",
  lineNumbers = true,
  className,
  contentClassName,
}: {
  code: string
  title?: string
  language?: string
  lineNumbers?: boolean
  className?: string
  contentClassName?: string
}) {
  const highlighter = await loadHighlighter(language)
  const lines = highlighter
    ? highlighter.highlight(code).lines
    : code.split("\n")

  return (
    <CodeBlock className={cn("w-full", className)}>
      {title ? (
        <CodeBlockHeader>
          <CodeBlockTitle className="font-mono text-xs font-normal">
            {title}
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      )}
      <CodeBlockContent
        lineNumbers={lineNumbers}
        className={cn("max-h-[480px] text-[13px]", contentClassName)}
      >
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
