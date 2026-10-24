// Components with a full variations gallery at /examples/<name> (galleries live in components/examples/).
export const exampleNames = [
  "alert-dialog",
  "attachment",
  "avatar",
  "bubble",
  "button-group",
  "code-block",
  "drawer",
  "field",
  "item",
  "kbd",
  "marker",
  "message",
  "message-scroller",
  "native-select",
  "questionnaire",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "toast",
  "trace",
] as const

export type ExampleName = (typeof exampleNames)[number]

export function hasExample(name: string): name is ExampleName {
  return (exampleNames as readonly string[]).includes(name)
}
