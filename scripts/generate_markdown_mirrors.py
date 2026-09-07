#!/usr/bin/env python3
"""
generate_markdown_mirrors.py

Converts every prerendered index.html in dist/ into a clean index.md
for AI crawler consumption (ChatGPT, Claude, Perplexity, etc.).

Run after `npm run build`:
  python3 scripts/generate_markdown_mirrors.py

The resulting index.md files sit alongside index.html and are served at:
  https://gcwindowandpressurecleaning.com.au/window-cleaning/burleigh-heads/index.md
"""

import os
import re
import sys
from pathlib import Path
from datetime import date

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: beautifulsoup4 not installed. Run:")
    print("  pip3 install beautifulsoup4 markdownify --break-system-packages")
    sys.exit(1)

try:
    import markdownify as md_lib
except ImportError:
    print("ERROR: markdownify not installed. Run:")
    print("  pip3 install beautifulsoup4 markdownify --break-system-packages")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

DIST_DIR = Path(__file__).parent.parent / "dist"
TODAY = date.today().isoformat()
SITE_URL = "https://gcwindowandpressurecleaning.com.au"

# Page paths to skip (noindex or utility pages)
# /privacy is deliberately NOT skipped: agents check it as a trust anchor when
# deciding whether a business is legitimate, so it needs a markdown mirror too.
SKIP_PATH_SEGMENTS = {"404", "thanks", "thank-you", "terms"}

# HTML tags to remove entirely (content dropped)
STRIP_TAGS = ["script", "style", "noscript", "iframe", "svg", "form", "button"]

# Semantic structural elements to remove (site chrome, not content)
STRIP_ELEMENTS = ["nav", "header", "footer"]

# Class substrings — any element whose class contains one of these is removed
STRIP_CLASS_SUBSTRINGS = [
    "nav", "footer", "header", "cookie", "chat-widget",
    "cta-split", "modal", "overlay", "toast", "sticky",
    "ghl", "hubspot", "intercom",
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def should_skip(rel_path: Path) -> bool:
    """Return True if this page should be excluded from mirror generation."""
    parts = {p.lower() for p in rel_path.parts}
    return bool(parts & SKIP_PATH_SEGMENTS)


def strip_noise(soup: BeautifulSoup) -> None:
    """Remove navigation, scripts, and other chrome in-place."""

    # 1. Tags whose content is never useful
    for tag in STRIP_TAGS:
        for el in soup.find_all(tag):
            el.decompose()

    # 2. Semantic chrome elements
    for tag in STRIP_ELEMENTS:
        for el in soup.find_all(tag):
            el.decompose()

    # 3. Any element whose class list contains a noise keyword
    for el in soup.find_all(True):
        classes = " ".join(el.get("class", [])).lower()
        if any(sub in classes for sub in STRIP_CLASS_SUBSTRINGS):
            el.decompose()

    # 4. Drop empty div/span wrappers (no visible text)
    changed = True
    while changed:
        changed = False
        for el in soup.find_all(["div", "span", "section", "aside"]):
            if not el.get_text(strip=True):
                el.decompose()
                changed = True


def extract_meta(soup: BeautifulSoup, rel_path: Path) -> dict:
    """Pull title, description, and canonical URL from <head>."""
    title = ""
    description = ""
    url = ""

    title_tag = soup.find("title")
    if title_tag:
        title = title_tag.get_text(strip=True)

    desc_tag = soup.find("meta", attrs={"name": "description"})
    if desc_tag:
        description = desc_tag.get("content", "").strip()

    canonical_tag = soup.find("link", attrs={"rel": "canonical"})
    if canonical_tag:
        url = canonical_tag.get("href", "").strip()

    if not url:
        clean = str(rel_path).strip("/") if str(rel_path) != "." else ""
        url = f"{SITE_URL}/{clean}" if clean else SITE_URL

    return {"title": title, "description": description, "url": url}


def build_frontmatter(meta: dict) -> str:
    """Return YAML frontmatter block."""
    # Escape double quotes in strings
    title = meta["title"].replace('"', '\\"')
    description = meta["description"].replace('"', '\\"')
    return (
        f'---\n'
        f'title: "{title}"\n'
        f'description: "{description}"\n'
        f'url: {meta["url"]}\n'
        f'last_updated: {TODAY}\n'
        f'---\n\n'
    )


def clean_markdown(md: str) -> str:
    """Post-process raw markdownify output into clean readable markdown."""

    # Collapse 3+ consecutive blank lines to 2
    md = re.sub(r'\n{3,}', '\n\n', md)

    # Strip standalone step numbers ("01", "02", etc.) on their own line
    md = re.sub(r'^\s*\d{2}\s*$', '', md, flags=re.MULTILINE)

    # Remove bullet-separator-only lines (•, –, —, etc.)
    md = re.sub(r'^\s*[•\-–—]\s*$', '', md, flags=re.MULTILINE)

    # Remove empty image tags  ![]( ... )
    md = re.sub(r'!\[\]\([^)]*\)', '', md)

    # Remove lines that are only whitespace
    md = re.sub(r'^[ \t]+$', '', md, flags=re.MULTILINE)

    # Remove repeated dollar-sign-only lines or icon-only lines
    md = re.sub(r'^\s*[\$\*\_]{1,3}\s*$', '', md, flags=re.MULTILINE)

    # Final collapse of excessive blank lines
    md = re.sub(r'\n{3,}', '\n\n', md)

    return md.strip()


def update_llms_txt(mirror_urls: list[str]) -> None:
    """Write dist/llms-full.txt, and point dist/llms.txt at it.

    llmstxt.org describes llms.txt as a short navigation index: a heading, a
    summary, and markdown links to the detail. Inlining ~1,200 mirror URLs made
    it a 120 KB wall of text an agent had to read past to find anything, and
    duplicated the sitemap. The list still ships in full — it just lives in
    llms-full.txt, which is the spec's own name for the long companion file.
    """
    llms_file = DIST_DIR / "llms.txt"
    if not llms_file.exists():
        print("  WARN: dist/llms.txt not found — skipping llms.txt update")
        return

    url_list = "\n".join(f"- {url}" for url in sorted(mirror_urls))
    full_file = DIST_DIR / "llms-full.txt"
    full_file.write_text(
        "# Gold Coast Window and Pressure Cleaning — markdown mirror index\n\n"
        "> Every page on this site has a plain markdown mirror: the content without "
        "navigation, scripts or layout chrome.\n\n"
        "Fetch any page as markdown by appending `.md` to its URL "
        "(/window-cleaning.md), by appending `index.md` (/window-cleaning/index.md), "
        "or by sending `Accept: text/markdown`. Every mirror below is a live URL.\n\n"
        f"## Markdown Mirrors ({len(mirror_urls)} page{'' if len(mirror_urls) == 1 else 's'})\n\n"
        f"{url_list}\n",
        encoding="utf-8",
    )
    print(f"  ✓ llms-full.txt written with {len(mirror_urls)} mirror URLs")

    existing = llms_file.read_text(encoding="utf-8")

    mirrors_section = (
        "## Markdown Mirrors\n"
        "Every page on this site has a plain markdown mirror. Append `.md` to a page URL "
        "(/window-cleaning.md), append `index.md` (/window-cleaning/index.md), or send "
        "`Accept: text/markdown`.\n\n"
        f"- [Full mirror index ({len(mirror_urls)} page{'' if len(mirror_urls) == 1 else 's'})]({SITE_URL}/llms-full.txt)\n"
        f"- [Sitemap index]({SITE_URL}/sitemap.xml)\n"
    )

    # Replace an existing section if present, otherwise append.
    marker = "## Markdown Mirrors"
    if marker in existing:
        before = existing[:existing.index(marker)]
        after_raw = existing[existing.index(marker):]
        # Find the next top-level section after the mirrors block
        next_section = re.search(r'\n## ', after_raw[3:])  # skip past current ##
        if next_section:
            after = after_raw[next_section.start() + 1:]
            new_content = before.rstrip() + "\n\n" + mirrors_section + "\n" + after
        else:
            new_content = before.rstrip() + "\n\n" + mirrors_section
    else:
        new_content = existing.rstrip() + "\n\n" + mirrors_section

    llms_file.write_text(new_content, encoding="utf-8")
    print(f"  ✓ llms.txt now points at llms-full.txt ({len(new_content)} chars)")


def process_page(html_file: Path) -> bool:
    """Convert one index.html to index.md. Returns True if successful."""
    rel_path = html_file.parent.relative_to(DIST_DIR)

    if should_skip(rel_path):
        return False

    try:
        html = html_file.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  WARN: Could not read {html_file}: {e}")
        return False

    soup = BeautifulSoup(html, "html.parser")

    # Extract meta from <head> before we strip anything
    meta = extract_meta(soup, rel_path)

    # Find the main content container
    content = (
        soup.find("main")
        or soup.find(id="root")
        or soup.find("body")
    )
    if not content:
        return False

    # Remove site chrome from content
    strip_noise(content)

    # Convert to markdown (strip anchor hrefs — keep link text only)
    md_raw = md_lib.markdownify(
        str(content),
        heading_style="ATX",
        bullets="-",
        strip=["a", "img"],   # keep text, drop noisy href/src attributes
        newline_style="backslash",
    )

    md_clean = clean_markdown(md_raw)

    if not md_clean or len(md_clean) < 50:
        return False  # Skip pages with no meaningful content

    output = build_frontmatter(meta) + md_clean

    out_file = html_file.parent / "index.md"
    try:
        out_file.write_text(output, encoding="utf-8")
    except Exception as e:
        print(f"  WARN: Could not write {out_file}: {e}")
        return False

    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    if not DIST_DIR.exists():
        print(f"ERROR: dist/ not found at {DIST_DIR}")
        print("Run `npm run build` first, then rerun this script.")
        sys.exit(1)

    html_files = sorted(DIST_DIR.rglob("index.html"))
    total = len(html_files)

    print(f"Gold Coast Window & Pressure — Markdown Mirror Generator")
    print(f"{'─' * 55}")
    print(f"Found {total} HTML files in dist/")
    print(f"Generating markdown mirrors...\n")

    generated = 0
    skipped = 0
    errors = 0
    mirror_urls = []

    for html_file in html_files:
        try:
            result = process_page(html_file)
            if result:
                generated += 1
                # Build the public URL for this mirror
                rel = html_file.parent.relative_to(DIST_DIR)
                rel_str = str(rel).strip(".")
                if rel_str:
                    mirror_urls.append(f"{SITE_URL}/{rel_str}/index.md")
                else:
                    mirror_urls.append(f"{SITE_URL}/index.md")
                if generated % 100 == 0:
                    print(f"  ✓ {generated} mirrors generated so far...")
            else:
                skipped += 1
        except Exception as e:
            errors += 1
            rel = html_file.relative_to(DIST_DIR)
            print(f"  ERROR processing {rel}: {e}")

    # Update llms.txt with the full mirror URL list
    print(f"\nUpdating llms.txt...")
    update_llms_txt(mirror_urls)

    print(f"\n{'─' * 55}")
    print(f"  ✓ Generated : {generated} markdown mirrors")
    print(f"  ↷ Skipped   : {skipped} pages (noindex/utility)")
    if errors:
        print(f"  ✗ Errors    : {errors} pages failed")
    print(f"  📁 Output   : dist/**/index.md")
    print(f"  🌐 Example  : {SITE_URL}/window-cleaning/burleigh-heads/index.md")


if __name__ == "__main__":
    main()
