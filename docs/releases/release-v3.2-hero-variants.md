# Release v3.2 — Hero Variants

Esta versão adiciona um sistema de variações visuais ao Hero sem duplicar sua estrutura de conteúdo.

## Novidades

- `organic`: preserva o Hero Bézier original.
- `diagonal`: mídia com recorte geométrico.
- `floating`: mídia em janela flutuante.
- `dual`: mídia principal com composição secundária sobreposta.
- `full-edge`: fotografia limpa até a borda direita.
- `morph`: recorte orgânico com deformação sutil em desktop.
- Preview temporário por query string `?hero=<variante>`.
- Fallback unificado para tablet/mobile.
- Respeito a `prefers-reduced-motion`.
- Nenhuma nova biblioteca externa.

## Arquivos alterados

- `index.html`
- `css/sections/hero.css`
- `js/sections/hero.js`
- `docs/hero-editorial.md`

## Arquivo novo

- `docs/hero-variants.md`

## Validação

Execute:

```bash
python3 scripts/audit-html.py .
```

Para validar sintaxe JavaScript quando Node.js estiver disponível:

```bash
find js -name '*.js' -print0 | xargs -0 -n1 node --check
```
