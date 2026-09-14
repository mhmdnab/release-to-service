import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="sec" aria-labelledby="nf-title">
      <header className="sec-head">
        <div className="numeral">
          <small>NO SUCH PAGE</small>404
        </div>
        <div className="intro">
          <h2 className="h2" id="nf-title">
            Off the chart
          </h2>
          <p>
            There is no page at this address. It may have moved when the guide was split into sections, or the link
            may simply be wrong.
          </p>
        </div>
      </header>
      <div className="hero-actions">
        <Link className="btn solid" href="/">
          Back to the cover
        </Link>
        <Link className="btn" href="/glossary">
          Glossary &amp; FAQ
        </Link>
      </div>
    </section>
  );
}
