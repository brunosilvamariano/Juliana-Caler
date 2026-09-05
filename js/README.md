# JavaScript do projeto

O JavaScript é separado por responsabilidade.

- `core/content-loader.js`: carrega `data/content/` e hidrata o conteúdo mantendo fallback HTML.
- `core/app.js`: inicializações globais mínimas.
- `core/smooth-scroll.js`: navegação e scroll suave.
- `core/motion-engine.js`: motion de grandes blocos, sem animação direta nas imagens.
- `components/`: Sidebar, Topbar e WhatsApp flutuante.
- `sections/`: validação de variantes e interações específicas.

As bibliotecas reutilizáveis permanecem em `/vendor` e são locais.
