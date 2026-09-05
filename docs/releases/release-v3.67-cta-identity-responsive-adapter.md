# v3.67 — CTA Identity + Responsive Top Adapter

Base: v3.66.

## Correção principal
As variantes CTA voltam a ser visualmente diferentes. O header horizontal não impõe mais uma geometria única.

- `conversation`: status + avatar + contato + seta clara.
- `project`: card escuro, sem avatar, status e seta branca.
- `availability`: composição verde de agenda com avatar e seta verde.
- `quote`: proposta clara/índigo com faixa de status e seta quadrada.
- `calendar`: pill com avatar, título/subtítulo e seta circular escura.
- `minimal`: composição leve, sem avatar/status/card pesado.

## Headers horizontais
`top-dock`, `split-nav`, `full-top` e `hybrid` fornecem somente o espaço/encaixe responsivo. A aparência continua pertencendo ao `data-sidebar-cta`.

## Preservado
Sidebar premium, drawer mobile, Hero, Marquee, About, Serviços, Projetos, FAQ, Contato, Footer e motion não foram alterados.
