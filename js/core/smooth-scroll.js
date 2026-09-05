/**
 * =========================================================
 * SMOOTH SCROLL / NAVEGAÇÃO ENTRE SEÇÕES
 * ---------------------------------------------------------
 * - Usa Lenis LOCAL já presente em /vendor.
 * - Intercepta somente âncoras internas válidas e visíveis.
 * - Respeita a altura da Topbar / Mobile Nav.
 * - Atualiza automaticamente o item ativo da Sidebar.
 * - Sincroniza a Topbar através do evento "site:sectionchange".
 * - Sem CDN externo.
 * =========================================================
 */

(function bootSmoothSectionNavigation() {
  "use strict";

  function initSmoothSectionNavigation() {
    const LenisClass = window.Lenis;
    const sidebarLinks = Array.from(
      document.querySelectorAll("[data-sidebar-link][href^='#']")
    );

    if (!sidebarLinks.length) return;

    const topbar = document.querySelector("[data-topbar]");
    const mobileNav = document.querySelector(".mobile-nav");

    /**
     * Considera somente seções existentes e realmente visíveis.
     * Isso evita tentar navegar para âncoras reservadas/hidden.
     */
    const sections = sidebarLinks
      .map((link, index) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return null;

        const target = document.querySelector(href);
        if (!target || target.hidden) return null;

        return {
          link,
          target,
          id: target.id,
          index,
          label:
            link.querySelector(".sidebar__link-text")?.textContent?.trim() ||
            target.id,
        };
      })
      .filter(Boolean);

    if (!sections.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /**
     * Lenis fica disponível globalmente para outros componentes,
     * evitando múltiplas instâncias no mesmo projeto.
     */
    const lenis =
      !reduceMotion && LenisClass
        ? new LenisClass({
            autoRaf: true,
            duration: 1.18,
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 0.92,
            touchMultiplier: 1,
            easing: (t) => 1 - Math.pow(1 - t, 4),
          })
        : null;

    window.siteLenis = lenis;

    // Mantém ScrollTrigger sincronizado com o scroll suavizado.
    if (lenis && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
    }

    /**
     * Calcula o Y final real da seção.
     *
     * Não depende de um offset aproximado do Lenis:
     * 1. lê a posição atual do elemento no documento;
     * 2. mede o header que está realmente visível;
     * 3. desconta a altura do header;
     * 4. adiciona um respiro editorial;
     * 5. limita o resultado entre 0 e o máximo rolável.
     */
    function getTargetScrollY(target) {
      if (!target) return 0;
      if (target.id === "inicio") return 0;

      const isMobile = window.innerWidth < 1024;
      const header = isMobile ? mobileNav : topbar;

      let headerBottom = 0;

      if (header) {
        const styles = window.getComputedStyle(header);
        const rect = header.getBoundingClientRect();

        if (
          styles.display !== "none" &&
          styles.visibility !== "hidden" &&
          rect.height > 0
        ) {
          /*
           * Usamos rect.bottom em vez de apenas height.
           * Assim o cálculo continua correto mesmo se o header tiver
           * top/gap/posicionamento diferente no desktop ou mobile.
           */
          headerBottom = Math.max(0, rect.bottom);
        }
      }

      const targetRect = target.getBoundingClientRect();
      const absoluteTargetTop = targetRect.top + window.scrollY;

      // Respiro visual entre a navegação e o início da seção.
      const editorialGap = window.innerWidth < 700 ? 16 : 24;

      const rawTargetY =
        absoluteTargetTop - headerBottom - editorialGap;

      const maxScrollY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      return Math.min(
        maxScrollY,
        Math.max(0, Math.round(rawTargetY))
      );
    }

    function setActiveSection(section) {
      if (!section) return;

      sidebarLinks.forEach((link) => {
        const active = link === section.link;
        link.classList.toggle("is-active", active);

        if (active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      document.dispatchEvent(
        new CustomEvent("site:sectionchange", {
          detail: {
            id: section.id,
            index: section.index,
            number: String(section.index + 1).padStart(2, "0"),
            label: section.label,
            link: section.link,
          },
        })
      );
    }

    function getActiveProbeY() {
      const isMobile = window.innerWidth < 1024;
      const header = isMobile ? mobileNav : topbar;
      let headerBottom = 0;

      if (header) {
        const styles = window.getComputedStyle(header);
        const rect = header.getBoundingClientRect();

        if (
          styles.display !== "none" &&
          styles.visibility !== "hidden" &&
          rect.height > 0
        ) {
          headerBottom = Math.max(0, rect.bottom);
        }
      }

      /*
       * A seção muda quando o início dela cruza uma linha logo abaixo
       * da navegação, e não 30% da viewport. Isso deixa o menu fiel
       * ao conteúdo que o usuário realmente está lendo.
       */
      const readingGap = window.innerWidth < 700 ? 34 : 52;
      return window.scrollY + headerBottom + readingGap;
    }

    function updateActiveFromScroll() {
      const probe = getActiveProbeY();

      /*
       * Nunca assume que Sidebar e DOM estejam na mesma ordem.
       * Ordena pela posição real das seções antes de determinar a ativa.
       * Isso protege o framework quando novas seções forem inseridas.
       */
      const orderedSections = sections
        .slice()
        .sort((a, b) => a.target.offsetTop - b.target.offsetTop);

      let current = orderedSections[0];

      for (const section of orderedSections) {
        if (section.target.offsetTop <= probe) {
          current = section;
        } else {
          break;
        }
      }

      setActiveSection(current);
    }

    function navigateTo(target, section, updateHistory = true) {
      /*
       * O cálculo é feito no momento exato do clique.
       * Isso considera viewport, header e layout atuais.
       */
      const targetY = getTargetScrollY(target);

      setActiveSection(section);

      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: 1.18,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          lock: false,
          force: true,
          onComplete: () => {
            /*
             * Faz uma correção final pequena caso fontes/imagens tenham
             * alterado alguns pixels do layout durante a animação.
             */
            const correctedY = getTargetScrollY(target);

            if (Math.abs(window.scrollY - correctedY) > 2) {
              lenis.scrollTo(correctedY, {
                duration: 0.24,
                easing: (t) => 1 - Math.pow(1 - t, 3),
                force: true,
              });
            }

            if (updateHistory && target.id) {
              history.pushState(null, "", `#${target.id}`);
            }
          },
        });

        return;
      }

      window.scrollTo({
        top: targetY,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      if (updateHistory && target.id) {
        history.pushState(null, "", `#${target.id}`);
      }
    }

    /**
     * Todos os links internos podem aproveitar a mesma navegação,
     * incluindo logo, CTA do Hero e futuros links de seção.
     */
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest("a[href^='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target || target.hidden) return;

      const section =
        sections.find((item) => item.target === target) ||
        sections
          .slice()
          .reverse()
          .find((item) => item.target.offsetTop <= target.offsetTop) ||
        sections[0];

      event.preventDefault();
      navigateTo(target, section, true);
    });

    /**
     * Atualização automática durante scroll manual.
     * requestAnimationFrame evita trabalho excessivo.
     */
    let ticking = false;

    function requestActiveUpdate() {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    }

    if (lenis) {
      lenis.on("scroll", requestActiveUpdate);
    } else {
      window.addEventListener("scroll", requestActiveUpdate, { passive: true });
    }

    window.addEventListener("resize", requestActiveUpdate, { passive: true });

    // Voltar/avançar do navegador com hashes também mantém o movimento suave.
    window.addEventListener("popstate", () => {
      const id = window.location.hash;
      if (!id) return;

      const target = document.querySelector(id);
      const section = sections.find((item) => item.target === target);

      if (target && section) {
        navigateTo(target, section, false);
      }
    });

    updateActiveFromScroll();
  }

  if (window.SiteContent?.state === "loading") {
    document.addEventListener("site:contentready", initSmoothSectionNavigation, { once: true });
  } else {
    initSmoothSectionNavigation();
  }
})();
