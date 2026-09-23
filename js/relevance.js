// Relevance engine: decides which questions apply to a given company profile.
// This is a single, generic evaluator instead of per-regulation special cases
// (the original VBA hardcoded a separate branch for CSDDD directly against one
// cell — here CSDDD is just another "matrix" condition with an empty role/size
// filter, so no code branch is regulation-specific).

function inList(list, value) {
  // Empty/undefined filter list means "no restriction" (matches the original
  // PrüfeListe/PrüfePPWR/PrüfeESPR behavior: an empty condition passes).
  if (!list || list.length === 0) return true;
  if (!value) return false;
  return list.includes(value);
}

function anyRoleActive(roleKeys, activeRoles) {
  if (!roleKeys || roleKeys.length === 0) return true;
  return roleKeys.some((key) => activeRoles.has(key));
}

function isRegulationWanted(profile, regulation) {
  return profile.wantedRegulations[regulation] !== false;
}

function isQuestionRelevant(question, profile) {
  const rel = question.relevance;

  if (rel.type === "csddd") {
    return isRegulationWanted(profile, "CSDDD") && profile.csddd === true;
  }

  // "matrix" type covers EUDR, PPWR, ESPR alike.
  if (!isRegulationWanted(profile, question.regulation)) return false;

  if (question.regulation === "EUDR") {
    if (profile.eudrRawMaterials !== true) return false;
    if (!inList(rel.eudrRoles, profile.eudrRole)) return false;
    if (!inList(rel.sizes, profile.companySize)) return false;
    return true;
  }

  if (question.regulation === "PPWR") {
    if (!inList(rel.sizes, profile.companySize)) return false;
    if (!anyRoleActive(rel.roles, profile.activePpwrRoleKeys)) return false;
    return true;
  }

  if (question.regulation === "ESPR") {
    if (profile.esprApplies !== true) return false;
    if (!inList(rel.sizes, profile.companySize)) return false;
    if (!anyRoleActive(rel.roles, profile.activeEsprRoleKeys)) return false;
    return true;
  }

  return false;
}

function relevantQuestions(allQuestions, profile) {
  return allQuestions.filter((q) => isQuestionRelevant(q, profile));
}

function buildActiveRoleKeys(prefix, labels, checkedLabels) {
  const set = new Set();
  labels.forEach((label) => {
    if (checkedLabels[label]) set.add(roleKey(prefix, label));
  });
  return set;
}
