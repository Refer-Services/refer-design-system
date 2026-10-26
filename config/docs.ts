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
]

// Pages about tokens rather than registry items: no install command, no usage stats.
export const foundations = [
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
      part === "otp" ? "OTP" : part[0].toUpperCase() + part.slice(1)
    )
    .join(" ")
}
