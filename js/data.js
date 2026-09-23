// Auto-generated from the source Readiness_Score.xlsm question catalog.
// Do not hand-edit the question text/relevance blocks below — regenerate from source if the catalog changes.

const REGULATIONS = {
  "EUDR": {
    "name": "EUDR",
    "fullName": "Verordnung (EU) 2023/1115 (Entwaldungsverordnung)"
  },
  "CSDDD": {
    "name": "CSDDD",
    "fullName": "Richtlinie (EU) 2024/1760 (Lieferkettensorgfaltspflichten)"
  },
  "PPWR": {
    "name": "PPWR",
    "fullName": "Verordnung (EU) 2025/40 (Verpackungen und Verpackungsabfälle)"
  },
  "ESPR": {
    "name": "ESPR",
    "fullName": "Verordnung (EU) 2024/1781 (Ökodesign nachhaltiger Produkte)"
  }
};

const SCALE = [
  {
    "score": 0,
    "label": "nicht erfüllt"
  },
  {
    "score": 1,
    "label": "Bearbeitung geplant bzw. begonnen"
  },
  {
    "score": 2,
    "label": "teilweise erfüllt"
  },
  {
    "score": 3,
    "label": "größtenteils erfüllt; kleinere Lücken bestehen"
  },
  {
    "score": 4,
    "label": "vollständig erfüllt und nachvollziehbar dokumentiert"
  }
];

const EUDR_ROLE_OPTIONS = ["Marktteilnehmer", "nachgelagerterMarktteilnehmer", "Händler"];

const PPWR_ROLE_LABELS = ["Erzeuger", "Importeur", "Vertreiber", "Endvertreiber/Händler", "Fulfillment-Dienstleister", "Hersteller", "Lieferant/Akteur in der Lieferkette", "Bevollmächtigter", "Nutzer", "Anbieter von Online-Marktplätzen", "Unabhängiger Wirtschaftsakteur"];

const ESPR_ROLE_LABELS = ["Erzeuger", "Importeur", "Vertreiber", "Endvertreiber/Händler", "Fulfillment-Dienstleister", "Hersteller", "Lieferant/Akteur in der Lieferkette", "Bevollmächtigter", "Nutzer", "Anbieter von Online-Marktplätzen", "Unabhängiger Wirtschaftsakteur"];

// Canonical role key = REGULATION_ prefix + label with whitespace stripped.
// (The original VBA tool's Select Case used role keys WITH spaces while the
//  Relevanzlogik sheet stored them WITHOUT spaces, e.g. 'PPWR_Lieferant/Akteur in der Lieferkette'
//  vs 'PPWR_Lieferant/AkteurinderLieferkette' — a silent mismatch that made that role's
//  questions never trigger for the user who picked it. Fixed here by using one consistent slug.)
function roleKey(prefix, label) {
  return prefix + '_' + label.replace(/\s+/g, '');
}

const QUESTIONS = [
  {
    "id": "E1",
    "regulation": "EUDR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang hat das Unternehmen seine Produkte und Rohstoffe systematisch auf EUDR-Relevanz gemäß Anhang I geprüft? (Art. 1, Art. 3, Anhang I)",
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
  {
    "id": "E2",
    "regulation": "EUDR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang sind relevante Produkte mit HS (Harmonisiertes System)-Codes und Rohstoffzuordnungen dokumentiert? (Art. 9)",
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
  {
    "id": "E3",
    "regulation": "EUDR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang sind die Lieferketten relevanter Produkte einschließlich Lieferanten und Produktionsorte systematisch kartiert? (Art. 9)",
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
  {
    "id": "E4",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang sind relevante Produkte bis zum Produktionsbetrieb und zugehöriger Grundstücke rückverfolgbar und die hierfür erforderlichen Herkunftsinformationen (Erzeugerland, Produktionsregion und Geolokalisierungsdaten) dokumentiert? (Art. 9)",
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
  {
    "id": "E5",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang sind für relevante Produkte die erforderlichen Produktinformationen (Beschreibung, Menge, Rohstoffe) systematisch erhoben? (Art. 9)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E6",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang sind Produktionszeitpunkte oder Produktionszeiträume dokumentiert? (Art. 9)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E7",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang sind Informationen (Name, Anschrift, E-Mail-Adresse) aller Unternehmen, Marktteilnehmer oder Händler, die entlang der Lieferkette relevante Erzeugnisse geliefert oder empfangen haben, systematisch erfasst und dokumentiert? (Art. 5, 9)",
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
  {
    "id": "E8",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang sind schlüssige und überprüfbare Nachweise zur Entwaldungsfreiheit der Produkte vorhanden? (Art. 9)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E9",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang sind schlüssige und überprüfbare Nachweise vorhanden, die den Einklang mit den einschlägigen Rechtsvorschriften des Erzeugerlandes bestätigen? (Art. 9)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E10",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang verfügt das Unternehmen über eine strukturierte Methode zur Risikobewertung für relevante Lieferketten? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E11",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang wir die Präsenz von Wäldern berücksichtigt bzw. Entwaldungs- und Waldschädigungsrisiken im Produktionsgebiet bewertet? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E12",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden soziale und menschenrechtliche Risiken im Erzeugungsgebiet, einschließlich der Präsenz indigener Völker, deren Rechte, Landnutzungsansprüche sowie deren Einbindung und Konsultation berücksichtigt? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E13",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang wird die EUDR-Risikoeinstufung von Erzeugerländern und relevanten Regionen (EU-Länderbenchmarking) in der Risikobewertung berücksichtigt? (Art. 10, Art. 29)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E14",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden Governance-Risiken wie Korruption oder Dokumentenfälschung sowie Risiken mangelnder Rechtsdurchsetzung berücksichtigt? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E15",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang wird die Komplexität der Lieferkette in der Risikobewertung berücksichtigt? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E16",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang wird das Risiko der Vermischung mit relevanten Erzeugnissen unbekannter Herkunft bewertet? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E17",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden Hinweise auf mögliche Nichtkonformitäten relevanter Erzeugnisse systematisch identifiziert und bewertet? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E18",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden Informationen aus Zertifizierungssystemen oder Drittverifizierungen in die Risikobewertung integriert, sofern diese die EUDR-Anforderungen unterstützen? (Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E19",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden die Qualität, Zuverlässigkeit und Nachvollziehbarkeit der verfügbaren Informationen und Nachweise zur Herkunft relevanter Rohstoffe bewertet? (Art. 9, Art. 10)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E20",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang verfügt das Unternehmen über Prozesse zur Erfassung und Bewertung begründeter Bedenken Dritter zu möglichen EUDR-Verstößen? (Art. 31)",
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
  {
    "id": "E21",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang verfügt das Unternehmen über definierte Maßnahmen zur Risikominderung bei nicht vernachlässigbarem Risiko? (Art. 11)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E22",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden zusätzliche Informationen, Lieferantenaudits und Verifizierungsmaßnahmen eingesetzt, um identifizierte Risiken zu reduzieren? (Art. 11)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E23",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang werden Lieferanten durch geeignete Maßnahmen bei der Risikoreduzierung unterstützt? (Art. 11)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E24",
    "regulation": "EUDR",
    "field": "Risikomanagement",
    "text": "In welchem Umfang wird die Wirksamkeit der Risikominderungsmaßnahmen überprüft, dokumentiert und nachgewiesen (EUDR-Vorgabe: mind. jährlich), bis nur noch ein vernachlässigbares Risiko besteht? (Art. 11, Art. 2 abs. 26)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E25",
    "regulation": "EUDR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang verfügt das Unternehmen über ein formelles Due-Diligence-System (Modellverfahren für Risikomanagement, Berichterstattung, Aufzeichnungen, interne Kontrolle, Compliance-Management, Benennung eines Compliance-Beauftragten) für EUDR-Compliance? (Art. 8, Art. 11)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E26",
    "regulation": "EUDR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang sind interne Verantwortlichkeiten für EUDR-Compliance (Compliance-Beauftragter auf Führungsebene) klar definiert? (Art. 11, Art. 12)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E27",
    "regulation": "EUDR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang werden Sorgfaltserklärungen (DDS) vor dem Inverkehrbringen relevanter Erzeugnisse erstellt, geprüft und über das EUDR-Informationssystem eingereicht? (Art. 4, 5, 33, Anhang II))",
    "relevance": {
      "type": "matrix",
      "sizes": [
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
  {
    "id": "E28",
    "regulation": "EUDR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang werden EUDR-relevante Informationen und Dokumente systematisch dokumentiert und mindestens fünf Jahre aufbewahrt? (Art. 4, Art. 9)",
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
  {
    "id": "E29",
    "regulation": "EUDR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang wird die Sorgfaltspflichtenregelung (Rahmen mehrerer Verfahren) mindestens jährlich überprüft, bei relevanten neuen Entwicklungen aktualisiert und die Aktualisierung dokumentiert? (Art. 12)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "E30",
    "regulation": "EUDR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang berichtet das Unternehmen öffentlich (jährlich) über seine EUDR-Sorgfaltspflichtregelung und die Umsetzung (falls relevant, abhänging von Unternehmensgröße)? (Art. 12)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "Nicht-KMU"
      ],
      "eudrRoles": [
        "Marktteilnehmer"
      ],
      "roles": null
    }
  },
  {
    "id": "C1",
    "regulation": "CSDDD",
    "field": "Vertragliche Gestaltung & Faire Partnerschaften",
    "text": "In welchem Umfang ist das Unternehmen darauf vorbereitet, vertragliche Zusicherungen zur Einhaltung eines Verhaltenskodex gegenüber großen Kunden abzugeben und diese auch von den eigenen Partnern einzufordern? (Art. 10 Abs. 2 Buchst. b; Art. 11 Abs. 3 Buchst. c)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C2",
    "regulation": "CSDDD",
    "field": "Vertragliche Gestaltung & Faire Partnerschaften",
    "text": "In welchem Umfang stellt das Unternehmen sicher, dass bei Verträgen mit großen Kunden auf faire, angemessene und diskriminierungsfreie Bedingungen bestanden wird, insbesondere um eine einseitige Lastenverteilung zu verhindern? (Art. 10 Abs. 5; Art. 11 Abs. 6)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C3",
    "regulation": "CSDDD",
    "field": "Vertragliche Gestaltung & Faire Partnerschaften",
    "text": "In welchem Umfang ist bekannt, dass bei Überprüfungen (Audits) durch unabhängige Dritte das große Unternehmen die Kosten tragen muss, wenn das geprüfte Unternehmen ein KMU ist? (Art. 10 Abs. 5; Art. 11 Abs. 6)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C4",
    "regulation": "CSDDD",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang kann das Unternehmen notwendige Informationen über seine eigene Aktivitätskette (vorgelagerte Partner) gezielt bereitstellen, wenn diese für die Risikoanalyse des Kunden unerlässlich sind? (Art. 8 Abs. 2a Buchst. b)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C5",
    "regulation": "CSDDD",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang verfügt das Unternehmen über ein System zur mindestens fünfjährigen Aufbewahrung von Belegen über Nachhaltigkeitsmaßnahmen, um die Auskunftsfähigkeit gegenüber Partnern zu sichern? (Art. 5 Abs. 4)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C6",
    "regulation": "CSDDD",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang ist das Unternehmen in der Lage, relevante Informationen bereitzustellen, ohne dabei Geschäftsgeheimnisse zu gefährden, die laut Richtlinie besonders geschützt sind? (Art. 5 Abs. 3)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C7",
    "regulation": "CSDDD",
    "field": "Vertragliche Gestaltung & Faire Partnerschaften",
    "text": "In welchem Umfang ist das Unternehmen bereit, gezielte Unterstützung (z. B. Schulungen, Modernisierung von Managementsystemen) von großen Kunden einzufordern, falls die Einhaltung der Vorgaben die eigene Tragfähigkeit gefährdet? (Art. 10 Abs. 2 Buchst. e; Art. 11 Abs. 3 Buchst. f)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C8",
    "regulation": "CSDDD",
    "field": "Vertragliche Gestaltung & Faire Partnerschaften",
    "text": "In welchem Umfang ist dem Unternehmen bekannt, dass es bei wirtschaftlicher Gefährdung durch die CSDDD-Vorgaben Anspruch auf finanzielle Unterstützung (z. B. direkte Finanzierung oder zinsgünstige Darlehen) durch den verpflichteten Partner hat? (Art. 10 Abs. 2 Buchst. e; Art. 11 Abs. 3 Buchst. f)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "C9",
    "regulation": "CSDDD",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang ist das Unternehmen darauf vorbereitet, sich an gemeinsamen Beschwerdeverfahren von Industrieverbänden oder Kunden zu beteiligen? (Art. 14 Abs. 6)",
    "relevance": {
      "type": "csddd"
    }
  },
  {
    "id": "P1",
    "regulation": "PPWR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang hat das Unternehmen seine spezifischen Rollen als Wirtschaftsakteur (Erzeuger, Importeur, Vertreiber, Fulfillment-Dienstleister etc.) für alle verwendeten Verpackungsarten eindeutig identifiziert? (Art. 3, Art. 15–21)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Vertreiber",
        "PPWR_Endvertreiber/Händler",
        "PPWR_Fulfillment-Dienstleister",
        "PPWR_Hersteller",
        "PPWR_Lieferant/AkteurinderLieferkette",
        "PPWR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "P2",
    "regulation": "PPWR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang hat das Unternehmen sichergestellt, dass es in allen relevanten Mitgliedstaaten, in denen es Verpackungen erstmals bereitstellt, ordnungsgemäß im nationalen Herstellerregister eingetragen ist? (Art. 44 Abs. 2)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger"
      ]
    }
  },
  {
    "id": "P3",
    "regulation": "PPWR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang kommt das Unternehmen seinen finanziellen und organisatorischen Verpflichtungen im Rahmen der erweiterten Herstellerverantwortung (EPR) nach, einschließlich der Abdeckung von Kosten für Kennzeichnung und Abfallerhebungen? (Art. 45 Abs. 1 und Abs. 2 Buchst. a–b)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger"
      ]
    }
  },
  {
    "id": "P4",
    "regulation": "PPWR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang prüft das Unternehmen vor Vertragsschluss mit einem Hersteller, ob dieser ordnungsgemäß im nationalen Herstellerregister eingetragen ist und seine EPR-Pflichten erfüllt? (Art. 45 Abs. 8)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Fulfillment-Dienstleister"
      ]
    }
  },
  {
    "id": "P5",
    "regulation": "PPWR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang verfügt das Unternehmen über Prozesse, um Dienstleistungen für Hersteller zügig auszusetzen, falls diese nachweislich unvollständige oder unrichtige Angaben zur EPR-Registrierung machen? (Art. 45 Abs. 8)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Fulfillment-Dienstleister"
      ]
    }
  },
  {
    "id": "P6",
    "regulation": "PPWR",
    "field": "Governance & Organisation",
    "text": "In welchem Umfang nimmt der Bevollmächtigte für die erweiterte Herstellerverantwortung die Registrierungs- und Berichtspflichten im nationalen Herstellerregister für den vertretenen Hersteller ordnungsgemäß wahr? (Art. 44 Abs. 3, Art. 45 Abs. 3)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "P7",
    "regulation": "PPWR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang prüft das Unternehmen systematisch, dass die Summe der Konzentrationen von Blei, Cadmium, Quecksilber und sechswertigem Chrom in Verpackungen 100 mg/kg nicht überschreitet? (Art. 5 Abs. 4)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P8",
    "regulation": "PPWR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang stellt das Unternehmen sicher, dass Lebensmittelkontaktverpackungen ab dem 12. August 2026 keine PFAS über den festgelegten Grenzwerten enthalten? (Art 5 Abs. 5 Buchst. a-c)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P9",
    "regulation": "PPWR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang hat das Unternehmen die Recyclingfähigkeit seiner Verpackungen gemäß den Kriterien für recyclinggerechte Gestaltung (Design for Recycling) bewertet und in die Leistungsstufen A, B oder C eingestuft? (Art. 6 Abs. 2, Anhang II)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P10",
    "regulation": "PPWR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang stellt das Unternehmen sicher, dass Kunststoffverpackungen die ab 2030 geltenden Mindestrezyklatanteile aus Post-Consumer-Abfällen (z. B. 30 % bei PET-Getränkeflaschen) enthalten? (Art. 7 Abs. 1 Buchst. a-d)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P11",
    "regulation": "PPWR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang wird dokumentiert, dass Gewicht und Volumen der Verpackungen auf das für die Funktionsfähigkeit erforderliche Mindestmaß reduziert sind (unter Ausschluss rein ästhetischer Merkmale wie Doppelwänden)? Art. 10 Abs. 1 und Abs. 2)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P12",
    "regulation": "PPWR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang bereitet das Unternehmen die ab 2028 erforderliche harmonisierte Kennzeichnung zur Materialzusammensetzung (mittels Piktogrammen) auf seinen Verpackungen vor? (Art. 12 Abs. 1)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P13",
    "regulation": "PPWR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang werden wiederverwendbare Verpackungen mit einem QR-Code oder einem anderen digitalen Datenträger versehen, der Informationen über die Wiederverwendbarkeit und Sammelstellen liefert? (Art. 12 Abs. 2)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P14",
    "regulation": "PPWR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang stellt das Unternehmen sicher, dass freiwillige Umweltaussagen nur für Merkmale gemacht werden, die über die gesetzlichen Mindestanforderungen hinausgehen, und dabei die Verpackungseinheit klar benennen? (Art. 14 Buchst. a und b)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Vertreiber",
        "PPWR_Endvertreiber/Händler",
        "PPWR_Fulfillment-Dienstleister",
        "PPWR_Hersteller",
        "PPWR_Lieferant/AkteurinderLieferkette",
        "PPWR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "P15",
    "regulation": "PPWR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang stellt das Unternehmen beim Befüllen von Um-, Transport- oder E-Commerce-Verpackungen sicher, dass das Leerraumverhältnis maximal 50 % beträgt? (Art. 24 Abs. 1)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Vertreiber",
        "PPWR_Fulfillment-Dienstleister"
      ]
    }
  },
  {
    "id": "P16",
    "regulation": "PPWR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang wurde geprüft, ob die verwendeten Formate (z. B. Einweg-Kunststoffverpackungen für Obst/Gemüse unter 1,5 kg) unter die ab 2030 geltenden Verbote fallen? (Art. 25 Abs. 1, Anhang V)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger"
      ]
    }
  },
  {
    "id": "P17",
    "regulation": "PPWR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang stellt das Unternehmen sicher, dass für die von ihm genutzten wiederverwendbaren Verpackungen ein den Anforderungen entsprechendes Wiederverwendungssystem (geschlossen oder offen) existiert? (Art. 26 Abs. 1 und Art. 27 Abs. 1, Anhang VI)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Endvertreiber/Händler",
        "PPWR_Nutzer"
      ]
    }
  },
  {
    "id": "P18",
    "regulation": "PPWR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang erfüllt das Unternehmen die quantitativen Wiederverwendungsziele (z. B. 40 % bei Transportverpackungen ab 2030, ab 2040 70 %)? (Art. 29 Abs. 1)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Erzeuger",
        "PPWR_Importeur",
        "PPWR_Nutzer"
      ]
    }
  },
  {
    "id": "P19",
    "regulation": "PPWR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang führt das Unternehmen vor dem Inverkehrbringen die interne Fertigungskontrolle durch und erstellt die erforderliche technische Dokumentation? (Art. 15 Abs. 2, Anhang VII)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P20",
    "regulation": "PPWR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang liegt für jede Verpackungsart eine korrekt ausgestellte und aktuelle EU-Konformitätserklärung vor? (Art. 39 Abs. 1 und 2, Anhang VIII)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Hersteller"
      ]
    }
  },
  {
    "id": "P21",
    "regulation": "PPWR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang ist gewährleistet, dass technische Dokumentationen und Konformitätserklärungen über den vorgeschriebenen Zeitraum (5 Jahre für Einweg, 10 Jahre für Mehrweg) aufbewahrt werden? (Art. 15 Abs. 3 Buchst. a-b, Art. 18 Abs. 7 Buchst. a-b, Anhang VII)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Hersteller",
        "PPWR_Importeur"
      ]
    }
  },
  {
    "id": "P22",
    "regulation": "PPWR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang kommen Vertreiber ihrer Pflicht nach, stichprobenartig die Registereintragung des Herstellers sowie die Kennzeichnung und Kontaktangaben vor der Bereitstellung zu prüfen? (Art. 19 Abs. 2 Buchst. a-c)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Vertreiber"
      ]
    }
  },
  {
    "id": "P23",
    "regulation": "PPWR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang stellt das Unternehmen sicher, dass die Bedingungen bei Lagerung/Versand die Konformität der Verpackungen nicht beeinträchtigen? (Art. 20)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Fulfillment-Dienstleister"
      ]
    }
  },
  {
    "id": "P24",
    "regulation": "PPWR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang ist sichergestellt, dass der Bevollmächtigte die Konformitätserklärung und technische Dokumentation für Behörden bereithält? (Art. 17 Abs. 2 Buchst. a)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "P25",
    "regulation": "PPWR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang stellt der Bevollmächtigte sicher, dass er den Auftrag beendet, falls der vertretene Erzeuger seine Verpflichtungen verletzt? (Art. 17 Abs. 2 Buchst. e)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "PPWR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "ES1",
    "regulation": "ESPR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang stellen Sie sicher, dass Ihre Produkte so entworfen sind, dass sie die in den delegierten Rechtsakten (sofern vorhanden) definierten Leistungsanforderungen (z. B. Haltbarkeit, Reparierbarkeit, Rezyklatgehalt) erfüllen? (Art. 27 Abs. 1 Buchst. a, Art. 6)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller"
      ]
    }
  },
  {
    "id": "ES2",
    "regulation": "ESPR",
    "field": "Konformität & Technische Dokumentation",
    "text": "In welchem Umfang wurde das vorgeschriebene Konformitätsbewertungsverfahren durchgeführt und die technische Dokumentation erstellt? (Art. 27 Abs. 2, Art. 43)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Importeur"
      ]
    }
  },
  {
    "id": "ES3",
    "regulation": "ESPR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang stellen Sie sicher, dass keine technischen Lösungen oder Verfahren zur Manipulation von Testergebnissen eingesetzt werden? (Art. 40 Abs. 1 & 2)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Importeur",
        "ESPR_Vertreiber",
        "ESPR_Endvertreiber/Händler",
        "ESPR_Fulfillment-Dienstleister",
        "ESPR_Lieferant/AkteurinderLieferkette",
        "ESPR_Bevollmächtigter",
        "ESPR_Nutzer"
      ]
    }
  },
  {
    "id": "ES4",
    "regulation": "ESPR",
    "field": "Daten- & Belegmanagement",
    "text": "In welchem Umfang halten Sie die technische Dokumentation und die EU-Konformitätserklärung für 10 Jahre nach dem Inverkehrbringen bereit? (Art. 27 Abs. 3, Art. 28 Abs. 2 Buchst. a, Art. 29 Abs. 7)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Importeur",
        "ESPR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "ES5",
    "regulation": "ESPR",
    "field": "Nachhaltiges Produktdesign & Materialvorgaben",
    "text": "In welchem Umfang gewährleisten Sie bei Serienfertigungen eine gleichbleibende Konformität der Produkte? (Art. 27 Abs. 4)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller"
      ]
    }
  },
  {
    "id": "ES6",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang ist für Ihre Produkte ein korrekter, vollständiger und aktueller digitaler Produktpass verfügbar? (Art. 9 Abs. 1, Art. 10 Abs. 1, Art. 29 Abs. 2 Buchst. c)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Vertreiber",
        "ESPR_Importeur"
      ]
    }
  },
  {
    "id": "ES7",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang ist der Datenträger (z. B. QR-Code) korrekt am Produkt, der Verpackung oder der Dokumentation angebracht? (Art. 10 Abs. 1 Buchst. b, Art. 30 Abs. 2 Buchst. a)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Vertreiber",
        "ESPR_Importeur"
      ]
    }
  },
  {
    "id": "ES8",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang stellen Sie die Nachverfolgbarkeit von besorgniserregenden Stoffen über den gesamten Lebenszyklus sicher? (Art. 7 Abs. 5)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller"
      ]
    }
  },
  {
    "id": "ES9",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang stellen Sie Endvertreibern digitale Kopien des Datenträgers für den Fernabsatz kostenlos zur Verfügung? (Art. 10 Abs. 3)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller"
      ]
    }
  },
  {
    "id": "ES10",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang liegen dem Produkt digitale Gebrauchsanleitungen und (in Papierform) Sicherheitsinformationen bei? (Art. 27 Abs. 7, Art. 29 Abs. 4, Art. 30 Abs. 2 lit. b)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Vertreiber",
        "ESPR_Importeur"
      ]
    }
  },
  {
    "id": "ES11",
    "regulation": "ESPR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang ergreifen Sie angemessene Maßnahmen, um die Vernichtung unverkaufter Konsumgüter proaktiv zu verhindern? (Art. 23)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Importeur",
        "ESPR_Vertreiber",
        "ESPR_Endvertreiber/Händler",
        "ESPR_Fulfillment-Dienstleister",
        "ESPR_Lieferant/AkteurinderLieferkette",
        "ESPR_Bevollmächtigter",
        "ESPR_UnabhängigerWirtschaftsakteur",
        "ESPR_AnbietervonOnline-Marktplätzen"
      ]
    }
  },
  {
    "id": "ES12",
    "regulation": "ESPR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang legen Sie jährlich Informationen über die Anzahl, das Gewicht und die Gründe entsorgter unverkaufter Produkte auf Ihrer Website offen? (Art. 24 Abs. 1)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Vertreiber",
        "ESPR_Importeur"
      ]
    }
  },
  {
    "id": "ES13",
    "regulation": "ESPR",
    "field": "Operative Kreislaufwirtschaft",
    "text": "In welchem Umfang halten Sie das Verbot der Vernichtung für spezifische Warengruppen (z. B. Textilien und Schuhe) ein? (Art. 25 Abs. 1, Anhang VII)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Vertreiber",
        "ESPR_Importeur"
      ]
    }
  },
  {
    "id": "ES14",
    "regulation": "ESPR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang können Sie der Marktüberwachung auf Anfrage Auskunft über Ihre Vorlieferanten und Abnehmer geben (Rückverfolgbarkeit für 10 Jahre)? (Art. 36 Abs. 2)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller",
        "ESPR_Importeur",
        "ESPR_Vertreiber",
        "ESPR_Endvertreiber/Händler",
        "ESPR_Fulfillment-Dienstleister",
        "ESPR_Lieferant/AkteurinderLieferkette",
        "ESPR_Bevollmächtigter",
        "ESPR_UnabhängigerWirtschaftsakteur",
        "ESPR_AnbietervonOnline-Marktplätzen"
      ]
    }
  },
  {
    "id": "ES15",
    "regulation": "ESPR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang stellen Sie als Lieferant notwendige Informationen über Produkte oder Dienstleistungen kostenlos bereit, um die Konformitätsprüfung zu ermöglichen? (Art. 38 Buchst. a)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Lieferant/AkteurinderLieferkette"
      ]
    }
  },
  {
    "id": "ES16",
    "regulation": "ESPR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang stellen Sie sicher, dass Lager- und Transportbedingungen die Konformität der Produkte nicht beeinträchtigen? (Art. 29 Abs. 5, Art. 30 Abs. 3, Art. 33)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Importeur",
        "ESPR_Vertreiber",
        "ESPR_Fulfillment-Dienstleister"
      ]
    }
  },
  {
    "id": "ES17",
    "regulation": "ESPR",
    "field": "Lieferketten-Transparenz & Mapping",
    "text": "In welchem Umfang stellen Sie sicher, dass der digitale Produktpass für Kunden am Verkaufsort (auch online) leicht zugänglich ist? (Art. 31 Abs. 2)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Endvertreiber/Händler"
      ]
    }
  },
  {
    "id": "ES18",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang halten Sie ein Register für Kundenbeschwerden über potenzielle Nicht-Konformitäten bereit? (Art. 27 Abs. 9)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller"
      ]
    }
  },
  {
    "id": "ES19",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang arbeiten Sie mit Behörden zusammen, um Korrekturmaßnahmen bei nicht-konformen Produkten umzusetzen? (Art. 27 Abs. 10, Art. 29 Abs. 8, Art. 30 Abs. 5)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Importeur",
        "ESPR_Vertreiber",
        "ESPR_Hersteller",
        "ESPR_Bevollmächtigter"
      ]
    }
  },
  {
    "id": "ES20",
    "regulation": "ESPR",
    "field": "Reporting, Kennzeichnung & Stakeholder-Dialog",
    "text": "In welchem Umfang holen Sie die ausdrückliche Einwilligung des Nutzers ein, bevor persönliche Daten im digitalen Produktpass gespeichert werden? (Art. 10 Abs. 1 Buchst. e)",
    "relevance": {
      "type": "matrix",
      "sizes": [
        "KMU",
        "Nicht-KMU"
      ],
      "eudrRoles": null,
      "roles": [
        "ESPR_Erzeuger",
        "ESPR_Hersteller"
      ]
    }
  }
];

const LCA_QUESTIONS = [
  {
    "id": "L1",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang ist der Grund bzw. die Motivation zur Durchführung der Studie definiert und dokumentiert (z.B. interne Analyse, externe Anfrage, etc.)?"
  },
  {
    "id": "L2",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang sind Ziel und Anwendungszweck der Ökobilanzierung definiert und dokumentiert (z.B. Hot-Spot-Analyse, Vergleich von Produktalternativen)?"
  },
  {
    "id": "L3",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang ist die vorgesehene Zielgruppe definiert und dokumentiert (z.B. Mitarbeiter, Zulieferer, andere Geschäftspartner, etc.)?"
  },
  {
    "id": "L4",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "Wie weit ist festgelegt und dokumentiert, ob die Ergebnisse intern und/oder extern kommuniziert werden und/oder vergleichende Aussagen enthalten?"
  },
  {
    "id": "L5",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang ist das zu untersuchende Produktsystem sowie zugehörige Prozessschritte erfasst und dokumentiert (z.B. in einem Systemfließbild)?"
  },
  {
    "id": "L6",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang ist die funktionelle Einheit für die Ökobilanz eindeutig definiert und dokumentiert?"
  },
  {
    "id": "L7",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "Wie weit ist die Systemgrenze definiert und dokumentiert (z.B. gate-to-gate, cradle-to-gate oder cradle-to-grave)?"
  },
  {
    "id": "L8",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang ist die zeitliche, technische und geographische Systemgrenze/Geltungsbereich definiert und dolkumentiert (fokussierte Zeitspanne, verwendete Technologien, zutreffende Regionen, etc.)?"
  },
  {
    "id": "L9",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "Wie weit ist festgelegt, welche Wirkungskategorien (z.B. Treibhausgaspotential, Versauerungspotential, etc.) und welche Methode für die Wirkungsabschätzung und Auswertung (z.B. EF, CML, etc.) angewendet werden?"
  },
  {
    "id": "L10",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang sind die Anforderungen an die für die Ökobilanz benötigten Daten definiert (z.B. Primär- oder Sekundärdaten, Abschneidekriterien, etc.)?"
  },
  {
    "id": "L11",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang sind die für die Ökobilanz verwendeten Annahmen festgelegt und nachvollziehbar dokumentiert?"
  },
  {
    "id": "L12",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "In welchem Umfang sind die Einschränkungen der Ökobilanz, insbesondere hinsichtlich Datenverfügbarkeit, Systemgrenzen und methodischer Entscheidungen, identifiziert und dokumentiert?"
  },
  {
    "id": "L13",
    "field": "Zieldefinition und Untersuchungsrahmen",
    "text": "Wie weit ist festgelegt und dokumentiert, ob eine Kritische Prüfung vorgesehen und wie (Art und Umfang) sie durchzuführen ist (gemäß ISO 14044 und 14071)?"
  },
  {
    "id": "L14",
    "field": "Sachbilanz",
    "text": "In welchem Umfang sind das Vordergrund- und das Hintergrundsystem definiert und dokumentiert?"
  },
  {
    "id": "L15",
    "field": "Sachbilanz",
    "text": "In welchem Umfang liegen für das Vordergrundsystem quantitative Input-Daten zu Stoff- und Energieflüssen je funktioneller Einheit und Prozessschritt vor und sind nachvollziehbar dokumentiert (z. B. Rohstoffe, Energieverbräuche, Wasserverbräuche)?"
  },
  {
    "id": "L16",
    "field": "Sachbilanz",
    "text": "In welchem Umfang liegen für das Vordergrundsystem quantitative Output-Daten sowie Verwertungsoptionen vor und sind nachvollziehbar dokumentiert (z. B. Emissionen in Luft, Wasser und Boden, Abfälle, Nebenprodukte und Verwertungswege)?"
  },
  {
    "id": "L17",
    "field": "Sachbilanz",
    "text": "In welchem Umfang sind für das Vordergrundsystem belastbare Logistik- und Verpackungsdaten erhoben und dokumentiert (z. B. Transportmittel, Entfernungen, Auslastungen, Lieferwege, Verpackungsmaterialien und -mengen)?"
  },
  {
    "id": "L18",
    "field": "Sachbilanz",
    "text": "In welchem Umfang liegen für das Hintergrundsystem Daten vor (meist generische Daten/Sekundärdaten aus Datenbanken)?"
  },
  {
    "id": "L19",
    "field": "Sachbilanz",
    "text": "In welchem Umfang sind Datenquellen, Erhebungszeiträume, Verantwortlichkeiten, bestehende Datenlücken und Einschränkungen bei der Datenerhebung dokumentiert?"
  },
  {
    "id": "L20",
    "field": "Sachbilanz",
    "text": "In welchem Umfang ist ein Datenmanagement festgelegt, das LCA-relevante Daten regelmäßig aktualisiert und versioniert?"
  },
  {
    "id": "L21",
    "field": "Sachbilanz",
    "text": "In welchem Umfang sind Verfahren zur Behandlung von Koppelprodukten, Nebenprodukten, Recyclingmaterialien und Abfällen festgelegt (Multi-Output-Allokation, EoL-Allokation)?"
  },
  {
    "id": "L22",
    "field": "Wirkungsabschätzung",
    "text": "In welchem Umfang sind Werthaltungen bzw. die Wahl der Wirkungskategorien, Charakterisierungsmodelle und -faktoren begründet und mit Quellenangaben dokumentiert?"
  },
  {
    "id": "L23",
    "field": "Wirkungsabschätzung",
    "text": "In welchem Umfang werden optionale Bestandteile der Wirkungsabschätzung wie Normierung, Ordnung oder Gewichtung berücksichtigt und sind nachvollziehbar dokumentiert?"
  },
  {
    "id": "L24",
    "field": "Wirkungsabschätzung",
    "text": "In welchem Umfang sind methodische Grenzen, Unsicherheiten und Einschränkungen der Wirkungsabschätzung dokumentiert?"
  },
  {
    "id": "L25",
    "field": "Auswertung",
    "text": "In welchem Umfang werden aus den Ergebnissen nachvollziehbare Schlussfolgerungen, Optimierungspotentiale und Empfehlungen abgeleitet, die mit Ziel und Untersuchungsrahmen der Ökobilanz übereinstimmen?"
  },
  {
    "id": "L26",
    "field": "Auswertung",
    "text": "In welchem Umfang werden auf Grundlage der Ergebnisse der Sachbilanz und Wirkungsabschätzung die für die Ökobilanz signifikanten Parameter und Einflussgrößen identifiziert (z.B. Einfluss-, Beitrags- und Dominanzanalyse, prozentuale Ergebnisvergleiche, szenarienbasierte Sensitivitätsanalysen, etc.)?"
  },
  {
    "id": "L27",
    "field": "Auswertung",
    "text": "In welchem Umfang werden Vollständigkeits- und Konsistenzprüfungen zu angewandten Methoden, Daten und Annahmen innerhalb der Ökobilanz durchgeführt?"
  },
  {
    "id": "L28",
    "field": "Auswertung",
    "text": "In welchem Umfang werden Sensitivitätsprüfungen für Annahmen, Datenlücken und Einflussgrößen durchgeführt?"
  },
  {
    "id": "L29",
    "field": "Auswertung",
    "text": "In welchem Umfang werden die identifizierten Einschränkungen der Ökobilanz bei der Interpretation und Kommunikation der Ergebnisse berücksichtigt und dokumentiert?"
  }
];
