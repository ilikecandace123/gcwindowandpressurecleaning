// DVA (Department of Veterans' Affairs) section: /dva/ hub plus one page per
// service. Rendered by src/pages/Dva.jsx and prerendered by scripts/prerender.mjs
// (titles/descriptions come from here, so the two never drift apart).
//
// Every DVA figure below was checked against official DVA pages on 12/11/2026.
// Re-check them each July (household services limits are indexed on 1 July)
// and each January (the standard hourly rate is published per calendar year).
//   - Household services: https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/household-services-compensation
//   - Veterans' Home Care: https://www.dva.gov.au/vhc
//   - Home and garden upkeep: https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/help-with-home-and-garden-upkeep
//   - Policy manual (tasks that are not household services): https://clik.dva.gov.au/military-compensation-mrca-manuals-and-resources-library/household-services-and-attendant-care-policy-manual/1-1-2-what-tasks-are-not-household-services

export const DVA_CHECKED = "2026-11-12";

// Claims about our own business that are only shown once the owner confirms
// them. Both confirmed by the owner on 12/11/2026.
//   screeningChecks: every cleaner holds a Working with Children Check
//     (Blue Card in QLD) and a working-with-vulnerable-people check
//     (NDIS Worker Screening), which DVA lists for a "suitable provider".
//   capRate: DVA jobs are charged at or below DVA's standard maximum hourly
//     rate, so an approved veteran pays nothing out of pocket.
export const DVA_CONFIRMED = {
  screeningChecks: true,
  capRate: true,
};

export const DVA_FACTS = {
  hhsHourlyRate: "$79.90",
  hhsHourlyRateYear: "2026",
  hhsWeeklyMaxMrca: "$633.47",
  hhsWeeklyMaxFrom: "1 July 2026",
  vhcHoursPerYear: 15,
  vhcCoPayPerHour: "$5",
  vhcCoPayCap: "$75",
  vhcAssessmentPhone: "1300 550 450",
  dvaPhone: "1800 VETERAN (1800 838 372)",
  hhsEmail: "hhs@dva.gov.au",
};

const F = DVA_FACTS;

export const DVA_SERVICES = [
  { slug: "window-cleaning", name: "Window Cleaning", image: "/images/window-hero.jpg" },
  { slug: "gutter-cleaning", name: "Gutter Cleaning", image: "/images/gutter-1.jpg" },
  { slug: "solar-panel-cleaning", name: "Solar Panel Cleaning", image: "/images/solar-panel-hero.jpg" },
];

// What DVA asks of a household services provider, and where we stand.
// Rows marked `confirm` only show once DVA_CONFIRMED says so.
export function dvaRequirements() {
  const rows = [
    {
      requirement: "An Australian Business Number (ABN)",
      us: "Yes. Our ABN is printed on every quote and invoice.",
    },
    {
      requirement: "Police checks",
      us: "Yes. Every cleaner who comes to your home is police-checked.",
    },
    {
      requirement: "Appropriate insurance (DVA asks you to confirm this)",
      us: "Yes. We carry public liability insurance and can send you the certificate of currency before the first visit.",
    },
    {
      requirement: "Working with Children Check and Working with Vulnerable People Check",
      us: "Yes. Every cleaner holds a current Blue Card and NDIS Worker Screening clearance.",
      confirm: "screeningChecks",
    },
    {
      requirement: "Equipped to deliver a high quality of service",
      us: "Yes. Professional squeegees and purified water for glass, gutter vacuums, soft brushes for solar, and fall-arrest anchors for roof work.",
    },
    {
      requirement: "Invoices sent to DVA through the Provider Upload Page",
      us: "Yes. We already work with DVA clients and upload each invoice to DVA ourselves, so you don't handle paperwork.",
    },
    {
      requirement: `Charge no more than DVA's standard maximum rate (${F.hhsHourlyRate} an hour inc GST in ${F.hhsHourlyRateYear})`,
      us: `Yes. DVA work is charged by the hour at or under ${F.hhsHourlyRate}, so approved hours cost you nothing.`,
      confirm: "capRate",
    },
  ];
  return rows.filter((r) => !r.confirm || DVA_CONFIRMED[r.confirm]);
}

// ── Hub: /dva/ ───────────────────────────────────────────────────────────────
export const DVA_HUB = {
  path: "/dva",
  title: "DVA Window, Gutter and Solar Cleaning | Gold Coast",
  description:
    "DVA window cleaning, gutter cleaning and solar panel cleaning on the Gold Coast. How Household Services and Veterans' Home Care pay, rates and who qualifies.",
  h1: "DVA Cleaning for Veterans — Windows, Gutters and Solar",
  subheading: "Help for Gold Card and White Card holders across the Gold Coast, with DVA invoiced for you.",
  image: "/images/window-hero.jpg",
  imageAlt: "Clean, streak-free windows on a Gold Coast home",
  directAnswer: `Yes, DVA can pay for window cleaning, gutter cleaning and, in some cases, solar panel cleaning. There are two routes. Household Services compensation pays for help you can no longer manage because of an accepted service-related condition, and you choose your own provider: DVA's standard maximum rate in ${F.hhsHourlyRateYear} is ${F.hhsHourlyRate} an hour including GST. Veterans' Home Care covers up to ${F.vhcHoursPerYear} hours of home and garden maintenance a year, including gutters and windows, for a ${F.vhcCoPayPerHour}-an-hour co-payment capped at ${F.vhcCoPayCap}, delivered by the provider named on your Care Plan.`,
  faqs: [
    {
      question: "Does DVA pay for window cleaning?",
      answer: `Yes. DVA lists cleaning of external and internal windows as a home and garden task it can help with. Through Veterans' Home Care it sits inside the ${F.vhcHoursPerYear}-hour yearly home and garden maintenance allowance. Through Household Services compensation it is paid when window cleaning is on your approval, at up to DVA's standard rate of ${F.hhsHourlyRate} an hour inc GST in ${F.hhsHourlyRateYear}.`,
    },
    {
      question: "Does DVA pay for gutter cleaning?",
      answer: `Yes, gutter cleaning is named in DVA's Veterans' Home Care home and garden maintenance services, and it can be included in a Household Services approval. Under Veterans' Home Care you pay a co-payment of ${F.vhcCoPayPerHour} an hour, capped at ${F.vhcCoPayCap} in any 12 months.`,
    },
    {
      question: "Does DVA pay for solar panel cleaning?",
      answer: "Solar panel cleaning is not on DVA's published Veterans' Home Care task list, so don't count on it there. Under Household Services compensation it is paid only if your approval covers it. Check your determination letter or ask DVA. If it isn't covered, we can clean your panels privately and tell you the price before we start.",
    },
    {
      question: "What is the difference between Household Services and Veterans' Home Care?",
      answer: `Household Services is compensation for tasks you can't do because of an accepted service-related injury or illness. You pick the provider and DVA pays up to a weekly limit (${F.hhsWeeklyMaxMrca} under the MRCA from ${F.hhsWeeklyMaxFrom}). Veterans' Home Care is a needs-based program for Veteran Card holders who have trouble with daily tasks at home. An assessment agency approves the hours and names the provider on your Care Plan. You can't get VHC home and garden maintenance while you are approved for Household Services under the MRCA.`,
    },
    {
      question: "Who is eligible for DVA home and garden help?",
      answer: `You may be eligible if you hold a Veteran Card – All Conditions (Gold Card) or a Veteran Card – Specific Conditions or Non-liability Health Care (White Card). Household Services also needs an accepted service-related condition and a delegate's decision that the help is reasonably required. To check, call DVA on ${F.dvaPhone}.`,
    },
    {
      question: "How do I apply for DVA Household Services?",
      answer: `Fill in DVA's household services claim form and email it to ${F.hhsEmail}, or post it to GPO Box 9998, Brisbane QLD 4001. Since 1 July 2026 every new claim is assessed under the MRCA, whenever and wherever you served. Once you're approved, you choose a provider, and that can be us.`,
    },
    {
      question: "How do I get Veterans' Home Care?",
      answer: `Call the VHC assessment agency on ${F.vhcAssessmentPhone}. If services are approved you will receive a Care Plan listing the services, the period, your co-payment and the provider who will deliver them. Your plan is reviewed about every six months.`,
    },
    {
      question: "Will I have to pay anything?",
      answer: DVA_CONFIRMED.capRate
        ? `For approved Household Services hours, no. We charge at or under DVA's standard rate and invoice DVA directly. Under Veterans' Home Care the ${F.vhcCoPayPerHour}-an-hour co-payment (capped at ${F.vhcCoPayCap} a year) is paid to your VHC provider. Anything outside your approval is quoted in writing first, and you decide.`
        : `For approved Household Services hours, DVA pays the provider. You don't need further DVA approval for a provider to charge up to the published standard rate of ${F.hhsHourlyRate} an hour. Under Veterans' Home Care you pay a ${F.vhcCoPayPerHour}-an-hour co-payment, capped at ${F.vhcCoPayCap} a year, which can be waived if you can't afford it. Anything outside your approval is quoted in writing first, and you decide.`,
    },
    {
      question: "What does DVA not cover?",
      answer: "DVA's household services policy excludes household maintenance such as painting, window or fence repairs, plumbing, electrical work, tree work, pest control, landscaping and removing large rubbish. It also excludes vehicle cleaning. Veterans' Home Care maintenance is aimed at safety jobs a handyperson can do. You may also need to pay for supplies or tip fees.",
    },
    {
      question: "Which areas do you cover for DVA clients?",
      answer: "The whole Gold Coast, from Coomera and Ormeau down to Coolangatta, plus the Tweed and Northern NSW and parts of Brisbane. Call (07) 5230 8293 and we will confirm your suburb.",
    },
  ],
};

// ── Service pages: /dva/<service>/ ──────────────────────────────────────────
export const DVA_PAGES = {
  "window-cleaning": {
    path: "/dva/window-cleaning",
    name: "Window Cleaning",
    title: "DVA Window Cleaning Gold Coast | Veterans' Home Care",
    description:
      "DVA window cleaning on the Gold Coast for Gold and White Card holders. Inside and out, tracks and screens. We invoice DVA directly. Call (07) 5230 8293.",
    h1: "DVA Window Cleaning on the Gold Coast",
    subheading: "Clear glass, clean tracks and safe hands on the ladder, with DVA invoiced for you.",
    image: "/images/window-hero.jpg",
    imageAlt: "Freshly cleaned windows on a Gold Coast home",
    directAnswer: `DVA can pay for window cleaning. Veterans' Home Care lists cleaning of internal and external windows as home and garden maintenance (up to ${F.vhcHoursPerYear} hours a year, ${F.vhcCoPayPerHour} an hour co-payment, capped at ${F.vhcCoPayCap}). Household Services compensation pays for window cleaning when it is on your approval, at up to ${F.hhsHourlyRate} an hour inc GST in ${F.hhsHourlyRateYear}. We clean glass, frames, sills, tracks and flyscreens, and upload the invoice to DVA ourselves.`,
    included: [
      "Glass washed and squeegeed inside and out, or outside only if that is what's approved",
      "Frames, sills and ledges wiped down",
      "Window tracks vacuumed and wiped, a common trip and mould spot",
      "Flyscreens taken out, washed and refitted",
      "Upstairs and hard-to-reach glass cleaned from the outside by us, so no one in the house leans out or climbs",
      "Salt spray and hard-water spots treated, common near the beach",
    ],
    why: [
      {
        title: "Ladders are the risk",
        body: "Window cleaning means ladders, step stools and reaching. Falls at home are a leading cause of injury for older Australians. That is the job we take off your hands.",
      },
      {
        title: "Light and visibility",
        body: "Clean glass lets more daylight in and makes it easier to see steps, pets and visitors at the door. That matters if your eyesight or balance isn't what it was.",
      },
      {
        title: "Tracks that slide",
        body: "Gritty, mouldy tracks make doors and windows heavy to open. We clean them so they slide easily and lock properly.",
      },
    ],
    privatePrice:
      "Paying privately, most Gold Coast homes are $385–$550 for a single-storey home inside and out with tracks and screens, and $500–$800 for double-storey. Apartments are around $220–$440. Exterior only costs less.",
    faqs: [
      {
        question: "Can DVA pay for window cleaning?",
        answer: `Yes. Internal and external window cleaning is on DVA's list of home and garden help. Through Veterans' Home Care it counts toward your ${F.vhcHoursPerYear} hours a year of home and garden maintenance. Through Household Services it is paid when it's on your approval, at up to ${F.hhsHourlyRate} an hour inc GST.`,
      },
      {
        question: "How often can I have my windows cleaned through DVA?",
        answer: `It depends on your approval. A Household Services approval sets the hours and frequency. Veterans' Home Care home and garden maintenance is capped at ${F.vhcHoursPerYear} hours in 12 months, shared with other tasks like gutters and lawn mowing, so most VHC clients have windows done once or twice a year.`,
      },
      {
        question: "Do you clean upstairs windows for DVA clients?",
        answer: "Yes. We clean upper-storey glass from the outside with the right access gear for your home. If your approval only covers some windows, we will tell you which ones are covered before we start and quote any extras separately.",
      },
      {
        question: "Are tracks and flyscreens included?",
        answer: "Yes, they are part of how we clean windows. If your approved hours are limited, we will agree with you beforehand what we do first, usually the glass and tracks you use most.",
      },
      {
        question: "Do I need to be home?",
        answer: "For the first visit, yes, so we can agree what's included and check access. After that, outside-only cleans can be done while you are out if you are happy with that.",
      },
      {
        question: "Can you clean my windows if I'm on Veterans' Home Care?",
        answer: "Veterans' Home Care work is done by the provider named on your VHC Care Plan. If you want windows done more often than your plan allows, or work your plan doesn't cover, we can do it privately at our normal prices.",
      },
    ],
  },

  "gutter-cleaning": {
    path: "/dva/gutter-cleaning",
    name: "Gutter Cleaning",
    title: "DVA Gutter Cleaning Gold Coast | Veterans' Home Care",
    description:
      "DVA gutter cleaning on the Gold Coast. Gutters cleared and downpipes flushed, so no one in the house climbs a ladder. We invoice DVA. Call (07) 5230 8293.",
    h1: "DVA Gutter Cleaning on the Gold Coast",
    subheading: "Gutters cleared and downpipes flowing, so no one in the house needs to climb a ladder.",
    image: "/images/gutter-1.jpg",
    imageAlt: "A gutter packed with leaves, then cleared and flowing",
    directAnswer: `DVA can pay for gutter cleaning. It is named in Veterans' Home Care home and garden maintenance (up to ${F.vhcHoursPerYear} hours a year, with a ${F.vhcCoPayPerHour}-an-hour co-payment capped at ${F.vhcCoPayCap}) and can be part of a Household Services approval at up to ${F.hhsHourlyRate} an hour inc GST in ${F.hhsHourlyRateYear}. We clear the gutters, flush every downpipe and take the waste away.`,
    included: [
      "Leaves, sludge and seed pods removed from every gutter run",
      "Downpipes flushed and tested so water reaches the drain",
      "Valleys and box gutters cleared where they can be reached safely",
      "Waste bagged and taken away, with no mess left on paths or gardens",
      "Loose brackets, rust or broken guard pointed out to you (repairs aren't DVA household services)",
    ],
    why: [
      {
        title: "No more ladders",
        body: "Gutter cleaning is one of the most common reasons people fall at home. Leaving it to a trained, insured team is the safe choice.",
      },
      {
        title: "Storm season",
        body: "Gold Coast summer storms dump a lot of rain fast. Blocked gutters overflow into eaves and walls and can flood under the roof. We aim to clear gutters before the wet.",
      },
      {
        title: "Fire and pests",
        body: "Dry leaves in gutters are fuel, and wet ones breed mosquitoes. Clear gutters remove both problems.",
      },
    ],
    privatePrice:
      "Paying privately, gutter cleaning is $275–$385 for a single-storey home and $440–$660 for double-storey, with downpipes flushed. Packed gutters add 10% and gutters with plants growing in them add 20%.",
    faqs: [
      {
        question: "Does DVA pay for gutter cleaning?",
        answer: `Yes. Gutter cleaning is one of the home and garden maintenance services in Veterans' Home Care, and it can be included in a Household Services approval. Under VHC you pay ${F.vhcCoPayPerHour} an hour, capped at ${F.vhcCoPayCap} in 12 months.`,
      },
      {
        question: "How many hours of gutter cleaning will DVA fund?",
        answer: `Veterans' Home Care allows up to ${F.vhcHoursPerYear} hours of home and garden maintenance in a 12-month period, shared across gutters, windows, lawns and similar jobs. Household Services hours are set by your individual approval. We tell you how long your gutters will take before we book.`,
      },
      {
        question: "Do you clean gutter guard for DVA clients?",
        answer: "Yes. Gutters with guard take longer because the guard has to be lifted and refitted, so we quote the extra time first. If it's more than your approved hours, you decide whether to pay the difference or leave it.",
      },
      {
        question: "Can you repair my gutters too?",
        answer: "We can tell you what we see, like loose brackets, rust holes or a sagging run. DVA's household services policy treats repairs as maintenance it doesn't fund, so you would need a roof plumber.",
      },
      {
        question: "How often should my gutters be cleaned?",
        answer: "Most Gold Coast homes need it once or twice a year, ideally before summer storms. Homes under gum trees, palms or poincianas can need it every three to four months.",
      },
      {
        question: "Do you take the rubbish away?",
        answer: "Yes. Gutter waste is bagged and taken with us. Under Veterans' Home Care you may need to pay for supplies or tip fees, and we will tell you before we start if there are any.",
      },
    ],
  },

  "solar-panel-cleaning": {
    path: "/dva/solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    title: "DVA Solar Panel Cleaning Gold Coast | Veterans",
    description:
      "Solar panel cleaning for DVA clients on the Gold Coast: when DVA pays, what to check in your approval, and our private prices from $220. Call (07) 5230 8293.",
    h1: "DVA Solar Panel Cleaning on the Gold Coast",
    subheading: "Pure-water cleaning that's safe for your panels, with a straight answer on whether DVA will pay.",
    image: "/images/solar-panel-hero.jpg",
    imageAlt: "Solar panels on a Gold Coast roof after cleaning",
    directAnswer: `Solar panel cleaning is not on DVA's published Veterans' Home Care task list, so VHC usually won't cover it. Under Household Services compensation it is paid only if your approval includes it. Check your determination letter or call DVA on ${F.dvaPhone}. If it is approved, we charge up to DVA's ${F.hhsHourlyRate} an hour and invoice DVA. If it isn't, our private price starts at $220 for up to 20 panels on a single-storey roof.`,
    included: [
      "Panels washed with purified water and soft brushes, with no detergent or high pressure, so warranties stay intact",
      "Bird droppings, salt film, pollen and lichen removed",
      "Frames and the edges where dirt builds up cleaned",
      "Visual check for cracked glass, loose mounts or nesting birds underneath",
      "Before and after photos sent to you",
      "Height-safe work with fall-arrest anchors set up before anyone works on the roof",
    ],
    why: [
      {
        title: "Never get on the roof",
        body: "Roofs are the most dangerous place on any home. If you have been hosing your panels from a ladder, please stop. This is a job for a trained, insured team.",
      },
      {
        title: "Power bills",
        body: "Dirty panels make less power. Salt spray and bird droppings are the worst offenders on the Gold Coast, and rain doesn't wash them off.",
      },
      {
        title: "Birds under panels",
        body: "Pigeons and mynas nest under panels and leave droppings on the glass. We check while we're up there and can quote mesh to keep them out.",
      },
    ],
    privatePrice:
      "Paying privately, solar panel cleaning starts at $220 for up to 20 panels on a single-storey roof. It is $275 for 21–25 panels, $330 for 26–30 and $440 for 31–40. Double-storey roofs add $50.",
    faqs: [
      {
        question: "Does DVA pay for solar panel cleaning?",
        answer: "Sometimes. It isn't listed in DVA's Veterans' Home Care home and garden maintenance tasks. Under Household Services compensation DVA only pays for tasks on your approval, so check your determination letter. If you're not sure, call DVA and ask whether solar panel cleaning can be included.",
      },
      {
        question: "What should I ask DVA about solar panel cleaning?",
        answer: `Call ${F.dvaPhone} and ask: "Is solar panel cleaning covered under my household services approval, and if not, can it be considered?" Have your DVA file number ready.`,
      },
      {
        question: "What if DVA won't pay for my solar panels?",
        answer: "We can clean them privately. Prices start at $220 for up to 20 panels on a single-storey roof, and we can often do them on the same visit as DVA-funded windows or gutters, so there's no extra call-out.",
      },
      {
        question: "How often should solar panels be cleaned on the Gold Coast?",
        answer: "Once or twice a year suits most homes. Beachside homes with salt spray, homes under trees and roofs with bird problems may need it every six months.",
      },
      {
        question: "Will cleaning void my panel warranty?",
        answer: "Not the way we do it. Panel makers warn against high pressure, harsh chemicals and walking on panels. We use pure water and soft brushes from the roof edge or between rows.",
      },
    ],
  },
};

export const DVA_STEPS = [
  {
    title: "Check what you're approved for",
    body: "Look at your Household Services determination letter, or your VHC Care Plan, for the tasks and hours approved. Not sure? Call DVA on 1800 VETERAN (1800 838 372).",
  },
  {
    title: "Call or send us your details",
    body: "Give us your name, address, DVA file number and what's approved. We will confirm what's covered and how many hours the job needs before booking.",
  },
  {
    title: "We do the job",
    body: "Our police-checked, insured cleaners come at a time that suits you.",
  },
  {
    title: "We invoice DVA",
    body: "We upload the invoice to DVA's Provider Upload Page ourselves. Anything outside your approval is quoted in writing first, and you decide.",
  },
];

// Service JSON-LD for a DVA page (shared by the React page and the prerender).
export function dvaServiceSchema(page, name) {
  const SITE = "https://gcwindowandpressurecleaning.com.au";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: page.description,
    serviceType: name,
    url: `${SITE}${page.path}/`,
    image: `${SITE}${page.image}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE}/#business`,
      name: "Gold Coast Window and Pressure Cleaning",
      telephone: "(07) 5230 8293",
      url: SITE,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Gold Coast" },
    audience: { "@type": "Audience", audienceType: "Veterans and DVA clients" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AUD",
    },
  };
}

// ── Suburb pages: /dva/<service>/<suburb>/ ──────────────────────────────────
// One page per service per suburb in src/data/locations.js. Not in the menus;
// reached from the "near you" lists on the DVA service pages and the sitemap.
// Each page carries the suburb's own notes (property mix, local conditions)
// plus a service-and-region paragraph, so pages differ by more than the name.
const REGION_NOTES = {
  "window-cleaning": {
    south_coast: "Ocean-facing glass here picks up salt within days, and salt left to bake etches the surface. A regular clean costs far less than replacing pitted glass.",
    central_coast: "Between the sea breeze and the canals, glass and balcony doors here carry a salt film most of the year, and tracks fill with grit fast.",
    central: "Away from the beach the problem is dust, traffic film and sprinkler spots rather than salt, with spider webs around frames and screens.",
    hinterland: "Under the trees it's pollen, sap and cobwebs, and shaded windows grow green mould on frames and tracks.",
    northern: "With building work still going on across the northern corridor, fine dust settles on glass and screens between cleans.",
    nsw_tweed: "We cross the border every week. DVA is a federal program, so your approval works the same in New South Wales as in Queensland.",
  },
  "gutter-cleaning": {
    south_coast: "Palm fronds, pandanus and Norfolk pine needles block gutters here, and salt air rusts any gutter that stays wet and full.",
    central_coast: "Palms and street trees drop into gutters all year, and salt air speeds up rust wherever leaves hold water.",
    central: "Gum leaves and poinciana pods are the usual culprits, and one summer storm will overflow a half-blocked gutter.",
    hinterland: "This is the hardest area on gutters. Heavy tree cover can fill them in a few months, so many homes here need three or four cleans a year.",
    northern: "Newer estates have fewer trees but lots of building dust and roof grit, which sets like mud in the gutters after rain.",
    nsw_tweed: "We cross the border every week. DVA is a federal program, so your approval works the same in New South Wales as in Queensland.",
  },
  "solar-panel-cleaning": {
    south_coast: "Salt spray dries into a film on panels this close to the surf, and rain doesn't shift it. Gulls and pigeons add to it.",
    central_coast: "Panels near the beach and canals build up a salt film that rain won't wash off, plus plenty of bird droppings.",
    central: "Dust, traffic film and bird droppings are the main output killers away from the coast.",
    hinterland: "Leaf litter, pollen and lichen build up on panels under trees, and shaded edges grow moss.",
    northern: "Construction dust settles on panels across the northern corridor and bakes on in the sun.",
    nsw_tweed: "We cross the border every week. DVA is a federal program, so your approval works the same in New South Wales as in Queensland.",
  },
};

export function dvaSuburbPath(serviceSlug, suburbSlug) {
  return `/dva/${serviceSlug}/${suburbSlug}`;
}

export function dvaSuburbPage(serviceSlug, suburb) {
  const base = DVA_PAGES[serviceSlug];
  if (!base || !suburb) return null;
  const lower = base.name.toLowerCase();
  const place = suburb.name;
  const title = `DVA ${base.name} ${place} | Gold Coast`;
  const description = `DVA ${lower} in ${place} (${suburb.postcode}) for Gold Card and White Card holders. Police-checked, insured, and we invoice DVA. Call (07) 5230 8293.`;
  const regionNote = REGION_NOTES[serviceSlug][suburb.region] || "";
  const solar = serviceSlug === "solar-panel-cleaning";
  const directAnswer = solar
    ? `We clean solar panels for DVA clients in ${place} (${suburb.postcode}). DVA pays for solar panel cleaning only when it is on your Household Services approval, so check your determination letter first. If it is approved we charge at or under DVA's ${F.hhsHourlyRate} an hour and invoice DVA. If it isn't, our private price starts at $220 for up to 20 panels on a single-storey roof.`
    : `Yes, we do DVA ${lower} in ${place} (${suburb.postcode}). If ${lower} is on your Household Services approval, we charge at or under DVA's standard rate of ${F.hhsHourlyRate} an hour inc GST and invoice DVA directly, so approved hours cost you nothing. Veterans' Home Care also covers ${serviceSlug === "window-cleaning" ? "windows" : "gutters"} (up to ${F.vhcHoursPerYear} hours a year), through the provider named on your Care Plan.`;
  const faqs = [
    {
      question: `Do you do DVA ${lower} in ${place}?`,
      answer: `Yes. We work in ${place} and the suburbs around it${suburb.nearbySuburbs?.length ? `, including ${suburb.nearbySuburbs.slice(0, 3).join(", ")}` : ""}. Call (07) 5230 8293 with your DVA file number and what's approved, and we will book a time.`,
    },
    {
      question: solar ? `Will DVA pay for solar panel cleaning in ${place}?` : `Will DVA pay for ${lower} in ${place}?`,
      answer: solar
        ? `Only if solar panel cleaning is on your Household Services approval. It isn't on DVA's Veterans' Home Care task list. DVA's rules are the same in every suburb, so check your determination letter or call DVA on ${F.dvaPhone}.`
        : `If it's on your approval, yes. DVA's rules are the same in every suburb: Household Services pays your chosen provider up to ${F.hhsHourlyRate} an hour inc GST in ${F.hhsHourlyRateYear}, and Veterans' Home Care covers up to ${F.vhcHoursPerYear} hours of home and garden maintenance a year for a ${F.vhcCoPayPerHour}-an-hour co-payment.`,
    },
    ...base.faqs.slice(1),
  ];
  return {
    path: dvaSuburbPath(serviceSlug, suburb.slug),
    name: base.name,
    title,
    description,
    h1: `DVA ${base.name} in ${place}`,
    subheading: base.subheading,
    image: base.image,
    imageAlt: base.imageAlt,
    directAnswer,
    regionNote,
    faqs,
  };
}
