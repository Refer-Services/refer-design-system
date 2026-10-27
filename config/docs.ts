// Docs-site groupings that the registry itself doesn't carry.

// Components added in the latest upstream wave, highlighted on the index and in the sidebar.
export const newComponents = [
  "attachment",
  "bubble",
  "code-block",
  "direction",
  "marker",
  "message",
  "message-scroller",
  "questionnaire",
  "toast",
  "trace",
  "ui-labels",
]

// Pages about tokens rather than registry items: no install command, no usage stats.
export const foundations = [
  { name: "colors", title: "Colors" },
  { name: "typography", title: "Typography" },
  { name: "shadows", title: "Shadows" },
]

export const appLabels: Record<string, string> = {
  portal: "Portal",
  argus: "Argus",
  landing: "Landing",
  partners: "Partners",
}

export function titleFromName(name: string) {
  return name
    .split("-")
    .map((part) =>
      part === "otp" || part === "ui"
        ? part.toUpperCase()
        : part[0].toUpperCase() + part.slice(1)
    )
    .join(" ")
}
