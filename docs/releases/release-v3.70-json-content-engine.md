# Release v3.70 — JSON Content Engine

Base: v3.69.

## Objetivo

Separar conteúdo de cliente da engine visual sem alterar layout, variantes, semântica estrutural ou comportamento aprovado.

## Implementado

- `js/core/content-loader.js` como Content Engine local;
- `data/content/manifest.json`;
- JSON separado para site, navegação, CTA, Hero, Marquee, About, Serviços, Projetos, FAQ e Contato;
- HTML preservado como estrutura semântica e fallback;
- copy das variantes institucionais do About conectada ao JSON;
- copy das seis variantes de CTA conectada ao JSON;
- navegação suave aguarda a hidratação para ler rótulos/destinos finais;
- motion aguarda o estado do Content Engine para iniciar com o conteúdo hidratado;
- Marquee recalcula largura após hidratação;
- Topbar ressincroniza rótulo após atualização da navegação;
- referência rápida `CONTEUDO.md`;
- auditoria dedicada em `scripts/audit-content.py`;
- `scripts/audit-project.py` agora inclui a auditoria de conteúdo.

## Regra arquitetural

JSON altera **conteúdo**, não layout. A quantidade de slots/cards continua sendo responsabilidade do HTML. Variantes continuam sendo responsabilidade do HTML + query string + JS de validação + CSS.

## Fallback

Falha de manifest ou de um arquivo JSON não esvazia o site. O conteúdo original do HTML permanece disponível.

## Runtime

Continua 100% estático, sem banco de dados e sem CDN. Para carregar JSON local durante desenvolvimento, use Live Server ou outro servidor estático.
