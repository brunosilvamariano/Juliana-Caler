# v3.10 — Correção das 11 variantes do Hero

## Problema encontrado
O CSS das variantes 07–11 existia, porém o motor em `js/sections/hero.js`
aceitava somente:

- organic
- diagonal
- floating
- dual
- full-edge
- morph

Ao receber `split`, `asymmetric`, `arch`, `capsule` ou `stacked`, o JavaScript
considerava a variante inválida e voltava automaticamente para `organic`.

## Correção
O motor agora reconhece as 11 variantes.

A variante `morph` também recebeu uma composição desktop mais ampla para que
a diferença visual em relação ao `organic` seja perceptível mesmo antes de
observar a animação da máscara.

Nenhuma das variantes 01–05 foi alterada.
