"use client";

import Link from "next/link";
import { Fragment, type RefObject } from "react";
import { RAIL_GROUPS, getSection, type Section } from "@/lib/sections";
import { SITE } from "@/lib/site";

interface RailProps {
  current: Section;
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

/** Sticky sidebar on desktop; a slim top bar with the menu button on smaller screens. */
export function Rail({ current, menuOpen, onOpenMenu, menuButtonRef }: RailProps) {
  return (
    <aside className="rail" aria-label="Contents">
      <div className="rail-top">
        <Link className="brand" href="/">
          <b>
            Release to
            <br /> Service
          </b>
          <span>{SITE.tagline}</span>
        </Link>
        <p className="rail-now" aria-hidden="true">
          <b>{current.code}</b>
          <span>{current.name}</span>
        </p>
        <button
          type="button"
          className="menu-btn"
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={onOpenMenu}
        >
          <span className="menu-btn-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>Menu</span>
        </button>
      </div>
      <span className="rail-progress" aria-hidden="true">
        <i />
      </span>
      <nav aria-label="Sections">
        {RAIL_GROUPS.map((group) => (
          <Fragment key={group.label}>
            <span className="grp">{group.label}</span>
            {group.hrefs.map((href) => {
              const s = getSection(href);
              const on = s.href === current.href;
              return (
                <Link key={href} href={href} className={on ? "on" : undefined} aria-current={on ? "location" : undefined}>
                  <i>{s.code}</i>
                  {s.name}
                </Link>
              );
            })}
          </Fragment>
        ))}
      </nav>
      <p className="foot">
        Informative summary of Reg. (EU) No 1321/2014 as amended, incl. Reg. (EU) 2023/989 and 2023/203. Not legal
        text &mdash; always check the current EASA Easy Access Rules.
      </p>
    </aside>
  );
}
