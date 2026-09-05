# Motion Engine v3.47 — Directional Reveal / Offscreen Entrance

## Objetivo
A animação agora precisa ser percebida como deslocamento real: os elementos começam fora da composição e atravessam uma borda de clipping antes de se acomodarem no layout.

## Direção por seção
- Hero: texto sobe por máscara; imagem entra da direita; CTA acompanha o texto.
- About: conteúdo entra da esquerda; visual sobe de baixo com máscara.
- Serviços: itens alternam entradas da esquerda e direita.
- Projetos: cards sobem de fora do grid com reveal vertical e micro zoom interno.
- FAQ: conteúdo e perguntas entram da direita.
- Contato: conteúdo e canais entram da esquerda.

## Princípios
- Sem autoplay.
- Sem loops decorativos infinitos.
- Uma única camada de motion visual: `js/core/motion-engine.js`.
- `prefers-reduced-motion` respeitado.
- GSAP e ScrollTrigger continuam locais, sem CDN.
- O clipping horizontal é controlado em `css/base/motion-directional.css`.

## Ajuste futuro
Para tornar uma entrada mais ou menos evidente, altere preferencialmente `xPercent` / `yPercent` e a duração no bloco da seção correspondente. Evite adicionar um segundo sistema de reveal.
