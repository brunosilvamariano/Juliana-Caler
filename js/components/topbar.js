/**
 * =========================================================
 * TOPBAR — comportamento contextual
 * - Adiciona acabamento ao rolar
 * - Atualiza barra de progresso da página
 * - Sincroniza número/título com o link ativo da sidebar
 * Sem CDN e sem dependência obrigatória de vendor.
 * =========================================================
 */

(function initTopbarComponent() {
  "use strict";

  const topbar = document.querySelector("[data-topbar]");
  if (!topbar) return;

  const progressBar = topbar.querySelector("[data-topbar-progress]");
  const sectionIndex = topbar.querySelector("[data-topbar-index]");
  const sectionLabel = topbar.querySelector("[data-topbar-label]");
  const sidebarLinks = Array.from(document.querySelectorAll("[data-sidebar-link]"));
  const desktopBreakpoint = 1024;
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  function updateScrollState() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const progress = Math.min(100, Math.max(0, (scrollTop / scrollable) * 100));
    const scrollDelta = scrollTop - lastScrollTop;

    topbar.classList.toggle("is-scrolled", scrollTop > 12);
    if (window.innerWidth >= desktopBreakpoint && scrollTop > 24 && Math.abs(scrollDelta) > 2) {
      const isHidden = scrollDelta > 0;
      topbar.classList.toggle("is-hidden", isHidden);
      document.body.classList.toggle("topbar-hidden", isHidden);
    } else if (scrollTop <= 24 || window.innerWidth < desktopBreakpoint) {
      topbar.classList.remove("is-hidden");
      document.body.classList.remove("topbar-hidden");
    }

    lastScrollTop = scrollTop;
    if (progressBar) progressBar.style.width = `${progress}%`;
  }

  function syncWithLink(link) {
    if (!link) return;

    const position = sidebarLinks.indexOf(link);
    const label = link.querySelector(".sidebar__link-text")?.textContent?.trim();

    if (sectionIndex && position >= 0) {
      sectionIndex.textContent = String(position + 1).padStart(2, "0");
    }

    if (sectionLabel && label) {
      sectionLabel.textContent = label;
    }
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => syncWithLink(link));
  });


  // A navegação global dispara este evento tanto no clique quanto no scroll manual.
  document.addEventListener("site:sectionchange", (event) => {
    const detail = event.detail || {};

    if (sectionIndex && detail.number) {
      sectionIndex.textContent = detail.number;
    }

    if (sectionLabel && detail.label) {
      sectionLabel.textContent = detail.label;
    }
  });

  function syncCurrentLink() {
    syncWithLink(
      sidebarLinks.find((link) => link.classList.contains("is-active")) || sidebarLinks[0]
    );
  }

  syncCurrentLink();
  updateScrollState();

  if (window.SiteContent?.state === "loading") {
    document.addEventListener("site:contentready", syncCurrentLink, { once: true });
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState, { passive: true });
})();
