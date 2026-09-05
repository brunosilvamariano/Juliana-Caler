# v3.63 — Top Header CTA Complete Labels

Base: v3.62.

## Objetivo
Garantir que todas as variantes de CTA permaneçam totalmente legíveis quando o menu utiliza uma arquitetura de topo.

## Correção
- `conversation`, `project`, `availability`, `quote`, `calendar` e `minimal` continuam usando a mesma configuração central do CTA.
- Nos headers `top-dock`, `split-nav`, `full-top` e `hybrid`, o CTA agora recebe largura responsiva suficiente para o título completo.
- Removido o comportamento visual de `ellipsis` somente no título do CTA horizontal.
- O texto permanece em uma linha e não é reduzido a `...`.
- `split-nav` passa a reservar espaço com a mesma variável de largura do CTA, evitando colisão com a navegação.
- Em desktops menores, a navegação reduz espaçamento antes de sacrificar o texto do CTA.

## Preservado
Nenhuma alteração em Sidebar Premium, conteúdo das seções, motion, Marquee, Projetos, FAQ, Contato, Footer ou lógica das variantes.
