# Release v3.57 — Responsive Typography Cleanup

## Objetivo

Reduzir quebras de linha forçadas no conteúdo principal e deixar a tipografia responder naturalmente à largura disponível em desktop, tablet e mobile.

## Alterações

- Removidos `<br>` dos títulos de Serviços, Projetos, FAQ e Contato.
- Removidos `<br>` das tags/listas curtas dos cards de Serviços.
- Mantidos `<br>` apenas nos metadados curtos de duas linhas, onde a quebra representa dois grupos de informação deliberados.
- O título do About continua usando spans por linha porque essa composição também é usada pela estrutura visual/motion da seção; não depende de `<br>`.
- Títulos principais receberam `text-wrap: balance` e `overflow-wrap: normal`.
- Serviços, Projetos, FAQ e Contato receberam largura tipográfica em `ch`, com ajustes específicos no mobile, para evitar linhas excessivamente compridas ou quebras artificiais.
- Hero preservado visualmente e recebeu apenas a normalização explícita de `overflow-wrap`.
- Nenhuma imagem, grid, variante ou comportamento interativo foi alterado.

## Regra do framework

Quebra manual com `<br>` deve ser exceção. Para títulos, preferir largura tipográfica (`max-width` em `ch`), `clamp()` e `text-wrap: balance`. Usar `<br>` somente quando a quebra tiver significado editorial deliberado e continuar correta entre breakpoints.

## Arquivos alterados

- `index.html`
- `css/sections/hero.css`
- `css/sections/about.css`
- `css/sections/services.css`
- `css/sections/projects.css`
- `css/sections/faq.css`
- `css/sections/contact.css`
