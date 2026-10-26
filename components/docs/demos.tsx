import * as React from "react"

import { AccordionDemo } from "@/components/accordion-demo"
import { AlertDemo } from "@/components/alert-demo"
import { AlertDialogDemo } from "@/components/alert-dialog-demo"
import { AspectRatioDemo } from "@/components/aspect-ratio-demo"
import { AttachmentDemo } from "@/components/attachment-demo"
import { AvatarDemo } from "@/components/avatar-demo"
import { BadgeDemo } from "@/components/badge-demo"
import { BreadcrumbDemo } from "@/components/breadcrumb-demo"
import { BubbleDemo } from "@/components/bubble-demo"
import { ButtonDemo } from "@/components/button-demo"
import { ButtonGroupDemo } from "@/components/button-group-demo"
import { ButtonIconDemo } from "@/components/button-icon-demo"
import { ButtonIconsDemo } from "@/components/button-icons-demo"
import { ButtonSizesDemo } from "@/components/button-sizes-demo"
import { CalendarDemo } from "@/components/calendar-demo"
import { CardDemo } from "@/components/card-demo"
import { CarouselDemo } from "@/components/carousel-demo"
import { ChartDemo } from "@/components/chart-demo"
import { CheckboxDemo } from "@/components/checkbox-demo"
import { CodeBlockDemo } from "@/components/code-block-demo"
import { CollapsibleDemo } from "@/components/collapsible-demo"
import { ColorsDemo } from "@/components/colors-demo"
import { ComboboxDemo } from "@/components/combobox-demo"
import { ComboboxExample } from "@/components/combobox2-demo"
import { CommandDemo } from "@/components/command-demo"
import { ContextMenuDemo } from "@/components/context-menu-demo"
import { DatePickerDemo } from "@/components/date-picker-demo"
import { DialogDemo } from "@/components/dialog-demo"
import { DirectionDemo } from "@/components/direction-demo"
import { DrawerDemo } from "@/components/drawer-demo"
import { DropdownMenuDemo } from "@/components/dropdown-menu-demo"
import { EmptyExample } from "@/components/empty-demo"
import { FieldDemo } from "@/components/field-demo"
import { FormDemo } from "@/components/form-demo"
import { HoverCardDemo } from "@/components/hover-card-demo"
import { InputDemo } from "@/components/input-demo"
import { InputOTPDemo } from "@/components/input-otp-demo"
import { ItemDemo } from "@/components/item-demo"
import { KbdDemo } from "@/components/kbd-demo"
import { LabelDemo } from "@/components/label-demo"
import { MarkerDemo } from "@/components/marker-demo"
import { MenubarDemo } from "@/components/menubar-demo"
import { MessageDemo } from "@/components/message-demo"
import { MessageScrollerDemo } from "@/components/message-scroller-demo"
import { NativeSelectDemo } from "@/components/native-select-demo"
import { NavigationMenuDemo } from "@/components/navigation-menu-demo"
import { PaginationDemo } from "@/components/pagination-demo"
import { PopoverDemo } from "@/components/popover-demo"
import { ProgressDemo } from "@/components/progress-demo"
import { QuestionnaireDemo } from "@/components/questionnaire-demo"
import { RadioGroupDemo } from "@/components/radio-group-demo"
import { ResizableDemo } from "@/components/resizable-demo"
import { ScrollAreaDemo } from "@/components/scroll-area-demo"
import { SelectDemo } from "@/components/select-demo"
import { SelectExample } from "@/components/select2-demo"
import { SeparatorDemo } from "@/components/separator-demo"
import { ShadowDemo } from "@/components/shadow-demo"
import { SheetDemo } from "@/components/sheet-demo"
import { SkeletonDemo } from "@/components/skeleton-demo"
import { SliderDemo } from "@/components/slider-demo"
import { SonnerDemo } from "@/components/sonner-demo"
import { SpinnerDemo } from "@/components/spinner-demo"
import { SwitchDemo } from "@/components/switch-demo"
import { TableDemo } from "@/components/table-demo"
import { TabsDemo } from "@/components/tabs-demo"
import { TextareaDemo } from "@/components/textarea-demo"
import { ToastDemo } from "@/components/toast-demo"
import { ToggleDemo } from "@/components/toggle-demo"
import { ToggleGroupDemo } from "@/components/toggle-group-demo"
import { TooltipDemo } from "@/components/tooltip-demo"
import { TraceDemo } from "@/components/trace-demo"
import { TypographyDemo } from "@/components/typography-demo"

export type Demo = {
  title?: string
  component: React.ComponentType
  // Source shown in the Code tab, relative to the repo root.
  file: string
}

function demo(
  component: React.ComponentType,
  file: string,
  title?: string
): Demo {
  return { component, file: `components/${file}.tsx`, title }
}

// Demos per docs page (registry item name or foundation). Pages without an entry show "No demo yet".
export const demos: Record<string, Demo[]> = {
  accordion: [demo(AccordionDemo, "accordion-demo")],
  alert: [demo(AlertDemo, "alert-demo")],
  "alert-dialog": [demo(AlertDialogDemo, "alert-dialog-demo")],
  "aspect-ratio": [demo(AspectRatioDemo, "aspect-ratio-demo")],
  attachment: [demo(AttachmentDemo, "attachment-demo")],
  avatar: [demo(AvatarDemo, "avatar-demo")],
  badge: [demo(BadgeDemo, "badge-demo")],
  breadcrumb: [demo(BreadcrumbDemo, "breadcrumb-demo")],
  bubble: [demo(BubbleDemo, "bubble-demo")],
  button: [
    demo(ButtonDemo, "button-demo", "Variants"),
    demo(ButtonSizesDemo, "button-sizes-demo", "Sizes"),
    demo(ButtonIconsDemo, "button-icons-demo", "With icons"),
    demo(ButtonIconDemo, "button-icon-demo", "Icon buttons"),
  ],
  "button-group": [demo(ButtonGroupDemo, "button-group-demo")],
  calendar: [
    demo(CalendarDemo, "calendar-demo"),
    demo(DatePickerDemo, "date-picker-demo", "Date picker"),
  ],
  card: [demo(CardDemo, "card-demo")],
  carousel: [demo(CarouselDemo, "carousel-demo")],
  chart: [demo(ChartDemo, "chart-demo")],
  checkbox: [demo(CheckboxDemo, "checkbox-demo")],
  "code-block": [demo(CodeBlockDemo, "code-block-demo")],
  collapsible: [demo(CollapsibleDemo, "collapsible-demo")],
  combobox: [
    demo(ComboboxDemo, "combobox-demo"),
    demo(ComboboxExample, "combobox2-demo", "Variations"),
  ],
  command: [demo(CommandDemo, "command-demo")],
  "context-menu": [demo(ContextMenuDemo, "context-menu-demo")],
  dialog: [demo(DialogDemo, "dialog-demo")],
  direction: [demo(DirectionDemo, "direction-demo")],
  drawer: [demo(DrawerDemo, "drawer-demo")],
  "dropdown-menu": [demo(DropdownMenuDemo, "dropdown-menu-demo")],
  empty: [demo(EmptyExample, "empty-demo")],
  field: [demo(FieldDemo, "field-demo")],
  form: [demo(FormDemo, "form-demo")],
  "hover-card": [demo(HoverCardDemo, "hover-card-demo")],
  input: [demo(InputDemo, "input-demo")],
  "input-otp": [demo(InputOTPDemo, "input-otp-demo")],
  item: [demo(ItemDemo, "item-demo")],
  kbd: [demo(KbdDemo, "kbd-demo")],
  label: [demo(LabelDemo, "label-demo")],
  marker: [demo(MarkerDemo, "marker-demo")],
  menubar: [demo(MenubarDemo, "menubar-demo")],
  message: [demo(MessageDemo, "message-demo")],
  "message-scroller": [demo(MessageScrollerDemo, "message-scroller-demo")],
  "native-select": [demo(NativeSelectDemo, "native-select-demo")],
  "navigation-menu": [demo(NavigationMenuDemo, "navigation-menu-demo")],
  pagination: [demo(PaginationDemo, "pagination-demo")],
  popover: [demo(PopoverDemo, "popover-demo")],
  progress: [demo(ProgressDemo, "progress-demo")],
  questionnaire: [demo(QuestionnaireDemo, "questionnaire-demo")],
  "radio-group": [demo(RadioGroupDemo, "radio-group-demo")],
  resizable: [demo(ResizableDemo, "resizable-demo")],
  "scroll-area": [demo(ScrollAreaDemo, "scroll-area-demo")],
  select: [
    demo(SelectDemo, "select-demo"),
    demo(SelectExample, "select2-demo", "Variations"),
  ],
  separator: [demo(SeparatorDemo, "separator-demo")],
  sheet: [demo(SheetDemo, "sheet-demo")],
  skeleton: [demo(SkeletonDemo, "skeleton-demo")],
  slider: [demo(SliderDemo, "slider-demo")],
  sonner: [demo(SonnerDemo, "sonner-demo")],
  spinner: [demo(SpinnerDemo, "spinner-demo")],
  switch: [demo(SwitchDemo, "switch-demo")],
  table: [demo(TableDemo, "table-demo")],
  tabs: [demo(TabsDemo, "tabs-demo")],
  textarea: [demo(TextareaDemo, "textarea-demo")],
  toast: [demo(ToastDemo, "toast-demo")],
  toggle: [demo(ToggleDemo, "toggle-demo")],
  "toggle-group": [demo(ToggleGroupDemo, "toggle-group-demo")],
  tooltip: [demo(TooltipDemo, "tooltip-demo")],
  trace: [demo(TraceDemo, "trace-demo")],
  typography: [demo(TypographyDemo, "typography-demo")],
  shadows: [demo(ShadowDemo, "shadow-demo")],
  colors: [demo(ColorsDemo, "colors-demo")],
}
