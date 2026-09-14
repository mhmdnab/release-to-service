"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { sectionForPath } from "@/lib/sections";
import { Rail } from "./Rail";
import { SiteMenu, type MenuState } from "./SiteMenu";

/** Length of the menu's clip-path transition, matching the CSS. */
const MENU_CLOSE_MS = 560;

export interface CloseOptions {
  /** Return focus to the menu button after closing. Off when a link is followed. */
  restoreFocus?: boolean;
}

/**
 * The page chrome: sticky rail, reading progress, and the full-screen menu.
 * Owns the menu's open/close state machine so the shell can be made inert while it is open.
 */
export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const current = sectionForPath(pathname);

  const [menu, setMenu] = useState<MenuState>("closed");
  const [menuSession, setMenuSession] = useState(0);
  const [pct, setPct] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  const menuShown = menu === "opening" || menu === "open";

  /* Reading progress: --p on <html> drives the rail bar and the menu meter. */
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--p", p.toFixed(4));
      const rounded = Math.round(p * 100);
      setPct((prev) => (prev === rounded ? prev : rounded));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const initial = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(initial);
    };
  }, [pathname]);

  /* Menu state machine: opening → (next frame) open; closing → (after the transition) closed. */
  useEffect(() => {
    if (menu === "opening") {
      const id = requestAnimationFrame(() => {
        // Flush styles with the menu un-hidden before the .is-open class lands, so the clip-path animates.
        menuRef.current?.getBoundingClientRect();
        setMenu("open");
      });
      return () => cancelAnimationFrame(id);
    }
    if (menu === "closing") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const id = window.setTimeout(() => setMenu("closed"), reduce ? 0 : MENU_CLOSE_MS);
      return () => window.clearTimeout(id);
    }
  }, [menu]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuShown);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuShown]);

  useEffect(() => {
    if (menu === "closing" && restoreFocusRef.current) {
      restoreFocusRef.current = false;
      menuButtonRef.current?.focus({ preventScroll: true });
    }
  }, [menu]);

  const openMenu = useCallback(() => {
    if (menuShown) return;
    setMenuSession((n) => n + 1);
    setMenu("opening");
  }, [menuShown]);

  const closeMenu = useCallback((options?: CloseOptions) => {
    restoreFocusRef.current = options?.restoreFocus !== false;
    setMenu((state) => (state === "open" || state === "opening" ? "closing" : state));
  }, []);

  return (
    <>
      <div className="shell" inert={menuShown}>
        <Rail current={current} menuOpen={menuShown} onOpenMenu={openMenu} menuButtonRef={menuButtonRef} />
        <main id="top">{children}</main>
      </div>
      <SiteMenu
        key={menuSession}
        state={menu}
        current={current}
        pct={pct}
        onClose={closeMenu}
        menuRef={menuRef}
      />
    </>
  );
}
