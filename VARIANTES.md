# Variantes do Framework

Referência rápida das variantes atualmente suportadas pelo framework.

> Use as query strings abaixo apenas para preview durante o desenvolvimento. Para definir uma variante permanentemente, altere o atributo `data-*` correspondente no `index.html`.

## Resumo

- Header: 2 variantes
- CTA: 2 variantes
- Hero: 5 variantes
- Marquee: 2 variantes
- About — imagem: 6 variantes
- About — conteúdo: 2 variantes
- Serviços: 2 variantes
- Projetos: 3 variantes
- FAQ: 2 variantes
- Total: 26 variantes

---

## 1. Header

Parâmetro: `header`

```text
?header=sidebar-premium
?header=top-dock
```

Padrão: `sidebar-premium`

Atributo permanente no HTML: `data-header-variant`

No desktop, `top-dock` usa a mesma largura útil das seções editoriais (até 1440px). Todas as cinco variantes atuais do Hero — `organic`, `diagonal`, `split`, `arch` e `banner` — compartilham esse mesmo shell quando o `top-dock` está ativo.

---

## 2. CTA

Parâmetro: `cta`

```text
?cta=calendar
?cta=minimal
```

Padrão: `calendar`

Atributo permanente no HTML: `data-sidebar-cta`

As duas variantes mantêm a própria identidade em `sidebar-premium` e recebem apenas adaptação de encaixe no `top-dock`. `calendar` preserva avatar + copy + ação circular; `minimal` permanece leve, sem card pesado.

---

## 3. Hero

Parâmetro: `hero`

```text
?hero=organic
?hero=diagonal
?hero=split
?hero=arch
?hero=banner
```

Padrão atual: `organic`

Atributo permanente no HTML: `data-hero-variant`

---

## 4. Marquee

Parâmetro: `marquee`

```text
?marquee=modern-clean
?marquee=soft-outline
```

Padrão: `modern-clean`

Atributo permanente no HTML: `data-marquee-variant`

---

## 5. About — imagem

Parâmetro: `about-image`

```text
?about-image=fluid-bezier
?about-image=soft-arch
?about-image=architectural
?about-image=editorial-cut
?about-image=soft-capsule
?about-image=minimal-frame
```

Padrão: `fluid-bezier`

Atributo permanente no HTML: `data-about-image-variant`

---

## 6. About — conteúdo

Parâmetro: `about-info`

```text
?about-info=vision-mission-values
?about-info=philosophy
```

Padrão: `vision-mission-values`

Atributo permanente no HTML: `data-about-info-variant`

---

## 7. Serviços

Parâmetro: `services`

```text
?services=premium-grid
?services=premium-cards
```

Padrão: `premium-grid`

`premium-grid` segue um design system Apple-inspired: bento 12 colunas, tipografia de sistema, superfícies neutras, radius consistente e ação em azul, sem alterar a arquitetura global do framework.

`premium-cards` usa um trilho horizontal premium: drag por mouse, swipe/trackpad nativos, scroll snap, botões e teclado, sem autoplay.

Atributo permanente no HTML: `data-services-variant`

---

## 8. Projetos

Parâmetro: `projects`

```text
?projects=editorial-grid
?projects=balanced-masonry
?projects=offset-grid
```

Padrão: `editorial-grid`

`balanced-masonry` mantém o identificador histórico e usa um **vertical thumbnail slider Apple-inspired**. Na v3.83, a variante exibe exatamente **4 projetos** e não possui setas visuais de anterior/próximo: a troca ocorre pelas miniaturas, swipe/drag ou teclado. Desktop e tablet mantêm as 4 miniaturas verticais; no mobile elas formam uma rail horizontal responsiva. `editorial-grid` e `offset-grid` continuam grids independentes e preservam seus 5 projetos.

Atributo permanente no HTML: `data-projects-variant`

---

## 9. FAQ

Parâmetro: `faq`

```text
?faq=premium-panel
?faq=image-panel
```

Padrão: `premium-panel`

Atributo permanente no HTML: `data-faq-variant`

---

## Combinar variantes

Você pode combinar parâmetros na mesma URL usando `&`.

Exemplo:

```text
?header=top-dock&cta=calendar&hero=banner&marquee=modern-clean&about-image=fluid-bezier&about-info=philosophy&services=premium-grid&projects=balanced-masonry&faq=premium-panel
```

## Regra importante

As query strings são apenas overrides temporários para visualização. Para deixar uma variante fixa no projeto, altere o atributo `data-*` correspondente no HTML.

Para personalizações visuais do projeto, use `css/custom.css`; não é necessário usar `!important` para alterações normais.
