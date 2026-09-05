# v3.4 — Hero Media Fill Fix

Corrige a área vazia que permanecia abaixo da fotografia em variantes cuja caixa de mídia era mais alta que a imagem.

- A imagem principal agora ocupa a caixa da mídia com `position:absolute; inset:0`.
- A mídia secundária recebe a mesma proteção.
- `display:block` elimina espaço de baseline de imagem.
- Removido também o `border-radius` externo residual do Hero no breakpoint mobile.
- Nenhuma imagem/asset foi criado ou alterado.
