import { redirect } from "next/navigation"

// Galleries now live on each component page.
export default async function ExamplePage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  redirect(`/components/${name}`)
}
