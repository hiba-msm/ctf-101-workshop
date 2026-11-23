#!/usr/bin/env python3
"""Build the participant site: the presentation plus every guide rendered to static HTML.

    python scripts/build_participant_site.py

Output goes to dist/ (git-ignored). Upload that folder to any static host; nothing in it
links to this (private) repository. Markdown is rendered by GitHub's public Markdown API,
so the pages look like they do on github.com. It needs internet access but no token.
The build ends with a self-check that every relative link and #anchor in dist/ resolves.
"""
import html
import json
import re
import shutil
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
DOCS = ["README.md", "CONTRIBUTING.md"] + sorted(p.relative_to(ROOT).as_posix() for p in (ROOT / "docs").rglob("*.md"))
CSS = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.min.css"
MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"

PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{title} · CTF 101</title>
<link rel="stylesheet" href="{css}">
<style>
  body {{ margin: 0; background: #000; }}
  .top {{ display: flex; flex-wrap: wrap; gap: 8px 22px; padding: 12px 24px; border-bottom: 1px solid #1d3a3c;
          font: 600 15px/1.4 system-ui, sans-serif; }}
  .top a {{ color: #36e2ea; text-decoration: none; }}
  .top a:hover {{ text-decoration: underline; }}
  .markdown-body {{ box-sizing: border-box; max-width: 980px; margin: 0 auto; padding: 32px 24px 64px; background: transparent; }}
  .markdown-body a {{ color: #36e2ea; }}
  @media (max-width: 767px) {{ .markdown-body {{ padding: 20px 16px 48px; }} }}
</style>
</head>
<body>
<nav class="top"><a href="{root}index.html">&#9654; CTF 101 presentation</a><a href="{root}README.html">Workshop resources</a></nav>
<main class="markdown-body">
{body}
</main>
{scripts}</body>
</html>
"""


def render(markdown):
    """Render Markdown exactly as github.com does (alerts, tables, task lists)."""
    req = urllib.request.Request(
        "https://api.github.com/markdown",
        data=json.dumps({"text": markdown, "mode": "gfm"}).encode(),
        headers={"Accept": "application/vnd.github+json", "Content-Type": "application/json",
                 "User-Agent": "ctf101-participant-site-builder"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode()


def slug(heading_html):
    """GitHub's heading-anchor rule: lowercase, drop punctuation, spaces become hyphens."""
    text = html.unescape(re.sub(r"<[^>]+>", "", heading_html)).strip().lower()
    return re.sub(r"[^\w\- ]", "", text).replace(" ", "-")


def add_heading_ids(body):
    # The unauthenticated API omits heading ids, so add them (with GitHub's -1, -2 de-duplication).
    seen = {}

    def rep(m):
        s = slug(m.group(3))
        n = seen.get(s, 0)
        seen[s] = n + 1
        return f'<{m.group(1)} id="{s if n == 0 else f"{s}-{n}"}"{m.group(2)}>{m.group(3)}</{m.group(1)}>'
    return re.sub(r"<(h[1-6])([^>]*)>(.*?)</\1>", rep, body, flags=re.S)


def local_href(url):
    """Point relative links at the built files: .md -> .html, LICENSE -> LICENSE.txt."""
    if re.match(r"^([a-z][a-z0-9+.-]*:|#|//)", url, re.I):
        return url
    path, sep, frag = url.partition("#")
    if path.endswith(".md"):
        path = path[:-3] + ".html"
    elif path.endswith("LICENSE"):
        path += ".txt"
    return path + sep + frag


# href/src attributes of real tags only (code samples are HTML-escaped, so they never match)
ATTR = re.compile(r'(<[a-z][a-z0-9]*\b[^<>]*?\s(?:href|src)=")([^"]+)"', re.I)


def fix_links(body):
    return ATTR.sub(lambda m: f'{m.group(1)}{local_href(m.group(2))}"', body)


def fix_mermaid(body):
    # GitHub returns highlighted code; mermaid.js needs the plain diagram source.
    return re.sub(r'<div class="highlight highlight-source-mermaid"><pre[^>]*>(.*?)</pre></div>',
                  lambda m: '<pre class="mermaid">' + re.sub(r"<[^>]+>", "", m.group(1)) + "</pre>",
                  body, flags=re.S)


def build_doc(rel):
    src = (ROOT / rel).read_text(encoding="utf-8")
    body = fix_mermaid(fix_links(add_heading_ids(render(src))))
    title_m = re.search(r"^#\s+(.+)$", src, re.M)
    depth = rel.count("/")
    scripts = ""
    if 'class="mermaid"' in body:
        scripts = (f'<script src="{MERMAID}"></script>\n'
                   "<script>mermaid.initialize({ startOnLoad: true, theme: 'dark' });</script>\n")
    out = DIST / rel[:-3]
    out = out.with_name(out.name + ".html")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(PAGE.format(title=html.escape(title_m.group(1) if title_m else rel), css=CSS,
                               root="../" * depth, body=body, scripts=scripts), encoding="utf-8")


def build_deck():
    for d in ("css", "js", "assets"):
        shutil.copytree(ROOT / d, DIST / d)
    deck = (ROOT / "index.html").read_text(encoding="utf-8")
    # Guides are hosted next to the deck, so drop the GitHub redirect and link the .html copies.
    deck = re.sub(r'\s+data-docs-base="[^"]*"', "", deck)
    deck = re.sub(r'(data-doc href=")([^"]+)\.md"', r'\1\2.html"', deck)
    deck = deck.replace("<head>", '<head>\n<meta name="robots" content="noindex">', 1)
    (DIST / "index.html").write_text(deck, encoding="utf-8")
    shutil.copy(ROOT / "LICENSE", DIST / "LICENSE.txt")


def self_check():
    """Fail the build if any relative link or #anchor in dist/ is broken."""
    ids = {p: set(re.findall(r'\bid="([^"]+)"', p.read_text(encoding="utf-8"))) for p in DIST.rglob("*.html")}
    problems = []
    for page in ids:
        for _, url in ATTR.findall(page.read_text(encoding="utf-8")):
            if re.match(r"^([a-z][a-z0-9+.-]*:|//)", url, re.I):
                continue
            path, _, frag = url.partition("#")
            if frag.isdigit():  # the deck's slide routes (#1 … #36), handled by deck.js
                frag = ""
            target = (page.parent / path).resolve() if path else page.resolve()
            if not target.exists():
                problems.append(f"{page.relative_to(DIST)}: missing {url}")
            elif frag and target.suffix == ".html" and frag not in ids.get(target, set()):
                problems.append(f"{page.relative_to(DIST)}: bad anchor {url}")
    if problems:
        raise SystemExit("Broken links:\n  " + "\n  ".join(problems))


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    build_deck()
    for rel in DOCS:
        build_doc(rel)
        print("rendered", rel)
    self_check()
    files = [p for p in DIST.rglob("*") if p.is_file()]
    print(f"OK: {len(files)} files, {sum(p.stat().st_size for p in files) // 1024} KiB in {DIST}")


if __name__ == "__main__":
    main()
