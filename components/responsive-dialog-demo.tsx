"use client"

import * as React from "react"

import { Button } from "@/registry/refer/ui/button"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/registry/refer/ui/dialog"
import { Label } from "@/registry/refer/ui/label"
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTitle,
} from "@/registry/refer/ui/responsive-dialog"
import { Switch } from "@/registry/refer/ui/switch"
import { Textarea } from "@/registry/refer/ui/textarea"

// A Dialog from md (768px) up, a bottom Drawer below. The Dialog parts (description, footer, close) work in both.
export function ResponsiveDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const [dismissible, setDismissible] = React.useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id="responsive-dialog-dismissible"
          checked={dismissible}
          onCheckedChange={setDismissible}
        />
        <Label htmlFor="responsive-dialog-dismissible">Dismissible</Label>
      </div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Apply via Refer
      </Button>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        dismissible={dismissible}
      >
        <ResponsiveDialogContent title="Apply via Refer" className="gap-5">
          <DialogHeader>
            <ResponsiveDialogTitle>Apply via Refer</ResponsiveDialogTitle>
            <DialogDescription>
              Marina will get your note with the referral request.
            </DialogDescription>
          </DialogHeader>
          <Textarea placeholder="Add a note (optional)" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => setOpen(false)}>Send request</Button>
          </DialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  )
}
