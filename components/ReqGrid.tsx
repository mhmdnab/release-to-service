import type { ReactNode } from "react";

export interface Requirement {
  ref: string;
  title: ReactNode;
  text: ReactNode;
}

/** Three-column grid of organisational requirements, each tagged with its rule reference. */
export function ReqGrid({ items }: { items: readonly Requirement[] }) {
  return (
    <div className="req">
      {items.map((r, i) => (
        <article key={i}>
          <span className="ref">{r.ref}</span>
          <h4 className="h4">{r.title}</h4>
          <p>{r.text}</p>
        </article>
      ))}
    </div>
  );
}
