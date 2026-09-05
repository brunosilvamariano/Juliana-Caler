# Release v3.73 — Header Curated 2 + Top Dock Width

## Objetivo

Reduzir o inventário oficial de Header para duas arquiteturas realmente úteis e alinhar o `top-dock` ao mesmo shell visual das seções editoriais.

## Variantes oficiais

- `sidebar-premium`
- `top-dock`

Foram removidas do runtime e da documentação ativa: `split-nav`, `vertical-rail`, `full-top` e `hybrid`.

## Top Dock

No desktop, o dock horizontal usa:

```css
width: min(100% - clamp(40px, 7vw, 112px), 1440px);
```

Ele permanece centralizado. Quando combinado com `?hero=banner`, o Hero banner usa exatamente a mesma largura, criando alinhamento lateral consistente com as demais seções editoriais.

## Compatibilidade

- `sidebar-premium` permanece inalterado.
- As seis variantes de CTA continuam disponíveis.
- No mobile, a navegação continua usando o drawer/mobile header existente.
- Nenhuma variante de Hero, About, Services, Projects ou FAQ foi removida nesta etapa.
