# v3.17 — Logo profissional no header

## Assets
Criada a pasta `assets/images/logo/` com:

- `logo-texto.svg` — assinatura completa da marca.
- `logo-icon.svg` — ícone isolado da marca.

## Comportamento
- Sidebar aberta: usa a logo escrita completa.
- Sidebar recolhida: usa apenas o ícone.
- Header mobile: usa a logo escrita com largura fluida e limite de altura.
- SVGs preservam proporção com `height: auto` e `object-fit: contain`.
- Há proteção extra para telas muito estreitas.

Nenhum SVG foi redesenhado; os arquivos fornecidos foram apenas organizados e aplicados ao layout.
