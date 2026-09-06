/**
 * =========================================================
 * WHATSAPP FLUTUANTE — Responsive Smart Visibility
 * ---------------------------------------------------------
 * Regras:
 * - aparece em viewport responsiva (<= 1023px);
 * - no desktop, aparece enquanto a topbar estiver recolhida;
 * - some enquanto a sidebar mobile estiver aberta;
 * - some quando a seção Contato entra na área útil da tela;
 * - reaparece automaticamente ao sair do Contato;
 * - mantém estado acessível com aria-hidden/tabindex.
 * =========================================================
 */
(function () {
  "use strict";

  const MOBILE_QUERY = "(max-width: 1023px)";
  const HIDDEN_CLASS = "floating-whatsapp-hidden";

  function initFloatingWhatsapp() {
    const button = document.querySelector("[data-floating-whatsapp]");
    const contact = document.querySelector("[data-contact-editorial]");
    const mobileQuery = window.matchMedia(MOBILE_QUERY);

    if (!button) return;

    let contactInView = false;

    function sidebarIsOpen() {
      return document.body.classList.contains("sidebar-open");
    }

    function syncVisibility() {
      const desktopTopbarIsHidden = document.body.classList.contains("topbar-hidden");
      const shouldHide = (!mobileQuery.matches && !desktopTopbarIsHidden) || sidebarIsOpen() || contactInView;

      button.classList.toggle(HIDDEN_CLASS, shouldHide);
      button.setAttribute("aria-hidden", String(shouldHide));

      if (shouldHide) {
        button.setAttribute("tabindex", "-1");
      } else {
        button.removeAttribute("tabindex");
      }
    }

    const bodyObserver = new MutationObserver(syncVisibility);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (contact && "IntersectionObserver" in window) {
      const contactObserver = new IntersectionObserver(
        ([entry]) => {
          contactInView = entry.isIntersecting;
          document.body.classList.toggle("contact-in-view", contactInView);
          syncVisibility();
        },
        {
          threshold: 0,
          rootMargin: "-8% 0px -18% 0px",
        }
      );

      contactObserver.observe(contact);
    } else {
      document.body.classList.remove("contact-in-view");
    }

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncVisibility);
    } else if (typeof mobileQuery.addListener === "function") {
      mobileQuery.addListener(syncVisibility);
    }

    syncVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFloatingWhatsapp, {
      once: true,
    });
  } else {
    initFloatingWhatsapp();
  }
})();
