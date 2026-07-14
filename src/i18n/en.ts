/** English dictionary - the source of truth for the translation shape. */
export const en = {
  nav: {
    pricing: "pricing",
    openSource: "open source",
    manifesto: "manifesto",
    contacts: "contacts",
    bookCall: "book a call",
  },
  hero: {
    titleStart: "First open-source-first ",
    titleAccent: "serverless cloud in Central Asia",
    features: [
      {
        lead: "Up to 130x faster starts from AWS Lambda*",
        text: ": launch faster, answer faster, get billed only for real execution time.",
      },
      {
        lead: "Fair scaling and pricing",
        text: ": get billed less (or even nothing! check out our generous free tiers) for services with smaller load, and optimize your spendings on high load. Don't need to choose anything - we do that for you.",
      },
      {
        lead: "Data Sovereignty & low ping",
        text: ": We have servers in Tashkent, Almaty and Frankfurt. Keep your users' data compliant with local laws and don't think about latency.",
      },
    ],
    ctaPrimary: "book a call",
    ctaSecondary: "see our free & open-source solutions",
    footnote: "* compared to average AWS Lambda cold start; measured on our WASM runtime",
  },
  pricing: {
    title: "pricing",
    regionLabel: "region",
    currencyNote: "Please contact us for exact prices",
    tableTitle: "pay only for what you run",
    unitColumn: "resource",
    priceColumn: "price in {region}",
    tiers: {
      free: {
        name: "Free",
        tagline: "for pet projects and students",
        features: ["{requests} requests / month free", "{compute} GB·s compute free", "Cold starts under 10ms", "Community support"],
        cta: "start free",
      },
      payg: {
        name: "Pay-as-you-go",
        tagline: "you sleep - you don't pay",
        features: [
          "Billed only for real execution time",
          "Auto-scaling from zero to peak",
          "Servers in Tashkent, Almaty & Frankfurt",
          "Priority support in Telegram",
        ],
        cta: "book a call",
      },
      enterprise: {
        name: "Enterprise",
        tagline: "your hardware or ours",
        features: [
          "Dedicated hardware & SLA",
          "On-prem installation support",
          "Compliance with local data laws",
        ],
        cta: "contact us",
      },
    },
    perUnitFrom: "from {price}",
    custom: "custom",
    perMonth: "/mo",
  },
  openSource: {
    title: "host your own serverless cloud",
    body: "21 Cloud is open-source first. Run the exact same infrastructure software we use on your own hardware. Install it for free and migrate your cloud services to on-prem in a few clicks.",
    cta: "GitHub repository",
    terminalRunning: "→ your own cloud is running",
  },
  manifesto: {
    // Protected founder copy - kept in the original English across all locales.
    title: "Cloud should be cheap. And open.",
    paragraphs: [
      "Most clouds bill you for breathing. We do not think that is fine. 21CI is GPLv3 forever, 21cloud.uz has a real free tier, and the two are the same software. So if our prices ever stop making sense, you can walk away with your .wasm and keep going.",
    ],
    closing: "Built in Tashkent. Hosted across regions. Powered by plov. ♥",
  },
  founder: {
    title: "questions? get our founder on the phone",
    subtitle:
      "we're working Mon-Sun 9:00-19:00. But if you have anything urgent - don't worry, we got your back!",
    role: "Founder of 21 Cloud\n5+ years Backend developer and DevOps",
    bio: "5+ years Backend and Devops, Series founder",
    labels: { email: "email:", phone: "phone:", telegram: "telegram:", whatsapp: "whatsapp:" },
    regions: {
      uz: "Republic of Uzbekistan",
      kz: "Republic of Kazakhstan",
      de: "Germany",
    },
    cta: {
      title: "ready when you are",
      body: "Pick a time and talk to the founder directly - no sales team in between.",
      book: "book a call",
      telegram: "message on Telegram",
    },
  },
  footer: {
    sharing:
      "When sharing materials from 21 Cloud website, please mention a link to source (though we won't really enforce it)",
    registration:
      "Registration: Uzbekistan, Tashkent city, Yashnobod district, self-employed BRASTILOV ALEKSEY MIXAYLOVICH",
    proof:
      "Proof of registration and payment by bank transfer are available by inquiring our contacts in work days",
    tosBefore: "Continuation of you being on website, using our services, sharing materials make you agree to our ToS at ",
    publicOffer: "The information on this page does not constitute a public offer under the laws of Uzbekistan and Kazakhstan.",
  },
  selector: {
    country: "Country",
    language: "Language",
    currency: "Currency",
  },
  regions: {
    tashkent: "Tashkent",
    almaty: "Almaty",
    frankfurt: "Frankfurt",
  },
  compare: {
    title: "how we compare",
    subtitle: "Approximate figures; ping measured from your selected region to the nearest available datacenter. Prices are public list rates as of 2025.",
    pingRegionLabel: "Ping from",
    coldStart: "Cold start",
    pingCol: "Ping",
    languages: "Languages / Runtimes",
    requests: "Per 1M requests",
    provider: "Provider",
    local: "local",
  },
  features: {
    title: "why serverless?",
    subtitle: "Write a function. We handle servers, scaling, and uptime. You pay per millisecond of execution - nothing when idle.",
    cards: [
      {
        title: "one bill, unlimited services",
        body: "10 microservices, an API, cron jobs, and webhooks - one account. No VPS instances to rent, patch, or restart at 3 am.",
      },
      {
        title: "zero cost when idle",
        body: "A VPS costs $30/mo whether it serves 1 request or 1 million. 21 Cloud charges nothing overnight, on weekends, or between spikes.",
      },
      {
        title: "sub-10ms cold starts",
        body: "Functions wake up in under 10ms. No containers to spin up - your users see instant responses every time.",
      },
      {
        title: "data stays in your region",
        body: "Servers in Tashkent, Almaty, and Frankfurt. Stay compliant with local data laws - no extra configuration needed.",
      },
      {
        title: "open source, zero lock-in",
        body: "Run the exact same software on your own hardware for free. Cancel anytime - your code and data go with you.",
      },
      {
        title: "works with your existing code",
        body: "No security configs, access policies, or rewrites needed. Make minimal changes to your code and deploy in minutes.",
      },
    ],
  },
  calc: {
    title: "estimate your bill",
    memory: "memory per function",
    requests: "monthly requests",
    execTime: "avg execution time",
    freeTier: "first {requests} requests + {compute} GB·s compute are free each month",
    total: "your estimate",
    breakdown: "compute {compute} · requests {requests}",
    perMonth: "/mo",
    freeTierLabel: "free tier",
  },
};

export type Dict = typeof en;
