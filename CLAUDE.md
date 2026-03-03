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
2. Add or update its entry in `scripts/build-registry.mts`.
3. Run `npm run registry:build`.
4. Optionally add a `*-demo.tsx` in `components/` and wire it into the relevant `app/(app)/` route.

## App router structure (docs site)

- `app/(app)/` — main gallery/kitchen-sink with navigation
- `app/(examples)/` — full-page layouts (dashboards, login flows)
- `app/(view)/view/[name]/` — individual component viewer
- `app/preview/[base]/[name]/` — isolated preview routes

## Component conventions

- **Named function declarations** (not arrow functions), props typed with `React.ComponentProps<"element">`.
- Use **`cva`** (class-variance-authority) for variants.
- Use `cn()` from `@/lib/utils` for class merging.
- Add `data-slot="component-name"` as a styling hook.
- Buttons default to `rounded-full`; inputs use `rounded-input`.
- Icons from `lucide-react`; rely on `[&_svg:not([class*='size-'])]:size-4` for default icon sizing.
- Import registry primitives from `@/registry/refer/ui/...`, **not** `@/components/ui`.

## Design tokens

Token sources: `app/globals.css` and `registry/refer/styles/refer-style.json`.

**Prefer semantic tokens over raw Tailwind color utilities:**

- Brand: `--color-refer-50` → `--color-refer-950` (warm red scale)
- Semantic colors: `primary-content`, `primary-subtle`, `primary-border`, `destructive-subtle`, `destructive-content`, `positive`, `positive-subtle`, `positive-content`, `info`, `info-subtle`, `info-content`, `border-high`, `border-low`
- Shadows: `shadow-card`, `shadow-popover`, `shadow-avatar`
- Radii: `radius-input`, `radius-card`
- Motion: `scale-pressed`, `ease-smooth`

## Formatting

Prettier config (in `package.json`): no semicolons, double quotes, 2-space tabs, ES5 trailing commas, Tailwind class sorting via `prettier-plugin-tailwindcss`.

Import order: React/Next → third-party → workspace aliases (`@workspace/*`) → `@/types`, `@/config`, `@/lib`, `@/hooks`, `@/components/ui`, `@/components`, `@/registry` → relative.

## Path aliases

- `@/*` → project root (`tsconfig.json` `baseUrl: "."`)
- Shadcn config (`components.json`): `ui` → `@/registry/refer/ui`, `utils` → `@/lib/utils`, `hooks` → `@/hooks`

Do not change these aliases — they are required for the `shadcn` CLI workflow.
