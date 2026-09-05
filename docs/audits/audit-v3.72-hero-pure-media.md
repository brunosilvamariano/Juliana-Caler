# Auditoria v3.72 — Hero Pure Media

Escopo: remoção de efeitos visuais das imagens do Hero.

Verificações esperadas:

- 5 variantes de Hero preservadas;
- nenhum `media-shade` no HTML;
- SVG do Hero contém apenas o `clipPath`;
- nenhuma regra de gradiente/blur/glow sobre `.hero-editorial__media` ou `.hero-editorial__image`;
- `arch` com `background: transparent` e `object-fit: contain`;
- HTML/ARIA, JS, JSON e CSS continuam válidos;
- nenhuma imagem foi alterada.
