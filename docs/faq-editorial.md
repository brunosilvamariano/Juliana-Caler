# FAQ — Editorial Floating

- Seção encapsulada com borda e respiro inspirados no Hero.
- Não fica grudada em Projetos nem na futura seção seguinte.
- Layout desktop em duas colunas.
- Accordion com uma resposta aberta por vez.
- Responsivo para tablet e mobile.
- Conteúdo editável em `data/content/faq.json`.
- Sidebar: antigo item Insights foi convertido para FAQ.

## v13.4 — Sticky FAQ
- Coluna esquerda fica sticky no desktop.
- Título, parágrafo e CTA permanecem visíveis enquanto as 6 dúvidas passam.
- Em tablet/mobile volta ao fluxo normal.
- `overflow: clip` substitui `overflow: hidden` para não quebrar o sticky.
