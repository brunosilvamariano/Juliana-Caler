# v3.61 — Semantic Structure Recovery

Base documental: v3.60. Estrutura visual/funcional restaurada da v3.59.

## Correção crítica
Na v3.60, os wrappers `.projects-editorial__media` foram alterados de `div` para `figure`, mas seus fechamentos permaneceram `</div>`. Isso produzia HTML malformado e permitia que o navegador reconstruísse a árvore DOM, afetando em cascata Projetos, FAQ, Contato e Footer.

## Solução
- `index.html` restaurado integralmente da v3.59, que era a última estrutura visual/funcional aprovada.
- Nenhum layout, variante, conteúdo, marquee, motion ou comportamento foi redesenhado.
- Toda a documentação profissional e jurídica criada na v3.60 foi mantida.
- Não foi forçada troca de tags apenas por aparência de “mais semântico”: um `div` usado como wrapper de mídia dentro de um `article` é semanticamente válido quando não existe legenda/agrupamento que exija `figure`.

## Regra adotada
Semântica será aplicada pela função real do conteúdo, nunca por substituição automática de tags. Integridade do DOM, acessibilidade e compatibilidade com CSS/JS têm prioridade.
