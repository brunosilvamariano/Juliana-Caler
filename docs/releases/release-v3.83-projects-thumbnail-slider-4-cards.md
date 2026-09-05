# Release v3.83 — Projects Thumbnail Slider 4 Cards

## Escopo

Refinamento cirúrgico da variante `?projects=balanced-masonry`, preservando a arquitetura Apple-inspired da v3.82.

## O que mudou

- O seletor passa de cinco para **quatro projetos**.
- O quinto projeto continua disponível em `editorial-grid` e `offset-grid`; a redução é exclusiva do `balanced-masonry`.
- As setas visuais de anterior/próximo foram removidas completamente do markup gerado e do CSS da variante.
- A troca permanece disponível por clique/toque nas miniaturas, swipe/drag na mídia principal e teclado.
- O status agora usa `01 de 04` e cada slide exibe `01 / 04`, `02 / 04`, etc.
- No desktop e tablet, as quatro miniaturas ocupam a coluna vertical de forma equilibrada.
- No mobile, as quatro miniaturas permanecem em uma rail horizontal responsiva abaixo da mídia.
- Sem autoplay e sem dependência nova.

## Responsividade

- Desktop: 4 thumbnails verticais distribuídas pela altura do showcase.
- Tablet: 4 thumbnails verticais com labels reduzidos quando necessário.
- Mobile: rail horizontal de thumbnails com largura fluida via `clamp()` e scroll nativo.
- Mobile estreito: conteúdo do projeto reorganizado em uma coluna, sem perda de acesso às miniaturas.

## Não regressão

Permanecem preservados:

- `?projects=editorial-grid` com 5 projetos;
- `?projects=offset-grid` com 5 projetos;
- `?services=premium-grid`;
- `?services=premium-cards`;
- Hero, Header, CTA, Marquee, About, FAQ e Contact.

## Teste

```text
?projects=balanced-masonry
```
