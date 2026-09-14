/** Part-66 licence data behind the explorer, the module matrix and the Part-147 course-hours chart. */

/** Narrow no-break space, used as the thousands separator (2 400 h). */
export const NNBSP = " ";

export interface ModuleInfo {
  readonly n: number;
  readonly name: string;
  readonly short: string;
}

export const MODULES: readonly ModuleInfo[] = [
  { n: 1, name: "Mathematics", short: "Maths" },
  { n: 2, name: "Physics", short: "Physics" },
  { n: 3, name: "Electrical fundamentals", short: "Electrical" },
  { n: 4, name: "Electronics fundamentals", short: "Electronics" },
  { n: 5, name: "Digital techniques / electronic instrument systems", short: "Digital" },
  { n: 6, name: "Materials and hardware", short: "Materials" },
  { n: 7, name: "Maintenance practices", short: "Practices" },
  { n: 8, name: "Basic aerodynamics", short: "Aero" },
  { n: 9, name: "Human factors", short: "Human factors" },
  { n: 10, name: "Aviation legislation", short: "Legislation" },
  { n: 11, name: "Aeroplane aerodynamics, structures and systems", short: "Aeroplane" },
  { n: 12, name: "Helicopter aerodynamics, structures and systems", short: "Helicopter" },
  { n: 13, name: "Aircraft aerodynamics, structures and systems", short: "Aircraft systems" },
  { n: 14, name: "Propulsion", short: "Propulsion" },
  { n: 15, name: "Gas turbine engine", short: "Gas turbine" },
  { n: 16, name: "Piston engine", short: "Piston" },
  { n: 17, name: "Propeller", short: "Propeller" },
];

/** Columns of the module matrix: every licence (sub)category that has its own module set. */
export const MATRIX_COLS = ["A1", "A2", "A3", "A4", "B1.1", "B1.2", "B1.3", "B1.4", "B2", "B2L", "B3"] as const;
export type MatrixCol = (typeof MATRIX_COLS)[number];

export function isMatrixCol(value: string): value is MatrixCol {
  return (MATRIX_COLS as readonly string[]).includes(value);
}

const CORE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const A_CORE = [1, 2, 3, 5, 6, 7, 8, 9, 10] as const;

export const MODULE_SETS: Record<MatrixCol, readonly number[]> = {
  A1: [...A_CORE, 11, 15, 17],
  A2: [...A_CORE, 11, 16, 17],
  A3: [...A_CORE, 12, 15],
  A4: [...A_CORE, 12, 16],
  "B1.1": [...CORE, 11, 15, 17],
  "B1.2": [...CORE, 11, 16, 17],
  "B1.3": [...CORE, 12, 15],
  "B1.4": [...CORE, 12, 16],
  B2: [...CORE, 13, 14],
  B2L: [...CORE],
  B3: [...CORE, 11, 16, 17],
};

/** Modules that are only partly required (examined by submodule or per rating). */
export const PARTLY_REQUIRED: Partial<Record<MatrixCol, readonly number[]>> = { B2L: [13, 14] };

export interface CourseHours {
  readonly hours: number;
  /** Minimum and maximum share of theory, as fractions. */
  readonly theory: readonly [number, number];
  /** Extra hours on top of the course, e.g. B2L system ratings. */
  readonly extra?: { readonly hours: number; readonly label: string };
}

export const MAX_COURSE_HOURS = 2400;

const A_THEORY = [0.3, 0.35] as const;
const B_THEORY = [0.5, 0.6] as const;

export const COURSE_HOURS: Record<MatrixCol, CourseHours> = {
  A1: { hours: 800, theory: A_THEORY },
  A2: { hours: 650, theory: A_THEORY },
  A3: { hours: 800, theory: A_THEORY },
  A4: { hours: 800, theory: A_THEORY },
  "B1.1": { hours: 2400, theory: B_THEORY },
  "B1.2": { hours: 2000, theory: B_THEORY },
  "B1.3": { hours: 2400, theory: B_THEORY },
  "B1.4": { hours: 2400, theory: B_THEORY },
  B2: { hours: 2400, theory: B_THEORY },
  B2L: { hours: 1500, theory: B_THEORY, extra: { hours: 365, label: "+ up to 365 h ratings" } },
  B3: { hours: 1000, theory: B_THEORY },
};

export function theoryLabel(course: CourseHours): string {
  return `${Math.round(course.theory[0] * 100)}–${Math.round(course.theory[1] * 100)}%`;
}

export function formatHours(hours: number): string {
  const n = hours >= 1000 ? String(hours).replace(/\B(?=(\d{3})+$)/, NNBSP) : String(hours);
  return `${n} h`;
}

export function formatYears(years: number): string {
  return years === 1 ? "1 yr" : `${years} yrs`;
}

export const CATEGORIES = ["A", "B1", "B2", "B2L", "B3", "L", "C"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ExperienceRoute {
  readonly label: string;
  readonly years: number;
}

export interface CategoryInfo {
  readonly role: string;
  /** Whether the sub-entries are selectable subcategories with their own module sets. */
  readonly selectable: boolean;
  readonly defaultSub: string;
  readonly subsLabel: string;
  readonly subs: readonly { readonly code: string; readonly desc: string }[];
  readonly privileges: readonly string[];
  readonly experience: (sub: string) => ExperienceRoute[];
  readonly experienceNote?: string;
  readonly hoursNote?: string;
  readonly modulesNote?: string;
  readonly rating: string;
}

const ROUTE_LABELS = [
  "No relevant technical training",
  "Skilled-worker training in a technical trade",
  "Part-147 approved basic course",
] as const;

function three(a: number, b: number, c: number): ExperienceRoute[] {
  return [
    { label: ROUTE_LABELS[0], years: a },
    { label: ROUTE_LABELS[1], years: b },
    { label: ROUTE_LABELS[2], years: c },
  ];
}

export const STANDARD_EXPERIENCE_NOTE =
  "All experience must fall within the last 10 years, with at least 1 year of recent experience on the category sought.";

export const DEFAULT_HOURS_NOTE = "Completing an approved course reduces the experience you need, as shown above.";

export const CATEGORY_INFO: Record<Category, CategoryInfo> = {
  A: {
    role: "Line maintenance certifying mechanic",
    selectable: true,
    defaultSub: "A1",
    subsLabel: "Subcategories",
    subs: [
      { code: "A1", desc: "Aeroplanes, turbine" },
      { code: "A2", desc: "Aeroplanes, piston" },
      { code: "A3", desc: "Helicopters, turbine" },
      { code: "A4", desc: "Helicopters, piston" },
    ],
    privileges: [
      "Issue a CRS after minor scheduled line maintenance and simple defect rectification",
      "Only for tasks specifically endorsed on the certification authorisation (145.A.35)",
      "Only for work you personally performed in the organisation that issued it",
    ],
    experience: () => three(3, 2, 1),
    rating: "No aircraft rating on the licence. Category A certifies after task training on the aircraft, under 145.A.35.",
  },
  B1: {
    role: "Maintenance certifying technician: mechanical",
    selectable: true,
    defaultSub: "B1.1",
    subsLabel: "Subcategories",
    subs: [
      { code: "B1.1", desc: "Aeroplanes, turbine" },
      { code: "B1.2", desc: "Aeroplanes, piston" },
      { code: "B1.3", desc: "Helicopters, turbine" },
      { code: "B1.4", desc: "Helicopters, piston" },
    ],
    privileges: [
      "CRS and B1 support staff for aircraft structure, powerplant, and mechanical and electrical systems",
      "Avionic work needing only simple tests to prove serviceability, with no troubleshooting",
      "Includes the corresponding A subcategory",
    ],
    experience: (sub) => (sub === "B1.1" || sub === "B1.3" ? three(5, 3, 2) : three(3, 2, 1)),
    rating:
      "Aircraft ratings: type rating for Group 1; type, manufacturer subgroup or full subgroup for Group 2; type or full group for Group 3.",
  },
  B2: {
    role: "Maintenance certifying technician: avionics",
    selectable: false,
    defaultSub: "B2",
    subsLabel: "Scope",
    subs: [{ code: "B2", desc: "Aeroplanes and helicopters" }],
    privileges: [
      "CRS and B2 support staff for avionic and electrical systems",
      "Electrical and avionics tasks within powerplant and mechanical systems needing only simple tests",
      "CRS for minor scheduled line maintenance and simple defect rectification endorsed on the authorisation",
      "Does not include any A subcategory",
    ],
    experience: () => three(5, 3, 2),
    rating: "Aircraft ratings as for B1, plus the full group rating for Group 4.",
  },
  B2L: {
    role: "Avionics licence for aircraft outside Group 1",
    selectable: false,
    defaultSub: "B2L",
    subsLabel: "System ratings",
    subs: [
      { code: "Com/Nav", desc: "system rating" },
      { code: "Instruments", desc: "system rating" },
      { code: "Autoflight", desc: "system rating" },
      { code: "Surveillance", desc: "system rating" },
      { code: "Airframe systems", desc: "system rating" },
    ],
    privileges: [
      "CRS and B2L support staff for electrical systems",
      "Avionics maintenance within the system ratings endorsed on the licence",
      "With the airframe systems rating: electrical and avionics tasks within powerplant and mechanical systems needing only simple tests",
    ],
    experience: () => three(3, 2, 1),
    experienceNote:
      "Experience must cover the system ratings sought, and each rating added later needs 3 months of relevant experience.",
    hoursNote: "Plus hours per system rating: com/nav 90, instruments 55, autoflight 80, surveillance 40, airframe systems 100.",
    modulesNote:
      "Module 13 is examined by submodule for each system rating. Module 14 applies only to the instruments and airframe systems ratings.",
    rating: "Aircraft ratings: manufacturer subgroup or full subgroup for Group 2, and full group for Groups 3 and 4.",
  },
  B3: {
    role: `Certifying technician: piston-engine non-pressurised aeroplanes of 2${NNBSP}000 kg MTOM and below`,
    selectable: false,
    defaultSub: "B3",
    subsLabel: "Scope",
    subs: [{ code: "B3", desc: `Piston, non-pressurised, ≤ 2${NNBSP}000 kg` }],
    privileges: [
      "CRS and B3 support staff for aeroplane structure, powerplant, and mechanical and electrical systems",
      "Avionics work needing only simple tests, with no troubleshooting",
    ],
    experience: () => three(3, 2, 1),
    rating: `A single rating: ‘piston-engine non-pressurised aeroplanes of 2${NNBSP}000 kg MTOM and below’.`,
  },
  L: {
    role: "Light aircraft: sailplanes, ELA1 aeroplanes, balloons and airships",
    selectable: false,
    defaultSub: "L",
    subsLabel: "Subcategories",
    subs: [
      { code: "L1C", desc: "Composite sailplanes" },
      { code: "L1", desc: "Sailplanes" },
      { code: "L2C", desc: "Composite powered sailplanes & ELA1 aeroplanes" },
      { code: "L2", desc: "Powered sailplanes & ELA1 aeroplanes" },
      { code: "L3H", desc: "Hot-air balloons" },
      { code: "L3G", desc: "Gas balloons" },
      { code: "L4H", desc: "Hot-air airships" },
      { code: "L4G", desc: "ELA2 gas airships" },
      { code: "L5", desc: "Gas airships other than ELA2" },
    ],
    privileges: [
      "CRS and L support staff for structure, powerplant, and mechanical and electrical systems",
      "Work on radio, ELT and transponder systems",
      "Other avionics work needing only simple tests",
      "L2 includes L1, and L2C includes L1C",
    ],
    experience: () => [
      { label: "Practical experience across the subcategory", years: 2 },
      { label: "With a limitation entered on the licence", years: 1 },
    ],
    experienceNote: "Experience must cover a representative cross-section of maintenance on the subcategory.",
    hoursNote:
      "Category L follows the Part-66 Appendix VII syllabus. Its exams may also be held by an organisation agreed with the authority.",
    modulesNote:
      "Category L has its own syllabus (Part-66 Appendix VII) and exam standard (Appendix VIII) instead of modules 1–17.",
    rating: "Each subcategory carries its own rating, such as ‘hot-air balloons’. L5 needs an airship type rating.",
  },
  C: {
    role: "Base maintenance certifying engineer",
    selectable: false,
    defaultSub: "C",
    subsLabel: "Scope",
    subs: [
      { code: "CMPA", desc: "Complex motor-powered aircraft" },
      { code: "Other", desc: "Other than CMPA" },
    ],
    privileges: [
      "CRS after base maintenance, for the aircraft in its entirety",
      "A C licence for complex motor-powered aircraft also covers other aircraft",
    ],
    experience: () => [
      { label: "CMPA, after B1.1, B1.3 or B2 privileges", years: 3 },
      { label: "CMPA, after B1.2, B1.4 or L5 privileges", years: 5 },
      { label: "Other aircraft, after B1, B2, B2L, B3 or L privileges", years: 3 },
      { label: "Academic route: relevant technical degree", years: 3 },
    ],
    experienceNote:
      "CMPA routes include 12 months as base maintenance support staff, and the other-aircraft route includes 6 months. The degree route includes 6 months taking part in base maintenance tasks.",
    hoursNote: "Part-147 sets no basic course length for category C.",
    modulesNote:
      "Category C has no module set of its own. Knowledge comes from a B1, B2, B2L, B3 or L licence, or through the academic-degree route.",
    rating:
      "Type ratings as for B1 and B2. OJT is not required. Degree-route engineers take their first type evaluation at B1 or B2 level.",
  },
};

/** The module-matrix column that a category/subcategory selection maps to, if any. */
export function moduleKey(cat: Category, sub: string): MatrixCol | null {
  const info = CATEGORY_INFO[cat];
  const key = info.selectable ? sub : cat;
  return isMatrixCol(key) ? key : null;
}
