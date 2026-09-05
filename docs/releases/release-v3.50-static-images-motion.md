# v3.50 — Imagens totalmente estáticas

## Correção definitiva
- Removida toda animação GSAP aplicada diretamente às imagens do Hero, About e Projetos.
- Removido o `desktopDepth()` residual que ainda aplicava parallax nas imagens.
- Removidos `xPercent`, `yPercent`, `scale`, `clip-path` e `ScrollTrigger` diretamente em `<img>` no Motion Engine.
- Removidos zoom/transição de hover diretamente nas imagens de Projetos.
- As animações direcionais continuam apenas em containers, textos e cards.
- A imagem permanece estática do primeiro ao último frame.

## Objetivo
Eliminar definitivamente faixas brancas, vazios temporários e deslocamentos internos causados por movimento da própria imagem.
