import * as React from "react"
import { Globe, Import } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/refer/ui/badge"
import { LiaContactIcon } from "@/registry/refer/ui/lia-contact-icon"

const SOURCE_CONFIG = {
  lia: {
    label: "Lia's contact",
    icon: LiaContactIcon,
    variant: "primary_subtle",
  },
  applicant: {
    label: "Applicant",
    icon: Globe,
    variant: "secondary_subtle",
  },
  manual: {
    label: "Manually added",
    icon: Import,
    variant: "secondary_subtle",
  },
} as const

type CandidateSource = keyof typeof SOURCE_CONFIG

type CandidateSourceBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  "children" | "variant" | "asChild"
> & {
  source: CandidateSource
}

function CandidateSourceBadge({
  source,
  className,
  ...props
}: CandidateSourceBadgeProps) {
  const { label, icon: Icon, variant } = SOURCE_CONFIG[source]

  return (
    <Badge
      {...props}
      data-slot="candidate-source-badge"
      data-source={source}
      variant={variant}
      className={cn(
        "h-5 rounded-md border-0 px-1.5 py-0 text-xs font-normal has-[>svg]:pl-1.5",
        className
      )}
    >
      <Icon aria-hidden="true" className="size-3 shrink-0" />
      {label}
    </Badge>
  )
}

export { CandidateSourceBadge }
export type { CandidateSource, CandidateSourceBadgeProps }
