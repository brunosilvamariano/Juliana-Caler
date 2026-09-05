# V3.30 — About / Story Control Desktop Offset

Ajuste exclusivamente para desktop do botão lateral “Conheça nossa história”.

## Alteração

O controle continua posicionado em relação ao slider, mas foi trazido alguns pixels para dentro para aumentar o respiro em relação à margem direita da seção.

```css
@media (min-width: 80.0625rem) {
  .about-editorial__story-control {
    right: clamp(-3.35rem, -3.4vw, -2.75rem);
  }
}
```

## Por que desta forma

- não altera tablet;
- não altera mobile;
- não altera as seis variantes de imagem;
- não altera o grid do About;
- usa `clamp()` para o afastamento acompanhar diferentes larguras de desktop;
- preserva o posicionamento lateral elegante do controle.
