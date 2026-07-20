export const LOCATION_QUESTION = "What is your location?";
export const COMPANY_QUESTION = "How big is your company?";
export const SERVICE_QUESTION = "What is the service that you're looking for?";
export const TIMELINE_QUESTION = "What is your timeline?";

export const QUESTIONNAIRE = [
  {
    id: "location",
    question: LOCATION_QUESTION,
    options: [
      "Europe",
      "USA, Canada, Australia or New Zealand",
      "Syria, Lebanon, Turkey, Jordan or Iraq",
      "Rest of the world",
    ],
  },
  {
    id: "company",
    question: COMPANY_QUESTION,
    options: [
      "Above 50 employees",
      "Between 20 and 50 employees",
      "Between 1 and 19 employees",
      "Charity, a startup or an individual",
    ],
  },
  {
    id: "service",
    question: SERVICE_QUESTION,
    options: [
      "Full visual identity service",
      "Simple logo and visual identity",
      "Various print materials",
      "Other",
    ],
  },
  {
    id: "timeline",
    question: TIMELINE_QUESTION,
    options: [],
  },
];

/** Placeholder copy for “learn more” popups — replace each value as needed. */
export const OPTION_LEARN_MORE = {
  "Charity, a startup or an individual":
    `Small startups and nonprofit organizations are eligible for discounted pricing. 
    Please get in touch with the details of your project to receive a personalized quote.`,
  "Full visual identity service":
    `This includes multiple meetings with the client and the development of tailored research related to the
project and its logo, resulting in:
- A complete visual identity with several logo concepts and multiple variations and refinements of the chosen logo. It also includes color palettes and distinctive gradients derived from the initial research, as well as identityspecific patterns.
- The deliverables further include an official typeface for the brand and a comprehensive brand guidelines document explaining how to apply the identity across all platforms and print materials, along with additional assets tailored to the organization’s needs.
- The timeline for a full visual identity project typically ranges from 45 to 60 working days.`,
  "Simple logo and visual identity":
    `This option does not require a big research and includes a logo, a color palette, and a simple matching pattern.
     It is well suited for small startups and businesses with limited budgets. 
     The timeline for a simple identity project ranges from 10 to 15 working days.`,
  "Various print materials":
    `Such as posters, flyers, magazine/book covers, and other printed media.`,
};

export const TIMELINE_VERY_URGENT = "Very urgent";

export const TIMELINES_BY_SERVICE = {
  "Full visual identity service": [
    "About 40 working days",
    "About 60 working days / no specific timeline",
    TIMELINE_VERY_URGENT,
  ],
  "Simple logo and visual identity": [
    "Within 10 working days",
    "Within 25 working days",
    TIMELINE_VERY_URGENT,
  ],
  "Various print materials": [
    "Within 10 working days",
    "Within 30 working days",
    TIMELINE_VERY_URGENT,
  ],
  Other: [
    "Within 10 working days",
    "Within 25 working days",
    "About 60 working days / no specific timeline",
    TIMELINE_VERY_URGENT,
  ],
};

export const URGENT_MESSAGE =
  "Unfortunately, giving a price range for urgent services needs further discussion. I'd be happy to do so — please get in touch.";

const MENA_LOCATION = "Syria, Lebanon, Turkey, Jordan or Iraq";

function priceKey(company, service, timeline) {
  return `${company}|${service}|${timeline}`;
}

function buildPriceTable(entries) {
  return Object.fromEntries(
    entries.map(([company, service, timeline, range]) => [
      priceKey(company, service, timeline),
      range,
    ])
  );
}

const WEST_PRICES = buildPriceTable([
  // Above 50 employees
  ["Above 50 employees", "Full visual identity service", "About 40 working days", "10000€ - 20000€"],
  ["Above 50 employees", "Full visual identity service", "About 60 working days / no specific timeline", "20000€ - 30000€"],
  ["Above 50 employees", "Simple logo and visual identity", "Within 10 working days", "1500€ - 4000€"],
  ["Above 50 employees", "Simple logo and visual identity", "Within 25 working days", "5000€ - 10000€"],
  ["Above 50 employees", "Various print materials", "Within 10 working days", "1000€ - 3500€"],
  ["Above 50 employees", "Various print materials", "Within 30 working days", "5000€ - 10000€"],
  ["Above 50 employees", "Other", "Within 10 working days", "1500€ - 5000€"],
  ["Above 50 employees", "Other", "Within 25 working days", "7000€ - 12000€"],
  ["Above 50 employees", "Other", "About 60 working days / no specific timeline", "15000€ - 30000€"],
  // Between 20 and 50 employees
  ["Between 20 and 50 employees", "Full visual identity service", "About 40 working days", "7000€ - 15000€"],
  ["Between 20 and 50 employees", "Full visual identity service", "About 60 working days / no specific timeline", "12500€ - 20000€"],
  ["Between 20 and 50 employees", "Simple logo and visual identity", "Within 10 working days", "1500€ - 3500€"],
  ["Between 20 and 50 employees", "Simple logo and visual identity", "Within 25 working days", "5000€ - 10000€"],
  ["Between 20 and 50 employees", "Various print materials", "Within 10 working days", "1500€ - 3000€"],
  ["Between 20 and 50 employees", "Various print materials", "Within 30 working days", "5000€ - 10000€"],
  ["Between 20 and 50 employees", "Other", "Within 10 working days", "1500€ - 5000€"],
  ["Between 20 and 50 employees", "Other", "Within 25 working days", "6500€ - 10000€"],
  ["Between 20 and 50 employees", "Other", "About 60 working days / no specific timeline", "12500€ - 20000€"],
  // Between 1 and 19 employees
  ["Between 1 and 19 employees", "Full visual identity service", "About 40 working days", "9000€ - 13000€"],
  ["Between 1 and 19 employees", "Full visual identity service", "About 60 working days / no specific timeline", "12500€ - 18000€"],
  ["Between 1 and 19 employees", "Simple logo and visual identity", "Within 10 working days", "1500€ - 3000€"],
  ["Between 1 and 19 employees", "Simple logo and visual identity", "Within 25 working days", "5000€ - 8000€"],
  ["Between 1 and 19 employees", "Various print materials", "Within 10 working days", "1500€ - 2500€"],
  ["Between 1 and 19 employees", "Various print materials", "Within 30 working days", "5000€ - 7500€"],
  ["Between 1 and 19 employees", "Other", "Within 10 working days", "1500€ - 3000€"],
  ["Between 1 and 19 employees", "Other", "Within 25 working days", "5000€ - 8000€"],
  ["Between 1 and 19 employees", "Other", "About 60 working days / no specific timeline", "12500€ - 18000€"],
  // Charity, a startup or an individual
  ["Charity, a startup or an individual", "Full visual identity service", "About 40 working days", "7000€ - 10000€"],
  ["Charity, a startup or an individual", "Full visual identity service", "About 60 working days / no specific timeline", "10000€ - 15000€"],
  ["Charity, a startup or an individual", "Simple logo and visual identity", "Within 10 working days", "1500€ - 2500€"],
  ["Charity, a startup or an individual", "Simple logo and visual identity", "Within 25 working days", "4000€ - 6500€"],
  ["Charity, a startup or an individual", "Various print materials", "Within 10 working days", "1500€ - 2500€"],
  ["Charity, a startup or an individual", "Various print materials", "Within 30 working days", "5000€ - 8000€"],
  ["Charity, a startup or an individual", "Other", "Within 10 working days", "1500€ - 3000€"],
  ["Charity, a startup or an individual", "Other", "Within 25 working days", "4000€ - 7000€"],
  ["Charity, a startup or an individual", "Other", "About 60 working days / no specific timeline", "10000€ - 15000€"],
]);

const MENA_PRICES = buildPriceTable([
  // Above 50 employees
  ["Above 50 employees", "Full visual identity service", "About 40 working days", "9000€ - 13000€"],
  ["Above 50 employees", "Full visual identity service", "About 60 working days / no specific timeline", "12500€ - 18000€"],
  ["Above 50 employees", "Simple logo and visual identity", "Within 10 working days", "1500€ - 3000€"],
  ["Above 50 employees", "Simple logo and visual identity", "Within 25 working days", "5000€ - 8000€"],
  ["Above 50 employees", "Various print materials", "Within 10 working days", "1500€ - 2500€"],
  ["Above 50 employees", "Various print materials", "Within 30 working days", "5000€ - 7500€"],
  ["Above 50 employees", "Other", "Within 10 working days", "1500€ - 3000€"],
  ["Above 50 employees", "Other", "Within 25 working days", "5000€ - 8000€"],
  ["Above 50 employees", "Other", "About 60 working days / no specific timeline", "12500€ - 18000€"],
  // Between 20 and 50 employees
  ["Between 20 and 50 employees", "Full visual identity service", "About 40 working days", "7000€ - 10000€"],
  ["Between 20 and 50 employees", "Full visual identity service", "About 60 working days / no specific timeline", "10000€ - 15000€"],
  ["Between 20 and 50 employees", "Simple logo and visual identity", "Within 10 working days", "1500€ - 2500€"],
  ["Between 20 and 50 employees", "Simple logo and visual identity", "Within 25 working days", "4500€ - 7000€"],
  ["Between 20 and 50 employees", "Various print materials", "Within 10 working days", "1300€ - 2000€"],
  ["Between 20 and 50 employees", "Various print materials", "Within 30 working days", "4000€ - 6000€"],
  ["Between 20 and 50 employees", "Other", "Within 10 working days", "1300€ - 2500€"],
  ["Between 20 and 50 employees", "Other", "Within 25 working days", "4500€ - 7000€"],
  ["Between 20 and 50 employees", "Other", "About 60 working days / no specific timeline", "10000€ - 15000€"],
  // Between 1 and 19 employees
  ["Between 1 and 19 employees", "Full visual identity service", "About 40 working days", "6500€ - 8000€"],
  ["Between 1 and 19 employees", "Full visual identity service", "About 60 working days / no specific timeline", "8000€ - 12000€"],
  ["Between 1 and 19 employees", "Simple logo and visual identity", "Within 10 working days", "1200€ - 2000€"],
  ["Between 1 and 19 employees", "Simple logo and visual identity", "Within 25 working days", "3000€ - 4500€"],
  ["Between 1 and 19 employees", "Various print materials", "Within 10 working days", "1000€ - 1500€"],
  ["Between 1 and 19 employees", "Various print materials", "Within 30 working days", "3000€ - 4500€"],
  ["Between 1 and 19 employees", "Other", "Within 10 working days", "1300€ - 2500€"],
  ["Between 1 and 19 employees", "Other", "Within 25 working days", "3000€ - 5000€"],
  ["Between 1 and 19 employees", "Other", "About 60 working days / no specific timeline", "8000€ - 12000€"],
  // Charity, a startup or an individual
  ["Charity, a startup or an individual", "Full visual identity service", "About 40 working days", "4000€ - 6000€"],
  ["Charity, a startup or an individual", "Full visual identity service", "About 60 working days / no specific timeline", "7500€ - 10000€"],
  ["Charity, a startup or an individual", "Simple logo and visual identity", "Within 10 working days", "1000€ - 1300€"],
  ["Charity, a startup or an individual", "Simple logo and visual identity", "Within 25 working days", "2500€ - 3200€"],
  ["Charity, a startup or an individual", "Various print materials", "Within 10 working days", "1000€ - 1200€"],
  ["Charity, a startup or an individual", "Various print materials", "Within 30 working days", "2000€ - 3000€"],
  ["Charity, a startup or an individual", "Other", "Within 10 working days", "1000€ - 1500€"],
  ["Charity, a startup or an individual", "Other", "Within 25 working days", "2500€ - 4000€"],
  ["Charity, a startup or an individual", "Other", "About 60 working days / no specific timeline", "7500€ - 10000€"],
]);

function getAnswer(answers, question) {
  return answers.find((entry) => entry.question === question)?.answer ?? "";
}

function getPriceRegion(location) {
  return location === MENA_LOCATION ? "mena" : "west";
}

export function getTimelineOptionsForService(service) {
  return TIMELINES_BY_SERVICE[service] ?? [];
}

export function getQuestionStep(stepIndex, answers) {
  const step = QUESTIONNAIRE[stepIndex];
  if (!step) return null;

  if (step.id !== "timeline") {
    return step;
  }

  const service = getAnswer(answers, SERVICE_QUESTION);
  return {
    ...step,
    options: getTimelineOptionsForService(service),
  };
}

export function isTimelineValidForService(service, timeline) {
  return getTimelineOptionsForService(service).includes(timeline);
}

export function getQuotationResult(answers) {
  const location = getAnswer(answers, LOCATION_QUESTION);
  const company = getAnswer(answers, COMPANY_QUESTION);
  const service = getAnswer(answers, SERVICE_QUESTION);
  const timeline = getAnswer(answers, TIMELINE_QUESTION);

  if (timeline === TIMELINE_VERY_URGENT) {
    return {
      price: null,
      message: URGENT_MESSAGE,
      needsContact: true,
    };
  }

  const priceTable = getPriceRegion(location) === "mena" ? MENA_PRICES : WEST_PRICES;
  const lookupKey = priceKey(company, service, timeline);
  const price = priceTable[lookupKey];

  if (price) {
    return {
      price,
      message: null,
      needsContact: false,
    };
  }

  return {
    price: null,
    message:
      "We couldn't match this combination to a price range. Please get in touch so we can provide a tailored quote.",
    needsContact: true,
  };
}

export function buildQuotationSummary(answers, result) {
  const lines = answers.map((entry) => `${entry.question}\n${entry.answer}`);
  lines.push("", "Estimated result:", result.price ?? result.message ?? "N/A");
  return lines.join("\n");
}
