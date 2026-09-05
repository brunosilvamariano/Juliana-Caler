/**
 * =========================================================
 * FAQ — Accordion
 * - Uma resposta aberta por vez
 * - Estado ARIA sincronizado
 * - Sem dependências externas
 * =========================================================
 */
(function () {
  "use strict";

  function initFaq() {
    const section = document.querySelector("[data-faq-editorial]");
    if (!section) return;

    const variants = new Set(["premium-panel", "image-panel"]);
    const params = new URLSearchParams(window.location.search);
    const requestedVariant = params.get("faq");
    const fallback = variants.has(section.dataset.faqVariant)
      ? section.dataset.faqVariant
      : "premium-panel";

    // O HTML define a variante real. A query string é apenas um override de preview.
    section.dataset.faqVariant = variants.has(requestedVariant)
      ? requestedVariant
      : fallback;

    const items = [...section.querySelectorAll("[data-faq-item]")];

    function setOpen(targetItem) {
      items.forEach((item) => {
        const trigger = item.querySelector("[data-faq-trigger]");
        const open = item === targetItem;

        const answer = item.querySelector("[data-faq-answer]");

        item.classList.toggle("is-open", open);
        trigger?.setAttribute("aria-expanded", String(open));
        answer?.setAttribute("aria-hidden", String(!open));
      });
    }

    items.forEach((item) => {
      const trigger = item.querySelector("[data-faq-trigger]");
      if (!trigger) return;

      trigger.addEventListener("click", () => {
        const alreadyOpen = item.classList.contains("is-open");

        // Mantém pelo menos uma pergunta aberta.
        if (!alreadyOpen) setOpen(item);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFaq, { once: true });
  } else {
    initFaq();
  }
})();
