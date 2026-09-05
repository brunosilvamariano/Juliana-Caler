/**
 * =========================================================
 * MOTION ENGINE v4 — Section Blocks
 * ---------------------------------------------------------
 * Movimento simplificado por grandes blocos da seção.
 * Não anima títulos, parágrafos, botões, cards ou imagens
 * individualmente. O objetivo é dar direção à composição sem
 * transformar cada elemento em uma animação separada.
   *
 * Regras:
 * - no máximo 2–3 movimentos por seção;
 * - blocos complementares entram de lados opostos;
 * - fotografia permanece estática dentro de seu bloco;
 * - sem animação de saída e sem loops decorativos;
 * - cada seção anima uma única vez;
 * - respeita prefers-reduced-motion.
 * =========================================================
 */
(function bootSectionBlockMotion() {
  "use strict";

  function initSectionBlockMotion() {

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gsap || reducedMotion) {
      document.documentElement.classList.add("motion-disabled");
      return;
    }

    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("motion-enabled");

    const EASE = "power3.out";
    const DISTANCE = 11;

    function clean(items) {
      const nodes = items.filter(Boolean);
      if (!nodes.length) return;
      gsap.set(nodes, { clearProps: "willChange,transform,opacity" });
    }

    function prepare(items) {
      const nodes = items.filter(Boolean);
      if (nodes.length) gsap.set(nodes, { willChange: "transform,opacity" });
      return nodes;
    }

    function createTimeline(trigger, start = "top 84%", delay = 0) {
      const config = {
        delay,
        defaults: { duration: 0.92, ease: EASE }
      };

      if (ScrollTrigger) {
        config.scrollTrigger = {
          trigger,
          start,
          once: true,
          invalidateOnRefresh: true
        };
      }

      return gsap.timeline(config);
    }

    function enterPair({ root, left, right, top, start = "top 84%", distance = DISTANCE }) {
      if (!root) return;

      const nodes = prepare([top, left, right]);
      const tl = createTimeline(root, start);
      tl.eventCallback("onComplete", () => clean(nodes));

      if (top) {
        tl.fromTo(top,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.62 },
          0
        );
      }

      if (left) {
        tl.fromTo(left,
          { xPercent: -distance, opacity: 0 },
          { xPercent: 0, opacity: 1 },
          top ? 0.10 : 0
        );
      }

      if (right) {
        tl.fromTo(right,
          { xPercent: distance, opacity: 0 },
          { xPercent: 0, opacity: 1 },
          top ? 0.16 : 0.06
        );
      }
    }

    function heroMotion() {
      const root = document.querySelector("[data-hero-editorial]");
      if (!root) return;

      const content = root.querySelector(".hero-editorial__content");
      const media = root.querySelector(".hero-editorial__media");
      const nodes = prepare([content, media]);

      const tl = gsap.timeline({
        delay: 0.08,
        defaults: { duration: 1.02, ease: EASE },
        onComplete: () => clean(nodes)
      });

      if (content) {
        tl.fromTo(content,
          { xPercent: -10, opacity: 0 },
          { xPercent: 0, opacity: 1 },
          0
        );
      }

      if (media) {
        tl.fromTo(media,
          { xPercent: 10, opacity: 0 },
          { xPercent: 0, opacity: 1 },
          0.08
        );
      }
    }

    function aboutMotion() {
      const root = document.querySelector(".about-editorial");
      enterPair({
        root,
        top: root?.querySelector(".about-editorial__topline"),
        left: root?.querySelector(".about-editorial__content"),
        right: root?.querySelector(".about-editorial__visual"),
        start: "top 85%"
      });
    }

    function servicesMotion() {
      const root = document.querySelector(".services-editorial");
      if (!root) return;

      const intro = root.querySelector(".services-editorial__intro");
      const list = root.querySelector(".services-editorial__list");
      const topline = root.querySelector(".services-editorial__topline");
      const footer = root.querySelector(".services-editorial__footer");
      const rightBlock = list;
      const nodes = prepare([topline, intro, rightBlock, footer]);
      const tl = createTimeline(root, "top 84%");
      tl.eventCallback("onComplete", () => clean(nodes));

      if (topline) tl.fromTo(topline, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58 }, 0);
      if (intro) tl.fromTo(intro, { xPercent: -10, opacity: 0 }, { xPercent: 0, opacity: 1 }, 0.08);
      if (rightBlock) tl.fromTo(rightBlock, { xPercent: 10, opacity: 0 }, { xPercent: 0, opacity: 1 }, 0.14);
      if (footer) tl.fromTo(footer, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.62 }, 0.28);
    }

    function projectsMotion() {
      const root = document.querySelector(".projects-editorial");
      if (!root) return;

      const intro = root.querySelector(".projects-editorial__intro");
      const grid = root.querySelector(".projects-editorial__grid");
      const topline = root.querySelector(".projects-editorial__topline");
      const footer = root.querySelector(".projects-editorial__footer");
      const nodes = prepare([topline, intro, grid, footer]);
      const tl = createTimeline(root, "top 84%");
      tl.eventCallback("onComplete", () => clean(nodes));

      if (topline) tl.fromTo(topline, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58 }, 0);
      if (intro) tl.fromTo(intro, { xPercent: 9, opacity: 0 }, { xPercent: 0, opacity: 1 }, 0.08);
      if (grid) tl.fromTo(grid, { xPercent: -7, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.0 }, 0.14);
      if (footer) tl.fromTo(footer, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.62 }, 0.26);
    }

    function faqMotion() {
      const root = document.querySelector(".faq-editorial");
      enterPair({
        root,
        top: root?.querySelector(".faq-editorial__topline"),
        left: root?.querySelector(".faq-editorial__intro"),
        right: root?.querySelector(".faq-editorial__accordion"),
        start: "top 84%",
        distance: 9
      });
    }

    function contactMotion() {
      const root = document.querySelector(".contact-editorial");
      enterPair({
        root,
        top: root?.querySelector(".contact-editorial__topline"),
        left: root?.querySelector(".contact-editorial__intro"),
        right: root?.querySelector(".contact-editorial__channels"),
        start: "top 85%",
        distance: 9
      });
    }

    heroMotion();
    aboutMotion();
    servicesMotion();
    projectsMotion();
    faqMotion();
    contactMotion();

    window.addEventListener("load", () => {
      requestAnimationFrame(() => ScrollTrigger?.refresh());
    }, { once: true });
  }

  if (window.SiteContent?.state === "loading") {
    document.addEventListener("site:contentready", initSectionBlockMotion, { once: true });
  } else {
    initSectionBlockMotion();
  }
})();
