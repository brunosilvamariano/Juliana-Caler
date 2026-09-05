# Release v3.80 — Services Apple Grid System

## Objetivo

Refinar exclusivamente `?services=premium-grid` para uma linguagem de design system inspirada na disciplina visual da Apple, mantendo o framework genérico e reutilizável.

## Mudanças

- `premium-grid` continua sendo a variante padrão de Services.
- Estrutura 12 colunas preservada: 7/12 + 5/12, seguida por 4/12 + 4/12 + 4/12.
- Novo conjunto de tokens escopados para background, superfícies, texto, azul de ação, linhas, radius e sombras.
- Tipografia do grid passa a usar system stack com fallbacks seguros.
- Hierarquia do título e dos cards foi refinada com pesos e tracking mais próximos de interfaces Apple.
- Tags deixam de usar caixa alta/letter-spacing excessivo e passam a funcionar como copy secundária.
- CTA de cada serviço passa a seguir uma anatomia consistente com alvo de 44px e feedback de hover/focus discreto.
- Cards recebem elevação mínima e transição curta, sem zoom/parallax da fotografia.
- Tablet e mobile mantêm composição responsiva, com cards em uma coluna no mobile.

## Não alterado

- `?services=premium-cards` e toda a mecânica horizontal da v3.79.
- Conteúdo de Services.
- Hero, Header, CTA do Header, Marquee, About, Projects, FAQ e Contact.
- JavaScript da seção.
- Content Engine JSON.

## Preview

```text
?services=premium-grid
```
