# FAQ — variantes

O FAQ possui somente duas variantes oficiais.

- `premium-panel`: versão principal, com título, texto e CTA no bloco de introdução.
- `image-panel`: mantém o mesmo accordion e CTA, substituindo visualmente título e parágrafo por uma imagem local.

## Configuração

A variante oficial fica explícita no `index.html`:

```html
data-faq-variant="premium-panel"
```

Para preview temporário, use `?faq=premium-panel` ou `?faq=image-panel`.

A imagem da segunda variante fica em `assets/images/faq/faq-editorial.webp`. Ela é estática e não recebe animação direta.

Os números visuais das perguntas foram removidos.
