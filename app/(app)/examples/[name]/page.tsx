import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { AlertDialogExample } from "@/components/examples/alert-dialog-example"
import { AttachmentExample } from "@/components/examples/attachment-example"
import { AvatarExample } from "@/components/examples/avatar-example"
import { BubbleExample } from "@/components/examples/bubble-example"
import { ButtonGroupExample } from "@/components/examples/button-group-example"
import { CodeBlockExample } from "@/components/examples/code-block-example"
import { DrawerExample } from "@/components/examples/drawer-example"
import { FieldExample } from "@/components/examples/field-example"
import { ItemExample } from "@/components/examples/item-example"
import { KbdExample } from "@/components/examples/kbd-example"
import { MarkerExample } from "@/components/examples/marker-example"
import { MessageExample } from "@/components/examples/message-example"
import { MessageScrollerExample } from "@/components/examples/message-scroller-example"
import { NativeSelectExample } from "@/components/examples/native-select-example"
import { QuestionnaireExample } from "@/components/examples/questionnaire-example"
import { SonnerExample } from "@/components/examples/sonner-example"
import { SpinnerExample } from "@/components/examples/spinner-example"
import { SwitchExample } from "@/components/examples/switch-example"
import { TableExample } from "@/components/examples/table-example"
import { TabsExample } from "@/components/examples/tabs-example"
import { ToastExample } from "@/components/examples/toast-example"
import { TraceExample } from "@/components/examples/trace-example"
import {
  exampleNames,
  hasExample,
  type ExampleName,
} from "@/components/examples/names"

const examples: Record<ExampleName, React.ComponentType> = {
  "alert-dialog": AlertDialogExample,
  attachment: AttachmentExample,
  avatar: AvatarExample,
  bubble: BubbleExample,
  "button-group": ButtonGroupExample,
  "code-block": CodeBlockExample,
  drawer: DrawerExample,
  field: FieldExample,
  item: ItemExample,
  kbd: KbdExample,
  marker: MarkerExample,
  message: MessageExample,
  "message-scroller": MessageScrollerExample,
  "native-select": NativeSelectExample,
  questionnaire: QuestionnaireExample,
  sonner: SonnerExample,
  spinner: SpinnerExample,
  switch: SwitchExample,
  table: TableExample,
  tabs: TabsExample,
  toast: ToastExample,
  trace: TraceExample,
}

export function generateStaticParams() {
  return exampleNames.map((name) => ({ name }))
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

  if (!hasExample(name)) {
    notFound()
  }

  const Gallery = examples[name]

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 pt-6 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <Link
          href={`/#${name}`}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeftIcon className="size-4" />
          All components
        </Link>
        <h1 className="ml-auto font-mono text-sm font-medium">{name}</h1>
      </div>
      <Gallery />
    </div>
  )
}
