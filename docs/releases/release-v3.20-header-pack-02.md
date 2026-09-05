# V3.20 — Header Pack 02

O pack anterior variava principalmente acabamento. Esta versão muda a **arquitetura real do header** sem duplicar o conteúdo de navegação.

## Variantes

1. `sidebar-premium` — sidebar atual completa + topbar contextual.
2. `top-dock` — navegação horizontal flutuante no topo, com marca e CTA.
3. `split-nav` — bloco de marca separado de uma barra horizontal de navegação.
4. `vertical-rail` — rail lateral estreito por ícones; labels aparecem em hover/foco.
5. `full-top` — header horizontal sólido ocupando toda a largura.
6. `hybrid` — marca/CTA no topo e rail lateral separado para navegação.

## Como usar

No HTML:

```html
<body data-header-variant="sidebar-premium">
```

Para testar sem editar o HTML:

- `?header=sidebar-premium`
- `?header=top-dock`
- `?header=split-nav`
- `?header=vertical-rail`
- `?header=full-top`
- `?header=hybrid`

## Mobile

Abaixo de 1024 px todas as variantes convergem para o drawer premium responsivo já existente. Isso evita layouts experimentais quebrados em telas pequenas e mantém a navegação consistente.

## Regra preservada

Nenhuma variante utiliza formas orgânicas ou pseudo-elementos decorativos atrás de textos, links ou CTA.
