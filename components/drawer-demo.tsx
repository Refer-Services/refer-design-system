"use client"

import * as React from "react"
import { toast } from "sonner"

import { useIsMobile } from "@/registry/refer/hooks/use-mobile"
import { Badge } from "@/registry/refer/ui/badge"
import { Button } from "@/registry/refer/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/refer/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/refer/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/refer/ui/radio-group"

const referrers = [
  {
    value: "marina",
    id: "referrer-marina",
    name: "Marina Costa",
    description: "Engineering Manager · Worked with you at Nubank",
    badge: "Best match",
  },
  {
    value: "leo",
    id: "referrer-leo",
    name: "Leo Martins",
    description: "Staff Engineer · On the team that's hiring",
  },
  {
    value: "ana",
    id: "referrer-ana",
    name: "Ana Ribeiro",
    description: "Recruiter · Usually replies within a day",
  },
  {
    value: "pedro",
    id: "referrer-pedro",
    name: "Pedro Alves",
    description: "Product Designer · Second-degree connection",
  },
  {
    value: "julia",
    id: "referrer-julia",
    name: "Julia Souza",
    description: "Senior Engineer · Joined last month",
  },
]

// A bottom sheet on mobile, a side panel from md up.
export function DrawerDemo() {
  const [open, setOpen] = React.useState(false)
  const [referrer, setReferrer] = React.useState("marina")
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = referrers.find((person) => person.value === referrer)

    if (!selected) {
      return
    }

    setOpen(false)
    toast("Referral request sent", {
      description: `${selected.name} will get your profile and note.`,
    })
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Ask for a referral
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick who refers you</DrawerTitle>
          <DrawerDescription>
            We&apos;ll send your request to one person at Acme.
          </DrawerDescription>
        </DrawerHeader>
        <div className="scroll-fade flex-1 overflow-y-auto p-4">
          <RadioGroup
            value={referrer}
            onValueChange={setReferrer}
            className="gap-2"
          >
            {referrers.map((person) => (
              <FieldLabel key={person.value} htmlFor={person.id}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>
                      {person.name}
                      {person.badge ? (
                        <Badge variant="primary_subtle">{person.badge}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription>{person.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={person.value} id={person.id} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm}>Send request</Button>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
