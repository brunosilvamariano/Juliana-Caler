# Audit v3.82 — Projects Apple Thumbnail Slider

## Escopo

Auditoria da reconstrução de `?projects=balanced-masonry` como vertical thumbnail slider Apple-inspired.

## Verificações técnicas

- HTML / semântica / ARIA: aprovado.
- CSS audit: aprovado.
- Project audit: aprovado.
- Variant audit: 26 variantes registradas.
- Content audit: JSON e slots HTML compatíveis.
- JavaScript: `node --check` em todos os arquivos.
- JSON: parse válido.
- CSS: parse com `tinycss2`.
- `!important` próprio: 0.
- CDN adicionada: nenhuma.

## Não regressão

A mudança fica restrita à variante `balanced-masonry` da seção Projects e à documentação desta release. `editorial-grid` e `offset-grid` continuam independentes; Services e as demais seções não receberam alterações de produção.

A comparação binária com a v3.81 confirmou que os arquivos de produção alterados foram somente:

- `index.html`;
- `css/sections/projects.css`;
- `js/sections/projects.js`.

## Validação visual

Foi tentada uma captura automatizada com Chromium headless em `?projects=balanced-masonry`, mas o navegador excedeu o timeout do ambiente e não gerou screenshot utilizável. Portanto, a validação estrutural/técnica passou, porém **não** é afirmada validação visual automatizada.
