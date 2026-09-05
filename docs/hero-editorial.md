> **Atualização v3.2:** o Hero agora possui múltiplas variantes. Consulte `docs/hero-variants.md`. O recorte editorial original permanece disponível como `data-hero-variant="organic"`.

# Hero Editorial Fluid

Primeiro Hero oficial da base premium.

## Arquivos

- `css/sections/hero.css` — composição, responsividade e estados visuais.
- `js/sections/hero.js` — validação da variante do Hero; motion global fica em `js/core/motion-engine.js`.
- `assets/images/hero/hero-editorial.webp` — imagem WebP 1600 × 1800 (8:9).
- `assets/icons/hero/` — ícones exclusivos do componente.
- `data/content/hero.json` — conteúdo editável do Hero carregado pelo Content Engine.

## Direção

- Editorial + Fluid.
- Texto sempre fora da fotografia principal para preservar legibilidade.
- Recorte orgânico criado por CSS, sem alterar a imagem original.
- Sem CDN externo.


### Bézier Responsivo v8
A curva não é rasterizada na imagem. O SVG no `index.html` mantém somente o `clipPath` geométrico usado pela variante `organic`. Não existe glow, linha de vidro, filtro, shade ou overlay sobre a fotografia.

### Mídia pura
As imagens do Hero são exibidas sem efeitos visuais aplicados sobre os pixels. O design vem da composição, do recorte estrutural e do enquadramento, não de gradientes ou filtros sobre a foto.
