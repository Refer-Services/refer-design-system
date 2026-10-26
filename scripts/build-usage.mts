// Builds data/usage.json: for every Refer UI component, which consuming app installs it, whether the app's copy
// matches the DS source, and which files import it. The docs site reads the JSON (it can't see the monorepo).
//
//   REFER_APPS_DIR=../olympus-backend/apps npm run usage:build
import { execSync } from "child_process"
import { existsSync, promises as fs, readFileSync } from "fs"
import path from "path"

const ROOT = process.cwd()
const APPS_DIR = path.resolve(
  ROOT,
  process.env.REFER_APPS_DIR ?? "../olympus-backend/apps"
)
const APPS = [
  { id: "portal", dir: "portal-frontend" },
  { id: "argus", dir: "argus-frontend" },
  { id: "landing", dir: "landing-frontend" },
  { id: "partners", dir: "partners-frontend" },
] as const
const SKIP_DIRS = new Set(["node_modules", ".next", "tests", "__tests__", "ui"])

type Status = "identical" | "diverged" | "missing"
type AppUsage = { status: Status; files: string[] }

// The DS file as the shadcn CLI writes it into an app (registry paths rewritten to the app's aliases).
function asInstalled(source: string) {
  return source
    .replaceAll("@/registry/refer/ui/", "@/components/ui/")
    .replaceAll("@/registry/refer/hooks/", "@/hooks/")
    .replaceAll("@/registry/refer/lib/", "@/lib/")
}

function normalize(source: string) {
  return source
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim()
}

async function sourceFiles(dir: string): Promise<string[]> {
  const out: string[] = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith(".")) {
        out.push(...(await sourceFiles(path.join(dir, entry.name))))
      }
    } else if (
      /\.(tsx?|mdx)$/.test(entry.name) &&
      !/\.test\./.test(entry.name)
    ) {
      out.push(path.join(dir, entry.name))
    }
  }
  return out
}

async function main() {
  if (!existsSync(APPS_DIR)) {
    throw new Error(`Apps not found at ${APPS_DIR}. Set REFER_APPS_DIR.`)
  }

  const registry = JSON.parse(
    readFileSync(path.join(ROOT, "registry.json"), "utf-8")
  )
  const names: string[] = registry.items
    .filter((item: { type: string }) => item.type === "registry:ui")
    .map((item: { name: string }) => item.name)
    .sort()

  const components: Record<string, Record<string, AppUsage>> = {}
  for (const name of names) components[name] = {}

  for (const app of APPS) {
    const appDir = path.join(APPS_DIR, app.dir)
    const files = await sourceFiles(appDir)
    const contents = await Promise.all(
      files.map((file) => fs.readFile(file, "utf-8"))
    )

    for (const name of names) {
      const installed = path.join(appDir, "components/ui", `${name}.tsx`)
      let status: Status = "missing"
      if (existsSync(installed)) {
        const ds = readFileSync(
          path.join(ROOT, "registry/refer/ui", `${name}.tsx`),
          "utf-8"
        )
        const local = readFileSync(installed, "utf-8")
        status =
          normalize(asInstalled(ds)) === normalize(local)
            ? "identical"
            : "diverged"
      }

      const importPattern = new RegExp(`["']@/components/ui/${name}["']`)
      const importers = files
        .filter((_, index) => importPattern.test(contents[index]))
        .map((file) => path.relative(appDir, file))
        .sort()

      components[name][app.id] = { status, files: importers }
    }
  }

  let source = "unknown"
  try {
    source = execSync("git rev-parse --short HEAD", { cwd: APPS_DIR })
      .toString()
      .trim()
  } catch {}

  const data = {
    generatedAt: new Date().toISOString(),
    source: { repo: "olympus-backend", commit: source },
    apps: APPS.map((app) => app.id),
    components,
  }

  await fs.mkdir(path.join(ROOT, "data"), { recursive: true })
  await fs.writeFile(
    path.join(ROOT, "data/usage.json"),
    JSON.stringify(data, null, 2) + "\n"
  )

  const used = names.filter((name) =>
    APPS.some((app) => components[name][app.id].files.length)
  )
  console.log(
    `✅ data/usage.json: ${names.length} components, ${used.length} imported by some app.`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
