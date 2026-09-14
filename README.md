# Release to Service

**Live site:** https://mhmdnab.github.io/release-to-service/

A one-page, illustrated guide to aircraft maintenance engineering in Europe under the EASA continuing airworthiness rules, Regulation (EU) No 1321/2014:

- **Part-147**: maintenance training organisations, minimum basic course hours, examinations, type training and OJT
- **Part-66**: aircraft maintenance licence categories, with an interactive licence explorer, module matrix, experience routes and aircraft ratings
- **Part-145**: maintenance organisation approvals, classes and ratings, certifying staff, release to service, management system and oversight
- **Hangar floor**: maintenance checks, maintenance documents, human factors (the dirty dozen) and ATA chapters
- **Glossary and FAQ**

It is a static site: a single `index.html` with no build step and no dependencies. The only external request is to Google Fonts.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

The site is published with **GitHub Pages** from the `main` branch (repository root), and every push to `main` redeploys it.

Any other static host works too. On Vercel or Netlify, import the repository with no framework, no build command, and the project root as the output directory.

## Sources

- [Regulation (EU) No 1321/2014, consolidated text (EUR-Lex)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R1321-20240612)
- [EASA Easy Access Rules for Continuing Airworthiness](https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-continuing-airworthiness-regulation-eu-no-13212014)
- [Regulation (EU) 2023/989](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0989), [2021/1963](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R1963), [2023/203](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0203)

## Disclaimer

This is an informative summary, not the legal text. It reflects Regulation (EU) No 1321/2014 as consolidated on 12 June 2024, plus Regulation (EU) 2023/203 (Part-IS). Always check the current EASA Easy Access Rules before making licensing, training or approval decisions.
