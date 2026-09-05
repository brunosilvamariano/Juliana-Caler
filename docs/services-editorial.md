# 03 / Serviços — Curated Premium Pack

A seção de Serviços possui **duas variantes oficiais**, com arquiteturas diferentes e sem dependência de estado ativo persistente.

## `premium-grid`

Bento grid premium em 12 colunas com design system Apple-inspired. A referência é a disciplina de interface — não a cópia de um componente proprietário.

- tokens próprios de superfície, texto, azul de ação, radius e sombra;
- tipografia baseada em system stack (`-apple-system`/`BlinkMacSystemFont` + fallbacks);
- desktop largo: destaque 7/12 + módulo 5/12 na primeira linha e três módulos 4/12 na segunda;
- primeiro card: conteúdo à esquerda e imagem em full-height na lateral direita;
- cards secundários usam a mesma anatomia e escala, com superfícies branca/soft alternadas;
- CTAs usam azul de ação, alvo mínimo de 44px e motion discreto;
- textos auxiliares abandonam caixa alta/letter-spacing excessivo para melhorar leitura;
- tablet: primeiro card ocupa a linha inteira e os demais formam duas colunas;
- mobile: todos convergem para uma coluna segura e legível;
- sem blur decorativo, glass gratuito, autoplay ou animação direta da fotografia.

### Tokens do grid

Os tokens ficam escopados em `[data-services-variant="premium-grid"]` dentro de `css/sections/services.css`, portanto não alteram `premium-cards`. Para adaptar um cliente, sobrescreva os valores em `css/custom.css` sem `!important`.

Preview:

```text
?services=premium-grid
```

## `premium-cards`

Rail horizontal premium de cards equivalentes. **Não quebra em colunas ou novas linhas em nenhum viewport.**

- desktop: aproximadamente 3 cards completos + parte do próximo, conforme a largura disponível;
- tablet: aproximadamente 2 cards + parte do próximo;
- mobile: 1 card predominante + parte do próximo para indicar continuidade;
- scroll horizontal nativo com `scroll-snap`;
- drag por mouse no desktop;
- swipe/touch e trackpad usam o comportamento nativo do navegador;
- botões anterior/próximo e setas do teclado oferecem navegação alternativa;
- indicador numérico e barra de progresso acompanham o trilho;
- sem autoplay;
- imagens continuam estáticas, sem zoom/parallax direto.

Preview:

```text
?services=premium-cards
```

## Estrutura do card horizontal

Cada card do `premium-cards` usa:

1. imagem editorial em proporção 16:10;
2. marcador numérico discreto;
3. título com hierarquia forte;
4. tags/competências;
5. ação textual `Explorar serviço` com ícone separado.

A largura dos cards é deliberadamente maior do que em um grid de cinco colunas. O objetivo é preservar tipografia, imagem e respiro visual, deixando o movimento horizontal revelar os demais serviços.

## Princípios preservados

- HTML é a fonte da variante permanente.
- Query string é apenas preview.
- Conteúdo continua vindo de `data/content/services.json`.
- Imagens permanecem locais e estáticas.
- O card inteiro pode reagir ao hover, mas a fotografia não recebe animação própria.
- `prefers-reduced-motion` é respeitado.
- O carrossel não usa autoplay.
- A interação horizontal não exige biblioteca externa.
