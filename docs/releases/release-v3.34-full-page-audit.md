# V3.34 — Auditoria completa da página

Esta versão consolida uma auditoria técnica da página inteira sem alterar a direção visual aprovada.

## HTML e semântica

- mantém exatamente um `h1` e um `main`;
- adiciona link de salto para o conteúdo principal;
- corrige relações `aria-controls`, `aria-labelledby` e regiões do FAQ;
- sincroniza `aria-hidden` das respostas do FAQ com `aria-expanded`;
- completa a relação acessível entre tabs e painéis do slider do About;
- corrige os nomes acessíveis dos botões de projetos para refletirem a ação real de abrir detalhes;
- remove nome acessível duplicado do `figure` do Hero quando a própria imagem já possui `alt`;
- transforma agrupamentos de redes sociais/canais em grupos nomeados.

## SEO estrutural

- corrige o título para a marca atual;
- adiciona `meta description` válida;
- remove placeholders vazios de canonical, Open Graph, Twitter e JSON-LD.

Esses metadados avançados devem ser adicionados por projeto somente quando URL, domínio e imagem social finais forem conhecidos. É melhor não publicar tags vazias.

## JSON

- `site.json` sincronizado com a marca e descrição atuais;
- valores ainda não definidos usam `null`, em vez de strings vazias;
- `navigation.json` deixa de duplicar contato, redes sociais, localização e marca que pertencem a `site.json`;
- `home.json` deixa de conter métricas antigas do About e números 01–05 removidos dos Serviços;
- adicionadas as configurações atuais de About Info, About Image e Services Variant.

## Código e dependências

Removidos por não terem uso no runtime atual:

- `vendor/swiper/`;
- `vendor/split-type/`;
- `assets/icons/topbar/chevron-down.svg`;
- `assets/icons/sidebar/behance.svg`;
- `assets/icons/sidebar/dribbble.svg`.

Também foram removidas regras CSS legadas sem qualquer referência atual:

- `sidebar__contact-row`;
- antigas classes de métricas do About;
- antigo índice 01–05 de Serviços;
- antigo `services-editorial__preview-art`.

Foram eliminadas ainda declarações CSS anteriores que já eram sobrescritas pela mesma regra em versões posteriores, preservando a cascata efetiva.

## Auditoria automatizada

`scripts/audit-html.py` agora verifica:

- quantidade de `h1` e `main`;
- meta description;
- `alt`, `width` e `height` das imagens;
- IDs duplicados;
- âncoras internas;
- `aria-controls`, `aria-labelledby` e `aria-describedby`;
- `target="_blank"` com `noopener noreferrer`;
- referências locais;
- validade sintática de todos os JSON.

## Observação sobre CSS reutilizável

Classes genéricas de foundation/utilities que não aparecem no HTML atual foram preservadas porque fazem parte do framework reutilizável. A limpeza removeu apenas código específico de componentes antigos sem referência no HTML ou JavaScript atuais.
