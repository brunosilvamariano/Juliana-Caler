# v3.68 — Foundation Audit + Custom Cascade

Release de engenharia baseada na v3.67.

## Objetivo

Manter layout e funcionalidades existentes enquanto reduz dívida de cascata e melhora manutenção.

## Principais mudanças

- CSS interno passou a ser carregado por `css/app.css` em cascade layers.
- `css/custom.css` virou a superfície oficial de customização sem `!important`.
- CSS próprio passou de 33 para 0 ocorrências de `!important`.
- Sidebar foi separada por responsabilidade sem alterar ordem lógica das regras.
- Acessibilidade e polish transversal foram centralizados.
- Corrigido seletor órfão no Hero preservando o comportamento efetivo anterior.
- Releases/auditorias organizadas em subpastas.
- Novas auditorias CSS e de projeto.
- Nenhuma imagem foi gerada, editada ou substituída.
- HTML estrutural e JavaScript funcional foram preservados.
