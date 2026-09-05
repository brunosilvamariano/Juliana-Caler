# Release v3 — Modern Engine

Esta revisão é uma limpeza estrutural; não redesenha o site.

## Corrigido

- removido CSS legado e inválido do antigo `.project-modal`;
- adicionados `width` e `height` intrínsecos às imagens que não possuíam dimensões;
- removidos do runtime Swiper, SplitType e GLightbox porque não são usados pela página atual;
- preservados os arquivos dessas bibliotecas em `vendor/` para uso opcional futuro;
- removida duplicação de conteúdo de Projetos dentro do JavaScript;
- corrigida a semântica dos cards de projeto para evitar elemento interativo aninhado;
- atualizada a documentação para refletir a arquitetura real do framework;
- esclarecido que fontes locais são opcionais e devem ser adicionadas com licença apropriada;
- expandida a auditoria para validar assets locais e JSONs, além dos contratos HTML anteriores.

## Preservado

- layout visual existente;
- CSS separado por seção;
- JS separado por seção;
- GSAP + ScrollTrigger + Lenis locais;
- sidebar, topbar, marquee, about, serviços, projetos, FAQ, contato e WhatsApp;
- `prefers-reduced-motion` e navegação acessível.

## Validação

Na raiz do projeto:

```bash
python3 scripts/audit-html.py
```

Resultado esperado:

```text
AUDITORIA APROVADA: HTML, imagens, IDs, links, assets locais e JSON verificados.
```
