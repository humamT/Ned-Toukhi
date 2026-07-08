export const QUESTIONNAIRE = [
  {
    id: "location",
    question: "What is your location?",
    options: [
      "Europe",
      "USA, Canada, Australia or New Zealand",
      "Syria, Lebanon, Turkey, Jordan or Iraq",
      "Rest of the world",
    ],
  },
  {
    id: "company",
    question: "How big is your company?",
    options: [
      "Above 50 employees",
      "Between 20 and 50 employees",
      "Between 1 and 19 employees",
      "Charity, a startup or an individual",
    ],
  },
  {
    id: "service",
    question: "What service are you looking for?",
    options: [
      "Full visual identity service",
      "Simple logo and visual identity",
      "Various print materials",
      "Other",
    ],
  },
  {
    id: "timeline",
    question: "What is your timeline?",
    options: [
      "Within 10 working days",
      "Within 25 working days",
      "About 40 working days",
      "About 60 working days / no specific timeline",
      "Very urgent",
    ],
  },
];

const URGENT_MESSAGE =
  "Unfortunately, giving a price range for urgent services needs further discussion. I'd be happy to do so — please get in touch.";

const EXACT_RANGES = {
  west: {
    "Above 50 employees|Full visual identity service|About 40 working days": "10000€ - 20000€",
    "Above 50 employees|Full visual identity service|About 60 working days / no specific timeline":
      "20000€ - 30000€",
    "Above 50 employees|Simple logo and visual identity|Within 10 working days": "1500€ - 4000€",
    "Above 50 employees|Simple logo and visual identity|Within 25 working days": "5000€ - 10000€",
    "Between 20 and 50 employees|Full visual identity service|About 40 working days": "7000€ - 15000€",
    "Between 1 and 19 employees|Simple logo and visual identity|Within 10 working days": "1500€ - 3000€",
    "Charity, a startup or an individual|Simple logo and visual identity|Within 10 working days":
      "1500€ - 2500€",
  },
  mena: {
    "Above 50 employees|Full visual identity service|About 40 working days": "9000€ - 13000€",
    "Between 20 and 50 employees|Full visual identity service|About 40 working days": "7000€ - 10000€",
    "Between 1 and 19 employees|Simple logo and visual identity|Within 10 working days": "1200€ - 2000€",
    "Charity, a startup or an individual|Simple logo and visual identity|Within 10 working days":
      "1000€ - 1300€",
  },
};

const FALLBACK_BANDS = {
  "Above 50 employees": {
    "Full visual identity service": [9000, 22000],
    "Simple logo and visual identity": [2500, 11000],
    "Various print materials": [1500, 6000],
    Other: [3000, 9000],
  },
  "Between 20 and 50 employees": {
    "Full visual identity service": [6500, 16000],
    "Simple logo and visual identity": [2000, 8000],
    "Various print materials": [1200, 4500],
    Other: [2200, 7000],
  },
  "Between 1 and 19 employees": {
    "Full visual identity service": [4500, 11000],
    "Simple logo and visual identity": [1200, 4500],
    "Various print materials": [800, 3000],
    Other: [1500, 5000],
  },
  "Charity, a startup or an individual": {
    "Full visual identity service": [3500, 9000],
    "Simple logo and visual identity": [1000, 2800],
    "Various print materials": [700, 2200],
    Other: [1200, 4000],
  },
};

const TIMELINE_MULTIPLIERS = {
  "Within 10 working days": 1.15,
  "Within 25 working days": 1.05,
  "About 40 working days": 1,
  "About 60 working days / no specific timeline": 1.12,
};

function getAnswer(answers, question) {
  return answers.find((entry) => entry.question === question)?.answer ?? "";
}

function isMenaRegion(location) {
  return location === "Syria, Lebanon, Turkey, Jordan or Iraq";
}

function formatRange(min, max) {
  return `${Math.round(min)}€ - ${Math.round(max)}€`;
}

function getFallbackRange(company, service, timeline, regionKey) {
  const band = FALLBACK_BANDS[company]?.[service] ?? [2000, 8000];
  const regionFactor = regionKey === "mena" ? 0.88 : 1;
  const timelineFactor = TIMELINE_MULTIPLIERS[timeline] ?? 1;
  const min = band[0] * regionFactor * timelineFactor;
  const max = band[1] * regionFactor * timelineFactor;
  return formatRange(min, max);
}

export function getQuotationResult(answers) {
  const location = getAnswer(answers, "What is your location?");
  const company = getAnswer(answers, "How big is your company?");
  const service = getAnswer(answers, "What service are you looking for?");
  const timeline = getAnswer(answers, "What is your timeline?");

  if (timeline === "Very urgent") {
    return {
      price: null,
      message: URGENT_MESSAGE,
      needsContact: true,
    };
  }

  const regionKey = isMenaRegion(location) ? "mena" : "west";
  const lookupKey = `${company}|${service}|${timeline}`;
  const exactPrice = EXACT_RANGES[regionKey][lookupKey];

  if (exactPrice) {
    return {
      price: exactPrice,
      message: null,
      needsContact: false,
    };
  }

  return {
    price: getFallbackRange(company, service, timeline, regionKey),
    message: null,
    needsContact: false,
  };
}

export function buildQuotationSummary(answers, result) {
  const lines = answers.map((entry) => `${entry.question}\n${entry.answer}`);
  lines.push("", "Estimated result:", result.price ?? result.message ?? "N/A");
  return lines.join("\n");
}
