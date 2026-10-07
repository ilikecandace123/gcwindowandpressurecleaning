// New expert guides, October 2026 — AI-search content plan (AnswerThePublic
// clusters 1–3). Kept in their own module so the review diff is easy to read;
// guides.js merges them into GUIDES. Same design rules as guides.js:
// - `directAnswer` first, 2–4 sentences, extractable verbatim.
// - Every section heading is a real customer question, and the first sentence
//   or two under it answers it directly; detail follows.
// - Prices are taken from the live instant-quote engine (inc GST) or the
//   published guide prices — never invented. Re-run them if pricing changes.
// - metaTitle 31–59 chars, metaDescription 126–157 chars.

export const NEW_GUIDES_2026_10 = [
  {
    slug: "is-a-window-cleaning-plan-worth-it",
    metaTitle: "Is a Window Cleaning Plan Worth It? | Gold Coast",
    metaDescription:
      "What a window cleaning plan is, how scheduled cleaning works, the real per-visit savings for Gold Coast homes, and when a plan isn't worth it.",
    h1: "What Is a Window Cleaning Plan — and Is It Worth It?",
    updated: "2026-10-07",
    directAnswer:
      "A window cleaning plan is a standing booking: you choose monthly, quarterly or half-yearly, and your exterior windows and screens are cleaned on that schedule at a discounted per-visit price, with no lock-in contract. For most Gold Coast homes on the coastal strip it is worth it — glass that is cleaned before salt and grime build up is quicker to clean and never gets the chance to etch, and on exterior cleans the plan discount saves a typical double-storey home around $400 a year against booking the same cleans one at a time.",
    sections: [
      {
        heading: "What is a window cleaning plan?",
        paragraphs: [
          "It is scheduled exterior window cleaning at a set frequency and a set discounted price. You pick how often — every month, every three months or every six months — and the visits are pre-booked, so you never have to remember to call and you get priority on the calendar.",
          "Our plans cover the outside of the glass, the frames and sills, and a deep clean of the flyscreens, because the exterior is the side that gets dirty fastest here. Interior glass and tracks are quoted separately and you can add them to any visit when you want them done."
        ]
      },
      {
        heading: "How does a window cleaning subscription work?",
        paragraphs: [
          "You get a price once, choose a frequency, and the cleans happen on their own from then on. In practice:"
        ],
        list: [
          "Get your price in the instant quote — pane count, storeys and frequency — and the plan discount is shown on the per-visit price.",
          "Book your first clean. Every visit after that is pre-scheduled at your chosen interval.",
          "Every visit includes the exterior glass, frames, sills and a flyscreen deep clean, plus a 7-day rain guarantee: if it rains within 7 days, affected windows are touched up free.",
          "No lock-in. If your situation changes — you sell, you go away, you want a different frequency — just tell us."
        ]
      },
      {
        heading: "Is a window cleaning plan worth it? The real numbers",
        paragraphs: [
          "For mid-size and larger homes, yes — the saving compounds every visit. These figures come straight from our instant quote engine, GST included. Pane counts are the total number of glass panes in the home, and the prices are for the outside only — exterior glass, frames, sills and flyscreens:",
        ],
        list: [
          "Double-storey home, 41–50 panes, exterior only: $400 as a one-off clean, $300 a visit on a quarterly plan. Four cleans a year is $1,600 booked one at a time or $1,200 on the plan — $400 a year saved.",
          "Single-storey home, 41–50 panes, exterior only: $350 one-off, $250 a visit quarterly — $400 a year over four cleans.",
          "Smaller single-storey home, 21–30 panes, exterior only: $220 one-off, $165 a visit on a plan. There is a $165 per-visit minimum on plans, so smaller homes save less per visit (about $55) — still around $220 a year on a quarterly schedule.",
          "Inside windows and tracks are an optional add-on to any visit, priced by pane count: $150 extra for 21–30 panes and $250 extra for 41–50 panes. A single-storey home with 41–50 panes cleaned inside and out is $600 as a one-off, or $500 on a quarterly plan visit."
        ]
      },
      {
        heading: "Why regular cleaning costs less than occasional cleaning",
        paragraphs: [
          "Glass that is cleaned every few months comes up quickly; glass left for a year or two does not. On the coast, a year of salt film, sprinkler spotting and frame run-off bonds to the surface, and it can need extra time and products to shift — and if salt is left long enough it etches the glass, which no clean can undo. Tracks are the same: a year of sand and dead insects packed into a stacker door track wears out rollers, and a roller replacement costs more than a year of cleaning.",
          "That is the real case for a plan. The discount is the visible saving; the bigger one is never having glass, screens or tracks reach the point where they need fixing rather than cleaning."
        ]
      },
      {
        heading: "How often should I get my windows cleaned on the Gold Coast?",
        paragraphs: [
          "Every three months suits most Gold Coast homes. Beachfront and direct ocean-view glass needs every 4–6 weeks, and hinterland homes away from the salt can usually go every 4–6 months.",
          "Quarterly is our most popular plan for exactly that reason. Monthly makes sense if you are on the beachfront or want the glass spotless year-round; half-yearly suits inland homes that just want the worst of the build-up kept away. Our full guide covers frequency suburb by suburb."
        ]
      },
      {
        heading: "When a plan is not worth it",
        paragraphs: [
          "We would rather you choose the right thing than the bigger thing. A plan is probably not for you if you are selling in the next couple of months (book a one-off pre-sale clean instead), if you are a short-term tenant, or if you live well inland, away from trees and roads, and are genuinely happy with one clean a year. In those cases a one-off clean is the honest answer."
        ]
      }
    ],
    faqs: [
      {
        question: "Is there a lock-in contract on a window cleaning plan?",
        answer:
          "No. A plan simply pre-books your cleans at your chosen frequency so you get priority scheduling and the discounted rate. If your situation changes, tell us and we will change or stop it."
      },
      {
        question: "Does a window cleaning plan include inside windows?",
        answer:
          "Plans cover the exterior glass, frames, sills and flyscreens — the side that gets dirty fastest. Interior windows and tracks are quoted separately, and you can add them to any scheduled visit whenever you want them done."
      },
      {
        question: "What happens if it rains after my windows are cleaned?",
        answer:
          "Every plan visit has a 7-day rain guarantee: if it rains within 7 days of your clean, we come back and touch up the affected windows free. Freshly cleaned glass also sheds rain far better than dirty glass, because there is nothing on the surface for droplets to cling to."
      },
      {
        question: "Can I change how often my windows are cleaned?",
        answer:
          "Yes. Plenty of customers start half-yearly and move up to quarterly once they see how quickly coastal glass builds up again, and beachfront homes often step up to monthly. Just let us know before your next visit."
      },
      {
        question: "Is a plan cheaper than booking window cleaning when I need it?",
        answer:
          "Per visit, yes: plans take $50–$150 off every clean depending on frequency, with a $165 minimum per visit. A double-storey home with 41–50 panes, for example, is $400 one-off or $300 a visit on a quarterly plan for the exterior glass, frames and screens; inside windows and tracks are extra."
      }
    ],
    related: [
      { label: "Window Cleaning Plans — prices & frequencies", href: "/window-cleaning-plans/" },
      { label: "How often should you clean your windows?", href: "/guides/how-often-should-you-clean-your-windows/" },
      { label: "Window Cleaning service & prices", href: "/window-cleaning/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "cleaning-before-selling-your-house-gold-coast",
    metaTitle: "Cleaning Before Selling Your House | Gold Coast",
    metaDescription:
      "What exterior cleaning to do before selling a Gold Coast house: windows, driveway, walls and roof — the right order, when to book it, and what it costs.",
    h1: "What Cleaning Should You Do Before Selling Your House?",
    updated: "2026-10-07",
    directAnswer:
      "Before listing photos, have the windows cleaned inside and out (with tracks and screens), the driveway and front paths pressure cleaned, and any green or black growth soft washed off the walls — these are what buyers see first, in the photos and from the kerb. If the roof is visibly streaked, clean it first, because roof and wall runoff lands on the paths and glass. Book it all in the week before the photographer, so everything is clean and fully dry on the day.",
    sections: [
      {
        heading: "What cleaning should I do before selling my house?",
        paragraphs: [
          "Focus on what shows up in listing photos and in the first ten seconds of an open home: the glass, the driveway, the front path and the walls. On the Gold Coast that usually means:"
        ],
        list: [
          "Windows inside and out, including tracks and flyscreens — buyers open sliding doors, and a gritty, jammed track reads as neglect.",
          "Driveway, front path and entry pressure cleaned — the driveway is often the biggest surface in the hero photo.",
          "House soft wash if there is any green or black on the render, eaves or southern walls.",
          "Roof clean if the roof is streaked or patchy and visible from the street or in drone shots.",
          "Pool surrounds and outdoor entertaining areas if they feature in the photos.",
          "Gutters if they are overflowing or have plants growing out of them — building inspectors note it."
        ]
      },
      {
        heading: "Does window and pressure cleaning increase home sale value?",
        paragraphs: [
          "It does not add value the way a renovation does — it stops you losing value. Grimy glass, a stained driveway and mouldy walls tell a buyer the house has been maintained badly, and buyers discount for the work they think they will inherit. A clean exterior removes that reason to negotiate you down and makes the photos do their job.",
          "It is also one of the cheapest things on the pre-sale list. A full exterior refresh on a typical home costs a small fraction of what agents' marketing and styling cost, and it is finished in a day or two."
        ]
      },
      {
        heading: "Window cleaning before selling a house — what to ask for",
        paragraphs: [
          "Ask for inside and out, tracks and screens — not just a glass wipe. Listing photographers shoot through windows from inside, so interior glass shows in the photos as much as exterior.",
          "On coastal homes, check the glass in low afternoon sun before you book: a salt haze that is invisible head-on shows up as a grey film in photos taken towards the light. If a pane has hard-water spots from sprinklers or white run-off from the frames, mention it when booking so it can be treated rather than just washed."
        ]
      },
      {
        heading: "Pressure cleaning before an open home — when to book it",
        paragraphs: [
          "Book driveway and path cleaning two to seven days before photos or your first open home. Concrete takes time to dry evenly: a driveway photographed while still damp looks patchy and darker in the low spots, even when it is perfectly clean.",
          "Mention oil, rust or tyre marks when you book. Some old stains can be lightened but not fully removed, and it is better to know that before the photographer arrives than after."
        ]
      },
      {
        heading: "In what order should the exterior be cleaned before selling?",
        paragraphs: [
          "Top to bottom, with windows last: roof first, then walls (soft wash), then gutters, then the driveway and paths, then the windows. Roof and wall cleaning sends runoff onto paths and glass, so doing the windows earlier means doing them twice.",
          "If everything is booked with one company, this sequencing is done for you in one or two visits."
        ]
      },
      {
        heading: "What does pre-sale exterior cleaning cost on the Gold Coast?",
        paragraphs: [
          "As a guide: windows inside and out are $385–$550 for most single-storey homes and $500–$800 for double-storey homes; an average driveway is around $220 to pressure clean; a house soft wash starts at $495 for a small single-storey home; and roof soft washing starts around $700. You can price your exact combination in the instant quote in about two minutes."
        ]
      }
    ],
    faqs: [
      {
        question: "How far ahead should I book cleaning before listing photos?",
        answer:
          "Book the work for the week before the photographer and tell us the photo date when you book. That leaves time for concrete to dry fully and for anything weather-delayed to be rescheduled before the shoot, not after."
      },
      {
        question: "Should I clean the roof before selling?",
        answer:
          "If it is streaked, patchy or visibly mossy from the street or in drone photos, yes — a dirty roof makes a home look older than it is, and building inspectors note moss and lichen. If it is clean already, spend the money on the windows and driveway instead."
      },
      {
        question: "Do I need to be home for pre-sale cleaning?",
        answer:
          "For exterior-only work, usually not — we need access to the yard, a water tap and the gates. Inside windows and tracks need someone to let us in, which can be you, a tenant or your agent."
      },
      {
        question: "Is it worth cleaning windows if the house is being sold as a renovator?",
        answer:
          "Usually still yes for the glass and driveway, because they are cheap and they lift every photo. Skip the roof and wall work on a genuine renovator — buyers expect to do that themselves."
      }
    ],
    related: [
      { label: "Window Cleaning service & prices", href: "/window-cleaning/" },
      { label: "Pressure Cleaning service & prices", href: "/pressure-cleaning/" },
      { label: "House Softwash service & prices", href: "/house-softwash/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "salt-air-mould-windows-gold-coast",
    metaTitle: "Salt Air & Mould on Windows | Gold Coast Guide",
    metaDescription:
      "How salt air near the beach damages glass, frames and tracks, why Queensland windows grow mould, and how to remove it and protect your windows for good.",
    h1: "How Salt Air and Humidity Damage Gold Coast Windows — and How to Protect Them",
    updated: "2026-10-07",
    directAnswer:
      "Salt air leaves a film on glass that pulls moisture from the air and, left for months, etches the surface permanently; it also corrodes aluminium frames and seizes sliding-door tracks and rollers. Humidity adds mould — black spots in tracks, seals and silicone, and green algae on shaded frames. The protection is the same for both: rinse the salt off before it bonds, keep tracks clear, and have exposed glass cleaned on a regular schedule — every 4–6 weeks on the beachfront and every 2–3 months within about 2km of the coast.",
    sections: [
      {
        heading: "How does salt air affect windows near the beach?",
        image: {
          src: "/images/glass-salt-mineral-etching.jpg",
          alt: "Glass panel with white salt and mineral spots etched into the surface beside a clear, clean glass panel",
          caption: "Salt and mineral deposits left on glass for months (left) bond to and pit the surface. Clean glass beside it for comparison.",
          width: 1200,
          height: 870
        },
        paragraphs: [
          "It coats every exposed pane in a fine salt film within weeks, and that film does slow damage. Salt is hygroscopic — it draws moisture out of humid air and holds it against the glass — and with daily sun that slowly etches microscopic pits into the surface. Etched glass looks permanently hazy and cannot be cleaned back to clear; the pane has to be replaced.",
          "The rest of the window suffers too. Aluminium frames oxidise and go chalky, and the white run-off from oxidised frames stains the glass edges. Salt and sand collect in sliding-door tracks and grind down the rollers, which is why beachfront stacker doors stiffen and jam. Flyscreen mesh corrodes and tears early."
        ]
      },
      {
        heading: "How far inland does salt air reach on the Gold Coast?",
        paragraphs: [
          "Glass within about 2km of the beach picks up a salt film quickly, and beachfront and ocean-view glass is the worst affected. Onshore winds carry it further on some days, so canal estates and central suburbs still get some — but far less than the coastal strip. You often cannot see it head-on; look at the glass with low afternoon sun behind it and it shows up as a grey haze."
        ]
      },
      {
        heading: "How do I protect my windows from salt air?",
        paragraphs: [
          "Get the salt off before it bonds, and keep the moving parts clean. The things that genuinely help:"
        ],
        list: [
          "Regular professional cleaning of exposed glass: every 4–6 weeks for beachfront glass facing the ocean, every 2–3 months within about 2km of the beach.",
          "Rinse with plenty of fresh water before wiping anything. A dry cloth on salty glass drags salt crystals across the surface and can scratch it.",
          "Keep tracks clear of sand and grit, and clean them before the rollers start to drag — not after.",
          "Rinse flyscreens with fresh water between cleans; salt left in the mesh shortens its life.",
          "Clean frames as well as glass, so oxidation run-off does not stain the pane edges."
        ]
      },
      {
        heading: "What causes mould on windows in Queensland?",
        paragraphs: [
          "Moisture that sits on or around the glass for long enough. In our humid climate mould grows wherever water collects and dries slowly: in sliding-door and window tracks, in rubber seals, in the silicone around the glass, and on the inside of panes that fog up with condensation on cool mornings or in air-conditioned bedrooms and bathrooms.",
          "Outside, the green growth on frames and sills is usually algae, and it appears first on shaded, south-facing windows and anything behind thick garden beds — the same places the walls go green."
        ]
      },
      {
        heading: "How do I remove mould from windows and tracks?",
        image: {
          src: "/images/window-track-mould-before-after.jpg",
          alt: "Before and after of a sliding window track: black mould spots and grime before, clean white track after",
          caption: "A mouldy window track before and after a professional clean.",
          width: 1200,
          height: 630
        },
        paragraphs: [
          "Remove the dry debris first, then kill the mould, then fix the moisture. Vacuum or brush the sand and dead insects out of the track before using any liquid, otherwise you make a mould-filled sludge. Then treat the black spots with a mould cleaner suitable for aluminium and rubber, leave it for the time on the label, and rinse and dry the track.",
          "Black mould that has grown into the silicone around the glass usually will not clean out — the silicone needs replacing. And if the inside of a pane fogs every morning, improve the ventilation in that room, or the mould will come straight back. For outside frames and sills, the algae comes off as part of a normal window clean; if it is spreading onto the walls, that is a house wash job."
        ]
      },
      {
        heading: "Can salt-etched glass be repaired?",
        paragraphs: [
          "Light surface staining can sometimes be improved by specialist glass restoration, but true etching is permanent and the usual fix is replacing the pane. That is why the cheap answer on the coast is frequency: glass cleaned every few months never builds up enough salt to etch."
        ]
      }
    ],
    faqs: [
      {
        question: "How often should beachfront windows be cleaned?",
        answer:
          "Every 4–6 weeks for glass facing the ocean, and every 2–3 months for homes within about 2km of the beach. That is often enough to clear the salt film before it can etch the glass. A monthly window cleaning plan is the simplest way to keep to it."
      },
      {
        question: "Does rain wash salt off windows?",
        answer:
          "Not properly. Rain rinses some salt away but leaves the rest spread in dried spots with dust and pollen, and on the coast the rain itself can carry salt. Glass needs a proper clean to remove the film."
      },
      {
        question: "Is salt air bad for tinted or Low-E glass?",
        answer:
          "Yes — coated glass needs the salt removed just as much, and needs it done gently. Abrasive pads and scrapers can damage tint film and Low-E coatings, so tell your cleaner what glass you have before they start."
      },
      {
        question: "Why do my sliding doors get harder to open near the beach?",
        answer:
          "Salt and sand build up in the track and wear the rollers, and corrosion adds drag. Cleaning the tracks regularly is the cheapest fix; once a roller is worn out it needs replacing, which costs more than keeping the track clean."
      }
    ],
    related: [
      { label: "Window Cleaning Plans — monthly, quarterly, half-yearly", href: "/window-cleaning-plans/" },
      { label: "Window Cleaning service & prices", href: "/window-cleaning/" },
      { label: "Why does my house grow mould outside?", href: "/guides/house-washing-mould-gold-coast/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  }
];
