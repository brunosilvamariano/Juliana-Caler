# Sidebar Fluid Premium

Componente criado a partir da direção visual **Fluid** escolhida para o framework.

## Separação de responsabilidades

- `css/components/sidebar/core.css`: estrutura base e estados da sidebar.
- `css/components/sidebar/header-variants.css`: arquiteturas de header.
- `css/components/sidebar/cta-variants.css`: identidades de CTA.
- `css/components/sidebar/top-header-adapter.css`: adaptação responsiva dos CTAs no `top-dock`.
- `css/layout/app-shell.css`: espaço reservado entre sidebar e conteúdo.
- `js/components/sidebar.js`: recolher/expandir, drawer mobile e item ativo.
- `js/core/app.js`: ponto de entrada global, sem lógica de componente.
- `assets/icons/sidebar/`: ícones SVG locais.
- `data/content/navigation.json`: rótulos, destinos e ícones carregados pelo Content Engine.

## Sem CDN

O `index.html` não usa CDN. O runtime local mantém apenas GSAP, ScrollTrigger e Lenis.

## Observação sobre JSON

O HTML mantém a sidebar declarada de forma semântica e funcional como fallback. `data/content/navigation.json` hidrata os mesmos links quando o projeto roda por Live Server ou outro servidor estático.

## Ajustes v5
- O botão mobile alterna entre o ícone de menu e um `X` local ao abrir/fechar o drawer.
- O CTA de WhatsApp abre com uma mensagem profissional pré-preenchida.
