// Components with a full variations gallery at /examples/<name> (galleries live in components/examples/).
export const exampleNames = [
  "attachment",
  "bubble",
  "code-block",
  "marker",
  "message",
  "message-scroller",
  "questionnaire",
  "toast",
  "trace",
] as const

export type ExampleName = (typeof exampleNames)[number]

export function hasExample(name: string): name is ExampleName {
  return (exampleNames as readonly string[]).includes(name)
}
