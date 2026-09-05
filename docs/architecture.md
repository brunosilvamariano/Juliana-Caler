# Arquitetura — Premium Foundation v3

A fundação separa **engine**, **variantes** e **customização de projeto**. O objetivo é permitir evolução visual sem criar uma cadeia de overrides frágeis.

## 1. Entrypoint CSS e cascata

`css/app.css` é o único entrypoint da engine. Ele carrega os módulos em cascade layers na ordem:

`vendor → reset → tokens → base → layout → components → sections → polish → accessibility`

`css/custom.css` é carregado depois e fica fora de layers. É a superfície oficial para adaptações de cada cliente sem aumentar especificidade e sem marcador de prioridade.

## 2. Base

`css/base/` contém reset, tokens, tipografia, regras globais, utilitários, polish transversal e acessibilidade.

- `variables.css`: design tokens.
- `reset.css`: normalização.
- `typography.css`: hierarquia tipográfica.
- `global.css`: regras globais e integração Lenis.
- `motion-directional.css`: helpers de motion.
- `polish.css`: poucas regras transversais com prioridade interna explícita pela layer.
- `accessibility.css`: guarda final de acessibilidade e reduced motion.

## 3. Layout

`css/layout/` controla shells e deslocamentos globais. Não deve conter aparência interna de seções.

## 4. Components

`css/components/` e `js/components/` contêm componentes reutilizáveis. A Sidebar é modularizada por responsabilidade:

- `sidebar/core.css` — base e drawer mobile;
- `sidebar/header-variants.css` — arquiteturas de header;
- `sidebar/cta-variants.css` — identidades dos CTAs;
- `sidebar/top-header-adapter.css` — encaixe responsivo dos CTAs no header horizontal `top-dock`.

A separação não cria novos layouts; apenas torna explícita a responsabilidade de cada bloco.

## 5. Sections

`css/sections/` e `js/sections/` isolam Hero, Marquee, About, Services, Projects, FAQ e Contact. Uma mudança em uma seção não deve exigir hacks em outra.

## 6. Sistema de variantes

O HTML define a variante oficial com `data-*`. Query strings são apenas override de preview. JavaScript valida valores permitidos; CSS define aparência. O inventário central fica em `docs/variant-registry.md`.

## 7. Motion Engine

GSAP, ScrollTrigger e Lenis são dependências locais. O motion deve ser progressivo, trabalhar grandes blocos e respeitar `prefers-reduced-motion`. Fotografias principais não recebem animação direta.

## 8. Conteúdo JSON

`data/content/` concentra o conteúdo editável do cliente. `js/core/content-loader.js` carrega o manifest e hidrata o DOM sem recriar estrutura.

O HTML continua sendo a fonte de verdade para **estrutura semântica, quantidade de slots e fallback**. O JSON é a fonte editável para textos, imagens, links e dados. Se o carregamento falhar, o HTML permanece funcional.

## 9. Vendor

Bibliotecas de terceiros ficam em `vendor/` com seus próprios avisos/licenças. Nenhuma dependência de runtime deve ser adicionada por CDN sem decisão explícita.

## 10. Evolução

Antes de criar arquivos `final`, `v2`, `fix` ou overrides soltos, identifique a responsabilidade correta do módulo. Alterações específicas de cliente vão para `css/custom.css`; alterações que devem virar regra da engine entram no módulo oficial e precisam passar por `scripts/audit-project.py`.
