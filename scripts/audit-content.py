#!/usr/bin/env python3
"""Audita o Content Engine JSON sem modificar o projeto."""
from pathlib import Path
from urllib.parse import urlparse
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "data" / "content"
INDEX = ROOT / "index.html"
errors = []
warnings = []


def fail(message):
    errors.append(message)


def load_json(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        fail(f"JSON inválido: {path.relative_to(ROOT)} — {exc}")
        return None


def require(obj, path, label):
    value = obj
    for key in path.split("."):
        if not isinstance(value, dict) or key not in value:
            fail(f"Campo obrigatório ausente em {label}: {path}")
            return None
        value = value[key]
    return value


def local_asset(value):
    if not isinstance(value, str) or not value:
        return
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc or value.startswith("#"):
        return
    target = ROOT / value.split("?", 1)[0].split("#", 1)[0]
    if not target.exists():
        fail(f"Asset local inexistente referenciado pelo conteúdo: {value}")


def check_count(label, json_items, html_count):
    if not isinstance(json_items, list):
        fail(f"{label}: lista ausente ou inválida no JSON.")
        return
    if len(json_items) != html_count:
        fail(f"{label}: JSON possui {len(json_items)} item(ns), HTML possui {html_count} slot(s).")


manifest_path = CONTENT / "manifest.json"
manifest = load_json(manifest_path) if manifest_path.exists() else None
if not manifest:
    fail("Manifest do Content Engine ausente ou inválido.")
    files = {}
else:
    files = manifest.get("files", {})
    if manifest.get("version") != 1:
        warnings.append("Versão do manifest diferente de 1; revisar compatibilidade do loader.")

required_files = {
    "site", "navigation", "cta", "hero", "marquee",
    "about", "services", "projects", "faq", "contact"
}
missing_keys = required_files - set(files)
if missing_keys:
    fail("Manifest sem entradas obrigatórias: " + ", ".join(sorted(missing_keys)))

loaded = {}
for key, filename in files.items():
    path = CONTENT / filename
    if not path.exists():
        fail(f"Arquivo listado no manifest não existe: data/content/{filename}")
        continue
    loaded[key] = load_json(path)

html = INDEX.read_text(encoding="utf-8")
html_ids = set(re.findall(r'\bid=["\']([^"\']+)["\']', html))

# Campos centrais.
if loaded.get("site"):
    site = loaded["site"]
    require(site, "meta.title", "site.json")
    require(site, "meta.description", "site.json")
    local_asset(require(site, "brand.logo", "site.json"))
    local_asset(require(site, "brand.icon", "site.json"))

if loaded.get("navigation"):
    items = loaded["navigation"].get("items")
    check_count("Navegação", items, html.count("data-sidebar-link"))
    if isinstance(items, list):
        for item in items:
            href = item.get("href")
            if isinstance(href, str) and href.startswith("#") and href[1:] not in html_ids:
                fail(f"Navegação aponta para ID inexistente: {href}")
            local_asset(item.get("icon"))

if loaded.get("cta"):
    expected = {"calendar", "minimal"}
    variants = loaded["cta"].get("variants", {})
    if set(variants) != expected:
        fail("cta.json não possui exatamente as duas variantes oficiais.")
    for name in expected:
        data = variants.get(name, {})
        for field in ("status", "title", "meta", "aria"):
            if field not in data:
                fail(f"cta.json: {name}.{field} ausente.")

if loaded.get("marquee"):
    marquee_items = loaded["marquee"].get("items")
    total_words = html.count("marquee-modern__word") - html.count("marquee-modern__word--muted")
    # Cada item aparece em dois grupos; a contagem acima conta uma ocorrência-base por span.
    check_count("Marquee", marquee_items, total_words // 2)

if loaded.get("about"):
    about = loaded["about"]
    check_count("About / título", about.get("titleLines"), html.count("data-about-line"))
    check_count("About / slider", about.get("slider", {}).get("images"), html.count("data-about-slide"))
    expected_info = {"vision-mission-values", "philosophy"}
    info = about.get("infoVariants", {})
    if set(info) != expected_info:
        fail("about.json: infoVariants diverge das duas variantes oficiais.")
    for name, items in info.items():
        if len(items) != 3:
            fail(f"about.json: infoVariants.{name} deve possuir 3 itens.")
    for image in about.get("slider", {}).get("images", []):
        local_asset(image.get("src"))

if loaded.get("services"):
    services = loaded["services"]
    check_count("Serviços", services.get("items"), html.count("data-service-item"))
    for item in services.get("items", []):
        local_asset(item.get("image", {}).get("src"))

if loaded.get("projects"):
    projects = loaded["projects"]
    check_count("Projetos", projects.get("items"), html.count("data-project-card"))
    for item in projects.get("items", []):
        local_asset(item.get("image", {}).get("src"))

if loaded.get("faq"):
    faq = loaded["faq"]
    check_count("FAQ", faq.get("items"), html.count("data-faq-item"))
    local_asset(faq.get("visual", {}).get("src"))

if loaded.get("contact"):
    contact = loaded["contact"]
    channel_count = html.count('class="contact-editorial__channel"')
    status_count = html.count('class="contact-editorial__status-item"')
    check_count("Contato / canais", contact.get("channels"), channel_count)
    check_count("Contato / status", contact.get("status"), status_count)

if "js/core/content-loader.js" not in html:
    fail("index.html não carrega js/core/content-loader.js.")

if errors:
    print("CONTENT AUDIT FAILED")
    for error in errors:
        print("[ERRO]", error)
    for warning in warnings:
        print("[AVISO]", warning)
    sys.exit(1)

print("CONTENT AUDIT APPROVED")
print(f"Manifest: {len(files)} arquivos de conteúdo registrados.")
print("Estrutura JSON x slots HTML: compatível.")
print("Assets locais e navegação: verificados.")
for warning in warnings:
    print("[AVISO]", warning)
