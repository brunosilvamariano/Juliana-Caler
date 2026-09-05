#!/usr/bin/env python3
"""Executa a auditoria técnica completa do framework."""
from pathlib import Path
import subprocess, sys, json, hashlib, re

ROOT = Path(__file__).resolve().parents[1]
errors=[]

def run(label, cmd):
    print(f"\n== {label} ==")
    result=subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    if result.stdout: print(result.stdout.rstrip())
    if result.stderr: print(result.stderr.rstrip())
    if result.returncode:
        errors.append(f"{label} falhou ({result.returncode})")

run("HTML / ARIA / assets", [sys.executable, "scripts/audit-html.py", "."])
run("Variantes", [sys.executable, "scripts/audit-variants.py"])
run("CSS / cascata", [sys.executable, "scripts/audit-css.py"])
run("Conteúdo JSON", [sys.executable, "scripts/audit-content.py"])

print("\n== JavaScript ==")
js_files=sorted((ROOT/'js').rglob('*.js'))
for p in js_files:
    r=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
    if r.returncode:
        errors.append(f"JS inválido: {p.relative_to(ROOT)}")
        print('[ERRO]',p.relative_to(ROOT),r.stderr.strip())
print(f"{len(js_files)} arquivos JS verificados.")

print("\n== JSON ==")
json_files=sorted((ROOT/'data').rglob('*.json'))
for p in json_files:
    try: json.loads(p.read_text(encoding='utf-8'))
    except Exception as exc: errors.append(f"JSON inválido {p.relative_to(ROOT)}: {exc}")
print(f"{len(json_files)} arquivos JSON verificados.")

print("\n== Estrutura / assets ==")
required=[
 'index.html','css/app.css','css/custom.css','css/base/variables.css','js/core/content-loader.js',
 'css/components/sidebar/core.css','css/components/sidebar/header-variants.css',
 'css/components/sidebar/cta-variants.css','css/components/sidebar/top-header-adapter.css',
 'docs/README.md','docs/customization.md','docs/css-architecture.md','data/content/manifest.json','data/content/README.md',
 'LICENSE','COPYRIGHT.md','THIRD_PARTY_NOTICES.md','SECURITY.md'
]
for rel in required:
    if not (ROOT/rel).exists(): errors.append(f"Estrutura: ausente {rel}")

# Referências documentais em backticks que parecem caminhos locais.
print("\n== Referências de documentação ==")
path_pattern = re.compile(r'`((?:docs|css|js|assets|scripts|vendor|favicon|data)/[^`]+)`')
checked=0
for doc in [ROOT/'README.md', *sorted(p for p in (ROOT/'docs').glob('*.md'))]:
    text=doc.read_text(encoding='utf-8',errors='ignore')
    for rel in path_pattern.findall(text):
        if any(token in rel for token in ['*','?','<','>','|']):
            continue
        rel=rel.rstrip('.,;:')
        checked += 1
        if not (ROOT/rel).exists():
            errors.append(f"Referência documental inexistente em {doc.relative_to(ROOT)}: {rel}")
print(f"{checked} referências de caminhos verificadas.")

# Imagens: não modifica pixels; apenas inventário e alerta de peso.
image_ext={'.webp','.png','.jpg','.jpeg','.svg','.ico'}
images=[p for p in ROOT.rglob('*') if p.is_file() and p.suffix.lower() in image_ext]
large=[p for p in images if p.stat().st_size>700_000]
print(f"{len(images)} assets de imagem/favicon inventariados.")
if large:
    for p in large: print(f"[AVISO] asset pesado preservado sem alteração: {p.relative_to(ROOT)} ({p.stat().st_size/1024:.0f} KB)")

# Duplicatas binárias: informativo, não remove automaticamente.
groups={}
for p in images:
    h=hashlib.sha256(p.read_bytes()).hexdigest()
    groups.setdefault(h,[]).append(p)
dups=[v for v in groups.values() if len(v)>1]
for group in dups:
    print('[INFO] duplicata binária intencional/revisar:', ', '.join(str(p.relative_to(ROOT)) for p in group))

# Runtime não deve depender de CDN.
runtime=[ROOT/'index.html', *sorted((ROOT/'css').rglob('*.css')), *sorted((ROOT/'js').rglob('*.js'))]
cdn=[]
for p in runtime:
    text=p.read_text(encoding='utf-8',errors='ignore')
    for url in re.findall(r'https?://[^\s\"\'<>)]+' , text):
        if p.name!='index.html': cdn.append((p,url))
# URLs de contato/links em index são conteúdo, não dependências.
if cdn:
    errors.append('Dependência HTTP externa detectada em CSS/JS: '+str(cdn[:3]))

if errors:
    print("\nPROJECT AUDIT FAILED")
    for e in errors: print('[ERRO]',e)
    sys.exit(1)
print("\nPROJECT AUDIT APPROVED: estrutura, HTML, variantes, CSS, JS, JSON e assets verificados.")
