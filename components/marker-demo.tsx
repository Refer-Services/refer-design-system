import { CalendarIcon, ChevronRightIcon, UserCheckIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/registry/refer/ui/marker"
import { Spinner } from "@/registry/refer/ui/spinner"

export function MarkerDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Marker>
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <UserCheckIcon />
        </MarkerIcon>
        <MarkerContent>Ana moved to Interview</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Matching candidates...</MarkerContent>
      </Marker>
      <Marker asChild>
        <a href="#">
          <MarkerIcon>
            <CalendarIcon />
          </MarkerIcon>
          <MarkerContent className="flex-1">Interview scheduled</MarkerContent>
          <MarkerIcon>
            <ChevronRightIcon />
          </MarkerIcon>
        </a>
      </Marker>
    </div>
  )
}
