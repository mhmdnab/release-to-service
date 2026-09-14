import type { Metadata } from "next";
import { Block } from "@/components/Block";
import { DataTable, mono } from "@/components/DataTable";
import { Section } from "@/components/Section";
import { getSection } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

const section = getSection("/hangar-floor");

export const metadata: Metadata = pageMetadata(
  section.title,
  "Daily practice in aircraft maintenance: check intervals, the maintenance documents that matter, the dirty dozen human factors, and ATA chapters.",
  section.href,
);

const DIRTY_DOZEN = [
  ["Lack of communication", "Give clear, written shift handovers. Never assume."],
  ["Complacency", "Expect to find a fault. Sign only for what you saw."],
  ["Lack of knowledge", "Use current data and ask when you’re unsure."],
  ["Distraction", "Mark where you stopped, then restart a few steps back."],
  ["Lack of teamwork", "Share the plan. Everyone owns safety."],
  ["Fatigue", "Know the signs and get an independent inspection."],
  ["Lack of resources", "Plan parts and tools ahead. Don’t improvise."],
  ["Pressure", "Speak up. The schedule never outranks safety."],
  ["Lack of assertiveness", "Refuse to accept a standard you know is wrong."],
  ["Stress", "Step back, take a breath and think it through."],
  ["Lack of awareness", "Ask what else this job could affect."],
  ["Norms", "Follow the procedure, not the shop-floor shortcut."],
] as const;

const ATA_CHAPTERS = [
  ["05", "Time limits & checks"], ["12", "Servicing"], ["20", "Standard practices, airframe"], ["21", "Air conditioning"], ["22", "Auto flight"], ["23", "Communications"],
  ["24", "Electrical power"], ["25", "Equipment & furnishings"], ["26", "Fire protection"], ["27", "Flight controls"], ["28", "Fuel"], ["29", "Hydraulic power"],
  ["30", "Ice & rain protection"], ["31", "Indicating & recording"], ["32", "Landing gear"], ["33", "Lights"], ["34", "Navigation"], ["35", "Oxygen"],
  ["36", "Pneumatic"], ["38", "Water & waste"], ["45", "Central maintenance"], ["46", "Information systems"], ["49", "APU"], ["51", "Standard practices & structures"],
  ["52", "Doors"], ["53", "Fuselage"], ["54", "Nacelles & pylons"], ["55", "Stabilizers"], ["56", "Windows"], ["57", "Wings"],
  ["61", "Propellers"], ["70", "Standard practices, engine"], ["71", "Power plant"], ["72", "Engine"], ["73", "Engine fuel & control"], ["74", "Ignition"],
  ["75", "Engine air"], ["76", "Engine controls"], ["77", "Engine indicating"], ["78", "Exhaust"], ["79", "Oil"], ["80", "Starting"],
] as const;

export default function HangarFloorPage() {
  return (
    <Section
      section={section}
      intro={
        <>
          The regulations decide who may sign. The daily work runs on the manufacturer&rsquo;s data, an approved
          maintenance programme, and the discipline of the people doing it. ATA chapter 05 covers time limits and
          maintenance checks.
        </>
      }
    >
      <Block id="maintenance-checks" title="Maintenance checks" eyebrow={<>Typical airliner pattern &middot; illustrative</>}>
        <DataTable
          head={["Check", "Where", "Typical interval", "What happens"]}
          rows={[
            { cells: [mono("Transit / daily"), "Line", "Every turnaround or day", "Walk-round inspection, fluid levels, tyres and brakes, and a review of tech log entries"] },
            { cells: [mono("Weekly"), "Line", "About every 7–8 days", "A more detailed walk-round, servicing, lubrication, and cabin and emergency equipment checks"] },
            { cells: [mono("A-check"), "Line", "A few hundred flight hours, often 6–12 weeks", "An overnight task package of inspections, servicing and operational tests"] },
            { cells: [mono("C-check"), "Base", "About 18–36 months", "1–4 weeks out of service, with panels opened for detailed zonal and structural inspections and modifications"] },
            { highlight: true, cells: [mono("Heavy check"), "Base", "About 6–12 years", "The aircraft is largely stripped for in-depth structural and corrosion inspection over several weeks"] },
          ]}
        />
        <p className="note">
          Real intervals come from each type&rsquo;s Maintenance Planning Document and the operator&rsquo;s approved
          aircraft maintenance programme. Many modern types use task-based or phased packages instead of letter checks.
        </p>
      </Block>

      <Block id="the-paperwork-that-flies" title="The paperwork that flies" eyebrow={<>Maintenance data &middot; 145.A.45</>}>
        <DataTable
          head={["Document", "Name", "Issued by", "Status"]}
          rows={[
            { highlight: true, cells: [mono("AD"), "Airworthiness Directive", "EASA or the State of Design", { content: <strong>Mandatory</strong> }] },
            { cells: [mono("SB"), "Service Bulletin", "Type certificate holder or manufacturer", "Recommended; mandatory when an AD calls it up"] },
            { cells: [mono("MPD"), "Maintenance Planning Document", "Type certificate holder", "Source for the maintenance programme"] },
            { cells: [mono("AMP"), "Aircraft Maintenance Programme", "Operator or CAMO, approved by the authority", "Defines what is done and when"] },
            { cells: [mono("AMM"), "Aircraft Maintenance Manual", "Type certificate holder", "Approved procedures (instructions for continued airworthiness)"] },
            { cells: [mono("IPC"), "Illustrated Parts Catalogue", "Type certificate holder", "Part numbers, effectivity, interchangeability"] },
            { cells: [mono("SRM"), "Structural Repair Manual", "Type certificate holder", "Damage limits and approved repairs"] },
            { cells: [mono("WDM"), "Wiring Diagram Manual", "Type certificate holder", "Wiring and EWIS data"] },
            { cells: [mono("FIM / TSM"), "Fault Isolation / Troubleshooting Manual", "Type certificate holder", "Fault isolation procedures"] },
            { cells: [mono("CMM"), "Component Maintenance Manual", "Component manufacturer", "Off-aircraft shop maintenance"] },
            { cells: [mono("MEL"), "Minimum Equipment List", "Operator, based on the MMEL and approved by the authority", "Dispatch with inoperative items"] },
          ]}
        />
      </Block>

      <Block id="the-dirty-dozen" title="The dirty dozen" eyebrow={<>Module 9 &middot; human factors</>}>
        <p className="prose">
          These are twelve common preconditions for maintenance error, first described by Gordon Dupont at Transport
          Canada. Each comes with a safety net.
        </p>
        <div className="dozen">
          {DIRTY_DOZEN.map(([name, net]) => (
            <div key={name}>
              <b>{name}</b>
              <span>{net}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block id="ata-chapters" title="ATA chapters" eyebrow={<>ATA iSpec 2200 &middot; shared numbering for manuals, parts and defects</>}>
        <div className="ata">
          {ATA_CHAPTERS.map(([code, name]) => (
            <div key={code}>
              <b>{code}</b>
              {name}
            </div>
          ))}
        </div>
      </Block>
    </Section>
  );
}
