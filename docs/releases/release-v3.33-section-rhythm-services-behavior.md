# V3.33 — Section Rhythm + Services Behavior

## 1. Espaçamento entre seções

Foi reduzido o vazio visual entre:

- Serviços → Projetos
- Projetos → FAQ

O ajuste foi feito nos paddings das áreas internas e na margem superior do FAQ, sem remover a separação visual entre as seções.

## 2. `editorial-grid` e `minimal-list` agora têm comportamentos diferentes

### `editorial-grid`

- imagens ficam sempre visíveis;
- cada card funciona como uma unidade visual;
- hover/foco eleva discretamente o card;
- mantém o sistema ativo/interativo da seção.

### `minimal-list`

- imagens são removidas no desktop;
- palavra ghost é removida;
- não existe item ativo persistente;
- clicar na linha não seleciona o serviço;
- hover/foco atua somente sobre tipografia, linha inferior e seta;
- o CTA do WhatsApp continua funcionando normalmente.

Assim, as duas opções não são apenas estilos diferentes: a experiência de navegação também muda.

## Preview

```text
?services=editorial-grid
?services=minimal-list
```

Todos os demais packs e variantes do framework foram preservados.
