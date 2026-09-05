# Arquitetura CSS

## Objetivo

O framework separa **cascata interna** de **customização de projeto**. A regra é simples: o framework nunca deve obrigar quem personaliza um cliente a usar `!important`.

## Entrypoint

`css/app.css` declara a ordem oficial:

`vendor → reset → tokens → base → layout → components → sections → polish → accessibility`

Todos esses estilos são carregados em `@layer`.

`css/custom.css` é carregado depois e fica intencionalmente **fora de qualquer layer**. Em CSS, uma declaração normal não-layered tem prioridade sobre declarações normais dentro de layers, independentemente da especificidade interna. Isso permite, por exemplo:

```css
.hero-editorial__title {
  max-width: 14ch;
}
```

mesmo quando uma variante do Hero possui um seletor interno mais específico.

## Onde editar

1. Tokens globais: `css/base/variables.css`.
2. Ajustes exclusivos do cliente: `css/custom.css`.
3. Engine/variantes: altere os arquivos internos apenas quando estiver evoluindo o próprio framework.

## Política de especificidade

Seletores de variantes podem ser específicos para garantir isolamento entre composições. Essa especificidade pertence à engine e não deve vazar para a customização do projeto. O boundary de `@layer` resolve essa separação sem hacks.

## Política de `!important`

O código próprio do framework deve permanecer com **zero ocorrências de `!important`**. A auditoria `scripts/audit-css.py` falha se uma nova ocorrência for introduzida em `css/`.


## Design System das seções

About, Services, Projects, FAQ e Contact compartilham tokens de identidade em `css/base/variables.css`. O Hero é a exceção e mantém escala própria.

Uma variante pode mudar composição e componentes internos, mas não deve redefinir a tipografia do heading/topline da seção. Consulte `docs/section-design-system.md`.
