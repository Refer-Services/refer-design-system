# Spec: ship `refer-utils.css` (scroll-fade, shimmer, squircle) through the registry

## Goal

Publish one CSS file of Tailwind v4 utilities as a registry item called `refer-utils`. Consuming apps then install
and update it with the same `shadcn add` they use for components:

```bash
npx shadcn@latest add https://ds.tryrefer.com/r/refer/refer-utils.json --overwrite
```

The install writes the whole file to `app/refer-utils.css` in the consuming app. The app imports it once from its
`globals.css`. Every later update replaces the file, so the DS is the only place these utilities are edited.

## Why a file, not the style item's `css` field

`registry/refer/styles/refer-style.json` already ships theme tokens (`cssVars`) and a `css` block. The CLI merges both
into the consumer's `globals.css`. That merge is the wrong fit here:

- It only adds. A rule removed or renamed in the DS stays in every app.
- This CSS uses `@property`, `@keyframes` nested in `@theme inline`, and functional `@utility name-*` rules with
  `--value()`/`--modifier()`. It's not confirmed that the merge handles all of them.

A `registry:file` with a fixed `target` avoids both problems. Leave `refer-style.json` alone.

## Background

- The portal frontend (`olympus-backend/apps/portal-frontend`) already uses these utilities. It has them as
  `app/shadcn-utils.css`, imported from its `globals.css`, and keeps its own copy of `.squircle` in `globals.css`.
  This work replaces both with the DS-shipped file.
- scroll-fade and shimmer are copied unchanged from the `shadcn` npm package, `dist/tailwind.css`, version 4.22.1
  (sections `/* scroll-fade */` and `/* shimmer */` through the end of the file). Docs:
  https://ui.shadcn.com/docs/utils/scroll-fade and https://ui.shadcn.com/docs/utils/shimmer.
  They are copied rather than imported from `shadcn/tailwind.css` because that import would also bring in shadcn's
  custom `data-*` variants (`data-open`, `data-active`, etc.) and the CLI package.
- `.squircle` is currently defined only in this repo's `app/globals.css`. No registry item ships it, so consumers
  copy it by hand.

## Tasks

### 1. Create `registry/refer/styles/refer-utils.css`

Contents, in order:

1. A header comment: what the file is, that it is installed by `shadcn add .../refer-utils.json`, that consumers must
   not edit it (changes go in the DS), and the upstream source and version for the shadcn parts.
2. The `/* scroll-fade */` and `/* shimmer */` sections, copied unchanged. Get them either from
   `/Users/dudufigueiredo/Documents/Refer/Code/olympus-backend/apps/portal-frontend/app/shadcn-utils.css` (everything
   after its header comment) or from the package:
   `npm pack shadcn@4.22.1`, then copy `package/dist/tailwind.css` from the line `/* scroll-fade */` to the end of the
   file. Do the `npm pack` in a temp directory, not in this repo.
3. `squircle`, moved from `app/globals.css` and written as a Tailwind utility so it gets variants:

   ```css
   /* squircle */
   @utility squircle {
     @supports (corner-shape: superellipse(1.125)) {
       corner-shape: superellipse(1.15);
     }
   }
   ```

   Check that `@supports` nested inside `@utility` compiles in Tailwind v4. If it doesn't, keep the original plain
   `.squircle { ... }` rule unchanged. Either form is fine; the class name must stay `squircle`.

Don't change any upstream selector, variable or keyframe name. Consumers rely on them matching the shadcn docs.

### 2. Register the item in `scripts/build-registry.mts`

Add an entry to `registry.items`:

```ts
{
  name: "refer-utils",
  type: "registry:file",
  title: "Refer utilities",
  description: "Tailwind v4 utilities: scroll-fade, shimmer, squircle.",
  files: [
    {
      path: "styles/refer-utils.css",
      type: "registry:file",
      target: "app/refer-utils.css",
    },
  ],
},
```

- **Check the `target` format** against the `shadcn` version this repo builds with (`pnpm dlx shadcn build`; check
  how `~/`-prefixed and plain targets resolve). The file must land at `<project root>/app/refer-utils.css` in a
  Next.js app-router project without `src/`. Adjust the entry if the schema needs another type or target format.
  If you find a better-fitting type (e.g. `registry:style` with a file), say why.
- **`buildRegistryIndex()` assumes every item's first file is a React module.** It writes a
  `React.lazy(() => import("@/registry/refer/<files[0].path>"))` for it. A `.css` path would produce a broken lazy
  component in `__registry__/index.tsx`. Make the generator emit `component: null` when the first file isn't
  `.ts`/`.tsx`, and keep output for every other item byte-for-byte the same.
- `addStyleItem()` already adds every item to the `index` style's `registryDependencies`. That means installing the
  full DS now also installs `refer-utils`, which is what we want. No change needed; just confirm it in the generated
  JSON.

### 3. Make the docs site use the same file

The DS's own preview must use exactly what consumers get.

- In `app/globals.css`, delete the `.squircle` block.
- Add `@import "../registry/refer/styles/refer-utils.css";` right after `@import "tw-animate-css";`. Adjust the
  relative path if needed.

### 4. Optional: a demo

If a natural spot exists in the `app/(app)/` gallery, add a small `components/refer-utils-demo.tsx` with:
- a scrollable list with `scroll-fade`
- a horizontal chip row with `scroll-fade-x`
- `shimmer text-muted-foreground` text ("Generating…")
- a `squircle rounded-2xl` card

Skip this if it means inventing new navigation.

### 5. Build

```bash
npm run registry:build
npm run lint
npm run typecheck
npm run build
```

Don't hand-edit `__registry__/**`. Commit what the build generates.

## Acceptance checks

1. `public/r/refer/refer-utils.json` exists, has `"type"` and `"target"` as intended, and its `content` is exactly
   the source CSS file.
2. `public/r/refer/index.json` lists `refer-utils` in `registryDependencies`.
3. `__registry__/index.tsx` has `component: null` for `refer-utils`, and its diff contains nothing else.
4. Docs site (`npm run dev`):
   - existing `squircle` usage still renders, in Chrome (superellipse corners) and Safari (falls back to rounded).
   - In devtools, `.scroll-fade`, `.scroll-fade-x`, `.shimmer`, `.shimmer-color-primary/60` and
     `.scroll-fade-b-8` produce CSS.
5. Consumer install test, in a throwaway Next.js 15 + Tailwind v4 app outside this repo:
   - Run the DS locally, then `npx shadcn@latest add http://localhost:3000/r/refer/refer-utils.json`.
   - The file lands at `app/refer-utils.css`, the import is added to `globals.css` by hand, and the classes work.
   - Edit the source in the DS, rebuild, and run `add ... --overwrite`. The consumer file is replaced, with no
     prompt and no duplicates.

Report the result of every check, including anything that fails.

## Out of scope

- Changing `refer-style.json`, tokens, or any component.
- Changing the portal frontend. A separate follow-up will rename its `app/shadcn-utils.css` to
  `app/refer-utils.css`, drop its copy of `.squircle`, and reinstall from the registry.
- The portal's old `.shimmer` class in `components/motion/text-shimmer.css` (used by its email-action page).
  That cleanup also belongs to the portal follow-up.

## Deliverable

A branch with the changes above and a short PR description covering:
- the install command for consumers
- the one-line `@import` consumers add to `globals.css`
- the acceptance check results
