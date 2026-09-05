# Release v3.84 — Section Heading Consistency

## Objetivo

Restaurar o padrão tipográfico original dos títulos de **Services** e **Projects** após os redesigns Apple-inspired.

## Regra protegida

- O **Hero** pode possuir identidade tipográfica própria.
- As demais seções devem preservar o padrão tipográfico global de seus títulos.
- Variantes podem alterar cards, superfícies, grids, rails, controles, mídia e interação.
- Variantes **não devem sobrescrever** `font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height` ou cor de accent do título principal da seção.

## Alterações

### Services — `premium-grid`

Removidas as sobrescritas Apple-specific do título da seção. Agora o título volta a herdar integralmente `.services-editorial__title` e `.services-editorial__title-accent`.

### Projects — `balanced-masonry`

Removidas as sobrescritas Apple-specific do título da seção. Agora o título volta a herdar integralmente `.projects-editorial__title` e `.projects-editorial__title-accent`.

## Responsividade

A correção também vale no mobile porque os títulos voltam a usar as media queries globais já existentes de Services e Projects. Nenhuma regra do slider, grid ou cards foi alterada.

## Não regressão

- Hero: intacto.
- Services `premium-cards`: intacto.
- Projects `editorial-grid` e `offset-grid`: intactos.
- Slider de 4 projetos: intacto.
- Sem novas dependências ou CDN.
