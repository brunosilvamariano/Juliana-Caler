# 04 / Projetos — Sistema de variantes

A seção Projetos usa 5 imagens locais em WebP e possui três composições selecionáveis por `data-projects-variant` ou pela query string `?projects=`.

## Variantes atuais

- `editorial-grid` — grid editorial preservado, com dois destaques moderados e três cards de apoio.
- `balanced-masonry` — **Apple-inspired vertical thumbnail slider**. O nome histórico da query foi mantido para compatibilidade. A v3.83 usa um projeto protagonista e exatamente 4 projetos no seletor: thumbnails verticais no desktop/tablet e uma rail horizontal responsiva no mobile.
- `offset-grid` — composição preservada em 12 colunas, com primeira linha 7/5 e três módulos de apoio.

## `balanced-masonry` — Apple thumbnail slider

### Design system

A variante usa tokens locais e escopo próprio:

- fundo `#f5f5f7`;
- superfície branca;
- texto principal próximo de `#1d1d1f`;
- texto secundário `#6e6e73`;
- ação em `#0071e3`;
- tipografia de sistema (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`);
- radius consistente;
- sombra mínima;
- mídia sem overlay escuro;
- motion curto e discreto.

Nenhuma fonte proprietária da Apple é incluída no framework.

### Interação

- sem autoplay;
- seleção direta por miniatura;
- swipe/drag horizontal sobre a mídia principal;
- teclado: `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, `End`;
- miniaturas com `tablist`/`tab` e estado `aria-selected`;
- foco visível;
- `prefers-reduced-motion`;
- exatamente 4 projetos disponíveis para troca;
- sem setas visuais de anterior/próximo;
- desktop/tablet com 4 miniaturas verticais;
- mobile com 4 miniaturas em rail horizontal responsiva.

## Regras protegidas

- Sem lightbox.
- Sem modal.
- Cards não são transformados em links automaticamente.
- `editorial-grid` e `offset-grid` não herdam o visual ou o comportamento do carrossel.
- Conteúdo permanece no HTML/JSON existente; o JavaScript controla somente variante e interação.

## Teste rápido

```text
?projects=editorial-grid
?projects=balanced-masonry
?projects=offset-grid
```
