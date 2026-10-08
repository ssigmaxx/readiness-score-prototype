# How to Change Things: A Step by Step Guide

This guide is written for people who have **never programmed before**.
Every change is explained as a short recipe. Pick the recipe you need,
follow the steps, and check the result in the browser.

## Contents

- [Before you start](#before-you-start)
  - [How to edit a file](#how-to-edit-a-file)
  - [How to see your change](#how-to-see-your-change)
  - [The small rules of the question file](#the-small-rules-of-the-question-file)
- Recipes
  1. [Change the text of a question](#1-change-the-text-of-a-question)
  2. [Add a new question](#2-add-a-new-question)
  3. [Remove a question](#3-remove-a-question)
  4. [Change which companies see a question](#4-change-which-companies-see-a-question)
  5. [Change or add an LCA question](#5-change-or-add-an-lca-question)
  6. [Change the meaning of the numbers 0 to 4](#6-change-the-meaning-of-the-numbers-0-to-4)
  7. [Change the full name of an EU rule](#7-change-the-full-name-of-an-eu-rule)
  8. [Change the color bands of the results](#8-change-the-color-bands-of-the-results)
  9. [Change the colors of the page](#9-change-the-colors-of-the-page)
  10. [Change the title and header text](#10-change-the-title-and-header-text)
  11. [Change the names of the four steps](#11-change-the-names-of-the-four-steps)
  12. [Change the profile questions in step 1](#12-change-the-profile-questions-in-step-1)
- [Something went wrong](#something-went-wrong)
- [Things that need a programmer](#things-that-need-a-programmer)
- [Small dictionary of words](#small-dictionary-of-words)

---

## Before you start

### How to edit a file

You can edit the files in two ways. Choose the one that is easier for you.

**Way A: Directly on the GitHub website (easiest, and you can always go back)**

1. Open the project on GitHub in your browser.
2. Click on the file you want to change, for example `js` and then `data.js`.
3. Click the **pencil icon** (top right of the file, "Edit this file").
4. Make your change.
   Tip: press **Ctrl + F** (or **Cmd + F** on a Mac) to search for a word,
   for example the question number `E4`.
5. Click the green **Commit changes...** button.
6. Write a short note about what you changed, for example
   "Changed text of question E4". Then click **Commit changes** again.

GitHub remembers every old version. If something breaks, you can always go
back (see [Something went wrong](#something-went-wrong)).

To try the new version on your computer, download the folder again
(green **Code** button, then **Download ZIP**).

**Way B: On your own computer**

1. Make a copy of the whole folder first (your backup).
2. Open the file with a simple text editor:
   - Windows: right click the file, choose **Open with**, then **Notepad**.
   - Mac: use a free editor such as **Visual Studio Code**
     (download from code.visualstudio.com). Please do **not** use
     TextEdit, because it can secretly change quote marks and break the file.
3. Make your change.
4. Save the file (**Ctrl + S** or **Cmd + S**).

> **Never** open these files with Word. Word adds hidden formatting and the
> tool will stop working.

### How to see your change

1. Open `index.html` in the browser (double click it), or go back to the
   browser tab where it is already open.
2. Press **F5** (Windows) or **Cmd + R** (Mac) to refresh the page.
3. Check that your change is there and that the page still works.

**Important:** the tool remembers old answers in the browser. If the page
looks strange after a bigger change, click the red **Zurücksetzen** (reset)
button at the top right. This deletes the saved answers and starts fresh.

### The small rules of the question file

Almost every change happens in the file **`js/data.js`**. It looks a bit
technical, but it is really just a long list. Here is one question from it,
with an explanation of every line:

```js
  {
    "id": "E2",
    "regulation": "EUDR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang sind relevante Produkte mit HS-Codes dokumentiert? (Art. 9)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer",
        "nachgelagerterMarktteilnehmer",
        "Händler"
      ],
      "roles": null
    }
  },
```

| Line | What it means |
|------|---------------|
| `{` and `},` | The start and the end of one question. Think of them as the two covers of a small card. |
| `"id"` | The short number of the question, for example `E2`. Every question needs its **own** number. |
| `"regulation"` | Which EU rule the question belongs to: `EUDR`, `CSDDD`, `PPWR` or `ESPR`. |
| `"field"` | The heading the question is shown under. Questions with exactly the same field text are shown together under one heading. |
| `"text"` | The question itself, as the company sees it. |
| `"relevance"` | Which companies see this question. See [recipe 4](#4-change-which-companies-see-a-question). |

**Five small rules that keep the file working:**

1. Text always sits **between two straight quote marks**: `"like this"`.
2. If you need a quote mark **inside** your text, use the German quotes
   `„ “` or single quotes `' '` instead. A normal `"` inside the text
   breaks the file.
3. Each line ends with a **comma**. (A comma after the last line
   before a `}` or `]` is allowed too, so you do not need to worry about it.)
4. Between two questions there is always `},` followed by `{`.
5. Do not delete any `{ } [ ]`. They always come in pairs.

---

## 1. Change the text of a question

**File:** `js/data.js`

1. Open `js/data.js` (see [How to edit a file](#how-to-edit-a-file)).
2. Search for the question number, for example `"E4"` (with the quote marks).
3. Find the line that starts with `"text":`.
4. Change only the words **between** the quote marks. Keep the quote marks
   and the comma at the end.

Before:
```js
    "text": "In welchem Umfang sind relevante Produkte dokumentiert? (Art. 9)",
```
After:
```js
    "text": "In welchem Umfang sind alle relevanten Produkte vollständig dokumentiert? (Art. 9)",
```

5. Save, refresh the browser, and look at the question in step 2.

You can change the heading (the `"field"` line) in the same way. If you
change the heading of one question, it will move into its own group. To
rename a whole group, change the `"field"` of **every** question in that group.

---

## 2. Add a new question

**File:** `js/data.js`

The easiest way is to copy an existing question that is similar to the new one.

1. Open `js/data.js`.
2. Find a question of the same EU rule, ideally under the same heading.
   For example search for `"E3"`.
3. Select the whole question, from its `{` to its `},`
   (see the example in [the small rules](#the-small-rules-of-the-question-file)).
4. Copy it (**Ctrl + C** or **Cmd + C**).
5. Put the cursor directly after the `},` of that question and press Enter.
6. Paste it (**Ctrl + V** or **Cmd + V**). You now have the same question twice.
7. In the copy, change:
   - `"id"` to a **new number** that does not exist yet, for example `"E30"`.
     (Search for it first to make sure it is not used.)
   - `"text"` to your new question.
   - `"field"` if it should go under a different heading.
8. Save, refresh the browser, and look for your new question in step 2.

The question appears in the same place in the tool as in the file. So put it
next to the questions it belongs with.

**If you add a question as the very last one in the list:** make sure the
question before it ends with `},` and that the line `];` still comes
after your new question.

---

## 3. Remove a question

**File:** `js/data.js`

1. Make a backup first.
2. Search for the question number, for example `"E4"`.
3. Select the whole question, from its `{` to its `},`.
4. Delete it.
5. Check that the question before and the question after still connect
   like this:

```js
  },
  {
```

6. Save and refresh the browser.

---

## 4. Change which companies see a question

**File:** `js/data.js`

In step 1 of the tool, every company says what kind of company it is. The
`"relevance"` part of each question decides if the company sees the question.

There are two kinds:

### Kind 1: CSDDD questions

```js
    "relevance": {
      "type": "csddd"
    }
```

This means: the question is shown to every company that answered **Ja (yes)**
to the CSDDD question in step 1. There is nothing else to set here.

### Kind 2: EUDR, PPWR and ESPR questions

```js
    "relevance": {
      "type": "matrix",
      "sizes": [ "KMU", "Nicht-KMU" ],
      "eudrRoles": null,
      "roles": [ "PPWR_Erzeuger", "PPWR_Importeur" ]
    }
```

(In the file each word is on its own line. That does not matter, both
ways work the same.)

| Line | What it means |
|------|---------------|
| `"sizes"` | Which company sizes see the question. `"KMU"` = small and medium companies. `"Nicht-KMU"` = large companies. Write one or both. |
| `"eudrRoles"` | Only for **EUDR** questions. Which EUDR roles see it. Possible values: `"Marktteilnehmer"`, `"nachgelagerterMarktteilnehmer"`, `"Händler"`. For PPWR and ESPR questions this stays `null`. |
| `"roles"` | Only for **PPWR** and **ESPR** questions. Which roles see it. For EUDR questions this stays `null`. |

A company sees the question if its size is in the `"sizes"` list **and** it
has at least **one** of the roles in the role list.

**How to write a PPWR or ESPR role:** take the role name exactly as it is
shown in step 1 of the tool, **remove all spaces**, and put `PPWR_` or
`ESPR_` in front. Examples:

| Role shown in the tool | How to write it for PPWR | How to write it for ESPR |
|------------------------|--------------------------|--------------------------|
| Erzeuger | `"PPWR_Erzeuger"` | `"ESPR_Erzeuger"` |
| Hersteller | `"PPWR_Hersteller"` | `"ESPR_Hersteller"` |
| Endvertreiber/Händler | `"PPWR_Endvertreiber/Händler"` | `"ESPR_Endvertreiber/Händler"` |
| Lieferant/Akteur in der Lieferkette | `"PPWR_Lieferant/AkteurinderLieferkette"` | `"ESPR_Lieferant/AkteurinderLieferkette"` |
| Anbieter von Online-Marktplätzen | `"PPWR_AnbietervonOnline-Marktplätzen"` | `"ESPR_AnbietervonOnline-Marktplätzen"` |

The full list of role names is near the top of `js/data.js`, in the lines
that start with `const PPWR_ROLE_LABELS` and `const ESPR_ROLE_LABELS`.

**Example:** a PPWR question should only be shown to large companies that are
"Hersteller" or "Importeur":

```js
    "relevance": {
      "type": "matrix",
      "sizes": [ "Nicht-KMU" ],
      "eudrRoles": null,
      "roles": [ "PPWR_Hersteller", "PPWR_Importeur" ]
    }
```

**Good to know:**

- An **empty list** `[]` or `null` means "no limit": everybody passes this check.
- EUDR questions are only shown if the company answered **Ja** to the raw
  materials question in step 1.
- ESPR questions are only shown if the company answered **Ja** to the ESPR
  question in step 1.
- Any EU rule that the company switched off in step 1 is always hidden.

**How to test:** go to step 1 in the tool, choose a company size and roles
that should see the question, then go to step 2 and check that it is there.
Then choose a profile that should **not** see it and check that it is gone.

---

## 5. Change or add an LCA question

**File:** `js/data.js`

The LCA questions are at the **end** of `js/data.js`, after the line
`const LCA_QUESTIONS = [`. They are simpler than the other questions because
every company sees all of them:

```js
  {
    "id": "L18",
    "field": "Sachbilanz",
    "text": "In welchem Umfang liegen für das Hintergrundsystem Daten vor?"
  },
```

- To **change** one: follow [recipe 1](#1-change-the-text-of-a-question).
- To **add** one: follow [recipe 2](#2-add-a-new-question). Give it a new
  number such as `"L30"`.
- To **remove** one: follow [recipe 3](#3-remove-a-question).

Note: here the `"text"` line is the **last** line of each question. In the
file it has no comma at the end, but adding one would not hurt either.

---

## 6. Change the meaning of the numbers 0 to 4

**File:** `js/data.js`, near the top, in the part that starts with `const SCALE = [`.

```js
  {
    "score": 2,
    "label": "teilweise erfüllt"
  },
```

Change only the text after `"label":`. Do **not** change the `"score"`
numbers, because the result calculation depends on them.

This text is shown above the questions and when you move the mouse over a
number button.

---

## 7. Change the full name of an EU rule

**File:** `js/data.js`, at the very top, in the part that starts with `const REGULATIONS = {`.

```js
  "EUDR": {
    "name": "EUDR",
    "fullName": "Verordnung (EU) 2023/1115 (Entwaldungsverordnung)"
  },
```

Change only the text after `"fullName":`. Leave the short names (`"EUDR"`) as
they are, because the questions use them to find their EU rule.

---

## 8. Change the color bands of the results

**File:** `js/charts.js`, near the top.

The results are colored by how good they are. This is set here:

```js
const STATUS_BANDS = [
  { key: "critical", min: 0, max: 25, label: "Hoher Handlungsbedarf" },
  { key: "serious", min: 25, max: 50, label: "Handlungsbedarf" },
  { key: "warning", min: 50, max: 75, label: "Ausbaufähig" },
  { key: "good", min: 75, max: 101, label: "Weitgehend erfüllt" },
];
```

| Part | What it means |
|------|---------------|
| `key` | The color: `critical` = red, `serious` = orange, `warning` = yellow, `good` = green. Do not change these words. |
| `min` and `max` | The percentage range. `min: 0, max: 25` means "from 0% up to (but not including) 25%". |
| `label` | The words shown next to the result. You can change these freely. |

**Example:** to make green start at 80% instead of 75%, change the `75` in the
`warning` line **and** the `75` in the `good` line to `80`. The `max` of one
line must always be the same number as the `min` of the next line.
Keep `max: 101` in the last line (so that 100% is included).

The text "Noch nicht bewertet" (not yet rated) is a few lines further down in
the same file, if you want to change it too.

---

## 9. Change the colors of the page

**File:** `css/style.css`, near the top, in the part that starts with `:root {`.

Colors are written as a `#` followed by six letters and numbers, for example
`#1c5cab` (a blue). You can find the code for any color by searching for
"color picker" on Google.

| Line | What it colors |
|------|----------------|
| `--brand: #1c5cab;` | The main blue: buttons, links, the line at the very top. |
| `--brand-hover: #184f95;` | The same blue, a bit darker, when the mouse is on a button. |
| `--brand-wash: #eaf1fa;` | A very light version of the blue for backgrounds. |
| `--status-good: #0ca30c;` | Green for good results. |
| `--status-warning: #c98500;` | Yellow for medium results. |
| `--status-serious: #c65a35;` | Orange for weak results. |
| `--status-critical: #d03b3b;` | Red for very weak results. |
| `--page-plane: #f9f9f7;` | The background of the page. |
| `--text-primary: #0b0b0b;` | The color of normal text. |

Change only the code between `:` and `;`. Keep the `#`.

Each status color also has a `-wash` line (for example `--status-good-wash`).
That is the light background behind the label. If you change a status color,
it looks best if you also pick a very light version of it for its `-wash`.

---

## 10. Change the title and header text

**File:** `index.html`

| What you see | Where to find it in the file |
|--------------|------------------------------|
| The name in the browser tab | between `<title>` and `</title>` |
| The small line above the big title ("Regulatorisches Self-Assessment") | the line with `class="masthead-kicker"` |
| The big title ("Readiness-Tool") | between `<h1>` and `</h1>` |
| The sentence under the title | the line with `class="subtitle"` |
| The small text at the bottom of the page | between `<footer` and `</footer>`, inside `<p>` and `</p>` |
| The button names "Export (JSON)", "Import (JSON)", "Zurücksetzen" | the lines that start with `<button` |

Only change the words **between** the `>` and the `<`. For example:

```html
<h1>Readiness-Tool</h1>
```
can become
```html
<h1>Readiness-Check 2026</h1>
```

Do not change anything inside the `< >` signs.

---

## 11. Change the names of the four steps

**File:** `js/app.js`, near the very top.

```js
const STEP_LABELS = {
  profile: "Unternehmensprofil",
  regulatory: "Regulatorische Bewertung",
  lca: "LCA Readiness",
  dashboard: "Dashboard",
};
```

Change only the words in quote marks on the right. Do not change the words
on the left (`profile`, `regulatory`, `lca`, `dashboard`).

Other German sentences on the pages (for example the info box in step 1 or
the buttons "Weiter" and "Zurück") are also in `js/app.js`. Search for the
sentence you see on the screen, then change the words between the quote
marks in the same careful way.

---

## 12. Change the profile questions in step 1

**File:** `js/app.js`, in the part that starts with `function regulationSection`.

Here you can change the **wording** of the yes/no questions in step 1, for
example:

```js
"Handeln Sie mit relevanten Rohstoffen (Rinder, Kakao, Kautschuk, Soja, Ölpalme, Kaffee, Holz)?",
```

Search for the sentence and change the words between the quote marks.

**Changing the list of roles** (for example adding a new PPWR role) is
possible in `js/data.js` (`PPWR_ROLE_LABELS` and `ESPR_ROLE_LABELS`), but
then the role must also be added to the questions that should use it (see
[recipe 4](#4-change-which-companies-see-a-question)). If you rename an
existing role, you must also rename it in **every** question that uses it.
This is a bigger change, so ask a programmer if you are unsure.

---

## Something went wrong

### The page is empty, or the questions are missing

This almost always means there is a small typing mistake in the file you
changed. Check these things, in this order:

1. **A missing comma.** Every line inside a question ends with a comma.
   Between two questions there must be `},`.
2. **A missing quote mark.** Every text needs a `"` at the start and at the end.
3. **A `"` inside the text.** Replace it with `„ “` or `' '`.
4. **A deleted bracket.** Every `{` needs a `}` and every `[` needs a `]`.
5. **Two commas in a row** (`,,`). Delete one of them.

**Let the browser tell you where the mistake is:**

1. Open the tool in **Chrome** or **Edge**.
2. Press **F12** (on a Mac: **Cmd + Option + J**). A panel opens.
3. Click the tab **Console**.
4. A red message shows the file name and the **line number** of the
   mistake, for example `data.js:245`. Look at that line and the line just
   before it.

### Go back to the old version

- **If you made a backup copy:** delete the changed file and put the copy back.
- **If you edited on GitHub:**
  1. Open the file on GitHub.
  2. Click **History** (top right of the file).
  3. Find the version from before your change and click on it.
  4. Click the **...** button and choose **View file**.
  5. Copy all the text, then edit the current file (pencil icon), replace
     everything with the copied text, and click **Commit changes**.

### The page looks strange or shows old answers

Click the red **Zurücksetzen** (reset) button at the top right. The tool
then forgets all saved answers and starts fresh.

### I changed a question number and the old answer is gone

That is normal. Answers are stored by question number. If a number changes,
the tool treats it as a new question. Try to keep the numbers stable once
companies have started filling in the tool.

---

## Things that need a programmer

These changes are possible, but they need changes in several files and some
programming knowledge:

- Adding a **completely new EU rule** (a fifth one next to EUDR, CSDDD, PPWR, ESPR).
- Adding a **new question to step 1** (the company profile).
- Changing **how the result is calculated** (today: the average of all
  answered questions, shown as a percentage).
- Changing the **layout** of the pages.

To understand what each part of the code does, read
[HOW-THE-CODE-WORKS.md](HOW-THE-CODE-WORKS.md). For a programmer, the file
[TECHNICAL-NOTES.md](TECHNICAL-NOTES.md) explains why the tool was built this way.

---

## Small dictionary of words

| Word | Simple meaning |
|------|----------------|
| Browser | The program you use for websites: Chrome, Firefox, Edge or Safari. |
| File | One document in the folder, like `data.js`. |
| `.html` file | The page you open in the browser. |
| `.js` file (JavaScript) | A file with instructions for the browser. Our questions are stored in one of these. |
| `.css` file | A file that says how the page looks (colors, sizes). |
| `.md` file (Markdown) | A text file like this guide. GitHub shows it nicely formatted. |
| JSON | A simple text format for saving data. The Export button makes a JSON file. |
| GitHub | The website where this project is stored. It also keeps every old version. |
| Commit | Saving a change on GitHub, together with a short note about what you changed. |
| Refresh | Loading the page again so you see the newest version (F5 or Cmd + R). |
| Quote marks | The `"` signs around a text. |
| Brackets | The signs `{ }` and `[ ]`. They always come in pairs. |
| KMU | Small and medium sized company (German: kleine und mittlere Unternehmen). |
| Nicht-KMU | Large company. |
