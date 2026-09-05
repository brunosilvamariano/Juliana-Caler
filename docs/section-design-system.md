# Design System das seções editoriais

## Objetivo

O Hero possui escala tipográfica própria. As demais seções editoriais do framework — **About, Services, Projects, FAQ e Contact** — compartilham uma única fonte de verdade para largura, topline, título e parágrafo introdutório.

A regra existe para impedir regressões em que uma variante altera o peso, o tamanho ou a identidade do cabeçalho da seção.

## Tokens oficiais

Os tokens ficam em `css/base/variables.css`.

### Shell

- `--section-shell-max`
- `--section-shell-inset`
- `--section-shell-width`

O `top-dock`, o Hero quando `top-dock` está ativo, e as seções editoriais consomem o mesmo `--section-shell-width`.

### Topline

- `--section-topline-gap`
- `--section-topline-padding-bottom`
- `--section-topline-padding-bottom-mobile`
- `--section-eyebrow-size`
- `--section-eyebrow-size-mobile`
- `--section-eyebrow-weight`
- `--section-eyebrow-tracking`
- `--section-eyebrow-line-width`
- `--section-eyebrow-line-width-mobile`
- `--section-meta-size`
- `--section-meta-size-mobile`
- `--section-meta-weight`
- `--section-meta-tracking`
- `--section-meta-line-height`

### Título principal da seção

- `--section-title-size`
- `--section-title-size-mobile`
- `--section-title-weight`
- `--section-title-tracking`
- `--section-title-line-height`
- `--section-title-line-height-mobile`

Uma variante de Services, Projects ou FAQ **não deve sobrescrever** esses tokens por seletor local só para ganhar uma identidade visual diferente. A variante começa abaixo do cabeçalho da seção.

### Parágrafo introdutório

- `--section-copy-size`
- `--section-copy-size-mobile`
- `--section-copy-weight`
- `--section-copy-line-height`

A largura máxima do parágrafo pode continuar específica por seção, pois ela participa da composição. Tamanho, peso e entrelinha permanecem globais.

### Painéis FAQ e Contact

FAQ e Contact possuem uma borda externa/flutuante. No desktop essa borda usa o mesmo `--section-shell-width` do Hero/top-dock. No tablet e mobile, o recuo acompanha o comportamento do Hero responsivo.

Tokens:

- `--section-panel-radius`
- `--section-panel-padding-inline`
- `--section-panel-mobile-inset`
- `--section-panel-padding-inline-mobile`

## O que continua específico por componente

O Design System não força o mesmo tamanho em toda a interface. Permanecem locais quando fazem parte da hierarquia do componente:

- títulos internos de cards;
- labels e tags;
- perguntas do FAQ;
- nomes dos canais de contato;
- títulos do showcase de Projects;
- CTAs e microcopy.

O padrão global controla a **identidade da seção**, não elimina hierarquia interna.
