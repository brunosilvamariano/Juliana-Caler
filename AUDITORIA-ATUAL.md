# Auditoria atual — Bruna Gesser

Data: 05/09/2026

## Escopo preservado

A estrutura do framework foi preservada: mesma árvore de elementos, IDs, classes, componentes, variantes e JavaScript. As alterações desta revisão ficaram restritas a conteúdo/SEO, atributos de imagem, tokens e cores CSS, documentação de auditoria e configuração de PWA/favicon.

## Ajustes aplicados

### Imagens e acessibilidade
- Fotografias do Hero, Sobre e Galeria receberam `alt` descritivo do que aparece na imagem, evitando repetição artificial de palavras-chave.
- Ilustrações dos cards de Atendimentos permanecem decorativas (`aria-hidden="true"`) e agora usam `alt=""`, que é a marcação correta para esse caso.
- Largura/altura intrínsecas das imagens de Atendimentos e Galeria foram corrigidas para 500×500, que é o tamanho real dos arquivos. Isso evita metadados de proporção incorretos no HTML.
- Ícones funcionais/decorativos continuam com `alt=""` e `aria-hidden="true"` quando o texto do controle já fornece o nome acessível.

### Cores / identidade Bruna
- Removidos os remanescentes de azul vivo e azul-slate do CSS ativo.
- Criados aliases semânticos `--color-text-primary` e `--color-text-secondary` para impedir que componentes caiam em fallbacks antigos azulados.
- Sidebar, estados ativos, CTAs, Marquee, About, Atendimentos, Galeria, FAQ, Hero e Footer foram neutralizados para grafite, off-white, lavanda acinzentado e areia.
- A seção de Contato manteve exatamente a mesma composição e efeitos; somente a linguagem de cor foi alterada para gradiente grafite → lavanda profundo, com acentos claros coerentes com a marca.
- A seção FAQ passou de azul-gelo para off-white/lavanda suave, mantendo bordas, sombras, forma e interação.
- `theme-color`, `mask-icon`, manifest e tile do navegador foram alinhados à paleta da Bruna.

### SEO
- H1 refinado para `Psicóloga Clínica em Joinville`, mantendo a mesma estrutura visual do Hero.
- `title` e meta description permanecem dentro de uma faixa adequada de tamanho e com intenção local clara.
- JSON-LD `Person` recebeu a identificação profissional CRP 12/27976 presente no projeto atual e uma descrição profissional curta.
- Open Graph/Twitter textual foi preservado.
- A documentação de pendências SEO foi atualizada para refletir a versão atual.

### Auditoria interna
- O auditor de variantes estava desatualizado em relação às variantes realmente ativas no HTML (`diagonal`, `premium-cards`, `offset-grid`). O script e os comentários foram sincronizados sem mudar nenhuma variante visual.
- Auditoria final do projeto: APROVADA.
- HTML/ARIA/assets: APROVADO.
- CSS/cascata: APROVADO, sem `!important`.
- Conteúdo JSON: APROVADO.
- Variantes: APROVADO.

## Pendências antes da publicação final
- Definir domínio final para `canonical`, `og:url` e `sitemap.xml`.
- Definir URL absoluta de imagem social para `og:image` e `twitter:image`.
- Confirmar endereço textual completo e modalidades presencial/online antes de adicioná-los ao conteúdo/Schema.
- Substituir/revisar imagens definitivas de Atendimentos/Galeria quando o material final da Bruna chegar.

## Performance — recomendações não aplicadas nesta revisão
Para não mexer na qualidade dos assets sem aprovação, os arquivos abaixo foram preservados:
- `assets/images/hero/hero-editorial.webp` — aproximadamente 821 KB;
- `assets/images/about/about-02.webp` — aproximadamente 718 KB;
- `assets/images/logo/logo-icon.svg` — aproximadamente 126 KB e contém bastante informação embutida;
- `favicon/safari-pinned-tab.svg` — aproximadamente 126 KB.

Eles podem ser otimizados numa revisão específica de performance sem mudar o layout.
