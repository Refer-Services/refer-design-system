"""Port a shadcn example gallery (e.g. https://ui.shadcn.com/create?item=trace-example) into components/examples/.

Usage:
  curl -s https://ui.shadcn.com/r/styles/radix-vega/<name>-example.json \
    | python3 -c "import json,sys; print(json.load(sys.stdin)['files'][0]['content'])" > /tmp/<name>-example.tsx
  python3 scripts/port-shadcn-example.py /tmp/<name>-example.tsx <name> components/examples/<name>-example.tsx
  npm run typecheck

What it does (see docs/upstream-sync.md): rewrites registry and `cn` imports to Refer paths, `radix-ui` Slot to
@radix-ui/react-slot, IconPlaceholder to its lucide icon, renames the default export to <Name>Example, and drops every
top-level declaration that depends on the AI SDK (`ai`, `@ai-sdk/react`, `streamdown`, `@/lib/ai`), plus the sections
that use them. Then it writes class names in logical terms (ml-2 -> ms-2, left-0 -> inset-s-0, text-right -> text-end,
rounded-l -> rounded-s, border-r -> border-e; the convention in CLAUDE.md) and lists what it left for a person: a class
list that also moves by a side (translate-x, slide-in-from-left, origin-right), a rotate next to an rtl: flip, an icon
that points left or right without rtl:-scale-x-100, a physical inline style. Review the result: variant names may need
mapping to ours, and section names can clash with the export.

  python3 scripts/port-shadcn-example.py --logical <file.tsx>...   # the logical pass alone, on files in place
"""
import re, sys, os

# --- logical classes (the rules of @refer/i18n's refer-i18n/logical-classes lint, olympus-backend libs/ts/i18n) -----
SIDE = {"l": "s", "r": "e"}
CORNER = {"l": "s", "r": "e", "tl": "ss", "tr": "se", "bl": "es", "br": "ee"}
CENTRE = {"1/2", "[50%]"}  # left-1/2 with its translate centres whatever the direction: it stays
PHYSICAL_VARIANT = re.compile(r"=(?:left|right)\b")  # data-[side=left]: follows a side chosen by name: stays
PHYSICAL_MOTION = re.compile(r"^!?-?(?:translate-x-|slide-(?:in-from|out-to)-(?:left|right)|origin-(?:top-|bottom-)?(?:left|right))")
DIRECTIONAL_ICON = re.compile(r"<((?:Icon)?(?:Chevrons?|Arrow|ArrowBig|Move|Caret)(?:Left|Right)(?:Icon)?)\b([^>]*)>")
PHYSICAL_STYLE = re.compile(r"\b(marginLeft|marginRight|paddingLeft|paddingRight|borderLeft\w*|borderRight\w*|borderTopLeftRadius|borderTopRightRadius|borderBottomLeftRadius|borderBottomRightRadius)\s*:|\btextAlign:\s*[\"'](?:left|right)[\"']|translateX\(")
LOGICAL = [
    (re.compile(r"^(scroll-)?([mp])([lr])-(.+)$"), lambda m: f"{m[1] or ''}{m[2]}{SIDE[m[3]]}-{m[4]}"),
    (re.compile(r"^(left|right)-(.+)$"), lambda m: None if m[2] in CENTRE else f"inset-{'s' if m[1] == 'left' else 'e'}-{m[2]}"),
    (re.compile(r"^text-(left|right)$"), lambda m: f"text-{'start' if m[1] == 'left' else 'end'}"),
    (re.compile(r"^rounded-(l|r|tl|tr|bl|br)(-.+)?$"), lambda m: f"rounded-{CORNER[m[1]]}{m[2] or ''}"),
    (re.compile(r"^border-(l|r)(-.+)?$"), lambda m: f"border-{SIDE[m[1]]}{m[2] or ''}"),
    (re.compile(r"^(float|clear)-(left|right)$"), lambda m: f"{m[1]}-{'start' if m[2] == 'left' else 'end'}"),
]

def split_variants(token):
    depth, cut = 0, -1
    for i, ch in enumerate(token):
        if ch == "[": depth += 1
        elif ch == "]": depth -= 1
        elif ch == ":" and depth == 0: cut = i
    return token[: cut + 1], token[cut + 1 :]

def logical_class(token):
    """The logical class for a physical one ("md:-ml-2" -> "md:-ms-2"), or None when it has none or needs none."""
    variants, rest = split_variants(token)
    if PHYSICAL_VARIANT.search(variants):
        return None
    head = "!" if rest.startswith("!") else ""
    tail = "!" if not head and rest.endswith("!") else ""
    bare = rest[len(head) : len(rest) - len(tail)]
    neg = "-" if bare.startswith("-") else ""
    utility = bare[len(neg) :]
    for pattern, fn in LOGICAL:
        m = pattern.match(utility)
        if m:
            written = fn(m)
            return f"{variants}{head}{neg}{written}{tail}" if written else None
    return None

CLASSY = re.compile(r"^[!\-]?[a-z0-9@*\[][^\s]*$")
STRING = re.compile(r"""(?P<q>["`])(?P<body>(?:\\.|(?!(?P=q)).)*)(?P=q)""", re.S)
CLASS_ATTR = re.compile(r"(?:className|\w+ClassName)=\{?$")
OTHER_ATTR = re.compile(r"\b\w+=\{?$")

def logical_pass(src, name="file"):
    """Rewrite physical classes to logical ones in class lists; return the source and what to look at by hand."""
    notes = []
    def line_of(i):
        return src.count("\n", 0, i) + 1
    def repl(m):
        body = m.group("body")
        tokens = body.split()
        if not tokens or not all(CLASSY.match(t) for t in tokens) or "${" in body:
            return m.group(0)
        before = src[max(0, m.start() - 40) : m.start()]
        if OTHER_ATTR.search(before) and not CLASS_ATTR.search(before):
            return m.group(0)  # side="left", title="...": not a class list
        found = [(t, logical_class(t)) for t in tokens]
        found = [(t, l) for t, l in found if l]
        if not found:
            return m.group(0)
        if any(split_variants(t)[1].startswith(("rotate-", "-rotate-")) for t in tokens) and any(t.split(":")[-1].lstrip("-!").startswith("rounded-") for t, _ in found):
            notes.append(f"{name}:{line_of(m.start())}: {' '.join(t for t, _ in found)} rounds a corner of a rotated box: which corner is a tip is physical, keep it")
            return m.group(0)
        if any(PHYSICAL_MOTION.match(split_variants(t)[1]) for t in tokens):
            notes.append(f"{name}:{line_of(m.start())}: {' '.join(t for t, _ in found)} moves with a side (translate-x, slide-in, origin): turn the motion with an rtl: variant, or keep it physical")
            return m.group(0)
        mapping = dict(found)
        new_body = re.sub(r"[^\s]+", lambda t: mapping.get(t.group(0), t.group(0)), body)
        return m.group("q") + new_body + m.group("q")
    out = STRING.sub(repl, src)
    for m in re.finditer(r"""(?:className|\w+ClassName)=["'`{][^\n]*""", out):
        text = m.group(0)
        if re.search(r"\brotate-", text) and "rtl:-scale-x-100" in text and "rtl:" not in text.replace("rtl:-scale-x-100", ""):
            notes.append(f"{name}:{out.count(chr(10), 0, m.start()) + 1}: a rotate next to rtl:-scale-x-100 points the other way in right-to-left: add the rtl: counter-rotation")
    for m in DIRECTIONAL_ICON.finditer(out):
        if "rtl:" not in m.group(2):
            turn = " (it rotates: counter-rotate it under rtl: too)" if "rotate-" in m.group(2) else ""
            notes.append(f"{name}:{out.count(chr(10), 0, m.start()) + 1}: <{m.group(1)}> points to a side: add rtl:-scale-x-100 if it means next or back{turn}")
    for m in PHYSICAL_STYLE.finditer(out):
        notes.append(f"{name}:{out.count(chr(10), 0, m.start()) + 1}: physical inline style ({m.group(0).strip()}): write it in logical terms or mirror it")
    return out, notes

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
    if sys.argv[1] == "--logical":
        for path in sys.argv[2:]:
            src = open(path).read()
            out, notes = logical_pass(src, path)
            if out != src:
                open(path, "w").write(out)
                print(f"{path}: logical classes written")
            for note in notes:
                print("  review:", note)
        sys.exit(0)
    srcfile, name, out = sys.argv[1], sys.argv[2], sys.argv[3]
    s, removed = port(open(srcfile).read(), name, None)
    s, notes = logical_pass(s, out)
    open(out, "w").write(s)
    print(f"{name}: removed {removed}")
    for note in notes:
        print("  review:", note)
