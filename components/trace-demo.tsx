import { FileSearchIcon, SearchIcon, SparklesIcon } from "lucide-react"

import { CodeBlock, CodeBlockContent } from "@/registry/refer/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/refer/ui/trace"

export function TraceDemo() {
  return (
    <Trace className="w-full max-w-md">
      <TraceLine status="running">
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Searching 1,240 profiles</TraceTitle>
      </TraceLine>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <FileSearchIcon />
            </TraceIcon>
            <TraceTitle>Read the job description</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap>
              Senior Product Designer · Remote · 5+ years · Figma, research
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <SparklesIcon />
        </TraceIcon>
        <TraceTitle>Ranked 12 matches</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
