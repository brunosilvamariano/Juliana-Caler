/**
 * =========================================================
 * ABOUT / QUEM SOMOS
 * - Slider editorial manual com dots acessíveis
 * - Variações institucionais compactas no conteúdo esquerdo
 * - Sincroniza a navegação ao entrar na seção
 * =========================================================
 */

(function initAboutSection() {
  "use strict";

  const section = document.querySelector("[data-about-editorial]");
  if (!section) return;

  const slides = Array.from(section.querySelectorAll("[data-about-slide]"));
  const dots = Array.from(section.querySelectorAll("[data-about-dot]"));
  const nextButton = section.querySelector("[data-about-next]");
  const visual = section.querySelector("[data-about-image-variant]");
  const info = section.querySelector("[data-about-info-variant]");
  const infoTitles = Array.from(section.querySelectorAll("[data-about-info-title]"));
  const infoTexts = Array.from(section.querySelectorAll("[data-about-info-text]"));
  const fallbackInfoVariants = {
    "vision-mission-values": [
      ["Escuta", "Um espaço para falar sobre o que você sente com liberdade e respeito."],
      ["Processo", "Cada acompanhamento acontece de forma singular, respeitando seu tempo e sua história."],
      ["Cuidado", "A psicoterapia como espaço de compreensão, reflexão e construção de novas possibilidades."]
    ],
    "philosophy": [
      ["Presença", "Atenção ao que emerge em cada encontro e ao que faz sentido para você."],
      ["Respeito", "Um processo que considera sua história, seus limites e o seu momento."],
      ["Autonomia", "Construir recursos para compreender escolhas, relações e caminhos com mais consciência."]
    ]
  };
  const imageVariants = new Set([
    "fluid-bezier",
    "soft-arch",
    "architectural",
    "editorial-cut",
    "soft-capsule",
    "minimal-frame"
  ]);

  function applyInfoVariant() {
    if (!info) return;

    const params = new URLSearchParams(window.location.search);
    const contentVariants = window.SiteContent?.get("about.infoVariants");
    const normalizedContentVariants = contentVariants && typeof contentVariants === "object"
      ? Object.fromEntries(
          Object.entries(contentVariants).map(([key, items]) => [
            key,
            Array.isArray(items)
              ? items.map((item) => [item?.title || "", item?.text || ""])
              : []
          ])
        )
      : null;
    const infoVariants = normalizedContentVariants || fallbackInfoVariants;
    const requested = params.get("about-info");
    const fallback = info.dataset.aboutInfoVariant || "vision-mission-values";
    const variant = Object.prototype.hasOwnProperty.call(infoVariants, requested) ? requested : fallback;
    const safeVariant = Object.prototype.hasOwnProperty.call(infoVariants, variant) ? variant : "vision-mission-values";

    info.dataset.aboutInfoVariant = safeVariant;
    infoVariants[safeVariant].forEach(([title, text], index) => {
      if (infoTitles[index]) infoTitles[index].textContent = title;
      if (infoTexts[index]) infoTexts[index].textContent = text;
    });
  }

  function applyImageVariant() {
    if (!visual) return;

    const params = new URLSearchParams(window.location.search);
    const requested = params.get("about-image");
    const fallback = visual.dataset.aboutImageVariant || "fluid-bezier";
    const variant = imageVariants.has(requested) ? requested : fallback;

    visual.dataset.aboutImageVariant = imageVariants.has(variant) ? variant : "fluid-bezier";
  }

  applyImageVariant();
  applyInfoVariant();

  if (window.SiteContent?.state === "loading") {
    document.addEventListener("site:contentready", applyInfoVariant, { once: true });
  }

  let currentIndex = 0;
  function showSlide(index) {
    if (!slides.length) return;

    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === currentIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
      dot.setAttribute("tabindex", active ? "0" : "-1");
    });

  }

  function syncNavigation(active) {
    if (!active) return;

    const links = Array.from(document.querySelectorAll("[data-sidebar-link]"));
    const aboutLink = links.find((link) => link.getAttribute("href") === "#sobre");
    if (!aboutLink) return;

    links.forEach((link) => {
      const isActive = link === aboutLink;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const topbarIndex = document.querySelector("[data-topbar-index]");
    const topbarLabel = document.querySelector("[data-topbar-label]");
    if (topbarIndex) topbarIndex.textContent = "02";
    if (topbarLabel) topbarLabel.textContent = aboutLink.querySelector(".sidebar__link-text")?.textContent?.trim() || "Sobre";
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  nextButton?.addEventListener("click", () => showSlide(currentIndex + 1));


  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            syncNavigation(true);
          }
        });
      },
      { threshold: 0.38 }
    );

    observer.observe(section);
  } else {
  }

  showSlide(0);
})();
