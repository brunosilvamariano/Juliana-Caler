# Content Engine — guia de edição

Esta pasta concentra o conteúdo que normalmente muda de um cliente para outro.

## Como editar

1. Abra o projeto com **Live Server** ou outro servidor estático.
2. Edite o JSON da seção desejada.
3. Salve o arquivo.
4. O Live Server recarrega a página e o Content Engine aplica o novo conteúdo.

Exemplo: para trocar o Hero, edite `hero.json`. Para trocar serviços, edite `services.json`.

## O que o JSON controla

- textos;
- títulos e destaques textuais;
- links e CTAs;
- caminhos e textos alternativos das imagens;
- dados de contato;
- redes sociais;
- perguntas e respostas;
- conteúdo das variantes institucionais do About;
- copy das variantes do CTA da sidebar/header.

## O que o JSON não controla

O JSON **não cria layout** e não escolhe variantes visuais. Isso continua separado:

- HTML: estrutura semântica e variante padrão;
- CSS: aparência e responsividade;
- JavaScript: comportamento/interações;
- Query string: preview temporário das variantes;
- JSON: conteúdo do cliente.

Isso evita que uma alteração de texto mude a composição do site sem intenção.

## Quantidade de itens

A quantidade de slots continua definida pelo HTML para preservar o layout aprovado:

- Marquee: 6 palavras;
- About slider: 3 imagens;
- Serviços: 5 itens;
- Projetos: 5 itens;
- FAQ: 6 perguntas;
- Contato: 3 canais e 3 estados.

Se um projeto precisar de outra quantidade, altere conscientemente a estrutura HTML daquela seção. O auditor `scripts/audit-content.py` detecta divergências entre JSON e HTML.

## Fallback seguro

Se um JSON estiver ausente, inválido ou não puder ser carregado, o framework mantém o conteúdo já existente no `index.html`. O site não fica vazio.

Por isso, abrir diretamente por `file://` não é o fluxo recomendado: navegadores normalmente bloqueiam `fetch()` de JSON local. Use Live Server.

## Manifest

`manifest.json` informa ao Content Engine quais arquivos carregar. Não precisa ser alterado para editar conteúdo existente.
