# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Next.js 15 + React 19 + Tailwind CSS v4 design system with an integrated docs/preview site. Two products in one:
- **Design system registry** — what downstream apps install via `shadcn` CLI
- **Docs site** at `ds.tryrefer.com` — showcases components in a gallery/kitchen-sink app

Package manager: `npm` for scripts, but `build` internally runs `pnpm --filter=shadcn build`. Do not change this wiring.

## Commands

```bash
npm run dev              # Start Next.js dev server (Turbopack)
npm run build            # Build registry + app
npm run lint             # ESLint
npm run lint:fix         # ESLint with auto-fix
npm run typecheck        # tsc --noEmit
npm run format:write     # Prettier write
npm run format:check     # Prettier check
npm run registry:build   # Regenerate __registry__/index.tsx and registry JSON
npm run usage:build      # Refresh data/usage.json from the apps (REFER_APPS_DIR, default ../olympus-backend/apps)
```

**No test framework is configured.** Use lint, typecheck, and manual preview for validation.

## Where to make changes

| Goal | Edit here |
|---|---|
| Change the published design system (what consumers install) | `registry/refer/**` + `scripts/build-registry.mts` |
| Change only docs/gallery UI | `components/*-demo.tsx` and `app/**` routes |

**Never hand-edit `__registry__/**`** — it is fully generated.

After any change under `registry/refer/**` or `scripts/build-registry.mts`, run `npm run registry:build`.

## Adding a new registry component

1. Implement it under `registry/refer/ui/` (or `blocks/`, `charts/`, `hooks/`, `lib/` as appropriate).
2. Add or update its entry in `scripts/build-registry.mts`. List every Refer component or hook it imports in
   `registryDependencies` by bare name (`"button"`): the build turns them into Refer URLs (a bare name would
   otherwise install shadcn's own component) and fails on an undeclared import or an unknown name. List every npm
   package it imports in `dependencies` too: the build fails on one it doesn't list, except what `shadcn init`
   installs in every app (`react`, `next`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`).
3. Run `npm run registry:build`.
4. Optionally add a `*-demo.tsx` in `components/` and wire it into the relevant `app/(app)/` route.

## Updating from shadcn upstream

Read `docs/upstream-sync.md` first: the upstream commit we last triaged, the procedure, which Refer customizations
each component must keep, which `data-slot`s the apps target, and what was skipped on purpose. Update it when you finish.

## App router structure (docs site)

- `app/(app)/` — the docs site: inset sidebar, header search (⌘K), `/` component index, `/components/[name]` per
  component (install command, demos with Preview/Code, variations gallery with per-section code, usage in the apps).
  `/examples/[name]` redirects to the component page.
- Data: `lib/docs.ts` (pages from `registry.json` + `config/docs.ts`), `components/docs/demos.tsx` (demo per page),
  `components/examples/` (galleries; list in `names.ts`), `data/usage.json` (from `npm run usage:build`).
- Adding a demo: create `components/<name>-demo.tsx` and add it to `components/docs/demos.tsx`.
- Scrolling in demos and galleries: always `ScrollArea` (`@/registry/refer/ui/scroll-area`), never a div with
  `overflow-y-auto`. Size it with `min-h-0 flex-1` inside a flex column (drawer, sheet: header and footer stay put) or
  `max-h-*`/`h-*` elsewhere. Put vertical padding on a div inside it, so the content scrolls to the edges; horizontal
  padding can go on the root. Edge fade: `[&_[data-slot=scroll-area-viewport]]:scroll-fade-y`. When porting a shadcn
  example, convert its `overflow-y-auto` regions. Components that scroll by themselves (CodeBlock, Command list) keep
  their own scrolling.
- `app/(view)/view/[name]/` — individual component viewer
- `app/preview/[base]/[name]/` — isolated preview routes

## Component conventions

- **Named function declarations** (not arrow functions), props typed with `React.ComponentProps<"element">`.
- Use **`cva`** (class-variance-authority) for variants.
- Use `cn()` from `@/lib/utils` for class merging.
- Add `data-slot="component-name"` as a styling hook.
- Buttons default to `rounded-full`; inputs use `rounded-input`.
- **Concentric radii:** a nested surface's radius is the outer radius minus the padding between them (e.g. tabs list
  `rounded-[14px]` with `p-1` around `rounded-[10px]` triggers; attachment `rounded-2xl` with `p-2` around
  `rounded-lg` media). Check it whenever a rounded element sits inside another.
- Icons from `lucide-react`; rely on `[&_svg:not([class*='size-'])]:size-4` for default icon sizing.
- Import registry primitives from `@/registry/refer/ui/...`, **not** `@/components/ui`.
- **Start and end, not left and right.** The apps read right to left in Arabic, Hebrew, Persian and Urdu. Write
  `ms/me`, `ps/pe`, `inset-s/e`, `text-start/end`, `rounded-s/e` (`ss/se/es/ee`), `border-s/e`; `gap`, `space-x`,
  `justify-*` and `inset-x` already follow the direction. `scripts/port-shadcn-example.py --logical <file>` converts
  a file and lists what it leaves to you. Physical on purpose, and why:
  - `left-1/2` / `left-[50%]` with their `-translate-x-1/2`: they centre in either direction.
  - A class under a variant that names a side (`data-[side=left]:`, `data-[swipe-direction=right]:`,
    `[[data-side=left]_&]:`): it follows the side a popover, sheet or drawer was put on.
  - Sides chosen by name: Sheet's `side`, Drawer's `swipeDirection`, the sidebar's `data-side` (its `side` prop takes
    `"start" | "end"` and resolves to one).
  - A corner that `rotate-45` turns into a tip (the navigation menu's indicator).
  - A row fixed left to right: InputOTP's slots (`[direction:ltr]`, a code reads left to right everywhere).
- **What moves turns too.** A translate or inline transform along a side gets its `rtl:` mirror (the Switch thumb;
  Progress through `--progress-offset`). An icon that means next or back takes `rtl:-scale-x-100`; if it also rotates
  (a chevron that opens), counter-rotate it under `rtl:` (`rtl:[&[data-state=open]>svg]:-rotate-90`), since scale and
  rotate compose; if it scales on hover, swap the icon from `useDirection` instead (the hover scale would undo the
  mirror). ArrowLeft and ArrowRight that mean back and forward swap in right-to-left.
- **The direction in code** comes from `useDirection` in `@/registry/refer/ui/direction` (list `"direction"` in
  `registryDependencies`), never from `@radix-ui/react-direction` or Base UI directly. An app wraps its tree in that
  item's `DirectionProvider`, which feeds Radix and Base UI, and needs a single copy of `@radix-ui/react-direction`
  (`npm ls @radix-ui/react-direction`; each copy has its own context; see `overrides` in `package.json`).
- **`lang` goes with `dir`.** Next 15's dev server (Turbopack, with Next 15's old default browser targets) writes
  logical classes as `:lang(ar), :lang(he)…` rules, so there they follow the page's language, not its `dir`
  (`next build` and Next 16 keep them logical). A right-to-left page sets both; a box fixed left to right inside one
  uses physical classes.
- **What people write reads in its own direction:** `[unicode-bidi:plaintext]` on fields and messages (Textarea,
  BubbleContent), not `dir="auto"`, which turns an empty field left to right and flips the element's own logical
  corners. A name or other user text inside a translated sentence goes in `<bdi>`, so its letters don't reorder the
  sentence around it: `Sent to <bdi>{name}</bdi>`.
- Check a change with the LTR/RTL switch on any preview of the docs site.

## Design tokens

Token source: `app/globals.css` only. `npm run registry:build` generates the `globals` item from it (`cssVars` from
`:root`, `.dark` and `@theme inline`; `css` from everything else, e.g. `@utility squircle`, `@utility no-scrollbar`).
`index` (metadata in `refer-style.json`) installs every item, `globals` included. Don't nest at-rules inside other
blocks in `globals.css`: the CLI duplicates them on every install, so the build rejects them.

What consuming apps (portal, landing, argus, partners) install, and the rules that keep them in sync:

- They sync CSS with `npx shadcn@latest add https://ds.tryrefer.com/r/refer/globals.json`, never `index.json` (that
  reinstalls every component), and components with `.../<name>.json --overwrite`.
- With `"registries": { "@refer": "https://ds.tryrefer.com/r/refer/{name}.json" }` in an app's `components.json`,
  the same items install as `@refer/<name>`, and the shadcn MCP server (`npx shadcn@latest mcp init --client claude`)
  can list and search them. It reads `public/r/refer/registry.json`, so keep every item's `description` in
  `scripts/build-registry.mts` accurate.
- `registry/refer/styles/refer-utils.css` (shadcn's scroll-fade and shimmer, copied as-is) installs as
  `~/app/refer-utils.css`; `globals` imports it and lists it in `registryDependencies`, so syncing `globals.json`
  brings it. Re-copy it from shadcn rather than editing it.
- Tokens live only in `app/globals.css`: never give a component item its own `cssVars`/`tailwind`, the CLI would
  overwrite the app's tokens with them on install.
- Don't pin exact versions in an item's `dependencies` (`date-fns@3.6.0`): the CLI installs that exact version in
  every app on each sync. A major range the component's code needs is fine (`react-resizable-panels@^4` once the
  component is written for v4), since an unversioned name installs whatever major is latest. For a 0.x package,
  pin the minor series (`@shadcn/react@^0.3.1`): in 0.x any minor can break.

**Prefer semantic tokens over raw Tailwind color utilities:**

- Brand: `--color-refer-50` → `--color-refer-950` (warm red scale)
- Semantic colors: `primary-content`, `primary-subtle`, `primary-border`, `destructive-subtle`, `destructive-content`, `positive`, `positive-subtle`, `positive-content`, `info`, `info-subtle`, `info-content`, `border-high`, `border-low`
- Shadows: `shadow-card`, `shadow-popover`, `shadow-avatar`
- Radii: `radius-input`, `radius-card`
- Fonts: `--font-sans` is `--font-arabic`, `--font-hebrew`, the brand font, `--font-script` (the apps' system fonts per
  script), `sans-serif`. Arabic and Hebrew come first because their faces cover only their own letters, and
  next/font's "Geist Fallback" (a local Arial) would draw them otherwise. The faces are declared by the app: here
  `app/fonts.css` with `app/fonts/` (an app copies both and imports the CSS); without them the names match no font.
  In Arabic-script languages the `tracking-*` scale is 0 (it pulls joined letters apart).
- Motion: `scale-pressed`, `ease-smooth`

## Formatting

Prettier config (in `package.json`): no semicolons, double quotes, 2-space tabs, ES5 trailing commas, Tailwind class sorting via `prettier-plugin-tailwindcss`.

Import order: React/Next → third-party → workspace aliases (`@workspace/*`) → `@/types`, `@/config`, `@/lib`, `@/hooks`, `@/components/ui`, `@/components`, `@/registry` → relative.

## Path aliases

- `@/*` → project root (`tsconfig.json` `baseUrl: "."`)
- Shadcn config (`components.json`): `ui` → `@/registry/refer/ui`, `utils` → `@/lib/utils`, `hooks` → `@/hooks`

Do not change these aliases — they are required for the `shadcn` CLI workflow.
