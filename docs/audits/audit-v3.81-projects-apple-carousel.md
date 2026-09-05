# Audit v3.81 — Projects Apple Carousel

## Escopo

Auditoria da reconstrução de `?projects=balanced-masonry` como carrossel horizontal Apple-inspired.

## Verificações técnicas

- HTML / semântica / ARIA: aprovado.
- CSS audit: aprovado.
- Project audit: aprovado após documentação completa da release.
- Variant audit: 26 variantes registradas.
- Content audit: JSON e slots HTML compatíveis.
- JavaScript: `node --check` em todos os arquivos.
- JSON: parse válido.
- CSS: parse com `tinycss2`.
- `!important` próprio: 0.
- CDN adicionada: nenhuma.

## Não regressão

A mudança fica restrita à variante `balanced-masonry` da seção Projects e aos controles/JS necessários para a sua interação. As variantes `editorial-grid` e `offset-grid` permanecem independentes. A seção Services e as demais seções não recebem estilos do novo carousel.

## Validação visual

A tentativa de screenshot com Chromium headless excedeu o timeout do ambiente e não gerou captura. Portanto, a validação estrutural/técnica foi concluída, mas **não** é afirmada validação visual automatizada por screenshot.
