# v3.64 — Top Header CTA Composition Isolation

Base: v3.63.

## Correção
As variantes de CTA foram originalmente desenhadas para a sidebar e algumas possuem grades internas próprias. `calendar`, por exemplo, usa três áreas (`avatar + texto + seta`). Nos headers horizontais o avatar já era ocultado, porém a grade de três colunas continuava ativa por especificidade CSS e podia fazer a ação circular invadir o label.

A v3.64 isola a composição horizontal sem alterar as variantes da sidebar:

- Sidebar permanece exatamente com sua composição original.
- `top-dock`, `split-nav`, `full-top` e `hybrid` usam duas áreas estáveis: `texto + seta`.
- O círculo da seta possui coluna própria e não sobrepõe o label.
- O label continua integral, sem ellipsis.
- `data-sidebar-cta` / `?cta=` continuam sendo a fonte única da variante.
- Nenhuma seção de conteúdo, marquee ou motion foi alterada.
