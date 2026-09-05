# Auditoria v3.68 — Foundation Audit + Custom Cascade

## Escopo

Auditoria completa do framework v3.67 com foco em manutenção, cascata CSS, variantes, semântica, estrutura de arquivos, documentação, assets, JavaScript e capacidade de customização sem `!important`.

## Diagnóstico encontrado

- 33 ocorrências de `!important` no CSS próprio.
- Especificidade interna alta em variantes, especialmente Header/CTA, Services e Hero.
- `sidebar.css` concentrava aproximadamente 60 KB e quatro responsabilidades diferentes.
- Um trecho órfão no Hero formava um seletor concatenado de especificidade anormal; a correção preserva o comportamento efetivo da v3.67.
- Histórico de releases ocupava o mesmo nível dos guias atuais em `docs/`.
- README acumulava trechos contraditórios de releases antigas.
- Algumas regras transversais dependiam de `!important` apenas para vencer a ordem da cascata.
- Assets grandes foram identificados, mas **nenhuma imagem foi recriada, comprimida ou alterada** nesta auditoria.

## Correções estruturais

### Cascata CSS

Criado `css/app.css` com ordem explícita de layers:

`vendor → reset → tokens → base → layout → components → sections → polish → accessibility`

Criado `css/custom.css`, carregado depois e intencionalmente fora de qualquer layer. Assim uma regra normal de projeto vence regras normais internas independentemente da especificidade da variante.

Resultado: **0 ocorrências de `!important` no CSS próprio**.

### Sidebar

O antigo arquivo monolítico foi separado sem reordenar suas regras:

- `css/components/sidebar/core.css`
- `css/components/sidebar/header-variants.css`
- `css/components/sidebar/cta-variants.css`
- `css/components/sidebar/top-header-adapter.css`

A separação é de responsabilidade, não de design.

### Acessibilidade e polish

- `css/base/accessibility.css` concentra a guarda final de `prefers-reduced-motion` e `.sr-only`.
- `css/base/polish.css` concentra poucas regras transversais que antes dependiam de `!important`.

### Documentação

- Releases históricas movidas para `docs/releases/`.
- Auditorias movidas para `docs/audits/`.
- Criados `docs/README.md`, `docs/css-architecture.md` e `docs/customization.md`.
- README raiz reescrito para refletir somente o estado atual.

### Auditorias reproduzíveis

- `scripts/audit-css.py`: layers, imports, zero `!important`, parse CSS e customização.
- `scripts/audit-project.py`: orquestra HTML, variantes, CSS, JS, JSON, estrutura e assets.

## Semântica e HTML

O HTML estrutural foi preservado. Landmarks, hierarquia principal de headings, ARIA, âncoras, imagens e links continuam cobertos por `scripts/audit-html.py`.

## JavaScript e variantes

Nenhuma lógica de variante, movimento, accordion, navegação, marquee ou CTA foi redesenhada nesta release. `scripts/audit-variants.py` continua verificando 53 variantes e a matriz Header × CTA.

## Assets

Nenhum pixel foi alterado. A auditoria apenas inventaria pesos e duplicatas. Arquivos pesados podem ser otimizados futuramente de forma deliberada, com comparação visual antes/depois.

## Limite da validação

A auditoria estrutural pode garantir sintaxe, cascata, referências, inventário e contratos de variantes. Validação visual final continua recomendada no Live Server em desktop/tablet/mobile, pois o ambiente automatizado disponível não é confiável para screenshots do projeto.

## Resultado final da auditoria automatizada

- 53 variantes registradas verificadas.
- 36 combinações Header × CTA estruturalmente disponíveis.
- 24 arquivos CSS próprios/entrypoints analisados.
- 0 declarações `!important` no CSS próprio.
- Maior especificidade anormal do Hero removida: o máximo encontrado caiu de `(0,11,0)` para `(0,5,0)`; os seletores restantes de maior especificidade ficam encapsulados pelas cascade layers e não bloqueiam `css/custom.css`.
- 13 arquivos JavaScript passaram em `node --check`.
- 3 JSONs de dados passaram em parse; o preset de Home foi alinhado ao comportamento atual (slider sem autoplay, título de Serviços sem quebra estrutural forçada e terceiro canal de Contato como rota do Google Maps).
- 67 referências de caminhos na documentação atual verificadas.
- 42 assets de imagem/favicon inventariados.
- 0 assets locais sem referência no conjunto do projeto.
- 0 problemas de trailing whitespace/newline final nos arquivos próprios auditáveis.
- 0 dependências HTTP externas em CSS/JavaScript.

## Itens preservados deliberadamente

- `assets/images/services/service-04.webp` (~694 KB) e `service-05.webp` (~842 KB) são relativamente pesados. Não foram recomprimidos porque isso alteraria os bytes das imagens; otimização deve ser uma etapa visual separada.
- `assets/images/about/about-01.webp` e `assets/images/faq/faq-editorial.webp` são binariamente iguais. A duplicação foi preservada para manter independência semântica entre módulos e evitar acoplamento About → FAQ.
- `robots.txt`/`sitemap.xml` possuem URL de implantação concreta, enquanto `data/global/site.json` mantém `url: null`. Não foi escolhida uma canonical automaticamente porque isso exige confirmar o domínio final e a política www/non-www do projeto.
- Arquivos de `vendor/` não foram formatados ou reescritos; headers/licenças de terceiros permanecem intactos.

## Garantia de customização

Para customizações de projeto, a regra oficial é usar `css/custom.css`. Como ele é não-layered e vem depois de `css/app.css`, uma declaração normal simples vence a engine layered sem necessidade de elevar especificidade.

Exemplo validado pela arquitetura:

```css
.hero-editorial__title {
  max-width: 14ch;
}
```

Isso vale inclusive quando a variante ativa possui um seletor interno mais específico para o mesmo elemento.
