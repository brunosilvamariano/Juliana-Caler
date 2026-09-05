# Content Engine JSON

O Content Engine separa o conteúdo do cliente da engine visual sem mudar o layout do framework.

## Responsabilidades

- `index.html`: estrutura semântica, fallback e variantes padrão.
- `data/content/*.json`: conteúdo editável do cliente.
- `js/core/content-loader.js`: hidratação segura JSON → DOM.
- `css/`: aparência e responsividade.
- `js/components/` e `js/sections/`: comportamento.

O loader nunca cria ou remove seções/cards. Ele apenas atualiza texto, imagens, links e atributos nos slots que já existem no HTML.

## Fluxo

1. Abra o projeto com Live Server.
2. Edite o JSON da seção.
3. Salve.
4. O Live Server recarrega a página.
5. O loader aplica o JSON.

Se o JSON falhar, o HTML existente permanece visível.

## Arquivos

- `data/content/site.json`
- `data/content/navigation.json`
- `data/content/cta.json`
- `data/content/hero.json`
- `data/content/marquee.json`
- `data/content/about.json`
- `data/content/services.json`
- `data/content/projects.json`
- `data/content/faq.json`
- `data/content/contact.json`

`data/content/manifest.json` registra os arquivos carregados.

## Validação

```bash
python scripts/audit-content.py
```

A auditoria verifica JSON, slots HTML, variantes de copy, navegação e assets locais.
