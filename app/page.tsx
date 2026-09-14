import Link from "next/link";
import { Block } from "@/components/Block";
import { Blueprint } from "@/components/Blueprint";
import { SECTIONS, type BlockId } from "@/lib/sections";
import { SITE } from "@/lib/site";
import { plural } from "@/lib/text";

const SAMPLE_CRS_ID: BlockId = "sample-crs";
const KEY_FIGURES_ID: BlockId = "key-figures";

const KEY_FIGURES = [
  { label: "EASA member states", value: "31" },
  { label: "Basic knowledge modules", value: "17" },
  { label: "Exam pass mark", value: "75%" },
  { label: "Minimum age to certify", value: "21" },
  { label: "Months’ work per 2 yrs", value: "6" },
  { label: "Licence check, years", value: "5" },
] as const;

export default function HomePage() {
  const contents = SECTIONS.filter((s) => s.href !== "/");
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-top">
          <span>EASA &middot; Continuing airworthiness &middot; Reg. (EU) No 1321/2014</span>
          <span className="rev">
            <span>Parts 147 / 66 / 145</span>
            <span>Rev. {SITE.revision}</span>
          </span>
        </div>
        <div className="rbf" aria-hidden="true">
          <div className="tag">REMOVE BEFORE FLIGHT</div>
        </div>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">Aircraft maintenance engineering in Europe</p>
            <h1 id="hero-title">
              Release to <span className="sig">Service</span>
            </h1>
            <p className="lede">
              No aircraft flies after maintenance until a certifying engineer signs for it. This guide covers the
              European system behind that signature: <strong>Part-147</strong> trains the engineers,{" "}
              <strong>Part-66</strong> licenses them, and <strong>Part-145</strong> approves the organisations they
              sign for.
            </p>
            <div className="hero-actions">
              <Link className="btn solid" href="/part-66">
                Compare licence categories &rarr;
              </Link>
              <Link className="btn" href="/system">
                How the rules fit together
              </Link>
            </div>
          </div>

          <figure className="blueprint" style={{ margin: 0 }}>
            <Blueprint />
          </figure>
        </div>

        <div className="hero-lower">
          <article
            className="crs"
            id={SAMPLE_CRS_ID}
            aria-label="Sample certificate of release to service"
          >
            <header>
              <b>Certificate of release to service</b>
              <span>145.A.50 &middot; sample</span>
            </header>
            <div className="body">
              <blockquote>
                Certifies that the work specified, except as otherwise specified, was carried out in accordance with
                Part-145 and in respect to that work the aircraft is considered ready for release to service.
              </blockquote>
              <div className="stamp">
                Released<small>SAMPLE</small>
              </div>
            </div>
            <div className="fields">
              <div>
                <span>Aircraft</span>
                <em>EX-AMPL</em>
              </div>
              <div>
                <span>Approval ref.</span>
                <em>XX.145.0000</em>
              </div>
              <div>
                <span>Licence</span>
                <em>B1.1 &middot; B2</em>
              </div>
              <div>
                <span>Date</span>
                <em className="tnum">{SITE.sampleDate}</em>
              </div>
            </div>
          </article>
          <div className="plate" id={KEY_FIGURES_ID}>
            <h2>Data plate &middot; key figures</h2>
            <dl>
              {KEY_FIGURES.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd className="tnum">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="sec alt" aria-labelledby="contents-title">
        <Block
          id="contents"
          title={<span id="contents-title">Contents</span>}
          eyebrow={<>Six sections &middot; start anywhere</>}
        >
          <div className="toc">
            {contents.map((s) => (
              <Link key={s.href} href={s.href}>
                <span className="code">{s.code}</span>
                <b>{s.name}</b>
                <p>{s.desc}</p>
                <span className="end">{plural(s.subs.length, "part", "parts")} &rarr;</span>
              </Link>
            ))}
          </div>
        </Block>
      </section>
    </>
  );
}
