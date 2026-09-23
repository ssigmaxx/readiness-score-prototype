// Score-status coding + a small set of HTML/SVG chart primitives for the dashboard.
// No charting library is loaded from a CDN on purpose: this file (and the whole
// app) has to keep working when opened with no internet connection at all.
//
// Status colors follow a fixed, non-themed four-band scale (good / warning /
// serious / critical) and are never reused as decoration — every colored meter
// carries a text status label beside it, so meaning never rests on hue alone.

const STATUS_BANDS = [
  { key: "critical", min: 0, max: 25, label: "Hoher Handlungsbedarf" },
  { key: "serious", min: 25, max: 50, label: "Handlungsbedarf" },
  { key: "warning", min: 50, max: 75, label: "Ausbaufähig" },
  { key: "good", min: 75, max: 101, label: "Weitgehend erfüllt" },
];

function statusForPct(pct) {
  if (pct === null || pct === undefined) {
    return { key: "neutral", label: "Noch nicht bewertet" };
  }
  const band = STATUS_BANDS.find((b) => pct >= b.min && pct < b.max) || STATUS_BANDS[STATUS_BANDS.length - 1];
  return { key: band.key, label: band.label };
}

function statusChipHTML(status) {
  return `<span class="status-chip status-${status.key}"><span class="status-chip-dot"></span>${status.label}</span>`;
}

// rows: [{ label, pct (0-100 or null), answeredCount, total }]
function renderMeterList(container, rows) {
  container.innerHTML = "";
  const list = document.createElement("div");
  list.className = "meter-list";

  rows.forEach((row) => {
    const status = statusForPct(row.pct);
    const item = document.createElement("div");
    item.className = "meter-row";

    const top = document.createElement("div");
    top.className = "meter-row-top";
    top.innerHTML = `
      <span class="meter-row-label">${row.label}</span>
      <span class="meter-row-right">
        ${row.pct === null ? "" : `<span class="meter-row-pct">${Math.round(row.pct)}%</span>`}
        ${statusChipHTML(status)}
      </span>
    `;

    const track = document.createElement("div");
    track.className = "meter-track";
    const fill = document.createElement("div");
    fill.className = `meter-fill status-${status.key}`;
    fill.style.width = `${row.pct === null ? 0 : Math.max(0, Math.min(100, row.pct))}%`;
    track.appendChild(fill);

    const sub = document.createElement("div");
    sub.className = "meter-row-sub";
    sub.textContent = `${row.answeredCount} von ${row.total} Fragen beantwortet`;

    item.appendChild(top);
    item.appendChild(track);
    item.appendChild(sub);
    list.appendChild(item);
  });

  container.appendChild(list);
}

function svgEl(tag, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// A single hero score as a ring gauge, colored by status band.
function renderDonut(container, value, opts) {
  opts = opts || {};
  const size = 148;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = value === null ? 0 : Math.max(0, Math.min(100, value));
  const offset = c - (c * pct) / 100;
  const status = statusForPct(value);

  const svg = svgEl("svg", { viewBox: `0 0 ${size} ${size}`, width: size, height: size });
  const track = svgEl("circle", {
    cx: size / 2,
    cy: size / 2,
    r,
    class: "donut-track",
    "stroke-width": stroke,
    fill: "none",
  });
  const fill = svgEl("circle", {
    cx: size / 2,
    cy: size / 2,
    r,
    class: `donut-fill status-${status.key}`,
    "stroke-width": stroke,
    fill: "none",
    "stroke-dasharray": c,
    "stroke-dashoffset": value === null ? c : offset,
    "stroke-linecap": "round",
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
  });
  svg.appendChild(track);
  svg.appendChild(fill);

  const text = svgEl("text", { x: size / 2, y: size / 2 + 8, class: "donut-label" });
  text.textContent = value === null ? "—" : `${Math.round(pct)}%`;
  svg.appendChild(text);

  container.innerHTML = "";
  container.appendChild(svg);
  return status;
}
