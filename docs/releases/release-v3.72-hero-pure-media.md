# Release v3.72 — Hero Pure Media

## Objetivo

Remover qualquer efeito visual aplicado sobre ou atrás das imagens do Hero, preservando somente a geometria estrutural de cada variante.

## Alterações

- removido `hero-editorial__media-shade` do HTML;
- removidos glow e linha glass do SVG do Hero;
- o SVG mantém apenas o `clipPath` necessário ao recorte `organic`;
- removido glow ambiente `hero-editorial::before`;
- removido gradiente mobile de `organic`;
- `banner` deixa de aplicar shade/gradiente sobre a fotografia;
- imagens do Hero usam `transform: none`, `filter: none` e `opacity: 1`;
- `arch` usa fundo transparente e `object-fit: contain` para retratos recortados, sem depender da extensão;
- PNG e WebP transparentes são suportados pelo mesmo comportamento do `arch`;
- nenhum asset de imagem foi editado ou recomprimido.

## Variantes preservadas

- `organic`
- `diagonal`
- `split`
- `arch`
- `banner`

## Regra

O visual da fotografia deve vir do arquivo original e da geometria do layout. Não são permitidos overlays, gradientes, blur, glow, filtros ou sombras sobre a mídia do Hero.
