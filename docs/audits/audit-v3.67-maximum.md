# Auditoria máxima de variantes — v3.67

## Escopo
Auditoria feita sobre a v3.67 após remover as camadas de normalização de CTA introduzidas nas versões v3.62–v3.66.

## Inventário validado
- Header: 6 variantes.
- CTA: 6 variantes.
- Hero: 12 variantes.
- Marquee: 6 variantes.
- About Image: 6 variantes.
- About Info: 6 variantes.
- Serviços: 6 variantes.
- Projetos: 3 variantes.
- FAQ: 2 variantes.
- Total registrado: **53 variantes**.
- Matriz estrutural Header × CTA: **36 combinações**.

## CTA — regra validada
O CTA não possui mais um layout horizontal único. Cada variante continua responsável por sua própria composição:

- `conversation`: status + avatar + contato + seta clara.
- `project`: card escuro, status, sem avatar e seta branca.
- `availability`: card verde, status, avatar e seta verde.
- `quote`: card claro/índigo, faixa de status, sem avatar e seta quadrada.
- `calendar`: pill com avatar, título/subtítulo e seta circular escura.
- `minimal`: composição leve, sem status/avatar/card pesado.

Os headers `top-dock`, `split-nav`, `full-top` e `hybrid` fornecem apenas slot, escala e regras de encaixe. `vertical-rail` continua ocultando o CTA no desktop por definição da variante. Em mobile, todas as arquiteturas voltam ao drawer premium e usam as composições originais do CTA.

## Verificações executadas
- `scripts/audit-html.py`: aprovado.
- `scripts/audit-variants.py`: aprovado.
- Todos os JavaScript: `node --check` aprovado.
- Todos os JSON de `data/`: válidos.
- Todos os CSS: parseados com `tinycss2`, zero erros.
- Referências locais do HTML: nenhuma ausente.
- Defaults `data-*` no HTML conferidos.
- Query params e inventários em JS conferidos.
- Registro `docs/variant-registry.md` conferido.
- Seletores CSS de todas as variantes conferidos.
- Camadas antigas `V3.62`, `V3.65` e `V3.66` removidas de `sidebar.css` para evitar cascata contraditória.
- Escopo de mudança comparado com v3.66: apenas Sidebar/CTA + documentação/auditoria.

## Limite da auditoria automatizada neste ambiente
Foi tentada validação visual automatizada com Chromium headless. A execução do navegador é bloqueada pelo ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR` / timeout do Chromium), portanto **não foi registrada uma falsa aprovação visual por browser**.

Por isso, esta auditoria confirma estrutura, lógica de variantes, CSS, sintaxe, assets e isolamento de escopo. A inspeção visual final deve ser feita no navegador local do projeto, usando as URLs de preview documentadas no registro de variantes.

## Comandos
```bash
python scripts/audit-html.py .
python scripts/audit-variants.py
```
