# v3.60 — Professional Documentation & Semantic Hardening

Base: v3.59.

## Objetivo
Profissionalizar a documentação, remover a licença MIT genérica do Framework, separar corretamente direitos próprios e de terceiros e reforçar a semântica HTML sem alterar layout, estrutura visual ou funcionamento aprovado.

## Alterações
- `LICENSE` substituído por licença proprietária “All Rights Reserved”.
- Criados `COPYRIGHT.md`, `THIRD_PARTY_NOTICES.md`, `SECURITY.md` e `CONTRIBUTING.md`.
- Adicionados guias `docs/legal-and-rights.md`, `docs/semantics-accessibility.md` e `docs/release-checklist.md`.
- README reescrito como porta de entrada profissional do projeto.
- Licença MIT do Lenis preservada localmente em `vendor/lenis/LICENSE`.
- GSAP/ScrollTrigger documentados separadamente, preservando seus headers e licença própria.
- Mídia dos cards de Projetos refinada de `div` para `figure`, mantendo as mesmas classes.
- Bloco de redes sociais do Footer refinado para `nav` com nome acessível, mantendo a mesma classe.

## Compatibilidade
Nenhuma classe CSS, seletor funcional, conteúdo visual, variante, comportamento de marquee, motion, sidebar, FAQ, WhatsApp ou layout foi intencionalmente alterado.
