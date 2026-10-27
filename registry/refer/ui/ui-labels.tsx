"use client"

import * as React from "react"

/**
 * Text the components render on their own: screen-reader names and default button text. English by default; wrap
 * the app in UILabelsProvider with translated strings (from any i18n library) to change them. A component's own
 * prop, such as `closeLabel` on DialogContent, wins over the provider.
 */
type UILabels = {
  /** Dialog and Sheet close button (screen readers), DialogFooter's `showCloseButton` button. */
  close: string
  /** DialogContentWithNavigation arrow, Pagination and Questionnaire buttons. */
  previous: string
  /** DialogContentWithNavigation arrow, Pagination and Questionnaire buttons. */
  next: string
  /** Questionnaire skip button. */
  skip: string
  /** Questionnaire submit button. */
  submit: string
  /** Drawer's hidden title when no `title` is given. */
  dialog: string
  /** Breadcrumb navigation name. */
  breadcrumb: string
  /** BreadcrumbEllipsis (screen readers). */
  more: string
  /** Pagination navigation name. */
  pagination: string
  /** PaginationPrevious name. */
  previousPage: string
  /** PaginationNext name. */
  nextPage: string
  /** PaginationEllipsis (screen readers). */
  morePages: string
  /** CarouselPrevious (screen readers). */
  previousSlide: string
  /** CarouselNext (screen readers). */
  nextSlide: string
  /** SidebarTrigger and SidebarRail. */
  toggleSidebar: string
  /** Mobile sidebar's hidden title. */
  sidebar: string
  /** Mobile sidebar's hidden description. */
  sidebarDescription: string
  /** CommandDialog's hidden title when no `title` is given. */
  commandPalette: string
  /** CommandDialog's hidden description when no `description` is given. */
  commandPaletteDescription: string
  /** Spinner. */
  loading: string
  /** CodeBlockCopyButton. */
  copy: string
  /** CodeBlockCopyButton after copying. */
  copied: string
  /** MessageScrollerButton, direction "end" (screen readers). */
  scrollToEnd: string
  /** MessageScrollerButton, direction "start" (screen readers). */
  scrollToStart: string
  /** ToastClose. */
  closeToast: string
}

const defaultUILabels: UILabels = {
  close: "Close",
  previous: "Previous",
  next: "Next",
  skip: "Skip",
  submit: "Submit",
  dialog: "Dialog",
  breadcrumb: "breadcrumb",
  more: "More",
  pagination: "pagination",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  morePages: "More pages",
  previousSlide: "Previous slide",
  nextSlide: "Next slide",
  toggleSidebar: "Toggle Sidebar",
  sidebar: "Sidebar",
  sidebarDescription: "Displays the mobile sidebar.",
  commandPalette: "Command Palette",
  commandPaletteDescription: "Search for a command to run...",
  loading: "Loading",
  copy: "Copy",
  copied: "Copied",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  closeToast: "Close toast",
}

const UILabelsContext = React.createContext<UILabels>(defaultUILabels)

// Missing keys fall back to the enclosing provider, then to English, so an app can translate only some of them.
function UILabelsProvider({
  labels,
  children,
}: {
  labels: Partial<UILabels>
  children: React.ReactNode
}) {
  const parent = React.useContext(UILabelsContext)
  const value = React.useMemo(() => {
    const merged = { ...parent }
    for (const [key, text] of Object.entries(labels)) {
      if (text !== undefined) merged[key as keyof UILabels] = text
    }
    return merged
  }, [parent, labels])

  return (
    <UILabelsContext.Provider value={value}>
      {children}
    </UILabelsContext.Provider>
  )
}

function useUILabels() {
  return React.useContext(UILabelsContext)
}

export { UILabelsProvider, useUILabels, defaultUILabels, type UILabels }
