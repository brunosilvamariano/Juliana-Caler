# v3.49 — Motion Mask Cleanup

- Corrige o recorte do CTA “Conheça nossa história”.
- Remove `clip-path` dos containers completos de About e Projetos.
- A máscara temporária fica somente na própria imagem durante o reveal.
- Ao concluir, `clip-path` e `transform` são removidos da imagem.
- Evita faixas residuais depois da animação.
- Parallax continua removido.
