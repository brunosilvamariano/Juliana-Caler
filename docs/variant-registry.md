# Registro técnico de variantes

Este é o registro técnico das variantes suportadas pelo framework. O `index.html` continua sendo a fonte principal da configuração permanente; query strings são usadas apenas como override temporário para preview.

## Inventário

| Módulo | Parâmetro | Padrão | Variantes |
|---|---|---|---:|
| Header | `header` | `sidebar-premium` | 2 |
| CTA | `cta` | `calendar` | 2 |
| Hero | `hero` | `organic` | 5 |
| Marquee | `marquee` | `modern-clean` | 2 |
| About — imagem | `about-image` | `fluid-bezier` | 6 |
| About — conteúdo | `about-info` | `vision-mission-values` | 2 |
| Serviços | `services` | `premium-grid` | 2 |
| Projetos | `projects` | `editorial-grid` | 3 |
| FAQ | `faq` | `premium-panel` | 2 |

Total atual: **26 variantes**.

## Header

- Atributo: `data-header-variant` no `<body>`
- Padrão: `sidebar-premium`
- Variantes: `sidebar-premium`, `top-dock`
- Preview:

```text
?header=sidebar-premium
?header=top-dock
```

## CTA

- Atributo: `data-sidebar-cta` no `<aside data-sidebar>`
- Padrão: `calendar`
- Variantes: `calendar`, `minimal`
- Preview:

```text
?cta=calendar
?cta=minimal
```

Em `sidebar-premium`, cada CTA mantém sua composição própria. Em `top-dock`, o Header adapta apenas slot, escala e encaixe: `calendar` preserva avatar, copy e ação circular; `minimal` continua sem card pesado. O `top-dock` usa a mesma largura útil das seções editoriais; `organic`, `diagonal`, `split`, `arch` e `banner` ficam centralizados nesse mesmo shell de até 1440px quando usados com o header horizontal.

## Hero

- Atributo: `data-hero-variant`
- Padrão: `organic`
- Variantes: `organic`, `diagonal`, `split`, `arch`, `banner`
- Preview:

```text
?hero=organic
?hero=diagonal
?hero=split
?hero=arch
?hero=banner
```

A variante `arch` foi preparada especialmente para retrato recortado em **PNG ou WebP transparente**. Use **1536 × 2048 px (3:4) ou maior**; 1800 × 2400 px é uma referência premium para novos arquivos. A mídia é exibida em `contain`, ancorada na base e sem fundo, glow, shade, filtro ou overlay artificial.

## Marquee

- Atributo: `data-marquee-variant`
- Padrão: `modern-clean`
- Variantes: `modern-clean`, `soft-outline`
- Preview:

```text
?marquee=modern-clean
?marquee=soft-outline
```

## About — imagem

- Atributo: `data-about-image-variant`
- Padrão: `fluid-bezier`
- Variantes: `fluid-bezier`, `soft-arch`, `architectural`, `editorial-cut`, `soft-capsule`, `minimal-frame`
- Preview:

```text
?about-image=fluid-bezier
?about-image=soft-arch
?about-image=architectural
?about-image=editorial-cut
?about-image=soft-capsule
?about-image=minimal-frame
```

## About — conteúdo

- Atributo: `data-about-info-variant`
- Padrão: `vision-mission-values`
- Variantes: `vision-mission-values`, `philosophy`
- Preview:

```text
?about-info=vision-mission-values
?about-info=philosophy
```

## Serviços

- Atributo: `data-services-variant`
- Padrão: `premium-grid`
- Variantes: `premium-grid`, `premium-cards`
- Preview:

```text
?services=premium-grid
?services=premium-cards
```

`premium-grid` usa o design system Apple-inspired da seção: bento 12 colunas, system typography, superfícies neutras, radius consistente, azul de ação e motion discreto.

`premium-cards` permanece em um único rail horizontal em qualquer viewport, com drag/swipe, scroll snap e controles acessíveis, sem autoplay.

## Projetos

- Atributo: `data-projects-variant`
- Padrão: `editorial-grid`
- Variantes: `editorial-grid`, `balanced-masonry`, `offset-grid`
- Nota v3.83: `balanced-masonry` preserva o identificador por compatibilidade e renderiza um vertical thumbnail slider Apple-inspired com **4 projetos**, sem setas visuais. Navegação por thumbnails, teclado e swipe/drag; thumbs verticais no desktop/tablet e horizontais no mobile; sem autoplay.
- Preview:

```text
?projects=editorial-grid
?projects=balanced-masonry
?projects=offset-grid
```

## FAQ

- Atributo: `data-faq-variant`
- Padrão: `premium-panel`
- Variantes: `premium-panel`, `image-panel`
- Preview:

```text
?faq=premium-panel
?faq=image-panel
```

## Combinação de preview

Os parâmetros podem ser combinados usando `&`:

```text
?header=top-dock&cta=calendar&hero=banner&marquee=modern-clean&about-image=fluid-bezier&about-info=philosophy&services=premium-grid&projects=balanced-masonry&faq=premium-panel
```

## Regras

1. O HTML define a variante permanente.
2. A query string serve apenas para preview.
3. JavaScript valida o nome recebido antes de aplicá-lo.
4. CSS é responsável pela aparência da variante.
5. Personalizações específicas do projeto devem ir em `css/custom.css`, sem `!important` para ajustes normais.

Para uma referência rápida, consulte também `VARIANTES.md` na raiz do projeto.
