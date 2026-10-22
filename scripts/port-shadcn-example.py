"""Port a shadcn example gallery (e.g. https://ui.shadcn.com/create?item=trace-example) into components/examples/.

Usage:
  curl -s https://ui.shadcn.com/r/styles/radix-vega/<name>-example.json \
    | python3 -c "import json,sys; print(json.load(sys.stdin)['files'][0]['content'])" > /tmp/<name>-example.tsx
  python3 scripts/port-shadcn-example.py /tmp/<name>-example.tsx <name> components/examples/<name>-example.tsx
  npm run typecheck

What it does (see docs/upstream-sync.md): rewrites registry and `cn` imports to Refer paths, `radix-ui` Slot to
@radix-ui/react-slot, IconPlaceholder to its lucide icon, renames the default export to <Name>Example, and drops every
top-level declaration that depends on the AI SDK (`ai`, `@ai-sdk/react`, `streamdown`, `@/lib/ai`), plus the sections
that use them. Review the result: variant names may need mapping to ours, and section names can clash with the export.
"""
import re, sys, os

AI_MODULES = ("ai", "@ai-sdk/react", "streamdown", "@/lib/ai", "@/components/message-parts")

def pascal(name):
    return "".join(p.capitalize() for p in name.split("-"))

def chunks(src):
    """Split into top-level chunks: each starts at a column-0 declaration line."""
    lines = src.split("\n")
    starts = []
    in_tpl = False
    for i, l in enumerate(lines):
        if not in_tpl and re.match(r'^(import|export|function|const|let|type|interface|"use client")\b', l):
            starts.append(i)
        # toggle on each unescaped backtick so lines inside template literals are never chunk starts
        if len(re.findall(r'(?<!\\)`', l)) % 2 == 1:
            in_tpl = not in_tpl
    out = []
    for k, s in enumerate(starts):
        e = starts[k + 1] if k + 1 < len(starts) else len(lines)
        # pull leading comment lines into the chunk
        out.append("\n".join(lines[s:e]))
    head = "\n".join(lines[:starts[0]]) if starts else src
    return head, out

def declared(chunk):
    m = re.match(r'^(?:export\s+(?:default\s+)?)?(?:async\s+)?(?:function|const|let|type|interface)\s+(\w+)', chunk)
    return m.group(1) if m else None

def import_names(chunk):
    m = re.match(r'^import\s+(?:type\s+)?\{([^}]*)\}\s+from', chunk, re.S)
    if not m:
        m2 = re.match(r'^import\s+(?:type\s+)?(\w+)\s+from', chunk)
        return [m2.group(1)] if m2 else []
    return [re.sub(r'^type\s+', '', n.strip()).split(" as ")[-1].strip() for n in m.group(1).split(",") if n.strip()]

def port(src, name, base):
    # --- drop AI-dependent code by fixpoint over identifiers
    head, ch = chunks(src)
    banned = set()
    keep = []
    for c in ch:
        m = re.search(r'from\s+"([^"]+)"', c) if c.startswith("import") else None
        if m and m.group(1) in AI_MODULES:
            banned.update(import_names(c))
        else:
            keep.append(c)
    removed_sections = []
    changed = True
    while changed:
        changed = False
        nxt = []
        for c in keep:
            d = declared(c)
            is_default = c.startswith("export default")
            if not is_default and not c.startswith("import") and banned and re.search(r'\b(' + "|".join(map(re.escape, banned)) + r')\b', c):
                if d:
                    banned.add(d)
                    removed_sections.append(d)
                changed = True
                continue
            nxt.append(c)
        keep = nxt
    src = head + "\n".join(keep)
    # remove <RemovedSection /> lines from the default export
    for d in removed_sections:
        src = re.sub(r'^\s*<' + d + r'\s*/>\n', '', src, flags=re.M)
    # --- conventions
    src = src.replace('import { cn } from "cn"', 'import { cn } from "@/lib/utils"')
    src = re.sub(r'@/registry/(?:radix-vega|base-vega|new-york-v4)/components/example', '@/components/examples/example', src)
    src = re.sub(r'@/registry/(?:radix-vega|base-vega|new-york-v4)/(ui|hooks|lib)/', r'@/registry/refer/\1/', src)
    src = src.replace('import { Slot } from "radix-ui"', 'import { Slot } from "@radix-ui/react-slot"').replace('Slot.Root', 'Slot')
    icons = set()
    def ph(m):
        attrs = m.group(1)
        n = re.search(r'lucide="(\w+)"', attrs).group(1); icons.add(n)
        rest = re.sub(r'\s*(lucide|tabler|hugeicons|phosphor|remixicon)="[^"]*"', '', attrs).strip()
        return f'<{n}{(" " + rest) if rest else ""} />'
    src = re.sub(r'<IconPlaceholder\s+((?:[\w-]+=(?:"[^"]*"|\{[^{}]*\})\s*)+)/>', ph, src)
    src = re.sub(r'import \{ IconPlaceholder \} from "[^"]+"\n', '', src)
    # default export -> named export <Pascal>Example
    src = re.sub(r'^export default function \w+', f'export function {pascal(name)}Example', src, flags=re.M)
    src = src.replace('"use client"\n', '')
    imports = ""
    if icons:
        imports = 'import { ' + ", ".join(sorted(icons)) + ' } from "lucide-react"\n'
    src = '"use client"\n\n' + imports + src.lstrip()
    assert "IconPlaceholder" not in src, name
    return src, removed_sections

if __name__ == "__main__":
    srcfile, name, out = sys.argv[1], sys.argv[2], sys.argv[3]
    s, removed = port(open(srcfile).read(), name, None)
    open(out, "w").write(s)
    print(f"{name}: removed {removed}")
