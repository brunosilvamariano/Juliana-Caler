# Fontes locais

Esta pasta é reservada para fontes licenciadas e armazenadas localmente por projeto.

O framework não distribui arquivos de fonte por padrão. Sem fontes adicionais, a tipografia usa a stack de sistema definida em `css/base/variables.css`.

Ao adicionar uma fonte local:

1. crie uma subpasta em `assets/fonts/`;
2. coloque os arquivos WOFF2 licenciados nela;
3. declare os `@font-face` em `css/base/typography.css`;
4. atualize `--font-display` e/ou `--font-body` em `css/base/variables.css`;
5. valide novamente com a auditoria do projeto.
