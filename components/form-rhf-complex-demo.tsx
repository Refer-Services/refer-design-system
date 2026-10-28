"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/registry/refer/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/refer/ui/card"
import { Checkbox } from "@/registry/refer/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/refer/ui/field"
import { RadioGroup } from "@/registry/refer/ui/radio-group"
import {
  RadioGroupItemBoxed,
  RadioGroupItemBoxedDescription,
  RadioGroupItemBoxedTitle,
} from "@/registry/refer/ui/radio-group-boxed"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/refer/ui/select"
import { Switch } from "@/registry/refer/ui/switch"

const addons = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced analytics and reporting",
  },
  {
    id: "backup",
    title: "Backup",
    description: "Automated daily backups",
  },
  {
    id: "support",
    title: "Priority Support",
    description: "24/7 premium customer support",
  },
] as const

const formSchema = z.object({
  plan: z
    .string({
      required_error: "Please select a subscription plan",
    })
    .min(1, "Please select a subscription plan")
    .refine((value) => value === "basic" || value === "pro", {
      message: "Invalid plan selection. Please choose Basic or Pro",
    }),
  billingPeriod: z
    .string({
      required_error: "Please select a billing period",
    })
    .min(1, "Please select a billing period"),
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      {
        message: "You selected an invalid add-on",
      }
    ),
  emailNotifications: z.boolean(),
})

export function FormRhfComplexDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "basic",
      billingPeriod: "",
      addons: [],
      emailNotifications: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-muted mt-2 w-[320px] max-w-full rounded-lg p-3 text-xs break-all whitespace-pre-wrap">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>You&apos;re almost there!</CardTitle>
        <CardDescription>
          Choose your subscription plan and billing period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-complex" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="plan"
              control={form.control}
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid
                return (
                  <FieldSet data-invalid={isInvalid}>
                    <FieldLegend variant="label">Subscription Plan</FieldLegend>
                    <FieldDescription>
                      Choose your subscription plan.
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={isInvalid}
                    >
                      <RadioGroupItemBoxed
                        id="basic"
                        name="form-rhf-complex-basic"
                      >
                        <RadioGroupItemBoxedTitle>
                          Basic
                        </RadioGroupItemBoxedTitle>
                        <RadioGroupItemBoxedDescription>
                          For individuals and small teams
                        </RadioGroupItemBoxedDescription>
                      </RadioGroupItemBoxed>
                      <RadioGroupItemBoxed id="pro" name="form-rhf-complex-pro">
                        <RadioGroupItemBoxedTitle>Pro</RadioGroupItemBoxedTitle>
                        <RadioGroupItemBoxedDescription>
                          For businesses with higher demands
                        </RadioGroupItemBoxedDescription>
                      </RadioGroupItemBoxed>
                    </RadioGroup>
                    {isInvalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <Controller
              name="billingPeriod"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                    Billing Period
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-complex-billingPeriod"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Choose how often you want to be billed.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldSeparator />
            <Controller
              name="addons"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend>Add-ons</FieldLegend>
                  <FieldDescription>
                    Select additional features you&apos;d like to include.
                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    {addons.map((addon) => (
                      <Field
                        key={addon.id}
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id={`form-rhf-complex-${addon.id}`}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          checked={field.value?.includes(addon.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value ?? []), addon.id]
                              : (field.value ?? []).filter(
                                  (value) => value !== addon.id
                                )
                            field.onChange(newValue)
                            field.onBlur()
                          }}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor={`form-rhf-complex-${addon.id}`}>
                            {addon.title}
                          </FieldLabel>
                          <FieldDescription>
                            {addon.description}
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    ))}
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <FieldSeparator />
            <Controller
              name="emailNotifications"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-complex-emailNotifications">
                      Email Notifications
                    </FieldLabel>
                    <FieldDescription>
                      Receive email updates about your subscription
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="form-rhf-complex-emailNotifications"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field>
          <Button type="submit" form="form-rhf-complex">
            Save Preferences
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
