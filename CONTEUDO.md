# Conteúdo do cliente — referência rápida

O conteúdo editável fica em `data/content/`.

| Quero alterar | Arquivo |
|---|---|
| nome da marca, título da página, descrição, logo, redes sociais, WhatsApp e rodapé | `data/content/site.json` |
| nomes e destinos do menu | `data/content/navigation.json` |
| textos das variantes de CTA | `data/content/cta.json` |
| Hero | `data/content/hero.json` |
| palavras do Marquee | `data/content/marquee.json` |
| Sobre / About | `data/content/about.json` |
| Atendimentos | `data/content/services.json` |
| Galeria | `data/content/projects.json` |
| FAQ | `data/content/faq.json` |
| Contato | `data/content/contact.json` |

## Exemplo

Para atualizar o conteúdo do site da Bruna Gesser, use principalmente:

```text
data/content/site.json
data/content/hero.json
data/content/about.json
data/content/services.json
data/content/projects.json
data/content/faq.json
data/content/contact.json
css/custom.css
```

O JSON muda conteúdo. `css/custom.css` muda identidade/visual. As variantes continuam sendo escolhidas no HTML ou temporariamente pela query string.

## Desenvolvimento local

Use Live Server. O navegador normalmente bloqueia `fetch()` de JSON quando o arquivo é aberto diretamente por `file://`.

## Segurança

Não coloque senhas, tokens privados, chaves secretas ou dados sensíveis nesses JSONs: tudo no front-end é público.

Guia completo: `docs/content-engine.md`.
