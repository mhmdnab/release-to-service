/**
 * The site map: one entry per route, with the sub-sections ("blocks") each page contains.
 * The rail, the full-screen menu, the pager and the sitemap are all derived from this list,
 * and `BlockId` makes every in-page anchor a compile-time constant.
 */

export interface SectionSub {
  readonly id: string;
  readonly title: string;
}

export interface SectionDef {
  /** Route, e.g. "/part-66". */
  readonly href: string;
  /** Short code shown in navigation, e.g. "66" or "ATA 05". */
  readonly code: string;
  /** Short name shown in navigation. */
  readonly name: string;
  /** Page title and section heading. */
  readonly title: string;
  /** One-line description for the menu, the cover and Open Graph. */
  readonly desc: string;
  /** Big numeral in the section header. Absent on the cover. */
  readonly numeral?: { readonly label: string; readonly value: string };
  readonly subs: readonly SectionSub[];
}

export const SECTIONS = [
  {
    href: "/",
    code: "Intro",
    name: "Cover",
    title: "Release to Service",
    desc: "Introduction, sample release certificate and key figures",
    subs: [
      { id: "sample-crs", title: "Sample release certificate" },
      { id: "key-figures", title: "Data plate: key figures" },
      { id: "contents", title: "Contents" },
    ],
  },
  {
    href: "/system",
    code: "1321",
    name: "The system",
    title: "The system behind the signature",
    desc: "Layers of rules, the annexes, how the Parts connect, timeline",
    numeral: { label: "REG. (EU) No", value: "1321" },
    subs: [
      { id: "three-layers-of-rules", title: "Three layers of rules" },
      { id: "the-annexes", title: "The annexes" },
      { id: "how-the-parts-connect", title: "How the Parts connect" },
      { id: "how-we-got-here", title: "How we got here" },
    ],
  },
  {
    href: "/part-147",
    code: "147",
    name: "Training organisations",
    title: "Training organisations",
    desc: "School requirements, course hours, exams, type training",
    numeral: { label: "ANNEX IV · PART", value: "147" },
    subs: [
      { id: "what-an-approved-mto-needs", title: "What an approved MTO needs" },
      { id: "minimum-basic-course-length", title: "Minimum basic course length" },
      { id: "examinations", title: "Examinations" },
      { id: "type-training-and-ojt", title: "Type training & OJT" },
      { id: "contents-of-part-147", title: "Contents of Part-147" },
    ],
  },
  {
    href: "/part-66",
    code: "66",
    name: "Engineer licensing",
    title: "Engineer licensing",
    desc: "Licence explorer, modules, experience, ratings, pathway",
    numeral: { label: "ANNEX III · PART", value: "66" },
    subs: [
      { id: "licence-explorer", title: "Licence explorer" },
      { id: "levels-of-knowledge", title: "Levels of knowledge" },
      { id: "module-matrix", title: "Module matrix" },
      { id: "experience-requirements", title: "Experience requirements" },
      { id: "aircraft-groups-and-ratings", title: "Aircraft groups & ratings" },
      { id: "licence-vs-authorisation", title: "Licence vs authorisation" },
      { id: "from-student-to-signature", title: "From student to signature" },
    ],
  },
  {
    href: "/part-145",
    code: "145",
    name: "Maintenance organisations",
    title: "Maintenance organisations",
    desc: "Ratings, people, release to service, SMS, oversight",
    numeral: { label: "ANNEX II · PART", value: "145" },
    subs: [
      { id: "classes-and-ratings", title: "Classes & ratings" },
      { id: "line-and-base-maintenance", title: "Line & base maintenance" },
      { id: "people-and-resources", title: "People & resources" },
      { id: "signing-off-the-work", title: "Signing off the work" },
      { id: "management-system", title: "Management system" },
      { id: "oversight-and-findings", title: "Oversight & findings" },
      { id: "contents-of-part-145", title: "Contents of Part-145" },
    ],
  },
  {
    href: "/hangar-floor",
    code: "ATA 05",
    name: "Hangar floor",
    title: "On the hangar floor",
    desc: "Checks, documents, human factors, ATA chapters",
    numeral: { label: "ATA CHAPTER", value: "05" },
    subs: [
      { id: "maintenance-checks", title: "Maintenance checks" },
      { id: "the-paperwork-that-flies", title: "The paperwork that flies" },
      { id: "the-dirty-dozen", title: "The dirty dozen" },
      { id: "ata-chapters", title: "ATA chapters" },
    ],
  },
  {
    href: "/glossary",
    code: "GM",
    name: "Glossary & FAQ",
    title: "Glossary & questions",
    desc: "32 terms and plain answers to common questions",
    numeral: { label: "GUIDANCE MATERIAL", value: "GM" },
    subs: [
      { id: "glossary", title: "Glossary" },
      { id: "frequently-asked", title: "Frequently asked" },
    ],
  },
] as const satisfies readonly SectionDef[];

export type Section = (typeof SECTIONS)[number];
export type SectionHref = Section["href"];
/** Sections that render with a numeral header, i.e. every route except the cover. */
export type PageSection = Extract<Section, { numeral: unknown }>;
/** Every in-page anchor id across the site. */
export type BlockId = Section["subs"][number]["id"];

/** Groups shown in the desktop rail. The cover is reached through the brand link. */
export const RAIL_GROUPS = [
  { label: "Framework", hrefs: ["/system"] },
  { label: "The three Parts", hrefs: ["/part-147", "/part-66", "/part-145"] },
  { label: "Practice", hrefs: ["/hangar-floor", "/glossary"] },
] as const satisfies readonly { label: string; hrefs: readonly SectionHref[] }[];

export function getSection<H extends SectionHref>(href: H): Extract<Section, { href: H }> {
  const s = SECTIONS.find((x) => x.href === href);
  if (!s) throw new Error(`Unknown section ${href}`);
  return s as Extract<Section, { href: H }>;
}

/** Strip a trailing slash so "/system/" and "/system" compare equal. */
export function normalizePath(pathname: string): string {
  const s = pathname.replace(/\/+$/, "");
  return s === "" ? "/" : s;
}

export function sectionForPath(pathname: string): Section {
  const p = normalizePath(pathname);
  return SECTIONS.find((s) => s.href === p) ?? SECTIONS[0];
}

export function neighbours(href: SectionHref): { prev?: Section; next?: Section } {
  const i = SECTIONS.findIndex((s) => s.href === href);
  return { prev: i > 0 ? SECTIONS[i - 1] : undefined, next: i < SECTIONS.length - 1 ? SECTIONS[i + 1] : undefined };
}

/** Id used for the menu's inline sub-list of a section. */
export function sectionSlug(href: SectionHref): string {
  return href === "/" ? "top" : href.slice(1);
}
