# Release v3.85 — Projects Topline Alignment

## Objetivo

Restaurar o padrão estrutural do cabeçalho da seção Projects sem alterar o conteúdo, a tipografia global ou as variantes de layout.

## Alteração

- `projects-editorial__topline` passa a usar `justify-content: space-between`.
- `04 / Projetos` permanece na extremidade esquerda do container editorial.
- O meta da seção permanece alinhado à direita e passa a ocupar a extremidade direita do mesmo container.
- O comportamento responsivo existente é preservado: em viewports de até 1024px o meta continua oculto, como nas demais seções internas.

## Não regressão

Não foram alterados:

- Hero;
- Services;
- About;
- FAQ;
- Contact;
- grids de Projects;
- slider `balanced-masonry`;
- conteúdo JSON;
- JavaScript;
- quantidade ou nomes de variantes.

## Teste

```text
?projects=editorial-grid
```

Também permanece válido para:

```text
?projects=balanced-masonry
?projects=offset-grid
```
