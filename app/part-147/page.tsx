import type { Metadata } from "next";
import { Block } from "@/components/Block";
import { Facts } from "@/components/Facts";
import { Points } from "@/components/Points";
import { ReqGrid } from "@/components/ReqGrid";
import { Section } from "@/components/Section";
import { COURSE_HOURS, MATRIX_COLS, MAX_COURSE_HOURS, formatHours, theoryLabel } from "@/lib/licence";
import { getSection } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

const section = getSection("/part-147");

export const metadata: Metadata = pageMetadata(
  section.title,
  "Part-147 maintenance training organisations: what an approved MTO needs, minimum basic course hours, examinations, type training and OJT.",
  section.href,
);

/** Percentage of the chart width for a number of course hours, e.g. 800 → "33.333%". */
function pct(hours: number): string {
  return `${Number(((hours / MAX_COURSE_HOURS) * 100).toFixed(3))}%`;
}

export default function Part147Page() {
  return (
    <Section
      section={section}
      alt
      intro="Part-147 approves the schools. A maintenance training organisation (MTO) can run approved basic training courses, aircraft type or task training, and the examinations that count towards a Part-66 licence."
    >
      <Block
        id="what-an-approved-mto-needs"
        title="What an approved MTO needs"
        eyebrow={<>Subpart B &middot; organisational requirements</>}
      >
        <ReqGrid
          items={[
            {
              ref: "147.A.105",
              title: <>Accountable manager &amp; compliance</>,
              text: "An accountable manager with corporate authority to finance every training commitment, and nominated person(s) responsible for compliance with Part-147.",
            },
            {
              ref: "147.A.105",
              title: "Instructors, examiners, assessors",
              text: "Enough staff to deliver training, knowledge exams and practical assessments. One person may hold several roles. Instructors and examiners get updating training at least every 24 months.",
            },
            {
              ref: "147.A.100",
              title: "Facilities",
              text: "Enclosed classrooms separate from other facilities, workshops for practical training, no more than 15 students per instructor or assessor in practical work, a technical library and secure record storage.",
            },
            {
              ref: "147.A.115 / .120",
              title: <>Equipment &amp; material</>,
              text: "Instructional equipment, access to examples of the aircraft type for type courses, and training material that covers the Part-66 syllabus at the right knowledge level.",
            },
            {
              ref: "147.A.125 / .130",
              title: <>Records &amp; quality</>,
              text: "Training, exam and assessment records are kept for an unlimited period. Training procedures and a quality system monitor standards and compliance.",
            },
            {
              ref: "147.A.140",
              title: "The exposition (MTOE)",
              text: "This document describes the organisation, its courses, staff and procedures, and the authority audits against it. The approval certificate is EASA Form 11.",
            },
          ]}
        />
      </Block>

      <Block id="minimum-basic-course-length" title="Minimum basic course length" eyebrow="Part-147 Appendix I">
        <p className="prose">
          Each approved basic course has a minimum total length, of which a set share must be theory. The rest is
          hands-on practical training. The bars share one scale from 0 to 2&#8239;400 hours.
        </p>
        <div className="bars" role="img" aria-label="Bar chart of minimum Part-147 basic course hours by licence category">
          {MATRIX_COLS.map((c) => {
            const course = COURSE_HOURS[c];
            const theoryMin = course.hours * course.theory[0];
            const theoryRange = course.hours * (course.theory[1] - course.theory[0]);
            return (
              <div className="bar-row" key={c}>
                <span className="cat">{c}</span>
                <div className="bar">
                  <i className="tot" style={{ width: pct(course.hours) }} />
                  <i className="th" style={{ width: pct(theoryMin) }} />
                  <i className="rng" style={{ left: pct(theoryMin), width: pct(theoryRange) }} />
                  {course.extra && (
                    <i className="ext" style={{ left: pct(course.hours), width: pct(course.extra.hours) }} />
                  )}
                </div>
                <span className="val">
                  {formatHours(course.hours)}
                  <small>{course.extra ? course.extra.label : `theory ${theoryLabel(course)}`}</small>
                </span>
              </div>
            );
          })}
          <div className="axis">
            <span />
            <div className="ticks">
              <span style={{ left: 0 }}>0</span>
              <span style={{ left: "25%" }}>600</span>
              <span style={{ left: "50%" }}>1&#8239;200</span>
              <span style={{ left: "75%" }}>1&#8239;800</span>
              <span style={{ left: "100%" }}>2&#8239;400 h</span>
            </div>
            <span />
          </div>
        </div>
        <div className="legend">
          <span>
            <i className="k-th" />
            Minimum theory share
          </span>
          <span>
            <i className="k-rng" />
            Theory range
          </span>
          <span>
            <i className="k-pr" />
            Practical training
          </span>
          <span>
            <i className="k-ext" />
            B2L system ratings: com/nav 90 h, instruments 55 h, autoflight 80 h, surveillance 40 h, airframe 100 h
          </span>
        </div>
      </Block>

      <Block id="examinations" title="Examinations" eyebrow={<>Standard: Part-66 Appendix II &middot; 147.A.135</>}>
        <Facts
          items={[
            { big: "3", text: "answer options on each multiple-choice question", em: "MCQ format" },
            { big: "75 s", text: "nominal time allowed per multiple-choice question", em: "Timing" },
            { big: "75%", text: "pass mark for every module exam and essay", em: "Pass mark" },
            { big: "2", text: "essay questions, in Module 7 only, 20 minutes each", em: "Categories A, B1, B2, B2L, B3" },
            { big: "90 d", text: "wait before a re-sit, or 30 days after retraining at a Part-147 organisation", em: "Failed module" },
            { big: "3", text: "attempts allowed per module exam in any 12 months", em: "Attempt limit" },
            { big: "10 yr", text: "limit: a module must be passed within 10 years before the licence application", em: "66.A.25(c)" },
            { big: "148a", text: "certificate for basic training and exams, issued by the MTO (148b when issued by the authority)", em: "Type courses: 149a / 149b" },
          ]}
        />
        <p className="note">
          Basic knowledge exams are held by a Part-147 organisation or by the competent authority. For category L,
          another organisation agreed with the authority may also hold them (66.A.25(b)).
        </p>
      </Block>

      <Block
        id="type-training-and-ojt"
        title={<>Type training &amp; OJT</>}
        eyebrow={<>Subpart D &middot; Part-66 Appendix III</>}
      >
        <div className="grid-2">
          <div className="levels" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
            <div>
              <b>
                <small>Level</small>1
              </b>
              <p>
                Brief overview of the airframe, systems and powerplant, as in the systems description section of the
                maintenance manual.
              </p>
            </div>
            <div style={{ paddingLeft: 0, borderLeft: 0 }}>
              <b>
                <small>Level</small>2
              </b>
              <p>
                Basic system overview: controls, indicators and principal components with their location and purpose,
                plus servicing and minor troubleshooting.
              </p>
            </div>
            <div style={{ paddingLeft: 0, borderLeft: 0 }}>
              <b>
                <small>Level</small>3
              </b>
              <p>
                Detailed description, operation, component location, removal and installation, BITE and
                troubleshooting to maintenance-manual level.
              </p>
            </div>
          </div>
          <div className="prose">
            <p>
              Type courses (147.A.300) have <strong>theoretical and practical elements</strong> and end with a{" "}
              <strong>type evaluation</strong> (147.A.305). The Appendix III syllabus sets a training level for each
              ATA chapter and licence category. Task training for category A covers specific tasks instead of a whole
              type.
            </p>
            <p>
              <strong>On-the-job training (OJT)</strong> is required for the{" "}
              <strong>first type rating in each licence category or subcategory</strong> (not for C):
            </p>
            <ul className="checklist">
              <li>Completed within the 3 years before applying for the rating</li>
              <li>At least half of the tasks done after the theoretical type training</li>
              <li>Ends with a final assessment lasting at least one working day</li>
              <li>No fixed minimum duration: the task list sets the length</li>
            </ul>
            <p>
              For Group 2 and 3 aircraft, a type rating can also be endorsed after a type evaluation plus demonstrated
              practical experience on the type (66.A.45(d)).
            </p>
          </div>
        </div>
      </Block>

      <Block id="contents-of-part-147" title="Contents of Part-147" eyebrow={<>Section A &middot; organisation requirements</>}>
        <Points
          groups={[
            {
              heading: "Subpart A · General",
              items: [
                { ref: "147.A.05", label: "Scope" },
                { ref: "147.A.10", label: "General" },
                { ref: "147.A.15", label: "Application" },
              ],
            },
            {
              heading: "Subpart B · Organisational requirements",
              items: [
                { ref: "147.A.100", label: "Facility requirements" },
                { ref: "147.A.105", label: "Personnel requirements" },
                { ref: "147.A.110", label: "Records of instructors, examiners and assessors" },
                { ref: "147.A.115", label: "Instructional equipment" },
                { ref: "147.A.120", label: "Maintenance training material" },
                { ref: "147.A.125", label: "Records" },
                { ref: "147.A.130", label: "Training procedures and quality system" },
                { ref: "147.A.135", label: "Examinations" },
                { ref: "147.A.140", label: "Maintenance training organisation exposition" },
                { ref: "147.A.145", label: "Privileges of the maintenance training organisation" },
                { ref: "147.A.150", label: "Changes to the maintenance training organisation" },
                { ref: "147.A.155", label: "Continued validity" },
                { ref: "147.A.160", label: "Findings" },
              ],
            },
            {
              heading: "Subpart C · Approved basic training",
              items: [
                { ref: "147.A.200", label: "The approved basic training course" },
                { ref: "147.A.205", label: "Basic knowledge examinations" },
                { ref: "147.A.210", label: "Basic practical assessment" },
              ],
            },
            {
              heading: "Subpart D · Aircraft type/task training",
              items: [
                { ref: "147.A.300", label: "Aircraft type/task training" },
                { ref: "147.A.305", label: "Aircraft type evaluation and task assessment" },
              ],
            },
          ]}
        />
      </Block>
    </Section>
  );
}
