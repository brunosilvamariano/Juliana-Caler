# Release v3.42 — Projects Preserved Grid Pack

## Objetivo

Esta versão parte diretamente da v3.39 e aplica somente as mudanças solicitadas na seção Projetos.

## Preservado sem redesenho

- `editorial-grid`: composição desktop e regras responsivas mantidas da v3.39.
- `balanced-masonry`: composição desktop e regras responsivas mantidas da v3.39.
- Conteúdo, imagens, overlay, tipografia, hover e rodapé da seção continuam na mesma arquitetura da v3.39.

## Removido

- `refined-coverflow`
- `minimal-list`
- Navegador textual Anterior / Próximo
- Drag, swipe, teclado e JavaScript específicos do coverflow

## Adicionado

### `offset-grid`

Nova terceira opção em grid. No desktop, usa 12 colunas com uma primeira linha 7/5 e três cards de apoio na linha seguinte. Existem apenas deslocamentos verticais leves; não há sobreposição, autoplay, lightbox ou imagem fullscreen.

## Variantes atuais

- `?projects=editorial-grid`
- `?projects=balanced-masonry`
- `?projects=offset-grid`

## Validação

Executar:

```bash
python3 scripts/audit-html.py .
```

E validar JavaScript com:

```bash
node --check js/sections/projects.js
```
