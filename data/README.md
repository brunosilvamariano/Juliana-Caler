# Conteúdo JSON

A pasta `data/content/` é a fonte de conteúdo editável do projeto.

O framework continua estático: **HTML + CSS + JavaScript + JSON local**, sem banco de dados.

## Estrutura

```text
data/
├── README.md
└── content/
    ├── README.md
    ├── manifest.json
    ├── site.json
    ├── navigation.json
    ├── cta.json
    ├── hero.json
    ├── marquee.json
    ├── about.json
    ├── services.json
    ├── projects.json
    ├── faq.json
    └── contact.json
```

- `site.json`: marca, SEO básico, redes sociais, WhatsApp e rodapé.
- `navigation.json`: rótulos, destinos e ícones da navegação.
- `cta.json`: textos das seis variantes de CTA.
- Os demais arquivos representam o conteúdo de cada seção.

O HTML continua definindo a estrutura semântica e contém um fallback completo. O Content Engine apenas hidrata os mesmos elementos; não cria nem remove layout.

Consulte `data/content/README.md` para o fluxo de edição.
