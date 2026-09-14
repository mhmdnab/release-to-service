import { Fragment } from "react";

export interface PointItem {
  ref: string;
  label: string;
  /** Small "new" flag, e.g. "SMS" or "Part-IS". */
  flag?: string;
}

export interface PointGroup {
  heading: string;
  items: readonly PointItem[];
}

/** Two-column list of a regulation's points, grouped by subpart. */
export function Points({ groups }: { groups: readonly PointGroup[] }) {
  return (
    <ul className="points">
      {groups.map((g) => (
        <Fragment key={g.heading}>
          <li className="hd">{g.heading}</li>
          {g.items.map((it) => (
            <li key={it.ref}>
              <b>{it.ref}</b>
              <span>{it.label}</span>
              {it.flag !== undefined && <span className="flag new">{it.flag}</span>}
            </li>
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
