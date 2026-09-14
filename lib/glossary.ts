export interface GlossaryEntry {
  readonly term: string;
  readonly def: string;
}

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "AD", def: "Airworthiness Directive: a mandatory action to restore an acceptable level of safety." },
  { term: "AMC", def: "Acceptable Means of Compliance: EASA’s non-binding, accepted way to meet a rule." },
  { term: "AML", def: "Aircraft Maintenance Licence issued under Part-66 on EASA Form 26." },
  { term: "AMP", def: "Aircraft Maintenance Programme: the approved list of tasks and intervals for an aircraft." },
  { term: "ARC", def: "Airworthiness Review Certificate, issued after an airworthiness review and normally valid for one year." },
  { term: "Base maintenance", def: "Maintenance beyond line level, usually in a hangar with the aircraft out of service." },
  { term: "CAMO", def: "Continuing Airworthiness Management Organisation, approved under Part-CAMO." },
  { term: "CAO", def: "Combined Airworthiness Organisation for lighter aircraft, approved under Part-CAO." },
  { term: "CDCCL", def: "Critical Design Configuration Control Limitation: a fuel-tank safety feature that maintenance must preserve." },
  { term: "Certification authorisation", def: "The organisation-issued scope that lets licensed staff sign on its behalf." },
  { term: "CMPA", def: "Complex motor-powered aircraft, e.g. aeroplanes above 5 700 kg MTOM, with more than 19 seats, two-pilot crew, turbojets or more than one turboprop." },
  { term: "Competent authority", def: "The national aviation authority, or EASA for organisations outside the EASA states, that approves and oversees." },
  { term: "CRS", def: "Certificate of Release to Service, issued after maintenance and before flight." },
  { term: "EASA Form 1", def: "Authorised Release Certificate for a component." },
  { term: "EWIS", def: "Electrical Wiring Interconnection System: the wiring, connectors and supports on an aircraft." },
  { term: "GM", def: "Guidance Material: explains the meaning of a rule or its AMC." },
  { term: "HF", def: "Human factors: Module 9 and a recurring training subject for all staff." },
  { term: "ICA", def: "Instructions for Continued Airworthiness, from the design approval holder." },
  { term: "Line maintenance", def: "Maintenance before flight to make sure the aircraft is fit for the intended flight." },
  { term: "MEL / MMEL", def: "(Master) Minimum Equipment List: what may be inoperative for dispatch, and under what conditions." },
  { term: "MOE", def: "Maintenance Organisation Exposition: the Part-145 organisation’s approved manual (145.A.70)." },
  { term: "MPD", def: "Maintenance Planning Document from the type certificate holder." },
  { term: "MTO / MTOE", def: "Maintenance Training Organisation and its exposition under Part-147." },
  { term: "MTOM", def: "Maximum Take-Off Mass, used to draw the lines between ratings and licences." },
  { term: "NDT", def: "Non-destructive testing, e.g. eddy current, ultrasonic or X-ray inspection. Part-145 rating D1." },
  { term: "OJT", def: "On-the-job training for the first type rating in a licence category or subcategory." },
  { term: "Part-IS", def: "EU information security requirements, applicable to Part-145 organisations from 22 February 2026." },
  { term: "SB", def: "Service Bulletin: a manufacturer’s recommended inspection or modification." },
  { term: "SMS", def: "Safety Management System, part of the Part-145 management system since December 2022." },
  { term: "Support staff", def: "B1/B2 staff in base maintenance who confirm tasks in their specialty before the category C release." },
  { term: "TC / STC", def: "(Supplemental) Type Certificate: the design approval that maintenance data flows from." },
  { term: "Type rating", def: "An aircraft rating on the licence that allows certification on a specific type." },
];
