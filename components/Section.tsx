import Link from "next/link";
import type { ReactNode } from "react";
import { neighbours, type PageSection } from "@/lib/sections";

interface SectionProps {
  section: PageSection;
  /** Use the alternate (surface) background. */
  alt?: boolean;
  intro: ReactNode;
  children: ReactNode;
}

/** A content page: numeral header, the page's blocks, and previous/next links. */
export function Section({ section, alt, intro, children }: SectionProps) {
  const id = section.href.slice(1);
  const { prev, next } = neighbours(section.href);
  return (
    <section className={alt ? "sec alt" : "sec"} id={id} aria-labelledby={`${id}-title`}>
      <header className="sec-head">
        <div className="numeral">
          <small>{section.numeral.label}</small>
          {section.numeral.value}
        </div>
        <div className="intro">
          <h2 className="h2" id={`${id}-title`}>
            {section.title}
          </h2>
          <p>{intro}</p>
        </div>
      </header>
      {children}
      <nav className="pager" aria-label="Previous and next sections">
        {prev ? (
          <Link className="btn" href={prev.href}>
            &larr; {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="btn solid" href={next.href}>
            {next.name} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </section>
  );
}
