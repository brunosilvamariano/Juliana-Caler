# V3.38 — Projects Clean Variants

## Alterações

- Removidas as variantes `compact-carousel` e `split-feature`.
- Mantidas quatro variantes: `editorial-grid`, `refined-coverflow`, `minimal-list` e `balanced-masonry`.
- Removidos todos os links/ícones circulares `↗` sobre os cards de Projetos.
- O conteúdo dos cards não reserva mais coluna para seta.
- O `refined-coverflow` continua 100% manual e usa controles textuais `Anterior` e `Próximo`, sem ícones de seta.
- Nenhuma imagem foi criada ou alterada.

## Teste por URL

```text
?projects=editorial-grid
?projects=refined-coverflow
?projects=minimal-list
?projects=balanced-masonry
```

## Validação

Executar:

```bash
python3 scripts/audit-html.py .
```

E validar sintaxe dos arquivos JavaScript com `node --check`.
