# DS backlog

Proposals to change the registry, raised while reviewing product screens. Each one is a local
override or reimplementation that keeps coming back in the apps, or a gap the apps had to work
around. Nothing here is decided: pick one up, settle it, ship it in `registry/refer/**`, then
remove the local overrides it replaces in the apps.

Evidence paths are in `olympus-backend/apps/portal-frontend/` unless noted.

## From the candidate-experience review (2026-10-28)

Review of the portal's candidate profile, Career, public profile, job modal and Hire Lia flow.

### Behavior

- **`DialogContentWithNavigation`: arrow keys ignore editable fields and events from outside the
  content.** The handler listens on `document` and moves to the previous/next item wherever focus
  is. A dialog opened over the modal (the Tracker's Edit dialog) moves the job behind it when the
  caret moves in an input. The portal patches each case with `stopArrowKeys` on a wrapper
  (`components/shared/candidate/dialogs/job-details/utils/stopArrowKeys.ts`). Fix in the DS: skip
  when `event.defaultPrevented`, when the target is editable (`input, textarea,
  [contenteditable], [role=listbox], [role=radiogroup]`) or outside the content; the portal can
  then drop `stopArrowKeys`.
- **Reduced motion across the registry.** Only `trace.tsx` and the `shimmer` utility
  (`styles/refer-utils.css`) honor `prefers-reduced-motion`. Everything else moves regardless:
  the open/close zoom and slide of `Dialog`, `Sheet`, `Drawer`, `Popover`, `HoverCard`,
  `Tooltip`, `DropdownMenu`, `Select`, `Combobox`, `Menubar`, `NavigationMenu` and `ContextMenu`,
  `Accordion`'s height, `Switch`'s thumb and `Button`'s `active:scale-pressed`. The portal
  patches its own motion one class at a time (`motion-reduce:transition-none` on the Career
  rows' chevron, `components/profile/career/CareerRows.tsx`, and on the Sources card's,
  `CareerSources.tsx`). Fix in the DS: under reduced motion, keep opacity cross-fades and drop
  translate, scale, height and rotate (`motion-reduce:` on each component, or one
  `@media (prefers-reduced-motion: reduce)` block in `globals.css` for the `animate-in` /
  `animate-out` utilities), so most surfaces get it from the DS and the apps only cover their
  own motion. Raised by the public profile's interface review (2026-11-04).
- **The tap flash on touch screens.** iOS Safari and Android Chrome paint a translucent gray/blue
  highlight over every tapped element with a click handler, on top of the components' own pressed
  states; it's the loudest "this is a website" tell on a phone. `globals.css` doesn't set
  `-webkit-tap-highlight-color`, so every app inherits it. The portal turns it off one control at a
  time (the mobile tab bar, `components/shell/BottomTabBar.tsx`). Fix in the DS: `html {
  -webkit-tap-highlight-color: transparent; }` in `globals.css`, then check that every interactive
  component has its own `:active` state, since the flash was the only press feedback some of them
  had. The apps can then drop their local overrides. Raised by the portal's mobile navigation review
  (2026-11-06).
- **`Input`, `Textarea`, `ComboboxInput`, `ComboboxChipsInput`: `text-base md:text-sm`.** At
  `text-sm` (14px) iOS Safari zooms the page on focus; every candidate form is used on phones.
  (Emil's typography rule; the DS default is the one to change.) Seen again in the Career's
  role dialog (`components/profile/career/CareerElementDialog.tsx`, its Tags in `TagsInput.tsx`),
  a drawer on phones, by its forms review (2026-11-04).

### Scale and tokens

- **A 13px text step.** `text-[13px]` appears ~61 times in the portal, including the company-side
  candidate dialog (`components/positions/details/pipeline/candidate-dialog/PipelineCandidateDialog.tsx`)
  and the job modal (`CompanyOpenJobs.tsx`, `CompanyRequests.tsx`, `RequirementsStep.tsx`).
  Either add a named step (caption) or decide it's `text-xs`/`text-sm` and sweep.
- **`text-md` is used but not defined.** ~63 uses in the portal do nothing (Tailwind v4 has no
  `text-md`, `globals.css` defines no `--text-md`). Define it or sweep it out.
- **A display title step for public pages.** The public profile header used `text-[28px]
  font-bold`; settle the size/weight/tracking for page titles on public pages.

### Component variants

- **Card radius 20px, and a `Card` radius that `className` can override.** `rounded-[20px]!` in
  four files of the job modal (`JobProfileBox.tsx`, `JobActionSlot.tsx`, `CompanyJobCard.tsx`,
  `CompanyRequests.tsx`); the company dialog sets `[--radius-card:20px]`. The candidate's Public
  profile tab wants it too (2026-11-03): cards at 20px so their 8px padding is concentric with
  12px rows (`rounded-xl`), in `components/profile/career/CareerSection.tsx` (`CareerCard`),
  `CareerLinks.tsx`, `CareerImprove.tsx`, `CareerTab.tsx` (skeleton) and `CareerSources.tsx`.
  The plain `div` cards take `rounded-[20px]`; the one built on `Card` needs `rounded-[20px]!`,
  because tailwind-merge doesn't know `rounded-card` is a radius class, keeps both, and the token
  wins (the job board's card has the same `!`: `components/jobs/job-board/JobBoard.tsx`). Fix in
  the DS: (a) register the custom radius tokens (`card`, `input`) with tailwind-merge's
  `extendTailwindMerge` in `lib/utils`, so any `rounded-*` passed to `Card` replaces the default;
  (b) settle 20px as a step (a `Card` size/variant or `--radius-card` scoped per surface). Then
  drop the `!`s and the arbitrary 20px in the apps.
- **`Dialog` sizes.** (a) A form dialog: fixed height, scrolling body, sticky footer
  (`components/profile/career/CareerDialog.tsx`). (b) A large dialog with navigation, sized so the
  outside arrows always fit (job modal `JobDetailsShell.tsx` and the company candidate dialog
  `PipelineCandidateDialog.tsx` each carry their own formula).
- **`RadioGroupItemBoxed` / `CheckboxBoxed` `size="sm"`.** The compact `BOX_OPTION_CLASS` override
  is in 7 files (`apply`, `what-you-want/*`, `hire-lia`).
- **`ToggleGroup` segmented variant.** Hand-made segmented controls in the Career item editor
  (`CareerElementDialog.tsx`).
- **`TagInput`** (chips + input + suggestions): `components/profile/career/TagsInput.tsx` and
  `CareerLinks.tsx`, each with its own hardcoded focus ring.
- **Month + year picker.** `Calendar` doesn't cover it; `components/profile/career/MonthYearPicker.tsx`
  is a candidate to upstream.
- **`Button` dashed ("add") variant.** Used in three places in Career (`CareerTab.tsx`,
  `media/MediaTile.tsx`, `media/MediaEditor.tsx`).
- **Removable chip.** Identical `Button variant="subtle"` + `!pl-3` chip in
  `components/hire-lia/signup/FiltersStep.tsx` and `what-you-want/sections/WillingToRelocateField.tsx`.
- **"Optional" slot on `Label`/`Field`.** `(optional)` inside the flex `Label` breaks into columns
  on mobile (`hire-lia/signup/YouStep.tsx`; worked around with `leading-normal` elsewhere).
- **`Tabs size="sm"`.** Compact tabs override in `components/shared/candidate/experience/MinimumPayField.tsx`.
- **`Progress` rounded indicator.** The indicator end is square; Hire Lia rounds it locally.
- **`Avatar` ring over the image.** `shadow-avatar`'s inset ring is painted under the image; the
  portal overlays it (`components/ui/local/avatar-ring.ts`, refer-design rule "An avatar's ring
  shows over its image", trial).
- **`Badge` compact.** `rounded-[8px] px-1.5 py-1` (+ `has-[>svg]:pl-1.5`) on the Boosted and
  Editor/Viewer badges (`YourJobsItem.tsx`), noted 2026-10-20.

### Open questions

- **Foreground tone.** The public profile set `--foreground` to `stone-900` locally for reading;
  if that tone reads better, change the token for everyone instead.
- **Escape on blocking dialogs.** Product rule BR-020 keeps some dialogs open on Escape and
  outside click; the DS could offer this as a prop (`ResponsiveDialog dismissible={false}` does
  it for one component) and make sure focus still moves into the dialog on open.
