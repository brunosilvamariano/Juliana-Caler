# Motion Engine v3.46 — Premium Motion Direction

## Objetivo
A animação foi redesenhada para ser percebida como movimento, não como um simples aparecimento. O sistema usa uma única fonte de verdade em `js/core/motion-engine.js`.

## Direção de movimento
- Hero em sequência: eyebrow → título → texto/CTA → imagem.
- Durações mais longas e easing de desaceleração (`power4.out`, `expo.out`).
- Blur reduzido para evitar sensação de flash/susto.
- Seções entram em três tempos: introdução, conteúdo e cards.
- Cards usam stagger visível entre 0,11s e 0,14s.
- Projetos combinam deslocamento, escala mínima e assentamento da imagem.
- FAQ entra lateralmente de forma controlada.
- Contato mantém leitura sequencial dos canais.
- Marquee responde ao scroll; não possui autoplay.
- Parallax só no desktop e com amplitude contida.

## Acessibilidade
Com `prefers-reduced-motion: reduce`, o engine não inicia animações.

## Regras
Não adicionar GSAP diretamente em arquivos de seções. Toda animação visual global deve permanecer no Motion Engine.
