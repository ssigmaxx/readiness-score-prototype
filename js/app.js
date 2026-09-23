// UI wiring. Plain DOM, no framework, no build step. Open index.html and it runs.

const STEPS = ["profile", "regulatory", "lca", "dashboard"];
const STEP_LABELS = {
  profile: "Unternehmensprofil",
  regulatory: "Regulatorische Bewertung",
  lca: "LCA Readiness",
  dashboard: "Dashboard",
};

let currentStep = "profile";

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node[k] = v;
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  });
  (children || []).forEach((c) => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function groupBy(items, keyFn) {
  const map = new Map();
  items.forEach((item) => {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });
  return map;
}

// Segmented 0–4 control. Short labels stay legible in a compact row; the full
// wording lives in the scale legend at the top of the step and in the title
// attribute, rather than repeated 84 times down the page.
function scalePicker(questionId, currentValue, onChange) {
  const wrap = el("div", { class: "scale-picker", role: "radiogroup", "aria-label": "Bewertung" });
  SCALE.forEach((s) => {
    const inputId = `scale-${questionId}-${s.score}`;
    const input = el("input", {
      type: "radio",
      name: `scale-${questionId}`,
      id: inputId,
      title: s.label,
      onchange: () => onChange(s.score),
    });
    input.checked = currentValue === s.score;
    const label = el("label", { for: inputId, title: s.label }, [String(s.score)]);
    wrap.appendChild(el("div", { class: "scale-picker-option" }, [input, label]));
  });
  return wrap;
}

function scaleLegend() {
  const wrap = el("div", { class: "scale-legend" }, [
    el("span", {}, ["Bewertungsskala:"]),
  ]);
  SCALE.forEach((s) => {
    wrap.appendChild(el("span", { class: "scale-legend-item" }, [el("b", {}, [String(s.score)]), ` ${s.label}`]));
  });
  return wrap;
}

// A slim progress bar + "answered / total" counter, kept live via the
// returned update() function rather than re-rendering the whole (often long)
// question list on every click.
function renderProgressSummary(container, label) {
  const fill = el("div", { class: "progress-summary-fill" });
  const track = el("div", { class: "progress-summary-track" }, [fill]);
  const count = el("span", { class: "progress-summary-count" });
  container.appendChild(
    el("div", { class: "progress-summary" }, [el("span", { class: "progress-summary-label" }, [label]), track, count])
  );
  return {
    update(stats) {
      const pct = stats.total === 0 ? 0 : (stats.answeredCount / stats.total) * 100;
      fill.style.width = `${pct}%`;
      count.textContent = `${stats.answeredCount} / ${stats.total} beantwortet`;
    },
  };
}

function sectionBadge() {
  const badge = el("span", { class: "section-badge" });
  return {
    el: badge,
    update(stats) {
      badge.textContent = `${stats.answeredCount} / ${stats.total}`;
      badge.classList.toggle("is-complete", stats.total > 0 && stats.answeredCount === stats.total);
    },
  };
}

// ---------- Step: Profile ----------

function renderProfileStep(container) {
  const p = appState.profile;
  container.innerHTML = "";

  container.appendChild(
    el("div", { class: "intro-note" }, [
      el("span", { class: "intro-note-icon" }, ["i"]),
      el("span", {}, [
        "Alle Angaben verbleiben ausschließlich in diesem Browser (lokaler Zwischenspeicher). Es findet keine Übertragung an einen Server statt. Nutzen Sie „Export (JSON)“, um Ihren Stand zu sichern oder auf einem anderen Gerät fortzusetzen.",
      ]),
    ])
  );

  container.appendChild(
    el("div", { class: "field-row" }, [
      el("label", {}, ["Unternehmensname (nur für Ihre eigene Ablage/Export, bleibt lokal)"]),
      el("input", {
        type: "text",
        value: appState.companyName || "",
        oninput: (e) => {
          appState.companyName = e.target.value;
          saveState();
        },
      }),
    ])
  );

  container.appendChild(
    el("div", { class: "field-row" }, [
      el("label", {}, ["Unternehmensgröße gemäß EU-Definition"]),
      el("div", { class: "radio-group" }, [
        radioOption("companySize", "KMU", p.companySize === "KMU", (v) => {
          p.companySize = v;
          saveState();
          renderProfileStep(container);
        }),
        radioOption("companySize", "Nicht-KMU", p.companySize === "Nicht-KMU", (v) => {
          p.companySize = v;
          saveState();
          renderProfileStep(container);
        }),
      ]),
    ])
  );

  container.appendChild(regulationSection(container));

  renderContinueBar(container, "regulatory");
}

function radioOption(name, value, checked, onSelect) {
  const id = `${name}-${value}`;
  const input = el("input", {
    type: "radio",
    name,
    id,
    onchange: () => onSelect(value),
  });
  input.checked = checked;
  return el("label", { class: "radio-option", for: id }, [input, ` ${value}`]);
}

function toggleWanted(container, regulation, checked) {
  appState.profile.wantedRegulations[regulation] = checked;
  saveState();
  renderProfileStep(container);
}

function regulationSection(profileContainer) {
  const p = appState.profile;
  const wrap = el("div", { class: "regulation-sections" });

  // EUDR
  wrap.appendChild(
    regBlock("EUDR", p.wantedRegulations.EUDR, profileContainer, [
      selectRow("Rolle gemäß EUDR", EUDR_ROLE_OPTIONS, p.eudrRole, (v) => {
        p.eudrRole = v;
        saveState();
      }),
      yesNoRow(
        "Handeln Sie mit relevanten Rohstoffen (Rinder, Kakao, Kautschuk, Soja, Ölpalme, Kaffee, Holz)?",
        p.eudrRawMaterials,
        (v) => {
          p.eudrRawMaterials = v;
          saveState();
        }
      ),
    ])
  );

  // CSDDD
  wrap.appendChild(
    regBlock("CSDDD", p.wantedRegulations.CSDDD, profileContainer, [
      yesNoRow(
        "Ist Ihr Unternehmen Zulieferer/Geschäftspartner eines Unternehmens, das der CSDDD unterliegt oder unterliegen wird?",
        p.csddd,
        (v) => {
          p.csddd = v;
          saveState();
        }
      ),
    ])
  );

  // PPWR
  wrap.appendChild(
    regBlock("PPWR", p.wantedRegulations.PPWR, profileContainer, [
      roleCheckboxRow("Rolle(n) als Wirtschaftsakteur gemäß PPWR", PPWR_ROLE_LABELS, p.ppwrRoleLabels),
    ])
  );

  // ESPR
  wrap.appendChild(
    regBlock("ESPR", p.wantedRegulations.ESPR, profileContainer, [
      yesNoRow("Betreffen Ihre Produkte den Anwendungsbereich der ESPR (Art. 1 Abs. 2)?", p.esprApplies, (v) => {
        p.esprApplies = v;
        saveState();
      }),
      roleCheckboxRow("Rolle(n) als Wirtschaftsakteur gemäß ESPR", ESPR_ROLE_LABELS, p.esprRoleLabels),
    ])
  );

  return wrap;
}

function regBlock(regulation, wanted, profileContainer, contentRows) {
  const header = el("div", { class: "reg-block-header" }, [
    el("label", { class: "toggle-chip" }, [
      (() => {
        const cb = el("input", {
          type: "checkbox",
          onchange: (e) => toggleWanted(profileContainer, regulation, e.target.checked),
        });
        cb.checked = wanted;
        return cb;
      })(),
      ` ${regulation} relevant für uns`,
    ]),
    el("span", { class: "reg-fullname" }, [REGULATIONS[regulation].fullName]),
  ]);
  const body = el("div", { class: wanted ? "reg-block-body" : "reg-block-body is-disabled" }, contentRows);
  return el("div", { class: wanted ? "reg-block is-enabled" : "reg-block" }, [header, body]);
}

function selectRow(labelText, options, current, onChange) {
  const select = el("select", { onchange: (e) => onChange(e.target.value || null) });
  select.appendChild(el("option", { value: "" }, ["Bitte wählen"]));
  options.forEach((o) => {
    const opt = el("option", { value: o }, [o]);
    if (current === o) opt.selected = true;
    select.appendChild(opt);
  });
  return el("div", { class: "field-row" }, [el("label", {}, [labelText]), select]);
}

function yesNoRow(labelText, current, onChange) {
  return el("div", { class: "field-row" }, [
    el("label", {}, [labelText]),
    el("div", { class: "radio-group" }, [
      radioOption(labelText, "ja", current === true, () => onChange(true)),
      radioOption(labelText, "nein", current === false, () => onChange(false)),
    ]),
  ]);
}

function roleCheckboxRow(labelText, labels, stateObj) {
  const boxes = labels.map((l) => {
    const cb = el("input", {
      type: "checkbox",
      onchange: (e) => {
        stateObj[l] = e.target.checked;
        saveState();
      },
    });
    cb.checked = !!stateObj[l];
    return el("label", { class: "checkbox-option" }, [cb, ` ${l}`]);
  });
  return el("div", { class: "field-row" }, [el("label", {}, [labelText]), el("div", { class: "checkbox-grid" }, boxes)]);
}

// ---------- Step: Regulatory questions ----------

function renderRegulatoryStep(container) {
  container.innerHTML = "";
  deriveActiveRoleKeys(appState.profile);
  const relevant = relevantQuestions(QUESTIONS, appState.profile);

  if (relevant.length === 0) {
    container.appendChild(
      el("p", { class: "empty-hint" }, [
        "Für Ihr aktuelles Unternehmensprofil ist aktuell keine Anforderung relevant. Prüfen Sie Schritt 1 (Unternehmensprofil).",
      ])
    );
    renderContinueBar(container, "lca", "profile");
    return;
  }

  container.appendChild(scaleLegend());

  const overallSummary = renderProgressSummary(container, "Fortschritt");
  const updateOverall = () => overallSummary.update(scoreStats(relevant, appState.answers));
  updateOverall();

  const byRegulation = groupBy(relevant, (q) => q.regulation);
  byRegulation.forEach((questions, regulation) => {
    const badge = sectionBadge();
    const section = el("div", { class: "section-block" }, [
      el("div", { class: "section-header" }, [
        el("h3", { class: "section-title" }, [`${regulation}: ${REGULATIONS[regulation].fullName}`]),
        badge.el,
      ]),
    ]);
    const updateBadge = () => badge.update(scoreStats(questions, appState.answers));
    updateBadge();

    const byField = groupBy(questions, (q) => q.field);
    byField.forEach((fieldQuestions, field) => {
      section.appendChild(el("h4", { class: "field-title" }, [field]));
      fieldQuestions.forEach((q) =>
        section.appendChild(
          questionRow(q, appState.answers, () => {
            updateBadge();
            updateOverall();
          })
        )
      );
    });
    container.appendChild(section);
  });

  renderContinueBar(container, "lca", "profile");
}

function questionRow(q, answerMap, onAnswer) {
  return el("div", { class: "question-row" }, [
    el("div", { class: "question-id" }, [q.id]),
    el("div", { class: "question-text" }, [q.text]),
    scalePicker(q.id, answerMap[q.id], (val) => {
      answerMap[q.id] = val;
      saveState();
      if (onAnswer) onAnswer();
    }),
  ]);
}

// ---------- Step: LCA ----------

function renderLcaStep(container) {
  container.innerHTML = "";
  container.appendChild(
    el("p", { class: "step-intro" }, [
      "Diese Bewertung ist unabhängig vom Unternehmensprofil. Sie deckt die Reife Ihrer Ökobilanzierung (LCA) durchgehend ab.",
    ])
  );
  container.appendChild(scaleLegend());

  const overallSummary = renderProgressSummary(container, "Fortschritt");
  const updateOverall = () => overallSummary.update(scoreStats(LCA_QUESTIONS, appState.lcaAnswers));
  updateOverall();

  const byField = groupBy(LCA_QUESTIONS, (q) => q.field);
  byField.forEach((fieldQuestions, field) => {
    const badge = sectionBadge();
    const section = el("div", { class: "section-block" }, [
      el("div", { class: "section-header" }, [el("h3", { class: "section-title" }, [field]), badge.el]),
    ]);
    const updateBadge = () => badge.update(scoreStats(fieldQuestions, appState.lcaAnswers));
    updateBadge();

    fieldQuestions.forEach((q) =>
      section.appendChild(
        questionRow(q, appState.lcaAnswers, () => {
          updateBadge();
          updateOverall();
        })
      )
    );
    container.appendChild(section);
  });

  renderContinueBar(container, "dashboard", "regulatory");
}

// ---------- Step: Dashboard ----------

function scoreStats(questions, answerMap) {
  const answered = questions.filter((q) => answerMap[q.id] !== undefined);
  const total = questions.length;
  if (answered.length === 0) return { pct: null, answeredCount: 0, total };
  const sum = answered.reduce((acc, q) => acc + answerMap[q.id], 0);
  const pct = (sum / (answered.length * 4)) * 100;
  return { pct, answeredCount: answered.length, total };
}

function statTile(label, stats) {
  const status = statusForPct(stats.pct);
  const tile = el("div", { class: "stat-tile" }, [
    el("div", { class: "stat-tile-label" }, [label]),
    el("div", { class: "stat-tile-value" }, [stats.pct === null ? "–" : `${Math.round(stats.pct)}%`]),
  ]);
  const sub = el("div", { class: "stat-tile-sub" });
  sub.innerHTML = `${statusChipHTML(status)}<br>${stats.answeredCount} von ${stats.total} Fragen beantwortet`;
  tile.appendChild(sub);
  return tile;
}

function renderDashboardStep(container) {
  container.innerHTML = "";
  deriveActiveRoleKeys(appState.profile);
  const relevant = relevantQuestions(QUESTIONS, appState.profile);

  const overallQuestions = relevant.concat(LCA_QUESTIONS);
  const overallAnswers = Object.assign({}, appState.answers, appState.lcaAnswers);
  const overall = scoreStats(overallQuestions, overallAnswers);
  const regulatoryStats = scoreStats(relevant, appState.answers);
  const lcaStats = scoreStats(LCA_QUESTIONS, appState.lcaAnswers);

  const reportMeta = el("div", { class: "report-meta" }, [
    `${appState.companyName ? appState.companyName + ": " : ""}Readiness-Auswertung vom ${new Date().toLocaleDateString("de-DE")}`,
  ]);
  container.appendChild(reportMeta);

  const grid = el("div", { class: "dashboard-stat-grid" }, [
    statTile("Gesamt-Readiness", overall),
    statTile("Regulatorische Bewertung", regulatoryStats),
    statTile("LCA Readiness", lcaStats),
  ]);
  container.appendChild(grid);

  if (relevant.length > 0) {
    container.appendChild(el("h3", { class: "dashboard-section-title" }, ["Regularien nach Bereich"]));
    const byRegulation = groupBy(relevant, (q) => q.regulation);
    const rows = [];
    byRegulation.forEach((qs, regulation) => {
      const stats = scoreStats(qs, appState.answers);
      rows.push({ label: `${regulation}: ${REGULATIONS[regulation].fullName}`, pct: stats.pct, answeredCount: stats.answeredCount, total: stats.total });
    });
    const chartContainer = el("div", { class: "chart-container" });
    container.appendChild(chartContainer);
    renderMeterList(chartContainer, rows);

    container.appendChild(el("h3", { class: "dashboard-section-title" }, ["Regularien nach Handlungsfeld"]));
    const byField = groupBy(relevant, (q) => `${q.regulation}: ${q.field}`);
    const fieldRows = [];
    byField.forEach((qs, label) => {
      const stats = scoreStats(qs, appState.answers);
      fieldRows.push({ label, pct: stats.pct, answeredCount: stats.answeredCount, total: stats.total });
    });
    const fieldChartContainer = el("div", { class: "chart-container" });
    container.appendChild(fieldChartContainer);
    renderMeterList(fieldChartContainer, fieldRows);
  } else {
    container.appendChild(el("p", { class: "empty-hint" }, ["Keine Regularie ist für Ihr Profil als relevant markiert."]));
  }

  container.appendChild(el("h3", { class: "dashboard-section-title" }, ["LCA Readiness nach Handlungsfeld"]));
  const lcaByField = groupBy(LCA_QUESTIONS, (q) => q.field);
  const lcaRows = [];
  lcaByField.forEach((qs, field) => {
    const stats = scoreStats(qs, appState.lcaAnswers);
    lcaRows.push({ label: field, pct: stats.pct, answeredCount: stats.answeredCount, total: stats.total });
  });
  const lcaChartContainer = el("div", { class: "chart-container" });
  container.appendChild(lcaChartContainer);
  renderMeterList(lcaChartContainer, lcaRows);

  const actions = el("div", { class: "dashboard-actions" }, [
    el("button", { class: "btn", onclick: () => window.print() }, ["Als PDF drucken / exportieren"]),
  ]);
  container.appendChild(actions);

  renderContinueBar(container, null, "lca");
}

// ---------- Navigation shell ----------

function renderContinueBar(container, nextStep, prevStep) {
  const bar = el("div", { class: "continue-bar" });
  if (prevStep) {
    bar.appendChild(el("button", { class: "btn btn-secondary", onclick: () => goToStep(prevStep) }, ["← Zurück"]));
  } else {
    bar.appendChild(el("span", {}));
  }
  if (nextStep) {
    bar.appendChild(el("button", { class: "btn", onclick: () => goToStep(nextStep) }, ["Weiter →"]));
  }
  container.appendChild(bar);
}

function goToStep(step) {
  currentStep = step;
  renderShell();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

// Grid stepper: one "auto" column per step, one "1fr" connector column
// between each pair, so the connecting line always sits at the row's
// vertical center regardless of how long a step's label is.
function renderShell() {
  const nav = document.getElementById("step-nav");
  nav.innerHTML = "";
  const currentIndex = STEPS.indexOf(currentStep);
  const columns = [];

  STEPS.forEach((step, i) => {
    columns.push("auto");
    const state = i < currentIndex ? "is-complete" : i === currentIndex ? "is-active" : "is-upcoming";
    const item = el("div", { class: `step-item ${state}` }, [
      el("button", { class: "step-btn", onclick: () => goToStep(step) }, [
        el("span", { class: "step-dot" }, [i < currentIndex ? "✓" : String(i + 1)]),
        el("span", { class: "step-label" }, [STEP_LABELS[step]]),
      ]),
    ]);
    nav.appendChild(item);
    if (i < STEPS.length - 1) {
      columns.push("1fr");
      nav.appendChild(el("div", { class: `step-connector ${i < currentIndex ? "is-complete" : ""}`.trim() }));
    }
  });
  nav.style.gridTemplateColumns = columns.join(" ");

  const content = document.getElementById("step-content");
  content.innerHTML = "";
  const panel = el("div", { class: "panel" });
  content.appendChild(panel);

  if (currentStep === "profile") renderProfileStep(panel);
  else if (currentStep === "regulatory") renderRegulatoryStep(panel);
  else if (currentStep === "lca") renderLcaStep(panel);
  else if (currentStep === "dashboard") renderDashboardStep(panel);
}

function wireHeaderActions() {
  document.getElementById("export-btn").addEventListener("click", exportStateToFile);
  const importInput = document.getElementById("import-input");
  document.getElementById("import-btn").addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    importStateFromFile(file, (ok) => {
      if (ok) {
        goToStep("profile");
      } else {
        alert("Die Datei konnte nicht gelesen werden. Bitte eine zuvor exportierte JSON-Datei verwenden.");
      }
      importInput.value = "";
    });
  });
  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Alle lokal gespeicherten Eingaben zurücksetzen?")) {
      appState = freshState();
      saveState();
      goToStep("profile");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  wireHeaderActions();
  renderShell();
});
