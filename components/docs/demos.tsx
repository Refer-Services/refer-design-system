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
import { CheckboxBasicDemo } from "@/components/checkbox-basic-demo"
import { CheckboxBoxedDemo } from "@/components/checkbox-boxed-demo"
import { CheckboxDemo } from "@/components/checkbox-demo"
import { CheckboxDescriptionDemo } from "@/components/checkbox-description-demo"
import { CheckboxDisabledDemo } from "@/components/checkbox-disabled-demo"
import { CheckboxGroupDemo } from "@/components/checkbox-group-demo"
import { CheckboxInvalidDemo } from "@/components/checkbox-invalid-demo"
import { CheckboxTableDemo } from "@/components/checkbox-table-demo"
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
import { DrawerFloatingDemo } from "@/components/drawer-floating-demo"
import { DrawerNestedDemo } from "@/components/drawer-nested-demo"
import { DrawerNonModalDemo } from "@/components/drawer-non-modal-demo"
import { DrawerSidesDemo } from "@/components/drawer-sides-demo"
import { DrawerSnapPointsDemo } from "@/components/drawer-snap-points-demo"
import { DrawerSwipeHandleDemo } from "@/components/drawer-swipe-handle-demo"
import { DropdownMenuDemo } from "@/components/dropdown-menu-demo"
import { EmptyExample } from "@/components/empty-demo"
import { FieldCheckboxDemo } from "@/components/field-checkbox-demo"
import { FieldChoiceCardDemo } from "@/components/field-choice-card-demo"
import { FieldDemo } from "@/components/field-demo"
import { FieldFieldsetDemo } from "@/components/field-fieldset-demo"
import { FieldGroupDemo } from "@/components/field-group-demo"
import { FieldInputDemo } from "@/components/field-input-demo"
import { FieldRadioDemo } from "@/components/field-radio-demo"
import { FieldResponsiveDemo } from "@/components/field-responsive-demo"
import { FieldSelectDemo } from "@/components/field-select-demo"
import { FieldSliderDemo } from "@/components/field-slider-demo"
import { FieldSwitchDemo } from "@/components/field-switch-demo"
import { FieldTextareaDemo } from "@/components/field-textarea-demo"
import { FormDemo } from "@/components/form-demo"
import { FormRhfArrayDemo } from "@/components/form-rhf-array-demo"
import { FormRhfCheckboxDemo } from "@/components/form-rhf-checkbox-demo"
import { FormRhfComplexDemo } from "@/components/form-rhf-complex-demo"
import { FormRhfDemo } from "@/components/form-rhf-demo"
import { FormRhfInputDemo } from "@/components/form-rhf-input-demo"
import { FormRhfPasswordDemo } from "@/components/form-rhf-password-demo"
import { FormRhfRadiogroupDemo } from "@/components/form-rhf-radiogroup-demo"
import { FormRhfSelectDemo } from "@/components/form-rhf-select-demo"
import { FormRhfSwitchDemo } from "@/components/form-rhf-switch-demo"
import { FormRhfTextareaDemo } from "@/components/form-rhf-textarea-demo"
import { HoverCardDemo } from "@/components/hover-card-demo"
import { InputBadgeDemo } from "@/components/input-badge-demo"
import { InputBasicDemo } from "@/components/input-basic-demo"
import { InputButtonGroupDemo } from "@/components/input-button-group-demo"
import { InputDemo } from "@/components/input-demo"
import { InputDisabledDemo } from "@/components/input-disabled-demo"
import { InputFieldDemo } from "@/components/input-field-demo"
import { InputFieldgroupDemo } from "@/components/input-fieldgroup-demo"
import { InputFileDemo } from "@/components/input-file-demo"
import { InputFormDemo } from "@/components/input-form-demo"
import { InputGridDemo } from "@/components/input-grid-demo"
import { InputGroupBlockEndDemo } from "@/components/input-group-block-end-demo"
import { InputGroupBlockStartDemo } from "@/components/input-group-block-start-demo"
import { InputGroupButtonDemo } from "@/components/input-group-button-demo"
import { InputGroupCustomDemo } from "@/components/input-group-custom-demo"
import { InputGroupDemo } from "@/components/input-group-demo"
import { InputGroupDropdownDemo } from "@/components/input-group-dropdown-demo"
import { InputGroupIconDemo } from "@/components/input-group-icon-demo"
import { InputGroupInlineEndDemo } from "@/components/input-group-inline-end-demo"
import { InputGroupInlineStartDemo } from "@/components/input-group-inline-start-demo"
import { InputGroupKbdDemo } from "@/components/input-group-kbd-demo"
import { InputGroupSpinnerDemo } from "@/components/input-group-spinner-demo"
import { InputGroupTextDemo } from "@/components/input-group-text-demo"
import { InputGroupTextareaDemo } from "@/components/input-group-textarea-demo"
import { InputInlineDemo } from "@/components/input-inline-demo"
import { InputInputGroupDemo } from "@/components/input-input-group-demo"
import { InputInvalidDemo } from "@/components/input-invalid-demo"
import { InputOTPAlphanumericDemo } from "@/components/input-otp-alphanumeric-demo"
import { InputOTPControlledDemo } from "@/components/input-otp-controlled-demo"
import { InputOTPDemo } from "@/components/input-otp-demo"
import { InputOTPDisabledDemo } from "@/components/input-otp-disabled-demo"
import { InputOTPFormDemo } from "@/components/input-otp-form-demo"
import { InputOTPFourDigitsDemo } from "@/components/input-otp-four-digits-demo"
import { InputOTPInvalidDemo } from "@/components/input-otp-invalid-demo"
import { InputOTPPatternDemo } from "@/components/input-otp-pattern-demo"
import { InputOTPSeparatorDemo } from "@/components/input-otp-separator-demo"
import { InputRequiredDemo } from "@/components/input-required-demo"
import { ItemDemo } from "@/components/item-demo"
import { KbdDemo } from "@/components/kbd-demo"
import { LabelDemo } from "@/components/label-demo"
import { LabelFieldDemo } from "@/components/label-field-demo"
import { MarkerDemo } from "@/components/marker-demo"
import { MenubarDemo } from "@/components/menubar-demo"
import { MessageDemo } from "@/components/message-demo"
import { MessageScrollerDemo } from "@/components/message-scroller-demo"
import { NativeSelectDemo } from "@/components/native-select-demo"
import { NativeSelectDisabledDemo } from "@/components/native-select-disabled-demo"
import { NativeSelectGroupsDemo } from "@/components/native-select-groups-demo"
import { NativeSelectInvalidDemo } from "@/components/native-select-invalid-demo"
import { NavigationMenuDemo } from "@/components/navigation-menu-demo"
import { PaginationDemo } from "@/components/pagination-demo"
import { PopoverDemo } from "@/components/popover-demo"
import { ProgressDemo } from "@/components/progress-demo"
import { QuestionnaireDemo } from "@/components/questionnaire-demo"
import { RadioGroupChoiceCardDemo } from "@/components/radio-group-choice-card-demo"
import { RadioGroupDemo } from "@/components/radio-group-demo"
import { RadioGroupDescriptionDemo } from "@/components/radio-group-description-demo"
import { RadioGroupDisabledDemo } from "@/components/radio-group-disabled-demo"
import { RadioGroupFieldsetDemo } from "@/components/radio-group-fieldset-demo"
import { RadioGroupInvalidDemo } from "@/components/radio-group-invalid-demo"
import { ResizableDemo } from "@/components/resizable-demo"
import { ResponsiveDialogDemo } from "@/components/responsive-dialog-demo"
import { ScrollAreaDemo } from "@/components/scroll-area-demo"
import { SelectAlignItemDemo } from "@/components/select-align-item-demo"
import { SelectDemo } from "@/components/select-demo"
import { SelectDisabledDemo } from "@/components/select-disabled-demo"
import { SelectGroupsDemo } from "@/components/select-groups-demo"
import { SelectInvalidDemo } from "@/components/select-invalid-demo"
import { SelectScrollableDemo } from "@/components/select-scrollable-demo"
import { SelectExample } from "@/components/select2-demo"
import { SeparatorDemo } from "@/components/separator-demo"
import { ShadowDemo } from "@/components/shadow-demo"
import { SheetDemo } from "@/components/sheet-demo"
import { SkeletonDemo } from "@/components/skeleton-demo"
import { SliderDemo } from "@/components/slider-demo"
import { SonnerDemo } from "@/components/sonner-demo"
import { SpinnerDemo } from "@/components/spinner-demo"
import { SwitchChoiceCardDemo } from "@/components/switch-choice-card-demo"
import { SwitchDemo } from "@/components/switch-demo"
import { SwitchDescriptionDemo } from "@/components/switch-description-demo"
import { SwitchDisabledDemo } from "@/components/switch-disabled-demo"
import { SwitchInvalidDemo } from "@/components/switch-invalid-demo"
import { SwitchSizesDemo } from "@/components/switch-sizes-demo"
import { TableDemo } from "@/components/table-demo"
import { TabsDemo } from "@/components/tabs-demo"
import { TextareaButtonDemo } from "@/components/textarea-button-demo"
import { TextareaDemo } from "@/components/textarea-demo"
import { TextareaDisabledDemo } from "@/components/textarea-disabled-demo"
import { TextareaFieldDemo } from "@/components/textarea-field-demo"
import { TextareaInvalidDemo } from "@/components/textarea-invalid-demo"
import { ToastDemo } from "@/components/toast-demo"
import { ToggleDemo } from "@/components/toggle-demo"
import { ToggleGroupDemo } from "@/components/toggle-group-demo"
import { TooltipDemo } from "@/components/tooltip-demo"
import { TraceDemo } from "@/components/trace-demo"
import { TypographyDemo } from "@/components/typography-demo"
import { UILabelsDemo } from "@/components/ui-labels-demo"

export type Demo = {
  title?: string
  description?: string
  component: React.ComponentType
  // Source shown in the Code tab, relative to the repo root.
  file: string
}

function demo(
  component: React.ComponentType,
  file: string,
  title?: string,
  description?: string
): Demo {
  return { component, file: `components/${file}.tsx`, title, description }
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
  checkbox: [
    demo(CheckboxDemo, "checkbox-demo"),
    demo(
      CheckboxInvalidDemo,
      "checkbox-invalid-demo",
      "Invalid State",
      "Set `aria-invalid` on the `Checkbox` and `data-invalid` on the `Field` wrapper to show the invalid styles."
    ),
    demo(
      CheckboxBasicDemo,
      "checkbox-basic-demo",
      "Basic",
      "Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling."
    ),
    demo(
      CheckboxDescriptionDemo,
      "checkbox-description-demo",
      "Description",
      "Use `FieldContent` and `FieldDescription` for helper text."
    ),
    demo(
      CheckboxDisabledDemo,
      "checkbox-disabled-demo",
      "Disabled",
      "Use the `disabled` prop to prevent interaction, and add `data-disabled` to the `Field` to dim its label."
    ),
    demo(
      CheckboxGroupDemo,
      "checkbox-group-demo",
      "Group",
      "Use several horizontal `Field`s inside a `FieldSet` with a `FieldLegend` to build a checkbox list."
    ),
    demo(
      CheckboxTableDemo,
      "checkbox-table-demo",
      "Table",
      'Checkboxes select rows in a `Table`: a selected `TableRow` takes `data-state="selected"`, and the header checkbox uses Refer\'s `indeterminate` prop when only some rows are selected.'
    ),
    demo(
      CheckboxBoxedDemo,
      "checkbox-boxed-demo",
      "Boxed",
      "Refer's `CheckboxBoxed` is a card-style checkbox, the one the apps use for choice cards. It takes `CheckboxBoxedTitle` and an optional `CheckboxBoxedDescription`, and turns `primary-subtle` with a `primary-border` when checked."
    ),
  ],
  "checkbox-boxed": [
    demo(
      CheckboxBoxedDemo,
      "checkbox-boxed-demo",
      undefined,
      "A `Checkbox` rendered as a selectable bordered card. It takes `CheckboxBoxedTitle` and an optional `CheckboxBoxedDescription`, and turns `primary-subtle` with a `primary-border` when checked. Also shown on the Checkbox page."
    ),
  ],
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
  drawer: [
    demo(DrawerDemo, "drawer-demo"),
    demo(
      DrawerSidesDemo,
      "drawer-sides-demo",
      "Position",
      "Set the side with swipeDirection: up, right, down (the default) or left."
    ),
    demo(
      DrawerFloatingDemo,
      "drawer-floating-demo",
      "Floating",
      "Refer: drawers float 8px from the edges with every corner rounded, like a Dialog. floating={false} on DrawerContent attaches the drawer to the edge it comes from, with only the inner corners rounded."
    ),
    demo(
      DrawerSwipeHandleDemo,
      "drawer-swipe-handle-demo",
      "Swipe handle",
      "Bottom drawers show the handle by default. showSwipeHandle on Drawer adds it on any side; false hides it."
    ),
    demo(
      DrawerNestedDemo,
      "drawer-nested-demo",
      "Nested",
      "Open drawers from inside another drawer. Parent drawers stay mounted and stack behind the frontmost one."
    ),
    demo(
      DrawerNonModalDemo,
      "drawer-non-modal-demo",
      "Non modal",
      'modal={false} lets people use the rest of the page while the drawer is open; disablePointerDismissal keeps it open on outside presses. modal="trap-focus" keeps focus inside without blocking scroll and pointer.'
    ),
    demo(
      DrawerSnapPointsDemo,
      "drawer-snap-points-demo",
      "Snap points",
      "snapPoints snaps a bottom or top drawer to preset heights: 0 to 1 is a fraction of the viewport, above 1 is pixels, and strings take px or rem. Track the active one with snapPoint and onSnapPointChange."
    ),
    demo(
      ResponsiveDialogDemo,
      "responsive-dialog-demo",
      "Responsive",
      "ResponsiveDialog renders a Dialog from md (768px) up and a bottom Drawer below, with the same children."
    ),
  ],
  "dropdown-menu": [demo(DropdownMenuDemo, "dropdown-menu-demo")],
  empty: [demo(EmptyExample, "empty-demo")],
  field: [
    demo(
      FieldDemo,
      "field-demo",
      undefined,
      "`Field` wraps one control with its `FieldLabel`, `FieldDescription` and `FieldError`. `FieldGroup` stacks fields, and `FieldSet` with `FieldLegend` groups related ones semantically. For forms wired to React Hook Form, see the Form page."
    ),
    demo(
      FieldInputDemo,
      "field-input-demo",
      "Input",
      "Put `FieldDescription` before or after the `Input`; its spacing adjusts either way. Point `FieldLabel`'s `htmlFor` at the input's `id`."
    ),
    demo(
      FieldTextareaDemo,
      "field-textarea-demo",
      "Textarea",
      "A `Textarea` takes the same label and helper text as an input."
    ),
    demo(
      FieldSelectDemo,
      "field-select-demo",
      "Select",
      "Give the `SelectTrigger` the `id` that `FieldLabel` points at. Inside a vertical `Field`, the trigger stretches to full width."
    ),
    demo(
      FieldSliderDemo,
      "field-slider-demo",
      "Slider",
      "Use `FieldTitle` when there is no single element to label, and give the `Slider` an `aria-label`. The description can show the live value."
    ),
    demo(
      FieldFieldsetDemo,
      "field-fieldset-demo",
      "Fieldset",
      "`FieldSet` renders a semantic `fieldset`, and `FieldLegend` names the whole group for assistive tech. Put fields in a grid inside `FieldGroup` to place them side by side."
    ),
    demo(
      FieldCheckboxDemo,
      "field-checkbox-demo",
      "Checkbox",
      'Use `orientation="horizontal"` to put a `Checkbox` beside its label, and `FieldLegend variant="label"` for a legend at label size. Wrap the label and description in `FieldContent` so they stay aligned next to the control.'
    ),
    demo(
      FieldRadioDemo,
      "field-radio-demo",
      "Radio",
      "Give each `RadioGroupItem` its own horizontal `Field` inside the `RadioGroup`, with the group titled by `FieldLegend`."
    ),
    demo(
      FieldSwitchDemo,
      "field-switch-demo",
      "Switch",
      "A horizontal `Field` with the label first puts the `Switch` at the end of the row."
    ),
    demo(
      FieldChoiceCardDemo,
      "field-choice-card-demo",
      "Choice Card",
      "Wrap a `Field` in `FieldLabel` to make the whole card selectable. This works with `RadioGroupItem`, `Checkbox` and `Switch`. The boxed choice cards the apps already use are `RadioGroupItemBoxed` and `CheckboxBoxed`."
    ),
    demo(
      FieldGroupDemo,
      "field-group-demo",
      "Field Group",
      '`FieldGroup` stacks `Field`s and `FieldSeparator` divides them. Add `data-slot="checkbox-group"` to a group of checkboxes for tighter spacing.'
    ),
    demo(
      FieldResponsiveDemo,
      "field-responsive-demo",
      "Responsive Layout",
      '`orientation="responsive"` stacks label and control in narrow containers and puts them side by side once the parent `FieldGroup` (a `@container/field-group`) is wide enough. Use `orientation="horizontal"` to keep them side by side always.'
    ),
  ],
  form: [
    demo(
      FormRhfDemo,
      "form-rhf-demo",
      undefined,
      "Create the form with `useForm` and `zodResolver(schema)`, then render each field through React Hook Form's `Controller` into a `Field` with `FieldLabel`, `FieldDescription` and `FieldError`. Set `data-invalid={fieldState.invalid}` on the `Field` and `aria-invalid` on the control, and pass `errors={[fieldState.error]}` to `FieldError`."
    ),
    demo(
      FormDemo,
      "form-demo",
      "With the Form component",
      "The `Form` wrapper is what the apps use today and is still supported. `FormField` wraps `Controller`, and `FormItem`, `FormControl` and `FormMessage` set the ids, `aria-describedby` and `aria-invalid` for you; with `Field` you set those yourself."
    ),
    demo(
      FormRhfInputDemo,
      "form-rhf-input-demo",
      "Input",
      'Spread `field` onto the `Input` and give it an `id` for `FieldLabel`. Validation runs on submit by default; pass `mode` to `useForm` (`"onChange"`, `"onBlur"`, `"onTouched"` or `"all"`) to validate earlier.'
    ),
    demo(
      FormRhfTextareaDemo,
      "form-rhf-textarea-demo",
      "Textarea",
      "Spread `field` onto the `Textarea`, the same as an input. Set `aria-invalid` on the textarea and `data-invalid` on the `Field`."
    ),
    demo(
      FormRhfSelectDemo,
      "form-rhf-select-demo",
      "Select",
      "Pass `field.value` and `field.onChange` to `Select` as `value` and `onValueChange`, and put `aria-invalid` on the `SelectTrigger`. The error sits inside `FieldContent` so it stays under the label in the responsive layout."
    ),
    demo(
      FormRhfCheckboxDemo,
      "form-rhf-checkbox-demo",
      "Checkbox",
      'For a list of checkboxes, keep an array in `field.value` and add or remove the item\'s id in `onCheckedChange`. Mark the `FieldGroup` with `data-slot="checkbox-group"` for its spacing.'
    ),
    demo(
      FormRhfRadiogroupDemo,
      "form-rhf-radiogroup-demo",
      "Radio Group",
      "Pass `field.value` and `field.onChange` to `RadioGroup` as `value` and `onValueChange`. Each option is a `RadioGroupItemBoxed` choice card, whose `id` is the option's value; `FieldError` below the group shows the message."
    ),
    demo(
      FormRhfSwitchDemo,
      "form-rhf-switch-demo",
      "Switch",
      "Pass `field.value` and `field.onChange` to `Switch` as `checked` and `onCheckedChange`. A Zod `refine` can require it to be on."
    ),
    demo(
      FormRhfPasswordDemo,
      "form-rhf-password-demo",
      "Password",
      "`useWatch` reads the password as it's typed, to drive a strength `Progress` and a checklist of requirements. The Zod schema enforces the same rules on submit."
    ),
    demo(
      FormRhfArrayDemo,
      "form-rhf-array-demo",
      "Array fields",
      "`useFieldArray` returns `fields`, `append` and `remove` for a dynamic list. Render one `Controller` per item named `emails.${index}.address`, keyed by `field.id`, and show array-level errors from `formState.errors.emails.root`."
    ),
    demo(
      FormRhfComplexDemo,
      "form-rhf-complex-demo",
      "Complex form",
      "Choice cards, a select, a checkbox list and a switch in one schema, separated by `FieldSeparator`. Reset any of these forms with `form.reset()`."
    ),
  ],
  "hover-card": [demo(HoverCardDemo, "hover-card-demo")],
  input: [
    demo(InputDemo, "input-demo"),
    demo(
      InputBasicDemo,
      "input-basic-demo",
      "Basic",
      "A plain `Input`. It uses Refer's `rounded-input` radius, a card background and a primary focus ring."
    ),
    demo(
      InputFieldDemo,
      "input-field-demo",
      "Field",
      "Use `Field`, `FieldLabel` and `FieldDescription` to give an input a label and a description."
    ),
    demo(
      InputFieldgroupDemo,
      "input-fieldgroup-demo",
      "Field Group",
      "Use `FieldGroup` to stack several `Field` blocks and build forms."
    ),
    demo(
      InputDisabledDemo,
      "input-disabled-demo",
      "Disabled",
      "Use the `disabled` prop to disable the input. Add `data-disabled` to the `Field` to dim its label as well."
    ),
    demo(
      InputInvalidDemo,
      "input-invalid-demo",
      "Invalid",
      "Use `aria-invalid` to mark the input as invalid. Add `data-invalid` to the `Field` to turn the label and description destructive too."
    ),
    demo(
      InputFileDemo,
      "input-file-demo",
      "File",
      'Use `type="file"` to create a file input.'
    ),
    demo(
      InputInlineDemo,
      "input-inline-demo",
      "Inline",
      'Use `Field` with `orientation="horizontal"` to put an input and a `Button` on one line, e.g. a search bar.'
    ),
    demo(
      InputGridDemo,
      "input-grid-demo",
      "Grid",
      "Use a grid on `FieldGroup` to place inputs side by side."
    ),
    demo(
      InputRequiredDemo,
      "input-required-demo",
      "Required",
      "Use the `required` attribute and mark the label with an asterisk."
    ),
    demo(
      InputBadgeDemo,
      "input-badge-demo",
      "Badge",
      "Put a `Badge` in the `FieldLabel` to flag a field, e.g. a beta feature."
    ),
    demo(
      InputInputGroupDemo,
      "input-input-group-demo",
      "Input Group",
      "To add icons, text or buttons inside an input, use `InputGroup` with `InputGroupAddon`. See the Input Group page for more examples."
    ),
    demo(
      InputButtonGroupDemo,
      "input-button-group-demo",
      "Button Group",
      "To attach buttons to an input, wrap them in a `ButtonGroup`. See the Button Group page for more examples."
    ),
    demo(
      InputFormDemo,
      "input-form-demo",
      "Form",
      "A full form with several inputs, a `Select` and buttons. For validation with React Hook Form, see the Form page."
    ),
  ],
  "input-group": [
    demo(InputGroupDemo, "input-group-demo"),
    demo(
      InputGroupInlineStartDemo,
      "input-group-inline-start-demo",
      "Align: inline-start",
      'Use `align="inline-start"` on `InputGroupAddon` to place the addon before the input. This is the default.'
    ),
    demo(
      InputGroupInlineEndDemo,
      "input-group-inline-end-demo",
      "Align: inline-end",
      'Use `align="inline-end"` to place the addon after the input.'
    ),
    demo(
      InputGroupBlockStartDemo,
      "input-group-block-start-demo",
      "Align: block-start",
      'Use `align="block-start"` to place the addon above the input or textarea, like a header. The group grows to fit.'
    ),
    demo(
      InputGroupBlockEndDemo,
      "input-group-block-end-demo",
      "Align: block-end",
      'Use `align="block-end"` to place the addon below the input or textarea, like a footer.'
    ),
    demo(
      InputGroupIconDemo,
      "input-group-icon-demo",
      "Icon",
      "Put `lucide-react` icons in an `InputGroupAddon`; they size to 16px and take the muted foreground color. One addon can hold several icons."
    ),
    demo(
      InputGroupTextDemo,
      "input-group-text-demo",
      "Text",
      "Use `InputGroupText` for prefixes, suffixes, units and helper text such as a character count."
    ),
    demo(
      InputGroupButtonDemo,
      "input-group-button-demo",
      "Button",
      "`InputGroupButton` is a compact `Button` for addons. It defaults to `ghost` at size `xs`, and also comes in `sm`, `icon-xs` and `icon-sm`. It can trigger a `Popover`."
    ),
    demo(
      InputGroupKbdDemo,
      "input-group-kbd-demo",
      "Kbd",
      "Show a keyboard shortcut with a `Kbd` in an inline-end addon."
    ),
    demo(
      InputGroupDropdownDemo,
      "input-group-dropdown-demo",
      "Dropdown",
      "Use an `InputGroupButton` as the `DropdownMenuTrigger` to attach a menu to the field."
    ),
    demo(
      InputGroupSpinnerDemo,
      "input-group-spinner-demo",
      "Spinner",
      "Put a `Spinner` in an addon to show that a search or save is in progress."
    ),
    demo(
      InputGroupTextareaDemo,
      "input-group-textarea-demo",
      "Textarea",
      "`InputGroupTextarea` works with block addons for editor-style fields. Add `border-b` or `border-t` to an addon to separate it from the text."
    ),
    demo(
      InputGroupCustomDemo,
      "input-group-custom-demo",
      "Custom Input",
      'Add `data-slot="input-group-control"` to your own input so the group shows its focus ring. This one is a plain textarea that grows with its content using `field-sizing-content`.'
    ),
  ],
  "input-otp": [
    demo(InputOTPDemo, "input-otp-demo"),
    demo(
      InputOTPPatternDemo,
      "input-otp-pattern-demo",
      "Pattern",
      "Use the `pattern` prop to restrict what can be typed, for example `REGEXP_ONLY_DIGITS` from `input-otp`."
    ),
    demo(
      InputOTPSeparatorDemo,
      "input-otp-separator-demo",
      "Separator",
      "Use `InputOTPSeparator` between `InputOTPGroup`s to split the code into chunks."
    ),
    demo(
      InputOTPDisabledDemo,
      "input-otp-disabled-demo",
      "Disabled",
      "Use the `disabled` prop to disable the input."
    ),
    demo(
      InputOTPControlledDemo,
      "input-otp-controlled-demo",
      "Controlled",
      "Use `value` and `onChange` to control the input."
    ),
    demo(
      InputOTPInvalidDemo,
      "input-otp-invalid-demo",
      "Invalid",
      "Set `aria-invalid` on the `InputOTPSlot`s to show the error state."
    ),
    demo(
      InputOTPFourDigitsDemo,
      "input-otp-four-digits-demo",
      "Four Digits",
      "A common pattern for PIN codes: `maxLength={4}` with `pattern={REGEXP_ONLY_DIGITS}`."
    ),
    demo(
      InputOTPAlphanumericDemo,
      "input-otp-alphanumeric-demo",
      "Alphanumeric",
      "Use `REGEXP_ONLY_DIGITS_AND_CHARS` to accept both letters and numbers."
    ),
    demo(
      InputOTPFormDemo,
      "input-otp-form-demo",
      "Form",
      "A verification card that combines `InputOTP` with `Field`, `Card` and `Button`, using larger slots for the code."
    ),
  ],
  item: [demo(ItemDemo, "item-demo")],
  kbd: [demo(KbdDemo, "kbd-demo")],
  label: [
    demo(LabelDemo, "label-demo"),
    demo(
      LabelFieldDemo,
      "label-field-demo",
      "Label in Field",
      "For form fields, use `Field` with `FieldLabel`. It adds `FieldDescription` and `FieldError` and dims the label when the field has `data-disabled`."
    ),
  ],
  marker: [demo(MarkerDemo, "marker-demo")],
  menubar: [demo(MenubarDemo, "menubar-demo")],
  message: [demo(MessageDemo, "message-demo")],
  "message-scroller": [demo(MessageScrollerDemo, "message-scroller-demo")],
  "native-select": [
    demo(
      NativeSelectDemo,
      "native-select-demo",
      undefined,
      "Use `NativeSelect` when you want native browser behavior, better performance or the mobile OS picker. Use `Select` when you need custom styling, animations or complex interactions."
    ),
    demo(
      NativeSelectGroupsDemo,
      "native-select-groups-demo",
      "Groups",
      "Use `NativeSelectOptGroup` to organize options into categories."
    ),
    demo(
      NativeSelectDisabledDemo,
      "native-select-disabled-demo",
      "Disabled",
      "Add the `disabled` prop to `NativeSelect` to disable the select."
    ),
    demo(
      NativeSelectInvalidDemo,
      "native-select-invalid-demo",
      "Invalid",
      "Use `aria-invalid` to show validation errors. Inside a form, also add `data-invalid` to the wrapping `Field`."
    ),
  ],
  "navigation-menu": [demo(NavigationMenuDemo, "navigation-menu-demo")],
  pagination: [demo(PaginationDemo, "pagination-demo")],
  popover: [demo(PopoverDemo, "popover-demo")],
  progress: [demo(ProgressDemo, "progress-demo")],
  questionnaire: [demo(QuestionnaireDemo, "questionnaire-demo")],
  "radio-group-boxed": [
    demo(
      RadioGroupChoiceCardDemo,
      "radio-group-choice-card-demo",
      undefined,
      "Radio options rendered as selectable bordered cards: `RadioGroupItemBoxed` with `RadioGroupItemBoxedTitle` and an optional `RadioGroupItemBoxedDescription`, inside a `RadioGroup`. Its `id` prop is the item's value and `name` is the radio's element id. Also shown on the Radio Group page."
    ),
  ],
  "radio-group": [
    demo(RadioGroupDemo, "radio-group-demo"),
    demo(
      RadioGroupDescriptionDemo,
      "radio-group-description-demo",
      "Description",
      "Radio group items with a description, using `Field`, `FieldContent` and `FieldDescription`."
    ),
    demo(
      RadioGroupChoiceCardDemo,
      "radio-group-choice-card-demo",
      "Choice Card",
      "In Refer, choice cards use `RadioGroupItemBoxed`, with `RadioGroupItemBoxedTitle` and an optional `RadioGroupItemBoxedDescription`, inside a `RadioGroup`. Its `id` prop is the item's value and `name` is the radio's element id."
    ),
    demo(
      RadioGroupFieldsetDemo,
      "radio-group-fieldset-demo",
      "Fieldset",
      "Use `FieldSet` and `FieldLegend` to group radio items with a label and description."
    ),
    demo(
      RadioGroupDisabledDemo,
      "radio-group-disabled-demo",
      "Disabled",
      "Use the `disabled` prop on `RadioGroupItem` to disable individual items, and `data-disabled` on the `Field` to dim the label."
    ),
    demo(
      RadioGroupInvalidDemo,
      "radio-group-invalid-demo",
      "Invalid",
      "Use `aria-invalid` on `RadioGroupItem` and `data-invalid` on `Field` to show validation errors."
    ),
  ],
  "responsive-dialog": [demo(ResponsiveDialogDemo, "responsive-dialog-demo")],
  resizable: [demo(ResizableDemo, "resizable-demo")],
  "scroll-area": [demo(ScrollAreaDemo, "scroll-area-demo")],
  select: [
    demo(SelectDemo, "select-demo"),
    demo(
      SelectAlignItemDemo,
      "select-align-item-demo",
      "Align Item With Trigger",
      'Use the `position` prop on `SelectContent` to control alignment. With `position="item-aligned"` (the default), the popup places the selected item over the trigger; with `position="popper"`, it aligns to the trigger\'s edge.'
    ),
    demo(
      SelectGroupsDemo,
      "select-groups-demo",
      "Groups",
      "Use `SelectGroup`, `SelectLabel` and `SelectSeparator` to organize items."
    ),
    demo(
      SelectScrollableDemo,
      "select-scrollable-demo",
      "Scrollable",
      "A select with many items scrolls inside its own list, with scroll buttons at the edges."
    ),
    demo(
      SelectDisabledDemo,
      "select-disabled-demo",
      "Disabled",
      "Add `disabled` to `Select` to disable the whole control, or to a `SelectItem` to disable one option."
    ),
    demo(
      SelectInvalidDemo,
      "select-invalid-demo",
      "Invalid",
      "Add `data-invalid` to the `Field` and `aria-invalid` to the `SelectTrigger` to show an error state, with a `FieldError` for the message."
    ),
    demo(SelectExample, "select2-demo", "Variations"),
  ],
  separator: [demo(SeparatorDemo, "separator-demo")],
  sheet: [demo(SheetDemo, "sheet-demo")],
  skeleton: [demo(SkeletonDemo, "skeleton-demo")],
  slider: [demo(SliderDemo, "slider-demo")],
  sonner: [demo(SonnerDemo, "sonner-demo")],
  spinner: [demo(SpinnerDemo, "spinner-demo")],
  switch: [
    demo(SwitchDemo, "switch-demo"),
    demo(
      SwitchDescriptionDemo,
      "switch-description-demo",
      "Description",
      "Use a horizontal `Field` with `FieldContent` and `FieldDescription` to add helper text next to the switch."
    ),
    demo(
      SwitchChoiceCardDemo,
      "switch-choice-card-demo",
      "Choice Card",
      "A card-style setting with the same look as `RadioGroupItemBoxed` and `CheckboxBoxed`: a `Label` wraps the text and the `Switch`, so the whole card toggles it, and it turns `primary-subtle` with a `primary-border` when on. There is no boxed switch component; copy the classes from the code."
    ),
    demo(
      SwitchDisabledDemo,
      "switch-disabled-demo",
      "Disabled",
      "Add the `disabled` prop to the `Switch` to disable it, and `data-disabled` to the `Field` to dim its label."
    ),
    demo(
      SwitchInvalidDemo,
      "switch-invalid-demo",
      "Invalid",
      "Add `data-invalid` to the `Field` to turn its label destructive, and `aria-invalid` to the `Switch` for assistive tech. Refer's `Switch` has no invalid styling of its own yet."
    ),
    demo(
      SwitchSizesDemo,
      "switch-sizes-demo",
      "Size",
      'Use the `size` prop (`"default"` or `"sm"`) to change the size of the switch.'
    ),
  ],
  table: [demo(TableDemo, "table-demo")],
  tabs: [demo(TabsDemo, "tabs-demo")],
  textarea: [
    demo(TextareaDemo, "textarea-demo"),
    demo(
      TextareaFieldDemo,
      "textarea-field-demo",
      "Field",
      "Use `Field`, `FieldLabel` and `FieldDescription` to give a textarea a label and a description."
    ),
    demo(
      TextareaDisabledDemo,
      "textarea-disabled-demo",
      "Disabled",
      "Use the `disabled` prop to disable the textarea. Add `data-disabled` to the `Field` to dim its label as well."
    ),
    demo(
      TextareaInvalidDemo,
      "textarea-invalid-demo",
      "Invalid",
      "Use `aria-invalid` to mark the textarea as invalid. Add `data-invalid` to the `Field` to turn the label and description destructive too."
    ),
    demo(
      TextareaButtonDemo,
      "textarea-button-demo",
      "Button",
      "Pair a `Textarea` with a `Button` to make a message box with a submit button."
    ),
  ],
  toast: [demo(ToastDemo, "toast-demo")],
  toggle: [demo(ToggleDemo, "toggle-demo")],
  "toggle-group": [demo(ToggleGroupDemo, "toggle-group-demo")],
  tooltip: [demo(TooltipDemo, "tooltip-demo")],
  "ui-labels": [
    demo(
      UILabelsDemo,
      "ui-labels-demo",
      undefined,
      "Wrap the app once in UILabelsProvider with translated strings; the DS imports no i18n library. Without it, everything stays in English, and keys you leave out fall back to English. A component prop such as closeLabel on DialogContent or SheetContent wins over the provider."
    ),
  ],
  trace: [demo(TraceDemo, "trace-demo")],
  typography: [demo(TypographyDemo, "typography-demo")],
  shadows: [demo(ShadowDemo, "shadow-demo")],
  colors: [demo(ColorsDemo, "colors-demo")],
}
