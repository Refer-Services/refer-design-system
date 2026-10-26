import * as React from "react"

import { AlertDialogExample } from "@/components/examples/alert-dialog-example"
import { AttachmentExample } from "@/components/examples/attachment-example"
import { AvatarExample } from "@/components/examples/avatar-example"
import { BubbleExample } from "@/components/examples/bubble-example"
import { ButtonGroupExample } from "@/components/examples/button-group-example"
import { CodeBlockExample } from "@/components/examples/code-block-example"
import { CommandExample } from "@/components/examples/command-example"
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
import type { ExampleName } from "@/components/examples/names"

// Variations galleries ported from shadcn (components/examples/<name>-example.tsx).
export const examples: Record<ExampleName, React.ComponentType> = {
  "alert-dialog": AlertDialogExample,
  attachment: AttachmentExample,
  avatar: AvatarExample,
  bubble: BubbleExample,
  "button-group": ButtonGroupExample,
  "code-block": CodeBlockExample,
  command: CommandExample,
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

export function exampleFile(name: string) {
  return `components/examples/${name}-example.tsx`
}
