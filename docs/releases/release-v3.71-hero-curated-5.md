# v3.71 — Hero Curated 5

## Objetivo

Reduzir o Hero de 12 para 5 variantes ativas, preservando apenas as composições selecionadas para a próxima fase do framework.

## Variantes mantidas

- `organic`
- `diagonal`
- `split`
- `arch`
- `banner`

## Variantes removidas do runtime

- `floating`
- `dual`
- `full-edge`
- `morph`
- `asymmetric`
- `capsule`
- `stacked`

As referências históricas permanecem apenas em documentos de release/history.

## Arch + PNG

A variante `arch` ganhou suporte explícito a retrato PNG transparente. O padrão recomendado é `1800 × 2400 px` (3:4), com respiro nas bordas. PNG usa `object-fit: contain` e alinhamento inferior; WebP/JPG permanecem com comportamento fotográfico.

## Limpeza

A mídia secundária usada por variantes removidas saiu do HTML, JSON e Content Engine. O padrão definitivo do Hero passa a ser `organic`.
