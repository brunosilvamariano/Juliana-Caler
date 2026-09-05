# Customização sem `!important`

## Regra principal

Não personalize clientes adicionando `!important` dentro dos arquivos da engine. Use `css/custom.css`, carregado por último e fora das cascade layers do framework.

## Exemplos

Largura do título do Hero:

```css
.hero-editorial__title { max-width: 14ch; }
```

Largura do texto do Hero:

```css
.hero-editorial__text { max-width: 52ch; }
```

Somente uma variante:

```css
.hero-editorial[data-hero-variant="banner"] .hero-editorial__title {
  max-width: 12ch;
}
```

Troca de identidade global:

```css
:root {
  --color-primary: #2563eb;
}
```

## Por que funciona

As regras internas ficam dentro de `@layer`; `custom.css` não. Declarações normais não-layered vencem declarações normais layered antes mesmo da comparação de especificidade.

## Quando editar a engine

Edite `css/sections/`, `css/components/` ou `js/` quando a mudança deve virar comportamento oficial do framework e beneficiar todas as futuras implementações. Para um cliente específico, mantenha a alteração em `custom.css`.


## Conteúdo não deve ir para `custom.css`

Textos, imagens, links, serviços, projetos, FAQ, contato e redes sociais devem ser editados em `data/content/`. `custom.css` fica reservado para aparência e ajustes visuais do cliente.
