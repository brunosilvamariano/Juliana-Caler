# Release v3.79 — Services Horizontal Rail

## Objetivo

Refinar a variante `premium-cards` para que a apresentação lado a lado tenha qualidade visual premium e permaneça em um único trilho horizontal, sem empilhar cards em novas linhas.

## Alterações

- `premium-grid` permanece como a variante de grid assimétrico.
- `premium-cards` foi reconstruída como rail horizontal.
- cards maiores, com tipografia e imagem em proporções mais confortáveis;
- próximo card parcialmente visível para comunicar continuidade;
- scroll snap nativo;
- drag por mouse;
- swipe/touch e trackpad nativos;
- botões anterior/próximo;
- navegação por setas do teclado;
- contador e barra de progresso;
- sem autoplay;
- sem animação direta das imagens.

## Stack

Nenhuma dependência nova foi adicionada. O rail usa HTML, CSS e JavaScript puros.

## Query

```text
?services=premium-cards
```

## Compatibilidade

O conteúdo continua vindo de `data/content/services.json`, e a variante permanente continua definida por `data-services-variant` no HTML.
