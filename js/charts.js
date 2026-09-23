// Minimal, dependency-free inline SVG chart helpers for the dashboard.
// No charting library is loaded from a CDN on purpose: this file (and the whole
// app) has to keep working when opened with no internet connection at all.

function svgEl(tag, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// rows: [{ label, pct (0-100), sub }]
function renderBarChart(container, rows, opts) {
  opts = opts || {};
  const barHeight = 22;
  const gap = 14;
  const labelWidth = opts.labelWidth || 220;
  const chartWidth = opts.width || 460;
  const barAreaWidth = chartWidth - labelWidth - 50;
  const height = rows.length * (barHeight + gap) + gap;

  const svg = svgEl("svg", {
    viewBox: `0 0 ${chartWidth} ${height}`,
    width: "100%",
    height,
    role: "img",
    "aria-label": opts.ariaLabel || "Readiness chart",
  });

  rows.forEach((row, i) => {
    const y = gap + i * (barHeight + gap);
    const label = svgEl("text", {
      x: 0,
      y: y + barHeight / 2 + 4,
      class: "chart-label",
    });
    label.textContent = row.label;
    svg.appendChild(label);

    const track = svgEl("rect", {
      x: labelWidth,
      y,
      width: barAreaWidth,
      height: barHeight,
      class: "chart-track",
      rx: 4,
    });
    svg.appendChild(track);

    const pct = Math.max(0, Math.min(100, row.pct));
    const fill = svgEl("rect", {
      x: labelWidth,
      y,
      width: (barAreaWidth * pct) / 100,
      height: barHeight,
      class: "chart-fill",
      rx: 4,
    });
    svg.appendChild(fill);

    const pctLabel = svgEl("text", {
      x: labelWidth + barAreaWidth + 8,
      y: y + barHeight / 2 + 4,
      class: "chart-pct",
    });
    pctLabel.textContent = `${Math.round(pct)}%`;
    svg.appendChild(pctLabel);
  });

  container.innerHTML = "";
  container.appendChild(svg);
}

// value: 0-100
function renderDonut(container, value, centerLabel) {
  const size = 160;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - (c * pct) / 100;

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
    class: "donut-fill",
    "stroke-width": stroke,
    fill: "none",
    "stroke-dasharray": c,
    "stroke-dashoffset": offset,
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
  });
  svg.appendChild(track);
  svg.appendChild(fill);

  const text = svgEl("text", { x: size / 2, y: size / 2 + 7, class: "donut-label" });
  text.textContent = centerLabel != null ? centerLabel : `${Math.round(pct)}%`;
  svg.appendChild(text);

  container.innerHTML = "";
  container.appendChild(svg);
}
