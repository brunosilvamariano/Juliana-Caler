# V3.37 — Projects Grid Correction

## Objetivo
Corrigir a seção Projetos após a revisão visual da V3.36, removendo o lightbox e tornando todas as grades previsíveis, proporcionais e coerentes com a escala premium da página.

## Alterações
- Lightbox de projetos removido do HTML, CSS e JavaScript.
- `css/components/project-lightbox.css` removido do projeto.
- Imagens dos cards não abrem modal ao clicar.
- Setas dos cards agora são links funcionais para `#contato`.
- `editorial-grid`: 2 cards equilibrados na primeira linha e 3 iguais na segunda.
- `compact-carousel`: cards menores, manual, sem autoplay.
- `refined-coverflow`: profundidade sutil, dimensões limitadas e sem abertura de imagem.
- `split-feature`: um destaque horizontal + quatro cards em matriz 2x2; sem bloco vertical gigante.
- `minimal-list`: lista editorial estável no desktop; fallback seguro em tablet/mobile.
- `balanced-masonry`: assimetria controlada, sem margens negativas ou sobreposições.
- Tablet: matriz de 2 colunas para layouts editoriais, com primeiro destaque onde aplicável.
- Mobile: uma coluna para layouts editoriais; carrossel/coverflow mantêm navegação manual.

## Validação
Executar:

```bash
python3 scripts/audit-html.py .
```

E validar JavaScript com:

```bash
node --check js/sections/projects.js
```
