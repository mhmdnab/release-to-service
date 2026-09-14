import type { Metadata } from "next";
import { Block } from "@/components/Block";
import { Glossary } from "@/components/Glossary";
import { Section } from "@/components/Section";
import { getSection } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

const section = getSection("/glossary");

export const metadata: Metadata = pageMetadata(
  section.title,
  "Short definitions for the acronyms of European aircraft maintenance, and plain answers to common questions about EASA Part-66 licences.",
  section.href,
);

export default function GlossaryPage() {
  return (
    <Section
      section={section}
      alt
      intro="Short definitions for the acronyms that fill a tech log, and plain answers to the questions people ask most about European licences."
    >
      <Glossary />

      <Block id="frequently-asked" title="Frequently asked" eyebrow="Plain answers">
        <div className="faq">
          <details open>
            <summary>Is my EASA licence valid in every European country?</summary>
            <div className="ans">
              <p>
                It is recognised in all 31 EASA member states: the 27 EU countries plus Iceland, Liechtenstein, Norway
                and Switzerland. Your employer still issues its own certification authorisation, and you must be able
                to work in the language of the maintenance data. Since Brexit, the UK CAA issues its own UK Part-66
                licences, and the two systems no longer recognise each other automatically.
              </p>
            </div>
          </details>
          <details>
            <summary>Do I have to attend a Part-147 school?</summary>
            <div className="ans">
              <p>
                No. You can study on your own and sit the module exams with the competent authority. An approved basic
                course shortens the experience you need, for example from 5 years to 2 for B1.1 or B2.
              </p>
            </div>
          </details>
          <details>
            <summary>Can a B2 engineer release an engine change?</summary>
            <div className="ans">
              <p>
                No. Mechanical work on the powerplant is B1 territory. A B2 covers avionic and electrical systems, plus
                electrical and avionics tasks within powerplant and mechanical systems that need only simple tests to
                prove serviceability.
              </p>
            </div>
          </details>
          <details>
            <summary>What is the difference between B1/B2 and C?</summary>
            <div className="ans">
              <p>
                B1 and B2 engineers certify line maintenance and act as support staff for their tasks in base
                maintenance. A category C engineer issues the release to service after base maintenance, for the
                aircraft in its entirety.
              </p>
            </div>
          </details>
          <details>
            <summary>My module exams are old. Do they still count?</summary>
            <div className="ans">
              <p>
                Each module must have been passed within 10 years before you apply for the licence or add a category.
                Older passes can still be credited by the authority through an examination credit report. Modules
                already used for a licence you hold don&rsquo;t expire.
              </p>
            </div>
          </details>
          <details>
            <summary>Is EASA Part-147 the same as FAA Part 147?</summary>
            <div className="ans">
              <p>
                No, despite the shared number. FAA 14 CFR Part 147 certifies aviation maintenance technician schools
                for the US A&amp;P certificate, and FAA Part 145 covers repair stations. The EU&ndash;US bilateral
                agreement lets each side accept the other&rsquo;s repair stations under special conditions, but the
                licences are not interchangeable.
              </p>
            </div>
          </details>
          <details>
            <summary>How long does it take to certify on an airliner?</summary>
            <div className="ans">
              <p>
                With an approved Part-147 B1.1 or B2 course (at least 2&#8239;400 hours), the legal minimum is 2 years
                of practical experience. Without formal technical training, it is 5 years. After that you still need
                type training, OJT on your first type, and an authorisation from a Part-145 organisation before you
                sign your first CRS.
              </p>
            </div>
          </details>
        </div>
      </Block>
    </Section>
  );
}
