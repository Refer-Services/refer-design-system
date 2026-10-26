"use client"

import * as React from "react"
import { CodeIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useExampleSource } from "@/components/docs/example-sources"
import { Button } from "@/registry/refer/ui/button"

// Gallery layout for components/examples/*, mirroring shadcn's example harness so their example files port as-is.
// On a component page, each section can also show its own code (see ExampleSourcesProvider).
function ExampleWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="example-wrapper"
      className={cn(
        "mx-auto grid w-full max-w-5xl min-w-0 items-start gap-8 md:grid-cols-2 md:gap-6 2xl:max-w-6xl",
        className
      )}
      {...props}
    />
  )
}

function Example({
  title,
  children,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
  containerClassName?: string
}) {
  const code = useExampleSource(title)
  const [showCode, setShowCode] = React.useState(false)

  return (
    <div
      data-slot="example"
      className={cn(
        "mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none",
        containerClassName
      )}
      {...props}
    >
      {(title || code) && (
        <div className="flex min-h-8 items-center gap-2 px-1.5">
          {title && (
            <div className="text-muted-foreground text-xs font-medium">
              {title}
            </div>
          )}
          {code && (
            <Button
              variant="ghost"
              size="xs"
              className="text-muted-foreground ml-auto h-7 px-2.5 text-xs has-[>svg]:pl-2"
              aria-expanded={showCode}
              onClick={() => setShowCode((value) => !value)}
            >
              <CodeIcon className="size-3.5" />
              {showCode ? "Hide code" : "Code"}
            </Button>
          )}
        </div>
      )}
      <div
        data-slot="example-content"
        className={cn(
          "bg-card text-foreground shadow-card flex min-w-0 flex-1 flex-col items-start gap-6 rounded-2xl p-10 *:[div:not([class*='w-'])]:w-full",
          className
        )}
      >
        {children}
      </div>
      {code && showCode && <div className="mt-2 min-w-0">{code}</div>}
    </div>
  )
}

export { ExampleWrapper, Example }
