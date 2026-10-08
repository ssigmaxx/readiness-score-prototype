# Readiness Tool

This is a small website that helps a company check how well prepared it is
for four EU rules (EUDR, CSDDD, PPWR, ESPR) and for Life Cycle Assessment (LCA).

It replaces the old Excel file (`Readiness_Score.xlsm`). The questions and the
scoring are the same as in the Excel file. Only the "look and feel" is new.

You do **not** need to know programming to use it or to make small changes.
This page explains the basics. When you want to change something, open the
step by step guide:

**[How to change things (step by step guide)](docs/HOW-TO-CHANGE-THINGS.md)**

If you want to understand what each part of the code does, read:

**[How the code works](docs/HOW-THE-CODE-WORKS.md)**

---

## 1. How to open the tool

1. Download this whole folder to your computer.
   (On GitHub: click the green **Code** button, then **Download ZIP**, then unzip it.)
2. Open the folder.
3. Double click the file **`index.html`**.
4. The tool opens in your web browser (Chrome, Firefox, Edge or Safari).

That is all. There is nothing to install, and you do not need the internet.

## 2. How the tool works (in plain words)

The tool has four steps. You can see them at the top of the page.

| Step | Name in the tool | What happens |
|------|------------------|--------------|
| 1 | Unternehmensprofil | The company says who it is: its size and its roles. |
| 2 | Regulatorische Bewertung | The company answers the questions about the EU rules. It only sees the questions that apply to it. |
| 3 | LCA Readiness | The company answers the LCA questions. Everybody sees all of these. |
| 4 | Dashboard | The tool shows the results as percentages and colored bars. |

Every question is answered with a number from **0 to 4**:

| Number | Meaning |
|--------|---------|
| 0 | not met at all |
| 1 | work is planned or has started |
| 2 | partly met |
| 3 | mostly met, small gaps |
| 4 | fully met and well documented |

The result is shown as a percentage. 100% means every answered question got a 4.

## 3. Is the data safe?

Yes. Nothing is ever sent to the internet. All answers stay inside the
browser on the computer that is being used.

- The tool **saves automatically** in the browser, so you can close it and come back.
- The **Export (JSON)** button saves the answers to a file.
  You can keep this file as a backup or send it to another computer.
- The **Import (JSON)** button loads such a file again.
- The **Zurücksetzen** (reset) button deletes all answers and starts fresh.

## 4. What is inside this folder

You do not need to understand all of these files. The table tells you which
ones you might want to change one day.

| File or folder | What it is | Will you change it? |
|----------------|------------|---------------------|
| `index.html` | The main page. Double click it to open the tool. Also holds the page title and the header text. | Sometimes (titles and header text) |
| `js/data.js` | **All the questions**, the 0 to 4 scale, the names of the EU rules and the list of roles. | **Yes, this is the main file to edit** |
| `js/charts.js` | The color bands for the results (for example "below 25% is red"). | Sometimes |
| `css/style.css` | Colors, sizes and fonts (how the page looks). | Rarely |
| `js/app.js` | Builds the pages and buttons. Also has the names of the four steps. | Rarely |
| `js/relevance.js` | Decides which company sees which question. | No |
| `js/state.js` | Saves, exports and imports the answers. | No |
| `fonts/` | The font files (Public Sans). | No |
| `docs/HOW-TO-CHANGE-THINGS.md` | The step by step guide for making changes. | Read it |
| `docs/HOW-THE-CODE-WORKS.md` | Explains what every part of the code does, in simple English. | Read it when you are curious |
| `docs/TECHNICAL-NOTES.md` | Notes for programmers (why things were built this way). | No |

## 5. The three golden rules for making changes

1. **Make a copy first.** Before you change anything, copy the whole folder
   (or the one file) so you can go back if something goes wrong.
2. **Change one thing at a time.** Change it, save it, then refresh the
   browser page (press **F5**, or **Cmd + R** on a Mac) and check it still works.
3. **Only change the text between the quote marks `" "`.** Do not delete
   commas, brackets or quote marks. Most problems come from a missing comma
   or quote mark.

Now open the **[step by step guide](docs/HOW-TO-CHANGE-THINGS.md)** to see exactly how to
change questions, colors, names and more.

## 6. Need help?

If the page suddenly shows nothing, or looks broken after a change, read the
part called **"Something went wrong"** at the end of the
[step by step guide](docs/HOW-TO-CHANGE-THINGS.md#something-went-wrong).
If you cannot fix it, go back to your copy from golden rule number 1.
