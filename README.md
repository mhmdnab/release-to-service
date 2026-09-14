# Release to Service

**Live site:** https://mhmdnab.github.io/release-to-service/

An illustrated guide to aircraft maintenance engineering in Europe under the EASA continuing airworthiness rules, Regulation (EU) No 1321/2014:

- **The system** (`/system`): the three layers of rules, the annexes, how the Parts connect, and a timeline
- **Part-147** (`/part-147`): maintenance training organisations, minimum basic course hours, examinations, type training and OJT
- **Part-66** (`/part-66`): aircraft maintenance licence categories, with an interactive licence explorer, module matrix, experience routes and aircraft ratings
- **Part-145** (`/part-145`): maintenance organisation approvals, classes and ratings, certifying staff, release to service, management system and oversight
- **Hangar floor** (`/hangar-floor`): maintenance checks, maintenance documents, human factors (the dirty dozen) and ATA chapters
- **Glossary and FAQ** (`/glossary`)

It is a [Next.js](https://nextjs.org) app written in TypeScript and exported as static HTML, so it needs no server. Fonts are self-hosted and the site makes no external requests.

## Project layout

- `app/`: one route per section, plus the root layout, 404 page, sitemap and robots
- `components/`: the page shell (rail, reading progress, full-screen menu), section and table building blocks, and the interactive licence explorer, module matrix and glossary filter
- `lib/sections.ts`: the site map. Every route, navigation label and in-page anchor is declared here and type-checked where it is used
- `lib/licence.ts`: the Part-66 data behind the explorer, the matrix and the course-hours chart

## Run locally

```bash
npm install
npm run dev
```

Then visit http://localhost:3000.

Other scripts:

```bash
npm run typecheck   # generate route types and run tsc
npm run lint        # eslint
npm run build       # static export to out/
```

## Deploy

The site is published with **GitHub Pages** by the workflow in `.github/workflows/deploy.yml`. Every push to `main` type-checks, lints, builds with `NEXT_BASE_PATH=/release-to-service`, and deploys the `out/` folder. In the repository settings, set the Pages source to **GitHub Actions**.

Any static host works too. On Vercel or Netlify, import the repository as a Next.js project and leave `NEXT_BASE_PATH` unset.

## Sources

- [Regulation (EU) No 1321/2014, consolidated text (EUR-Lex)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R1321-20240612)
- [EASA Easy Access Rules for Continuing Airworthiness](https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-continuing-airworthiness-regulation-eu-no-13212014)
- [Regulation (EU) 2023/989](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0989), [2021/1963](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R1963), [2023/203](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0203)

## Disclaimer

This is an informative summary, not the legal text. It reflects Regulation (EU) No 1321/2014 as consolidated on 12 June 2024, plus Regulation (EU) 2023/203 (Part-IS). Always check the current EASA Easy Access Rules before making licensing, training or approval decisions.
