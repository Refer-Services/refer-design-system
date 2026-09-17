import { CandidateSourceBadge } from "@/registry/refer/ui/candidate-source-badge"

export function CandidateSourceBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CandidateSourceBadge source="lia" />
      <CandidateSourceBadge source="applicant" />
      <CandidateSourceBadge source="manual" />
    </div>
  )
}
