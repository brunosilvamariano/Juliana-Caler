# Release v3.82 — Projects Apple Thumbnail Slider

## Escopo

Reconstrução da variante `?projects=balanced-masonry` após rejeição visual do carrossel horizontal da v3.81.

## O que mudou

- O rail horizontal de cards da v3.81 foi descartado.
- A variante passa a usar um projeto protagonista com mídia principal ampla.
- Navegação por cinco thumbnails sincronizadas no desktop.
- No mobile, as thumbnails passam para uma faixa horizontal rolável abaixo da mídia.
- Controles anterior/próximo discretos, sem progress bar e sem excesso de UI.
- Seleção direta por thumbnail.
- Swipe/drag horizontal sobre a mídia principal.
- Navegação por `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home` e `End`.
- Sem autoplay.
- Sem React, shadcn, Embla ou qualquer dependência nova no runtime.
- O padrão visual usa o design system Apple-inspired já adotado pelo framework: superfícies neutras, tipografia de sistema, radius consistente, azul de ação e motion curto.

## Origem conceitual

A arquitetura foi inspirada no padrão de **vertical thumbnail slider** indicado pelo usuário. O componente externo não foi instalado porque o framework continua em HTML/CSS/JavaScript puro; o comportamento foi reimplementado nativamente.

## Compatibilidade

O identificador `balanced-masonry` foi mantido para não quebrar URLs, configuração HTML, allowed sets ou documentação histórica.

## Não regressão

Permanecem preservados:

- `?projects=editorial-grid`;
- `?projects=offset-grid`;
- `?services=premium-grid`;
- `?services=premium-cards`;
- Hero, Header, CTA, Marquee, About, FAQ e Contact.

## Teste

```text
?projects=balanced-masonry
```
