# Premium Foundation v3 — Modern Engine

Framework proprietário, estático e reutilizável para sites e landing pages premium, construído com HTML, CSS e JavaScript puros, dependências locais e arquitetura orientada a variantes.

> **Licença:** este projeto não é open source. Consulte `LICENSE`, `COPYRIGHT.md` e `THIRD_PARTY_NOTICES.md`.

## Estado atual

Versão: **v3.86 — Section Design System**

A release centraliza o Design System das seções internas em tokens globais. About, Services, Projects, FAQ e Contact agora compartilham shell, topline, escala de título e copy; o Hero continua com escala própria. FAQ e Contact também passam a alinhar sua borda externa ao shell do Hero/top-dock no desktop, com recuo responsivo equivalente no tablet/mobile.

## Princípios

- HTML é a fonte de verdade para estrutura semântica e variante padrão; JSON é a fonte editável de conteúdo do cliente.
- Query strings servem somente como override de preview.
- CSS é separado em base, layout, componentes e seções.
- JavaScript é separado em core, componentes e seções.
- `css/custom.css` é a superfície oficial de personalização por projeto.
- Dependências são locais; sem CDN no runtime.
- Fotografias principais não recebem animação direta.
- Motion trabalha grandes blocos de seção e respeita `prefers-reduced-motion`.
- Semântica, acessibilidade e auditabilidade fazem parte da fundação.

## Estrutura

```text
assets/                 imagens, logos, ícones e fontes locais
css/app.css             entrypoint e ordem oficial das cascade layers
css/custom.css          personalizações do cliente, sem !important
css/base/               tokens, reset, tipografia, globais, polish e acessibilidade
css/layout/             estrutura global
css/components/         componentes reutilizáveis
css/components/sidebar/ sidebar separada em core, headers, CTAs e adapter
css/sections/           estilos por seção
data/content/           conteúdo JSON editável do cliente
docs/                   arquitetura, guias e referências
docs/audits/            auditorias
docs/releases/          histórico de releases
favicon/                favicon e manifest
js/core/                content engine, bootstrap, scroll e motion
js/components/          componentes globais
js/sections/            comportamento das seções
scripts/                auditorias reproduzíveis
snippets/               referências reutilizáveis
vendor/                 dependências de terceiros locais
index.html              composição entregue ao navegador
```

## Executar localmente

Use Live Server no VS Code ou um servidor estático simples:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

## Conteúdo por JSON

Edite os arquivos em `data/content/` para trocar textos, imagens, links, contatos, redes sociais, serviços, projetos e FAQ sem procurar conteúdo dentro do HTML. Use Live Server para que o navegador possa carregar os JSONs locais.

Guia rápido: `CONTEUDO.md`. Documentação técnica: `docs/content-engine.md` e `data/content/README.md`.

## Customizar sem `!important`

O framework interno é carregado através de `css/app.css` em cascade layers. `css/custom.css` é carregado depois e fica fora de qualquer layer. Por isso uma regra simples em `custom.css` pode sobrescrever regras internas de variantes sem aumentar especificidade:

```css
.hero-editorial__title {
  max-width: 14ch;
}
```

Consulte `docs/customization.md` e `docs/css-architecture.md`.

## Variantes

A variante oficial fica explícita no HTML; query strings são preview temporário. Exemplo:

```text
?header=top-dock&cta=calendar&hero=banner
```

Inventário completo: `docs/variant-registry.md`.

## Dependências

- GSAP 3.15.0
- ScrollTrigger 3.15.0
- Lenis 1.3.25

Arquivos em `vendor/` mantêm seus próprios termos. Consulte `THIRD_PARTY_NOTICES.md`.

## Auditorias

Na raiz:

```bash
python scripts/audit-project.py
```

Ou individualmente:

```bash
python scripts/audit-html.py .
python scripts/audit-variants.py
python scripts/audit-css.py
python scripts/audit-content.py
```

## Documentação essencial

- `CONTEUDO.md` — referência rápida dos JSONs do cliente
- `docs/README.md` — índice da documentação
- `docs/architecture.md` — arquitetura geral
- `docs/css-architecture.md` — cascata CSS
- `docs/customization.md` — personalização sem `!important`
- `docs/content-engine.md` — conteúdo JSON e fallback HTML
- `docs/variant-registry.md` — variantes
- `docs/semantics-accessibility.md` — semântica/acessibilidade
- `docs/release-checklist.md` — checklist de produção
- `docs/audits/audit-v3.83-projects-thumbnail-slider-4-cards.md` — auditoria desta release
- `docs/audits/audit-v3.82-projects-apple-thumbnail-slider.md` — auditoria da release anterior
- `docs/audits/audit-v3.81-projects-apple-carousel.md` — auditoria da release anterior
- `docs/audits/audit-v3.79-services-horizontal-rail.md` — auditoria da release anterior
- `docs/releases/` — histórico

## Segurança, direitos e produção

Não armazene segredos no front-end. Formulários, autenticação, APIs, pagamentos, dados pessoais e headers de segurança exigem implementação específica. Consulte `SECURITY.md`.

O Framework é proprietário; dependências de terceiros não são relicenciadas pela licença raiz. Para distribuição, cessão ou uso comercial específico, consulte `LICENSE`, `COPYRIGHT.md`, `THIRD_PARTY_NOTICES.md` e `docs/legal-and-rights.md`.

Canonical, Open Graph, social cards e JSON-LD devem ser preenchidos somente quando os dados finais de cada projeto existirem.


## Referência de variantes

Consulte `VARIANTES.md` para a lista completa e atual das 26 variantes com query strings prontas para copiar. O registro técnico fica em `docs/variant-registry.md`.

## Release v3.84 — consistência tipográfica das seções

Services e Projects voltam a herdar o padrão original de tamanho, peso, fonte e accent dos títulos da seção. O estilo Apple-inspired permanece restrito aos componentes internos das variantes.

## Release v3.85 — alinhamento do cabeçalho de Projects

O topline de Projects volta ao padrão estrutural das demais seções internas: índice/nome na margem esquerda e meta na margem direita do mesmo container editorial. Nenhuma variante, grid, slider ou tipografia foi alterada.



## Release v3.86 — Section Design System

A identidade das seções internas foi tokenizada em `css/base/variables.css`. Variantes continuam livres para mudar cards, grids, sliders e superfícies, mas não devem alterar peso/tamanho do heading principal ou do topline. Consulte `docs/section-design-system.md`.
