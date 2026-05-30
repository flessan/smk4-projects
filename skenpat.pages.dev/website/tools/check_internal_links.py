#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SKIP_PREFIXES = ("http://", "https://", "//", "mailto:", "tel:", "#", "javascript:", "data:")


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        attr_map = dict(attrs)
        if tag in {"a", "link"} and "href" in attr_map:
            self.links.append((tag, "href", attr_map["href"]))
        if tag in {"img", "script", "source"} and "src" in attr_map:
            self.links.append((tag, "src", attr_map["src"]))


def resolve_target(html_file: Path, value: str) -> Path | None:
    value = value.split("?", 1)[0].split("#", 1)[0].strip()
    if not value or value.startswith(SKIP_PREFIXES):
        return None

    if value.startswith("/"):
        return ROOT / value.lstrip("/")
    return (html_file.parent / value).resolve()


def exists_target(path: Path) -> bool:
    if path.exists():
        return True
    if path.suffix == "":
        return (path.with_suffix(".html")).exists() or (path / "index.html").exists()
    return False


def main() -> int:
    html_files = [p for p in ROOT.rglob("*.html") if ".git" not in p.parts]
    failures = []

    for html_file in html_files:
        parser = LinkParser()
        parser.feed(html_file.read_text(encoding="utf-8", errors="ignore"))
        for tag, attr, value in parser.links:
            target = resolve_target(html_file, value)
            if target is None:
                continue
            if not exists_target(target):
                failures.append(f"{html_file.relative_to(ROOT)}: <{tag} {attr}=\"{value}\"> -> missing {target.relative_to(ROOT)}")

    if failures:
        print("Broken internal links/assets found:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Checked {len(html_files)} HTML files: no broken internal links/assets found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
