# Marquee Modern

Faixa compacta de transição posicionada entre o Hero e a seção Sobre.

## Arquivos
- `css/sections/marquee.css`
- `js/sections/marquee.js`
- marcação no `index.html`

## Direção visual
- faixa baixa e discreta;
- tipografia reduzida com `clamp()`;
- palavras principais e secundárias sem texto outline;
- pontos azuis pequenos como separadores;
- fade lateral para evitar cortes secos nas bordas;
- fundo sutil conectado ao restante da interface.

## Movimento
O marquee não possui autoplay. Seu deslocamento acontece somente quando existe scroll:
- scroll para baixo: conteúdo se desloca para a esquerda;
- scroll para cima: conteúdo se desloca para a direita;
- ao interromper o scroll: a inércia desacelera rapidamente até parar.

O loop usa dois grupos iguais e faz wrap da posição pelo tamanho do primeiro grupo, evitando saltos visuais.

## Acessibilidade
O primeiro grupo contém o conteúdo semântico. A segunda cópia usa `aria-hidden="true"`. Quando `prefers-reduced-motion: reduce` está ativo, nenhuma transformação animada é aplicada.
