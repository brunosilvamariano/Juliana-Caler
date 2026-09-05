# v3.15 — Correção dos seletores do Marquee

## Problema
As variantes tipográficas do Marquee estavam estilizando `.marquee-modern__item`,
mas as palavras reais do HTML utilizam `.marquee-modern__word`.

Por isso os pontos mudavam, mas o texto não.

## Correção
Todos os seletores do pack tipográfico foram atualizados de:

```css
.marquee-modern__item
```

para:

```css
.marquee-modern__word
```

Agora as variantes `gradient`, `outline`, `gradient-outline`, `glow` e `mixed`
afetam corretamente o texto do marquee.
