# v3.65 — Top Header CTA Full Composition

Base: v3.64.

## Objetivo
Fazer com que todas as variantes de CTA mantenham, quando o menu estiver no topo, a mesma anatomia premium aprovada visualmente no CTA `calendar`: avatar/ícone à esquerda, título + subtítulo no centro e seta circular à direita.

## Alterações
- A sidebar-premium não foi alterada.
- `top-dock`, `full-top`, `hybrid` e `split-nav` usam CTA completo em três zonas.
- Avatar/ícone permanece visível no topo, inclusive em variantes que o ocultam na composição vertical.
- Subtítulo volta a ser exibido no topo.
- A seta possui coluna própria e não sobrepõe texto.
- O CTA recebe largura suficiente para títulos/subtítulos sem truncamento.
- `split-nav` reserva uma área independente à direita para o CTA e desloca a navegação para evitar colisão.
- O `calendar` reproduz no topo a composição visual aprovada da sidebar, adaptada à escala horizontal.

## Escopo protegido
Nenhuma alteração em Hero, Marquee, About, Serviços, Projetos, FAQ, Contato, Footer, motion ou comportamento das variantes.
