# Motion Engine v3.45

A v3.45 remove a camada antiga de animação e cria um sistema único do zero.

## Removido
- `js/core/animation-pack.js`
- `js/core/polish-motion.js`
- `css/components/motion.css`
- GSAP embutido em `hero.js`
- GSAP embutido em `about.js`
- movimento anterior do marquee
- autoplay do slider do About
- pulse infinito do WhatsApp
- atributos `data-animate` / `data-animate-item`

## Novo sistema
Toda animação visual está em `js/core/motion-engine.js`.

Ele cuida de:
- entrada premium do Hero;
- reveal de introduções de seção com blur curto;
- reveal em cortina da imagem do About;
- stagger de Serviços, Projetos, FAQ e Contato;
- profundidade sutil nas imagens no desktop via ScrollTrigger;
- `prefers-reduced-motion`.

## Importante
Transições funcionais de hover, menu, accordion e controles permanecem nos próprios componentes. Elas não são timelines de entrada e são necessárias ao feedback de interface.
