/**
 * =========================================================
 * PROJETOS — VARIANT SYSTEM
 * ---------------------------------------------------------
 * ?projects=editorial-grid
 * ?projects=balanced-masonry  -> Apple-inspired vertical thumbnail slider
 * ?projects=offset-grid
 *
 * balanced-masonry mantém o nome histórico por compatibilidade,
 * mas sua composição é montada como showcase de mídia principal
 * + 4 thumbnails sincronizadas. Sem autoplay, setas visuais ou dependência nova.
 * =========================================================
 */

(function () {
  "use strict";

  const PROJECT_VARIANTS = new Set([
    "editorial-grid",
    "balanced-masonry",
    "offset-grid",
  ]);

  const THUMBNAIL_SLIDER_VARIANT = "balanced-masonry";
  const SWIPE_THRESHOLD = 54;
  const SHOWCASE_MAX_ITEMS = 4;
  const MOBILE_THUMBS_QUERY = "(max-width: 43.74rem)";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function formatIndex(index) {
    return String(index + 1).padStart(2, "0");
  }

  function readCards(section) {
    return Array.from(section.querySelectorAll("[data-project-card]")).map((card, index) => {
      const image = card.querySelector(".projects-editorial__media img");
      return {
        index,
        title: card.querySelector(".projects-editorial__name")?.textContent?.trim() || `Projeto ${index + 1}`,
        category: card.querySelector(".projects-editorial__category")?.textContent?.trim() || "Projeto",
        src: image?.getAttribute("src") || "",
        alt: image?.getAttribute("alt") || "",
      };
    });
  }


  function createShowcase(section, items) {
    const mount = section.querySelector("[data-project-showcase-mount]");
    if (!mount || items.length === 0) return null;

    mount.replaceChildren();

    const showcase = document.createElement("div");
    showcase.className = "projects-editorial__showcase";
    showcase.dataset.projectShowcase = "";
    showcase.tabIndex = 0;
    showcase.setAttribute("role", "region");
    showcase.setAttribute("aria-roledescription", "slider");
    showcase.setAttribute("aria-label", "Projetos em destaque. Use as miniaturas, gesto de arrastar ou as setas do teclado para navegar.");

    const toolbar = document.createElement("div");
    toolbar.className = "projects-editorial__showcase-toolbar";

    const toolbarMeta = document.createElement("div");
    toolbarMeta.className = "projects-editorial__showcase-toolbar-meta";

    const toolbarLabel = document.createElement("span");
    toolbarLabel.className = "projects-editorial__showcase-label";
    toolbarLabel.textContent = "Projetos selecionados";

    const status = document.createElement("span");
    status.className = "projects-editorial__showcase-status";
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");

    const current = document.createElement("strong");
    current.dataset.projectShowcaseCurrent = "";
    current.textContent = "01";

    const statusSeparator = document.createElement("span");
    statusSeparator.setAttribute("aria-hidden", "true");
    statusSeparator.textContent = " de ";

    const total = document.createElement("span");
    total.dataset.projectShowcaseTotal = "";
    total.textContent = formatIndex(items.length - 1);

    status.append(current, statusSeparator, total);
    toolbarMeta.append(toolbarLabel, status);

    toolbar.append(toolbarMeta);

    const layout = document.createElement("div");
    layout.className = "projects-editorial__showcase-layout";

    const thumbs = document.createElement("div");
    thumbs.className = "projects-editorial__showcase-thumbs";
    thumbs.dataset.projectShowcaseThumbs = "";
    thumbs.setAttribute("role", "tablist");
    thumbs.setAttribute("aria-label", "Selecionar projeto");
    thumbs.setAttribute("aria-orientation", "vertical");

    const main = document.createElement("div");
    main.className = "projects-editorial__showcase-main";
    main.dataset.projectShowcaseSwipe = "";

    const slides = document.createElement("div");
    slides.className = "projects-editorial__showcase-slides";

    items.forEach((item, index) => {
      const thumbId = `project-showcase-thumb-${index + 1}`;
      const slideId = `project-showcase-slide-${index + 1}`;

      const thumb = document.createElement("button");
      thumb.className = "projects-editorial__showcase-thumb";
      thumb.type = "button";
      thumb.id = thumbId;
      thumb.dataset.projectShowcaseThumb = String(index);
      thumb.setAttribute("role", "tab");
      thumb.setAttribute("aria-controls", slideId);
      thumb.setAttribute("aria-selected", index === 0 ? "true" : "false");
      thumb.tabIndex = index === 0 ? 0 : -1;

      const thumbImage = document.createElement("img");
      thumbImage.src = item.src;
      thumbImage.alt = "";
      thumbImage.loading = "lazy";
      thumbImage.decoding = "async";
      thumbImage.draggable = false;

      const thumbNumber = document.createElement("span");
      thumbNumber.className = "projects-editorial__showcase-thumb-number";
      thumbNumber.textContent = formatIndex(index);
      thumbNumber.setAttribute("aria-hidden", "true");

      const thumbName = document.createElement("span");
      thumbName.className = "projects-editorial__showcase-thumb-name";
      thumbName.textContent = item.title;

      thumb.append(thumbImage, thumbNumber, thumbName);
      thumbs.append(thumb);

      const slide = document.createElement("article");
      slide.className = "projects-editorial__showcase-slide";
      slide.id = slideId;
      slide.dataset.projectShowcaseSlide = String(index);
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-labelledby", thumbId);
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
      if (index === 0) slide.classList.add("is-active");

      const media = document.createElement("figure");
      media.className = "projects-editorial__showcase-media";

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";
      image.draggable = false;

      media.append(image);

      const info = document.createElement("div");
      info.className = "projects-editorial__showcase-info";

      const infoText = document.createElement("div");
      infoText.className = "projects-editorial__showcase-info-text";

      const category = document.createElement("span");
      category.className = "projects-editorial__showcase-category";
      category.textContent = item.category;

      const title = document.createElement("h3");
      title.className = "projects-editorial__showcase-title";
      title.textContent = item.title;

      const slideIndex = document.createElement("span");
      slideIndex.className = "projects-editorial__showcase-index";
      slideIndex.textContent = `${formatIndex(index)} / ${formatIndex(items.length - 1)}`;
      slideIndex.setAttribute("aria-hidden", "true");

      infoText.append(category, title);
      info.append(infoText, slideIndex);
      slide.append(media, info);
      slides.append(slide);
    });

    main.append(slides);
    layout.append(thumbs, main);
    showcase.append(toolbar, layout);
    mount.append(showcase);
    section.classList.add("has-project-showcase");

    return showcase;
  }

  function syncShowcaseContent(section) {
    const showcase = section.querySelector("[data-project-showcase]");
    if (!showcase) return;

    const items = readCards(section).slice(0, SHOWCASE_MAX_ITEMS);
    const thumbs = Array.from(showcase.querySelectorAll("[data-project-showcase-thumb]"));
    const slides = Array.from(showcase.querySelectorAll("[data-project-showcase-slide]"));

    items.forEach((item, index) => {
      const thumb = thumbs[index];
      const slide = slides[index];
      if (!thumb || !slide) return;

      const thumbImage = thumb.querySelector("img");
      const thumbName = thumb.querySelector(".projects-editorial__showcase-thumb-name");
      if (thumbImage) thumbImage.src = item.src;
      if (thumbName) thumbName.textContent = item.title;

      const image = slide.querySelector(".projects-editorial__showcase-media img");
      const category = slide.querySelector(".projects-editorial__showcase-category");
      const title = slide.querySelector(".projects-editorial__showcase-title");

      if (image) {
        image.src = item.src;
        image.alt = item.alt;
      }
      if (category) category.textContent = item.category;
      if (title) title.textContent = item.title;
    });
  }

  function initThumbnailSlider(section) {
    if (section.dataset.projectShowcaseReady === "true") return;

    const items = readCards(section).slice(0, SHOWCASE_MAX_ITEMS);
    const showcase = createShowcase(section, items);
    if (!showcase) return;

    section.dataset.projectShowcaseReady = "true";

    const thumbs = Array.from(showcase.querySelectorAll("[data-project-showcase-thumb]"));
    const slides = Array.from(showcase.querySelectorAll("[data-project-showcase-slide]"));
    const current = showcase.querySelector("[data-project-showcase-current]");
    const swipeSurface = showcase.querySelector("[data-project-showcase-swipe]");
    const thumbList = showcase.querySelector("[data-project-showcase-thumbs]");
    const mobileThumbsMedia = window.matchMedia(MOBILE_THUMBS_QUERY);

    function updateThumbOrientation() {
      thumbList?.setAttribute("aria-orientation", mobileThumbsMedia.matches ? "horizontal" : "vertical");
    }

    updateThumbOrientation();
    mobileThumbsMedia.addEventListener?.("change", updateThumbOrientation);

    let activeIndex = 0;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    function setActive(index, options = {}) {
      const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
      activeIndex = nextIndex;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === nextIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      thumbs.forEach((thumb, thumbIndex) => {
        const isActive = thumbIndex === nextIndex;
        thumb.classList.toggle("is-active", isActive);
        thumb.setAttribute("aria-selected", isActive ? "true" : "false");
        thumb.tabIndex = isActive ? 0 : -1;
      });

      if (current) current.textContent = formatIndex(nextIndex);

      const activeThumb = thumbs[nextIndex];
      if (activeThumb && options.scrollThumb !== false) {
        activeThumb.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }

      if (options.focusThumb) activeThumb?.focus({ preventScroll: true });
    }

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => setActive(index));
      thumb.addEventListener("keydown", (event) => {
        const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"];
        if (!keys.includes(event.key)) return;

        event.preventDefault();
        if (event.key === "Home") return setActive(0, { focusThumb: true });
        if (event.key === "End") return setActive(thumbs.length - 1, { focusThumb: true });

        const backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
        setActive(activeIndex + (backward ? -1 : 1), { focusThumb: true });
      });
    });

    showcase.addEventListener("keydown", (event) => {
      if (event.target.closest("[data-project-showcase-thumb]")) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setActive(activeIndex + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setActive(activeIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setActive(slides.length - 1);
      }
    });

    if (swipeSurface) {
      swipeSurface.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        isDragging = true;
        swipeSurface.classList.add("is-dragging");
        swipeSurface.setPointerCapture(pointerId);
      });

      swipeSurface.addEventListener("pointerup", (event) => {
        if (!isDragging || event.pointerId !== pointerId) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        if (swipeSurface.hasPointerCapture(pointerId)) {
          swipeSurface.releasePointerCapture(pointerId);
        }

        isDragging = false;
        pointerId = null;
        swipeSurface.classList.remove("is-dragging");

        if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        setActive(activeIndex + (deltaX < 0 ? 1 : -1));
      });

      swipeSurface.addEventListener("pointercancel", () => {
        isDragging = false;
        pointerId = null;
        swipeSurface.classList.remove("is-dragging");
      });

      swipeSurface.addEventListener("lostpointercapture", () => {
        isDragging = false;
        pointerId = null;
        swipeSurface.classList.remove("is-dragging");
      });
    }

    setActive(0, { scrollThumb: false });
  }

  function applyVariant(section) {
    const requestedVariant = new URLSearchParams(window.location.search).get("projects");
    const fallback = PROJECT_VARIANTS.has(section.dataset.projectsVariant)
      ? section.dataset.projectsVariant
      : "editorial-grid";

    section.dataset.projectsVariant = PROJECT_VARIANTS.has(requestedVariant)
      ? requestedVariant
      : fallback;

    if (section.dataset.projectsVariant === THUMBNAIL_SLIDER_VARIANT) {
      const footerNote = section.querySelector(".projects-editorial__footer-note");
      if (footerNote) footerNote.textContent = "04 destaques · Estrutura adaptável a qualquer nicho";
      initThumbnailSlider(section);
    }
  }

  function initProjects() {
    const section = document.querySelector("[data-projects-editorial]");
    if (!section) return;

    applyVariant(section);

    document.addEventListener("site:contentready", () => {
      if (section.dataset.projectsVariant !== THUMBNAIL_SLIDER_VARIANT) return;
      if (section.dataset.projectShowcaseReady !== "true") initThumbnailSlider(section);
      syncShowcaseContent(section);
    }, { once: true });

    if (window.SiteContent?.state && window.SiteContent.state !== "loading") {
      syncShowcaseContent(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjects, { once: true });
  } else {
    initProjects();
  }
})();
