import type { Metadata } from "next";
import { Block } from "@/components/Block";
import { Facts } from "@/components/Facts";
import { Points } from "@/components/Points";
import { ReqGrid } from "@/components/ReqGrid";
import { Section } from "@/components/Section";
import { getSection } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

const section = getSection("/part-145");

export const metadata: Metadata = pageMetadata(
  section.title,
  "Part-145 maintenance organisation approvals: classes and ratings, line and base maintenance, certifying staff, release to service, the management system and oversight.",
  section.href,
);

const C_RATINGS = [
  ["C1", "Air conditioning & pressurisation"],
  ["C2", "Auto flight"],
  ["C3", "Communications & navigation"],
  ["C4", "Doors & hatches"],
  ["C5", "Electrical power & lights"],
  ["C6", "Equipment"],
  ["C7", "Engine & APU"],
  ["C8", "Flight controls"],
  ["C9", "Fuel"],
  ["C10", "Helicopter rotors"],
  ["C11", "Helicopter transmissions"],
  ["C12", "Hydraulic power"],
  ["C13", "Indicating & recording systems"],
  ["C14", "Landing gear"],
  ["C15", "Oxygen"],
  ["C16", "Propellers"],
  ["C17", "Pneumatic & vacuum"],
  ["C18", "Ice, rain & fire protection"],
  ["C19", "Windows"],
  ["C20", "Structural"],
  ["C21", "Water ballast"],
  ["C22", "Propulsion augmentation"],
] as const;

export default function Part145Page() {
  return (
    <Section
      section={section}
      alt
      intro="Part-145 approves the organisations that maintain complex motor-powered aircraft, aircraft used by licensed air carriers, and their components. The approval, EASA Form 3-145, has no expiry date. It stays valid while the organisation keeps complying and gives the authority access."
    >
      <Block id="classes-and-ratings" title={<>Classes &amp; ratings</>} eyebrow="Appendix II to Annex II">
        <div className="ratings">
          <div className="stack">
            <div className="cls">
              <header>
                <b>A</b>
                <span>Aircraft</span>
                <em>base and/or line</em>
              </header>
              <ul>
                <li><code>A1</code><span>Aeroplanes above 5&#8239;700 kg</span></li>
                <li><code>A2</code><span>Aeroplanes 5&#8239;700 kg and below</span></li>
                <li><code>A3</code><span>Helicopters</span></li>
                <li><code>A4</code><span>Aircraft other than A1, A2 and A3</span></li>
              </ul>
            </div>
            <div className="cls">
              <header>
                <b>B</b>
                <span>Engines</span>
                <em>complete units</em>
              </header>
              <ul>
                <li><code>B1</code><span>Turbine</span></li>
                <li><code>B2</code><span>Piston</span></li>
                <li><code>B3</code><span>APU</span></li>
              </ul>
            </div>
            <div className="cls">
              <header>
                <b>D</b>
                <span>Specialised services</span>
              </header>
              <ul>
                <li><code>D1</code><span>Non-destructive testing</span></li>
              </ul>
            </div>
          </div>
          <div className="cls wide">
            <header>
              <b>C</b>
              <span>Components</span>
              <em>other than complete engines or APUs</em>
            </header>
            <ul>
              {C_RATINGS.map(([code, label]) => (
                <li key={code}>
                  <code>{code}</code>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="note">
          The exact scope of work, down to part numbers or aircraft types, is listed in the organisation&rsquo;s
          exposition or capability list.
        </p>
      </Block>

      <Block id="line-and-base-maintenance" title={<>Line &amp; base maintenance</>} eyebrow="Every A rating is limited to one or both">
        <div className="compare">
          <div>
            <h4>
              <small>BEFORE FLIGHT</small>Line maintenance
            </h4>
            <p>
              Maintenance done before flight to make sure the aircraft is fit for the intended flight. It covers
              troubleshooting, defect rectification, component replacement (with external test equipment if needed),
              and scheduled checks with visual inspections that catch obvious problems without extensive in-depth
              inspection.
            </p>
            <p>Certified by B1, B2, B2L, B3 or L staff within their privileges, or by category A for endorsed tasks.</p>
          </div>
          <div>
            <h4>
              <small>IN THE HANGAR</small>Base maintenance
            </h4>
            <p>
              Anything beyond line maintenance: heavy checks, detailed structural inspections, major modifications and
              repairs, usually with the aircraft out of service for days or weeks.
            </p>
            <p>
              For large aircraft, a category C engineer issues the release for the aircraft as a whole. B1 and B2{" "}
              <strong>support staff</strong> first confirm that the tasks in their specialty were properly completed.
            </p>
          </div>
        </div>
      </Block>

      <Block id="people-and-resources" title={<>People &amp; resources</>} eyebrow={<>145.A.25 &ndash; 145.A.45</>}>
        <ReqGrid
          items={[
            {
              ref: "145.A.30(a)",
              title: "Accountable manager",
              text: "Has corporate authority to fund and carry out all maintenance to the required standard, and sets and promotes the safety policy.",
            },
            {
              ref: "145.A.30(b)–(cb)",
              title: "Nominated persons",
              text: "Lead maintenance, compliance monitoring and safety management, with direct access to the accountable manager.",
            },
            {
              ref: "145.A.30(d)",
              title: "Man-hour plan",
              text: "Ensures enough qualified staff to plan, perform, supervise, inspect and monitor the work, with a procedure to reassess work when staffing drops below plan.",
            },
            {
              ref: "145.A.35",
              title: <>Certifying &amp; support staff</>,
              text: "Assessed, authorised in writing, at least 21 years old, with 6 months of relevant experience in any 2 consecutive years and recurrent training every 2 years.",
            },
            {
              ref: "145.A.25 / .40",
              title: <>Facilities &amp; tools</>,
              text: "Hangars for base maintenance, protected workshops, and segregated storage for serviceable and unserviceable parts. Tools and equipment are calibrated to an officially recognised standard.",
            },
            {
              ref: "145.A.42 / .45",
              title: <>Components &amp; data</>,
              text: "Parts are accepted only with the right release, such as EASA Form 1, and properly classified. Work follows current maintenance data: ADs, instructions for continued airworthiness and approved repair data.",
            },
          ]}
        />
      </Block>

      <Block
        id="signing-off-the-work"
        title="Signing off the work"
        eyebrow={<>145.A.48 &middot; 145.A.50 &middot; 145.A.55 &middot; 145.A.60</>}
      >
        <div className="grid-2">
          <div className="prose">
            <p>
              A <strong>certificate of release to service</strong> is issued before flight when maintenance is
              complete. Authorised certifying staff sign it on behalf of the organisation after verifying that all
              ordered maintenance was properly done to the exposition&rsquo;s procedures and the maintenance data, with
              no known non-compliance that endangers flight safety.
            </p>
            <p>
              A component maintained off the aircraft is released on <strong>EASA Form 1</strong>, the authorised
              release certificate. New defects or incomplete work orders go back to whoever manages the
              aircraft&rsquo;s continuing airworthiness for agreement.
            </p>
            <p>
              After any <strong>critical maintenance task</strong>, the organisation must apply error-capturing methods
              such as an independent inspection (145.A.48).
            </p>
          </div>
          <Facts
            style={{ alignSelf: "start" }}
            items={[
              { big: "3 yr", text: "retention of maintenance records from the date of release", em: "145.A.55" },
              { big: "5 yr", text: "retention of management system records", em: "145.A.55" },
              { big: "72 h", text: "deadline to report an occurrence under Reg. (EU) 376/2014", em: "145.A.60" },
              { big: "21", text: "minimum age for certifying staff and support staff", em: "145.A.35" },
            ]}
          />
        </div>
      </Block>

      <Block id="management-system" title="Management system" eyebrow={<>145.A.200 &middot; 145.A.200A &middot; 145.A.202</>}>
        <div className="grid-2">
          <div className="prose">
            <p>
              Since <strong>2 December 2022</strong> (Reg. (EU) 2021/1963), every Part-145 organisation must run a
              management system. It combines a safety policy and objectives, hazard identification and safety risk
              management, an internal safety reporting scheme that protects reporters, compliance monitoring, and
              safety training and communication.
            </p>
            <p>
              From <strong>22 February 2026</strong>, Part-IS adds an{" "}
              <strong>information security management system</strong> (145.A.200A). It covers cyber and information
              risks that could affect aviation safety.
            </p>
          </div>
          <div className="prose">
            <p>
              The <strong>Maintenance Organisation Exposition</strong> (145.A.70) is the organisation&rsquo;s rulebook.
              It includes the accountable manager&rsquo;s statement and safety policy, nominated persons and the
              organisation chart, certifying staff, man-hour resources, facilities and scope of work, the procedure for
              notifying changes, and all maintenance and management system procedures. The authority audits against
              it.
            </p>
          </div>
        </div>
      </Block>

      <Block id="oversight-and-findings" title={<>Oversight &amp; findings</>} eyebrow={<>Section B &middot; 145.B.305 &middot; 145.B.350</>}>
        <div className="sev">
          <article className="crit">
            <span className="pill crit">Level 1 finding</span>
            <p>
              A significant non-compliance that lowers safety or seriously hazards flight safety. The authority acts
              immediately to limit, suspend or revoke the approval.
            </p>
          </article>
          <article>
            <span className="pill">Level 2 finding</span>
            <p>
              Any other non-compliance. The organisation gets a corrective action period of up to 3 months at first,
              which can be extended if a corrective action plan is agreed.
            </p>
          </article>
          <article>
            <span className="pill ok">Oversight cycle</span>
            <b className="big tnum">24 mo</b>
            <p>
              Standard audit planning cycle. It can be extended to 36 months if set conditions are met, or 48 months
              with continuous reporting to the authority.
            </p>
          </article>
        </div>
      </Block>

      <Block
        id="contents-of-part-145"
        title="Contents of Part-145"
        eyebrow={<>Section A &middot; after Reg. (EU) 2021/1963 and 2023/203</>}
      >
        <Points
          groups={[
            {
              heading: "Approval & resources",
              items: [
                { ref: "145.A.10", label: "Scope" },
                { ref: "145.A.15", label: "Application for an organisation certificate" },
                { ref: "145.A.20", label: "Terms of approval and scope of work" },
                { ref: "145.A.25", label: "Facility requirements" },
                { ref: "145.A.30", label: "Personnel requirements" },
                { ref: "145.A.35", label: "Certifying staff and support staff" },
                { ref: "145.A.37", label: "Airworthiness review staff" },
                { ref: "145.A.40", label: "Equipment and tools" },
                { ref: "145.A.42", label: "Components" },
                { ref: "145.A.45", label: "Maintenance data" },
              ],
            },
            {
              heading: "Doing the work",
              items: [
                { ref: "145.A.47", label: "Production planning" },
                { ref: "145.A.48", label: "Performance of maintenance" },
                { ref: "145.A.50", label: "Certification of maintenance" },
                { ref: "145.A.55", label: "Record-keeping" },
                { ref: "145.A.60", label: "Occurrence reporting" },
                { ref: "145.A.65", label: "Maintenance procedures" },
              ],
            },
            {
              heading: "Exposition, privileges & changes",
              items: [
                { ref: "145.A.70", label: "Maintenance organisation exposition (MOE)" },
                { ref: "145.A.75", label: "Privileges of the organisation" },
                { ref: "145.A.85", label: "Changes to the organisation" },
                { ref: "145.A.90", label: "Continued validity" },
                { ref: "145.A.95", label: "Findings and observations" },
                { ref: "145.A.120", label: "Means of compliance" },
                { ref: "145.A.140", label: "Access" },
                { ref: "145.A.155", label: "Immediate reaction to a safety problem" },
              ],
            },
            {
              heading: "Management system",
              items: [
                { ref: "145.A.200", label: "Management system", flag: "SMS" },
                { ref: "145.A.200A", label: "Information security management system", flag: "Part-IS" },
                { ref: "145.A.202", label: "Internal safety reporting scheme", flag: "SMS" },
                { ref: "145.A.205", label: "Contracting and subcontracting" },
              ],
            },
          ]}
        />
      </Block>
    </Section>
  );
}
