import type { CSSProperties, ReactNode } from "react";

export interface Fact {
  big: string;
  text: ReactNode;
  em: string;
}

/** Grid of headline figures with a short explanation and a source reference. */
export function Facts({ items, style }: { items: readonly Fact[]; style?: CSSProperties }) {
  return (
    <div className="facts" style={style}>
      {items.map((f, i) => (
        <div key={i}>
          <b>{f.big}</b>
          <span>{f.text}</span>
          <em>{f.em}</em>
        </div>
      ))}
    </div>
  );
}
