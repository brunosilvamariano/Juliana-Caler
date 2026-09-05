# V3.21 — Correção do respiro do Hero com headers no topo

Nas variantes `top-dock`, `split-nav` e `full-top`, a sidebar deixa de ocupar espaço lateral e o `site-main` passa a começar em `margin-left: 0`.

O Hero original foi desenhado para o layout com sidebar e, por isso, tinha margem externa somente no lado direito. Com o header no topo, isso fazia a borda esquerda encostar demais na viewport.

## Correção

No desktop, as variantes de header horizontal recebem:

```css
margin-left: var(--sidebar-offset);
```

diretamente no `.hero-editorial`.

Assim o Hero mantém o mesmo gutter visual nos lados esquerdo e direito sem alterar:
- borda;
- raio;
- sombra;
- variantes do Hero;
- composição interna;
- comportamento mobile.
