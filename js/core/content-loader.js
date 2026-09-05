/**
 * =========================================================
 * CONTENT ENGINE — JSON -> DOM
 * ---------------------------------------------------------
 * - Carrega conteúdo local a partir de data/content/manifest.json.
 * - Atualiza somente conteúdo e atributos; não cria layout.
 * - Mantém o HTML existente como fallback sem JavaScript/JSON.
 * - Em caso de falha parcial, preserva o conteúdo já presente no HTML.
 * - Expõe window.SiteContent para componentes que possuem copy variante.
 * =========================================================
 */
(function initContentEngine() {
  "use strict";

  const root = document.documentElement;
  const MANIFEST_URL = "data/content/manifest.json";
  const isDevelopmentHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const fetchOptions = { cache: isDevelopmentHost ? "no-store" : "default" };

  const api = {
    state: "loading",
    data: {},
    errors: [],
    get(path, fallback = undefined) {
      const value = resolvePath(api.data, path);
      return value === undefined ? fallback : value;
    },
    ready: null,
  };

  window.SiteContent = api;
  root.dataset.contentState = "loading";

  function resolvePath(source, path) {
    if (!path) return source;
    return String(path)
      .split(".")
      .reduce((value, key) => (value != null ? value[key] : undefined), source);
  }

  function isString(value) {
    return typeof value === "string";
  }

  function setText(element, value) {
    if (!element || !isString(value)) return;
    element.textContent = value;
  }

  function setAttribute(element, name, value) {
    if (!element || !name || !isString(value) || !value) return;
    element.setAttribute(name, value);
  }

  function setOptionalAttribute(element, name, value) {
    if (!element || !name) return;
    if (isString(value) && value.trim()) element.setAttribute(name, value);
    else element.removeAttribute(name);
  }

  function setTwoLineText(element, values) {
    if (!element || !Array.isArray(values) || !values.length) return;
    const fragment = document.createDocumentFragment();
    values.slice(0, 2).forEach((value, index) => {
      if (index) fragment.append(document.createElement("br"));
      fragment.append(document.createTextNode(String(value)));
    });
    element.replaceChildren(fragment);
  }

  function setTitleParts(element, accentSelector, title) {
    if (!element || !title || !isString(title.main) || !isString(title.accent)) return;
    let accent = element.querySelector(accentSelector);
    if (!accent) {
      accent = document.createElement("span");
      const className = accentSelector.startsWith(".") ? accentSelector.slice(1) : "";
      if (className) accent.className = className;
    }
    accent.textContent = title.accent;
    element.replaceChildren(document.createTextNode(`${title.main} `), accent);
  }

  function warnCount(label, expected, received) {
    if (expected === received) return;
    console.warn(`[Content Engine] ${label}: HTML possui ${expected} slot(s), JSON possui ${received}. O layout HTML foi preservado.`);
  }

  async function fetchJson(url) {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  function hydrateSite(data) {
    if (!data) return;

    if (data.meta) {
      if (isString(data.meta.language) && data.meta.language) root.lang = data.meta.language;
      if (isString(data.meta.title) && data.meta.title) document.title = data.meta.title;
      const description = document.querySelector('meta[name="description"]');
      if (description && isString(data.meta.description)) {
        description.setAttribute("content", data.meta.description);
      }
    }

    if (data.brand) {
      const logoImages = document.querySelectorAll(
        ".mobile-nav__logo, .sidebar__brand-logo, .site-footer__brand-logo"
      );
      logoImages.forEach((image) => {
        setAttribute(image, "src", data.brand.logo);
        setAttribute(image, "alt", data.brand.name);
      });

      document.querySelectorAll(".sidebar__brand-icon, .sidebar__contact-avatar img").forEach((image) => {
        setAttribute(image, "src", data.brand.icon);
      });

      const homeHref = data.brand.homeHref || "#inicio";
      document.querySelectorAll(".mobile-nav__brand, .sidebar__brand, .site-footer__brand").forEach((link) => {
        setAttribute(link, "href", homeHref);
      });

      const name = data.brand.name;
      if (isString(name) && name) {
        setAttribute(document.querySelector(".mobile-nav__brand"), "aria-label", `${name} — Início`);
        setAttribute(document.querySelector(".sidebar__brand"), "aria-label", `${name} — Página inicial`);
        setAttribute(document.querySelector(".site-footer__brand"), "aria-label", `${name} — voltar ao início`);
      }
    }

    if (data.sidebar) {
      setText(document.querySelector(".sidebar__section-label"), data.sidebar.sectionLabel);
      setText(document.querySelector(".sidebar__availability > span:last-child"), data.sidebar.availabilityLabel);
    }

    if (data.contact?.whatsappUrl) {
      setAttribute(document.querySelector("[data-sidebar-cta-link]"), "href", data.contact.whatsappUrl);
      setAttribute(document.querySelector("[data-floating-whatsapp]"), "href", data.contact.whatsappUrl);
    }

    if (Array.isArray(data.social)) {
      const sidebarLinks = Array.from(document.querySelectorAll(".sidebar__social-link"));
      const footerLinks = Array.from(document.querySelectorAll(".site-footer__social a"));
      warnCount("Redes sociais", sidebarLinks.length, data.social.length);

      data.social.forEach((item, index) => {
        const sidebarLink = sidebarLinks[index];
        const footerLink = footerLinks[index];
        if (sidebarLink) {
          setAttribute(sidebarLink, "href", item.href);
          setAttribute(sidebarLink, "aria-label", item.label);
        }
        if (footerLink) {
          setAttribute(footerLink, "href", item.href);
          setText(footerLink, item.label);
        }
      });
    }

    if (data.footer) {
      const legal = document.querySelectorAll(".site-footer__legal > span");
      setText(legal[0], data.footer.legalPrimary);
      setText(legal[1], data.footer.legalSecondary);

      const developerLink = document.querySelector(".site-footer__developer a");
      setText(developerLink, data.footer.developerName);
      setAttribute(developerLink, "href", data.footer.developerHref);
    }
  }

  function hydrateNavigation(data) {
    if (!Array.isArray(data?.items)) return;

    const sidebarLinks = Array.from(document.querySelectorAll("[data-sidebar-link]"));
    const footerLinks = Array.from(document.querySelectorAll(".site-footer__nav a"));
    warnCount("Navegação", sidebarLinks.length, data.items.length);

    data.items.forEach((item, index) => {
      const sidebarLink = sidebarLinks[index];
      const footerLink = footerLinks[index];
      if (sidebarLink) {
        setAttribute(sidebarLink, "href", item.href);
        setText(sidebarLink.querySelector(".sidebar__link-text"), item.label);
        setAttribute(sidebarLink.querySelector(".sidebar__icon-box img"), "src", item.icon);
      }
      if (footerLink) {
        setAttribute(footerLink, "href", item.href);
        setText(footerLink, item.label);
      }
    });
  }

  function hydrateHero(data) {
    if (!data) return;
    const section = document.querySelector("[data-hero-editorial]");
    if (!section) return;

    setText(section.querySelector(".hero-editorial__eyebrow"), data.eyebrow);
    setTitleParts(section.querySelector(".hero-editorial__title"), ".hero-editorial__title-accent", data.title);
    setText(section.querySelector(".hero-editorial__text"), data.description);

    const primary = section.querySelector(".hero-editorial__primary");
    setText(primary?.querySelector("span"), data.primaryCta?.label);
    setAttribute(primary, "href", data.primaryCta?.href);

    const secondary = section.querySelector(".hero-editorial__secondary");
    setText(secondary?.querySelector("span:last-child"), data.secondaryCta?.label);
    setAttribute(secondary, "href", data.secondaryCta?.href);

    const image = section.querySelector(".hero-editorial__image");
    setAttribute(image, "src", data.image?.src);
    setOptionalAttribute(image, "alt", data.image?.alt);
  }

  function hydrateMarquee(data) {
    if (!Array.isArray(data?.items)) return;
    const section = document.querySelector("[data-marquee-modern]");
    if (!section) return;

    section.querySelectorAll(".marquee-modern__group").forEach((group) => {
      const words = Array.from(group.querySelectorAll(".marquee-modern__word"));
      warnCount("Marquee", words.length, data.items.length);
      data.items.forEach((item, index) => {
        const word = words[index];
        if (!word) return;
        setText(word, item.text);
        word.classList.toggle("marquee-modern__word--muted", Boolean(item.muted));
      });
    });
  }

  function hydrateAbout(data) {
    if (!data) return;
    const section = document.querySelector("[data-about-editorial]");
    if (!section) return;

    setText(section.querySelector(".about-editorial__eyebrow"), data.eyebrow);
    setTwoLineText(section.querySelector(".about-editorial__meta"), data.metaLines);

    const titleLines = Array.from(section.querySelectorAll(".about-editorial__title-line"));
    if (Array.isArray(data.titleLines)) {
      warnCount("About / linhas do título", titleLines.length, data.titleLines.length);
      data.titleLines.forEach((item, index) => {
        const line = titleLines[index];
        if (!line) return;
        let accent = line.querySelector(".about-editorial__title-accent");
        if (item.accent) {
          if (!accent) {
            accent = document.createElement("span");
            accent.className = "about-editorial__title-accent";
          }
          accent.textContent = item.accent;
          const nodes = [];
          if (item.before) nodes.push(document.createTextNode(`${item.before} `));
          nodes.push(accent);
          if (item.after) nodes.push(document.createTextNode(` ${item.after}`));
          line.replaceChildren(...nodes);
        } else {
          setText(line, item.before || item.after || "");
        }
      });
    }

    setText(section.querySelector(".about-editorial__copy"), data.description);
    setText(section.querySelector(".about-editorial__quote p"), data.quote);

    const slideImages = Array.from(section.querySelectorAll("[data-about-slide] img"));
    const jsonImages = data.slider?.images;
    if (Array.isArray(jsonImages)) {
      warnCount("About / slider", slideImages.length, jsonImages.length);
      jsonImages.forEach((item, index) => {
        const image = slideImages[index];
        setAttribute(image, "src", item.src);
        if (image && isString(item.alt)) image.setAttribute("alt", item.alt);
      });
    }
  }

  function hydrateServices(data) {
    if (!data) return;
    const section = document.querySelector("[data-services-editorial]");
    if (!section) return;

    setText(section.querySelector(".services-editorial__eyebrow"), data.eyebrow);
    setTwoLineText(section.querySelector(".services-editorial__meta"), data.metaLines);
    setTitleParts(section.querySelector(".services-editorial__title"), ".services-editorial__title-accent", data.title);
    setText(section.querySelector(".services-editorial__copy"), data.description);

    const items = Array.from(section.querySelectorAll("[data-service-item]"));
    if (Array.isArray(data.items)) {
      warnCount("Serviços", items.length, data.items.length);
      data.items.forEach((item, index) => {
        const card = items[index];
        if (!card) return;
        setText(card.querySelector(".services-editorial__name"), item.title);
        setText(card.querySelector(".services-editorial__tags"), Array.isArray(item.tags) ? item.tags.join(" · ") : "");
        const image = card.querySelector(".services-editorial__thumb img");
        setAttribute(image, "src", item.image?.src);
        if (image && isString(item.image?.alt)) image.setAttribute("alt", item.image.alt);
        const cta = card.querySelector(".services-editorial__arrow");
        setAttribute(cta, "href", item.cta?.href);
        setOptionalAttribute(cta, "aria-label", item.cta?.ariaLabel);
      });
    }

    setText(section.querySelector(".services-editorial__footer-note"), data.footer?.note);
    const footerCta = section.querySelector(".services-editorial__cta");
    if (footerCta && isString(data.footer?.cta?.label)) {
      const icon = footerCta.querySelector(".services-editorial__cta-icon");
      const nodes = icon
        ? [icon, document.createTextNode(` ${data.footer.cta.label}`)]
        : [document.createTextNode(data.footer.cta.label)];
      footerCta.replaceChildren(...nodes);
    }
    setAttribute(footerCta, "href", data.footer?.cta?.href);
  }

  function hydrateProjects(data) {
    if (!data) return;
    const section = document.querySelector("[data-projects-editorial]");
    if (!section) return;

    setText(section.querySelector(".projects-editorial__eyebrow"), data.eyebrow);
    setTwoLineText(section.querySelector(".projects-editorial__meta"), data.metaLines);
    setTitleParts(section.querySelector(".projects-editorial__title"), ".projects-editorial__title-accent", data.title);
    setText(section.querySelector(".projects-editorial__copy"), data.description);

    const items = Array.from(section.querySelectorAll("[data-project-card]"));
    if (Array.isArray(data.items)) {
      warnCount("Projetos", items.length, data.items.length);
      data.items.forEach((item, index) => {
        const card = items[index];
        if (!card) return;
        setText(card.querySelector(".projects-editorial__name"), item.title);
        setText(card.querySelector(".projects-editorial__category"), item.category);
        const image = card.querySelector(".projects-editorial__media img");
        setAttribute(image, "src", item.image?.src);
        if (image && isString(item.image?.alt)) image.setAttribute("alt", item.image.alt);
      });
    }

    setText(section.querySelector(".projects-editorial__footer-note"), data.footer?.note);
    const footerCta = section.querySelector(".projects-editorial__cta");
    if (footerCta && isString(data.footer?.cta?.label)) {
      const icon = footerCta.querySelector(".projects-editorial__cta-icon");
      const nodes = icon
        ? [icon, document.createTextNode(` ${data.footer.cta.label}`)]
        : [document.createTextNode(data.footer.cta.label)];
      footerCta.replaceChildren(...nodes);
    }
    setAttribute(footerCta, "href", data.footer?.cta?.href);
  }

  function hydrateFaq(data) {
    if (!data) return;
    const section = document.querySelector("[data-faq-editorial]");
    if (!section) return;

    setText(section.querySelector(".faq-editorial__eyebrow"), data.eyebrow);
    setTwoLineText(section.querySelector(".faq-editorial__meta"), data.metaLines);
    setTitleParts(section.querySelector(".faq-editorial__title"), ".faq-editorial__title-accent", data.title);
    setText(section.querySelector(".faq-editorial__copy"), data.description);

    const visual = section.querySelector(".faq-editorial__visual-image");
    setAttribute(visual, "src", data.visual?.src);
    if (visual && isString(data.visual?.alt)) visual.setAttribute("alt", data.visual.alt);

    const contactCta = section.querySelector(".faq-editorial__contact");
    if (contactCta && isString(data.contactCta?.label)) {
      const icon = contactCta.querySelector(".faq-editorial__contact-icon");
      const nodes = icon
        ? [icon, document.createTextNode(` ${data.contactCta.label}`)]
        : [document.createTextNode(data.contactCta.label)];
      contactCta.replaceChildren(...nodes);
    }
    setAttribute(contactCta, "href", data.contactCta?.href);

    const items = Array.from(section.querySelectorAll("[data-faq-item]"));
    if (Array.isArray(data.items)) {
      warnCount("FAQ", items.length, data.items.length);
      data.items.forEach((item, index) => {
        const row = items[index];
        if (!row) return;
        setText(row.querySelector(".faq-editorial__question-text"), item.question);
        setText(row.querySelector(".faq-editorial__answer p"), item.answer);
      });
    }
  }

  function hydrateContact(data) {
    if (!data) return;
    const section = document.querySelector("[data-contact-editorial]");
    if (!section) return;

    setText(section.querySelector(".contact-editorial__eyebrow"), data.eyebrow);
    setText(section.querySelector(".contact-editorial__location"), data.location);
    setText(section.querySelector(".contact-editorial__title"), data.title);
    setText(section.querySelector(".contact-editorial__copy"), data.description);

    const primary = section.querySelector(".contact-editorial__primary");
    setText(primary?.querySelector("strong"), data.primaryCta?.title);
    setText(primary?.querySelector("small"), data.primaryCta?.label);
    setAttribute(primary, "href", data.primaryCta?.href);
    setAttribute(document.querySelector("[data-floating-whatsapp]"), "href", data.primaryCta?.href);

    const channels = Array.from(section.querySelectorAll(".contact-editorial__channel"));
    if (Array.isArray(data.channels)) {
      warnCount("Contato / canais", channels.length, data.channels.length);
      data.channels.forEach((item, index) => {
        const channel = channels[index];
        if (!channel) return;
        setText(channel.querySelector(".contact-editorial__channel-name"), item.name);
        setText(channel.querySelector(".contact-editorial__channel-detail"), item.detail);
        setAttribute(channel, "href", item.href);
        setOptionalAttribute(channel, "aria-label", item.ariaLabel);
      });
    }

    const statusItems = Array.from(section.querySelectorAll(".contact-editorial__status-item"));
    if (Array.isArray(data.status)) {
      warnCount("Contato / status", statusItems.length, data.status.length);
      data.status.forEach((item, index) => {
        const status = statusItems[index];
        if (!status) return;
        setText(status.querySelector("strong"), item.title);
        setText(status.querySelector("small"), item.detail);
      });
    }
  }

  function hydrateAll() {
    hydrateSite(api.data.site);
    hydrateNavigation(api.data.navigation);
    hydrateHero(api.data.hero);
    hydrateMarquee(api.data.marquee);
    hydrateAbout(api.data.about);
    hydrateServices(api.data.services);
    hydrateProjects(api.data.projects);
    hydrateFaq(api.data.faq);
    hydrateContact(api.data.contact);
  }

  function finish(state) {
    api.state = state;
    root.dataset.contentState = state;
    document.dispatchEvent(
      new CustomEvent("site:contentready", {
        detail: {
          state,
          errors: [...api.errors],
          data: api.data,
        },
      })
    );
    return api.data;
  }

  async function loadContent() {
    let manifest;
    try {
      manifest = await fetchJson(MANIFEST_URL);
    } catch (error) {
      api.errors.push(`Manifest: ${error.message}`);
      console.warn("[Content Engine] JSON indisponível; mantendo conteúdo fallback do HTML.", error);
      return finish("fallback");
    }

    const files = manifest?.files;
    const base = manifest?.contentRoot || "data/content";
    if (!files || typeof files !== "object") {
      api.errors.push("Manifest inválido: campo files ausente.");
      return finish("fallback");
    }

    const entries = Object.entries(files);
    const results = await Promise.allSettled(
      entries.map(async ([key, file]) => [key, await fetchJson(`${base}/${file}`)])
    );

    results.forEach((result, index) => {
      const [key] = entries[index];
      if (result.status === "fulfilled") {
        const [resolvedKey, value] = result.value;
        api.data[resolvedKey] = value;
      } else {
        api.errors.push(`${key}: ${result.reason?.message || "falha desconhecida"}`);
        console.warn(`[Content Engine] Falha em ${key}; HTML fallback preservado.`, result.reason);
      }
    });

    hydrateAll();
    return finish(api.errors.length ? "partial" : "ready");
  }

  api.ready = loadContent();
})();
