# v3.58 — Marquee Scroll Restore

## Objetivo
Restaurar o comportamento interativo da faixa Marquee sem reintroduzir autoplay.

## Comportamento
- O Marquee fica parado quando a página não está sendo rolada.
- Ao rolar para baixo, a faixa se desloca para a esquerda.
- Ao rolar para cima, o deslocamento é revertido naturalmente.
- O loop usa os dois grupos duplicados existentes no HTML para manter continuidade visual.
- `prefers-reduced-motion: reduce` mantém a faixa estática.

## Arquivos alterados
- `js/sections/marquee.js`
- `docs/releases/release-v3.58-marquee-scroll-restore.md`

## Observação arquitetural
O comportamento voltou para `js/sections/marquee.js` porque é uma interação específica do componente, não uma animação de entrada de seção. O `motion-engine.js` permanece responsável pelas animações gerais de entrada da página.
