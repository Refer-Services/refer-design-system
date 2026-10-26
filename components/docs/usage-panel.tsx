import { appLabels } from "@/config/docs"
import { getUsage, getUsageMeta } from "@/lib/docs"
import { UsageFiles } from "@/components/docs/usage-files"
import { Badge } from "@/registry/refer/ui/badge"

const statusBadge = {
  identical: { label: "In sync", variant: "positive_subtle" },
  diverged: { label: "Diverged", variant: "destructive_subtle" },
  missing: { label: "Not installed", variant: "outline" },
} as const

export function UsagePanel({ name }: { name: string }) {
  const usage = getUsage(name)
  const meta = getUsageMeta()
  if (!usage) return null

  const total = Object.values(usage).reduce(
    (count, app) => count + app.files.length,
    0
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card shadow-card squircle divide-border-low flex flex-col divide-y rounded-2xl">
        {meta.apps.map((app) => {
          const appUsage = usage[app]
          const badge = statusBadge[appUsage.status]
          return (
            <div key={app} className="flex flex-col gap-2 px-4 py-3 text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-20 font-medium">
                  {appLabels[app] ?? app}
                </span>
                <Badge variant={badge.variant}>{badge.label}</Badge>
                <span className="text-muted-foreground ml-auto tabular-nums">
                  {appUsage.files.length === 0
                    ? "Not imported"
                    : `${appUsage.files.length} ${appUsage.files.length === 1 ? "file" : "files"}`}
                </span>
              </div>
              {appUsage.files.length > 0 && (
                <UsageFiles files={appUsage.files} />
              )}
            </div>
          )
        })}
      </div>
      <p className="text-muted-foreground text-xs">
        {total === 0
          ? "No app imports this component."
          : `Imported by ${total} ${total === 1 ? "file" : "files"} across the apps.`}{" "}
        From {meta.source.repo}@{meta.source.commit},{" "}
        {new Date(meta.generatedAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        . &ldquo;In sync&rdquo; means the app&apos;s copy matches this registry;
        refresh with <code className="font-mono">npm run usage:build</code>.
      </p>
    </div>
  )
}
