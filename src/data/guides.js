// Expert guides — long-form Q&A content targeting the real questions
// customers ask (sourced from search data / People Also Ask, July 2026).
//
// DESIGN RULES (do not break):
// - Every guide opens with `directAnswer`: a 2–4 sentence answer to the H1
//   question, extractable verbatim by AI Overviews / AI search engines.
// - All prices MUST match the instant quote engine + llms.txt guide prices.
//   If pricing changes, update here, in llms.txt, and in service page FAQs.
// - metaTitle 31–59 chars, metaDescription 126–157 chars (seo-validate rules).
// - Voice: practical, first-person-plural tradie expertise. Gold Coast
//   specifics (salt air, storm season, humidity) in every guide.

export const GUIDES = [
  {
    slug: "how-often-should-you-clean-your-windows",
    metaTitle: "How Often Should You Clean Your Windows? | Gold Coast",
    metaDescription:
      "A Gold Coast window cleaner's honest answer on cleaning frequency — why salt air changes the rules, what etching costs you, and when to book.",
    h1: "How Often Should You Clean Your Windows?",
    updated: "2026-07-17",
    directAnswer:
      "For most Gold Coast homes, exterior windows should be professionally cleaned every 3 months. Beachfront and ocean-view properties need cleaning every 4–6 weeks because salt spray builds a film that etches permanently into glass if left for months. Inland and hinterland homes can usually stretch to every 4–6 months.",
    sections: [
      {
        heading: "Why the Gold Coast is harder on glass than almost anywhere",
        paragraphs: [
          "We clean windows from Coolangatta to Beenleigh, and the single biggest factor in how fast glass gets dirty here is distance from the ocean. Salt aerosol travels a surprising way inland — homes within about 2km of the beach get a fine salt film on every pane within weeks. You often can't see it head-on, but catch the glass in afternoon sun and it looks hazy.",
          "The problem isn't just appearance. Salt is hygroscopic — it pulls moisture out of the air and holds it against the glass. Combined with UV, that slowly etches microscopic pits into the surface. Once glass is etched, no amount of cleaning brings it back; the pane has to be replaced. We regularly see beachfront apartments at Main Beach, Surfers Paradise and Palm Beach where seldom-cleaned panes have permanent hazing while regularly cleaned ones next to them are perfect."
        ]
      },
      {
        heading: "Recommended cleaning frequency by location",
        list: [
          "Beachfront / direct ocean exposure (e.g. Main Beach, Surfers, Mermaid Beach, Palm Beach, Kirra): every 4–6 weeks for glass facing the ocean.",
          "Within ~2km of the coast (most of the coastal strip): every 2–3 months.",
          "Central suburbs and canal estates (e.g. Robina, Mermaid Waters, Broadbeach Waters): every 3–4 months — canal homes still get salt, plus hard-water spotting from sprinklers.",
          "Hinterland and northern suburbs (e.g. Mudgeeraba, Nerang, Ormeau): every 4–6 months is usually fine unless you're under trees or near a busy road.",
          "Inside glass: once or twice a year for most homes — it collects far less grime than the exterior."
        ]
      },
      {
        heading: "What happens if you leave windows too long",
        paragraphs: [
          "Beyond salt etching, the practical issues we see are: hard-water staining from sprinklers hitting glass (mineral deposits bond harder the longer they sit), oxidation runoff from aluminium frames staining the pane edges, and tracks so packed with dead insects, sand and mould that sliding doors start jamming and rollers wear out. A roller replacement on a stacker door costs far more than a year of window cleaning.",
          "Fly screens matter too — a clogged screen re-deposits dust onto freshly cleaned glass the first time it rains, which is why our standard clean includes screens and tracks, not just the glass."
        ]
      },
      {
        heading: "What professional window cleaning costs on the Gold Coast",
        paragraphs: [
          "As a guide: apartments and small offices are $220–$440 inside and out, single-storey homes $385–$550, and double-storey homes $500–$800 including a deep track and screen clean. Large homes with lots of glass are $800+.",
          "If you want the 'always clean' result without thinking about it, our Window Wellness plans pre-book exterior cleans at a discount: $150 off every visit on a monthly plan, $100 off quarterly, or $50 off half-yearly — with a free flyscreen deep clean and a 7-day rain guarantee on every visit."
        ]
      }
    ],
    faqs: [
      {
        question: "Is quarterly window cleaning really necessary, or is that just upselling?",
        answer: "Honest answer: it depends where you live. In the hinterland, quarterly is more than most homes need — every 4–6 months is fine. On the coastal strip, quarterly is the minimum to prevent salt etching, and beachfront glass genuinely needs monthly or six-weekly attention. We'd rather tell you the right interval for your street than sell you visits you don't need."
      },
      {
        question: "Does rain clean windows?",
        answer: "No — rain makes them worse. Rain picks up dust and pollen on the way down and dries in dirty spots, and on the Gold Coast it often carries salt as well. Rain on recently professionally cleaned glass sheets off with minimal spotting (clean glass has nothing for droplets to grab), which is why we offer a 7-day rain guarantee on our plans."
      },
      {
        question: "Can I clean coastal windows myself with vinegar or Windex?",
        answer: "You can, and for inside glass it works fine. Exterior coastal glass is harder: household products smear the salt film around rather than dissolving it, and you'll struggle above ground level. If you DIY, use plenty of fresh water first to flush the salt off, then a squeegee — not a dry cloth, which grinds salt crystals across the glass."
      },
      {
        question: "How often should commercial shopfront windows be cleaned?",
        answer: "Street-facing retail glass on the Gold Coast is typically cleaned fortnightly or monthly — customers judge a shop by its glass. Offices without street traffic usually run quarterly. We service shopfronts from Southport to Coolangatta on recurring schedules."
      }
    ],
    related: [
      { label: "Window Cleaning service & prices", href: "/window-cleaning/" },
      { label: "Window Wellness maintenance plans", href: "/window-cleaning-plans/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "pressure-cleaning-vs-soft-washing",
    metaTitle: "Pressure Cleaning vs Soft Washing: The Difference",
    metaDescription:
      "What's the difference between pressure cleaning and soft washing? A Gold Coast exterior cleaner explains which method suits every surface.",
    h1: "Pressure Cleaning vs Soft Washing: What's the Difference?",
    updated: "2026-07-17",
    directAnswer:
      "Pressure cleaning uses high-pressure water (roughly 2,000–4,000 PSI) to physically blast grime off hard surfaces like concrete driveways and pavers. Soft washing uses low pressure (under 500 PSI — about a garden hose) with biodegradable cleaning solutions that kill mould, algae and lichen at the root. Hard, ground-level surfaces get pressure cleaned; roofs, render, cladding and painted surfaces should only ever be soft washed.",
    sections: [
      {
        heading: "The rule of thumb: pressure for hard ground, soft wash for everything above it",
        paragraphs: [
          "After thousands of jobs on the Gold Coast, the decision is nearly always this simple: if the surface is hard, mineral-based and at ground level — concrete, exposed aggregate, pavers, stone, brick paths — high pressure is the right tool. If the surface is painted, rendered, coated, or up on the house — roofs, walls, cladding, gutters' exteriors, colorbond fences — soft washing is correct and high pressure will cause damage.",
          "The reason is that grime on walls and roofs is mostly biological: mould, algae and lichen growing in our humid subtropical climate. Blasting it with pressure takes the visible growth off but leaves the root structure alive, so it grows back within months — and the pressure itself strips paint, gouges render, drives water behind cladding and under roof tiles. Soft-wash solutions kill the organism, so the surface stays clean 4–6 times longer."
        ]
      },
      {
        heading: "Which method for which surface",
        list: [
          "Concrete driveway, paths, pool surrounds: pressure cleaning (with a surface cleaner attachment for an even finish, not wand stripes).",
          "Pavers and exposed aggregate: pressure cleaning at moderated pressure — old or sandy pavers can be blasted apart at full pressure.",
          "House exterior walls (render, brick, cladding, weatherboard): soft wash only.",
          "Roof (concrete tile, terracotta, Colorbond): soft wash only — high pressure strips tile coatings and voids Colorbond warranties.",
          "Timber decks and fences: low pressure or soft wash — high pressure furs the timber grain.",
          "Solar panels: neither — specialised pure-water cleaning only, never a pressure washer."
        ]
      },
      {
        heading: "Is soft washing safe for plants, pets and tanks?",
        paragraphs: [
          "The solutions we use are biodegradable and applied at low concentration. We pre-wet gardens before and rinse after washing, which is standard practice to protect plants. If your home is on tank water, tell us when booking — we disconnect downpipes so no wash water enters the tank. Pets just need to stay off wet areas until they dry."
        ]
      },
      {
        heading: "What each service costs on the Gold Coast",
        paragraphs: [
          "Pressure cleaning: an average driveway is around $220, a medium driveway $440, and an extra-large driveway $660+. Our full home package — driveway, pathways, patio and pool area — is around $660.",
          "House soft washing: from $495 for a small single-storey home, $770 for a large single-storey or small double-storey, $990 for an XL single or large double, and $1,200+ beyond that. Roof soft washing starts at $700. You can price your exact combination in about two minutes with our instant quote tool."
        ]
      }
    ],
    faqs: [
      {
        question: "Can't I just hire a pressure washer from Bunnings and do it myself?",
        answer: "For a small concrete path, sure. For driveways, the rental units usually lack a surface cleaner attachment, so you get zebra striping that only shows up once it dries. For houses and roofs, please don't — every year we get called to fix DIY damage: stripped paint, fretted mortar, water forced into wall cavities, and cracked tiles from walking a roof without the right gear."
      },
      {
        question: "Does soft washing use bleach? Is that safe?",
        answer: "Soft-wash solutions are typically sodium-hypochlorite based — the same active as pool chlorine — blended with surfactants, at concentrations calibrated to the surface. Applied properly, it breaks down quickly and is rinsed thoroughly. It's the method every major roofing and paint manufacturer recommends over pressure, precisely because it cleans without mechanical damage."
      },
      {
        question: "How long do results last?",
        answer: "Pressure-cleaned concrete typically stays smart for 1–2 years depending on shade and traffic. Soft-washed walls and roofs stay clean 2–4 years because the treatment kills the biological growth rather than trimming it. Shaded, south-facing surfaces regrow fastest in our climate."
      },
      {
        question: "What PSI is safe for house walls?",
        answer: "Under 500 PSI — which is why it's called soft washing. Typical petrol pressure washers run 2,500–4,000 PSI. Even at a distance, that's enough to strip acrylic render coatings, force water through weep holes, and shred flyscreens. If a cleaner quotes to 'pressure clean' your painted or rendered house, ask exactly what pressure they'll use."
      }
    ],
    related: [
      { label: "Pressure Cleaning service & prices", href: "/pressure-cleaning/" },
      { label: "House Softwash service & prices", href: "/house-softwash/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "does-roof-cleaning-damage-tiles",
    metaTitle: "Does Roof Cleaning Damage Tiles? | Gold Coast Guide",
    metaDescription:
      "Roof cleaning only damages tiles when done with high pressure. Here's how soft washing protects concrete, terracotta and Colorbond roofs.",
    h1: "Does Roof Cleaning Damage Tiles?",
    updated: "2026-07-17",
    directAnswer:
      "Professional roof cleaning does not damage tiles when it's done by soft washing — low pressure with a biocide treatment. What damages tiles is high-pressure cleaning: it strips the protective coating off concrete tiles, blasts the glaze off terracotta, dislodges ridge-capping mortar and can force water under tiles into the ceiling. If a cleaner plans to walk your roof with a high-pressure wand, that's the damage risk — not the cleaning itself.",
    sections: [
      {
        heading: "Why high pressure ruins roofs (and why some cleaners still use it)",
        paragraphs: [
          "Concrete roof tiles are protected by a thin factory coating. High-pressure water — 3,000+ PSI at close range — erodes that coating along with the moss, leaving the porous concrete underneath exposed. The roof looks great for a few months, then absorbs water, grows moss back faster than before, and ages years ahead of schedule. Terracotta is worse: pressure crazes and strips the fired glaze, which cannot be reapplied. On Colorbond, high pressure can lift the paint system and void the warranty.",
          "Some operators still pressure-clean roofs because it's fast and the damage isn't visible from the ground on day one. The industry-accepted method — and what roofing manufacturers specify — is soft washing."
        ]
      },
      {
        heading: "How soft washing cleans a roof safely",
        paragraphs: [
          "We apply a biodegradable biocide solution at low pressure, let it dwell, and rinse at pressures similar to heavy rain. The solution kills moss, lichen and algae at the root rather than shaving them off. Lichen — the crusty grey-orange growth that bonds chemically to the tile surface — often takes a few weeks to fully release and wash away with weather after treatment, which is normal and means the root system is dead.",
          "The distinction between moss and lichen matters: moss is soft and shallow-rooted and comes away readily; lichen is a composite organism that penetrates the tile surface. Scraping or blasting lichen takes tile surface with it. Chemical treatment is the only method that removes it without damage."
        ]
      },
      {
        heading: "Why Gold Coast roofs grow moss and lichen so fast",
        paragraphs: [
          "South East Queensland's combination of summer humidity, storm-season rain (November–April) and warm nights is ideal for biological growth. Shaded southern roof faces and anything under trees grow fastest. Coastal salt also feeds a grimy film that darkens tiles. Most Gold Coast roofs benefit from a professional clean every 2–3 years; coastal homes within a couple of kilometres of the beach are closer to every 1–2 years.",
          "Left untreated, moss and lichen aren't cosmetic. They hold moisture against the tile, block valleys and gutters, and lift tile edges — which is how leaks start. Treating growth early is dramatically cheaper than re-roofing: a professional clean is $700–$1,600 for most homes, while a roof replacement runs $15,000–$60,000."
        ]
      },
      {
        heading: "What safe roof cleaning costs",
        paragraphs: [
          "On the Gold Coast, roof soft washing starts at $700 for a flatter single-storey roof and ranges up to about $1,600 for a steeper double-storey. How dirty the roof is affects the price — established lichen takes more product and time than a light algae film. Three storeys and commercial roofs are quoted on inspection. For tile roofs we also offer an optional post-clean biocide/anti-moss treatment that suppresses regrowth for 12–24 months.",
          "Every roof job includes clearing the gutters of debris the clean dislodges, and we check for cracked tiles, lifted ridge capping and blocked valleys while we're up there — most homeowners never see their own roof up close, and catching a cracked tile early is a $20 fix instead of a ceiling repair."
        ]
      }
    ],
    faqs: [
      {
        question: "Will roof cleaning fix the black streaks on my roof?",
        answer: "Yes — the black streaking on Gold Coast roofs is almost always algae and grime film, and soft washing removes it completely. If streaks remain after cleaning, they're usually shadow-stains where lichen previously etched the coating, which indicates the roof was cleaned later than ideal."
      },
      {
        question: "Is it safe to walk on a tile roof to clean it?",
        answer: "Only with training. Tiles crack when stepped on anywhere but the lower third overlapping edge, and brittle older terracotta shouldn't be walked at all where avoidable. Our technicians are trained in tile-safe walking and use appropriate access equipment — and if we do crack a tile, we replace it. That's also a good reason not to DIY your roof clean."
      },
      {
        question: "Can you clean a Colorbond roof?",
        answer: "Yes — soft washing is safe for Colorbond and is the method BlueScope's care guidelines align with. High pressure, wire brushing or harsh solvents can damage the paint system and affect warranty. Soft washing removes the grime and salt film without touching the coating."
      },
      {
        question: "My roof is being cleaned before solar installation — is that worth doing?",
        answer: "Very much so. Once panels are installed, the roof underneath them can't be properly cleaned for the 25-year life of the system. Cleaning (and repairing) the roof before solar goes on is standard good practice, and we regularly do pre-solar cleans on the Gold Coast."
      }
    ],
    related: [
      { label: "Roof Cleaning service & prices", href: "/roof-cleaning/" },
      { label: "Gutter Cleaning service & prices", href: "/gutter-cleaning/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "driveway-pressure-cleaning-cost",
    metaTitle: "Driveway Pressure Cleaning Cost Gold Coast (2026)",
    metaDescription:
      "Driveway pressure cleaning on the Gold Coast costs $220-$660 for most homes. Real 2026 prices by driveway size, plus what affects the quote.",
    h1: "How Much Does Driveway Pressure Cleaning Cost on the Gold Coast?",
    updated: "2026-07-17",
    directAnswer:
      "On the Gold Coast in 2026, professional driveway pressure cleaning costs around $220 for an average single-car driveway, $440 for a medium double driveway, and $660+ for extra-large or steep driveways. A full home exterior package — driveway, pathways, patio and pool surrounds — is around $660. Prices assume standard concrete; heavy oil staining or delicate surfaces like old pavers can add to the job.",
    sections: [
      {
        heading: "What you're actually paying for",
        paragraphs: [
          "A proper driveway clean isn't a bloke with a wand making stripes. We use a rotary surface cleaner — essentially a pressure-washing 'mower deck' — which cleans evenly at consistent height so the finish is uniform edge to edge, then detail the edges and corners with a wand. Wand-only cleaning is why DIY and cheap jobs show zebra striping once the concrete dries.",
          "The price also covers pre-treating oil and stain spots, managing runoff (Gold Coast City Council requires wash water be kept out of stormwater drains where practicable), and the commercial equipment that gets flow rates a rental unit can't match — which is most of why a professional job takes two hours instead of a full weekend."
        ]
      },
      {
        heading: "Gold Coast driveway cleaning prices by size",
        list: [
          "Average driveway (single car, up to ~2 car spaces): around $220.",
          "Medium driveway (standard double, most suburban homes): around $440.",
          "Extra-large driveway (triple garage, long or steep runs): $660+.",
          "Full home package — driveway, all pathways, patio and pool area: around $660. This is the best value if multiple surfaces need doing, since setup and travel are shared.",
          "Per-square-metre comparison: Gold Coast market rates generally run $5–$10/m² for straight pressure cleaning. Our fixed pricing usually works out at or below that for typical driveways — and you know the price before we arrive."
        ]
      },
      {
        heading: "What makes a driveway cost more (or less)",
        paragraphs: [
          "Things that push a quote up: heavy oil or transmission-fluid staining (needs degreaser dwell time and sometimes a second pass), years of built-up mould in shaded sections, tyre-rubber marks, steep gradients that slow the surface cleaner, and delicate surfaces — old sandy pavers or exposed aggregate need moderated pressure and more care. Gum leaf tannin stains can be stubborn: they usually fade substantially but deep old tannin shadows may not lift 100%.",
          "Things that keep it cheap: doing the driveway before it's black rather than after, bundling it with paths and patio in one visit, and clear access (cars off the driveway on the day)."
        ]
      },
      {
        heading: "Is sealing worth it after cleaning?",
        paragraphs: [
          "Sealing freshly cleaned concrete slows re-soiling and makes the next clean easier, and on decorative or coloured concrete it revives the finish. It roughly doubles-to-triples the per-metre cost, so for plain grey concrete most of our customers skip it and simply re-clean every couple of years instead. Where it clearly earns its keep is stencilled, coloured or polished finishes, and driveways under trees that stain quickly. Happy to quote both ways so you can compare."
        ]
      }
    ],
    faqs: [
      {
        question: "How long does a driveway clean take?",
        answer: "Most single driveways take 1–1.5 hours; a large double with paths and patio is usually 2–3 hours. The concrete is walkable immediately and dry within a few hours in Gold Coast weather."
      },
      {
        question: "Can pressure cleaning remove oil stains completely?",
        answer: "Fresh oil, almost always. Old oil that has soaked deep into unsealed concrete will improve dramatically — often 80–90% — but a shadow can remain because the oil is inside the slab, not on it. We pre-treat with degreaser and are upfront about what will and won't lift before we start."
      },
      {
        question: "Will pressure cleaning damage my pavers or exposed aggregate?",
        answer: "Not at the right pressure. Full pressure on old or sandy pavers can blast out jointing sand and scar soft faces, so we moderate pressure and re-sand joints where needed. Exposed aggregate is cleaned at reduced pressure to avoid dislodging stones. This is exactly the kind of surface where cheap wand-work causes damage."
      },
      {
        question: "How often should a Gold Coast driveway be pressure cleaned?",
        answer: "Every 1–2 years for most homes. Shaded, south-facing or tree-covered driveways grow mould faster and lean toward yearly; full-sun driveways stretch to two years or more. Mould on smooth concrete is genuinely slippery when wet, so if the driveway is going green, it's a safety job as much as a cosmetic one."
      }
    ],
    related: [
      { label: "Pressure Cleaning service & prices", href: "/pressure-cleaning/" },
      { label: "Patio Cleaning service", href: "/patio-cleaning/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "do-dirty-solar-panels-reduce-output",
    metaTitle: "Do Dirty Solar Panels Reduce Output? | QLD Guide",
    metaDescription:
      "Yes — dirt typically costs 5-10% of solar output, and bird droppings up to 25%. When panel cleaning pays for itself on the Gold Coast, honestly.",
    h1: "Do Dirty Solar Panels Reduce Output?",
    updated: "2026-07-17",
    directAnswer:
      "Yes. A light dust film typically costs 5–10% of a solar system's output, while bird droppings, salt crust and heavy soiling can cost 15–25% — droppings are worst because they fully shade individual cells and create hot spots. On a typical 6.6kW Gold Coast system, a 20% loss is roughly $300–$500 a year in missed savings. Rain rinses loose dust but does not remove droppings, salt film or the grime line along the bottom edge of panels.",
    sections: [
      {
        heading: "The honest version: when cleaning is worth it, and when it isn't",
        paragraphs: [
          "You'll find solar websites claiming cleaning is always essential, and others saying rain does the job for free. The truth is in between and depends on your roof. If your panels are steeply pitched, away from the coast, with no bird activity and no visible soiling, rain genuinely keeps them within a few percent of peak — cleaning them twice a year would be money down the drain, and we'll tell you so.",
          "Cleaning clearly pays for itself when any of these apply: you can see droppings, lichen spots or a dirt line on the panels; you live near the beach (salt film builds like it does on windows); your panels are flat or low-pitch (grime pools at the bottom edge against the frame); you're under flight paths of roosting birds; or your monitoring shows generation drifting down year on year. That bottom-edge grime strip is sneaky — it shades the bottom row of cells, and on many panels that throttles the whole string."
        ]
      },
      {
        heading: "Why bird droppings are so much worse than dust",
        paragraphs: [
          "Dust reduces light evenly, so output drops a few percent across the board. A bird dropping blacks out an area of cells completely. Because cells in a panel are wired in series, hard-shading a few cells can drag down the entire panel — and with string inverters, one badly soiled panel can throttle the whole string. Droppings are also acidic and etch the glass coating if baked on through a Queensland summer. If you have pigeons roosting under your panels, cleaning alone is a band-aid; see our bird proofing guide for the permanent fix."
        ]
      },
      {
        heading: "Why you shouldn't clean panels with a pressure washer (or tap water)",
        paragraphs: [
          "Panel manufacturers void warranties for high-pressure cleaning — it can crack cells, force water into junction boxes and strip the anti-reflective coating. Household tap water on the Gold Coast is also mineral-rich enough to dry with a film that partially defeats the purpose. Professional cleaning uses deionised (pure) water and soft brushes: no residue, no minerals, warranty-safe. There's also the unglamorous fact that panels live on roofs — working next to live DC equipment on a pitched roof is not a ladder-and-squeegee Saturday job.",
          "Professional solar panel cleaning on the Gold Coast starts at $220, which covers the first 20 panels, then $4–$10 per additional panel depending on quantity and condition. Against $300–$500/year of losses on a soiled system, an annual or biennial clean recovers its cost quickly — and we bundle it with window, roof or gutter cleaning to share the visit cost."
        ]
      },
      {
        heading: "How often should Gold Coast panels be cleaned?",
        paragraphs: [
          "Coastal homes: roughly yearly, mainly for salt film. Homes with bird activity: as needed, then bird-proof so it stops recurring. Inland homes with good panel pitch: every couple of years, or simply when monitoring or a visual check says so. Commercial arrays are a different story — on a 100kW system, even a 10% loss is well over $1,000 a year, so most commercial operators clean annually on schedule."
        ]
      }
    ],
    faqs: [
      {
        question: "How do I check if dirty panels are costing me output?",
        answer: "Look at your inverter or monitoring app: compare this year's generation for a given month against the same month in the system's first year (allowing for weather). A steady decline of 5%+ with visible soiling is the clearest signal. Or just look at the panels in morning light — if you can see droppings or a grime line, you're losing output."
      },
      {
        question: "Does solar panel cleaning void the warranty?",
        answer: "Professional cleaning with pure water and soft brushes is what panel manufacturers recommend — it protects your warranty rather than voiding it. What voids warranties is high-pressure washing, abrasive tools, harsh detergents, and walking on panels."
      },
      {
        question: "Is it worth cleaning panels on a brand-new system?",
        answer: "Usually not for the first year or two unless birds arrive or you're beachfront. New systems on decent pitch stay clean-ish on rain alone initially. The exception: if your installer left dust, handprints or packaging residue, a first clean resets the baseline your monitoring is compared against."
      },
      {
        question: "Can you clean panels on a two-storey roof?",
        answer: "Yes — we clean solar on single and double-storey homes and commercial buildings across the Gold Coast with appropriate access equipment. Three storeys and up we quote after a site look."
      }
    ],
    related: [
      { label: "Solar Panel Cleaning service & prices", href: "/solar-panel-cleaning/" },
      { label: "Solar Panel Bird Proofing", href: "/bird-proofing/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "birds-under-solar-panels",
    metaTitle: "Birds Under Solar Panels? Fixes & Costs | Gold Coast",
    metaDescription:
      "How to get rid of pigeons nesting under solar panels, what bird proofing mesh costs on the Gold Coast, and why spikes and decoys don't work.",
    h1: "How Do I Get Rid of Birds Nesting Under My Solar Panels?",
    updated: "2026-07-17",
    directAnswer:
      "The only reliable fix for birds — usually pigeons — nesting under solar panels is to physically exclude them with purpose-made mesh clipped around the panel perimeter. On the Gold Coast, professional bird proofing costs $25–$35 per metre of panel perimeter, which includes cleaning the roof and panels and removing nesting debris before the mesh goes on. Spikes, plastic owls and ultrasonic devices don't work under panels because the birds nest beneath the panels, not on them.",
    sections: [
      {
        heading: "Why pigeons love solar panels (and why it gets worse if you wait)",
        paragraphs: [
          "The gap under a solar panel is the best real estate a pigeon will ever find: warm, dry, shaded, predator-proof and elevated. Once one pair moves in, the flock follows — pigeons are communal and return to successful nesting sites. Within a season you can go from two birds to a colony.",
          "The damage compounds: droppings are acidic and corrode panel frames, roof fixings and tile coatings while creating output-killing hot spots on the glass. Nesting material packs under the array, blocking airflow (hot panels lose efficiency) and damming water flow across the roof. Nests attract mites and lice, which migrate into ceiling cavities. And the scratching and cooing at dawn drives people to us more than any of the technical reasons."
        ]
      },
      {
        heading: "What actually works: perimeter mesh exclusion",
        paragraphs: [
          "We install UV-stabilised, marine-grade mesh around the full perimeter of the array, secured with purpose-made clips that grip the panel frame without drilling or piercing anything — critical, because screwing into panel frames or the roof voids warranties and creates leak points. Done properly, mesh is close to invisible from the ground, outlasts the paintwork, and excludes birds permanently while preserving the airflow gap panels need for cooling.",
          "Before meshing, the space under the array has to be cleared and cleaned: old nests, eggs, droppings and debris come out, and we clean the panels and affected roof area. Sealing birds' mess (or worse, a bird) under the mesh is the classic botched-job mistake."
        ]
      },
      {
        heading: "What doesn't work",
        list: [
          "Spikes: birds don't land where spikes go — they walk under the panel edge. Spikes on the panel perimeter also look terrible and do nothing about the gap.",
          "Plastic owls, hawk kites, reflective tape: pigeons habituate within days. We've removed nests from directly beside decoy owls.",
          "Ultrasonic deterrents: no credible evidence they move established pigeons, and your dog can hear them even if you can't.",
          "Gel repellents: degrade fast in Queensland sun, trap small birds cruelly, and make a sticky mess of the roof.",
          "Scaring them off without exclusion: they come back the same afternoon. The nest site is the attraction; remove access or nothing changes."
        ]
      },
      {
        heading: "What bird proofing costs on the Gold Coast",
        paragraphs: [
          "Our solar panel bird proofing is $25–$35 per metre of array perimeter, and that price includes the roof and solar panel clean plus supply and installation of the mesh — most competitors quote the clean separately, so compare like for like. A typical 20-panel residential array works out well under the cost of repairing corroded fixings or replacing hot-spotted panels later. Because every array layout is different, we quote from a photo or quick site look — use our instant quote form and attach photos."
        ]
      }
    ],
    faqs: [
      {
        question: "Is it legal to remove pigeon nests from my roof in Queensland?",
        answer: "Feral pigeons are an introduced pest species and their nests can be removed. Native birds are protected — if a native species has nested under panels (rare, but it happens with doves), timing and method matter. We check what we're dealing with before touching anything."
      },
      {
        question: "Will the mesh damage my panels or void the warranty?",
        answer: "No — that's the point of clip-on systems. The clips grip the aluminium panel frame without drilling, screwing or adhesive on the panel itself, so there's nothing for a manufacturer to object to. Drilling or self-tapping screws into frames absolutely can void warranties, which is one reason to avoid handyman installs."
      },
      {
        question: "Can I just block the gap with chicken wire or gutter guard?",
        answer: "We've seen it tried. Chicken wire rusts and stains the roof, gaps open at corners within a season, and fixing methods improvised from wire and silicone damage tiles and frames. Purpose-made solar mesh with frame clips costs a bit more upfront and is the last time you deal with the problem."
      },
      {
        question: "The birds are already gone — do I still need to clean under the panels?",
        answer: "Yes. Old nests and droppings keep corroding fixings, harbouring mites and blocking water flow whether birds are present or not, and an empty established nest site is a vacancy sign for the next flock. Clean-out plus mesh is the permanent close."
      }
    ],
    related: [
      { label: "Solar Panel Bird Proofing service", href: "/bird-proofing/" },
      { label: "Solar Panel Cleaning service & prices", href: "/solar-panel-cleaning/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "how-often-should-gutters-be-cleaned",
    metaTitle: "How Often Should Gutters Be Cleaned in SE QLD?",
    metaDescription:
      "Gold Coast gutters need cleaning at least twice a year — and always before storm season. A local's guide to timing, risks and real costs.",
    h1: "How Often Should Gutters Be Cleaned in South East Queensland?",
    updated: "2026-07-17",
    directAnswer:
      "For most Gold Coast and South East Queensland homes, gutters should be cleaned at least twice a year — and the single most important clean is in September–October, before the summer storm season starts in November. Homes under gum trees or with heavy leaf drop need cleaning three to four times a year. Blocked gutters in a Queensland summer storm overflow within minutes, and the water goes into your eaves and walls, not the downpipes.",
    sections: [
      {
        heading: "Why storm season sets the calendar in SEQ",
        paragraphs: [
          "The Gold Coast's rain doesn't arrive gently. Storm season — November through April — delivers cells that can drop 50mm+ in under an hour. A gutter system in good order handles that; a gutter holding six months of leaves, seed pods and roof grit becomes a bathtub in the first ten minutes. Water then backs up under the roofline into eaves, fascia, wall cavities and ceilings. Almost every ceiling-stain callout we see in December and January traces back to gutters that hadn't been touched since the previous summer.",
          "That's why the pre-storm-season clean (September–October) is the non-negotiable one. A second clean in autumn (April–May) clears the summer's growth and leaf drop, and suits the natural rhythm of most properties."
        ]
      },
      {
        heading: "How often for your situation",
        list: [
          "Standard suburban home, few overhanging trees: twice a year — pre-storm season (Sept–Oct) and autumn.",
          "Under or near gum trees: three to four times a year. Eucalypts shed leaves, bark and branches year-round, not just in autumn, and gum leaves are oily and slow to break down.",
          "Coastal high-wind streets: twice a year minimum — wind-blown debris and salt-laden grit accumulate faster than you'd expect even with no trees in sight.",
          "Homes with gutter guard: still yearly. Guard slows accumulation but fine debris, roof grit and jacaranda/pine needles get through or sit on top; guarded gutters that were 'maintenance free' for five years are some of the worst we open up.",
          "Commercial buildings and box gutters: quarterly to twice-yearly — box gutters overflow inward, into the building, so they carry the highest stakes."
        ]
      },
      {
        heading: "What blocked gutters actually cost you",
        paragraphs: [
          "The damage list from our own callouts: ceiling and cornice water staining, rotted fascia and eaves linings, overflow undermining paths and garden beds, mosquito breeding in standing water, and grass literally growing in the gutter line. Blocked gutters holding damp organic matter against steel also rust gutters out years early — replacement runs into thousands of dollars, against $220–$550 for a single-storey clean.",
          "There's also a fire angle: dry leaf-packed gutters are an ember trap, and hinterland and semi-rural properties are advised to keep gutters clear through bushfire season for exactly that reason.",
          "In summary it's one of the cheapest forms of insurance a Queensland homeowner can buy: gutter cleaning on the Gold Coast runs $220–$550 for a single-storey home and $330–$770 for a double-storey, depending on size and how full the gutters are. Every clean includes checking downpipes actually flow — a clear gutter draining into a blocked downpipe still overflows."
        ]
      },
      {
        heading: "Can I clean my own gutters?",
        paragraphs: [
          "Single-storey with a stable ladder, good balance and someone home? Plenty of people do. The honest caveats: ladder falls are one of the most common serious home-maintenance injuries in Australia; double-storey DIY is genuinely not worth the risk; and most DIYers scoop the easy middle section and skip the corners, high sections and downpipe heads — which is exactly where blockages form. If you do it yourself, do it before storm season, wear gloves (gutters hide sharp screws and the occasional spider), and flush downpipes with a hose to confirm flow."
        ]
      }
    ],
    faqs: [
      {
        question: "When is the best time of year to clean gutters on the Gold Coast?",
        answer: "September–October, without question — after winter's leaf drop and before the November storm season. If you only clean your gutters once a year, that's the slot. A second autumn clean (April–May) is the ideal follow-up."
      },
      {
        question: "Is gutter guard worth installing instead of cleaning?",
        answer: "Quality gutter guard reduces cleaning frequency; it doesn't eliminate it. Fine debris and roof grit still accumulate, and needles sit on top of mesh and mat into a thatch that blocks water anyway. Cheap plastic guard also becomes brittle in QLD sun within a few years. Think of guard as stretching the interval, not replacing the service."
      },
      {
        question: "Do you take the debris away?",
        answer: "Yes — bagging and removing the debris is part of the service, along with checking downpipes flow and letting you know about anything we spot up there (rusted sections, loose brackets, cracked tiles)."
      },
      {
        question: "Should gutters be cleaned before or after roof cleaning?",
        answer: "With it, ideally. Roof cleaning always washes some debris into the gutters, so we clear gutters as part of every roof clean and offer a full gutter service as an add-on — you're already paying for roof access, so it's the cheapest time to do it."
      }
    ],
    related: [
      { label: "Gutter Cleaning service & prices", href: "/gutter-cleaning/" },
      { label: "Roof Cleaning service & prices", href: "/roof-cleaning/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  },
  {
    slug: "house-washing-mould-gold-coast",
    metaTitle: "Mould on House Walls? Gold Coast Softwash Guide",
    metaDescription:
      "Why Gold Coast homes grow mould and green algae on external walls, how soft washing removes it safely, and what a house wash costs in 2026.",
    h1: "Why Does My House Grow Mould Outside — and How Do I Remove It?",
    updated: "2026-07-17",
    directAnswer:
      "Green and black growth on Gold Coast house exteriors is algae and mould feeding on moisture in our humid subtropical climate — it appears fastest on southern walls, shaded sides and textured surfaces like render. The safe removal method is soft washing: low-pressure application of a biodegradable solution that kills the growth at its root, rather than high-pressure blasting, which damages paint and render and leaves roots behind to regrow within months. A professional house softwash on the Gold Coast costs from $495 for a small single-storey home.",
    sections: [
      {
        heading: "Why the south side of your house is always the green one",
        paragraphs: [
          "Algae and mould need two things: moisture and low UV. In South East Queensland, southern and south-eastern walls get the least direct sun, stay damp longest after rain and overnight humidity, and so they green up first — often years before the northern side shows anything. Anything that holds shade makes it worse: dense gardens against walls, boundary fences close to the house, trees, and the textured surfaces of acrylic render, which give spores a foothold smooth paint doesn't.",
          "It's worth being clear that the growth isn't just cosmetic. Mould colonies hold a damp film against paint and render, slowly breaking down the surface, and heavy growth near windows and doors contributes spores to the air coming into the house. Real estate agents will also tell you a green-streaked house is one of the fastest ways to lose buyers at the kerb."
        ]
      },
      {
        heading: "Soft washing vs pressure washing your house walls",
        paragraphs: [
          "House walls should never be high-pressure cleaned. Painted surfaces strip, acrylic render gouges and dents, mortar joints erode, and pressure drives water into weep holes and wall cavities where it causes damp problems you can't see until they're expensive. And because pressure only removes the visible growth — not the root structure — the green comes back within months, often worse because the surface is now scoured and porous.",
          "Soft washing works the opposite way: a biodegradable cleaning solution is applied at low pressure (comparable to a garden hose), dwells long enough to kill mould, algae and lichen at the root, and is rinsed gently. The result typically lasts 2–4 times longer than pressure cleaning, and the paint, render and seals underneath are untouched. It's the method paint manufacturers recommend before repainting, too — many of our house washes are pre-sale or pre-repaint preparation."
        ]
      },
      {
        heading: "What a house softwash costs on the Gold Coast",
        paragraphs: [
          "Guide prices: from $495 for a small single-storey home or small office, $770 for a large single-storey or small double-storey, $990 for an XL single or large double-storey, and $1,200+ for XL double-storey homes and beyond. That covers walls, eaves, and exterior surfaces — and we pre-wet and rinse gardens as standard to protect your plants.",
          "How often? Most Gold Coast homes look freshly painted again with a softwash every 2–3 years. Shaded, south-facing or heavily gardened homes lean toward every 1–2 years. Doing it before growth is established is noticeably cheaper than letting lichen colonise render — lichen takes more product, more dwell time and more care."
        ]
      },
      {
        heading: "Can I remove exterior mould myself?",
        paragraphs: [
          "Small reachable patches — sure: diluted household bleach or a commercial exterior mould killer, a soft brush, and a thorough rinse will handle a metre of green near the front door. A whole wall or a whole house is a different job: you can't get even coverage from the ground, ladders plus wet chemicals are a bad combination, garden protection matters at scale, and the DIY result tends to be clean patches with green halos. If a wall has gone properly green, it's usually softwash territory."
        ]
      }
    ],
    faqs: [
      {
        question: "Is the black staining on my render mould or dirt?",
        answer: "Usually both — black mould colonies bonded into a film of grime. Quick test: press a gloved wet thumb on it. If it smears slightly or the surface feels slimy after rain, it's biological. Either way soft washing removes it; what matters is that it's treated chemically, not blasted."
      },
      {
        question: "Will soft washing damage my plants or garden?",
        answer: "No — protecting gardens is a standard part of the process. We pre-wet garden beds before applying solution and rinse everything thoroughly afterwards. The solutions we use are biodegradable and break down quickly. If you're on tank water, tell us when booking so we can disconnect downpipes first."
      },
      {
        question: "How long does a house wash take?",
        answer: "A typical single-storey home takes 2–3 hours; a large double-storey 3–5 hours. Walls are safe to touch once dry, and the growth keeps breaking down for days after — soft-washed surfaces often look even better a week later."
      },
      {
        question: "Should I wash the house before painting or selling?",
        answer: "Before painting: essential — paint over mould and it grows through the new coat, and most paint warranties require a clean substrate. Before selling: it's one of the highest-return presentation jobs going; a few hundred dollars makes the whole house read as 'well maintained' in listing photos and from the kerb."
      }
    ],
    related: [
      { label: "House Softwash service & prices", href: "/house-softwash/" },
      { label: "Roof Cleaning service & prices", href: "/roof-cleaning/" },
      { label: "Get an instant quote", href: "/instant-quote/" }
    ]
  }
];

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug);
}

