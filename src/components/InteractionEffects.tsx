import { useEffect } from "react";

/**
 * Adds two subtle, professional interactions:
 * 1. A soft cursor-following ambient glow (dark mode only, via CSS).
 * 2. A scroll-reveal IntersectionObserver that toggles `.is-visible`
 *    on any element with the `.reveal-on-scroll` class.
 *
 * Respects prefers-reduced-motion via CSS.
 */
export default function InteractionEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Cursor glow ---
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // ease toward target for a smooth, lagged feel
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      glow.style.setProperty("--cursor-x", `${curX}px`);
      glow.style.setProperty("--cursor-y", `${curY}px`);
      raf = requestAnimationFrame(tick);
    };

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }

    // --- Scroll reveal ---
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal-on-scroll:not(.is-visible)")
        .forEach((el) => io.observe(el));
    };
    observeAll();

    // Re-scan on route changes / DOM updates
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      mo.disconnect();
      glow.remove();
    };
  }, []);

  return null;
}
