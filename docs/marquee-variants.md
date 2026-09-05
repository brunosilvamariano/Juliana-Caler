# Marquee — Curated 2

O runtime atual mantém somente duas variantes de Marquee, escolhidas por serem visualmente distintas sem duplicar soluções.

1. `modern-clean` — tipografia sólida, limpa e versátil.
2. `soft-outline` — direção mais gráfica/editorial, com contorno controlado.

## Como ativar

Permanente no HTML:

```html
data-marquee-variant="modern-clean"
```

## Preview por URL

```text
?marquee=modern-clean
?marquee=soft-outline
```

## Movimento preservado

A curadoria não altera a engine de movimento: o Marquee continua reagindo à direção e à velocidade do scroll, usa inércia curta, para quando o scroll para e não possui autoplay.

## Regra de legibilidade

As duas variantes mantêm `white-space: nowrap`, `overflow: visible`, altura mínima de viewport e `line-height` controlado para impedir cortes em desktop, tablet e mobile.
