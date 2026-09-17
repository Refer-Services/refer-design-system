import { CandidateRatingBadge } from "@/registry/refer/ui/candidate-rating-badge"

export function CandidateRatingBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CandidateRatingBadge variant="strong_yes" />
      <CandidateRatingBadge variant="yes" />
      <CandidateRatingBadge variant="strong_no" />
      <CandidateRatingBadge variant="no" />
    </div>
  )
}
