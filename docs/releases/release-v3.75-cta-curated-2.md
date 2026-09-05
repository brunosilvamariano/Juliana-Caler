# Release v3.75 — CTA Curated 2

## Objetivo

Reduzir o CTA principal do Header de seis para duas variantes oficiais e garantir que ambas preservem a própria identidade em `sidebar-premium` e `top-dock`.

## Variantes mantidas

- `calendar` — pill premium com avatar, copy e ação circular.
- `minimal` — composição editorial leve, sem card pesado.

## Variantes removidas do runtime

- `conversation`
- `project`
- `availability`
- `quote`

As variantes antigas permanecem apenas no histórico de releases quando citadas por documentação histórica.

## Arquitetura

- HTML padrão alterado para `data-sidebar-cta="calendar"`.
- `data/content/cta.json` contém apenas as duas variantes ativas.
- `sidebar.js` valida apenas `calendar` e `minimal`.
- `cta-variants.css` contém somente as duas identidades-base.
- `top-header-adapter.css` adapta cada CTA separadamente ao `top-dock`.
- O slot do `minimal` no `top-dock` é menor que o slot do `calendar`, evitando espaço vazio desnecessário.

## Inventário

- Header: 2
- CTA: 2
- Hero: 5
- Total atual: 38 variantes
- Matriz Header × CTA: 4 combinações estruturais
