"use client"

import * as React from "react"

import { Button } from "@/registry/refer/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/refer/ui/dialog"
import { Label } from "@/registry/refer/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/refer/ui/pagination"
import { Spinner } from "@/registry/refer/ui/spinner"
import { Switch } from "@/registry/refer/ui/switch"
import { UILabelsProvider, type UILabels } from "@/registry/refer/ui/ui-labels"

// In an app, these come from its i18n catalog (next-intl's t("close")...); the DS imports no i18n library.
const ptBR = {
  close: "Fechar",
  previous: "Anterior",
  next: "Próximo",
  pagination: "paginação",
  previousPage: "Ir para a página anterior",
  nextPage: "Ir para a próxima página",
  morePages: "Mais páginas",
  loading: "Carregando",
} satisfies Partial<UILabels>

export function UILabelsDemo() {
  const [translated, setTranslated] = React.useState(true)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch
          id="ui-labels-translated"
          checked={translated}
          onCheckedChange={setTranslated}
        />
        <Label htmlFor="ui-labels-translated">Português</Label>
      </div>
      <UILabelsProvider labels={translated ? ptBR : {}}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Move to interview</DialogTitle>
                <DialogDescription>
                  The X button&apos;s name and the button below come from the
                  provider.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
          <Spinner />
        </div>
      </UILabelsProvider>
    </div>
  )
}
