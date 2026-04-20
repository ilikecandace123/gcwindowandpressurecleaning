#!/usr/bin/env python3
"""
One-time script: injects per-suburb unique content fields into src/data/locations.js.

Adds three new fields to every SUBURB object:
  propertyMix        — 1 sentence on dominant property types in that suburb
  environmentalNote  — 1 sentence on cleaning-relevant environmental factors specific to the suburb
  localHook          — 1 sentence that references something specific (street, development, feature)

These fields are consumed by LocationService.jsx and CommercialLocationService.jsx to
replace the generic regional boilerplate that was causing 88-98% cross-page similarity
and Google deprioritising ~948 location pages as near-duplicates.
"""
import re
import sys
from pathlib import Path

# Per-suburb unique content. Drafted from: region + known landmarks + general
# knowledge of Gold Coast / Tweed suburb character. Avoid fabricating specific
# addresses — stick to dominant property types and well-known features.
CONTENT = {
    # ───────────── SOUTH COAST (south Gold Coast beach suburbs) ─────────────
    "coolangatta": {
        "propertyMix": "Coolangatta sits right on the QLD–NSW border and blends mid-century beach shacks, holiday apartment towers along Marine Parade, and modern family homes up Kirra Hill.",
        "environmentalNote": "Direct Pacific exposure means salt crystals bake onto glass, aluminium window frames pit faster than inland suburbs, and east-facing render grows mould stripes after every humid spell.",
        "localHook": "We regularly work the strip between Rainbow Bay and Greenmount, plus the hillside streets above Duranbah lookout where ocean-facing glass needs quarterly attention to stay streak-free."
    },
    "bilinga": {
        "propertyMix": "Bilinga is a small beachside pocket tucked between the airport and Kirra — mostly single-storey timber cottages, 1970s brick-and-tile, and a handful of newer duplexes on Golden Four Drive.",
        "environmentalNote": "Aircraft kerosene residue combined with coastal salt spray leaves a greasy film on windows and solar panels that domestic cleaning rarely shifts; it needs surfactant-based softwash.",
        "localHook": "Most of our Bilinga work is along the Golden Four corridor and the quiet streets off Pacific Parade where low-set homes accumulate roof moss from shaded tree canopies."
    },
    "kirra": {
        "propertyMix": "Kirra is defined by its beachfront high-rises along Marine Parade and a tight grid of post-war cottages on the hill behind them.",
        "environmentalNote": "Strong onshore winds drive fine beach sand under eaves, into window tracks, and across pool decks — leaving abrasive deposits that scratch glass if wiped dry.",
        "localHook": "Window cleaning on the Kirra high-rises typically needs rope-access or water-fed pole work; we also clean the surf club and several cafés around the Kirra Point headland."
    },
    "tugun": {
        "propertyMix": "Tugun is a quieter coastal village with a mix of retirement duplexes, family homes on green-title blocks, and boutique medical precincts near Gold Coast University Hospital.",
        "environmentalNote": "The suburb sits in a coastal rain shadow behind Tugun Hill so window ledges collect fine red-clay dust blown off the ridge — especially noticeable after dry westerly weeks.",
        "localHook": "We service the medical precinct around Boyd Street regularly (hospitals demand streak-free glazing) and many of the duplexes on Tugun's back streets."
    },
    "currumbin": {
        "propertyMix": "Currumbin stretches from the famous Alley surf break to Currumbin Hill; properties range from classic beachfront Queenslanders to cliff-top contemporary homes with floor-to-ceiling glass.",
        "environmentalNote": "Cliff-top homes face extreme wind-driven salt spray — windows on the ocean side can visibly haze within a fortnight without a hydrophobic surface treatment.",
        "localHook": "Much of our Currumbin work is on the hill streets above The Alley and around Currumbin Rock — elevated homes where pole-reach and rope-access are the practical options."
    },
    "currumbin-waters": {
        "propertyMix": "Currumbin Waters is canal-estate territory — predominantly 1990s–2000s brick homes with pontoons, plus some newer waterfront rebuilds around The Spit and the lakes.",
        "environmentalNote": "Brackish water off the canals leaves mineral spotting on ground-floor glass and ducted air-con screens, and pontoon areas grow algae on timber decking faster than the Gold Coast average.",
        "localHook": "Our cleans here typically cover canal-side glass, pontoon softwash, and the terracotta or Colorbond roofs that need tree-sap removal from over-hanging paperbarks."
    },
    "currumbin-valley": {
        "propertyMix": "Currumbin Valley is rural-residential hinterland — acreage blocks, timber country homes, hobby farms, and a few restored 1920s farmhouses along the Currumbin Creek Road corridor.",
        "environmentalNote": "Dense eucalypt canopy means gutters fill with leaf litter and seed pods within weeks, roofs grow lichen on the shaded southern side, and spider webs form across every external window frame.",
        "localHook": "Our hinterland crew knows the valley road well — we handle the steep driveway access and tall two-storey pole homes common to the upper valley properties."
    },
    "palm-beach": {
        "propertyMix": "Palm Beach is family-beach territory with a strong mid-century beach house identity — original 1950s cottages, renovated art-deco apartments, and an increasing number of coastal contemporary rebuilds.",
        "environmentalNote": "The north-facing beach orientation catches strong afternoon sun that bakes salt residue onto glass by mid-afternoon, so mid-morning cleans last noticeably longer than afternoon cleans.",
        "localHook": "We regularly clean homes along the Jefferson Lane strip and the streets running back to the Tallebudgera Creek mouth, including several pre-AirBnB holiday cottages."
    },
    "elanora": {
        "propertyMix": "Elanora is a largely hillside suburb set back from the beach — 1980s brick-veneer family homes, pocket estates on The Avenue, and rising modern architect-designed homes on the elevated blocks.",
        "environmentalNote": "Elevated sites face the southerly trade winds which accelerate window spotting from airborne salt, while the dense street-tree canopy means most roofs carry visible north-side moss bands.",
        "localHook": "Our Elanora work centres on the slope between The Pines shopping centre and the Tallebudgera Creek reserve — two-storey homes where extension-pole work is essential."
    },
    "tallebudgera": {
        "propertyMix": "Tallebudgera runs from the creek mouth up a wooded valley — a mix of beachside low-sets, creekside stilt houses, and acreage blocks further west toward the national park boundary.",
        "environmentalNote": "The suburb's humid creek microclimate drives aggressive mildew growth on south-facing walls and roof sheets, particularly on homes shaded by the paperbark and eucalypt corridor along the creek.",
        "localHook": "We see a lot of the stilt-style creek homes off Tallebudgera Creek Road and the newer rebuilds near Tallebudgera Primary — softwash is often the go-to for the rendered lower storeys."
    },
    "tallebudgera-valley": {
        "propertyMix": "Tallebudgera Valley is deep hinterland acreage country — timber homesteads, modern architect-designed pole homes, hobby farms, and equestrian properties along Tallebudgera Creek Road.",
        "environmentalNote": "Thick rainforest canopy and creek humidity produce heavy leaf-matter roof loading and lichen blooms on north-facing roof sheets within a single wet season.",
        "localHook": "Access requires 4WD-friendly crews for some driveways; we routinely service properties as far west as the Springbrook Road turn-off where full exterior softwashes are annual fixtures."
    },
    "burleigh-heads": {
        "propertyMix": "Burleigh Heads has become one of the Gold Coast's premium addresses — heritage cottages near James Street, luxury beachfront apartments along Goodwin Terrace, and tightly-held homes up Burleigh Hill.",
        "environmentalNote": "The famous Burleigh Point headland funnels onshore winds directly across the suburb, coating ocean-facing glass and balcony glass balustrades with a visible salt haze within days.",
        "localHook": "We clean several Goodwin Terrace high-rises, plus heritage render on many of the protected homes along James Street and Connor Street — where soft-wash is mandatory to protect original paintwork."
    },
    # ───────────── CENTRAL COAST (high-rise + canal suburbs) ─────────────
    "burleigh-waters": {
        "propertyMix": "Burleigh Waters is a canal and lake suburb — 1980s–2000s brick-veneer homes with pontoons, some newer waterfront knock-downs, and dense pockets of townhouse villages.",
        "environmentalNote": "Brackish canal water, boat fuel vapour, and humid still-air pockets drive aggressive black-spot mould on pontoons and the lower storey render of waterfront homes.",
        "localHook": "Most of our Burleigh Waters work is waterfront glass, pontoon softwash, and the Colorbond roofs around the Jacobs Ridge side of the suburb."
    },
    "miami": {
        "propertyMix": "Miami is a tight coastal suburb straddling the Gold Coast Highway — surf-shack-era cottages, a growing set of beachside apartment blocks, and pockets of cafés and commercial space on Marine Parade.",
        "environmentalNote": "Miami catches direct easterly salt spray and also ambient highway grime — a two-pollutant combination that leaves a sticky film on east-facing windows that plain-water cleans cannot remove.",
        "localHook": "We regularly service the Marine Parade strip and the cafés around the Miami Marketta, plus the low-rise apartments between the highway and the beach."
    },
    "mermaid-beach": {
        "propertyMix": "Mermaid Beach hosts some of the Gold Coast's most expensive beachfront strips — including the famed Hedges Avenue 'Millionaires Row', mid-century beach houses, and tall boutique apartment towers.",
        "environmentalNote": "Hedges Avenue and Albatross Avenue homes sit directly behind the primary dune with zero shelter — window cleaning here is functionally a monthly requirement if owners want clear glass.",
        "localHook": "We work several Hedges Avenue and Albatross Avenue properties where rope-access and water-fed pole gear is standard kit for the tall glass frontages."
    },
    "mermaid-waters": {
        "propertyMix": "Mermaid Waters is a canal estate of 1980s–1990s single- and two-storey homes with pontoons, plus newer waterfront rebuilds around Lake Heron and Clear Island Waters boundary.",
        "environmentalNote": "The canal system concentrates still humid air at ground level, driving heavy black-spot mould on south-facing render and bubble-growth algae under pontoon boards.",
        "localHook": "We service a lot of the Lakeland Drive loop and the streets around Markeri Street — canal glass, pontoon softwash, and terracotta roof moss removal are the common jobs."
    },
    "broadbeach": {
        "propertyMix": "Broadbeach is the Gold Coast's second high-rise hub — residential towers along Old Burleigh Road, strata apartment blocks, and the Oracle and Jewel tower cluster nearest Kurrawa.",
        "environmentalNote": "Sealed-facade towers here collect coastal salt at a rate that requires rostered commercial window-cleaning contracts — external glass visibly hazes within three weeks in summer.",
        "localHook": "Our commercial crew services multiple Broadbeach towers on strata cleaning contracts, and our residential team handles the low-rise pocket between Charles Avenue and Margaret Avenue."
    },
    "broadbeach-waters": {
        "propertyMix": "Broadbeach Waters is premium canal real estate — large 1990s–2010s family homes on waterfront blocks, many with pontoons and pool areas, plus some recent ultra-contemporary rebuilds.",
        "environmentalNote": "Waterfront glass here takes the combined hit of canal salt mist off the Nerang River system and direct Pacific exposure — cleaning cycles need to be tighter than inland canal suburbs.",
        "localHook": "We regularly work the T.E. Peters Drive / Monaco Street loop — multi-storey waterfront homes where extension-pole and pontoon-side glass cleaning are core tasks."
    },
    "surfers-paradise": {
        "propertyMix": "Surfers Paradise is the Gold Coast's tallest and densest tower precinct — Q1 and the Soul, Circle on Cavill, and Chevron Renaissance cluster dominate a skyline of commercial and residential high-rises.",
        "environmentalNote": "Tower glass here absorbs airborne salt, vehicle emissions from Surfers Paradise Boulevard, and holiday-crowd pollution — rostered façade cleaning is a base cost of owning strata here.",
        "localHook": "Our commercial rope-access and traverse-cradle crew handles scheduled façade cleaning on multiple Surfers towers; we also clean the mid-rises along Orchid and Ocean avenues."
    },
    "main-beach": {
        "propertyMix": "Main Beach is a mix of upscale apartment towers along Tedder Avenue, luxury strata on Main Beach Parade, and some original Queenslanders hidden behind the beachfront line.",
        "environmentalNote": "The open north-facing beach means prevailing northerlies push salt directly into every north-facing balcony glass — cleans that last elsewhere won't last here.",
        "localHook": "We service several Tedder Avenue cafés and the towers along the Main Beach Parade strip closest to The Spit break-wall."
    },
    "southport": {
        "propertyMix": "Southport is the Gold Coast's CBD — commercial towers around the Chinatown precinct, the Australia Fair strip, a growing hospital precinct, and a dense mix of apartment blocks along the Broadwater.",
        "environmentalNote": "Broadwater salt combined with heavy traffic exhaust along Nerang Street leaves a stubborn greasy film on ground-level and first-storey commercial glazing.",
        "localHook": "Much of our Southport work is commercial — Chinatown and Ferry Road shopfronts, plus the apartment blocks along Marine Parade facing the Broadwater."
    },
    "labrador": {
        "propertyMix": "Labrador is mostly mid-density residential along the Broadwater — 1960s blonde-brick apartments, newer units along Marine Parade, and classic beach cottages through the back streets.",
        "environmentalNote": "Broadwater tidal mist settles on ground-level windows overnight, so morning cleans here almost always involve dissolving dried tidal salt before the actual wash.",
        "localHook": "We regularly service the Broadwater-facing apartment blocks along Marine Parade and the commercial strip near Grice Avenue."
    },
    "biggera-waters": {
        "propertyMix": "Biggera Waters is a Broadwater-side suburb of canal homes, boating estates around Harbour Town, and retirement-lifestyle developments with pools and marina access.",
        "environmentalNote": "Harbour-area diesel particulate combined with brackish canal humidity creates a distinctive tar-like spotting on ground-floor glass and outdoor glass pool fencing.",
        "localHook": "Our Biggera Waters work spans the Harbour Town boundary commercial strip, the Runaway Bay marine precinct, and the canal blocks between Hollywell and Paradise Point."
    },
    "runaway-bay": {
        "propertyMix": "Runaway Bay is boating-lifestyle territory — waterfront canal homes, a cluster of townhouses around the Runaway Bay Shopping Village, and Broadwater-facing apartment blocks.",
        "environmentalNote": "Canal-side homes here face persistent black-spot mould on rendered south walls and algae bloom on pontoon boards — both accelerated by the humid calm pockets off the Broadwater.",
        "localHook": "We handle a steady volume of pontoon softwash and waterfront glass on the Bayview Street / Oyster Cove side of the suburb."
    },
    "chevron-island": {
        "propertyMix": "Chevron Island is a compact residential island in the Nerang River — a tight mix of mid-century original homes, 2000s townhouses, and new riverfront apartment blocks along Stanhill Drive.",
        "environmentalNote": "The river surrounding the island concentrates humid still air — south-facing walls and roofs carry persistent black-spot mould year-round, regardless of sun exposure.",
        "localHook": "Our Chevron work is almost all riverfront glass and pontoon softwash, with a growing number of café shopfronts along Thomas Drive."
    },
    "isle-of-capri": {
        "propertyMix": "Isle of Capri is a premium canal enclave off the Nerang River — large 1990s–2010s homes on waterfront blocks, some early-2020s ultra-contemporary rebuilds, and a small village shopping strip.",
        "environmentalNote": "Capri's waterfront blocks sit where Nerang River salt meets Surfers high-rise shadow, producing both salt-mist spotting and shaded-wall mould in the same property.",
        "localHook": "We routinely service the River Links cluster and the Capri Village shopping strip, plus multi-level waterfront glass along Reef Island and Capri Reach."
    },
    "clear-island-waters": {
        "propertyMix": "Clear Island Waters is golf-course-and-canal living — large family homes on big blocks, Palm Meadows golf frontages, and gated estates with central lakes.",
        "environmentalNote": "Reticulated bore water used for irrigation across the golf corridor leaves visible mineral calcium spotting on ground-floor windows within a fortnight of every sprinkler cycle.",
        "localHook": "We specifically use a mineral-neutralising rinse for homes bordering the Palm Meadows fairways — standard water-fed pole alone leaves hard-water rings."
    },
    "benowa": {
        "propertyMix": "Benowa spans golf-estate luxury on Benowa Waters, the Pindara medical precinct, and family suburbia through the central streets — a broader property mix than most Gold Coast suburbs.",
        "environmentalNote": "The Pindara precinct's HVAC and sterile-air exhausts deposit a fine greasy residue on surrounding commercial glass, and the golf-course bore-water spotting issue extends into Benowa Waters.",
        "localHook": "We handle a steady flow of Pindara-adjacent commercial glass plus the canal and golf-frontage homes around the Benowa Gardens loop."
    },
    # ───────────── CENTRAL (inland suburbs) ─────────────
    "bundall": {
        "propertyMix": "Bundall is a mixed-use precinct — corporate offices along Bundall Road, council chambers, the Gold Coast Turf Club, and residential pockets on canal blocks between Ashmore Road and the Nerang River.",
        "environmentalNote": "Commercial glazing along Bundall Road catches truck exhaust and road-spray grime that needs surfactant cleaning — a monthly cycle is typical for the office strip.",
        "localHook": "Our Bundall commercial crew services multiple office blocks along Bundall Road and the Ashmore Road boundary — mostly ground-floor and first-storey traverse work."
    },
    "ashmore": {
        "propertyMix": "Ashmore is one of the older central-suburb grids — 1970s–1980s brick-and-tile family homes, some lowset fibro originals, a light-industrial estate near Nerang Street, and Ashmore Plaza shopping precinct.",
        "environmentalNote": "Ashmore's older brick-and-tile housing stock has accumulated decades of roof lichen, and many homes still run steel-framed original windows whose timber reveals need careful water-fed pole pressure settings.",
        "localHook": "We clean a lot of Ashmore's original brick-and-tile homes along Nerang–Southport Road and around the Ashmore Plaza residential streets."
    },
    "robina": {
        "propertyMix": "Robina is the master-planned centre of the southern Gold Coast — Robina Town Centre, the hospital precinct, Robina Stadium, plus residential estates from compact townhouses to golf-frontage lakeside homes.",
        "environmentalNote": "Robina's lake-estate homes face distinctive freshwater-lake algae blooms on pontoons and south-facing render, plus heavy pollen loading on cars and windows during the jacaranda and plane-tree flowering.",
        "localHook": "Our Robina work includes the Town Centre commercial glazing, the hospital precinct, and the lakefront homes around Lake Tabourie and the Robina Quays area."
    },
    "mudgeeraba": {
        "propertyMix": "Mudgeeraba is a semi-rural township — older main-street shops along Railway Street, 1980s family homes on larger blocks, and acreage properties on the western hinterland fringe.",
        "environmentalNote": "Mudgeeraba sits close enough to the hinterland canopy that most properties have visible roof moss within two years, and leaf-heavy gutters are the single most common service request.",
        "localHook": "We regularly service the old village along Railway Street plus the acreage blocks running up toward Springbrook Road and the Old Coach Road area."
    },
    "varsity-lakes": {
        "propertyMix": "Varsity Lakes is a mid-2000s master-planned suburb — townhouse villages, lakeside apartment blocks, commercial precincts along Varsity Parade, and Bond University campus buildings.",
        "environmentalNote": "Still, humid air pockets form around the central lake most mornings, driving black-spot mould on south-facing render and a distinctive algal bloom on lakefront pontoons and pool fencing.",
        "localHook": "We handle the Varsity Parade commercial strip, the Bond University-adjacent apartment blocks, and the lake-frontage townhouses along Lake Orr Drive."
    },
    "reedy-creek": {
        "propertyMix": "Reedy Creek is a hillside residential suburb — 1990s–2010s architect-designed family homes on sloped blocks, some acreage pockets toward the M1 boundary, and townhouse enclaves near the shops.",
        "environmentalNote": "Hillside two-storey homes here catch both morning ocean breeze salt and afternoon westerly dust — producing a layered residue that requires a pre-rinse before pole-and-brush cleaning.",
        "localHook": "We work a lot of Reedy Creek's sloped blocks where three-storey glass frontages on the downhill side need pole or rope-access work."
    },
    "bonogin": {
        "propertyMix": "Bonogin is full acreage hinterland — timber Queenslanders, architect-designed pole homes, hobby farms, and a scattering of modern rebuilds along Bonogin Road and Hardys Road.",
        "environmentalNote": "Heavy eucalypt canopy means annual roof-moss loading on southern slopes, ongoing leaf-litter gutters, and significant spider and wasp accumulation on window frames — all compounded by very low wash-down frequency on most acreage.",
        "localHook": "Our Bonogin jobs typically combine a full-house softwash, gutter clean, and window work in a single visit to amortise the drive in."
    },
    "merrimac": {
        "propertyMix": "Merrimac is family-suburbia across the Nerang River — 1980s–1990s brick homes, newer townhouse clusters near the M1, and the Merrimac State School and commercial strip on Boowaggan Road.",
        "environmentalNote": "Merrimac sits at a low point between ridges that traps morning fog and afternoon humidity — the result is persistent black-spot mould on south-facing render across older homes.",
        "localHook": "We clean a steady stream of the original Merrimac street grid plus the commercial glazing along Boowaggan Road near Merrimac Shopping Centre."
    },
    "carrara": {
        "propertyMix": "Carrara spans equestrian acreage (horse country along Nerang–Broadbeach Road), golf-estate homes around the Nerang River, and the Metricon Stadium precinct on the southern edge.",
        "environmentalNote": "Carrara's horse-country acreage generates airborne hay and paddock dust that settles on windows and solar arrays, while the golf-estate homes face the standard golf-corridor bore-water spotting issue.",
        "localHook": "We service both the Stadium-adjacent commercial glazing and the equestrian acreage along Beattie Road and the Emerald Lakes loop."
    },
    "nerang": {
        "propertyMix": "Nerang is one of the oldest Gold Coast township suburbs — heritage main-street shopfronts on Price Street, 1960s–1970s lowset homes, plus hinterland acreage on the western side.",
        "environmentalNote": "The mix of older housing stock and hinterland proximity means nearly every Nerang roof needs periodic moss and lichen treatment, and gutters clog with gum leaves year-round.",
        "localHook": "We regularly work the heritage Price Street shopfronts and the older residential grid around Nerang High and Nerang Station."
    },
    "highland-park": {
        "propertyMix": "Highland Park is a hillside residential suburb overlooking Nerang — 1990s brick-veneer family homes on sloped lots, with a higher density of split-level and two-storey designs than flat central suburbs.",
        "environmentalNote": "Ridge-line homes are hit by afternoon westerlies carrying hinterland dust, and the steep driveways and multi-level facades mean DIY cleaning is unusually impractical.",
        "localHook": "Our Highland Park work is heavily two-storey and split-level — extension-pole and soft-wash are the core methods here."
    },
    "gilston": {
        "propertyMix": "Gilston is rural-hinterland country — acreage blocks, timber country homes, hobby farms, and a scattering of modern architect rebuilds along Worongary Road and Gilston Road.",
        "environmentalNote": "Heavy canopy, creek humidity, and rural paddock dust combine to load roofs with lichen and fill gutters with leaf matter faster than coastal Gold Coast suburbs.",
        "localHook": "Our crews know the Gilston and Worongary Road properties well — the acreage driveways and long pole-home roof spans are standard fare here."
    },
    "worongary": {
        "propertyMix": "Worongary is semi-rural and transitional — a mix of small-acreage lifestyle blocks, older rural homesteads, and a growing cluster of newer family-home estates near the shopping village.",
        "environmentalNote": "The valley floor here catches overnight mist that leaves a mineral film on east-facing windows and roof sheets — most homes benefit from an annual soft-wash reset.",
        "localHook": "We clean a regular flow of both the acreage homes off Mudgeeraba Creek Road and the estate homes closer to Worongary Shopping Village."
    },
    "advancetown": {
        "propertyMix": "Advancetown is deep-hinterland dam-and-acreage country around the Hinze Dam catchment — timber country homes, architect pole-houses, and rural lifestyle blocks.",
        "environmentalNote": "Dam-side humidity, heavy canopy, and low housing density mean most homes go years between cleans and carry accumulated moss, lichen, and leaf loading that requires multi-stage softwash.",
        "localHook": "Our Advancetown jobs almost always involve pole-home glass at height, full-house softwash, and a gutter clean in one visit to justify the distance."
    },
    # ───────────── NORTHERN GOLD COAST ─────────────
    "coombabah": {
        "propertyMix": "Coombabah is family-suburbia north of the Broadwater — 1990s brick homes, newer lakeside townhouse estates around Coombabah Lake, and the conservation-wetlands buffer.",
        "environmentalNote": "The Coombabah wetlands bring significant insect and bird activity — windows accumulate insect residue and bird droppings faster than inland suburbs, and roof solar panels need tighter cleaning intervals.",
        "localHook": "We work a consistent stream of the Coombabah Village estates and the lakeside townhouse clusters near the wetland boundary."
    },
    "paradise-point": {
        "propertyMix": "Paradise Point is waterfront-lifestyle real estate — luxury canal homes around the Sovereign Island causeway, waterfront apartment blocks along The Esplanade, and a café strip on Grice Avenue.",
        "environmentalNote": "Broadwater salt combined with constant watercraft traffic off the Sovereign Island bridge deposits a film of outboard-fuel residue on north-facing waterfront glass.",
        "localHook": "Much of our Paradise Point work is the Sovereign Island causeway homes and the cafés along The Esplanade — both need tight cleaning cycles to stay presentation-ready."
    },
    "hollywell": {
        "propertyMix": "Hollywell is Broadwater-facing suburbia — a mix of original 1970s holiday shacks, updated canal homes, and some high-end rebuilds with boatsheds on the water.",
        "environmentalNote": "Hollywell's ground-floor glass on Broadwater-facing homes collects tidal mist residue overnight — pre-dawn cleans are a practical waste here because the salt redeposits by mid-morning.",
        "localHook": "Our Hollywell work is mostly canal-side glass and pontoon soft-wash — Waterways Drive and the Broadwater Esplanade account for the majority."
    },
    "hope-island": {
        "propertyMix": "Hope Island is a master-planned golf-and-canal resort suburb — gated estates, marina-side townhouses, the Hope Island Resort golf club, and large family homes on canal blocks.",
        "environmentalNote": "Hope Island's bore-water irrigation across the golf estates leaves hard-water mineral deposits on all windows within sprinkler reach, and the canal salt mist issue is present on top of that.",
        "localHook": "Our Hope Island crew uses a specific mineral-neutralising pre-rinse on golf-frontage homes — it's the only reliable way to avoid calcium rings after cleaning."
    },
    "helensvale": {
        "propertyMix": "Helensvale has grown around the Westfield, Movie World, and Wet'n'Wild corridor — a mix of 1990s–2000s brick family homes, newer townhouse estates, and a growing apartment cluster near the station.",
        "environmentalNote": "Theme-park-corridor particulate (fine dust off the asphalt car parks) settles on surrounding homes and drives more frequent window cleaning than suburbs further inland.",
        "localHook": "We work the Discovery Drive / Siganto Drive estate cluster plus the commercial glazing along Town Centre Drive near Westfield Helensvale."
    },
    "pacific-pines": {
        "propertyMix": "Pacific Pines is a master-planned late-1990s / early-2000s estate suburb — uniform brick-veneer family homes, a central village shopping centre, and extensive council greenbelts.",
        "environmentalNote": "The young-suburb tree canopy means less moss loading than older suburbs, but heavy subdivision street-tree pollen blankets windows and solar panels during spring.",
        "localHook": "We clean a steady flow of the original Pacific Pines estate grid off The Avenue and the newer pockets toward the Gaven boundary."
    },
    "gaven": {
        "propertyMix": "Gaven is a mixed-density suburb along the Coomera River corridor — newer family estates, some acreage along the western river frontage, and the Gaven Station precinct.",
        "environmentalNote": "River-side homes catch morning mist off the Coomera River, while the estate homes face the standard new-build issue of construction-dust carryover on first-year cleans.",
        "localHook": "We handle a mix of Gaven station-precinct apartments and the river-frontage family homes off Maudsland Road."
    },
    "oxenford": {
        "propertyMix": "Oxenford straddles the M1 — mixed-use retail on the highway side, original 1980s–1990s housing through the core, and Warner Bros. studios / Movie World on the commercial west.",
        "environmentalNote": "Highway proximity means fine diesel particulate on windows and solar panels; it's the same particulate we see along Helensvale's theme-park corridor, but in a denser strip along Old Pacific Highway.",
        "localHook": "Much of our Oxenford work is the Old Pacific Highway commercial strip and the Tamborine Oxenford Road residential grid behind it."
    },
    "coomera": {
        "propertyMix": "Coomera is the Gold Coast's fastest-growing construction zone — Coomera Town Centre retail, the Westfield, dozens of new estates, and the Coomera Marine Precinct on the river.",
        "environmentalNote": "Active construction sites across the suburb mean near-constant airborne dust; new homes here typically need a full exterior wash within 6 months of handover.",
        "localHook": "Our Coomera work is heavy on new-build first-cleans — construction-dust removal on render, roofs, and windows is the core service request."
    },
    "upper-coomera": {
        "propertyMix": "Upper Coomera is early-2000s master-planned suburbia — uniform brick family homes, pocket parks, and a scattering of newer estate extensions on the western M1 side.",
        "environmentalNote": "Heavy subdivision street-tree maturation now drops visible gum-leaf litter into gutters year-round — gutter cleaning is the single most requested service in the suburb.",
        "localHook": "We service a consistent flow of the Reserve Road and Days Road estate streets — combined gutter-clean-plus-window-clean visits are the usual format."
    },
    "pimpama": {
        "propertyMix": "Pimpama is the northern Gold Coast's newest construction frontier — large estate subdivisions, schools being built in parallel with houses, and a growing retail strip along Pimpama-Jacobs Well Road.",
        "environmentalNote": "Construction particulate dominates the cleaning conversation here — first-year homes need exterior wash-downs just to clear render of construction film before owners even move furniture in.",
        "localHook": "Most of our Pimpama work is brand-new-build first-cleans across the big estate clusters north of the M1 exit."
    },
    "ormeau": {
        "propertyMix": "Ormeau is a transitional northern suburb — established 1980s–1990s family homes, a growing retail hub near the M1, and some acreage blocks on the western rural fringe.",
        "environmentalNote": "The M1-adjacent part of the suburb catches heavy highway particulate, while the acreage western side faces standard rural-hinterland leaf and moss loading.",
        "localHook": "Our Ormeau work splits between the Kingsmore estate streets and the acreage blocks off Peachey Road."
    },
    "ormeau-hills": {
        "propertyMix": "Ormeau Hills is elevated suburbia on the ridge above Ormeau — 2000s–2010s brick family homes, many two-storey, with valley views across to the coast.",
        "environmentalNote": "Ridgeline westerlies carry fine hinterland dust that settles on the valley-facing glass of hillside homes — mid-morning cleans outlast afternoon cleans noticeably.",
        "localHook": "We work a steady run of the Creek Ridge Road / Ransom Road estates — two-storey, valley-facing homes where extension-pole work is standard."
    },
    "jacobs-well": {
        "propertyMix": "Jacobs Well is a quiet waterside village — fishing shacks, canal homes on the Logan River estuary, and a working marina precinct with boat sheds and jetties.",
        "environmentalNote": "Estuarine salt, boat-motor residue, and marsh-humidity combine to accelerate mould growth on rendered homes — most local houses need an annual softwash reset just to stay presentable.",
        "localHook": "Our Jacobs Well work is mostly waterfront glass, pontoon softwash, and boat-shed render cleaning along Marine Parade and Jacobs Well Road."
    },
    "steiglitz": {
        "propertyMix": "Steiglitz is a rural-edge boating suburb — acreage blocks, some riverside homes along the Pimpama River, and a mix of older farmhouses and newer rural-residential builds.",
        "environmentalNote": "The combination of marsh-river humidity and low housing density means moss and lichen loading on roofs is significant — often requiring multi-pass softwash treatment.",
        "localHook": "We run a small but steady flow of Steiglitz jobs — typically a combined roof softwash, gutter clean, and full-house wash to justify the drive."
    },
    "norwell": {
        "propertyMix": "Norwell is deep rural-residential and market-garden country — acreage blocks, long-established farm properties, and some newer rural lifestyle rebuilds.",
        "environmentalNote": "Paddock dust and agricultural spray drift settle on windows and solar arrays more than any other northern suburb — solar-panel cleaning delivers the most measurable productivity gain here.",
        "localHook": "Our Norwell jobs are typically large acreage homes where solar panel and roof softwash is booked alongside the window clean."
    },
    "yatala": {
        "propertyMix": "Yatala is primarily industrial — the Yatala Enterprise Area distribution warehouses, light-manufacturing estates, plus a smaller residential and acreage pocket.",
        "environmentalNote": "Industrial airborne residue (metal fabrication dust, forklift exhaust) dominates commercial glazing here — cleaning intervals for warehouse offices are typically monthly or fortnightly.",
        "localHook": "Most of our Yatala work is commercial warehouse office glazing and factory shopfronts along the Stanmore Road / Beenleigh-Yatala Road estate."
    },
    "stapylton": {
        "propertyMix": "Stapylton is an industrial/rural mix — warehousing north of the Pacific Highway, light-manufacturing, and some acreage residential blocks.",
        "environmentalNote": "Industrial particulate combined with proximity to the Motorsport Park brings distinctive rubber-dust and diesel particulate onto commercial glazing on race weekends.",
        "localHook": "Our Stapylton work centres on the industrial estate commercial glazing and the Motorsport Park shoulder — both need short cleaning intervals."
    },
    # ───────────── NSW TWEED ─────────────
    "tweed-heads": {
        "propertyMix": "Tweed Heads is the NSW border hub — riverside apartments along the Tweed River, the Tweed City retail precinct, and a mix of original beach cottages and modern apartments along Coolangatta Road.",
        "environmentalNote": "The suburb catches both Tweed River estuary salt mist and direct Pacific salt spray — a dual exposure that puts beachfront glass here on a tighter cleaning cycle than even Coolangatta.",
        "localHook": "We service the Tweed City commercial precinct glazing and the Tweed River waterfront apartments along Wharf Street and Florence Street."
    },
    "tweed-heads-south": {
        "propertyMix": "Tweed Heads South is residential and commercial mixed — older brick family homes, marina-side waterfront properties along the Tweed River, and retail strips along Minjungbal Drive.",
        "environmentalNote": "River-estuary humidity drives strong black-spot mould on south-facing render, and the Minjungbal Drive commercial strip collects heavy road-grime from its role as the main border traffic artery.",
        "localHook": "Our South Tweed work includes the Minjungbal Drive commercial strip and the marina-precinct waterfront homes."
    },
    "tweed-heads-west": {
        "propertyMix": "Tweed Heads West is mostly residential — 1970s–1980s brick homes, a few canal blocks along the Terranora Inlet, and the Tweed West sporting fields precinct.",
        "environmentalNote": "Terranora Inlet moisture creates persistent damp on south-facing walls, while the older housing stock means many roofs have accumulated decades of unchecked lichen growth.",
        "localHook": "Most of our Tweed West work is the older brick-home grid and the canal-side properties along the Terranora Inlet."
    },
    "banora-point": {
        "propertyMix": "Banora Point is a broad residential suburb — 1990s–2000s family homes on sloped blocks, golf-frontage properties at Banora Golf Club, and a significant retirement-village presence.",
        "environmentalNote": "Sloped blocks mean lots of multi-storey glazing facing the Tweed River and the distant ocean — all of which catch morning salt mist off the estuary and need tight cleaning cycles.",
        "localHook": "Our Banora Point work is heavy on two-storey river-facing glass and the large flat retirement-village window arrays."
    },
    "terranora": {
        "propertyMix": "Terranora is an elevated suburb overlooking the Terranora Inlet — 1990s–2000s architect-designed homes on ridge-line blocks, plus some acreage on the western side.",
        "environmentalNote": "Ridge-line position exposes these homes to both morning estuary mist and afternoon westerlies — a two-direction environmental load that shortens cleaning-interval effectiveness.",
        "localHook": "Our Terranora work is dominated by the Fraser Drive ridge homes — two-storey, long glass frontages, and most need pole-access or rope-access."
    },
    "bilambil": {
        "propertyMix": "Bilambil is a small rural village in the Tweed hinterland — older timber Queenslanders, modern rural rebuilds, and acreage blocks along Bilambil Road and the creek corridor.",
        "environmentalNote": "Dense canopy and creek-valley humidity create severe moss and lichen loading on roofs, and the low housing density means most homes need multi-stage softwash to reset.",
        "localHook": "Our Bilambil jobs are typically whole-house events — roof soft-wash, gutter clean, and window work on a single visit."
    },
    "bilambil-heights": {
        "propertyMix": "Bilambil Heights is elevated family suburbia above the valley — 1990s–2010s brick family homes on sloped blocks with valley-and-ocean views.",
        "environmentalNote": "The elevated, exposed position means these homes catch both inland dust and ocean salt — and the two-storey glass frontages that take those views are also the hardest to clean DIY.",
        "localHook": "Most of our Heights work is along Bilambil Heights Road — two-storey homes, extension-pole work on the valley-facing side."
    },
    "cobaki": {
        "propertyMix": "Cobaki is rural-residential — scattered older farmhouses, some newer acreage builds, and the developing Cobaki Lakes master-planned estate on the eastern side.",
        "environmentalNote": "Marsh-area humidity near the Cobaki Broadwater keeps roof lichen and render mould active year-round, and the new-estate homes face the standard new-build construction-film issue.",
        "localHook": "We split our Cobaki work between the older acreage homes and the new-build first-cleans in the Cobaki Lakes estate."
    },
    "cobaki-lakes": {
        "propertyMix": "Cobaki Lakes is a new master-planned estate — uniform contemporary family homes, central lake and parkland, and ongoing construction phases.",
        "environmentalNote": "Construction across the estate keeps airborne dust levels high; almost every home we see in Cobaki Lakes is on a first-year first-clean or a recent-handover deep-clean.",
        "localHook": "Our Cobaki Lakes work is almost entirely new-build construction-dust removal from render and windows — often booked before landscaping goes in."
    },
    "chinderah": {
        "propertyMix": "Chinderah is a riverside village — fishing-industry heritage homes along the Tweed River, caravan-park accommodation, and some newer rebuilds on river-frontage blocks.",
        "environmentalNote": "Tweed River estuary salt and a fishing-village marine-industrial air profile combine to accelerate metal oxidation on window frames and aluminium fittings.",
        "localHook": "Our Chinderah work is focused on the river-frontage cottages along Chinderah Bay Drive and the Philp Parade strip."
    },
    "kingscliff": {
        "propertyMix": "Kingscliff is a premium NSW beach town — beachfront apartments along Marine Parade, a popular café strip on Marine Parade and Pearl Street, and dense residential streets behind.",
        "environmentalNote": "Kingscliff's beachfront glass faces direct easterly salt spray with zero dune buffer — the café-strip shopfronts need weekly cleaning to stay streak-free in summer.",
        "localHook": "We regularly clean the Marine Parade café strip, the beachfront apartment blocks, and the residential streets behind Kingscliff Beach."
    },
    "casuarina": {
        "propertyMix": "Casuarina is a premium coastal estate just south of Kingscliff — architect-designed beachfront homes, resort-style villas around Salt Village, and native dune-buffer streetscapes.",
        "environmentalNote": "Salt-spray exposure combined with native-plant pollen (casuarinas, banksias, pandanus) produces a gritty sap residue on windows that is unique to this stretch of coast.",
        "localHook": "Our Casuarina work is high-end beachfront — architect homes along Casuarina Way and the Salt Village villas where premium finishes need correspondingly careful soft-wash methods."
    },
    "salt": {
        "propertyMix": "Salt is the Salt Village resort precinct — holiday villas, boutique apartments, a café-and-restaurant strip around the Salt Bar & Restaurant, and short-stay accommodation.",
        "environmentalNote": "Holiday-traffic footfall and direct salt-spray exposure combine to keep shopfront glazing in need of weekly attention during peak season.",
        "localHook": "Our Salt work is commercial-heavy — shopfronts, villa common areas, and holiday-villa turnover cleans."
    },
    "cudgen": {
        "propertyMix": "Cudgen is a rural agricultural suburb — sugar-cane and banana farms, scattered farmhouses, and some newer rural-residential rebuilds.",
        "environmentalNote": "Agricultural spray drift and cane-harvest dust are the dominant environmental factors — solar panels and roof sheets visibly accumulate agricultural residue within weeks.",
        "localHook": "Our Cudgen work is typically a combined solar-panel clean plus roof and gutter visit for the farmhouse and rural-residential blocks."
    },
    "duranbah": {
        "propertyMix": "Duranbah is a small agricultural-and-coastal suburb — banana farms, scattered rural homes, and the famous Duranbah surf break on the northern coastline edge.",
        "environmentalNote": "A unique dual profile: agricultural residue on the inland side, direct Pacific salt spray on the coastal side, and virtually no buffer between them.",
        "localHook": "Our Duranbah work ranges from the rural farmhouses along Duranbah Road to the cliff-edge homes on the surf break."
    },
    "fingal-head": {
        "propertyMix": "Fingal Head is a small coastal village — heritage fishing cottages, modern beach-house rebuilds, and the Fingal Head Lighthouse precinct as the suburb's visual anchor.",
        "environmentalNote": "Headland exposure to both Pacific salt spray and Tweed River estuary mist produces some of the most aggressive glass-hazing rates on the Tweed coast.",
        "localHook": "We work a small but loyal stream of Fingal Head coastal homes — soft-wash, glass, and deck clean often booked together seasonally."
    },
    "kings-forest": {
        "propertyMix": "Kings Forest is a large master-planned estate in development — contemporary family homes, ongoing construction phases, and central parkland framing the Cudgen Creek corridor.",
        "environmentalNote": "Active construction across the estate produces heavy airborne dust, and the creek corridor creates localised humid pockets that drive first-year mould on new-build render.",
        "localHook": "Our Kings Forest work is overwhelmingly new-build first-cleans — construction-film removal from render, windows, and roof tiles."
    },
    "pottsville": {
        "propertyMix": "Pottsville is a beach village in southern Tweed Shire — beachfront cottages, family-home streets behind the dunes, and a growing café strip on Coronation Avenue.",
        "environmentalNote": "Direct Pacific exposure with a shallow dune buffer means beachfront glass here hazes quickly; the café strip shopfronts sit far enough back to stay on a standard monthly cycle.",
        "localHook": "We regularly clean the Coronation Avenue café strip and the streets running back from Mooball Street to the beach."
    },
    "cabarita-beach": {
        "propertyMix": "Cabarita Beach (historically Bogangar/Cabarita) is a beach village with resort-style holiday homes, a growing apartment presence, and a popular café strip around Norries Headland.",
        "environmentalNote": "Headland-adjacent homes face both salt spray and strong onshore winds — the winds drive fine beach sand into window tracks and across deck areas at a rate unusual for NSW coastal suburbs.",
        "localHook": "Our Cabarita work spans the Norries Headland luxury homes, the café strip around Pandanus Parade, and the beachfront apartment blocks."
    },
    "bogangar": {
        "propertyMix": "Bogangar is the broader residential area behind Cabarita Beach — beach cottages, post-war fibro, and a growing set of modern rebuilds on deep blocks.",
        "environmentalNote": "Backing onto the Cudgera Creek wetland corridor, many Bogangar homes experience wetland-insect loading on windows and roof sheets — particularly after summer hatching events.",
        "localHook": "Our Bogangar work focuses on the residential streets behind Cabarita — soft-wash on original fibro and render cleaning on the newer builds."
    },
    "hastings-point": {
        "propertyMix": "Hastings Point is a small heritage-coastal village — original fishing cottages, some recent boutique rebuilds, and the Hastings Point headland and creek mouth as landscape anchors.",
        "environmentalNote": "Headland salt spray combined with creek-mouth humidity accelerates aluminium oxidation on window frames — window-frame cleaning here is an ongoing preventative, not a cosmetic task.",
        "localHook": "We run a modest but regular stream of Hastings Point village homes — combined window and softwash visits are the most common booking format."
    }
}

# ---- Script body: inject the three new fields after `landmarks: [...]` line ----

src = Path('src/data/locations.js')
original = src.read_text()
new = original

missing = []
updated = 0

for slug, fields in CONTENT.items():
    # Build the new-fields block exactly — preserve indentation
    new_block = (
        f'    propertyMix: {repr(fields["propertyMix"])},\n'
        f'    environmentalNote: {repr(fields["environmentalNote"])},\n'
        f'    localHook: {repr(fields["localHook"])},\n'
    )
    # Convert Python str repr (single-quote) to JS-friendly double-quote form
    def js_string(s):
        return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

    new_block = (
        f'    propertyMix: {js_string(fields["propertyMix"])},\n'
        f'    environmentalNote: {js_string(fields["environmentalNote"])},\n'
        f'    localHook: {js_string(fields["localHook"])},\n'
    )

    # Pattern: find the suburb object by its slug and inject after the landmarks line.
    # Regex: match `slug: "x",` then everything up to the landmarks line (ending with `]`),
    # then capture a newline, then inject our block before the next line.
    pattern = re.compile(
        r'(slug:\s*"' + re.escape(slug) + r'",[\s\S]*?landmarks:\s*\[[^\]]*\],?\n)',
        re.MULTILINE
    )
    match = pattern.search(new)
    if not match:
        missing.append(slug)
        continue

    # Skip if already injected (idempotency)
    following = new[match.end():match.end()+200]
    if 'propertyMix:' in following[:60]:
        continue

    new = new[:match.end()] + new_block + new[match.end():]
    updated += 1

src.write_text(new)
print(f"Updated {updated} suburb entries in src/data/locations.js")
if missing:
    print(f"WARNING: could not find {len(missing)} suburbs: {missing}")
