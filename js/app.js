// UI wiring. Plain DOM, no framework, no build step — open index.html and it runs.

const STEPS = ["profile", "regulatory", "lca", "dashboard"];
const STEP_LABELS = {
  profile: "1. Unternehmensprofil",
  regulatory: "2. Regulatorische Bewertung",
  lca: "3. LCA Readiness",
  dashboard: "4. Dashboard",
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

function scaleSelect(name, currentValue, onChange) {
  const select = el("select", {
    class: "scale-select",
    onchange: (e) => onChange(e.target.value === "" ? null : Number(e.target.value)),
  });
  select.appendChild(el("option", { value: "" }, ["— noch nicht bewertet —"]));
  SCALE.forEach((s) => {
    const opt = el("option", { value: String(s.score) }, [`${s.score} — ${s.label}`]);
    if (currentValue === s.score) opt.selected = true;
    select.appendChild(opt);
  });
  return select;
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

// ---------- Step: Profile ----------

function renderProfileStep(container) {
  const p = appState.profile;
  container.innerHTML = "";

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
  return el("div", { class: "reg-block" }, [header, body]);
}

function selectRow(labelText, options, current, onChange) {
  const select = el("select", { onchange: (e) => onChange(e.target.value || null) });
  select.appendChild(el("option", { value: "" }, ["— bitte wählen —"]));
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

  const byRegulation = groupBy(relevant, (q) => q.regulation);
  byRegulation.forEach((questions, regulation) => {
    container.appendChild(el("h3", { class: "regulation-title" }, [`${regulation} — ${REGULATIONS[regulation].fullName}`]));
    const byField = groupBy(questions, (q) => q.field);
    byField.forEach((fieldQuestions, field) => {
      container.appendChild(el("h4", { class: "field-title" }, [field]));
      fieldQuestions.forEach((q) => container.appendChild(questionRow(q, appState.answers)));
    });
  });

  renderContinueBar(container, "lca", "profile");
}

function questionRow(q, answerMap) {
  const row = el("div", { class: "question-row" }, [
    el("div", { class: "question-id" }, [q.id]),
    el("div", { class: "question-text" }, [q.text]),
  ]);
  row.appendChild(scaleSelect(q.id, answerMap[q.id], (val) => {
    if (val === null) delete answerMap[q.id];
    else answerMap[q.id] = val;
    saveState();
  }));
  return row;
}

// ---------- Step: LCA ----------

function renderLcaStep(container) {
  container.innerHTML = "";
  container.appendChild(
    el("p", { class: "step-intro" }, [
      "Diese Bewertung ist unabhängig vom Unternehmensprofil — sie deckt die Reife Ihrer Ökobilanzierung (LCA) durchgehend ab.",
    ])
  );
  const byField = groupBy(LCA_QUESTIONS, (q) => q.field);
  byField.forEach((fieldQuestions, field) => {
    container.appendChild(el("h4", { class: "field-title" }, [field]));
    fieldQuestions.forEach((q) => container.appendChild(questionRow(q, appState.lcaAnswers)));
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

function renderDashboardStep(container) {
  container.innerHTML = "";
  deriveActiveRoleKeys(appState.profile);
  const relevant = relevantQuestions(QUESTIONS, appState.profile);

  const overallQuestions = relevant.concat(LCA_QUESTIONS);
  const overallAnswers = Object.assign({}, appState.answers, appState.lcaAnswers);
  const overall = scoreStats(overallQuestions, overallAnswers);

  const summaryRow = el("div", { class: "dashboard-summary" });
  const donutWrap = el("div", { class: "donut-wrap" });
  renderDonut(donutWrap, overall.pct || 0, overall.pct === null ? "—" : `${Math.round(overall.pct)}%`);
  summaryRow.appendChild(donutWrap);
  summaryRow.appendChild(
    el("div", { class: "summary-text" }, [
      el("h3", {}, ["Gesamt-Readiness"]),
      el("p", {}, [
        `${overall.answeredCount} von ${overall.total} relevanten Fragen beantwortet (Regularien + LCA).`,
      ]),
    ])
  );
  container.appendChild(summaryRow);

  if (relevant.length > 0) {
    container.appendChild(el("h3", {}, ["Regularien nach Bereich"]));
    const byRegulation = groupBy(relevant, (q) => q.regulation);
    const rows = [];
    byRegulation.forEach((qs, regulation) => {
      const stats = scoreStats(qs, appState.answers);
      rows.push({
        label: `${regulation} (${stats.answeredCount}/${stats.total})`,
        pct: stats.pct || 0,
      });
    });
    const chartContainer = el("div", { class: "chart-container" });
    container.appendChild(chartContainer);
    renderBarChart(chartContainer, rows, { ariaLabel: "Readiness nach Regularie" });

    container.appendChild(el("h3", {}, ["Regularien nach Handlungsfeld"]));
    const byField = groupBy(relevant, (q) => `${q.regulation}: ${q.field}`);
    const fieldRows = [];
    byField.forEach((qs, label) => {
      const stats = scoreStats(qs, appState.answers);
      fieldRows.push({ label: `${label} (${stats.answeredCount}/${stats.total})`, pct: stats.pct || 0 });
    });
    const fieldChartContainer = el("div", { class: "chart-container" });
    container.appendChild(fieldChartContainer);
    renderBarChart(fieldChartContainer, fieldRows, {
      ariaLabel: "Readiness nach Handlungsfeld",
      width: 620,
      labelWidth: 340,
    });
  } else {
    container.appendChild(el("p", { class: "empty-hint" }, ["Keine Regularie ist für Ihr Profil als relevant markiert."]));
  }

  container.appendChild(el("h3", {}, ["LCA Readiness nach Handlungsfeld"]));
  const lcaByField = groupBy(LCA_QUESTIONS, (q) => q.field);
  const lcaRows = [];
  lcaByField.forEach((qs, field) => {
    const stats = scoreStats(qs, appState.lcaAnswers);
    lcaRows.push({ label: `${field} (${stats.answeredCount}/${stats.total})`, pct: stats.pct || 0 });
  });
  const lcaChartContainer = el("div", { class: "chart-container" });
  container.appendChild(lcaChartContainer);
  renderBarChart(lcaChartContainer, lcaRows, { ariaLabel: "LCA Readiness nach Handlungsfeld", width: 620, labelWidth: 340 });

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
  }
  if (nextStep) {
    bar.appendChild(el("button", { class: "btn", onclick: () => goToStep(nextStep) }, ["Weiter →"]));
  }
  container.appendChild(bar);
}

function goToStep(step) {
  currentStep = step;
  renderShell();
}

function renderShell() {
  const nav = document.getElementById("step-nav");
  nav.innerHTML = "";
  STEPS.forEach((step) => {
    const btn = el(
      "button",
      {
        class: step === currentStep ? "step-btn is-active" : "step-btn",
        onclick: () => goToStep(step),
      },
      [STEP_LABELS[step]]
    );
    nav.appendChild(btn);
  });

  const content = document.getElementById("step-content");
  if (currentStep === "profile") renderProfileStep(content);
  else if (currentStep === "regulatory") renderRegulatoryStep(content);
  else if (currentStep === "lca") renderLcaStep(content);
  else if (currentStep === "dashboard") renderDashboardStep(content);
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
