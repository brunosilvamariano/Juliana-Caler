# Release v3.74 — Hero Shell Alignment

## Objetivo

Aplicar às variantes `organic`, `diagonal`, `split` e `arch` o mesmo alinhamento editorial já usado pelo `banner` quando o Header ativo é `top-dock`.

## Regra de largura

No desktop, o Header `top-dock` e todas as cinco variantes atuais do Hero usam o mesmo shell das demais seções:

```css
width: min(100% - clamp(40px, 7vw, 112px), 1440px);
margin-inline: auto;
```

Variantes cobertas:

- `organic`
- `diagonal`
- `split`
- `arch`
- `banner`

## Escopo

A alteração afeta apenas o contêiner externo do Hero quando `top-dock` está ativo. Não altera:

- grid interno;
- proporção texto/imagem;
- `clip-path`;
- `object-fit` / `object-position`;
- conteúdo;
- motion;
- comportamento da `sidebar-premium`;
- responsividade mobile/tablet existente.

## Preview

```text
?header=top-dock&hero=organic
?header=top-dock&hero=diagonal
?header=top-dock&hero=split
?header=top-dock&hero=arch
?header=top-dock&hero=banner
```
