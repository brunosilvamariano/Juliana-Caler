# v3.54 — Explicit Variant System

## O que foi corrigido
- FAQ agora declara `data-faq-variant="premium-panel"` diretamente no HTML.
- `faq.js` passa a respeitar a variante definida no HTML como fallback real.
- `?faq=` continua funcionando exclusivamente como override de preview.
- Comentários do `index.html` agora documentam variante ativa, opções e query de preview para Header, CTA da Sidebar, Hero, Marquee, About, Serviços, Projetos e FAQ.
- Criado `docs/variant-registry.md` como registro central de todas as variantes do framework.

## Arquitetura adotada
1. HTML = fonte principal da variante.
2. Query string = preview temporário.
3. JavaScript = validação e aplicação segura do override.
4. CSS = aparência específica de cada variante.

## Visual preservado
Nenhum layout, imagem, conteúdo, grid ou comportamento aprovado foi redesenhado nesta versão.
