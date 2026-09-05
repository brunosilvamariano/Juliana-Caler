#!/usr/bin/env python3
"""Auditoria local, sem dependências externas, do Premium Foundation."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import json
import sys
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DOCUMENT = ROOT / "index.html"


class Auditor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings = []
        self.images = []
        self.ids = []
        self.invalid_links = []
        self.local_refs = []
        self.anchors = []
        self.controls = []
        self.label_refs = []
        self.desc_refs = []
        self.buttons = []
        self.links = []
        self.mains = 0
        self.meta_description = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        line = self.getpos()[0]

        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.headings.append(tag)
        if tag == "main":
            self.mains += 1
        if tag == "img":
            self.images.append((line, attributes))
        if "id" in attributes:
            self.ids.append(attributes["id"])
        if tag == "a":
            self.links.append((line, attributes))
            href = attributes.get("href", "")
            if href == "#":
                self.invalid_links.append(line)
            elif href.startswith("#") and len(href) > 1:
                self.anchors.append((line, href[1:]))
        if tag == "button":
            self.buttons.append((line, attributes))

        for attr, store in (
            ("aria-controls", self.controls),
            ("aria-labelledby", self.label_refs),
            ("aria-describedby", self.desc_refs),
        ):
            if attributes.get(attr):
                for ref in attributes[attr].split():
                    store.append((line, ref))

        if tag == "meta" and attributes.get("name") == "description":
            self.meta_description = attributes.get("content", "")

        attr_name = {"img": "src", "script": "src", "link": "href"}.get(tag)
        if attr_name and attributes.get(attr_name):
            self.local_refs.append((line, attributes[attr_name]))


def is_local_file_reference(value):
    if value.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
        return False
    parsed = urlparse(value)
    return not parsed.scheme and not parsed.netloc


def audit_json(errors):
    for path in sorted((ROOT / "data").rglob("*.json")):
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError) as exc:
            errors.append(f"JSON inválido em {path.relative_to(ROOT)}: {exc}")


def main():
    auditor = Auditor()
    auditor.feed(DOCUMENT.read_text(encoding="utf-8"))
    errors = []

    if auditor.headings.count("h1") != 1:
        errors.append("A página deve possuir exatamente um h1.")
    if auditor.mains != 1:
        errors.append("A página deve possuir exatamente um elemento main.")
    if not (auditor.meta_description or "").strip():
        errors.append("A meta description não pode estar vazia.")

    for line, image in auditor.images:
        if "alt" not in image:
            errors.append(f"Imagem sem atributo alt na linha {line}.")
        if "width" not in image or "height" not in image:
            errors.append(f"Imagem sem width/height na linha {line}.")

    duplicates = [value for value, count in Counter(auditor.ids).items() if count > 1]
    if duplicates:
        errors.append(f"IDs duplicados: {', '.join(duplicates)}.")
    if auditor.invalid_links:
        errors.append(f"Links com href='#' nas linhas: {', '.join(map(str, auditor.invalid_links))}.")

    known_ids = set(auditor.ids)
    for kind, refs in (
        ("âncora", auditor.anchors),
        ("aria-controls", auditor.controls),
        ("aria-labelledby", auditor.label_refs),
        ("aria-describedby", auditor.desc_refs),
    ):
        for line, ref in refs:
            if ref not in known_ids:
                errors.append(f"Referência {kind} inexistente na linha {line}: {ref}")

    for line, attrs in auditor.links:
        if attrs.get("target") == "_blank":
            rel = set((attrs.get("rel") or "").split())
            if not {"noopener", "noreferrer"}.issubset(rel):
                errors.append(f"Link target=_blank sem noopener+noreferrer na linha {line}.")

    for line, ref in auditor.local_refs:
        if not is_local_file_reference(ref):
            continue
        clean_ref = ref.split("?", 1)[0].split("#", 1)[0]
        if clean_ref and not (ROOT / clean_ref).exists():
            errors.append(f"Referência local inexistente na linha {line}: {ref}")

    audit_json(errors)

    if errors:
        print("AUDITORIA REPROVADA")
        print("\n".join(f"- {error}" for error in errors))
        sys.exit(1)

    print(
        "AUDITORIA APROVADA: semântica estrutural, meta description, imagens, IDs, "
        "âncoras, ARIA, links externos, assets locais e JSON verificados."
    )


if __name__ == "__main__":
    main()
