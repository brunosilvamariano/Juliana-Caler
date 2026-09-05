# V3.19 — Header / Sidebar Variants

Esta versão transforma o header lateral em um componente com seis direções visuais sem duplicar a estrutura HTML.

## Variantes

1. `minimal` — limpa, discreta e com pouca sombra.
2. `glass` — superfície translúcida com blur controlado.
3. `floating` — peça independente com maior respiro e elevação.
4. `split` — separação estrutural entre marca, navegação e rodapé.
5. `border-line` — linguagem arquitetônica baseada em linhas e poucos preenchimentos.
6. `dynamic` — estados ativos e hovers mais expressivos.

## Como escolher a variante padrão

No `<body>`:

```html
<body data-header-variant="minimal">
```

Troque `minimal` pelo nome desejado.

## Preview rápido pela URL

Sem editar HTML:

- `?header=minimal`
- `?header=glass`
- `?header=floating`
- `?header=split`
- `?header=border-line`
- `?header=dynamic`

O JavaScript valida o parâmetro e aplica somente variantes suportadas.

## Responsividade

As seis variantes reutilizam o mesmo drawer mobile. `glass`, `floating`, `split`, `border-line` e `dynamic` recebem ajustes próprios no header móvel sem duplicar a navegação.

## Regra visual preservada

As formas orgânicas removidas na V3.18 continuam removidas. Nenhuma variante cria pseudo-elementos decorativos atrás dos textos, links ou CTA.
