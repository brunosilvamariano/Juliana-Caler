/**
 * =========================================================
 * MARQUEE MODERN — Movimento vinculado ao scroll
 * ---------------------------------------------------------
 * Movimento por velocidade acumulada de scroll com inércia curta.
 *
 * Regras:
 * - não possui autoplay;
 * - scroll para baixo move para a esquerda;
 * - scroll para cima move para a direita;
 * - ao parar o scroll, desacelera rapidamente e para;
 * - loop contínuo sem salto usando duas cópias do grupo;
 * - respeita prefers-reduced-motion.
 * =========================================================
 */
(function initModernMarquee() {
  "use strict";

  const marquee = document.querySelector("[data-marquee-modern]");
  const track = marquee?.querySelector(".marquee-modern__track");
  const firstGroup = marquee?.querySelector(".marquee-modern__group");

  if (!marquee || !track || !firstGroup) return;

  const variants = new Set([
    "modern-clean",
    "soft-outline"
  ]);

  const requestedVariant = new URLSearchParams(window.location.search).get("marquee");
  if (requestedVariant && variants.has(requestedVariant)) {
    marquee.dataset.marqueeVariant = requestedVariant;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const SPEED_FACTOR = 0.34;
  const MAX_VELOCITY = 18;
  const FRICTION = 0.84;
  const STOP_THRESHOLD = 0.035;

  let groupWidth = 0;
  let position = 0;
  let velocity = 0;
  let lastScrollY = window.scrollY;
  let rafId = 0;

  function measure() {
    groupWidth = firstGroup.getBoundingClientRect().width;
  }

  function wrapPosition(value) {
    if (!groupWidth) return value;

    while (value <= -groupWidth) value += groupWidth;
    while (value > 0) value -= groupWidth;

    return value;
  }

  function render() {
    position = wrapPosition(position + velocity);
    track.style.transform = `translate3d(${position}px, 0, 0)`;

    velocity *= FRICTION;

    if (Math.abs(velocity) <= STOP_THRESHOLD) {
      velocity = 0;
      rafId = 0;
      return;
    }

    rafId = window.requestAnimationFrame(render);
  }

  function startRender() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(render);
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    if (!delta) return;

    velocity += -delta * SPEED_FACTOR;
    velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));
    startRender();
  }

  function handleResize() {
    const previousWidth = groupWidth || 1;
    const progress = Math.abs(position / previousWidth);

    measure();
    position = -Math.min(progress, 1) * groupWidth;
    track.style.transform = `translate3d(${position}px, 0, 0)`;
  }

  measure();
  marquee.dataset.marqueeReady = "true";

  if (window.SiteContent?.state === "loading") {
    document.addEventListener("site:contentready", () => requestAnimationFrame(handleResize), { once: true });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
})();
