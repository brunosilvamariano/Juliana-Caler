# v3.59 — Marquee Restore + Section Motion Simplification

## Objetivo

Recuperar o comportamento de marquee aprovado antes da limpeza de motion e simplificar as animações de entrada para trabalhar com grandes blocos de cada seção, em vez de animar cada elemento de texto ou card individualmente.

## Marquee

- Restaurada a lógica da v3.44.
- Movimento continua vinculado ao scroll, sem autoplay.
- Scroll para baixo move a faixa para a esquerda.
- Scroll para cima move a faixa para a direita.
- Velocidade acumulada com inércia curta e desaceleração rápida.
- `SPEED_FACTOR = 0.34`, `MAX_VELOCITY = 18`, `FRICTION = 0.84`.
- Loop contínuo preservado.
- Variantes por `?marquee=` preservadas.

## Motion geral

O `js/core/motion-engine.js` foi reescrito para uma arquitetura por blocos.

- Hero: conteúdo e mídia entram de lados opostos.
- About: bloco de conteúdo e bloco visual entram de lados opostos.
- Serviços: intro e lista entram como blocos; cards não são animados individualmente.
- Projetos: intro e grid entram como blocos; cards não são animados individualmente.
- FAQ: intro e accordion entram como blocos.
- Contato: intro e canais entram como blocos.
- Toplines recebem somente uma entrada curta e discreta.
- Sem clip-path nos textos.
- Sem animação individual de títulos, parágrafos ou botões.
- Sem animação direta nas imagens.
- Sem animação de saída.
- Cada seção anima apenas uma vez.
- `prefers-reduced-motion` preservado.

## Escopo preservado

Nenhum layout, variante, conteúdo, grid, comportamento do FAQ, WhatsApp responsivo ou estrutura tipográfica da v3.58 foi alterado.
