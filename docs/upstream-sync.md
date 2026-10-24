# Upstream sync: shadcn → Refer DS

Read this before bringing anything from shadcn into `registry/refer/**`, and update it when you finish. It records
where we are relative to upstream, what Refer changed on purpose, what the apps depend on, and what we skipped and why.
The general registry and sync rules live in `CLAUDE.md`; this file is the history and the per-component ledger.

## Where we are

- **Fork:** shadcn `new-york-v4` (Radix), imported 2025-05-20 at upstream commit `2773f9e2`.
- **Last triage:** against upstream `main` at `ba1503c6` (2026-10-19, CLI 4.22.1). Every component was compared; the
  results are in the ledger below.
- **`registry/refer/styles/refer-utils.css`:** byte-identical to `dist/tailwind.css` of `shadcn@4.22.1` from
  `/* scroll-fade */` to the end. We leave out upstream's first 95 lines (accordion keyframes, `data-*` custom variants,
  `no-scrollbar`). We don't define `no-scrollbar` either: use Tailwind 4.3's native `scrollbar-none` /
  `scrollbar-thin` (see [Infra decisions](#infra-decisions)).

### Waves

Upstream changes go in by risk, one wave per PR → deploy → app sync, so each app's diff stays small and a regression
points at one wave. A wave is done when the apps are synced, not when the PR merges.

| Wave | Content | DS | Apps synced |
|---|---|---|---|
| 1 | Bug fixes, no API changes | Merged (PR #7, `95081ac`) | portal 2026-10-22 (the 13 wave components and the `refer-utils.css` comment; `globals.css`, `package.json` and lockfile untouched; all 52 components identical again). argus, landing, partners: not synced |
| 2 | Additive APIs (see ledger), publish `button-group`, `field`, `item`, `kbd`, `native-select`, `spinner` (with demos), delete `refer-menu-item`, bump `@base-ui/react` and `date-fns` in the DS | Merged (PR #8) | portal 2026-10-22 (portal commit `6324f9349`, together with wave 1: the wave components changed, `package.json` and lockfile untouched; all 52 components identical to the DS). argus, landing, partners: not synced |
| 3 | All new upstream components, with docs demos (see [Components added from upstream in wave 3](#components-added-from-upstream-in-wave-3)) | Merged (PR #9) | portal 2026-10-22: only `combobox` changed (native scrollbar utilities); `@utility no-scrollbar` deleted by hand from `globals.css` (the CLI doesn't delete rules); `package.json` and lockfile untouched. No app installs a wave 3 component yet. argus, landing, partners: not synced |
| 4 | Design decisions that change app visuals. First pass (Refer look for wave 3 components and the remaining stock ones, see [Wave 4 visual pass](#wave-4-visual-pass)) | PR `feat/shadcn-wave-4`; the rest of W4 in the ledger is still pending | — |
| 5 | Breaking migrations, one at a time, coordinated with apps | Pending | — |
| 6 | A Refer `llms.txt` + one `.md` per component on ds.tryrefer.com | Pending | — |

## How to run a sync

1. **Get the upstream delta, not our diff.** Our files are heavily customized, so diffing them against upstream is
   mostly noise. Diff upstream against itself since the last triage, then decide per change:
   ```bash
   git clone --filter=blob:none --no-checkout https://github.com/shadcn-ui/ui.git shadcn
   git -C shadcn diff ba1503c6 main -- apps/v4/registry/new-york-v4/ui/<name>.tsx
   git -C shadcn show main:apps/v4/registry/new-york-v4/ui/<name>.tsx
   ```
   Components added to Refer after the fork (button-group, combobox, empty, field, input-group, item, kbd,
   native-select, spinner) came from later upstream versions; for those, compare our file with upstream `main`.
2. **Ignore the noise:** Tailwind class reordering, `import { cn } from "cn"`, `@radix-ui/react-x` → `radix-ui`,
   `Slot` → `Slot.Root`, `!m-0` → `m-0!`.
3. **Merge, never replace.** Port each upstream change into our file and keep everything in the ledger's "Refer keeps"
   column. When porting upstream code: `from "cn"` → `from "@/lib/utils"`, `radix-ui` → the `@radix-ui/react-*`
   package, `@/registry/new-york-v4/...` → `@/registry/refer/...`, upstream variant names → ours (`default` →
   `primary`, size `default` → `md`).
4. **Never rename a `data-slot` an app targets** (see [What the apps depend on](#what-the-apps-depend-on)). Adding a
   missing slot is fine.
5. **Verify:**
   - `npm run registry:build` and `npm run typecheck`.
   - Install into a throwaway copy of portal-frontend (its `components.json`, `tsconfig.json`, `app/globals.css`,
     `app/refer-utils.css`, `components/ui` without `local/`, `lib/utils.ts`, `hooks/use-mobile.ts`, and a
     `package.json` with only `next`, `react`, `react-dom`, `date-fns`). Build with
     `NEXT_PUBLIC_BASE_URL=http://127.0.0.1:4790`, serve `public/` with `python3 -m http.server 4790`, add
     `"registries": {"@refer": "http://127.0.0.1:4790/r/refer/{name}.json"}` to the copy, and run
     `npm_config_legacy_peer_deps=true npx shadcn@latest add @refer/globals @refer/<each component> --overwrite --yes`.
     Only the components in the wave may change; `globals.css` values must stay the same. (`legacy-peer-deps` is
     needed because the trimmed `package.json` lets npm pick the newest versions of everything, which then conflict on
     peer dependencies; the real apps use `^` ranges with a lockfile.)
   - Look at the changed components in the browser (`npm run dev`), in light and dark mode.
   - Rebuild without `NEXT_PUBLIC_BASE_URL` before committing, so no `127.0.0.1` URL is left in `public/r/refer`.
6. **After the deploy, sync each app for real** and check its `package.json` and lockfile diff: no major version may
   change. The throwaway copy doesn't catch this (the calendar's pinned `date-fns@3.6.0` reverting portal to
   date-fns 3 only showed up in the real portal sync). Never run `shadcn init` in an existing app: it regenerates
   `globals.css` and drops local imports such as portal's `./styles/index.css`.
7. **Update this file:** the triage commit, the ledger rows you touched, and the waves table (including which apps
   were synced).

## What the apps depend on

State on 2026-10-22.

- **portal-frontend:** paired with the DS (a sync of `globals`, `refer-utils` and all 52 components changes nothing).
  Portal-only primitives live in `components/ui/local/`. It targets these DS `data-slot`s in selectors, so they must
  keep their names: `avatar`, `avatar-fallback`, `avatar-image`, `button`, `card`, `card-content`,
  `combobox-content`, `combobox-group`, `combobox-inline-content`, `combobox-separator`, `dialog-content`,
  `dialog-description`, `dialog-overlay`, `dropdown-menu-content`, `input-group-control`, `popover-content`,
  `progress-indicator`, `scroll-area-viewport`, `separator-root`, `skeleton`. `TooltipProvider` is used in 1 file.
- **argus-frontend:** not paired. Its button, input, separator, sheet, skeleton, tooltip and sidebar are older stock
  shadcn (e.g. `rounded-md` buttons) with local edits, and it's the only app that imports `sidebar`. Syncing `sidebar`
  there overwrites 7 files and changes the app's look, so pair argus first, the way portal was paired.
  `TooltipProvider` is used in 5 files.
- **landing-frontend, partners-frontend:** not compared yet. Both have an unused `components/ui/sidebar.tsx`.
- **`date-fns`:** portal is on 4.4; argus, landing and partners are on 3.6. `@base-ui/react` (used by `combobox`) has
  an optional peer `date-fns ^4`, so syncing `combobox` into those three gives `ERESOLVE`: upgrade them to date-fns 4
  first, or sync with `npm_config_legacy_peer_deps=true`. Portal syncs without the flag.
- **`@base-ui/react`:** portal declares `^1.5.0` and runs 1.7.0 in production (combobox portal inside modals
  included). The `combobox` item doesn't pin a version, so a fresh install gets the latest.
- **Tailwind 4.3:** wave 3's components use utilities that only exist natively in Tailwind ≥ 4.3 (`scrollbar-none`,
  `scrollbar-thin`, `scrollbar-gutter-stable`, `inset-s-*`). Without them, attachment groups, code-block and
  message-scroller show the browser's scrollbar and some positioning is off. The DS moved to `tailwindcss@^4.3.3` in
  wave 3 (a compiled-CSS diff against 4.1.17 showed no visible change to existing classes: only equivalent
  rewrites such as `calc(var(--spacing) * 0)` → `0`, logical → physical properties with RTL fallbacks, and the new
  utilities). The monorepo moved to 4.3.3 on 2026-10-22 (portal's `package.json` requires `^4.3.3`; the other 6 Tailwind apps
  resolve to the same shared install). The same compiled-CSS diff on all 7 apps showed no visible change: besides the
  equivalent rewrites, only `.start`/`.end` stopped generating (they came from `align="start"` props, not classes)
  and preflight's fallback font stack changed (every app sets `--default-font-family`, so it's never used).
- **No app imports** `calendar` or `resizable`. Apps have `react-resizable-panels` 3.x installed.
- **Open issue: unversioned item dependencies install the latest major in an app that doesn't have them yet.** A
  fresh install (seen in the throwaway copy, 2026-10-22) got `react-day-picker` 10, `recharts` 3,
  `react-resizable-panels` 4 and `lucide-react` 1.x, while our calendar, chart and resizable are written for older
  majors. Existing apps aren't affected (the CLI skips dependencies already installed). Fix by giving those items a
  major range (`react-day-picker@^9`, `recharts@^2`, …) or by migrating the components (wave 5).

## Component ledger

"Refer keeps" is what a sync must preserve. "Skipped" is upstream change we chose not to take; don't re-propose it
without a new reason. "Pending" is upstream change still to bring in, with its wave.

| Component | Refer keeps | Skipped (why) | Pending |
|---|---|---|---|
| accordion, aspect-ratio, breadcrumb, carousel, collapsible, form, hover-card, input-otp, label, menubar, navigation-menu, progress, radio-group, scroll-area, skeleton, textarea, toggle | Refer styling; breadcrumb uses Next `Link`; textarea `placeholder:text-muted-foreground/60` | — | Nothing upstream to take |
| alert | Refer styling | — | — |
| alert-dialog | `rounded-2xl shadow-xl` content | Upstream `rounded-lg shadow-lg` | Done in W2: `size` (`sm`) on content, actions as `<Button asChild>` with `variant`/`size` (defaults `primary`/`outline`, `md`), `data-slot`s on actions. Refer difference from upstream: the actions pass `className` to `Button` (tailwind-merge), not to the Slot child, which only concatenates; so an app's `className="bg-destructive"` still wins over `bg-primary`. Prefer `variant="destructive"` in apps. W4: `AlertDialogMedia` (needs Refer styling) |
| avatar | `size-10` default; `overflow-hidden` on root (crops square logos passed via `className`) | — | Done in W2: `select-none`, `AvatarGroup`, `AvatarGroupCount`. W4: upstream's muted fallback text (`text-muted-foreground`) changes initials to gray in 6 portal and 7 argus fallbacks that don't set a color; `size` prop on a Refer scale and `AvatarBadge` (needs design: the root's `overflow-hidden` would clip a corner badge) |
| badge | Per-variant borders, semantic variant set, no `cursor-default` | Border moved to base; `ghost`/`link` variants (no use case yet) | Done in W2: default `variant="primary"`, `data-variant` |
| button | `rounded-full`, 3D look (`shadow-xs` + `border-b-[2px]`), variants `primary`, `primary_subtle`, `primary_ghost`, `destructive`, `outline`, `secondary`, `ghost`, `subtle`, `link`; sizes `xs`–`lg` (h-8…h-11), `icon` (size-10) | Shadows removed upstream; upstream `xs` (h-6) | Done in W2: `icon-xs`/`icon-sm`/`icon-lg` (8/9/11), default params, `data-variant`/`data-size` |
| calendar | Pill-shaped selection and range ends, `rounded-input` dropdowns, primary focus ring | — | Done in W1 (v9 rewrite) |
| card | `squircle`, header `gap-1.5` | Header `gap-2` (spacing tweak) | — |
| chart | — | — | Done in W1 (zero values, `type: "none"`, index keys). W5: Recharts v3 (`initialDimension`, new tooltip/legend types; 82 files import recharts) |
| checkbox | `indeterminate` prop, custom SVGs with `currentColor` stroke, focus from the global outline | Upstream focus ring classes (covered globally) | Done in W1 (grid indicator) |
| combobox (Base UI) | Portal into the enclosing `[data-slot=dialog-content\|drawer-content]` (wheel scroll inside modals), `groupRef` on `ComboboxInput`, `className="contents"` on the Portal, Refer styling, thin low-contrast list scrollbar (`scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent`), no `cn-*` tokens (the CLI strips them) | — | Done in W1 (trigger-icon and item-indicator slots). Open question: upstream's `pointer-coarse:` touch sizing was removed in ours |
| command | — | — | Done in W2: `CommandDialog` `className` and `showCloseButton` |
| context-menu, dropdown-menu | dropdown: primary highlight, `rounded-input` items, `rounded-card shadow-popover` content | — | Done in W1 (SubTrigger icons) |
| dialog | `title` (sr-only) and `showCloseButton` props on content, custom close button, overlay `backdrop-blur-[1px]`, `DialogContentWithNavigation`, `NavigationArrow` with `loading`, `useDialogNavigation`, `rounded-3xl bg-card shadow-xl` | Upstream content styles | Done in W1 (close slot, `outline-none`). Done in W2: `DialogFooter showCloseButton` (adds `button` to the item's `registryDependencies`) |
| drawer | — | — | W4: header centered on mobile, `gap-0.5` (design call) |
| empty, field, input-group, item, kbd, spinner, button-group | empty: icon variant; field: `text-destructive-content`; input-group: `rounded-input`, primary focus ring | — | Done in W2: publish button-group, field, item, kbd, spinner. Variations galleries at `/examples/<name>` for button-group, field, item, kbd, native-select, spinner. Pending (additive): item `size="xs"`, which upstream has only in the newer bases system (radix-vega), not in new-york-v4; the item gallery leaves out its 4 extra-small sections until we add it |
| input | `rounded-input`, `bg-card`, h-10, primary focus ring | — | Done in W1 (no `flex`) |
| native-select | — | — | Done in W1 (`Canvas` option colors). Done in W2: publish. W4: Refer styling (it's still stock: `rounded-md`, `ring-ring/50`) |
| pagination | — | — | Done in W1 (type-only `Button` import) |
| popover | `rounded-card shadow-popover backdrop-blur-xl`, no border | Upstream content styles | Done in W2: `PopoverHeader`, `PopoverTitle`, `PopoverDescription` |
| radio-group-boxed, checkbox-boxed, responsive-dialog | Refer-only components | — | — |
| refer-menu-item | — | — | Done in W2: delete (only the docs demo uses it) |
| resizable | — | — | W5: react-resizable-panels v4 (`Group`/`Separator`, `orientation`, sizes as `"50%"` strings, `onLayoutChange`). Pin `react-resizable-panels@^4` in the item when done |
| select | `position="item-aligned"`, `rounded-input`, sizes xs–lg, primary highlight, `rounded-card shadow-popover` | Upstream trigger/item styles | Done in W1 (`align`, indicator slot) |
| separator | `data-slot="separator-root"` (portal targets it) | — | W4: rename to `separator` only together with a portal fix |
| sheet | — | — | Done in W2: `showCloseButton` on content |
| sidebar | No `cssVars`/`tailwind` in the item | — | Done in W1 (`var()` ring, type-only import) |
| slider | — | — | Optional: thumb `bg-white` (check in visual QA) |
| sonner | `borderRadius: 12px`, `backdropFilter: blur(24px)` | — | W4: default lucide icons on every toast (changes app visuals) |
| switch | Custom geometry (22×40 track, press stretch) | — | W4: `size="sm"` on a Refer scale; add a focus-visible ring (missing today) |
| table | — | — | W4: `has-aria-expanded:bg-muted/50` row highlight (changes app visuals) |
| tabs | Refer list/trigger styles | — | W4: `orientation`, `variant="line"`, focus-visible ring (missing today) |
| toggle-group | `rounded-lg`, items `flex-1` | — | Done in W2: `spacing` prop (joined styles only when `spacing=0`). Those styles are now `data-[spacing=0]:` variants, so a plain item `className` like `rounded-full` no longer overrides them; use `data-[spacing=0]:rounded-full`. No app uses toggle-group yet |
| tooltip | `rounded-[10px]`, `ease-smooth`, built-in `TooltipProvider` | — | Done in W1 (`text-background`). W5: drop the built-in Provider once every app has one at its root |

## Components added from upstream in wave 3

Added in wave 3 with upstream styling and no Refer design pass yet, so they're available to customize. Before an app
uses one (e.g. `attachment` for CV uploads), do a Refer design pass first: they still have upstream styles
(`rounded-md`, `ring-ring/50`, …). No app has any of them, so syncing an app after wave 3 changes nothing.

Each has a short demo on the main docs page (`components/<name>-demo.tsx`) and, except `direction` (upstream has no
gallery for it), a full variations gallery at `/examples/<name>`: upstream's example gallery from
`ui.shadcn.com/create?item=<name>-example`, ported with `scripts/port-shadcn-example.py` into
`components/examples/<name>-example.tsx` on a copy of their `Example`/`ExampleWrapper` harness
(`components/examples/example.tsx`). The components published in wave 2 (button-group, field, item, kbd, native-select, spinner) have galleries too,
ported the same way. The list of galleries is `components/examples/names.ts`; the route, the sidebar
"Examples" group and the "All variations" link on each demo read from it. Sections that need the AI SDK were dropped:
code-block's Markdown section (`streamdown`), trace's Chat and Reasoning, and message's chat helpers;
message-scroller's gallery is ours, with static stand-ins for upstream's AI SDK chat.

| Component | Source | Deps | Notes |
|---|---|---|---|
| message, bubble, marker, attachment, direction | `new-york-v4/ui` | `@radix-ui/react-slot`; direction: `@radix-ui/react-direction`; attachment: `button` | — |
| message-scroller | `new-york-v4/ui` | `@shadcn/react@^0.3.1`, `button` | Headless core in `@shadcn/react/message-scroller`. The item pins the 0.3 series: in a 0.x package any minor can break |
| questionnaire | `r/styles/radix-vega/questionnaire.json` | `@shadcn/react@^0.3.1`, `button` | Button defaults mapped to ours (`primary`, `md`); `cn-font-heading` removed |
| trace | `r/styles/radix-vega/trace.json` | `collapsible` | `data-open:`/`data-closed:` rewritten to `data-[state=open\|closed]:` (Radix Collapsible) |
| code-block, use-highlighted-code (+ `lib/highlighter.tsx`) | `r/styles/radix-vega/*.json` | `shiki`, `button` | — |
| toast | `r/styles/base-vega/toast.json` | `@base-ui/react`, `button` | Base UI toast; coexists with `sonner`, which the apps use. Needs its own `<Toaster>` |

How these were ported (repeat it for future upstream components):
- Sources only in `registry/bases/*` use `cn-*` placeholders and `IconPlaceholder`; take them from a built style JSON
  (`ui.shadcn.com/r/styles/radix-vega/<name>.json`; vega is the classic look). Built JSONs still contain
  `IconPlaceholder`: replace it with the `lucide="…"` icon.
- `from "cn"` → `@/lib/utils`; `radix-ui` → `@radix-ui/react-*` (`Slot.Root` → `Slot`); registry paths →
  `@/registry/refer/...`; our Button names for `variant`/`size` defaults; drop `cn-*` classes.
- **Don't copy upstream's `@custom-variant`s** (`data-open`, `data-checked`, `data-selected`, …) from
  `shadcn/tailwind.css`. They redefine Tailwind's built-in variants, and `data-selected` only matches
  `[data-selected="true"]`, which would break our combobox (Base UI sets `data-selected=""`). Instead, rewrite each
  variant in the ported file to match what its primitive emits: Radix → `data-[state=open]:`; `@shadcn/react` sets
  `data-checked=""`, which the built-in `data-checked:` already matches.

## Wave 4 visual pass

Brings components that still had shadcn's look in line with the Refer components they sit next to, reusing existing
patterns only (approved from a side-by-side preview, 2026-10-22):

| Component | Now matches | Change |
|---|---|---|
| questionnaire | radio-group-boxed, checkbox, kbd, input | Checked choice in `bg-primary-subtle` with `border-primary-border` and the 2px top border; Refer radio/checkbox indicator; `kbd` shortcut; `QuestionnaireInput` with the `Input` classes; error in `destructive-content` |
| bubble, message | card, semantic tokens | Content `rounded-2xl` with a `rounded-md` "tail" corner on the speaker's side; `tinted` → `primary-subtle`, `outline` → `bg-card shadow-card`, `destructive` → `destructive-subtle`; reactions pill solid (`bg-card shadow-card`); buttons inside reactions and `MessageFooter` compact (`h-6 px-2 text-xs`) |
| context-menu, menubar, navigation-menu | dropdown-menu | Content/sub-content/viewport in `bg-popover rounded-card shadow-popover backdrop-blur-xl`; items `rounded-input` with the primary highlight (context-menu, menubar); menubar bar and triggers as pills; navigation links `rounded-input`, active in `primary-subtle` |
| calendar | popover, dropdown-menu | Standalone surface `bg-popover rounded-card shadow-popover backdrop-blur-xl` (transparent and shadowless inside `popover-content` / `card-content`); days and range ends `rounded-input` with the dropdown item hover (`bg-primary/85`); nav arrows `ghost` icon buttons, `size-7`, `rounded-input`; today = `text-primary-content` + primary dot; range middle `primary-subtle`; uppercase weekday labels |
| toast | sonner | `rounded-[12px] shadow-popover backdrop-blur-[24px]`, no border; semantic icon colors |
| attachment | card radius | Upstream look kept (border, `bg-muted` media, `rounded-lg` media); only `rounded-2xl` + `squircle` on the root (16px outer, 8px padding, 8px media: concentric) and error colors from the `destructive-*` tokens |
| item | card | `rounded-xl squircle`; `outline` → `bg-card shadow-card`; `muted` → `bg-muted`; icon media `rounded-input bg-card shadow-xs` |
| code-block | card | `rounded-xl squircle bg-muted`, no border; `destructive` → `destructive-subtle` / `destructive-content` |

Focus styles in these components now come from the global `focus-visible:outline-2 outline-ring` in `globals.css`
instead of upstream's `ring-ring/50` rings. Apps: portal has context-menu, menubar, navigation-menu and calendar installed
but imports none of them, so syncing wave 4 changes no portal screen.

### Wave 4, part 2

Approved from a second side-by-side preview (2026-10-23). Branch `feat/shadcn-wave-4b`, on top of part 1.

| Component | Change | Portal impact |
|---|---|---|
| switch | `size="sm"` (track 32×18, thumb 14px, same press stretch) | Additive |
| tabs | `TabsList` `variant`: `default` (segmented, unchanged), `line` (primary underline), `subtle` (portal's `PipelineCandidateDialog` card-bar tabs: `squircle`, `rounded-(--radius-input)`, selected `bg-muted`); `orientation="vertical"` via Radix's `data-orientation` on list and triggers; exports `tabsListVariants` | Additive; portal can replace its `cardTabList`/`cardTab` classes with `variant="subtle"` |
| avatar | `size` sm/default/lg = 32/40/48px with fallback text to match; `AvatarBadge` (`bg-positive ring-2 ring-card`); fallback initials `text-muted-foreground`; image and fallback `rounded-[inherit]` | Muted initials change 6 portal screens. `overflow-hidden` stays on the root and opens only with a badge (`has-data-[slot=avatar-badge]:overflow-visible`), because portal's `UserDisplay` hover overlay relies on the clip |
| alert-dialog | `AlertDialogMedia` (`size-11 rounded-full bg-primary-subtle text-primary-content`); header becomes a grid only when media is present | Additive |
| sonner | Lucide icons for typed toasts, no color (they follow the toast text) | Changes the ~270 typed toasts' icons |
| table | `TableRow` `has-aria-expanded:bg-muted/50` | Rows with an open menu stay highlighted (10 files) |
| native-select | `SelectTrigger` classes (`rounded-input bg-card h-10`, `sm` `h-9`, primary focus) | Not used |
| drawer | `DrawerHeader` `gap-0.5`, centered text on mobile for bottom/top drawers (`max-md:` so `md` stays left) | 6 files |
| item | `size="xs"` (`gap-2 px-2.5 py-2`, icon media `size-6 rounded-lg`); the item gallery shows its 4 extra-small sections again | Additive |

The missing focus ring noted for switch and tabs was not a gap: `globals.css` applies `focus-visible:outline-2
outline-ring` to every element and neither component sets `outline-none`. Still pending in W4: separator `data-slot`
rename together with the portal fix.

**Overriding a Button's radius or shadow:** `tailwind-merge` doesn't know the Refer theme names (`rounded-input`,
`rounded-card`, `shadow-card`, `shadow-popover`), so `cn("rounded-full …", "rounded-input")` keeps both classes and the
winner depends on CSS order. Inside registry components, override with the CSS-variable form, which it does merge:
`rounded-(--radius-input)`, `rounded-(--radius-card)`, `shadow-(--shadow-card)`. (The docs' `button-demo` still passes
`className="rounded-input"` to icon buttons and works only by CSS order.) Apps use their own `cn`, so a
`extendTailwindMerge` config in the DS alone wouldn't fix it for them.

## Infra decisions

- **`cn`:** keep `import { cn } from "@/lib/utils"`. Upstream imports the `cn` npm package; the CLI rewrites
  `@/lib/utils` to each app's alias but leaves a bare `"cn"` alone, which would force the package into every app.
- **`radix-ui` monopackage:** not yet (wave 5). The CLI doesn't rewrite Radix imports on install. If we migrate, do it in
  one sweep (`npx shadcn migrate radix`, every item's `dependencies` → `["radix-ui"]`), not per component.
- **`@base-ui/react`:** bumped in wave 2 to `^1.9.0`, the version a fresh `combobox` install gets (portal runs 1.7.0).
  It needs `date-fns` 4 as a peer, so the DS moved to `date-fns ^4.4.0` (it's only used in demos). Re-check the
  combobox inside dialogs and drawers on the docs site after each bump.
- **No custom `no-scrollbar` (removed in wave 3).** Upstream's `no-scrollbar` (in `shadcn/tailwind.css`) hides the
  bar; ours showed a thin one, so the same name meant two things. With Tailwind 4.3 (DS and monorepo), `combobox` uses
  the native `scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent` (same CSS as before) and the
  utility is gone from `globals.css`. Use `scrollbar-none` to hide a bar and `scrollbar-thin` for a thin one; don't
  define a custom `@utility` with those names. Apps keep the old rule after a `globals` sync (the CLI doesn't delete
  rules), so delete `@utility no-scrollbar` from each app's `globals.css` by hand when syncing.
- **shadcn CLI devDependency:** `^3.6.2`, latest 4.22.1. Wave 5.
- **Upstream `shadcn/tailwind.css`:** also defines `data-open`/`data-closed`/… custom variants that map Radix
  `data-state` and Base UI attributes. We don't adopt them (they'd change the meaning of Tailwind's built-in
  `data-selected:` and others in our existing components); rewrite them per component when porting, as described in
  [Components added from upstream in wave 3](#components-added-from-upstream-in-wave-3).
- **Upstream tokens we don't have:** `--surface*`, `--code*`, `--selection*`, `--font-heading`,
  `--destructive-foreground`, and radius `2xl`–`4xl` as multiples of `--radius` (ours pin Tailwind's defaults). Check
  ported components for them.

## shadcn CLI behavior (confirmed by real installs)

- `add globals.json` merges into `globals.css`: it updates existing variables in place, keeps what it doesn't own, doesn't
  delete rules the DS removed, and is a no-op when nothing changed. It always adds about 25 harmless `@theme inline`
  aliases and joins multi-line shadows onto one line.
- An at-rule nested inside another block is appended again on every install (the build rejects it).
- With `--overwrite`, identical files are skipped ("Skipped N files").
- A bare `registryDependencies` name resolves to shadcn's registry; only full URLs (or `@refer/...` with the namespace
  configured) reach ours. `build-registry.mts` rewrites bare names to Refer URLs.
- Item `dependencies` are `npm install`ed on every add, at the exact version if one is pinned.
- A `registry:file` target starting with `~/` is relative to the project root.
- `cn-*` classes are replaced by the project's shadcn style, or stripped when it has none.
