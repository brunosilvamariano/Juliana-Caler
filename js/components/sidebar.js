/**
 * =========================================================
 * SIDEBAR — comportamento do componente Fluid
 * - Recolher/expandir no desktop
 * - Abrir/fechar como drawer no mobile
 * - Estado ativo dos links
 * - Escape fecha o menu mobile
 * Sem dependência externa obrigatória.
 * =========================================================
 */

(function initSidebarComponent() {
  "use strict";

  const body = document.body;
  const sidebar = document.querySelector("[data-sidebar]");
  const collapseButton = document.querySelector("[data-sidebar-collapse]");
  const mobileButton = document.querySelector("[data-sidebar-mobile-toggle]");
  const backdrop = document.querySelector("[data-sidebar-backdrop]");
  const mobileIcon = document.querySelector("[data-sidebar-mobile-icon]");
  const links = Array.from(document.querySelectorAll("[data-sidebar-link]"));
  const mobileBreakpoint = 1024;

  const headerVariants = new Set([
    "sidebar-premium",
    "top-dock"
  ]);

  const fallbackCtaVariants = {
    calendar: {
      status: "Próximo passo",
      title: "Agendar atendimento",
      meta: "Fale diretamente com a Bruna",
      aria: "Agendar atendimento com Bruna Gesser pelo WhatsApp"
    },
    minimal: {
      status: "",
      title: "Falar com Bruna",
      meta: "WhatsApp",
      aria: "Falar pelo WhatsApp"
    }
  };

  function getCtaVariants() {
    const contentVariants = window.SiteContent?.get("cta.variants");
    if (!contentVariants || typeof contentVariants !== "object") return fallbackCtaVariants;

    return Object.fromEntries(
      Object.entries(fallbackCtaVariants).map(([key, fallback]) => [
        key,
        { ...fallback, ...(contentVariants[key] || {}) }
      ])
    );
  }

  function applySidebarCtaVariant() {
    const params = new URLSearchParams(window.location.search);
    const ctaVariants = getCtaVariants();
    const requested = params.get("cta");
    const fallback = sidebar.dataset.sidebarCta || "calendar";
    const variant = Object.hasOwn(ctaVariants, requested) ? requested : fallback;
    const safeVariant = Object.hasOwn(ctaVariants, variant) ? variant : "calendar";
    const config = ctaVariants[safeVariant];

    sidebar.dataset.sidebarCta = safeVariant;

    const status = sidebar.querySelector("[data-sidebar-cta-status]");
    const title = sidebar.querySelector("[data-sidebar-cta-title]");
    const meta = sidebar.querySelector("[data-sidebar-cta-meta]");
    const link = sidebar.querySelector("[data-sidebar-cta-link]");

    if (status) status.textContent = config.status;
    if (title) title.textContent = config.title;
    if (meta) meta.textContent = config.meta;
    if (link) link.setAttribute("aria-label", config.aria);
  }

  function applyHeaderVariant() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("header");
    const fallback = body.dataset.headerVariant || "sidebar-premium";
    const variant = headerVariants.has(requested) ? requested : fallback;

    body.dataset.headerVariant = headerVariants.has(variant) ? variant : "sidebar-premium";

    // Top Dock não possui estado recolhido; limpa qualquer estado residual
    // da sidebar antes de aplicar a arquitetura horizontal.
    if (body.dataset.headerVariant === "top-dock") {
      body.classList.remove("sidebar-collapsed");
    }

    document.querySelectorAll("[data-header-surface]").forEach((surface) => {
      surface.dataset.headerVariant = body.dataset.headerVariant;
    });
  }

  if (!sidebar) return;

  applyHeaderVariant();
  applySidebarCtaVariant();

  if (window.SiteContent?.state === "loading") {
    document.addEventListener("site:contentready", applySidebarCtaVariant, { once: true });
  }

  function isMobile() {
    return window.innerWidth < mobileBreakpoint;
  }

  function setMobileOpen(open) {
    body.classList.toggle("sidebar-open", open);
    mobileButton?.setAttribute("aria-expanded", String(open));
    mobileButton?.setAttribute(
      "aria-label",
      open ? "Fechar menu lateral" : "Abrir menu lateral"
    );

    // O mesmo botão alterna visualmente entre menu e fechar (X).
    if (mobileIcon) {
      mobileIcon.src = open
        ? "assets/icons/sidebar/x.svg"
        : "assets/icons/sidebar/menu.svg";
    }

    sidebar.setAttribute("aria-hidden", String(isMobile() && !open));
  }

  function setCollapsed(collapsed) {
    if (isMobile()) return;

    body.classList.toggle("sidebar-collapsed", collapsed);
    collapseButton?.setAttribute("aria-expanded", String(!collapsed));
    collapseButton?.setAttribute(
      "aria-label",
      collapsed ? "Expandir menu lateral" : "Recolher menu lateral"
    );
  }

  function activateLink(selectedLink) {
    links.forEach((link) => {
      const active = link === selectedLink;
      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  collapseButton?.addEventListener("click", () => {
    setCollapsed(!body.classList.contains("sidebar-collapsed"));
  });

  mobileButton?.addEventListener("click", () => {
    setMobileOpen(!body.classList.contains("sidebar-open"));
  });

  backdrop?.addEventListener("click", () => setMobileOpen(false));

  links.forEach((link) => {
    link.addEventListener("click", () => {
      activateLink(link);
      if (isMobile()) setMobileOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("sidebar-open")) {
      setMobileOpen(false);
      mobileButton?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      setMobileOpen(false);
      sidebar.removeAttribute("aria-hidden");
    } else {
      body.classList.remove("sidebar-collapsed");
      sidebar.setAttribute("aria-hidden", String(!body.classList.contains("sidebar-open")));
    }
  });

  sidebar.setAttribute("aria-hidden", String(isMobile()));
})();
