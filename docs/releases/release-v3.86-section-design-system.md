# Release v3.86 — Section Design System

## Objetivo

Consolidar a identidade visual das seções internas em tokens globais e eliminar divergências de tipografia e largura introduzidas por variantes.

## Alterações

- Criado o sistema de tokens compartilhados em `css/base/variables.css` para:
  - shell editorial;
  - topline;
  - eyebrow/meta;
  - título principal;
  - parágrafo introdutório;
  - painéis flutuantes FAQ/Contact.
- About, Services, Projects, FAQ e Contact passam a consumir a mesma escala de título e copy.
- Hero permanece independente e mantém sua escala própria.
- Removidas as sobrescritas Apple-inspired que alteravam eyebrow/meta/copy do `?services=premium-grid`.
- Removidas as sobrescritas Apple-inspired do topline do `?projects=balanced-masonry`.
- `premium-grid` e `balanced-masonry` continuam livres para estilizar seus componentes internos.
- FAQ e Contact passam a ter a borda externa alinhada ao shell editorial/hero no desktop.
- Tablet e mobile de FAQ/Contact acompanham o recuo externo do Hero responsivo.
- `top-dock` e Hero em desktop agora consomem o mesmo token `--section-shell-width`, sem alterar a geometria aprovada.

## Regra de não regressão

Variantes não devem redefinir `font-size`, `font-weight`, `font-family`, `letter-spacing` ou `line-height` do título principal/topline da seção. Se a identidade global precisar mudar, editar os tokens de `variables.css`.

## Compatibilidade

- 26 variantes preservadas.
- Nenhuma query string alterada.
- Nenhuma dependência adicionada.
- Nenhum arquivo de imagem alterado.
- Sem `!important` próprio.
