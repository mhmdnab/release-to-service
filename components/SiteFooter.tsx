const SOURCES = [
  {
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R1321-20240612",
    label: "Reg. (EU) No 1321/2014, consolidated text (EUR-Lex)",
  },
  {
    href: "https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-continuing-airworthiness-regulation-eu-no-13212014",
    label: "EASA Easy Access Rules for Continuing Airworthiness",
  },
  {
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0989",
    label: "Reg. (EU) 2023/989: Part-66 and Part-147 update",
  },
  {
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R1963",
    label: "Reg. (EU) 2021/1963: Part-145 management system",
  },
  {
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0203",
    label: "Reg. (EU) 2023/203: Part-IS",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site">
      <div>
        <h2>Before you rely on it</h2>
        <p>
          This guide is an informative summary for students, engineers and anyone curious about European aircraft
          maintenance. It is not the legal text and does not replace the AMC, GM or your authority&rsquo;s guidance.
          Rules change, so check the current consolidated regulation and EASA Easy Access Rules before making
          licensing, training or approval decisions.
        </p>
        <p>
          Reference state: Reg. (EU) No 1321/2014 as consolidated on 12 June 2024 (including Reg. (EU) 2023/989),
          plus Reg. (EU) 2023/203 (Part-IS) applicable from 22 February 2026. Checks, documents and human factors
          content describe typical industry practice.
        </p>
      </div>
      <div>
        <h2>Sources</h2>
        <ul>
          {SOURCES.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
