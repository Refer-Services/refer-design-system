"use client"

import { Button } from "@/registry/refer/ui/button"
import { Toaster, toast } from "@/registry/refer/ui/toast"

export function ToastDemo() {
  return (
    <Toaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Referral sent",
            description: "We'll let you know when Ana is contacted.",
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  )
}
