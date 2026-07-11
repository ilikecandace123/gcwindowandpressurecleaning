// Window Cleaning Plans — single source of truth for the maintenance plan
// content used on the Window Cleaning page section and the standalone
// /window-cleaning-plans page.

export const PLAN_TIERS = [
  {
    id: "monthly",
    name: "Monthly",
    frequency: "Exterior clean every month",
    saving: 150,
    savingLabel: "$150 off every visit",
    popular: false,
    blurb: "The biggest saving — windows that never get the chance to get dirty.",
  },
  {
    id: "quarterly",
    name: "Quarterly",
    frequency: "Exterior clean every 3 months",
    saving: 100,
    savingLabel: "$100 off every visit",
    popular: true,
    blurb: "The sweet spot for most Gold Coast homes — crystal clear, all year round.",
  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    frequency: "Exterior clean every 6 months",
    saving: 50,
    savingLabel: "$50 off every visit",
    popular: false,
    blurb: "A twice-a-year refresh that keeps the worst of the build-up away.",
  },
];

export const PLAN_STEPS = [
  {
    title: "Get your free quote",
    description: "Get your free quote and book your first clean.",
  },
  {
    title: "Pick your frequency",
    description: "Select your frequency and your savings.",
  },
  {
    title: "Sit back and relax",
    description: "We take care of the rest.",
  },
];

export const PLAN_INCLUSIONS = [
  "Free deep cleaning of your flyscreens",
  "Free frame and sill cleaning",
  "$50–$150 off per visit",
  "100% satisfaction guarantee",
  "7-day rain guarantee — free touch-ups if it rains within 7 days of a clean",
];

export const PLAN_BENEFITS = [
  {
    title: "Never think about your dirty windows again",
    description: "Pre-booked, priority scheduling — so the job's just done.",
  },
  {
    title: "Massive savings & benefits",
    description: "Up to $150 off every single visit compared to a one-time clean.",
  },
  {
    title: "Protects your home",
    description: "Stop your glass being slowly etched & damaged over time — and maintain your view.",
  },
];

export const PLAN_NOTE =
  "Our Window Cleaning Plans cover exterior window & screen cleaning (this is what gets dirtier, faster). We'll also give you a quote for your interior windows & tracks — you can add these on at any of your exterior cleaning visits as needed.";
