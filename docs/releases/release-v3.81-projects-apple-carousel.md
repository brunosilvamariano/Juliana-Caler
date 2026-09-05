# Release v3.81 — Projects Apple Carousel

## Escopo

Recriação da variante `?projects=balanced-masonry` como um carrossel horizontal Apple-inspired.

## O que mudou

- `balanced-masonry` deixa de ser masonry/grid e passa a ser rail horizontal manual.
- Cards reconstruídos com mídia limpa e conteúdo em superfície separada.
- Sistema visual local: fundo neutro, tipografia de sistema, superfícies brancas, azul de ação, radius e motion consistentes.
- Próximo card permanece parcialmente visível para comunicar continuidade.
- Contador, progress rail e botões anterior/próximo.
- Drag com mouse, swipe/trackpad nativos e scroll snap.
- Navegação por `ArrowLeft`, `ArrowRight`, `Home` e `End`.
- Sem autoplay.
- Mobile continua horizontal.

## Compatibilidade

O identificador `balanced-masonry` foi mantido para evitar quebra de URLs, configurações HTML, allowed sets e documentação histórica.

## Não regressão

Não foram redesenhados:

- `?projects=editorial-grid`;
- `?projects=offset-grid`;
- Services (`premium-grid` e `premium-cards`);
- Hero, Header, CTA, Marquee, About, FAQ e Contact.

## Teste

```text
?projects=balanced-masonry
```
