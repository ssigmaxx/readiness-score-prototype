// Application state: company profile + answers, persisted to localStorage as a
// per-viewer convenience (autosave of in-progress work) and exportable/importable
// as a plain JSON file, which is also how it moves between machines. Nothing
// here is ever sent anywhere: there is no network call in this app at all.

const STORAGE_KEY = "readiness-tool-state-v1";

function defaultProfile() {
  const profile = {
    companySize: null, // "KMU" | "Nicht-KMU"
    eudrRole: null, // one of EUDR_ROLE_OPTIONS
    eudrRawMaterials: null, // true/false
    csddd: null, // true/false
    ppwrRoleLabels: {}, // { "Erzeuger": true, ... }
    esprApplies: null, // true/false
    esprRoleLabels: {},
    wantedRegulations: { EUDR: true, CSDDD: true, PPWR: true, ESPR: true },
  };
  PPWR_ROLE_LABELS.forEach((l) => (profile.ppwrRoleLabels[l] = false));
  ESPR_ROLE_LABELS.forEach((l) => (profile.esprRoleLabels[l] = false));
  return profile;
}

function freshState() {
  return {
    companyName: "",
    profile: defaultProfile(),
    answers: {}, // { questionId: score(0-4) }
    lcaAnswers: {}, // { questionId: score(0-4) }
  };
}

let appState = freshState();

function deriveActiveRoleKeys(profile) {
  profile.activePpwrRoleKeys = buildActiveRoleKeys("PPWR", PPWR_ROLE_LABELS, profile.ppwrRoleLabels);
  profile.activeEsprRoleKeys = buildActiveRoleKeys("ESPR", ESPR_ROLE_LABELS, profile.esprRoleLabels);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    // Private browsing / blocked storage: state simply won't survive a reload.
    // The Export button remains the reliable way to keep work.
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    appState = Object.assign(freshState(), parsed);
    appState.profile = Object.assign(defaultProfile(), parsed.profile || {});
    return true;
  } catch (e) {
    return false;
  }
}

function exportStateToFile() {
  deriveActiveRoleKeys(appState.profile);
  const exportable = {
    companyName: appState.companyName,
    profile: appState.profile,
    answers: appState.answers,
    lcaAnswers: appState.lcaAnswers,
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(exportable, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const namePart = (appState.companyName || "readiness").replace(/[^a-z0-9_-]+/gi, "_");
  a.href = url;
  a.download = `${namePart}_readiness-export.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importStateFromFile(file, onDone) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      appState = Object.assign(freshState(), parsed);
      appState.profile = Object.assign(defaultProfile(), parsed.profile || {});
      saveState();
      onDone(true);
    } catch (e) {
      onDone(false);
    }
  };
  reader.onerror = () => onDone(false);
  reader.readAsText(file);
}
