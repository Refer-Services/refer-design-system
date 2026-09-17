import { CandidateMatchBadge } from "@/registry/refer/ui/candidate-match-badge"

export function CandidateMatchBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CandidateMatchBadge variant="strong" />
      <CandidateMatchBadge variant="match" />
      <CandidateMatchBadge variant="almost" />
    </div>
  )
}
