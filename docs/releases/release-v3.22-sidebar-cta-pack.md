# V3.22 — Sidebar CTA Pack

O CTA principal da sidebar agora é um componente variável.

## Variantes

- `conversation` — status + marca/avatar + atendimento.
- `project` — bloco editorial escuro para iniciar projeto.
- `availability` — cartão de agenda aberta.
- `quote` — proposta/orçamento com separação estrutural.
- `calendar` — CTA compacto em formato pill.
- `minimal` — linha de contato extremamente limpa.

## HTML

No `aside`:

```html
<aside data-sidebar data-sidebar-cta="conversation">
```

## Preview por URL

- `?cta=conversation`
- `?cta=project`
- `?cta=availability`
- `?cta=quote`
- `?cta=calendar`
- `?cta=minimal`

Também é possível combinar com outros packs:

```text
?header=sidebar-premium&hero=banner&cta=availability
```

## Conteúdo

O JavaScript altera status, título, meta e `aria-label` de acordo com a variante. O destino continua sendo o WhatsApp atual.

## Responsividade

O componente possui regras específicas para sidebar desktop, drawer mobile e headers horizontais (`top-dock`, `full-top` e `hybrid`).
