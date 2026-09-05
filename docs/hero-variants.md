# Hero — variantes curadas

O Hero utiliza uma única estrutura de conteúdo e mantém somente cinco composições visuais ativas. A redução é intencional: cada opção precisa justificar sua existência com uma composição realmente diferente.

## Variantes ativas

- `organic` — recorte Bézier fluido e assinatura orgânica.
- `diagonal` — corte geométrico mais direto.
- `split` — divisão limpa 50/50 entre conteúdo e mídia.
- `arch` — composição em arco, preparada para retrato recortado em PNG ou WebP transparente.
- `banner` — imagem em tela cheia com conteúdo sobreposto.

## Configuração definitiva

No `index.html`, use o atributo `data-hero-variant`:

```html
<section data-hero-editorial data-hero-variant="organic">
```

## Preview

```text
?hero=organic
?hero=diagonal
?hero=split
?hero=arch
?hero=banner
```

A query string serve somente para preview. O HTML continua sendo a fonte de verdade da escolha definitiva.

## `arch` com retrato transparente

Para uma cliente com retrato recortado, use preferencialmente:

- **dimensão recomendada:** `1536 × 2048 px` ou maior;
- **proporção:** `3:4`;
- **formato:** PNG ou WebP com transparência real;
- **enquadramento:** cabeça/cabelo e braços sem tocar as bordas;
- **composição:** pessoa centralizada, com a base do corpo próxima ao limite inferior da imagem.

Como margem de segurança, evite recortes apertados. `1800 × 2400 px` continua sendo uma excelente referência premium para novos arquivos.

No `arch`, a mídia usa `object-fit: contain` e alinhamento inferior independentemente da extensão. Isso permite usar PNG ou WebP transparente sem depender do nome do arquivo.

### Política de mídia pura

As cinco variantes do Hero exibem a imagem sem efeitos artificiais sobre a fotografia: sem shade, gradiente, glow, blur, filtro, máscara de cor ou sombra aplicada à mídia. Recortes (`clip-path`) e `border-radius` são tratados apenas como geometria estrutural da variante.

## Mobile e tablet

As cinco variantes possuem adaptação responsiva. A composição pode mudar de proporção em telas menores, mas a identidade visual de cada variante é preservada.

## Arquivos envolvidos

- `index.html`: variante definitiva e estrutura semântica.
- `css/sections/hero.css`: base e estilos das cinco variantes.
- `js/sections/hero.js`: validação e preview via query string.
- `data/content/hero.json`: conteúdo e mídia do Hero.
