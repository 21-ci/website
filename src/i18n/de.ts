import type { Dict } from "./en";

export const de: Dict = {
  nav: {
    pricing: "Preise",
    openSource: "Open Source",
    manifesto: "Manifest",
    contacts: "Kontakt",
    bookCall: "Gespräch buchen",
  },
  hero: {
    titleStart: "Die erste open-source-first ",
    titleAccent: "Serverless-Cloud in Zentralasien",
    features: [
      {
        lead: "Bis zu 130× schnellere Starts als AWS Lambda*",
        text: ": schneller starten, schneller antworten, nur für echte Ausführungszeit zahlen.",
      },
      {
        lead: "Faires Skalieren & faire Preise",
        text: ": weniger zahlen (oder gar nichts - entdecke unsere großzügige Free-Tier) bei geringer Last, Kosten optimieren bei Spitzenlast. Nichts auswählen nötig - das erledigen wir.",
      },
      {
        lead: "Datensouveränität & niedriger Ping",
        text: ": wir haben Server in Taschkent, Almaty und Frankfurt. Daten datenschutzkonform halten und keine Latenzen.",
      },
    ],
    ctaPrimary: "Gespräch buchen",
    ctaSecondary: "Unsere kostenlosen Open-Source-Lösungen",
    footnote: "* verglichen mit durchschnittlichem AWS Lambda Cold Start; gemessen auf unserem WASM-Runtime",
  },
  pricing: {
    title: "Preise",
    regionLabel: "Region",
    currencyNote: "Bitte kontaktiere uns für genaue Preise",
    tableTitle: "Nur für das bezahlen, was du nutzt",
    unitColumn: "Ressource",
    priceColumn: "Preis in {region}",
    tiers: {
      free: {
        name: "Kostenlos",
        tagline: "für Hobbyprojekte und Studenten",
        features: ["{requests} Anfragen / Monat kostenlos", "{compute} GB·s Compute kostenlos", "Cold Start unter 10 ms", "Community-Support"],
        cta: "Kostenlos starten",
      },
      payg: {
        name: "Pay-as-you-go",
        tagline: "schläfst du - zahlst du nicht",
        features: [
          "Nur für echte Ausführungszeit",
          "Auto-Skalierung von null bis Peak",
          "Server in Taschkent, Almaty & Frankfurt",
          "Prioritäts-Support per Telegram",
        ],
        cta: "Gespräch buchen",
      },
      enterprise: {
        name: "Enterprise",
        tagline: "eure Hardware oder unsere",
        features: [
          "Dedizierte Hardware & SLA",
          "On-Prem-Installationssupport",
          "Compliance mit Datenschutzgesetzen",
        ],
        cta: "Kontakt aufnehmen",
      },
    },
    perUnitFrom: "ab {price}",
    custom: "individuell",
    perMonth: "/Monat",
  },
  openSource: {
    title: "Betreibe deine eigene Serverless-Cloud",
    body: "21 Cloud ist Open-Source zuerst. Nutze genau dieselbe Infrastruktursoftware wie wir - auf deiner eigenen Hardware. Kostenlos installieren und Cloud-Dienste mit wenigen Klicks auf On-Prem migrieren.",
    cta: "GitHub-Repository",
    terminalRunning: "→ deine eigene Cloud läuft",
  },
  manifesto: {
    title: "Cloud should be cheap. And open.",
    paragraphs: [
      "Most clouds bill you for breathing. We do not think that is fine. 21CI is GPLv3 forever, 21cloud.uz has a real free tier, and the two are the same software. So if our prices ever stop making sense, you can walk away with your .wasm and keep going.",
    ],
    closing: "Built in Tashkent. Hosted across regions. Powered by plov. ♥",
  },
  founder: {
    title: "Fragen? Ruf direkt beim Gründer an",
    subtitle:
      "wir sind Mo–So 9:00–19:00 Uhr erreichbar. Bei Dringendem - wir sind für euch da!",
    role: "Gründer von 21 Cloud",
    bio: "5+ Jahre Backend & DevOps, Serienunternehmer",
    labels: { email: "E-Mail:", phone: "Telefon:", telegram: "Telegram:", whatsapp: "WhatsApp:" },
    regions: {
      uz: "Republik Usbekistan",
      kz: "Republik Kasachstan",
      de: "Deutschland",
    },
    cta: {
      title: "Wir sind bereit, wenn du es bist",
      body: "Wähle einen Termin und sprich direkt mit dem Gründer - kein Vertriebsteam dazwischen.",
      book: "Gespräch buchen",
      telegram: "Nachricht per Telegram",
    },
  },
  footer: {
    sharing:
      "Bitte verlinke bei der Verwendung von Materialien der 21 Cloud Website auf die Quelle (wir werden es nicht streng durchsetzen).",
    registration:
      "Registrierung: Usbekistan, Taschkent, Yashnobod, Selbständiger BRASTILOV ALEKSEY MIXAYLOVICH",
    proof:
      "Registrierungsnachweis und Zahlungsbestätigung per Banküberweisung auf Anfrage an Werktagen.",
    tosBefore: "Durch die weitere Nutzung der Website und unserer Dienste stimmst du unseren Nutzungsbedingungen zu: ",
    publicOffer: "Die Informationen auf dieser Seite stellen kein öffentliches Angebot im Sinne der Gesetze Usbekistans und Kasachstans dar.",
  },
  selector: {
    country: "Land",
    language: "Sprache",
    currency: "Währung",
  },
  regions: {
    tashkent: "Taschkent",
    almaty: "Almaty",
    frankfurt: "Frankfurt",
  },
  features: {
    title: "warum serverless?",
    subtitle: "Du schreibst Funktionen. Wir übernehmen Server, Skalierung und Uptime. Du zahlst pro Millisekunde Ausführung - nichts im Leerlauf.",
    cards: [
      {
        title: "eine Rechnung, beliebig viele Dienste",
        body: "10 Microservices, eine API, Cron-Jobs und Webhooks - ein Account. Keine VPS-Instanzen, die du mieten, patchen oder nachts neu starten musst.",
      },
      {
        title: "null Kosten im Leerlauf",
        body: "Ein VPS kostet $30/Monat bei jeder Last - 1 Anfrage oder 1 Million. 21 Cloud berechnet nichts nachts, am Wochenende oder zwischen Spitzen.",
      },
      {
        title: "Cold Starts unter 10 ms",
        body: "Funktionen starten in unter 10 ms. Keine Containerstartverzögerungen - sofortige Antworten für deine Nutzer.",
      },
      {
        title: "Daten bleiben in deiner Region",
        body: "Server in Taschkent, Almaty und Frankfurt. Lokale Datenschutzgesetze einhalten ohne zusätzliche Konfiguration.",
      },
      {
        title: "Open Source, kein Lock-in",
        body: "Dieselbe Software kostenlos auf deiner eigenen Hardware. Kündige jederzeit - Code und Daten gehören dir.",
      },
      {
        title: "funktioniert mit bestehendem Code",
        body: "Keine Sicherheitskonfigurationen oder Umschreibungen nötig. Minimale Änderungen - Deploy in Minuten.",
      },
    ],
  },
  calc: {
    title: "Kosten schätzen",
    memory: "Speicher pro Funktion",
    requests: "Anfragen pro Monat",
    execTime: "Ø Ausführungszeit",
    freeTier: "erste {requests} Anfragen + {compute} GB·s Compute kostenlos pro Monat",
    total: "deine Schätzung",
    breakdown: "Compute {compute} · Anfragen {requests}",
    perMonth: "/Monat",
    freeTierLabel: "kostenlose Stufe",
  },
  compare: {
    title: "Wie wir im Vergleich abschneiden",
    subtitle: "Näherungswerte; Ping gemessen aus deiner gewählten Region zum nächsten Rechenzentrum. Preise sind öffentliche Listenpreise Stand 2025.",
    pingRegionLabel: "Ping aus",
    coldStart: "Cold Start",
    pingCol: "Ping",
    languages: "Sprachen / Runtimes",
    requests: "Pro 1M Anfragen",
    provider: "Anbieter",
    local: "lokal",
  },
};
