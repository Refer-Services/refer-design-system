## Agent Guide for `refer-design-system`

This document is for **any automated agent or assistant** (Cursor, Warp, CLI tools, etc.) working on the `refer-design-system` repository.

It explains **what this project is**, **where to make changes**, and **how not to break the registry**.

---

### High-level overview

- **Project type**: Next.js 15 + React 19 + Tailwind CSS v4 design system and docs site.
- **Two products in one**:
  - **Design system registry** (what downstream apps install via `shadcn` CLI).
  - **Docs / preview app** at `ds.tryrefer.com`.
- **Package manager**: The repo uses `npm` scripts, but `build` internally runs `pnpm --filter=shadcn build`. Do not change this wiring unless explicitly requested.
- **Tests**: **There is no test framework configured**. Use **lint**, **typecheck**, and **manual preview** for validation.

---

### Core commands

- **`npm run dev`**: Start Next.js dev server (Turbopack).
- **`npm run build`**: Build registry and app (`pnpm --filter=shadcn build && next build`).
- **`npm run start`**: Start production server after a build.
- **`npm run lint`**: ESLint via `next lint`.
- **`npm run lint:fix`**: ESLint with `--fix`.
- **`npm run typecheck`**: TypeScript type checking (`tsc --noEmit`).
- **`npm run format:check`**: Prettier check.
- **`npm run format:write`**: Prettier write.
- **`npm run registry:build`**:
  - Runs `scripts/build-registry.mts` via `tsx`.
  - Regenerates `__registry__/index.tsx` and JSON files under `registry/**`.
  - Runs Prettier over `registry/**/*.{ts,tsx,json,mdx}`.

**Agent rule**: After modifying **anything under `registry/refer/**` or `scripts/build-registry.mts`**, you should usually run **`npm run registry:build`** (or at least mention that the user should).

---

### File system mental model

#### Registry vs. docs

- **Registry source (published design system)** – lives under:
  - **`registry/refer/ui/`**: Core UI primitives (`button`, `dialog`, `input`, etc.).
  - **`registry/refer/blocks/`**: Page-level blocks and layouts.
  - **`registry/refer/charts/`**: Components backed by `recharts`.
  - **`registry/refer/hooks/`**: Shared React hooks (e.g. `use-mobile`).
  - **`registry/refer/lib/`**: Utilities including the registry’s `cn()` helper.
  - **`registry/refer/styles/`**: The `index` item's metadata (`refer-style.json`) and shipped CSS files (`refer-utils.css`: shadcn's scroll-fade and shimmer, copied as-is). Tokens live in `app/globals.css`.
- **Docs / examples only (not published)**:
  - **`components/`**: Demo/showcase components, almost always named `*-demo.tsx`.
  - These import from `@/registry/refer/ui/...` and are safe to change without affecting consumers, as long as you do not break imports.

**Agent rule**:

- **To change the actual design system that consumers install**, edit files under **`registry/refer/**` and update the registry configuration.
- **To change only the docs / gallery UI**, edit files under **`components/`** and `app/**` routes.

---

### Registry build pipeline

- **Source of truth**: `scripts/build-registry.mts`.
- It:
  1. Declares every registry item (name, type, dependencies, file paths).
  2. Turns bare `registryDependencies` (`"button"`) into Refer URLs, and fails on an unknown name or on a Refer import
     an item doesn't declare (a bare name would install shadcn's own component).
  3. Generates the `globals` item from `app/globals.css`, and the `index` item that installs every item.
  4. Reads implementation files from `registry/refer/**`.
  5. Generates `__registry__/index.tsx` (lazy-loaded component map; **do not edit**).
  6. Generates JSON data consumed by the `shadcn` CLI for remote install (`public/r/refer/`).

**Agent rules**:

- **Do not hand-edit `__registry__/**`**; treat it as generated.
- When **adding a new component**, you must:
  - Implement it under `registry/refer/ui/` (or `blocks/`, `charts/` as appropriate).
  - Add or update its entry in `scripts/build-registry.mts`.
  - Run or recommend **`npm run registry:build`**.
- **Updating from shadcn upstream**: read `docs/upstream-sync.md` first (last triaged upstream commit, procedure,
  per-component customizations to keep, `data-slot`s the apps target, skipped changes) and update it when you finish.

---

### App router structure (docs site)

- **`app/(app)/`**: Main gallery / kitchen-sink app with navigation.
- **`app/(examples)/`**: Full-page example layouts (e.g. dashboards).
- **`app/(view)/view/[name]/`**: Individual component viewer route.
- **`app/preview/[base]/[name]/`**: Isolated preview routes.

**Typical agent tasks**:

- **Add a new example page**: Extend routes under `app/(examples)/`.
- **Change how a component is presented**: Update demos in `components/*-demo.tsx` and relevant `app/(app)/` views.

---

### Design tokens and theming

- **Token source**: `app/globals.css` is the single source of truth. `npm run registry:build` generates the `globals`
  item's `cssVars` (from `:root`, `.dark`, `@theme inline`) and `css` (everything else) from it; apps sync it with
  `shadcn add https://ds.tryrefer.com/r/refer/globals.json` (not `index.json`, which reinstalls every component).
  With `"registries": { "@refer": "https://ds.tryrefer.com/r/refer/{name}.json" }` in an app's `components.json`,
  items install as `@refer/<name>` and the shadcn MCP server can list and search them (it reads
  `public/r/refer/registry.json`, so keep each item's `description` in `scripts/build-registry.mts` accurate).
  Don't add `cssVars`/`css` to `refer-style.json` or `cssVars`/`tailwind` to a component item (the CLI would overwrite
  the app's tokens with them), and don't nest at-rules inside other blocks (the CLI duplicates them on every install;
  the build fails if you do).
- **Brand palette**:
  - `--color-refer-50` → `--color-refer-950` (warm red scale).
- **Semantic color tokens (beyond stock shadcn)**:
  - `primary-content`, `primary-subtle`, `primary-border`
  - `destructive-subtle`, `destructive-content`
  - `positive`, `positive-subtle`, `positive-content`
  - `info`, `info-subtle`, `info-content`
  - `border-high`, `border-low`
- **Other primitives**:
  - Shadows: `shadow-card`, `shadow-popover`, `shadow-avatar`
  - Radii: `radius-input`, `radius-card`
  - Motion: `scale-pressed` (pressed-state scaling), `ease-smooth`

**Agent rule**: When styling components, **prefer semantic tokens** (e.g. `bg-primary-subtle`, `text-primary-content`, `border-border-high`) instead of raw Tailwind color utilities.

---

### Component conventions

- **Exports and typing**
  - Components are **named function declarations**, not arrow functions.
  - Props are typed with `React.ComponentProps<"element">` where possible.
- **Class names and variants**
  - Use **`class-variance-authority` (`cva`)** for variants.
  - Use the registry’s `cn()` utility from `@/lib/utils` for merging classes.
- **Attributes and structure**
  - Components use `data-slot="component-name"` as a styling hook.
  - Buttons default to **`rounded-full`**.
  - Inputs use **`rounded-input`**.
  - Icons come from `lucide-react`, and components rely on:
    - `[&_svg:not([class*='size-'])]:size-4` for a default icon size.
- **Imports**
  - Import registry primitives from **`@/registry/refer/ui/...`**.
  - Do **not** invent a generic `@/components/ui` path for registry code.

**Agent rule**: When creating or refactoring components, **match these conventions** for exports, typing, and styling.

---

### Path aliases and configuration

- **TypeScript / module resolution**:
  - `@/*` → project root (`tsconfig.json` `baseUrl: "."`).
  - `"react": ["./node_modules/@types/react"]` in `tsconfig.json` is intentional; do not change without understanding Next 15 / React 19 type setup.
- **Shadcn config (`components.json`)**:
  - `components` → `@/components`
  - `ui` → `@/registry/refer/ui`
  - `utils` → `@/lib/utils`
  - `hooks` → `@/hooks`

**Agent rule**: Respect existing aliases in `components.json` and `tsconfig.json`. Changing them will break the `shadcn` CLI workflow and imports across the repo.

---

### Formatting and linting

- **Prettier** is configured in `package.json`:
  - **No semicolons**, **double quotes**, **2-space tabs**, **ES5 trailing commas**.
  - `prettier-plugin-tailwindcss` is used for **Tailwind class sorting**.
  - Import ordering is configured via `importOrder` (React/Next → third party → workspace aliases → relative).
- **ESLint**:
  - Run with `npm run lint` or `npm run lint:fix`.
  - Lint is powered by `eslint-config-next` and `next lint`.

**Agent rules**:

- After making non-trivial edits, prefer to:
  - Run **`npm run format:write`** on touched files (or instruct the user to).
  - Run **`npm run lint`** on the project or relevant sub-tree.
- Do **not** change Prettier or ESLint configuration unless explicitly requested.

---

### Safe-edit checklist for agents

Before finalizing changes, especially those touching the registry:

- **Registry changes**
  - [ ] If you changed anything under `registry/refer/**`, did you also update `scripts/build-registry.mts` as needed?
  - [ ] Did you avoid editing `__registry__/**` by hand?
  - [ ] Have you run or recommended `npm run registry:build`?
  - [ ] Does each item list the Refer components/hooks it imports in `registryDependencies`, with no exact versions in `dependencies` (a major range like `@^4` is fine when the code needs it; for a 0.x package pin the minor series, e.g. `@^0.3.1`)?
  - [ ] Are tokens only in `app/globals.css` (no `cssVars`/`tailwind` on component items)?
- **API and imports**
  - [ ] Did you keep exports as **named function declarations**?
  - [ ] Are you importing UI components from `@/registry/refer/ui/...`?
  - [ ] Are you using `cn()` from `@/lib/utils` for class merging?
- **Styling**
  - [ ] Did you use semantic tokens (`*content`, `*subtle`, `border-*`) instead of raw Tailwind colors?
  - [ ] Did you preserve `data-slot` attributes and default shapes (e.g. `rounded-full` buttons)?
- **Quality**
  - [ ] Did you run or recommend: `npm run lint`, `npm run typecheck`, and `npm run format:write`?
  - [ ] For visual changes, did you suggest running `npm run dev` and checking the relevant `app/` routes?

---

### When in doubt

- **Prefer editing docs/demos** under `components/` and `app/**` if the goal is to change presentation only.
- **Edit `registry/refer/**` and `scripts/build-registry.mts` only** when you intentionally want to change what downstream consumers install.
- **Never manually edit generated files** under `__registry__/`.

If a requested change conflicts with these rules, clearly call out the trade-offs and suggest the safest approach.
