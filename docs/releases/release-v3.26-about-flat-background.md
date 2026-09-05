# V3.26 — About sem fundo azulado

Removido o efeito azulado que ainda permanecia na seção About.

A origem era dupla:
- `radial-gradient` azul aplicado diretamente em `.about-editorial`;
- pseudo-elemento `.about-editorial::before` com forma azul/translúcida.

Agora o fundo do About é branco limpo (`#ffffff`) e o pseudo-elemento decorativo foi removido.

O slider, imagens, indicadores, textos e estrutura da seção foram preservados.
Nenhuma imagem foi criada ou alterada.
