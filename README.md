# Readiness-Tool: Prototype

Static, client-side reimplementation of the Excel/VBA "Readiness Score" tool
(company self-assessment against EUDR, CSDDD, PPWR, ESPR, and LCA maturity).
Built as one of several implementation alternatives to discuss, alongside the
original spreadsheet, before the next stakeholder meeting.

## Run it

No install, no build step, no server required:

```
open index.html
```

or, to serve it (e.g. to test hosting on an intranet):

```
python3 -m http.server 8000
```

Everything (the question catalog, the relevance logic, the scoring) runs
in the browser. **There is no backend and no network call anywhere in this
app.** That was the hard requirement carried over from the original tool:
client companies fill in sensitive compliance data, and none of it may leave
their machine. A static page trivially satisfies that; it can even be handed
out as a single folder and opened with no internet connection at all.

## What changed vs. the original Excel/VBA tool

The original `.xlsm` (see the accompanying manual) works, but has a few
structural problems this prototype fixes:

- **No macros.** The original requires "Enable Content" on open, which many
  corporate IT policies block by default. This is a plain web page: nothing
  to enable, nothing to trust.
- **Single source of truth for the question catalog.** The original keeps
  question IDs in sync by hand across three sheets (`Regularien_Readiness`,
  `Relevanzlogik`, `Dashboard_Daten`); the manual itself flags this as a
  data-integrity risk. Here, `js/data.js` (generated once from the source
  workbook) is the only place questions and their relevance conditions live.
- **One relevance engine, not a per-regulation special case.** The VBA
  hardcoded CSDDD as a direct cell check while EUDR/PPWR/ESPR went through a
  generic role/size matrix. `js/relevance.js` treats all four regulations
  uniformly: CSDDD is just a matrix condition with no role/size filter.
- **A real bug fixed along the way:** the `Relevanzlogik` sheet stores PPWR/
  ESPR role keys *without* spaces (e.g. `PPWR_Lieferant/AkteurinderLieferkette`),
  while the VBA `Select Case` matched them *with* spaces
  (`PPWR_Lieferant/Akteur in der Lieferkette`). That mismatch meant a company
  that picked exactly that role never got matched against it. This prototype
  derives one canonical role key (`roleKey()` in `js/relevance.js`) from the
  same label used in the UI, so the mismatch can't recur.
- **No Excel-version dependency.** The original uses `XLOOKUP` and dynamic
  arrays, which don't work in older Excel or LibreOffice. A browser has no
  such constraint.
- **Portable state instead of a single file per company.** Progress
  autosaves to the browser's local storage as you go, and Export/Import
  (plain JSON) lets a company save their in-progress assessment, pause, and
  resume later, or move it to another machine, still never touching a
  server.

## What's deliberately unchanged

The question catalog (84 regulatory questions + 29 LCA questions), the
role/size relevance matrix, and the 0–4 scoring scale are taken as-is from
`Readiness_Score.xlsm`; that content is the client's methodology, not an
implementation detail, and re-validating it wasn't in scope for this
prototype. Regenerating `js/data.js` from an updated source workbook is a
mechanical step if the questionnaire itself changes.

## Design

Built to be handed to client companies directly, not just to demo internally:

- **Typeface:** [Public Sans](https://public-sans.digital.gov/) (SIL OFL 1.1),
  self-hosted as woff2 under `fonts/`, chosen because it was built for exactly
  this kind of official/regulatory reading context, and because it's a
  deliberate alternative to the "generic AI-tool" look of ubiquitous SaaS
  fonts. Self-hosted (not loaded from Google Fonts) so the "zero network
  calls" guarantee holds for the page's styling too, not just its data.
- **Color:** a fixed, non-decorative four-band status scale (good / warning /
  serious / critical) drives every score: bars, chips, and the headline
  figure all recolor by how ready that section actually is, instead of one
  flat brand color regardless of score. Status colors are never reused for
  anything else (navigation, buttons), so a color always means the same
  thing everywhere on the page. An unanswered section is shown as neutral
  gray with its own label, never as a false "0% / critical".
- **Scoring UI:** a segmented 0–4 control per question (rather than a
  dropdown) with the scale spelled out once at the top of each step, not
  repeated 84 times, for a faster, easier to scan fill-in.
- **Report output:** the print stylesheet renders the dashboard as a clean,
  headerless report (company name + date, stat tiles, score breakdown):
  what a client would actually print or save as PDF to file internally.

## Structure

```
index.html          shell + step navigation
css/style.css
fonts/               self-hosted Public Sans (woff2) + its OFL license
js/data.js           question catalog, regulations, scale (generated from the source workbook)
js/relevance.js       relevance engine (who sees which question)
js/state.js           app state, localStorage autosave, JSON export/import
js/charts.js          status-color logic + dependency-free meter/donut components
js/app.js             UI wiring (profile -> regulatory -> LCA -> dashboard)
```

## Open questions for discussion

- **Distribution model.** A static page can be handed out as a zip, hosted
  on the client's intranet, or embedded in an existing portal. Which of
  these fits how the tool is actually going to reach client companies?
- **Multi-user / history.** This prototype is single-user, single-session
  (like the original). If clients want several people filling it in
  together or tracking readiness over time, that needs a self-hosted backend
  the *client* operates (their infrastructure, their data), a bigger step
  than this prototype, sketched as "Option E" in the written analysis.
- **PDF/report output.** Currently uses the browser's native print dialog
  (`window.print()`). A dedicated report layout is easy to add once the
  desired report content is agreed on.
- **Excel fallback.** For organizations that will only accept a spreadsheet,
  a macro-free rebuild of the original (formulas + `FILTER`/slicers instead
  of VBA) remains a viable "no-regret" alternative and wasn't built here to
  keep this prototype focused; happy to build it too if wanted.
