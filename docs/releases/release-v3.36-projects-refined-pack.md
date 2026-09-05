# v3.36 — Projects Refined Pack

## Objetivo

Recalibrar a seção **Projetos** para o mesmo nível de contenção visual do restante da página. A v3.35 explorava linguagens mais demonstrativas; esta versão reduz escala, profundidade, movimento e altura total para manter a seção premium sem parecer uma demo isolada.

## Variantes

- `?projects=editorial-grid` — grid 2 + 3 mais compacto, com proporções controladas.
- `?projects=compact-carousel` — carrossel manual com múltiplos cards visíveis e sem autoplay.
- `?projects=refined-coverflow` — navegação manual com profundidade muito sutil, sem rotação 3D exagerada.
- `?projects=split-feature` — um destaque moderado acompanhado por quatro projetos menores.
- `?projects=minimal-list` — lista editorial com imagem lateral curta, título, categoria e ação.
- `?projects=balanced-masonry` — assimetria leve com alturas controladas.

## Comportamento

`compact-carousel` e `refined-coverflow` funcionam apenas por ação do usuário: drag/swipe, teclado e botões anterior/próximo. Os controles deixam de ser circulares e ficam desabilitados nos limites em vez de criar loop artificial.

O lightbox permanece compartilhado por todas as variantes e continua derivando título, categoria e imagem diretamente do HTML, sem criar um segundo conjunto de dados em JavaScript.

## Acessibilidade e movimento

- controles possuem estado `disabled` nos limites;
- teclado esquerda/direita funciona somente quando o foco está dentro da seção;
- `aria-current` existe somente no card ativo do coverflow;
- `prefers-reduced-motion` desativa transições relevantes e scroll suave;
- sem autoplay em nenhuma variante.

## Escala visual

A principal mudança desta versão é a redução deliberada da escala das imagens e da altura dos layouts. Nenhuma variante usa imagem fullscreen, card vertical gigante ou profundidade 3D intensa.
