import type { Metadata } from "next";
import { Block } from "@/components/Block";
import { DataTable, mono } from "@/components/DataTable";
import { Section } from "@/components/Section";
import { getSection } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

const section = getSection("/system");

export const metadata: Metadata = pageMetadata(
  section.title,
  "How Regulation (EU) No 1321/2014 and its annexes fit together: the layers of rules, the Parts, and how the system evolved.",
  section.href,
);

const TIMELINE = [
  { year: "1990s", title: "JAA codes", text: "The Joint Aviation Authorities publish JAR-145, JAR-66 and JAR-147, harmonised codes the EU later turns into law." },
  { year: "2003", title: "Reg. (EC) 2042/2003", text: "Part-M, Part-145, Part-66 and Part-147 become EU law. EASA begins operating." },
  { year: "2014", title: "Reg. (EU) 1321/2014", text: "A recast of the continuing airworthiness rules becomes today’s base text." },
  { year: "2018", title: "2018/1139 · 2018/1142", text: "A new Basic Regulation is adopted, and the B2L and L licence categories join Part-66." },
  { year: "2020", title: "Part-CAMO · Part-CAO", text: "New organisation annexes apply from 24 March 2020 (Reg. (EU) 2019/1383)." },
  { year: "2022", title: "Reg. (EU) 2021/1963", text: "Safety management systems become mandatory in Part-145 from 2 December 2022." },
  { year: "2024", title: "Reg. (EU) 2023/989", text: "A major update to Part-66 and Part-147 adds a revised module structure and distance learning." },
  { year: "2026", title: "Reg. (EU) 2023/203", text: "Part-IS brings information security management to Part-145 from 22 February 2026.", now: true },
] as const;

export default function SystemPage() {
  return (
    <Section
      section={section}
      intro={
        <>
          European continuing airworthiness rests on one Commission Regulation. Its annexes, the &ldquo;Parts&rdquo;,
          divide the work: who trains, who holds a licence, who may maintain, and who manages airworthiness. Every
          Member State&rsquo;s authority applies the same text.
        </>
      }
    >
      <Block id="three-layers-of-rules" title="Three layers of rules" eyebrow={<>Hard law &rarr; soft law</>}>
        <div className="tiers">
          <div className="tier">
            <h4>
              Basic Regulation<small>Reg. (EU) 2018/1139</small>
            </h4>
            <p>
              Adopted by the European Parliament and Council. Sets the essential requirements for aviation safety and
              gives EASA its mandate.
            </p>
          </div>
          <div className="tier">
            <h4>
              Implementing rules<small>Reg. (EU) No 1321/2014</small>
            </h4>
            <p>
              Adopted by the Commission and binding in every Member State. Its annexes are Part-M, Part-145, Part-66,
              Part-147 and the rest.
            </p>
          </div>
          <div className="tier soft">
            <h4>
              AMC &amp; GM<small>EASA ED Decisions</small>
            </h4>
            <p>
              <strong>Acceptable Means of Compliance</strong> show one accepted way to meet a rule.{" "}
              <strong>Guidance Material</strong> explains what the rule means. An organisation may use an alternative
              means of compliance if its authority agrees.
            </p>
          </div>
        </div>
      </Block>

      <Block id="the-annexes" title="The annexes" eyebrow="Reg. (EU) No 1321/2014">
        <DataTable
          head={["Annex", "Part", "Covers", "Who it applies to"]}
          firstCellPrefix="Annex"
          rows={[
            { cells: [mono("I"), mono("Part-M"), "Continuing airworthiness", "Owners, operators and airworthiness management of aircraft outside Part-ML"] },
            { highlight: true, cells: [mono("II"), mono("Part-145"), "Maintenance organisation approvals", "Organisations maintaining complex motor-powered aircraft, aircraft used by licensed air carriers, and their components"] },
            { highlight: true, cells: [mono("III"), mono("Part-66"), "Certifying staff", "Individuals who issue certificates of release to service"] },
            { highlight: true, cells: [mono("IV"), mono("Part-147"), "Training organisation requirements", "Schools that deliver Part-66 basic and type training and examinations"] },
            { cells: [mono("Va"), mono("Part-T"), "Third-country aircraft", "Aircraft registered outside the EU and used by EU operators"] },
            { cells: [mono("Vb"), mono("Part-ML"), "Light aircraft airworthiness", { content: <>Lighter aircraft (e.g. aeroplanes up to 2&#8239;730&nbsp;kg MTOM) not used by licensed air carriers</> }] },
            { cells: [mono("Vc"), mono("Part-CAMO"), "Continuing airworthiness management organisations", "Organisations managing maintenance programmes, ADs, records and airworthiness reviews"] },
            { cells: [mono("Vd"), mono("Part-CAO"), "Combined airworthiness organisations", "Organisations combining maintenance and airworthiness management for lighter aircraft"] },
          ]}
        />
      </Block>

      <Block id="how-the-parts-connect" title="How the Parts connect" eyebrow="From classroom to flight">
        <div className="chain">
          <div className="oversight">
            <span>Competent authority of each Member State: approves organisations on its territory and issues licences</span>
            <span>EASA: approves organisations outside EASA states and standardises the national authorities</span>
          </div>
          <div className="node">
            <span className="tag">Annex IV</span>
            <h3>Part-147</h3>
            <p>A training organisation runs basic and type courses and the exams.</p>
            <span className="out">&rarr; EASA Form 148a / 149a</span>
          </div>
          <div className="node">
            <span className="tag">Annex III</span>
            <h3>Part-66</h3>
            <p>The authority issues the aircraft maintenance licence to the engineer.</p>
            <span className="out">&rarr; EASA Form 26 licence</span>
          </div>
          <div className="node">
            <span className="tag">Annex II</span>
            <h3>Part-145</h3>
            <p>The approved organisation authorises its staff and does the maintenance.</p>
            <span className="out">&rarr; CRS &middot; EASA Form 1</span>
          </div>
          <div className="node" style={{ borderStyle: "dashed" }}>
            <span className="tag">Annex Vc</span>
            <h3>Part-CAMO</h3>
            <p>Manages the aircraft&rsquo;s continuing airworthiness and orders the work.</p>
            <span className="out">&rarr; Work order &middot; ARC</span>
          </div>
          <div className="node key">
            <span className="tag">Operator</span>
            <h3>Aircraft</h3>
            <p>Flies only with a valid release to service and airworthiness review.</p>
            <span className="out">&rarr; Airworthy flight</span>
          </div>
        </div>
      </Block>

      <Block id="how-we-got-here" title="How we got here" eyebrow={<>1990s &rarr; today</>}>
        <div className="timeline">
          <ol>
            {TIMELINE.map((t) => (
              <li key={t.year} className={"now" in t && t.now ? "now" : undefined}>
                <span className="yr">{t.year}</span>
                <span className="pip" />
                <b>{t.title}</b>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Block>
    </Section>
  );
}
