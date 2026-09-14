"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import { flushSync } from "react-dom";
import { cx } from "@/lib/cx";
import { SECTIONS, getSection, normalizePath, sectionSlug, type Section, type SectionHref } from "@/lib/sections";
import { SITE } from "@/lib/site";
import { plural } from "@/lib/text";
import type { CloseOptions } from "./Shell";

export type MenuState = "closed" | "opening" | "open" | "closing";

interface SiteMenuProps {
  state: MenuState;
  current: Section;
  pct: number;
  onClose: (options?: CloseOptions) => void;
  menuRef: RefObject<HTMLDivElement | null>;
}

function subLinks(section: Section, onNavigate: (href: string) => void) {
  return section.subs.map((sub) => {
    const href = `${section.href}#${sub.id}`;
    return (
      <li key={sub.id}>
        <Link
          href={href}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(href);
          }}
        >
          {sub.title}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </li>
    );
  });
}

/** Full-screen table of contents. Remounted by the shell on every open, so its local state starts fresh. */
export function SiteMenu({ state, current, pct, onClose, menuRef }: SiteMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [previewedHref, setPreviewedHref] = useState<SectionHref>(current.href);
  const [expanded, setExpanded] = useState<ReadonlySet<SectionHref>>(() => new Set());
  const linkRefs = useRef(new Map<SectionHref, HTMLAnchorElement>());
  const previewed = getSection(previewedHref);
  const isOpen = state === "open";

  useEffect(() => {
    if (isOpen) linkRefs.current.get(current.href)?.focus({ preventScroll: true });
  }, [isOpen, current.href]);

  const navigate = (href: string) => {
    const [path = "/", hash = ""] = href.split("#");
    // Commit the close synchronously so the shell is no longer inert before anything in it is focused.
    flushSync(() => onClose({ restoreFocus: false }));
    if (normalizePath(path) !== normalizePath(pathname)) {
      router.push(href);
      return;
    }
    const target = hash ? document.getElementById(hash) : document.querySelector<HTMLElement>("main");
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", hash ? `#${hash}` : window.location.pathname + window.location.search);
    const heading = target.querySelector<HTMLElement>("h1, h2, h3") ?? target;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  };

  const toggleExpanded = (href: SectionHref) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "Tab") {
      const root = menuRef.current;
      if (!root) return;
      const focusable = Array.from(root.querySelectorAll<HTMLElement>("a[href], button")).filter(
        (el) => !el.hidden && el.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
      const links = SECTIONS.map((s) => linkRefs.current.get(s.href)).filter(
        (el): el is HTMLAnchorElement => el !== undefined,
      );
      const i = links.findIndex((el) => el === document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      const n =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? links.length - 1
            : (i + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
      links[n]?.focus();
    }
  };

  return (
    <div
      ref={menuRef}
      className={cx("menu", isOpen && "is-open")}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
      hidden={state === "closed"}
      onKeyDown={onKeyDown}
    >
      <div className="menu-top">
        <p className="menu-title" id="menu-title">
          <strong>{SITE.name}</strong> <span>&middot; Contents</span>
        </p>
        <div className="menu-meta">
          <span className="menu-read">
            <span className="menu-meter" aria-hidden="true">
              <i />
            </span>
            <span>{pct}%</span>&nbsp;read
          </span>
          <button type="button" className="menu-close" onClick={() => onClose()}>
            Close <kbd>Esc</kbd>
          </button>
        </div>
      </div>
      <div className="menu-body">
        <nav aria-label="Sections menu">
          <ol className="menu-list">
            {SECTIONS.map((s, i) => {
              const slug = sectionSlug(s.href);
              const isCurrent = s.href === current.href;
              const isExpanded = expanded.has(s.href);
              return (
                <li
                  key={s.href}
                  className={cx(
                    "menu-item",
                    s.href === previewed.href && "is-active",
                    isCurrent && "is-current",
                    isExpanded && "is-expanded",
                  )}
                  style={{ "--i": i } as CSSProperties}
                >
                  <div className="menu-row">
                    <Link
                      className="menu-link"
                      href={s.href}
                      ref={(el) => {
                        if (el) linkRefs.current.set(s.href, el);
                        else linkRefs.current.delete(s.href);
                      }}
                      aria-current={isCurrent ? "location" : undefined}
                      onMouseEnter={() => setPreviewedHref(s.href)}
                      onFocus={() => setPreviewedHref(s.href)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(s.href);
                      }}
                    >
                      <span className="menu-code">{s.code}</span>
                      <span className="menu-name">
                        {s.name}
                        <em className="menu-here" aria-hidden="true">
                          You are here
                        </em>
                      </span>
                      <span className="menu-desc">{s.desc}</span>
                    </Link>
                    <button
                      type="button"
                      className="menu-more"
                      aria-expanded={isExpanded}
                      aria-controls={`msub-${slug}`}
                      aria-label={`Show parts of ${s.name.replace("&", "and")}`}
                      onClick={() => toggleExpanded(s.href)}
                    />
                  </div>
                  <ul className="menu-subinline" id={`msub-${slug}`}>
                    {subLinks(s, navigate)}
                  </ul>
                </li>
              );
            })}
          </ol>
        </nav>
        <aside className="menu-preview" aria-label="Section contents">
          <div className="menu-pv-head">
            <p className="eyebrow">Inside this section</p>
            <span className="eyebrow">{plural(previewed.subs.length, "part", "parts")}</span>
          </div>
          <div key={previewed.href} className="menu-numeral swap" aria-hidden="true">
            {previewed.code}
          </div>
          <h3>{previewed.name}</h3>
          <ul className="menu-sub">{subLinks(previewed, navigate)}</ul>
        </aside>
      </div>
      <div className="menu-foot">
        <span>
          Rev. {SITE.revision} &middot; Parts 147 / 66 / 145 &middot; Not legal text
        </span>
        <span className="hint-keys">
          <kbd>&uarr;</kbd> <kbd>&darr;</kbd> move &middot; <kbd>Enter</kbd> open &middot; <kbd>Esc</kbd> close
        </span>
        <span className="hint-touch">
          Tap <kbd>+</kbd> to see what&rsquo;s inside a section
        </span>
      </div>
    </div>
  );
}
