import type { ReactNode } from "react";
import type { BlockId } from "@/lib/sections";

interface BlockProps {
  /** Anchor id; must be one of the sub-sections declared in lib/sections.ts. */
  id: BlockId;
  title: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
}

/** A titled sub-section of a page, reachable from the menu. */
export function Block({ id, title, eyebrow, children }: BlockProps) {
  return (
    <div className="block" id={id}>
      <div className="block-head">
        <h3 className="h3">{title}</h3>
        {eyebrow !== undefined && <span className="eyebrow">{eyebrow}</span>}
      </div>
      {children}
    </div>
  );
}
