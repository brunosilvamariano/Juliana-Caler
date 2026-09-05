# Release v3.78 — Services Curated 2

## Objetivo

Substituir todas as seis variantes legadas de Serviços por somente duas arquiteturas novas, visualmente distintas e com menor custo de manutenção.

## Variantes removidas do runtime

- `editorial-grid`
- `stacked-panels`
- `horizontal-split`
- `focus-card`
- `minimal-list`
- `modular-blocks`

## Variantes novas

- `premium-grid` — composição assimétrica premium em 12 colunas.
- `premium-cards` — cards tradicionais premium lado a lado.

## Simplificação técnica

Foram removidos da seção:

- estado `is-active` persistente;
- ghost word;
- `data-service-ghost`;
- listeners de hover/foco para seleção de item;
- CSS específico das seis arquiteturas antigas.

O JavaScript de Serviços agora valida apenas a query string e aplica a variante escolhida.

## Compatibilidade

- conteúdo JSON preservado;
- mesmos 5 slots de serviço;
- links individuais de WhatsApp preservados;
- imagens locais preservadas;
- footer e CTA geral preservados;
- responsividade desktop/tablet/mobile;
- `prefers-reduced-motion` preservado.
