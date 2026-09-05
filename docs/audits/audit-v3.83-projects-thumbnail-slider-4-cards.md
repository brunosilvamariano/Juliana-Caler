# Audit v3.83 — Projects Thumbnail Slider 4 Cards

## Escopo

Auditoria do refinamento de `?projects=balanced-masonry` para quatro projetos no seletor, remoção das setas visuais e preservação da responsividade.

## Verificações técnicas

- HTML / semântica / ARIA: aprovado.
- CSS audit: aprovado.
- Project audit: aprovado.
- Variant audit: 26 variantes registradas.
- Content audit: JSON e slots HTML compatíveis.
- JavaScript: `node --check` em todos os arquivos.
- JSON: parse válido.
- CSS: parse com `tinycss2`.
- `!important` próprio: 0.
- CDN adicionada: nenhuma.
- Referências de controles anterior/próximo no runtime de Projects: 0.

## Responsividade

- Desktop: quatro miniaturas verticais distribuídas igualmente na coluna lateral.
- Tablet: quatro miniaturas verticais, com conteúdo reduzido quando necessário.
- Mobile: quatro miniaturas em rail horizontal com `clamp()`, scroll nativo e `scroll-snap`.
- Mobile estreito: conteúdo do slide passa para uma coluna sem remover acesso às miniaturas.

## Não regressão

A mudança de produção fica restrita a:

- `css/sections/projects.css`;
- `js/sections/projects.js`.

`editorial-grid` e `offset-grid` continuam com os cinco projetos originais. Services e as demais seções não foram alterados.

## Validação visual

A release não depende de uma afirmação de screenshot automatizado. A validação documentada aqui é estrutural/técnica e de regras responsivas no CSS.
