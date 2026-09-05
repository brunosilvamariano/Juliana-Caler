# V3.31 — Services Layout Pack

Seis arquiteturas visuais para a seção Serviços, mantendo o mesmo HTML, conteúdo, links de WhatsApp, imagens e interações.

## Variantes

1. `editorial-grid` — cards amplos em duas colunas.
2. `stacked-panels` — painéis horizontais empilhados.
3. `horizontal-split` — serviço à esquerda e detalhes/mídia à direita.
4. `focus-card` — o serviço ativo se expande e vira protagonista.
5. `minimal-list` — lista tipográfica limpa, sem aparência de cards.
6. `modular-blocks` — composição modular/bento com proporções diferentes.

## No HTML

```html
<section
  class="services-editorial"
  id="servicos"
  data-services-editorial
  data-services-variant="editorial-grid"
>
```

## Preview pela URL

```text
?services=editorial-grid
?services=stacked-panels
?services=horizontal-split
?services=focus-card
?services=minimal-list
?services=modular-blocks
```

Os parâmetros podem ser combinados com os demais packs do framework, por exemplo:

```text
?services=focus-card&about-image=fluid-bezier&about-info=manifesto
```

## Responsividade

As seis arquiteturas são aplicadas no desktop acima de 1024px. Em tablet e mobile, todas convergem para a estrutura responsiva já validada da seção, evitando sobreposição de imagem e perda de legibilidade.

## Preservado

- cinco serviços existentes;
- textos;
- imagens locais;
- links e mensagens de WhatsApp;
- estado ativo por hover/foco/clique;
- palavra ghost onde ela faz sentido;
- acessibilidade e reduced motion.

Nenhuma imagem foi criada ou alterada.
