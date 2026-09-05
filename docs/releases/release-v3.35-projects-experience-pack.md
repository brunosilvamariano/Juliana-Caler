# Release v3.35 — Projects Experience Pack

## Objetivo

Transformar a seção Projetos em um sistema de apresentações reutilizáveis, preservando o conteúdo HTML e o lightbox, sem autoplay e sem adicionar dependências externas.

## Variantes

- `editorial-grid`: composição assimétrica original preservada.
- `cinematic`: projetos panorâmicos em faixas alternadas.
- `masonry`: composição editorial irregular controlada.
- `manual-carousel`: trilho horizontal manual com drag/swipe, teclado e botões.
- `coverflow`: galeria com perspectiva 3D, projeto central dominante e navegação manual.
- `split-feature`: projeto protagonista grande acompanhado por quatro projetos secundários.

## Como testar

Use o parâmetro `projects` na URL:

```text
?projects=editorial-grid
?projects=cinematic
?projects=masonry
?projects=manual-carousel
?projects=coverflow
?projects=split-feature
```

## Arquivos alterados

- `index.html`: adiciona `data-projects-variant` e controles acessíveis do navegador manual.
- `css/sections/projects.css`: estilos e responsividade das seis variantes.
- `js/sections/projects.js`: seleção via query string, drag/swipe, teclado, controles e integração com lightbox.

## Comportamento de acessibilidade

- nenhum carrossel possui autoplay;
- botões anterior/próximo possuem nomes acessíveis;
- contador usa `aria-live="polite"`;
- teclado com setas atua quando o foco está dentro da seção;
- o lightbox preserva foco, ESC, setas e trap de TAB;
- em Coverflow, clicar em um card lateral primeiro o torna ativo; o card ativo abre o lightbox.

## Observação arquitetural

Os dados dos projetos continuam no HTML. O JavaScript lê imagem, título e categoria diretamente dos cards, evitando duplicação de conteúdo em arrays JS ou JSON.
