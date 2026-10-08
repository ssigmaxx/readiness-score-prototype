# How the Code Works

This page explains **what every part of the code does**, in simple English.
You do not need to understand all of it to make changes. It is here so that
you always know where something lives and what it is for.

If you only want to change something, the
[step by step guide](HOW-TO-CHANGE-THINGS.md) is the faster way.

## Contents

- [The big picture](#the-big-picture)
- [What happens when you open the tool](#what-happens-when-you-open-the-tool)
- [What happens when you click a number](#what-happens-when-you-click-a-number)
- [How the result is calculated](#how-the-result-is-calculated)
- File by file
  - [index.html: the page skeleton](#indexhtml-the-page-skeleton)
  - [js/data.js: the questions and lists](#jsdatajs-the-questions-and-lists)
  - [js/relevance.js: who sees which question](#jsrelevancejs-who-sees-which-question)
  - [js/state.js: remembering the answers](#jsstatejs-remembering-the-answers)
  - [js/charts.js: colors and result bars](#jschartsjs-colors-and-result-bars)
  - [js/app.js: building the pages](#jsappjs-building-the-pages)
  - [css/style.css: how everything looks](#cssstylecss-how-everything-looks)
  - [fonts/: the letters](#fonts-the-letters)
- [A few programming words explained](#a-few-programming-words-explained)

---

## The big picture

Think of the tool like a restaurant:

| Restaurant | In the tool | File |
|------------|-------------|------|
| The building and the tables | The empty page with a header and a footer | `index.html` |
| The menu (all dishes) | All the questions and lists | `js/data.js` |
| The waiter who knows which guest may order what | Decides which company sees which question | `js/relevance.js` |
| The notebook where orders are written down | Remembers all the answers | `js/state.js` |
| The bill with colored marks | The result bars and their colors | `js/charts.js` |
| The staff who set the tables and serve | Builds every page, button and question on the screen | `js/app.js` |
| The decoration and paint | Colors, sizes, spacing, fonts | `css/style.css` |

There is **no server** and **no internet connection**. Everything happens
inside the browser on one computer.

The files are loaded in this order (you can see it at the bottom of
`index.html`):

1. `data.js` (the questions must exist first)
2. `relevance.js` (needs the questions)
3. `state.js` (needs the lists of roles)
4. `charts.js`
5. `app.js` (uses all the others, so it comes last)

**Do not change this order.** If you do, the tool will not start.

---

## What happens when you open the tool

1. The browser reads `index.html`. It shows the header, the three buttons
   at the top, and an empty area in the middle.
2. The browser loads the five `.js` files in the order above.
3. When everything is loaded, the last lines of `app.js` run. They do three things:
   - **`loadState()`** looks in the browser's memory for answers that were
     saved earlier, and loads them.
   - **`wireHeaderActions()`** connects the Export, Import and reset
     buttons, so they do something when clicked.
   - **`renderShell()`** draws the four step circles at the top and fills
     the middle of the page with step 1.

---

## What happens when you click a number

Example: a company clicks **3** next to question **E2**.

1. The 0 to 4 buttons were made by **`scalePicker()`** in `app.js`.
   It noticed the click.
2. **`questionRow()`** in `app.js` writes the answer down: "E2 = 3".
3. **`saveState()`** in `state.js` saves all answers in the browser's memory,
   so nothing is lost if the page is closed.
4. The small counter next to the section heading (for example "5 / 12")
   and the progress bar at the top are updated, so you see the progress at once.

---

## How the result is calculated

This happens in the function **`scoreStats()`** in `app.js`.

1. Take all questions of one group (for example all EUDR questions this
   company can see).
2. Look only at the questions that have **been answered**.
   Unanswered questions are not counted as 0, they are simply left out.
3. Add up all the answers.
4. Divide by the highest possible total (number of answered questions × 4).
5. Multiply by 100 to get a percentage.

**Example:** three questions answered with 4, 2 and 3.
Sum = 9. Highest possible = 3 × 4 = 12. Result = 9 ÷ 12 = 75%.

If no question in a group has been answered yet, the result is shown as
"Noch nicht bewertet" (not yet rated) in gray, and **not** as 0%.

The color of the result is then chosen by **`statusForPct()`** in `charts.js`
(see [below](#jschartsjs-colors-and-result-bars)).

---

## index.html: the page skeleton

This is the file you double click to open the tool. It is mostly empty on
purpose: the questions and pages are filled in later by `app.js`.

| Part | What it does |
|------|--------------|
| `<head> ... </head>` | Information for the browser: the language (German), the name in the browser tab (`<title>`), and the link to `css/style.css`. |
| `<div class="brand-bar">` | The thin blue line at the very top. |
| `<header class="app-header">` | The top area: the small kicker text, the big title, the subtitle, and the buttons Export, Import and Zurücksetzen. |
| `<input type="file" id="import-input" hidden />` | An invisible "choose a file" box. The Import button opens it. |
| `<nav id="step-nav">` | An empty box. `app.js` fills it with the four step circles. |
| `<main id="step-content">` | An empty box. `app.js` fills it with the current step (profile, questions or dashboard). |
| `<footer>` | The small text at the bottom of the page. |
| `<script src="...">` lines | Load the five JavaScript files, in the right order. |

---

## js/data.js: the questions and lists

This file only **stores information**. It does not do anything by itself.
It is like a big table written in a special format.

| Part | What it holds |
|------|---------------|
| `REGULATIONS` | The four EU rules: their short name (EUDR, CSDDD, PPWR, ESPR) and their long official name. |
| `SCALE` | The meaning of the answers 0, 1, 2, 3 and 4. |
| `EUDR_ROLE_OPTIONS` | The three EUDR roles in the dropdown list in step 1. |
| `PPWR_ROLE_LABELS` | The PPWR roles shown as tick boxes in step 1. |
| `ESPR_ROLE_LABELS` | The ESPR roles shown as tick boxes in step 1. |
| `roleKey()` | A small helper. It turns a role name into a short code by removing the spaces and adding `PPWR_` or `ESPR_` in front. Example: "Lieferant/Akteur in der Lieferkette" becomes `PPWR_Lieferant/AkteurinderLieferkette`. The questions use these codes. |
| `QUESTIONS` | All 84 questions about the EU rules. Each one has a number, its EU rule, its heading, its text and its "relevance" (who sees it). |
| `LCA_QUESTIONS` | All 29 LCA questions. Each one has a number, a heading and a text. Every company sees all of them. |

How to change these is explained in the
[step by step guide](HOW-TO-CHANGE-THINGS.md).

---

## js/relevance.js: who sees which question

This file answers one question: **"Should this company see this question?"**
It reads the company profile from step 1 and the `"relevance"` part of each
question.

| Function | What it does, in simple words |
|----------|-------------------------------|
| `inList(list, value)` | Checks if a value is in a list. Example: is "KMU" in the list of sizes for this question? **An empty list means "everybody is allowed".** |
| `anyRoleActive(roleKeys, activeRoles)` | Checks if the company has **at least one** of the roles that the question needs. Again, an empty list means "everybody is allowed". |
| `isRegulationWanted(profile, regulation)` | Checks if the company left the EU rule switched on in step 1 (the "relevant für uns" tick box). |
| `isQuestionRelevant(question, profile)` | **The main decision.** It checks one question against the company. See the rules below. |
| `relevantQuestions(allQuestions, profile)` | Goes through **all** questions and keeps only those that `isQuestionRelevant()` says yes to. |
| `buildActiveRoleKeys(prefix, labels, checkedLabels)` | Turns the ticked role boxes from step 1 into the short role codes (using `roleKey()`), so they can be compared with the codes in the questions. |

**The rules inside `isQuestionRelevant()`:**

| EU rule | The company sees the question when... |
|---------|----------------------------------------|
| CSDDD | the CSDDD box is switched on **and** the company answered "ja" to the CSDDD question. |
| EUDR | the EUDR box is switched on **and** it answered "ja" to the raw materials question **and** its EUDR role is in the question's role list **and** its size is in the question's size list. |
| PPWR | the PPWR box is switched on **and** its size is in the size list **and** it ticked at least one of the question's roles. |
| ESPR | the ESPR box is switched on **and** it answered "ja" to the ESPR question **and** its size is in the size list **and** it ticked at least one of the question's roles. |

---

## js/state.js: remembering the answers

"State" is a programming word for "everything the tool currently remembers".
This file keeps the answers, saves them, and handles the Export and Import buttons.

| Part | What it does, in simple words |
|------|-------------------------------|
| `STORAGE_KEY` | The name under which the answers are saved in the browser's memory. Like the label on a folder. |
| `defaultProfile()` | Creates an **empty company profile**: no size chosen, no roles ticked, all four EU rules switched on. |
| `freshState()` | Creates a completely **empty start**: no company name, an empty profile, no answers. |
| `appState` | The **one place** where everything is kept while the tool is open: company name, profile, regulatory answers (`answers`) and LCA answers (`lcaAnswers`). |
| `deriveActiveRoleKeys(profile)` | Works out the short role codes from the ticked boxes (with the help of `buildActiveRoleKeys()` from `relevance.js`). Needed before deciding which questions to show. |
| `saveState()` | Saves `appState` in the browser's memory. Called after every click. If the browser does not allow saving (for example in a private window), nothing breaks; the answers are just not kept after closing. |
| `loadState()` | Reads the saved answers back when the tool is opened again. |
| `exportStateToFile()` | Runs when you click **Export (JSON)**. It puts all answers into a text file (JSON format) and downloads it. The file name contains the company name, for example `Muster_GmbH_readiness-export.json`. |
| `importStateFromFile(file, onDone)` | Runs when you choose a file after clicking **Import (JSON)**. It reads the file, replaces the current answers with the ones in the file, and saves them. If the file is not a correct export, it reports a problem. |

**Where exactly is the data saved?** In the browser's "local storage". This is
a small private storage area that belongs to the browser on that one computer.
It is **not** sent anywhere. If you use a different browser or a different
computer, the answers are not there; use Export and Import to move them.

---

## js/charts.js: colors and result bars

This file decides **which color a result gets** and **draws the result bars**
on the dashboard.

| Part | What it does, in simple words |
|------|-------------------------------|
| `STATUS_BANDS` | The four color bands: red below 25%, orange from 25%, yellow from 50%, green from 75%. Each band also has its German label. |
| `statusForPct(pct)` | Takes a percentage and returns the matching color band. If there is no percentage yet (nothing answered), it returns gray with "Noch nicht bewertet". |
| `statusChipHTML(status)` | Makes the small colored label with a dot, for example "● Ausbaufähig". |
| `renderMeterList(container, rows)` | Draws a list of result bars. Each row shows the name, the percentage, the colored label, a colored bar, and the text "x von y Fragen beantwortet". |
| `svgEl(tag, attrs)` | A small helper for drawing shapes (used by `renderDonut()`). |
| `renderDonut(container, value)` | Draws a round "ring" chart with a percentage in the middle. **It is not used at the moment.** It is kept in case a ring chart is wanted later. |

There is no chart library from the internet on purpose, so that the tool
still works with no internet connection at all.

---

## js/app.js: building the pages

This is the biggest file. It **builds everything you see** in the middle of
the page and reacts to clicks. It is split into parts, and each part starts
with a line like `// ---------- Step: Profile ----------`.

### Settings at the top

| Part | What it does |
|------|--------------|
| `STEPS` | The order of the four steps: profile, regulatory, lca, dashboard. |
| `STEP_LABELS` | The German names of the four steps, shown at the top of the page. |
| `currentStep` | Remembers which step is open right now. The tool always starts with step 1. |

### Small helpers (used everywhere)

| Function | What it does, in simple words |
|----------|-------------------------------|
| `el(tag, attrs, children)` | A shortcut to create one piece of the page (a box, a heading, a button, a text). Almost everything on screen is made with it. |
| `groupBy(items, keyFn)` | Sorts a list into groups. Example: puts all questions with the same heading together. Groups keep the order in which they appear in `data.js`. |
| `scalePicker(...)` | Makes the row of five buttons **0 1 2 3 4** for one question. Moving the mouse over a button shows its meaning. |
| `scaleLegend()` | Makes the line at the top of a step that explains what 0 to 4 mean. |
| `renderProgressSummary(...)` | Makes the progress bar with the text "x / y beantwortet", and updates it after every click. |
| `sectionBadge()` | Makes the small counter next to each section heading (for example "5 / 12"). It turns into a "complete" look when all questions of that section are answered. |

### Step 1: Company profile (Unternehmensprofil)

| Function | What it does, in simple words |
|----------|-------------------------------|
| `renderProfileStep(container)` | Builds the whole step 1 page: the info box about privacy, the company name field, the company size choice (KMU or Nicht-KMU), and the four EU rule blocks. |
| `radioOption(...)` | Makes one round choice button with its text (for example "KMU" or "ja"). |
| `toggleWanted(...)` | Runs when the "relevant für uns" box of an EU rule is ticked or unticked. It saves the choice and redraws step 1. |
| `regulationSection(...)` | Builds the four blocks for EUDR, CSDDD, PPWR and ESPR, with their questions: the EUDR role list, the raw materials question, the CSDDD question, the PPWR roles, the ESPR question and the ESPR roles. **The German wording of these profile questions is here.** |
| `regBlock(...)` | Makes the frame around one EU rule block: the "relevant für uns" tick box, the long name, and the content. If the rule is switched off, the content is grayed out. |
| `selectRow(...)` | Makes a dropdown list with a label (used for the EUDR role). |
| `yesNoRow(...)` | Makes a question with "ja" and "nein" choices. |
| `roleCheckboxRow(...)` | Makes a group of tick boxes, one per role (used for PPWR and ESPR). |

### Step 2: Regulatory questions (Regulatorische Bewertung)

| Function | What it does, in simple words |
|----------|-------------------------------|
| `renderRegulatoryStep(container)` | Builds step 2. It first asks `relevantQuestions()` which questions this company should see. If there are none, it shows a hint to go back to step 1. Otherwise it shows the 0 to 4 explanation, the progress bar, and then one section per EU rule, with the questions grouped under their headings. |
| `questionRow(q, answerMap, onAnswer)` | Makes **one question line**: the number (for example E2), the question text, and the 0 to 4 buttons. When a button is clicked, it saves the answer and updates the counters. Also used in step 3. |

### Step 3: LCA (LCA Readiness)

| Function | What it does, in simple words |
|----------|-------------------------------|
| `renderLcaStep(container)` | Builds step 3. It shows a short intro, the 0 to 4 explanation, the progress bar, and all LCA questions grouped by their heading. Every company sees all LCA questions. |

### Step 4: Dashboard

| Function | What it does, in simple words |
|----------|-------------------------------|
| `scoreStats(questions, answerMap)` | Calculates the result for a group of questions. See [How the result is calculated](#how-the-result-is-calculated). |
| `statTile(label, stats)` | Makes one of the three big boxes at the top of the dashboard, with the large percentage, the colored label and "x von y Fragen beantwortet". |
| `renderDashboardStep(container)` | Builds the whole dashboard: the line with company name and date, the three big boxes (overall, regulatory, LCA), the result bars per EU rule, the result bars per heading, the LCA result bars, and the button "Als PDF drucken / exportieren". |

### Moving between steps and the top buttons

| Function | What it does, in simple words |
|----------|-------------------------------|
| `renderContinueBar(container, nextStep, prevStep)` | Makes the "← Zurück" and "Weiter →" buttons at the bottom of each step. |
| `goToStep(step)` | Opens another step and scrolls back to the top of the page. |
| `renderShell()` | Draws the four step circles at the top (finished steps get a ✓, the open one is highlighted), then fills the middle of the page with the right step. |
| `wireHeaderActions()` | Connects the three buttons at the top. **Export** calls `exportStateToFile()`. **Import** opens the file chooser and then calls `importStateFromFile()`; if the file is wrong, a message appears. **Zurücksetzen** asks "are you sure?" and then deletes all answers. |
| The last lines (`DOMContentLoaded`) | The starting point. When the page has finished loading, they run `loadState()`, `wireHeaderActions()` and `renderShell()`. |

---

## css/style.css: how everything looks

CSS is a list of style rules: "this kind of box gets this color, this size,
this spacing". The file is split into parts. Each part starts with a line
like `/* ---------- Buttons ---------- */`, so you can search for it.

| Part (search for this) | What it styles |
|------------------------|----------------|
| `@font-face` (top of file) | Loads the Public Sans font from the `fonts/` folder. |
| `:root` | **All the main colors** in one place (blue, the status colors, text and background colors). Changing a color here changes it everywhere. |
| `body` and `h1, h2, h3, h4` | The basic text: font, size, line spacing, heading style. |
| `Masthead` | The header area at the top with the title and the buttons. |
| `Buttons` | All buttons: normal (blue), secondary, ghost (light) and danger (red, for reset). |
| `Stepper` | The four step circles and the lines between them. |
| `Content shell` | The white card in the middle that holds each step. |
| `Form fields` | Text fields, dropdown lists, round choices and tick boxes in step 1. |
| `Regulation sections` | The four EU rule blocks in step 1, including the grayed out look when switched off. |
| `Regulatory / LCA question steps` | The question lines, the 0 to 4 buttons, the progress bar and the section counters. |
| `Dashboard` | The three big result boxes, the result bars and the colored labels. |
| `Footer` | The small text at the bottom. |
| `Print / PDF export` (`@media print`) | How the page looks when **printed or saved as PDF**: the buttons, the step circles and the progress bars are hidden so only a clean report is left. |

---

## fonts/: the letters

This folder holds the font **Public Sans** in eight small files (four
thicknesses, each in two parts for different letters). `LICENSE.md` is the
font's free license (SIL Open Font License). The fonts are stored here, and
not loaded from the internet, so the tool works fully offline.

You do not need to change anything in this folder.

---

## A few programming words explained

| Word | Simple meaning |
|------|----------------|
| Function | A named set of instructions, like a recipe. For example `saveState()` is the recipe "save all answers". The `()` after the name is how it is written. |
| Variable / `const` / `let` | A named box that holds information. `const SCALE = [...]` means "the box called SCALE holds this list". |
| List (array) | Several things in a row, written between `[` and `]`. |
| Object | A group of named values, written between `{` and `}`. Each question is one object. |
| `null` | "Nothing" or "not set". |
| `true` / `false` | Yes / No. |
| Comment | A note for humans. In `.js` files it starts with `//`. In `.css` files it is written between `/*` and `*/`. The browser ignores comments. |
| Render | "Draw on the screen". `renderShell()` means "draw the page frame". |
| State | Everything the tool currently remembers (the answers and the profile). |
| Local storage | A small private storage area inside the browser on one computer. |
| JSON | A simple text format for data. The Export file is JSON. |
| HTML | The language for the content and structure of a web page. |
| CSS | The language for the look of a web page (colors, sizes). |
| JavaScript (JS) | The language for what a web page does (reacting to clicks, calculating). |
