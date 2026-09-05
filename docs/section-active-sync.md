# Sincronização Sidebar ↔ Seções — v12.8

Correções:

1. A ordem real do conteúdo foi corrigida para:
   - 01 Hero
   - 02 Sobre
   - 03 Serviços
   - 04 Projetos

2. O cálculo de seção ativa não depende mais da ordem dos links da Sidebar.

3. A seção ativa é determinada pela posição real (`offsetTop`) de cada seção.

4. A linha de ativação fica logo abaixo da Topbar/Mobile Nav, com pequeno respiro,
   em vez de usar 30% da altura da viewport.

Resultado:
- estando em Hero → Início ativo;
- estando em Sobre → Sobre ativo;
- estando em Serviços → Serviços ativo;
- estando em Projetos → Projetos ativo.
