# v3.62 — Header + CTA Regression Repair

Base: v3.61.

## Problema identificado
As variantes de CTA continuavam presentes no JavaScript/CSS, porém a integração com headers horizontais não era consistente:
- `split-nav` escondia explicitamente `.sidebar__footer`, eliminando o CTA;
- `top-dock`, `full-top` e `hybrid` acumulavam regras antigas de compactação que podiam reduzir o conteúdo até restar visualmente apenas a seta;
- a identidade das seis variantes de CTA ficava parcialmente anulada quando combinada com determinados headers.

## Correção
- nenhuma alteração no layout padrão `sidebar-premium`;
- CTA explicitamente visível em `top-dock`, `split-nav`, `full-top` e `hybrid`;
- `split-nav` agora reserva uma área própria para o CTA, sem sobrepor a navegação;
- conteúdo textual do CTA recebe largura real e não pode colapsar silenciosamente;
- variantes `conversation`, `project`, `availability`, `quote`, `calendar` e `minimal` preservam identidade também nos headers horizontais;
- comportamento mobile/drawer permanece o mesmo.

## Compatibilidade
As query strings continuam:
- `?header=sidebar-premium|top-dock|split-nav|vertical-rail|full-top|hybrid`
- `?cta=conversation|project|availability|quote|calendar|minimal`

Nenhuma seção de conteúdo, marquee, motion, Projects, FAQ, Contact ou Footer foi alterada nesta release.
