#!/usr/bin/env python3
from pathlib import Path
import re, sys

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT/'index.html').read_text(encoding='utf-8')
SIDEBAR_JS = (ROOT/'js/components/sidebar.js').read_text(encoding='utf-8')
SIDEBAR_CSS = '\n'.join((ROOT/'css/components/sidebar'/name).read_text(encoding='utf-8') for name in ['core.css','header-variants.css','cta-variants.css','top-header-adapter.css'])
REGISTRY = (ROOT/'docs/variant-registry.md').read_text(encoding='utf-8')

expected = {
    'header': ['sidebar-premium','top-dock'],
    'cta': ['calendar','minimal'],
    'hero': ['organic','diagonal','split','arch','banner'],
    'marquee': ['modern-clean','soft-outline'],
    'about-image': ['fluid-bezier','soft-arch','architectural','editorial-cut','soft-capsule','minimal-frame'],
    'about-info': ['vision-mission-values','philosophy'],
    'services': ['premium-grid','premium-cards'],
    'projects': ['editorial-grid','balanced-masonry','offset-grid'],
    'faq': ['premium-panel','image-panel'],
}

errors=[]
def need(cond,msg):
    if not cond: errors.append(msg)

# HTML defaults/source of truth.
need('data-header-variant="sidebar-premium"' in HTML, 'HTML: header fallback missing')
need('data-sidebar-cta="calendar"' in HTML, 'HTML: CTA fallback missing')
for attr,val in [
    ('data-hero-variant','organic'),('data-marquee-variant','modern-clean'),
    ('data-about-image-variant','fluid-bezier'),('data-about-info-variant','vision-mission-values'),
    ('data-services-variant','premium-grid'),('data-projects-variant','editorial-grid'),
    ('data-faq-variant','premium-panel')]:
    need(f'{attr}="{val}"' in HTML, f'HTML: default {attr}={val} missing')

# Query/JS + docs inventory.
for v in expected['header']:
    need(f'"{v}"' in SIDEBAR_JS, f'JS header variant missing: {v}')
    need(f'`{v}`' in REGISTRY, f'Registry header variant missing: {v}')
for v in expected['cta']:
    need(re.search(rf'\b{re.escape(v)}\s*:\s*\{{', SIDEBAR_JS) is not None, f'JS CTA config missing: {v}')
    need(f'data-sidebar-cta="{v}"' in SIDEBAR_CSS, f'CSS CTA variant missing: {v}')
    need(f'`{v}`' in REGISTRY, f'Registry CTA variant missing: {v}')

# Top-dock adapter must preserve both curated CTA identities separately.
need('TOP DOCK CTA — ADAPTADOR RESPONSIVO' in SIDEBAR_CSS, 'Top-dock CTA adapter marker missing')
for v in expected['cta']:
    count=SIDEBAR_CSS.count(f'data-sidebar-cta="{v}"')
    need(count >= 2, f'CTA {v}: insufficient base + top-specific CSS selectors ({count})')
need('V3.66 — TOP HEADER CTA VISUAL LOCK' not in SIDEBAR_CSS, 'Stale v3.66 visual lock still present')
need('V3.65 — TOP HEADER CTA FULL COMPOSITION' not in SIDEBAR_CSS, 'Stale v3.65 normalization still present')
need('V3.62 — HEADER / CTA INTEGRATION REPAIR' not in SIDEBAR_CSS, 'Stale v3.62 override layer still present')

# Section JS inventories.
section_files = {
 'hero':'js/sections/hero.js','marquee':'js/sections/marquee.js','about-image':'js/sections/about.js',
 'about-info':'js/sections/about.js','services':'js/sections/services.js','projects':'js/sections/projects.js','faq':'js/sections/faq.js'}
for key,path in section_files.items():
    txt=(ROOT/path).read_text(encoding='utf-8')
    for v in expected[key]: need(f'"{v}"' in txt, f'{path}: variant missing {v}')

# Variant CSS files must reference every visual variant where applicable.
css_map = {
 'hero':'css/sections/hero.css','marquee':'css/sections/marquee.css','about-image':'css/sections/about.css',
 'about-info':'css/sections/about.css','services':'css/sections/services.css','projects':'css/sections/projects.css','faq':'css/sections/faq.css'}
for key,path in css_map.items():
    txt=(ROOT/path).read_text(encoding='utf-8')
    for v in expected[key]:
        need(v in txt, f'{path}: no CSS reference for {v}')

if errors:
    print('VARIANT AUDIT FAILED')
    for e in errors: print('[ERRO]',e)
    sys.exit(1)

count=sum(map(len,expected.values()))
print(f'VARIANT AUDIT APPROVED: {count} registered variants checked; Header x CTA matrix = {len(expected["header"])*len(expected["cta"])} combinations structurally available.')
