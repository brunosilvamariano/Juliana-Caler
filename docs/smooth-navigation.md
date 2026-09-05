# Navegação suave — v12.5

## Cálculo dinâmico de parada

A posição final de cada seção agora é calculada em JavaScript no momento do clique.

O cálculo considera:
- posição absoluta real da seção;
- Topbar no desktop;
- Mobile Nav em telas menores;
- `getBoundingClientRect().bottom` do header visível;
- respiro editorial de 24px no desktop/tablet e 16px no mobile;
- altura total atual do documento;
- limite máximo possível de scroll;
- pequena correção final após a animação, caso imagens/fontes alterem o layout.

O Hero (`#inicio`) continua parando exatamente em `0`.

Arquivo:
- `js/core/smooth-scroll.js`
