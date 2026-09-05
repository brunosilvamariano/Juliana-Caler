/**
 * =========================================================
 * CONTATO — Microinteração
 * - Destaque do CTA principal em pointer devices
 * - Sem dependências externas
 * =========================================================
 */
(function () {
  "use strict";

  function initContact() {
    const section = document.querySelector("[data-contact-editorial]");
    if (!section) return;

    const primary = section.querySelector(".contact-editorial__primary");
    if (!primary || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const icon = primary.querySelector(".contact-editorial__primary-icon");
    if (!icon) return;

    primary.addEventListener("pointermove", (event) => {
      const rect = primary.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      icon.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    });

    primary.addEventListener("pointerleave", () => {
      icon.style.removeProperty("transform");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContact, { once: true });
  } else {
    initContact();
  }
})();
