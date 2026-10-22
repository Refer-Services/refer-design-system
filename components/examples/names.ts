// Components with a full variations gallery at /examples/<name> (galleries live in components/examples/).
export const exampleNames = [
  "attachment",
  "bubble",
  "button-group",
  "code-block",
  "field",
  "item",
  "kbd",
  "marker",
  "message",
  "message-scroller",
  "native-select",
  "questionnaire",
  "spinner",
  "toast",
  "trace",
] as const

export type ExampleName = (typeof exampleNames)[number]

export function hasExample(name: string): name is ExampleName {
  return (exampleNames as readonly string[]).includes(name)
}
