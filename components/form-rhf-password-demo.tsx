"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon } from "lucide-react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/refer/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/refer/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/refer/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/refer/ui/input-group"
import { Progress } from "@/registry/refer/ui/progress"

const passwordRequirements = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (val: string) => val.length >= 8,
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
  { id: "number", label: "One number", test: (val: string) => /\d/.test(val) },
  {
    id: "special",
    label: "One special character",
    test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  },
]

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (val) => /\d/.test(val),
      "Password must contain at least one number"
    )
    .refine(
      (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
      "Password must contain at least one special character"
    ),
})

export function FormRhfPasswordDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  const password = useWatch({
    control: form.control,
    name: "password",
  })

  // Calculate password strength.
  const metRequirements = passwordRequirements.filter((req) =>
    req.test(password || "")
  )
  const strengthPercentage =
    (metRequirements.length / passwordRequirements.length) * 100
  const allRequirementsMet =
    metRequirements.length === passwordRequirements.length

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
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Create Password</CardTitle>
        <CardDescription>
          Choose a strong password to secure your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-password" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-password-input">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-rhf-password-input"
                      type="password"
                      placeholder="Enter your password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                    <InputGroupAddon align="inline-end">
                      <CheckIcon
                        className={
                          allRequirementsMet
                            ? "text-positive"
                            : "text-muted-foreground"
                        }
                      />
                    </InputGroupAddon>
                  </InputGroup>

                  {/* Password strength meter: amber until every requirement is met. */}
                  <div className="flex flex-col gap-2">
                    <Progress
                      value={strengthPercentage}
                      aria-label="Password strength"
                      className={cn(
                        allRequirementsMet
                          ? "*:data-[slot=progress-indicator]:bg-positive"
                          : "*:data-[slot=progress-indicator]:bg-destructive"
                      )}
                    />

                    {/* Requirements list. */}
                    <div className="flex flex-col gap-1.5">
                      {passwordRequirements.map((requirement) => {
                        const isMet = requirement.test(password || "")
                        return (
                          <div
                            key={requirement.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckIcon
                              className={
                                isMet
                                  ? "text-positive"
                                  : "text-muted-foreground"
                              }
                            />
                            <span
                              className={
                                isMet
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              {requirement.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

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
          <Button type="submit" form="form-rhf-password">
            Create Password
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
