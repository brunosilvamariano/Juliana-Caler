# v3.56 — Footer Logo + WhatsApp Responsivo

## Objetivo
Último refinamento de identidade no rodapé e comportamento do CTA flutuante de WhatsApp em telas responsivas.

## Footer
- A marca textual artificial (`A` + `Bruno`) foi removida.
- O rodapé agora usa apenas `assets/images/logo/logo-texto.svg`.
- Nenhum ícone separado é exibido no bloco de marca do footer.
- A logo funciona como link de retorno para `#inicio`.

## WhatsApp flutuante
Arquivo visual: `css/components/floating-whatsapp.css`.
Arquivo de comportamento: `js/components/floating-whatsapp.js`.

Regras:
1. Desktop acima de 1023px: não aparece.
2. Mobile/tablet com sidebar fechada: aparece.
3. Sidebar aberta (`body.sidebar-open`): desaparece com transição curta.
4. Seção Contato na área útil da viewport (`body.contact-in-view`): desaparece.
5. Ao sair do Contato ou fechar a sidebar: reaparece automaticamente.
6. Quando invisível, recebe `aria-hidden="true"` e `tabindex="-1"` para não permanecer acessível pelo teclado.
7. `prefers-reduced-motion` é respeitado.

## Arquitetura
O componente observa o estado real da sidebar via classe do `body`, sem duplicar a lógica de abertura/fechamento existente em `sidebar.js`.
