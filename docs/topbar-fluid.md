# Topbar Fluid

A topbar é uma camada contextual complementar à sidebar.

## Responsabilidades

- Exibir a seção ativa (`01 / Início` etc.).
- Mostrar o progresso vertical da página.
- Concentrar ações globais sem repetir a navegação lateral.
- Oferecer CTA direto para WhatsApp.

## Arquivos

- `css/components/topbar.css`: aparência e responsividade.
- `js/components/topbar.js`: scroll, progresso e sincronização com a sidebar.
- `assets/icons/topbar/`: ícones locais usados pelo componente.

No mobile a topbar fica oculta e o componente `.mobile-nav` assume o topo da interface.

## Ajustes v5
- O seletor de idioma foi removido, pois a base atual não terá múltiplos idiomas.
- A topbar exibe `Joinville, SC` como contexto de localização.
- Os CTAs de WhatsApp usam mensagem profissional pré-preenchida.
