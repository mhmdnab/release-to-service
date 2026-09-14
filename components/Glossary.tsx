"use client";

import { useState } from "react";
import { GLOSSARY } from "@/lib/glossary";
import type { BlockId } from "@/lib/sections";

const BLOCK_ID: BlockId = "glossary";

/** Filterable glossary. Owns its block so the live count can sit in the block header. */
export function Glossary() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = GLOSSARY.map((g) => q === "" || `${g.term}${g.def}`.toLowerCase().includes(q));
  const n = visible.filter(Boolean).length;
  const count = n === 0 ? "No matching terms. Try another word" : `${n} ${n === 1 ? "term" : "terms"}`;

  return (
    <div className="block" id={BLOCK_ID}>
      <div className="block-head">
        <h3 className="h3">Glossary</h3>
        <span className="eyebrow" aria-live="polite">
          {count}
        </span>
      </div>
      <div className="gl-tools">
        <label className="sr-only" htmlFor="gl-q">
          Filter glossary
        </label>
        <input
          id="gl-q"
          type="search"
          placeholder="Filter terms, e.g. CRS or wiring"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <dl className="glossary">
        {GLOSSARY.map((g, i) => (
          <div key={g.term} hidden={!visible[i]}>
            <dt>{g.term}</dt>
            <dd>{g.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
