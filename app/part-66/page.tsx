import type { Metadata } from "next";
import { Block } from "@/components/Block";
import { DataTable, mono } from "@/components/DataTable";
import { LicenceExplorer, LicenceProvider, ModuleMatrix } from "@/components/Licence";
import { Section } from "@/components/Section";
import { getSection } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

const section = getSection("/part-66");

export const metadata: Metadata = pageMetadata(
  section.title,
  "Part-66 aircraft maintenance licences: an interactive explorer of categories A, B1, B2, B2L, B3, L and C, the module matrix, experience routes and aircraft ratings.",
  section.href,
);

const GROUPS = [
  {
    name: "Group 1",
    text: <>Complex motor-powered aircraft, multi-engine helicopters, non-piston aeroplanes certified above FL290, fly-by-wire aircraft, and gas airships other than ELA2.</>,
    end: <>B1 &middot; B2 &middot; C: individual type rating</>,
  },
  {
    name: "Group 2",
    text: <><strong>2a</strong> single turboprop aeroplanes, <strong>2b</strong> single turbine-engine helicopters, <strong>2c</strong> single piston-engine helicopters, when not in Group 1.</>,
    end: <>B1 &middot; B2 &middot; C: type, manufacturer subgroup or full subgroup. B2L: manufacturer subgroup or full subgroup</>,
  },
  {
    name: "Group 3",
    text: <>Piston-engine aeroplanes not in Group 1.</>,
    end: <>B1 &middot; B2 &middot; C: type or full group. B2L: full group. B3: its own single rating</>,
  },
  {
    name: "Group 4",
    text: <>Sailplanes, powered sailplanes, balloons and airships not in Group 1.</>,
    end: <>B2 &middot; B2L: full group. L: rating per subcategory</>,
  },
] as const;

const STEPS = [
  { title: "Choose a category", text: "A, B1, B2, B2L, B3, C or L. Each has its own modules, experience and privileges." },
  { title: "Pass the modules", text: "Take a Part-147 course with its exams, or self-study and sit the exams with the competent authority." },
  { title: "Build experience", text: "Work 1 to 5 years on operating aircraft, depending on the category and your training route." },
  { title: "Apply for the AML", text: "Send EASA Form 19 to the authority and receive the licence on EASA Form 26." },
  { title: "Type training", text: "Complete theoretical and practical training on your first aircraft type, with a type evaluation." },
  { title: "On-the-job training", text: "Do supervised tasks on the type. This is required for the first type rating in each category." },
  { title: "Rating endorsed", text: "The authority adds the aircraft rating to your licence." },
  { title: "Get authorised", text: "A Part-145 organisation assesses you and issues a certification authorisation." },
  { title: "Sign the CRS", text: "Certify that the work was done correctly and the aircraft is ready for release to service." },
] as const;

export default function Part66Page() {
  return (
    <Section
      section={section}
      intro={
        <>
          Part-66 licenses the individual. A Member State&rsquo;s authority issues the aircraft maintenance licence
          (AML) on EASA Form 26, and every EASA state recognises it. The licence proves you are qualified. The right
          to sign comes from an organisation&rsquo;s certification authorisation.
        </>
      }
    >
      <LicenceProvider>
        <Block
          id="licence-explorer"
          title="Licence explorer"
          eyebrow={<>66.A.20 privileges &middot; 66.A.30 experience &middot; Appendix I modules</>}
        >
          <LicenceExplorer />
        </Block>

        <Block id="levels-of-knowledge" title="Levels of knowledge" eyebrow={<>Appendix I &middot; set per module and category</>}>
          <div className="levels">
            <div>
              <b>
                <small>Level</small>1
              </b>
              <p>
                Familiarisation with the principal elements of the subject. Can describe it in simple terms, using
                common words and examples.
              </p>
            </div>
            <div>
              <b>
                <small>Level</small>2
              </b>
              <p>
                General knowledge of theory and practice. Can apply it using detailed procedures and read drawings,
                sketches and schematics.
              </p>
            </div>
            <div>
              <b>
                <small>Level</small>3
              </b>
              <p>
                Detailed knowledge of theory and practice. Can combine elements logically, interpret results and take
                corrective action.
              </p>
            </div>
          </div>
        </Block>

        <Block
          id="module-matrix"
          title="Module matrix"
          eyebrow={<>Linked to the explorer &middot; highlighted column follows your choice</>}
        >
          <ModuleMatrix />
          <p className="note">
            &#9679; required &nbsp; &#9680; partly required: B2L takes Module 13 by submodule for each system rating,
            and Module 14 only for the instruments and airframe systems ratings. Since Reg. (EU) 2023/989, Modules 7,
            11 and 17 are single modules, and the required knowledge level differs by category.
          </p>
        </Block>
      </LicenceProvider>

      <Block id="experience-requirements" title="Experience requirements" eyebrow="66.A.30">
        <DataTable
          head={["Licence", "No relevant technical training", "Skilled-worker technical training", "Part-147 basic course"]}
          bodyClassName="tnum"
          rows={[
            { cells: [mono(<>A &middot; B1.2 &middot; B1.4 &middot; B3</>), "3 years", "2 years", "1 year"] },
            { cells: [mono(<>B1.1 &middot; B1.3 &middot; B2</>), "5 years", "3 years", "2 years"] },
            {
              cells: [
                mono("B2L"),
                "3 years",
                "2 years",
                { content: <>1 year <span className="note">+ 3 months per rating added later</span></> },
              ],
            },
            {
              cells: [
                mono("L"),
                { content: "2 years across the subcategory, or 1 year with a limitation entered on the licence", colSpan: 3 },
              ],
            },
          ]}
        />
        <DataTable
          head={["Category C route", "Experience", "Including"]}
          rows={[
            {
              cells: [
                mono("Complex motor-powered"),
                "3 years exercising B1.1, B1.3 or B2 privileges, or 5 years exercising B1.2, B1.4 or L5 privileges, as support or certifying staff",
                "12 months as base maintenance support staff",
              ],
            },
            {
              cells: [mono("Other aircraft"), "3 years exercising B1, B2, B2L, B3 or L privileges", "6 months as base maintenance support staff"],
            },
            {
              cells: [
                mono("Academic degree"),
                "Relevant technical degree plus 3 years in an aircraft maintenance environment",
                "6 months taking part in base maintenance tasks",
              ],
            },
          ]}
        />
        <ul className="checklist" style={{ maxWidth: "var(--measure)" }}>
          <li>Experience must be practical, gained on operating aircraft, and cover a representative cross-section of tasks.</li>
          <li>At least 1 year must be recent experience on the category sought. Adding a category later needs at least 3 months.</li>
          <li>All experience must fall within the 10 years before the application.</li>
          <li>
            Experience outside Part-145 or Part-CAO organisations can count if the authority judges it equivalent, but
            some experience in an approved organisation is still required.
          </li>
        </ul>
      </Block>

      <Block
        id="aircraft-groups-and-ratings"
        title={<>Aircraft groups &amp; ratings</>}
        eyebrow={<>66.A.5 groups &middot; 66.A.45 endorsement</>}
      >
        <div className="groups">
          {GROUPS.map((g) => (
            <article key={g.name}>
              <h4>{g.name}</h4>
              <p>{g.text}</p>
              <p className="end">{g.end}</p>
            </article>
          ))}
        </div>
        <p className="note">
          For B1 and C, a manufacturer subgroup rating requires qualification on at least two types from one
          manufacturer, and a full subgroup rating on at least three types from different manufacturers (66.A.45(e)).
          Category A needs no aircraft rating on the licence.
        </p>
      </Block>

      <Block id="licence-vs-authorisation" title="Licence vs authorisation" eyebrow="Two documents, two issuers">
        <div className="compare">
          <div>
            <h4>
              <small>PART-66 &middot; ISSUED BY THE AUTHORITY</small>The licence
            </h4>
            <ul className="checklist">
              <li>EASA Form 26, held personally and recognised in all EASA states</li>
              <li>Lists categories, subcategories, aircraft ratings and any limitations</li>
              <li>Becomes invalid 5 years after issue or last change unless submitted to the authority for verification (66.A.40)</li>
              <li>
                Using its privileges requires 6 months of relevant experience in the preceding 2 years, adequate
                competence and command of the maintenance data&rsquo;s language (66.A.20(b))
              </li>
            </ul>
          </div>
          <div>
            <h4>
              <small>PART-145 &middot; ISSUED BY THE ORGANISATION</small>The certification authorisation
            </h4>
            <ul className="checklist">
              <li>Written scope set by the organisation, within your licence and its approval (145.A.35)</li>
              <li>Minimum age 21, with competence assessed, including human factors</li>
              <li>6 months of relevant experience in any 2 consecutive years</li>
              <li>Recurrent training in every 2-year period</li>
              <li>Valid only while you work for that organisation</li>
            </ul>
          </div>
        </div>
      </Block>

      <Block id="from-student-to-signature" title="From student to signature" eyebrow="The typical sequence">
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </Block>
    </Section>
  );
}
