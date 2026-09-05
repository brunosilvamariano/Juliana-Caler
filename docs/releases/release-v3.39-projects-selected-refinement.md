# v3.39 — Projects Selected Layout Refinement

Revisão de qualidade das três variações principais de Projetos após a limpeza da v3.38.

## O que mudou

- `editorial-grid`: preserva a composição 2 + 3, com escala moderada e proporções mais consistentes.
- `minimal-list`: deixa de virar grid genérico em tablet/mobile; mantém thumbnail + conteúdo em formato de lista em todas as larguras.
- `balanced-masonry`: ganha composição própria em desktop (destaque 2/3, dois apoios laterais e fechamento em duas peças), sem margens negativas, sobreposição ou imagens fullscreen.
- `refined-coverflow`: preservado sem alterações estruturais como quarta opção existente.
- Mantido: sem lightbox, sem autoplay e sem setas sobre as imagens.

## Variantes disponíveis

- `?projects=editorial-grid`
- `?projects=refined-coverflow`
- `?projects=minimal-list`
- `?projects=balanced-masonry`

## Responsividade

- Desktop: cada uma das três linguagens mantém identidade própria.
- Tablet: grids fotográficos usam matriz previsível de duas colunas; lista continua lista.
- Mobile amplo: duas colunas quando há espaço; lista permanece compacta.
- Mobile estreito: composições fotográficas caem para uma coluna; lista mantém thumbnail lateral.

## Validação

Executar:

```bash
python3 scripts/audit-html.py .
```

E validar JavaScript com `node --check` nos arquivos em `js/`.
