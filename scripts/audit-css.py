#!/usr/bin/env python3
"""Auditoria de cascata e manutenção CSS do Premium Foundation."""
from pathlib import Path
import re, sys
import tinycss2
from cssselect2.parser import parse as parse_selector

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / "css"
APP = CSS / "app.css"
CUSTOM = CSS / "custom.css"
errors = []
warnings = []

def fail(msg): errors.append(msg)
def warn(msg): warnings.append(msg)

if not APP.exists(): fail("css/app.css ausente")
if not CUSTOM.exists(): fail("css/custom.css ausente")

# Política principal: nenhuma declaração !important no CSS próprio.
for path in sorted(CSS.rglob("*.css")):
    text = path.read_text(encoding="utf-8")
    rules = tinycss2.parse_stylesheet(text, skip_comments=True, skip_whitespace=True)
    def inspect_importance(items):
        for rule in items:
            if rule.type == "qualified-rule":
                declarations = tinycss2.parse_declaration_list(rule.content, skip_comments=True, skip_whitespace=True)
                for declaration in declarations:
                    if declaration.type == "declaration" and declaration.important:
                        fail(f"{path.relative_to(ROOT)}: !important não permitido em {tinycss2.serialize(rule.prelude).strip()}")
            elif rule.type == "at-rule" and rule.content is not None and rule.at_keyword not in {"import", "layer"}:
                inspect_importance(tinycss2.parse_rule_list(rule.content, skip_comments=True, skip_whitespace=True))
    inspect_importance(rules)

# Custom precisa permanecer fora de layers para vencer a engine por cascata.
custom = CUSTOM.read_text(encoding="utf-8") if CUSTOM.exists() else ""
custom_rules = tinycss2.parse_stylesheet(custom, skip_comments=True, skip_whitespace=True)
if any(rule.type == "at-rule" and rule.at_keyword == "layer" for rule in custom_rules):
    fail("css/custom.css não pode declarar @layer; ele deve permanecer não-layered")

# Valida imports e ordem declarada.
app = APP.read_text(encoding="utf-8") if APP.exists() else ""
expected_layers = "vendor, reset, tokens, base, layout, components, sections, polish, accessibility"
if expected_layers not in app:
    fail("css/app.css: ordem oficial de layers ausente ou alterada")

imports = re.findall(r'@import\s+url\(["\']([^"\']+)["\']\)\s+layer\(([^)]+)\)', app)
if not imports:
    fail("css/app.css: nenhum @import layered encontrado")
else:
    for href, layer in imports:
        target = (CSS / href).resolve()
        if not target.exists():
            fail(f"css/app.css: import inexistente: {href}")

# Garante que o index exponha somente app + custom, evitando ordem paralela acidental.
html = (ROOT / "index.html").read_text(encoding="utf-8")
links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)', html)
if links != ["css/app.css", "css/custom.css"]:
    fail(f"index.html: stylesheets esperados ['css/app.css','css/custom.css'], encontrados {links}")

# Parse de todos os CSS e relatório de especificidade (não falha por especificidade interna).
selector_count = 0
high_specificity = []
parse_errors = []
for path in sorted(CSS.rglob("*.css")):
    text = path.read_text(encoding="utf-8")
    rules = tinycss2.parse_stylesheet(text, skip_comments=True, skip_whitespace=True)
    def walk(items):
        nonlocal_dummy = None
        global selector_count
        for rule in items:
            if rule.type == "error":
                parse_errors.append((path, rule.message))
            elif rule.type == "qualified-rule":
                sel = tinycss2.serialize(rule.prelude).strip()
                try:
                    parsed = list(parse_selector(sel))
                except Exception as exc:
                    parse_errors.append((path, f"selector inválido {sel!r}: {exc}"))
                    continue
                selector_count += len(parsed)
                for item in parsed:
                    if item.specificity >= (0,5,0):
                        high_specificity.append((item.specificity, path.relative_to(ROOT), sel))
            elif rule.type == "at-rule" and rule.content is not None and rule.at_keyword not in {"import", "layer"}:
                walk(tinycss2.parse_rule_list(rule.content, skip_comments=True, skip_whitespace=True))
    walk(rules)

for path,msg in parse_errors:
    fail(f"{path.relative_to(ROOT)}: {msg}")

if high_specificity:
    warn(f"{len(high_specificity)} seletores internos com especificidade >= (0,5,0); isolados pelas cascade layers")

# Detecta o padrão órfão que já causou seletor concatenado no Hero.
hero = (CSS/'sections/hero.css').read_text(encoding='utf-8')
if re.search(r'\.hero-editorial\[data-hero-variant="banner"\]\s*\n\s*\.hero-editorial\[data-hero-variant="banner"\]\s*\n', hero):
    fail("hero.css: seletor órfão/concatenado detectado")

if warnings:
    for item in warnings: print("[AVISO]", item)
if errors:
    print("CSS AUDIT FAILED")
    for item in errors: print("[ERRO]", item)
    sys.exit(1)
print(f"CSS AUDIT APPROVED: {selector_count} seletores analisados; 0 !important; imports/layers/customização validados.")
