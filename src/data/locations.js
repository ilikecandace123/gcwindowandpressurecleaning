// Comprehensive locations data for Gold Coast and Northern NSW cleaning services
// Includes suburbs, postcodes, landmarks, and local descriptions

export const SUBURBS = [
  // GOLD COAST COASTAL - SOUTH TO NORTH
  {
    name: "Coolangatta",
    slug: "coolangatta",
    region: "south_coast",
    postcode: 4225,
    description: "Southern Gold Coast beach town known for pristine beaches and holiday crowds. Salt air and coastal weather require regular professional cleaning maintenance.",
    landmarks: ["Coolangatta Beach", "Point Danger", "Kirra Beach"],
    propertyMix: "Coolangatta sits right on the QLD–NSW border and blends mid-century beach shacks, holiday apartment towers along Marine Parade, and modern family homes up Kirra Hill.",
    environmentalNote: "Direct Pacific exposure means salt crystals bake onto glass, aluminium window frames pit faster than inland suburbs, and east-facing render grows mould stripes after every humid spell.",
    localHook: "We regularly work the strip between Rainbow Bay and Greenmount, plus the hillside streets above Duranbah lookout where ocean-facing glass needs quarterly attention to stay streak-free.",
    nearbySuburbs: ["Bilinga", "Kirra", "Tugun"]
  },
  {
    name: "Bilinga",
    slug: "bilinga",
    region: "south_coast",
    postcode: 4225,
    description: "Small coastal suburb with stunning ocean views. The salt spray and humidity common to beachfront properties make professional cleaning services essential.",
    landmarks: ["Bilinga Headland", "Coolangatta Beach", "National Park"],
    propertyMix: "Bilinga is a small beachside pocket tucked between the airport and Kirra — mostly single-storey timber cottages, 1970s brick-and-tile, and a handful of newer duplexes on Golden Four Drive.",
    environmentalNote: "Aircraft kerosene residue combined with coastal salt spray leaves a greasy film on windows and solar panels that domestic cleaning rarely shifts; it needs surfactant-based softwash.",
    localHook: "Most of our Bilinga work is along the Golden Four corridor and the quiet streets off Pacific Parade where low-set homes accumulate roof moss from shaded tree canopies.",
    nearbySuburbs: ["Coolangatta", "Kirra", "Tugun"]
  },
  {
    name: "Kirra",
    slug: "kirra",
    region: "south_coast",
    postcode: 4225,
    description: "Popular beach suburb with excellent surfing conditions and family-friendly beaches. Coastal salt spray and sand accumulation require regular maintenance.",
    landmarks: ["Kirra Beach", "Kirra Reef", "Tallebudgera Valley"],
    propertyMix: "Kirra is defined by its beachfront high-rises along Marine Parade and a tight grid of post-war cottages on the hill behind them.",
    environmentalNote: "Strong onshore winds drive fine beach sand under eaves, into window tracks, and across pool decks — leaving abrasive deposits that scratch glass if wiped dry.",
    localHook: "Window cleaning on the Kirra high-rises typically needs rope-access or water-fed pole work; we also clean the surf club and several cafés around the Kirra Point headland.",
    nearbySuburbs: ["Coolangatta", "Tugun", "Tallebudgera"]
  },
  {
    name: "Tugun",
    slug: "tugun",
    region: "south_coast",
    postcode: 4224,
    description: "Quiet beachside village between major beaches. Residents appreciate the peaceful setting and require regular cleaning to maintain properties against coastal elements.",
    landmarks: ["Tugun Beach", "Tallebudgera Gorge", "Tallebudgera National Park"],
    propertyMix: "Tugun is a quieter coastal village with a mix of retirement duplexes, family homes on green-title blocks, and boutique medical precincts near Gold Coast University Hospital.",
    environmentalNote: "The suburb sits in a coastal rain shadow behind Tugun Hill so window ledges collect fine red-clay dust blown off the ridge — especially noticeable after dry westerly weeks.",
    localHook: "We service the medical precinct around Boyd Street regularly (hospitals demand streak-free glazing) and many of the duplexes on Tugun's back streets.",
    nearbySuburbs: ["Kirra", "Currumbin", "Tallebudgera"]
  },
  {
    name: "Currumbin",
    slug: "currumbin",
    region: "south_coast",
    postcode: 4223,
    description: "Vibrant beachfront suburb with rock pools, wildlife sanctuary, and pristine beaches. High salt content in air and regular weather exposure demand professional cleaning.",
    landmarks: ["Currumbin Beach", "Currumbin Rock Pools", "Currumbin Wildlife Sanctuary"],
    propertyMix: "Currumbin stretches from the famous Alley surf break to Currumbin Hill; properties range from classic beachfront Queenslanders to cliff-top contemporary homes with floor-to-ceiling glass.",
    environmentalNote: "Cliff-top homes face extreme wind-driven salt spray — windows on the ocean side can visibly haze within a fortnight without a hydrophobic surface treatment.",
    localHook: "Much of our Currumbin work is on the hill streets above The Alley and around Currumbin Rock — elevated homes where pole-reach and rope-access are the practical options.",
    nearbySuburbs: ["Tugun", "Currumbin Waters", "Palm Beach"]
  },
  {
    name: "Currumbin Waters",
    slug: "currumbin-waters",
    region: "south_coast",
    postcode: 4223,
    description: "Upmarket waterfront suburb with canals and exclusive properties. Regular professional cleaning maintains the premium appeal of waterfront homes.",
    landmarks: ["Currumbin Estuary", "Waterways", "Golf Courses"],
    propertyMix: "Currumbin Waters is canal-estate territory — predominantly 1990s–2000s brick homes with pontoons, plus some newer waterfront rebuilds around The Spit and the lakes.",
    environmentalNote: "Brackish water off the canals leaves mineral spotting on ground-floor glass and ducted air-con screens, and pontoon areas grow algae on timber decking faster than the Gold Coast average.",
    localHook: "Our cleans here typically cover canal-side glass, pontoon softwash, and the terracotta or Colorbond roofs that need tree-sap removal from over-hanging paperbarks.",
    nearbySuburbs: ["Currumbin", "Currumbin Valley", "Palm Beach"]
  },
  {
    name: "Currumbin Valley",
    slug: "currumbin-valley",
    region: "hinterland",
    postcode: 4223,
    description: "Picturesque hinterland suburb with rural properties and tree-covered homes. Dust, tree debris, and natural elements require regular professional maintenance.",
    landmarks: ["Tallebudgera National Park", "Rainforest", "Mountain Views"],
    propertyMix: "Currumbin Valley is rural-residential hinterland — acreage blocks, timber country homes, hobby farms, and a few restored 1920s farmhouses along the Currumbin Creek Road corridor.",
    environmentalNote: "Dense eucalypt canopy means gutters fill with leaf litter and seed pods within weeks, roofs grow lichen on the shaded southern side, and spider webs form across every external window frame.",
    localHook: "Our hinterland crew knows the valley road well — we handle the steep driveway access and tall two-storey pole homes common to the upper valley properties.",
    nearbySuburbs: ["Currumbin Waters", "Bonogin", "Tallebudgera Valley"]
  },
  {
    name: "Palm Beach",
    slug: "palm-beach",
    region: "south_coast",
    postcode: 4221,
    description: "Family-oriented beach suburb with calm waters and patrolled beaches. Salt air exposure and regular beachgoer traffic require frequent property cleaning.",
    landmarks: ["Palm Beach", "Tallebudgera National Park", "Surf Club"],
    propertyMix: "Palm Beach is family-beach territory with a strong mid-century beach house identity — original 1950s cottages, renovated art-deco apartments, and an increasing number of coastal contemporary rebuilds.",
    environmentalNote: "The north-facing beach orientation catches strong afternoon sun that bakes salt residue onto glass by mid-afternoon, so mid-morning cleans last noticeably longer than afternoon cleans.",
    localHook: "We regularly clean homes along the Jefferson Lane strip and the streets running back to the Tallebudgera Creek mouth, including several pre-AirBnB holiday cottages.",
    nearbySuburbs: ["Currumbin", "Elanora", "Tallebudgera"]
  },
  {
    name: "Elanora",
    slug: "elanora",
    region: "south_coast",
    postcode: 4221,
    description: "Exclusive hillside suburb with expansive views. Elevated position experiences coastal winds and requires professional cleaning for multi-level properties.",
    landmarks: ["Elanora Heights", "Tallebudgera National Park", "Valley Views"],
    propertyMix: "Elanora is a largely hillside suburb set back from the beach — 1980s brick-veneer family homes, pocket estates on The Avenue, and rising modern architect-designed homes on the elevated blocks.",
    environmentalNote: "Elevated sites face the southerly trade winds which accelerate window spotting from airborne salt, while the dense street-tree canopy means most roofs carry visible north-side moss bands.",
    localHook: "Our Elanora work centres on the slope between The Pines shopping centre and the Tallebudgera Creek reserve — two-storey homes where extension-pole work is essential.",
    nearbySuburbs: ["Palm Beach", "Tallebudgera", "Burleigh Heads"]
  },
  {
    name: "Tallebudgera",
    slug: "tallebudgera",
    region: "south_coast",
    postcode: 4220,
    description: "Stunning oceanside suburb nestled in a valley with protected beaches and lush surroundings. Perfect for families, requires regular window and house cleaning.",
    landmarks: ["Tallebudgera Beach", "Tallebudgera Valley", "National Park"],
    propertyMix: "Tallebudgera runs from the creek mouth up a wooded valley — a mix of beachside low-sets, creekside stilt houses, and acreage blocks further west toward the national park boundary.",
    environmentalNote: "The suburb's humid creek microclimate drives aggressive mildew growth on south-facing walls and roof sheets, particularly on homes shaded by the paperbark and eucalypt corridor along the creek.",
    localHook: "We see a lot of the stilt-style creek homes off Tallebudgera Creek Road and the newer rebuilds near Tallebudgera Primary — softwash is often the go-to for the rendered lower storeys.",
    nearbySuburbs: ["Elanora", "Tallebudgera Valley", "Burleigh Heads"]
  },
  {
    name: "Tallebudgera Valley",
    slug: "tallebudgera-valley",
    region: "hinterland",
    postcode: 4220,
    description: "Hinterland retreat with rainforest surroundings and mountain homes. Tree pollen, sap, and natural debris accumulation need professional attention.",
    landmarks: ["Rainforest", "Mountain Streams", "National Park"],
    propertyMix: "Tallebudgera Valley is deep hinterland acreage country — timber homesteads, modern architect-designed pole homes, hobby farms, and equestrian properties along Tallebudgera Creek Road.",
    environmentalNote: "Thick rainforest canopy and creek humidity produce heavy leaf-matter roof loading and lichen blooms on north-facing roof sheets within a single wet season.",
    localHook: "Access requires 4WD-friendly crews for some driveways; we routinely service properties as far west as the Springbrook Road turn-off where full exterior softwashes are annual fixtures.",
    nearbySuburbs: ["Tallebudgera", "Bonogin", "Currumbin Valley"]
  },
  {
    name: "Burleigh Heads",
    slug: "burleigh-heads",
    region: "south_coast",
    postcode: 4220,
    description: "Premier beachfront suburb with iconic headland, upmarket dining, and pristine beaches. Coastal exposure and high foot traffic require professional maintenance.",
    landmarks: ["Burleigh Heads", "Headland Park", "Burleigh Beach"],
    propertyMix: "Burleigh Heads has become one of the Gold Coast's premium addresses — heritage cottages near James Street, luxury beachfront apartments along Goodwin Terrace, and tightly-held homes up Burleigh Hill.",
    environmentalNote: "The famous Burleigh Point headland funnels onshore winds directly across the suburb, coating ocean-facing glass and balcony glass balustrades with a visible salt haze within days.",
    localHook: "We clean several Goodwin Terrace high-rises, plus heritage render on many of the protected homes along James Street and Connor Street — where soft-wash is mandatory to protect original paintwork.",
    nearbySuburbs: ["Tallebudgera", "Burleigh Waters", "Miami"]
  },
  {
    name: "Burleigh Waters",
    slug: "burleigh-waters",
    region: "central_coast",
    postcode: 4220,
    description: "Peaceful waterfront suburb with calm river access and family-friendly amenities. Water reflections and humidity create unique cleaning maintenance needs.",
    landmarks: ["Burleigh Lake", "Waterways", "Parkland"],
    propertyMix: "Burleigh Waters is a canal and lake suburb — 1980s–2000s brick-veneer homes with pontoons, some newer waterfront knock-downs, and dense pockets of townhouse villages.",
    environmentalNote: "Brackish canal water, boat fuel vapour, and humid still-air pockets drive aggressive black-spot mould on pontoons and the lower storey render of waterfront homes.",
    localHook: "Most of our Burleigh Waters work is waterfront glass, pontoon softwash, and the Colorbond roofs around the Jacobs Ridge side of the suburb.",
    nearbySuburbs: ["Burleigh Heads", "Miami", "Broadbeach"]
  },
  {
    name: "Miami",
    slug: "miami",
    region: "central_coast",
    postcode: 4220,
    description: "Charming beachfront suburb with village atmosphere and popular patrolled beach. Coastal salt and regular beachgoer activity necessitate frequent cleaning.",
    landmarks: ["Miami Beach", "Rock Pool", "Surf Club"],
    propertyMix: "Miami is a tight coastal suburb straddling the Gold Coast Highway — surf-shack-era cottages, a growing set of beachside apartment blocks, and pockets of cafés and commercial space on Marine Parade.",
    environmentalNote: "Miami catches direct easterly salt spray and also ambient highway grime — a two-pollutant combination that leaves a sticky film on east-facing windows that plain-water cleans cannot remove.",
    localHook: "We regularly service the Marine Parade strip and the cafés around the Miami Marketta, plus the low-rise apartments between the highway and the beach.",
    nearbySuburbs: ["Burleigh Heads", "Mermaid Beach", "Broadbeach"]
  },
  {
    name: "Mermaid Beach",
    slug: "mermaid-beach",
    region: "central_coast",
    postcode: 4218,
    description: "Beachfront suburb between Miami and Broadbeach with modern developments. Salt air and beachfront exposure require consistent professional cleaning services.",
    landmarks: ["Mermaid Beach", "Broadwater", "Beach Promenade"],
    propertyMix: "Mermaid Beach hosts some of the Gold Coast's most expensive beachfront strips — including the famed Hedges Avenue 'Millionaires Row', mid-century beach houses, and tall boutique apartment towers.",
    environmentalNote: "Hedges Avenue and Albatross Avenue homes sit directly behind the primary dune with zero shelter — window cleaning here is functionally a monthly requirement if owners want clear glass.",
    localHook: "We work several Hedges Avenue and Albatross Avenue properties where rope-access and water-fed pole gear is standard kit for the tall glass frontages.",
    nearbySuburbs: ["Miami", "Mermaid Waters", "Broadbeach"]
  },
  {
    name: "Mermaid Waters",
    slug: "mermaid-waters",
    region: "central_coast",
    postcode: 4218,
    description: "Luxury waterfront precinct with canals, high-end apartments, and resort facilities. Premium properties demand frequent professional cleaning and maintenance.",
    landmarks: ["Mermaid Waters Canal System", "Broadwater", "Shopping Centre"],
    propertyMix: "Mermaid Waters is a canal estate of 1980s–1990s single- and two-storey homes with pontoons, plus newer waterfront rebuilds around Lake Heron and Clear Island Waters boundary.",
    environmentalNote: "The canal system concentrates still humid air at ground level, driving heavy black-spot mould on south-facing render and bubble-growth algae under pontoon boards.",
    localHook: "We service a lot of the Lakeland Drive loop and the streets around Markeri Street — canal glass, pontoon softwash, and terracotta roof moss removal are the common jobs.",
    nearbySuburbs: ["Mermaid Beach", "Broadbeach Waters", "Broadbeach"]
  },
  {
    name: "Broadbeach",
    slug: "broadbeach",
    region: "central_coast",
    postcode: 4218,
    description: "Major tourist and residential hub with bustling beach culture and high-rise living. Heavy salt exposure and urban dust require regular professional cleaning.",
    landmarks: ["Broadbeach Beach", "Kurrawa Beach", "Shopping Centre"],
    propertyMix: "Broadbeach is the Gold Coast's second high-rise hub — residential towers along Old Burleigh Road, strata apartment blocks, and the Oracle and Jewel tower cluster nearest Kurrawa.",
    environmentalNote: "Sealed-facade towers here collect coastal salt at a rate that requires rostered commercial window-cleaning contracts — external glass visibly hazes within three weeks in summer.",
    localHook: "Our commercial crew services multiple Broadbeach towers on strata cleaning contracts, and our residential team handles the low-rise pocket between Charles Avenue and Margaret Avenue.",
    nearbySuburbs: ["Mermaid Waters", "Surfers Paradise", "Broadbeach Waters"]
  },
  {
    name: "Broadbeach Waters",
    slug: "broadbeach-waters",
    region: "central_coast",
    postcode: 4218,
    description: "Upscale waterfront suburb with canal estates and luxury properties. Water reflections and humidity create cleaning challenges requiring professional expertise.",
    landmarks: ["Broadwater", "Canal Estates", "Golf Course"],
    propertyMix: "Broadbeach Waters is premium canal real estate — large 1990s–2010s family homes on waterfront blocks, many with pontoons and pool areas, plus some recent ultra-contemporary rebuilds.",
    environmentalNote: "Waterfront glass here takes the combined hit of canal salt mist off the Nerang River system and direct Pacific exposure — cleaning cycles need to be tighter than inland canal suburbs.",
    localHook: "We regularly work the T.E. Peters Drive / Monaco Street loop — multi-storey waterfront homes where extension-pole and pontoon-side glass cleaning are core tasks.",
    nearbySuburbs: ["Broadbeach", "Surfers Paradise", "Benowa"]
  },
  {
    name: "Surfers Paradise",
    slug: "surfers-paradise",
    region: "central_coast",
    postcode: 4217,
    description: "Iconic tourist destination with world-famous beach, high-rise buildings, and vibrant nightlife. Heavy foot traffic and coastal salt require frequent professional cleaning.",
    landmarks: ["Surfers Paradise Beach", "Cavill Avenue", "Q1 Tower"],
    propertyMix: "Surfers Paradise is the Gold Coast's tallest and densest tower precinct — Q1 and the Soul, Circle on Cavill, and Chevron Renaissance cluster dominate a skyline of commercial and residential high-rises.",
    environmentalNote: "Tower glass here absorbs airborne salt, vehicle emissions from Surfers Paradise Boulevard, and holiday-crowd pollution — rostered façade cleaning is a base cost of owning strata here.",
    localHook: "Our commercial rope-access and traverse-cradle crew handles scheduled façade cleaning on multiple Surfers towers; we also clean the mid-rises along Orchid and Ocean avenues.",
    nearbySuburbs: ["Broadbeach", "Main Beach", "Southport"]
  },
  {
    name: "Main Beach",
    slug: "main-beach",
    region: "central_coast",
    postcode: 4217,
    description: "Upmarket beachfront suburb with luxury properties and stunning views. Coastal exposure and premium property standards demand professional cleaning services.",
    landmarks: ["Main Beach", "Tallebudgera Channel", "Exclusive Apartments"],
    propertyMix: "Main Beach is a mix of upscale apartment towers along Tedder Avenue, luxury strata on Main Beach Parade, and some original Queenslanders hidden behind the beachfront line.",
    environmentalNote: "The open north-facing beach means prevailing northerlies push salt directly into every north-facing balcony glass — cleans that last elsewhere won't last here.",
    localHook: "We service several Tedder Avenue cafés and the towers along the Main Beach Parade strip closest to The Spit break-wall.",
    nearbySuburbs: ["Surfers Paradise", "Southport", "Labrador"]
  },

  // GOLD COAST CENTRAL/INLAND
  {
    name: "Robina",
    slug: "robina",
    region: "central",
    postcode: 4226,
    description: "Modern master-planned suburb with retail and business hubs. Urban environment with regular dust and pollution requires professional window and roof cleaning.",
    landmarks: ["Robina Town Centre", "Lake Oriordan", "Business District"],
    propertyMix: "Robina is the master-planned centre of the southern Gold Coast — Robina Town Centre, the hospital precinct, Robina Stadium, plus residential estates from compact townhouses to golf-frontage lakeside homes.",
    environmentalNote: "Robina's lake-estate homes face distinctive freshwater-lake algae blooms on pontoons and south-facing render, plus heavy pollen loading on cars and windows during the jacaranda and plane-tree flowering.",
    localHook: "Our Robina work includes the Town Centre commercial glazing, the hospital precinct, and the lakefront homes around Lake Tabourie and the Robina Quays area.",
    nearbySuburbs: ["Mudgeeraba", "Varsity Lakes", "Bundall"]
  },
  {
    name: "Mudgeeraba",
    slug: "mudgeeraba",
    region: "hinterland",
    postcode: 4213,
    description: "Charming hinterland village with rural properties and mountain appeal. Tree coverage and natural debris accumulation require regular professional maintenance.",
    landmarks: ["Mudgeeraba Creek", "Rainforest", "Mountain Homes"],
    propertyMix: "Mudgeeraba is a semi-rural township — older main-street shops along Railway Street, 1980s family homes on larger blocks, and acreage properties on the western hinterland fringe.",
    environmentalNote: "Mudgeeraba sits close enough to the hinterland canopy that most properties have visible roof moss within two years, and leaf-heavy gutters are the single most common service request.",
    localHook: "We regularly service the old village along Railway Street plus the acreage blocks running up toward Springbrook Road and the Old Coach Road area.",
    nearbySuburbs: ["Currumbin Valley", "Bonogin", "Reedy Creek"]
  },
  {
    name: "Varsity Lakes",
    slug: "varsity-lakes",
    region: "central",
    postcode: 4227,
    description: "Rapidly growing suburb near Robina with modern houses and active lifestyle. Expanding urban environment with regular maintenance needs for growing families.",
    landmarks: ["Varsity Lakes", "Shopping Centre", "Schools"],
    propertyMix: "Varsity Lakes is a mid-2000s master-planned suburb — townhouse villages, lakeside apartment blocks, commercial precincts along Varsity Parade, and Bond University campus buildings.",
    environmentalNote: "Still, humid air pockets form around the central lake most mornings, driving black-spot mould on south-facing render and a distinctive algal bloom on lakefront pontoons and pool fencing.",
    localHook: "We handle the Varsity Parade commercial strip, the Bond University-adjacent apartment blocks, and the lake-frontage townhouses along Lake Orr Drive.",
    nearbySuburbs: ["Robina", "Reedy Creek", "Ashmore"]
  },
  {
    name: "Reedy Creek",
    slug: "reedy-creek",
    region: "central",
    postcode: 4227,
    description: "Master-planned community with modern amenities and parks. Planned development areas require regular professional cleaning for maintained appearance.",
    landmarks: ["Reedy Creek", "Parks and Reserves", "Community Centre"],
    propertyMix: "Reedy Creek is a hillside residential suburb — 1990s–2010s architect-designed family homes on sloped blocks, some acreage pockets toward the M1 boundary, and townhouse enclaves near the shops.",
    environmentalNote: "Hillside two-storey homes here catch both morning ocean breeze salt and afternoon westerly dust — producing a layered residue that requires a pre-rinse before pole-and-brush cleaning.",
    localHook: "We work a lot of Reedy Creek's sloped blocks where three-storey glass frontages on the downhill side need pole or rope-access work.",
    nearbySuburbs: ["Varsity Lakes", "Mudgeeraba", "Bonogin"]
  },
  {
    name: "Bonogin",
    slug: "bonogin",
    region: "hinterland",
    postcode: 4213,
    description: "Rural hinterland locality with farms and country properties. Significant tree coverage and agricultural dust require regular professional cleaning services.",
    landmarks: ["Tallebudgera National Park", "Agricultural Land", "Rainforest"],
    propertyMix: "Bonogin is full acreage hinterland — timber Queenslanders, architect-designed pole homes, hobby farms, and a scattering of modern rebuilds along Bonogin Road and Hardys Road.",
    environmentalNote: "Heavy eucalypt canopy means annual roof-moss loading on southern slopes, ongoing leaf-litter gutters, and significant spider and wasp accumulation on window frames — all compounded by very low wash-down frequency on most acreage.",
    localHook: "Our Bonogin jobs typically combine a full-house softwash, gutter clean, and window work in a single visit to amortise the drive in.",
    nearbySuburbs: ["Mudgeeraba", "Tallebudgera Valley", "Reedy Creek"]
  },
  {
    name: "Merrimac",
    slug: "merrimac",
    region: "central",
    postcode: 4226,
    description: "Suburban family neighbourhood near Robina with shops and facilities. Standard suburban properties with regular exposure to dust and weather.",
    landmarks: ["Shopping Centre", "Schools", "Parks"],
    propertyMix: "Merrimac is family-suburbia across the Nerang River — 1980s–1990s brick homes, newer townhouse clusters near the M1, and the Merrimac State School and commercial strip on Boowaggan Road.",
    environmentalNote: "Merrimac sits at a low point between ridges that traps morning fog and afternoon humidity — the result is persistent black-spot mould on south-facing render across older homes.",
    localHook: "We clean a steady stream of the original Merrimac street grid plus the commercial glazing along Boowaggan Road near Merrimac Shopping Centre.",
    nearbySuburbs: ["Robina", "Carrara", "Ashmore"]
  },
  {
    name: "Carrara",
    slug: "carrara",
    region: "central",
    postcode: 4226,
    description: "Established suburb between Robina and Southport. Mature properties with trees and gardens require regular professional cleaning and maintenance.",
    landmarks: ["Carrara Shopping Centre", "Parks", "Residential Areas"],
    propertyMix: "Carrara spans equestrian acreage (horse country along Nerang–Broadbeach Road), golf-estate homes around the Nerang River, and the Metricon Stadium precinct on the southern edge.",
    environmentalNote: "Carrara's horse-country acreage generates airborne hay and paddock dust that settles on windows and solar arrays, while the golf-estate homes face the standard golf-corridor bore-water spotting issue.",
    localHook: "We service both the Stadium-adjacent commercial glazing and the equestrian acreage along Beattie Road and the Emerald Lakes loop.",
    nearbySuburbs: ["Merrimac", "Robina", "Nerang"]
  },
  {
    name: "Nerang",
    slug: "nerang",
    region: "hinterland",
    postcode: 4211,
    description: "Thriving hinterland town with river views and mixed properties. Natural surroundings with river influence require regular professional cleaning services.",
    landmarks: ["Nerang River", "Town Centre", "National Park Access"],
    propertyMix: "Nerang is one of the oldest Gold Coast township suburbs — heritage main-street shopfronts on Price Street, 1960s–1970s lowset homes, plus hinterland acreage on the western side.",
    environmentalNote: "The mix of older housing stock and hinterland proximity means nearly every Nerang roof needs periodic moss and lichen treatment, and gutters clog with gum leaves year-round.",
    localHook: "We regularly work the heritage Price Street shopfronts and the older residential grid around Nerang High and Nerang Station.",
    nearbySuburbs: ["Carrara", "Merrimac", "Mudgeeraba"]
  },
  {
    name: "Highland Park",
    slug: "highland-park",
    region: "central",
    postcode: 4211,
    description: "Elevated suburb with views over Gold Coast. Higher altitude position exposed to more weather elements requiring professional maintenance.",
    landmarks: ["Highland Views", "Nerang River", "Parks"],
    propertyMix: "Highland Park is a hillside residential suburb overlooking Nerang — 1990s brick-veneer family homes on sloped lots, with a higher density of split-level and two-storey designs than flat central suburbs.",
    environmentalNote: "Ridge-line homes are hit by afternoon westerlies carrying hinterland dust, and the steep driveways and multi-level facades mean DIY cleaning is unusually impractical.",
    localHook: "Our Highland Park work is heavily two-storey and split-level — extension-pole and soft-wash are the core methods here.",
    nearbySuburbs: ["Nerang", "Gilston", "Worongary"]
  },
  {
    name: "Gilston",
    slug: "gilston",
    region: "hinterland",
    postcode: 4211,
    description: "Rural property area with acreage homes and natural surroundings. Tree coverage and natural debris require regular professional cleaning attention.",
    landmarks: ["Rural Properties", "National Park", "Scenic Views"],
    propertyMix: "Gilston is rural-hinterland country — acreage blocks, timber country homes, hobby farms, and a scattering of modern architect rebuilds along Worongary Road and Gilston Road.",
    environmentalNote: "Heavy canopy, creek humidity, and rural paddock dust combine to load roofs with lichen and fill gutters with leaf matter faster than coastal Gold Coast suburbs.",
    localHook: "Our crews know the Gilston and Worongary Road properties well — the acreage driveways and long pole-home roof spans are standard fare here.",
    nearbySuburbs: ["Highland Park", "Worongary", "Mudgeeraba"]
  },
  {
    name: "Worongary",
    slug: "worongary",
    region: "hinterland",
    postcode: 4212,
    description: "Upmarket hinterland retreat with luxury acreage properties. Premium homes in natural surroundings require professional cleaning for maintenance.",
    landmarks: ["Scenic Properties", "Rainforest", "Mountain Views"],
    propertyMix: "Worongary is semi-rural and transitional — a mix of small-acreage lifestyle blocks, older rural homesteads, and a growing cluster of newer family-home estates near the shopping village.",
    environmentalNote: "The valley floor here catches overnight mist that leaves a mineral film on east-facing windows and roof sheets — most homes benefit from an annual soft-wash reset.",
    localHook: "We clean a regular flow of both the acreage homes off Mudgeeraba Creek Road and the estate homes closer to Worongary Shopping Village.",
    nearbySuburbs: ["Gilston", "Advancetown", "Mudgeeraba"]
  },
  {
    name: "Advancetown",
    slug: "advancetown",
    region: "hinterland",
    postcode: 4211,
    description: "Small hinterland community with rural character and natural beauty. Limited development with focus on preserving natural environment.",
    landmarks: ["Natural Bushland", "Rural Properties", "Scenic Drives"],
    propertyMix: "Advancetown is deep-hinterland dam-and-acreage country around the Hinze Dam catchment — timber country homes, architect pole-houses, and rural lifestyle blocks.",
    environmentalNote: "Dam-side humidity, heavy canopy, and low housing density mean most homes go years between cleans and carry accumulated moss, lichen, and leaf loading that requires multi-stage softwash.",
    localHook: "Our Advancetown jobs almost always involve pole-home glass at height, full-house softwash, and a gutter clean in one visit to justify the distance.",
    nearbySuburbs: ["Worongary", "Mudgeeraba", "Bonogin"]
  },
  {
    name: "Ashmore",
    slug: "ashmore",
    region: "central",
    postcode: 4214,
    description: "Family-friendly inland suburb with schools and shopping. Well-established neighbourhood requiring regular professional window and house cleaning.",
    landmarks: ["Shopping Centre", "Schools", "Sports Facilities"],
    propertyMix: "Ashmore is one of the older central-suburb grids — 1970s–1980s brick-and-tile family homes, some lowset fibro originals, a light-industrial estate near Nerang Street, and Ashmore Plaza shopping precinct.",
    environmentalNote: "Ashmore's older brick-and-tile housing stock has accumulated decades of roof lichen, and many homes still run steel-framed original windows whose timber reveals need careful water-fed pole pressure settings.",
    localHook: "We clean a lot of Ashmore's original brick-and-tile homes along Nerang–Southport Road and around the Ashmore Plaza residential streets.",
    nearbySuburbs: ["Varsity Lakes", "Merrimac", "Benowa"]
  },
  {
    name: "Benowa",
    slug: "benowa",
    region: "central_coast",
    postcode: 4217,
    description: "Diverse suburb near Southport and beaches with mixed development. Good location with urban dust and salt air exposure requiring maintenance.",
    landmarks: ["Broadwater", "Shopping Areas", "Residential"],
    propertyMix: "Benowa spans golf-estate luxury on Benowa Waters, the Pindara medical precinct, and family suburbia through the central streets — a broader property mix than most Gold Coast suburbs.",
    environmentalNote: "The Pindara precinct's HVAC and sterile-air exhausts deposit a fine greasy residue on surrounding commercial glass, and the golf-course bore-water spotting issue extends into Benowa Waters.",
    localHook: "We handle a steady flow of Pindara-adjacent commercial glass plus the canal and golf-frontage homes around the Benowa Gardens loop.",
    nearbySuburbs: ["Ashmore", "Bundall", "Southport"]
  },
  {
    name: "Bundall",
    slug: "bundall",
    region: "central",
    postcode: 4217,
    description: "Established suburb adjacent to major business areas and shopping. Central location with regular urban pollution and dust exposure.",
    landmarks: ["Shopping Centre", "Business District", "Broadwater Access"],
    propertyMix: "Bundall is a mixed-use precinct — corporate offices along Bundall Road, council chambers, the Gold Coast Turf Club, and residential pockets on canal blocks between Ashmore Road and the Nerang River.",
    environmentalNote: "Commercial glazing along Bundall Road catches truck exhaust and road-spray grime that needs surfactant cleaning — a monthly cycle is typical for the office strip.",
    localHook: "Our Bundall commercial crew services multiple office blocks along Bundall Road and the Ashmore Road boundary — mostly ground-floor and first-storey traverse work.",
    nearbySuburbs: ["Benowa", "Robina", "Southport"]
  },
  {
    name: "Chevron Island",
    slug: "chevron-island",
    region: "central_coast",
    postcode: 4217,
    description: "Exclusive island suburb in the Broadwater with luxury waterfront properties. Premium properties require frequent professional cleaning services.",
    landmarks: ["Broadwater", "Exclusive Residences", "Water Views"],
    propertyMix: "Chevron Island is a compact residential island in the Nerang River — a tight mix of mid-century original homes, 2000s townhouses, and new riverfront apartment blocks along Stanhill Drive.",
    environmentalNote: "The river surrounding the island concentrates humid still air — south-facing walls and roofs carry persistent black-spot mould year-round, regardless of sun exposure.",
    localHook: "Our Chevron work is almost all riverfront glass and pontoon softwash, with a growing number of café shopfronts along Thomas Drive.",
    nearbySuburbs: ["Isle of Capri", "Southport", "Main Beach"]
  },
  {
    name: "Isle of Capri",
    slug: "isle-of-capri",
    region: "central_coast",
    postcode: 4217,
    description: "Premium waterfront suburb with Mediterranean-style properties. Luxury homes with water exposure require professional cleaning expertise.",
    landmarks: ["Broadwater", "Luxury Properties", "Canals"],
    propertyMix: "Isle of Capri is a premium canal enclave off the Nerang River — large 1990s–2010s homes on waterfront blocks, some early-2020s ultra-contemporary rebuilds, and a small village shopping strip.",
    environmentalNote: "Capri's waterfront blocks sit where Nerang River salt meets Surfers high-rise shadow, producing both salt-mist spotting and shaded-wall mould in the same property.",
    localHook: "We routinely service the River Links cluster and the Capri Village shopping strip, plus multi-level waterfront glass along Reef Island and Capri Reach.",
    nearbySuburbs: ["Chevron Island", "Southport", "Benowa"]
  },
  {
    name: "Clear Island Waters",
    slug: "clear-island-waters",
    region: "central_coast",
    postcode: 4217,
    description: "Exclusive island community with canal estates and luxury waterfront living. Premium waterfront properties require frequent maintenance.",
    landmarks: ["Broadwater", "Canals", "Exclusive Homes"],
    propertyMix: "Clear Island Waters is golf-course-and-canal living — large family homes on big blocks, Palm Meadows golf frontages, and gated estates with central lakes.",
    environmentalNote: "Reticulated bore water used for irrigation across the golf corridor leaves visible mineral calcium spotting on ground-floor windows within a fortnight of every sprinkler cycle.",
    localHook: "We specifically use a mineral-neutralising rinse for homes bordering the Palm Meadows fairways — standard water-fed pole alone leaves hard-water rings.",
    nearbySuburbs: ["Isle of Capri", "Biggera Waters", "Southport"]
  },
  {
    name: "Southport",
    slug: "southport",
    region: "central_coast",
    postcode: 4215,
    description: "Major business and entertainment hub on the Broadwater. High-rise living and commercial properties require frequent professional cleaning.",
    landmarks: ["Broadwater", "Business District", "Entertainment Venues"],
    propertyMix: "Southport is the Gold Coast's CBD — commercial towers around the Chinatown precinct, the Australia Fair strip, a growing hospital precinct, and a dense mix of apartment blocks along the Broadwater.",
    environmentalNote: "Broadwater salt combined with heavy traffic exhaust along Nerang Street leaves a stubborn greasy film on ground-level and first-storey commercial glazing.",
    localHook: "Much of our Southport work is commercial — Chinatown and Ferry Road shopfronts, plus the apartment blocks along Marine Parade facing the Broadwater.",
    nearbySuburbs: ["Surfers Paradise", "Benowa", "Labrador"]
  },
  {
    name: "Labrador",
    slug: "labrador",
    region: "central_coast",
    postcode: 4215,
    description: "Established suburb near Broadwater with mixed residential and commercial properties. Waterfront location with salt air exposure.",
    landmarks: ["Broadwater", "Parks", "Residential Areas"],
    propertyMix: "Labrador is mostly mid-density residential along the Broadwater — 1960s blonde-brick apartments, newer units along Marine Parade, and classic beach cottages through the back streets.",
    environmentalNote: "Broadwater tidal mist settles on ground-level windows overnight, so morning cleans here almost always involve dissolving dried tidal salt before the actual wash.",
    localHook: "We regularly service the Broadwater-facing apartment blocks along Marine Parade and the commercial strip near Grice Avenue.",
    nearbySuburbs: ["Southport", "Main Beach", "Biggera Waters"]
  },
  {
    name: "Biggera Waters",
    slug: "biggera-waters",
    region: "central_coast",
    postcode: 4216,
    description: "Waterfront suburb with canal estates and moderate waterside living. Water proximity creates cleaning maintenance needs requiring professional services.",
    landmarks: ["Broadwater", "Canals", "Parks"],
    propertyMix: "Biggera Waters is a Broadwater-side suburb of canal homes, boating estates around Harbour Town, and retirement-lifestyle developments with pools and marina access.",
    environmentalNote: "Harbour-area diesel particulate combined with brackish canal humidity creates a distinctive tar-like spotting on ground-floor glass and outdoor glass pool fencing.",
    localHook: "Our Biggera Waters work spans the Harbour Town boundary commercial strip, the Runaway Bay marine precinct, and the canal blocks between Hollywell and Paradise Point.",
    nearbySuburbs: ["Clear Island Waters", "Labrador", "Runaway Bay"]
  },
  {
    name: "Runaway Bay",
    slug: "runaway-bay",
    region: "central_coast",
    postcode: 4216,
    description: "Family-oriented waterfront suburb with boat access and peaceful surroundings. Water exposure and maritime environment require regular cleaning.",
    landmarks: ["Broadwater", "Marina", "Parks"],
    propertyMix: "Runaway Bay is boating-lifestyle territory — waterfront canal homes, a cluster of townhouses around the Runaway Bay Shopping Village, and Broadwater-facing apartment blocks.",
    environmentalNote: "Canal-side homes here face persistent black-spot mould on rendered south walls and algae bloom on pontoon boards — both accelerated by the humid calm pockets off the Broadwater.",
    localHook: "We handle a steady volume of pontoon softwash and waterfront glass on the Bayview Street / Oyster Cove side of the suburb.",
    nearbySuburbs: ["Biggera Waters", "Coombabah", "Paradise Point"]
  },
  {
    name: "Coombabah",
    slug: "coombabah",
    region: "northern",
    postcode: 4216,
    description: "Rapidly growing northern suburb with waterfront and hinterland properties. Expanding area with diverse properties requiring varied cleaning services.",
    landmarks: ["Broadwater", "National Park", "Waterways"],
    propertyMix: "Coombabah is family-suburbia north of the Broadwater — 1990s brick homes, newer lakeside townhouse estates around Coombabah Lake, and the conservation-wetlands buffer.",
    environmentalNote: "The Coombabah wetlands bring significant insect and bird activity — windows accumulate insect residue and bird droppings faster than inland suburbs, and roof solar panels need tighter cleaning intervals.",
    localHook: "We work a consistent stream of the Coombabah Village estates and the lakeside townhouse clusters near the wetland boundary.",
    nearbySuburbs: ["Runaway Bay", "Paradise Point", "Hollywell"]
  },
  {
    name: "Paradise Point",
    slug: "paradise-point",
    region: "northern",
    postcode: 4216,
    description: "Exclusive waterfront community with stunning Broadwater views. Premium waterfront and hilltop properties require professional maintenance.",
    landmarks: ["Broadwater", "Lookout Point", "Luxury Homes"],
    propertyMix: "Paradise Point is waterfront-lifestyle real estate — luxury canal homes around the Sovereign Island causeway, waterfront apartment blocks along The Esplanade, and a café strip on Grice Avenue.",
    environmentalNote: "Broadwater salt combined with constant watercraft traffic off the Sovereign Island bridge deposits a film of outboard-fuel residue on north-facing waterfront glass.",
    localHook: "Much of our Paradise Point work is the Sovereign Island causeway homes and the cafés along The Esplanade — both need tight cleaning cycles to stay presentation-ready.",
    nearbySuburbs: ["Coombabah", "Hollywell", "Hope Island"]
  },
  {
    name: "Hollywell",
    slug: "hollywell",
    region: "northern",
    postcode: 4216,
    description: "Peaceful residential suburb with mixed properties. Good location between beaches and hinterland requiring regular professional cleaning.",
    landmarks: ["Broadwater Access", "Parks", "Residential"],
    propertyMix: "Hollywell is Broadwater-facing suburbia — a mix of original 1970s holiday shacks, updated canal homes, and some high-end rebuilds with boatsheds on the water.",
    environmentalNote: "Hollywell's ground-floor glass on Broadwater-facing homes collects tidal mist residue overnight — pre-dawn cleans are a practical waste here because the salt redeposits by mid-morning.",
    localHook: "Our Hollywell work is mostly canal-side glass and pontoon soft-wash — Waterways Drive and the Broadwater Esplanade account for the majority.",
    nearbySuburbs: ["Paradise Point", "Coombabah", "Hope Island"]
  },
  {
    name: "Hope Island",
    slug: "hope-island",
    region: "northern",
    postcode: 4212,
    description: "Upmarket island resort community with resort facilities and luxury homes. Premium properties and resort living require professional cleaning services.",
    landmarks: ["Resort Facilities", "Broadwater", "Golf Course"],
    propertyMix: "Hope Island is a master-planned golf-and-canal resort suburb — gated estates, marina-side townhouses, the Hope Island Resort golf club, and large family homes on canal blocks.",
    environmentalNote: "Hope Island's bore-water irrigation across the golf estates leaves hard-water mineral deposits on all windows within sprinkler reach, and the canal salt mist issue is present on top of that.",
    localHook: "Our Hope Island crew uses a specific mineral-neutralising pre-rinse on golf-frontage homes — it's the only reliable way to avoid calcium rings after cleaning.",
    nearbySuburbs: ["Hollywell", "Paradise Point", "Helensvale"]
  },

  // GOLD COAST NORTHERN
  {
    name: "Helensvale",
    slug: "helensvale",
    region: "northern",
    postcode: 4212,
    description: "Major growth hub with modern residential and commercial development. Rapid expansion creates demand for professional cleaning services across properties.",
    landmarks: ["Town Centre", "Shopping Mall", "Schools"],
    propertyMix: "Helensvale has grown around the Westfield, Movie World, and Wet'n'Wild corridor — a mix of 1990s–2000s brick family homes, newer townhouse estates, and a growing apartment cluster near the station.",
    environmentalNote: "Theme-park-corridor particulate (fine dust off the asphalt car parks) settles on surrounding homes and drives more frequent window cleaning than suburbs further inland.",
    localHook: "We work the Discovery Drive / Siganto Drive estate cluster plus the commercial glazing along Town Centre Drive near Westfield Helensvale.",
    nearbySuburbs: ["Pacific Pines", "Upper Coomera", "Hope Island"]
  },
  {
    name: "Pacific Pines",
    slug: "pacific-pines",
    region: "northern",
    postcode: 4211,
    description: "Family-oriented suburb with modern homes and community facilities. Well-planned suburb with regular window cleaning and property maintenance needs.",
    landmarks: ["Shopping Centre", "Sports Complex", "Parks"],
    propertyMix: "Pacific Pines is a master-planned late-1990s / early-2000s estate suburb — uniform brick-veneer family homes, a central village shopping centre, and extensive council greenbelts.",
    environmentalNote: "The young-suburb tree canopy means less moss loading than older suburbs, but heavy subdivision street-tree pollen blankets windows and solar panels during spring.",
    localHook: "We clean a steady flow of the original Pacific Pines estate grid off The Avenue and the newer pockets toward the Gaven boundary.",
    nearbySuburbs: ["Helensvale", "Gaven", "Upper Coomera"]
  },
  {
    name: "Gaven",
    slug: "gaven",
    region: "northern",
    postcode: 4211,
    description: "Growing suburb with varied residential and commercial properties. Urban expansion creating steady demand for professional cleaning services.",
    landmarks: ["Shopping Areas", "Business District", "Schools"],
    propertyMix: "Gaven is a mixed-density suburb along the Coomera River corridor — newer family estates, some acreage along the western river frontage, and the Gaven Station precinct.",
    environmentalNote: "River-side homes catch morning mist off the Coomera River, while the estate homes face the standard new-build issue of construction-dust carryover on first-year cleans.",
    localHook: "We handle a mix of Gaven station-precinct apartments and the river-frontage family homes off Maudsland Road.",
    nearbySuburbs: ["Pacific Pines", "Helensvale", "Oxenford"]
  },
  {
    name: "Oxenford",
    slug: "oxenford",
    region: "northern",
    postcode: 4210,
    description: "Modern suburb between Helensvale and the highway. Strategic location with diverse properties requiring regular professional maintenance.",
    landmarks: ["Highway Corridor", "Business Parks", "Residential"],
    propertyMix: "Oxenford straddles the M1 — mixed-use retail on the highway side, original 1980s–1990s housing through the core, and Warner Bros. studios / Movie World on the commercial west.",
    environmentalNote: "Highway proximity means fine diesel particulate on windows and solar panels; it's the same particulate we see along Helensvale's theme-park corridor, but in a denser strip along Old Pacific Highway.",
    localHook: "Much of our Oxenford work is the Old Pacific Highway commercial strip and the Tamborine Oxenford Road residential grid behind it.",
    nearbySuburbs: ["Gaven", "Coomera", "Pimpama"]
  },
  {
    name: "Coomera",
    slug: "coomera",
    region: "northern",
    postcode: 4209,
    description: "Expanding northern suburb with residential and commercial growth. River location and growing residential areas require regular cleaning services.",
    landmarks: ["Coomera River", "Shopping Centre", "Schools"],
    propertyMix: "Coomera is the Gold Coast's fastest-growing construction zone — Coomera Town Centre retail, the Westfield, dozens of new estates, and the Coomera Marine Precinct on the river.",
    environmentalNote: "Active construction sites across the suburb mean near-constant airborne dust; new homes here typically need a full exterior wash within 6 months of handover.",
    localHook: "Our Coomera work is heavy on new-build first-cleans — construction-dust removal on render, roofs, and windows is the core service request.",
    nearbySuburbs: ["Upper Coomera", "Oxenford", "Pimpama"]
  },
  {
    name: "Upper Coomera",
    slug: "upper-coomera",
    region: "northern",
    postcode: 4209,
    description: "Rural-residential suburb with acreage properties and natural surroundings. Tree coverage and larger properties require comprehensive cleaning services.",
    landmarks: ["Rural Properties", "Coomera River", "Natural Bushland"],
    propertyMix: "Upper Coomera is early-2000s master-planned suburbia — uniform brick family homes, pocket parks, and a scattering of newer estate extensions on the western M1 side.",
    environmentalNote: "Heavy subdivision street-tree maturation now drops visible gum-leaf litter into gutters year-round — gutter cleaning is the single most requested service in the suburb.",
    localHook: "We service a consistent flow of the Reserve Road and Days Road estate streets — combined gutter-clean-plus-window-clean visits are the usual format.",
    nearbySuburbs: ["Coomera", "Helensvale", "Ormeau"]
  },
  {
    name: "Pimpama",
    slug: "pimpama",
    region: "northern",
    postcode: 4209,
    description: "Rapidly developing suburb with mixed residential and industrial areas. Urban expansion and diverse properties creating strong cleaning service demand.",
    landmarks: ["Industrial Area", "Residential Growth", "Highway Corridor"],
    propertyMix: "Pimpama is the northern Gold Coast's newest construction frontier — large estate subdivisions, schools being built in parallel with houses, and a growing retail strip along Pimpama-Jacobs Well Road.",
    environmentalNote: "Construction particulate dominates the cleaning conversation here — first-year homes need exterior wash-downs just to clear render of construction film before owners even move furniture in.",
    localHook: "Most of our Pimpama work is brand-new-build first-cleans across the big estate clusters north of the M1 exit.",
    nearbySuburbs: ["Oxenford", "Coomera", "Ormeau"]
  },
  {
    name: "Ormeau",
    slug: "ormeau",
    region: "northern",
    postcode: 4208,
    description: "Growing northern suburb with family homes and rural properties mixed. Diverse properties with tree coverage require regular professional maintenance.",
    landmarks: ["Town Centre", "Parks", "Rural and Urban Mix"],
    propertyMix: "Ormeau is a transitional northern suburb — established 1980s–1990s family homes, a growing retail hub near the M1, and some acreage blocks on the western rural fringe.",
    environmentalNote: "The M1-adjacent part of the suburb catches heavy highway particulate, while the acreage western side faces standard rural-hinterland leaf and moss loading.",
    localHook: "Our Ormeau work splits between the Kingsmore estate streets and the acreage blocks off Peachey Road.",
    nearbySuburbs: ["Pimpama", "Ormeau Hills", "Jacobs Well"]
  },
  {
    name: "Ormeau Hills",
    slug: "ormeau-hills",
    region: "northern",
    postcode: 4208,
    description: "Elevated suburb with views and modern home developments. Hill location exposure to weather elements requiring professional cleaning services.",
    landmarks: ["Elevated Views", "Modern Homes", "Parks"],
    propertyMix: "Ormeau Hills is elevated suburbia on the ridge above Ormeau — 2000s–2010s brick family homes, many two-storey, with valley views across to the coast.",
    environmentalNote: "Ridgeline westerlies carry fine hinterland dust that settles on the valley-facing glass of hillside homes — mid-morning cleans outlast afternoon cleans noticeably.",
    localHook: "We work a steady run of the Creek Ridge Road / Ransom Road estates — two-storey, valley-facing homes where extension-pole work is standard.",
    nearbySuburbs: ["Ormeau", "Jacobs Well", "Yatala"]
  },
  {
    name: "Jacobs Well",
    slug: "jacobs-well",
    region: "northern",
    postcode: 4208,
    description: "Semi-rural suburb with acreage properties and country homes. Natural surroundings and tree coverage requiring regular professional cleaning.",
    landmarks: ["Rural Properties", "Bushland", "Country Lifestyle"],
    propertyMix: "Jacobs Well is a quiet waterside village — fishing shacks, canal homes on the Logan River estuary, and a working marina precinct with boat sheds and jetties.",
    environmentalNote: "Estuarine salt, boat-motor residue, and marsh-humidity combine to accelerate mould growth on rendered homes — most local houses need an annual softwash reset just to stay presentable.",
    localHook: "Our Jacobs Well work is mostly waterfront glass, pontoon softwash, and boat-shed render cleaning along Marine Parade and Jacobs Well Road.",
    nearbySuburbs: ["Ormeau", "Steiglitz", "Norwell"]
  },
  {
    name: "Steiglitz",
    slug: "steiglitz",
    region: "northern",
    postcode: 4207,
    description: "Rural locality with farmland and country properties. Agricultural environment with natural dust and debris requiring professional cleaning services.",
    landmarks: ["Farmland", "Rural Properties", "Natural Areas"],
    propertyMix: "Steiglitz is a rural-edge boating suburb — acreage blocks, some riverside homes along the Pimpama River, and a mix of older farmhouses and newer rural-residential builds.",
    environmentalNote: "The combination of marsh-river humidity and low housing density means moss and lichen loading on roofs is significant — often requiring multi-pass softwash treatment.",
    localHook: "We run a small but steady flow of Steiglitz jobs — typically a combined roof softwash, gutter clean, and full-house wash to justify the drive.",
    nearbySuburbs: ["Jacobs Well", "Norwell", "Yatala"]
  },
  {
    name: "Norwell",
    slug: "norwell",
    region: "northern",
    postcode: 4208,
    description: "Semi-rural community with acreage properties and natural bushland. Tree-covered properties with significant cleaning maintenance requirements.",
    landmarks: ["Bushland", "Acreage Properties", "Nature Reserve"],
    propertyMix: "Norwell is deep rural-residential and market-garden country — acreage blocks, long-established farm properties, and some newer rural lifestyle rebuilds.",
    environmentalNote: "Paddock dust and agricultural spray drift settle on windows and solar arrays more than any other northern suburb — solar-panel cleaning delivers the most measurable productivity gain here.",
    localHook: "Our Norwell jobs are typically large acreage homes where solar panel and roof softwash is booked alongside the window clean.",
    nearbySuburbs: ["Steiglitz", "Jacobs Well", "Yatala"]
  },
  {
    name: "Yatala",
    slug: "yatala",
    region: "northern",
    postcode: 4207,
    description: "Growing suburban and industrial hub on the Gold Coast/Brisbane border. Diverse properties with regular dust exposure requiring maintenance.",
    landmarks: ["Industrial Area", "Business Parks", "Highway"],
    propertyMix: "Yatala is primarily industrial — the Yatala Enterprise Area distribution warehouses, light-manufacturing estates, plus a smaller residential and acreage pocket.",
    environmentalNote: "Industrial airborne residue (metal fabrication dust, forklift exhaust) dominates commercial glazing here — cleaning intervals for warehouse offices are typically monthly or fortnightly.",
    localHook: "Most of our Yatala work is commercial warehouse office glazing and factory shopfronts along the Stanmore Road / Beenleigh-Yatala Road estate.",
    nearbySuburbs: ["Ormeau Hills", "Stapylton", "Norwell"]
  },
  {
    name: "Stapylton",
    slug: "stapylton",
    region: "northern",
    postcode: 4207,
    description: "Semi-rural locality between Yatala and Brisbane. Mixed properties with agricultural and residential use requiring professional cleaning.",
    landmarks: ["Rural Areas", "Highway", "Business Parks"],
    propertyMix: "Stapylton is an industrial/rural mix — warehousing north of the Pacific Highway, light-manufacturing, and some acreage residential blocks.",
    environmentalNote: "Industrial particulate combined with proximity to the Motorsport Park brings distinctive rubber-dust and diesel particulate onto commercial glazing on race weekends.",
    localHook: "Our Stapylton work centres on the industrial estate commercial glazing and the Motorsport Park shoulder — both need short cleaning intervals.",
    nearbySuburbs: ["Yatala", "Norwell", "Queensland Border"]
  },

  // NORTHERN NSW - TWEED REGION
  {
    name: "Tweed Heads",
    slug: "tweed-heads",
    region: "nsw_tweed",
    postcode: 2485,
    description: "NSW coastal town just south of the Queensland border. Beach lifestyle with salt air exposure and regular holiday crowds requiring professional cleaning.",
    landmarks: ["Tweed Heads Beach", "Coolangatta Boardwalk", "Town Centre"],
    propertyMix: "Tweed Heads is the NSW border hub — riverside apartments along the Tweed River, the Tweed City retail precinct, and a mix of original beach cottages and modern apartments along Coolangatta Road.",
    environmentalNote: "The suburb catches both Tweed River estuary salt mist and direct Pacific salt spray — a dual exposure that puts beachfront glass here on a tighter cleaning cycle than even Coolangatta.",
    localHook: "We service the Tweed City commercial precinct glazing and the Tweed River waterfront apartments along Wharf Street and Florence Street.",
    nearbySuburbs: ["Tweed Heads South", "Banora Point", "Coolangatta"]
  },
  {
    name: "Tweed Heads South",
    slug: "tweed-heads-south",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Large residential NSW suburb just south of the QLD border with a mix of established homes and newer developments. Proximity to the coast means salt air and humidity still affect properties.",
    landmarks: ["Tweed City Shopping Centre", "Seagulls Club", "Boyd Street Parks"],
    propertyMix: "Tweed Heads South is residential and commercial mixed — older brick family homes, marina-side waterfront properties along the Tweed River, and retail strips along Minjungbal Drive.",
    environmentalNote: "River-estuary humidity drives strong black-spot mould on south-facing render, and the Minjungbal Drive commercial strip collects heavy road-grime from its role as the main border traffic artery.",
    localHook: "Our South Tweed work includes the Minjungbal Drive commercial strip and the marina-precinct waterfront homes.",
    nearbySuburbs: ["Tweed Heads", "Banora Point", "Terranora"]
  },
  {
    name: "Tweed Heads West",
    slug: "tweed-heads-west",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Inland NSW suburb with mixed residential and commercial development. Regular urban environment maintenance needs.",
    landmarks: ["Shopping Centre", "Schools", "Parks"],
    propertyMix: "Tweed Heads West is mostly residential — 1970s–1980s brick homes, a few canal blocks along the Terranora Inlet, and the Tweed West sporting fields precinct.",
    environmentalNote: "Terranora Inlet moisture creates persistent damp on south-facing walls, while the older housing stock means many roofs have accumulated decades of unchecked lichen growth.",
    localHook: "Most of our Tweed West work is the older brick-home grid and the canal-side properties along the Terranora Inlet.",
    nearbySuburbs: ["Tweed Heads South", "Banora Point", "Bilambil"]
  },
  {
    name: "Banora Point",
    slug: "banora-point",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Picturesque locality with riverside and lakeside properties. Water proximity and natural surroundings require professional maintenance.",
    landmarks: ["Lakes", "Riverside Property", "Parkland"],
    propertyMix: "Banora Point is a broad residential suburb — 1990s–2000s family homes on sloped blocks, golf-frontage properties at Banora Golf Club, and a significant retirement-village presence.",
    environmentalNote: "Sloped blocks mean lots of multi-storey glazing facing the Tweed River and the distant ocean — all of which catch morning salt mist off the estuary and need tight cleaning cycles.",
    localHook: "Our Banora Point work is heavy on two-storey river-facing glass and the large flat retirement-village window arrays.",
    nearbySuburbs: ["Tweed Heads West", "Terranora", "Bilambil"]
  },
  {
    name: "Terranora",
    slug: "terranora",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Peaceful residential community near border with mixed properties. Well-established neighbourhood requiring regular professional cleaning.",
    landmarks: ["Residential Areas", "Parks", "Community Centre"],
    propertyMix: "Terranora is an elevated suburb overlooking the Terranora Inlet — 1990s–2000s architect-designed homes on ridge-line blocks, plus some acreage on the western side.",
    environmentalNote: "Ridge-line position exposes these homes to both morning estuary mist and afternoon westerlies — a two-direction environmental load that shortens cleaning-interval effectiveness.",
    localHook: "Our Terranora work is dominated by the Fraser Drive ridge homes — two-storey, long glass frontages, and most need pole-access or rope-access.",
    nearbySuburbs: ["Banora Point", "Bilambil", "Cobaki"]
  },
  {
    name: "Bilambil",
    slug: "bilambil",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Semi-rural NSW community with acreage properties and natural surroundings. Tree coverage and rural environment creating cleaning needs.",
    landmarks: ["Acreage Properties", "Bushland", "Rural Setting"],
    propertyMix: "Bilambil is a small rural village in the Tweed hinterland — older timber Queenslanders, modern rural rebuilds, and acreage blocks along Bilambil Road and the creek corridor.",
    environmentalNote: "Dense canopy and creek-valley humidity create severe moss and lichen loading on roofs, and the low housing density means most homes need multi-stage softwash to reset.",
    localHook: "Our Bilambil jobs are typically whole-house events — roof soft-wash, gutter clean, and window work on a single visit.",
    nearbySuburbs: ["Terranora", "Bilambil Heights", "Cobaki"]
  },
  {
    name: "Bilambil Heights",
    slug: "bilambil-heights",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Elevated NSW locality with scenic views and newer properties. Hilltop exposure to weather elements requiring professional maintenance.",
    landmarks: ["Scenic Views", "Modern Homes", "Bushland"],
    propertyMix: "Bilambil Heights is elevated family suburbia above the valley — 1990s–2010s brick family homes on sloped blocks with valley-and-ocean views.",
    environmentalNote: "The elevated, exposed position means these homes catch both inland dust and ocean salt — and the two-storey glass frontages that take those views are also the hardest to clean DIY.",
    localHook: "Most of our Heights work is along Bilambil Heights Road — two-storey homes, extension-pole work on the valley-facing side.",
    nearbySuburbs: ["Bilambil", "Cobaki Lakes", "Terranora"]
  },
  {
    name: "Cobaki",
    slug: "cobaki",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Riverside NSW community with mixed waterfront and inland properties. Water environment and natural settings requiring regular cleaning.",
    landmarks: ["Cobaki Broadwater", "Riverside Properties", "Cobaki Lakes"],
    propertyMix: "Cobaki is rural-residential — scattered older farmhouses, some newer acreage builds, and the developing Cobaki Lakes master-planned estate on the eastern side.",
    environmentalNote: "Marsh-area humidity near the Cobaki Broadwater keeps roof lichen and render mould active year-round, and the new-estate homes face the standard new-build construction-film issue.",
    localHook: "We split our Cobaki work between the older acreage homes and the new-build first-cleans in the Cobaki Lakes estate.",
    nearbySuburbs: ["Bilambil", "Cobaki Lakes", "Chinderah"]
  },
  {
    name: "Cobaki Lakes",
    slug: "cobaki-lakes",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Modern waterfront community with lake views and mixed housing. Water reflection and humidity creating unique cleaning requirements.",
    landmarks: ["Lakes", "Waterfront Homes", "Community Facilities"],
    propertyMix: "Cobaki Lakes is a new master-planned estate — uniform contemporary family homes, central lake and parkland, and ongoing construction phases.",
    environmentalNote: "Construction across the estate keeps airborne dust levels high; almost every home we see in Cobaki Lakes is on a first-year first-clean or a recent-handover deep-clean.",
    localHook: "Our Cobaki Lakes work is almost entirely new-build construction-dust removal from render and windows — often booked before landscaping goes in.",
    nearbySuburbs: ["Cobaki", "Chinderah", "Kingscliff"]
  },
  {
    name: "Chinderah",
    slug: "chinderah",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Scenic NSW locality with natural surroundings and mixed properties. Hinterland characteristics with tree coverage requiring maintenance.",
    landmarks: ["Scenic Surroundings", "Bushland", "Rural Areas"],
    propertyMix: "Chinderah is a riverside village — fishing-industry heritage homes along the Tweed River, caravan-park accommodation, and some newer rebuilds on river-frontage blocks.",
    environmentalNote: "Tweed River estuary salt and a fishing-village marine-industrial air profile combine to accelerate metal oxidation on window frames and aluminium fittings.",
    localHook: "Our Chinderah work is focused on the river-frontage cottages along Chinderah Bay Drive and the Philp Parade strip.",
    nearbySuburbs: ["Cobaki Lakes", "Kingscliff", "Bilambil"]
  },
  {
    name: "Kingscliff",
    slug: "kingscliff",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Charming NSW beach town with strong community character. Coastal environment with salt air and beach proximity requiring professional cleaning.",
    landmarks: ["Kingscliff Beach", "Town Centre", "Headland"],
    propertyMix: "Kingscliff is a premium NSW beach town — beachfront apartments along Marine Parade, a popular café strip on Marine Parade and Pearl Street, and dense residential streets behind.",
    environmentalNote: "Kingscliff's beachfront glass faces direct easterly salt spray with zero dune buffer — the café-strip shopfronts need weekly cleaning to stay streak-free in summer.",
    localHook: "We regularly clean the Marine Parade café strip, the beachfront apartment blocks, and the residential streets behind Kingscliff Beach.",
    nearbySuburbs: ["Chinderah", "Casuarina", "Salt"]
  },
  {
    name: "Casuarina",
    slug: "casuarina",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Beachfront NSW suburb with stunning coastline views. Strong coastal exposure and beach lifestyle creating cleaning maintenance needs.",
    landmarks: ["Casuarina Beach", "Headland", "Lookout"],
    propertyMix: "Casuarina is a premium coastal estate just south of Kingscliff — architect-designed beachfront homes, resort-style villas around Salt Village, and native dune-buffer streetscapes.",
    environmentalNote: "Salt-spray exposure combined with native-plant pollen (casuarinas, banksias, pandanus) produces a gritty sap residue on windows that is unique to this stretch of coast.",
    localHook: "Our Casuarina work is high-end beachfront — architect homes along Casuarina Way and the Salt Village villas where premium finishes need correspondingly careful soft-wash methods.",
    nearbySuburbs: ["Kingscliff", "Salt", "Cudgen"]
  },
  {
    name: "Salt",
    slug: "salt",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Modern coastal resort community at Salt Village. Luxury beachfront properties requiring frequent professional maintenance and cleaning.",
    landmarks: ["Salt Village", "Beach Resort", "Premium Amenities"],
    propertyMix: "Salt is the Salt Village resort precinct — holiday villas, boutique apartments, a café-and-restaurant strip around the Salt Bar & Restaurant, and short-stay accommodation.",
    environmentalNote: "Holiday-traffic footfall and direct salt-spray exposure combine to keep shopfront glazing in need of weekly attention during peak season.",
    localHook: "Our Salt work is commercial-heavy — shopfronts, villa common areas, and holiday-villa turnover cleans.",
    nearbySuburbs: ["Casuarina", "Kingscliff", "Duranbah"]
  },
  {
    name: "Cudgen",
    slug: "cudgen",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Rural NSW locality with acreage properties and natural environment. Tree coverage and agricultural landscape requiring professional services.",
    landmarks: ["Rural Properties", "Bushland", "Natural Areas"],
    propertyMix: "Cudgen is a rural agricultural suburb — sugar-cane and banana farms, scattered farmhouses, and some newer rural-residential rebuilds.",
    environmentalNote: "Agricultural spray drift and cane-harvest dust are the dominant environmental factors — solar panels and roof sheets visibly accumulate agricultural residue within weeks.",
    localHook: "Our Cudgen work is typically a combined solar-panel clean plus roof and gutter visit for the farmhouse and rural-residential blocks.",
    nearbySuburbs: ["Casuarina", "Duranbah", "Fingal Head"]
  },
  {
    name: "Duranbah",
    slug: "duranbah",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Small coastal hamlet with pristine beaches and natural character. Quiet, secluded location with property maintenance requirements.",
    landmarks: ["Duranbah Beach", "Secluded Coves", "Nature Reserve"],
    propertyMix: "Duranbah is a small agricultural-and-coastal suburb — banana farms, scattered rural homes, and the famous Duranbah surf break on the northern coastline edge.",
    environmentalNote: "A unique dual profile: agricultural residue on the inland side, direct Pacific salt spray on the coastal side, and virtually no buffer between them.",
    localHook: "Our Duranbah work ranges from the rural farmhouses along Duranbah Road to the cliff-edge homes on the surf break.",
    nearbySuburbs: ["Salt", "Cudgen", "Fingal Head"]
  },
  {
    name: "Fingal Head",
    slug: "fingal-head",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Scenic headland locality with dramatic coastline and exclusive properties. Elevated coastal position with significant weather exposure.",
    landmarks: ["Fingal Head", "Lighthouse", "Scenic Walks"],
    propertyMix: "Fingal Head is a small coastal village — heritage fishing cottages, modern beach-house rebuilds, and the Fingal Head Lighthouse precinct as the suburb's visual anchor.",
    environmentalNote: "Headland exposure to both Pacific salt spray and Tweed River estuary mist produces some of the most aggressive glass-hazing rates on the Tweed coast.",
    localHook: "We work a small but loyal stream of Fingal Head coastal homes — soft-wash, glass, and deck clean often booked together seasonally.",
    nearbySuburbs: ["Duranbah", "Pottsville", "Kings Forest"]
  },
  {
    name: "Kings Forest",
    slug: "kings-forest",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Rural NSW community surrounded by bushland and natural forest. Natural environment with significant tree coverage and debris.",
    landmarks: ["Bushland", "Forest Areas", "Rural Properties"],
    propertyMix: "Kings Forest is a large master-planned estate in development — contemporary family homes, ongoing construction phases, and central parkland framing the Cudgen Creek corridor.",
    environmentalNote: "Active construction across the estate produces heavy airborne dust, and the creek corridor creates localised humid pockets that drive first-year mould on new-build render.",
    localHook: "Our Kings Forest work is overwhelmingly new-build first-cleans — construction-film removal from render, windows, and roof tiles.",
    nearbySuburbs: ["Fingal Head", "Pottsville", "Bogangar"]
  },
  {
    name: "Pottsville",
    slug: "pottsville",
    region: "nsw_tweed",
    postcode: 2489,
    description: "Peaceful NSW beach town with low-key coastal lifestyle. Beachfront properties with salt air exposure requiring regular professional cleaning.",
    landmarks: ["Pottsville Beach", "Town Centre", "Beach Access"],
    propertyMix: "Pottsville is a beach village in southern Tweed Shire — beachfront cottages, family-home streets behind the dunes, and a growing café strip on Coronation Avenue.",
    environmentalNote: "Direct Pacific exposure with a shallow dune buffer means beachfront glass here hazes quickly; the café strip shopfronts sit far enough back to stay on a standard monthly cycle.",
    localHook: "We regularly clean the Coronation Avenue café strip and the streets running back from Mooball Street to the beach.",
    nearbySuburbs: ["Fingal Head", "Cabarita Beach", "Kings Forest"]
  },
  {
    name: "Cabarita Beach",
    slug: "cabarita-beach",
    region: "nsw_tweed",
    postcode: 2488,
    description: "Beautiful NSW beach suburb with family-friendly atmosphere. Pristine beaches with coastal salt exposure and regular maintenance needs.",
    landmarks: ["Cabarita Beach", "Beach Promenade", "Rock Pools"],
    propertyMix: "Cabarita Beach (historically Bogangar/Cabarita) is a beach village with resort-style holiday homes, a growing apartment presence, and a popular café strip around Norries Headland.",
    environmentalNote: "Headland-adjacent homes face both salt spray and strong onshore winds — the winds drive fine beach sand into window tracks and across deck areas at a rate unusual for NSW coastal suburbs.",
    localHook: "Our Cabarita work spans the Norries Headland luxury homes, the café strip around Pandanus Parade, and the beachfront apartment blocks.",
    nearbySuburbs: ["Pottsville", "Bogangar", "Hastings Point"]
  },
  {
    name: "Bogangar",
    slug: "bogangar",
    region: "nsw_tweed",
    postcode: 2488,
    description: "Scenic NSW village between Cabarita and Hastings Point. Elevated coastal position with stunning views and property maintenance needs.",
    landmarks: ["Scenic Views", "Headland", "Coastal Properties"],
    propertyMix: "Bogangar is the broader residential area behind Cabarita Beach — beach cottages, post-war fibro, and a growing set of modern rebuilds on deep blocks.",
    environmentalNote: "Backing onto the Cudgera Creek wetland corridor, many Bogangar homes experience wetland-insect loading on windows and roof sheets — particularly after summer hatching events.",
    localHook: "Our Bogangar work focuses on the residential streets behind Cabarita — soft-wash on original fibro and render cleaning on the newer builds.",
    nearbySuburbs: ["Cabarita Beach", "Hastings Point", "Kings Forest"]
  },
  {
    name: "Hastings Point",
    slug: "hastings-point",
    region: "nsw_tweed",
    postcode: 2489,
    description: "Exclusive NSW headland community at the northern end of the Tweed. Premium coastal properties with significant salt air exposure.",
    landmarks: ["Hastings Point Headland", "Exclusive Homes", "Scenic Drives"],
    propertyMix: "Hastings Point is a small heritage-coastal village — original fishing cottages, some recent boutique rebuilds, and the Hastings Point headland and creek mouth as landscape anchors.",
    environmentalNote: "Headland salt spray combined with creek-mouth humidity accelerates aluminium oxidation on window frames — window-frame cleaning here is an ongoing preventative, not a cosmetic task.",
    localHook: "We run a modest but regular stream of Hastings Point village homes — combined window and softwash visits are the most common booking format.",
    nearbySuburbs: ["Bogangar", "Cabarita Beach", "Pottsville"]
  }
];

export const SERVICES = [
  {
    name: "Window Cleaning",
    slug: "window-cleaning",
    parentPage: "WindowCleaning",
    shortDesc: "Professional streak-free window cleaning for residential and commercial properties",
    benefits: [
      {
        title: "Streak-Free Professional Results",
        description: "Our specialised techniques and professional-grade equipment deliver crystal clear, streak-free windows that sparkle in the sunlight."
      },
      {
        title: "Interior & Exterior Service",
        description: "Complete window cleaning service covers both inside and outside surfaces for maximum clarity and brightness in your home or office."
      },
      {
        title: "Up to 4 Stories High",
        description: "Our professional equipment and safety training allow us to safely clean windows up to 4 stories high, reaching areas you can't."
      },
      {
        title: "Includes Tracks & Flyscreens",
        description: "Comprehensive service includes cleaning window tracks, frames, and flyscreens for complete window maintenance."
      },
      {
        title: "Improves Natural Light",
        description: "Clean windows allow maximum natural light into your space, reducing the need for artificial lighting and creating a brighter environment."
      },
      {
        title: "Professional Safety Standards",
        description: "We use proper safety equipment and techniques for high-access cleaning, eliminating risks associated with DIY window cleaning."
      }
    ],
    process: [
      {
        step: 1,
        title: "Exterior Cleaning",
        description: "Remove dirt, grime, and weather stains from outside window surfaces."
      },
      {
        step: 2,
        title: "Interior Cleaning",
        description: "Clean interior glass surfaces for maximum light transmission and clarity."
      },
      {
        step: 3,
        title: "Track Cleaning",
        description: "Clear window tracks of dirt, debris, and buildup for smooth operation."
      },
      {
        step: 4,
        title: "Flyscreen Care",
        description: "Clean and maintain flyscreens for improved airflow and appearance."
      }
    ],
    pricingGuide: "Window cleaning in [suburb] starts at $220–$440 for most apartments and small offices (inside and out). Single-storey homes are typically $385–$550, including deep track and screen cleaning. Double-storey homes are usually $500–$800. Large homes with lots of glass are $800+ and require a site visit. These are guide prices — every property is different, so contact us for a free quote.",
    faqs: [
      {
        question: "How often should windows be professionally cleaned?",
        answer: "Most residential properties benefit from window cleaning every 3-6 months, while commercial properties may need monthly or quarterly service depending on location and environmental factors. Coastal properties may need more frequent cleaning due to salt spray exposure."
      },
      {
        question: "Do you clean windows in all weather conditions?",
        answer: "We avoid cleaning in rain, high winds, or extreme weather for safety and quality reasons. We'll reschedule if conditions aren't suitable for optimal results. Gold Coast weather can be unpredictable, so we monitor conditions carefully."
      },
      {
        question: "Can you clean windows with security screens?",
        answer: "Yes, we can clean around most security screens and will remove and clean flyscreens where possible. We work with your existing security features safely and effectively."
      },
      {
        question: "What's included in your window cleaning service?",
        answer: "Our service includes interior and exterior window cleaning, frame cleaning, track cleaning, and flyscreen cleaning where accessible. We provide complete window maintenance for all window types."
      },
      {
        question: "Is window cleaning safe for tinted or treated windows?",
        answer: "Yes, our cleaning methods are safe for tinted windows, Low-E coatings, and most window treatments. We use appropriate techniques and solutions for different window types to prevent damage."
      },
      {
        question: "How long does a typical window cleaning service take?",
        answer: "For a standard residential property, window cleaning typically takes 1-2 hours depending on the number of windows, property size, and level of grime. We'll provide an estimate during the quote process."
      }
    ]
  },
  {
    name: "Roof Cleaning",
    slug: "roof-cleaning",
    parentPage: "RoofCleaning",
    shortDesc: "Professional roof cleaning to remove moss, algae, and debris",
    benefits: [
      {
        title: "Prevents Damage & Extends Life",
        description: "Regular cleaning removes destructive moss, algae, and lichen that trap moisture and cause tile cracking and rust in Gold Coast's humid subtropical climate."
      },
      {
        title: "Fights Coastal Salt Corrosion",
        description: "Salt aerosol from the Coral Sea degrades Colorbond, Zincalume, and terracotta roofing over time. Professional cleaning removes mineral deposits before permanent damage occurs."
      },
      {
        title: "Maintains Roof Health",
        description: "Professional cleaning maintains optimal roof conditions, prevents biological growth from taking hold in UV-cracked tiles, and helps identify potential issues early."
      },
      {
        title: "Increases Property Value",
        description: "A clean, well-maintained roof increases your property's market value and signals proper upkeep to potential buyers and building inspectors."
      },
      {
        title: "Safe High-Access Cleaning",
        description: "Our team uses professional safety equipment, harnesses, and techniques for secure roof cleaning, eliminating the dangerous risks of DIY ladder work."
      },
      {
        title: "Protects All Roof Types",
        description: "We safely clean concrete tile, terracotta tile, Colorbond, Zincalume, and flat membrane roofs using the appropriate soft-wash technique for each surface."
      }
    ],
    process: [
      {
        step: 1,
        title: "Safety Setup & Inspection",
        description: "Assess roof condition, identify cracked tiles, rusted flashings, and blocked valleys. Set up non-slip footwear, harness points, and safety equipment."
      },
      {
        step: 2,
        title: "Anti-Microbial Pre-Treatment",
        description: "Apply biodegradable treatment to kill moss, lichen, and algae at root level — dramatically slowing regrowth after cleaning."
      },
      {
        step: 3,
        title: "Soft-Brush Agitation",
        description: "Loosen embedded organic matter from tiles and metal surfaces without causing surface damage."
      },
      {
        step: 4,
        title: "Low-Pressure Rinse",
        description: "Controlled low-pressure wash removes all residue and contamination, restoring original roof colour."
      },
      {
        step: 5,
        title: "Gutter & Valley Flush",
        description: "Clear debris dislodged during cleaning from valleys, gutters, and downpipes to ensure free water flow."
      },
      {
        step: 6,
        title: "Final Inspection",
        description: "Complete inspection confirms roof is clean and damage-free. Optional post-treatment sealant available to slow future growth."
      }
    ],
    pricingGuide: "Roof cleaning in [suburb] starts at $700 for a flatter single-storey roof and is typically $900–$1,600 for a steeper or larger double-storey. How dirty the roof is also affects the final price. Large commercial roofs or 3+ storeys are priced on application. These are guide prices — every property is different, so contact us for a free quote.",
    faqs: [
      {
        question: "How often should roofs be professionally cleaned?",
        answer: "Most Gold Coast properties benefit from professional roof cleaning every 2-3 years. Coastal properties with heavy salt exposure may need annual cleaning due to accelerated algae and moss growth in humid salt air."
      },
      {
        question: "Is roof cleaning safe for my roof?",
        answer: "Yes, our professional techniques use low-pressure soft washing that's completely safe for all roof types. High-pressure cleaning can damage tiles and void roof warranties, which is why we use gentler methods."
      },
      {
        question: "What causes moss and algae growth on roofs?",
        answer: "Gold Coast's humid subtropical climate, combined with salt air and shade from trees, creates ideal conditions for moss, algae, and lichen growth. This is why coastal properties require more frequent cleaning."
      },
      {
        question: "Can you clean metal roofs safely?",
        answer: "Absolutely. We have specialist techniques for metal roofs including Colorbond and Zincalume that remove debris, rust stains, and discolouration without causing scratches or damage to the protective coating."
      },
      {
        question: "Do you offer gutter cleaning with roof cleaning?",
        answer: "Yes, we often recommend combining roof cleaning with gutter cleaning for comprehensive maintenance. This maximises water flow and prevents blockages from debris dislodged during the roof clean."
      },
      {
        question: "Is your cleaning solution environmentally safe?",
        answer: "Yes, we use biodegradable, eco-friendly cleaning solutions that are safe for your family, pets, and landscaping while effectively removing moss, algae, and stains."
      },
      {
        question: "What does roof cleaning cost on the Gold Coast?",
        answer: "Most residential roof cleans on the Gold Coast range from $350–$800 depending on roof size, pitch, access difficulty, and the level of moss or lichen buildup. We provide free on-site or photo quotes so you know the exact price before we start."
      },
      {
        question: "Is soft washing or pressure washing better for Gold Coast tile roofs?",
        answer: "Soft washing is the recommended method for tile and metal roofs on the Gold Coast. High-pressure cleaning can crack aged terracotta tiles, strip Colorbond coatings, and force water under roof underlays. Soft washing kills moss and algae at the root without surface damage."
      },
      {
        question: "How do I know if I have lichen vs moss on my roof?",
        answer: "Moss is green, soft, and spongy — it lifts off relatively easily. Lichen is the harder, flat, grey-green growth that bonds tightly to roof surfaces. Lichen requires professional anti-microbial pre-treatment to remove properly, and both are extremely common on Gold Coast roofs due to the humid subtropical climate."
      }
    ]
  },
  {
    name: "House Softwash",
    slug: "house-softwash",
    parentPage: "HouseSoftWash",
    shortDesc: "Gentle but effective soft washing for house exterior walls and surfaces",
    benefits: [
      {
        title: "Safe for All Surfaces",
        description: "Soft washing is safe for rendered, brick, weatherboard, and painted surfaces, unlike harsh pressure washing that can cause damage."
      },
      {
        title: "Removes Stubborn Stains",
        description: "Effectively removes mould, mildew, algae, and weathered stains while preserving the integrity of your home's exterior."
      },
      {
        title: "Kills Mould & Mildew at Source",
        description: "Our cleaning solutions eliminate mould, mildew, and algae spores, preventing rapid regrowth compared to pressure washing alone."
      },
      {
        title: "Improves Curb Appeal",
        description: "Brighten your home's exterior and increase its visual appeal, making it look fresh, clean, and well-maintained."
      },
      {
        title: "Prevents Costly Repairs",
        description: "Regular soft washing prevents damage from algae and mould that can eventually compromise your home's exterior structure."
      },
      {
        title: "Environmentally Friendly",
        description: "We use biodegradable cleaning solutions that are safe for plants, pets, and waterways while delivering excellent results."
      }
    ],
    process: [
      {
        step: 1,
        title: "Pre-Inspection",
        description: "Assess your home's exterior to identify stains, mould, and the best cleaning approach for different surfaces."
      },
      {
        step: 2,
        title: "Pre-Treatment Application",
        description: "Apply biodegradable solution to break down mould, mildew, and stains without harsh scrubbing."
      },
      {
        step: 3,
        title: "Gentle Cleaning",
        description: "Use low-pressure soft washing techniques to safely clean all exterior surfaces without damage."
      },
      {
        step: 4,
        title: "Final Rinse & Inspection",
        description: "Thorough rinsing ensures all cleaning solution is removed and your home looks pristine."
      }
    ],
    pricingGuide: "House softwash in [suburb] starts at $495 for a small single-storey home or office. Large single-storey or small double-storey homes are typically $770. XL single-storey or large double-storey properties are around $990, and XL double-storey and beyond is $1,200+. These are guide prices — every property is different, so contact us for a free quote.",
    faqs: [
      {
        question: "What's the difference between softwashing and pressure cleaning?",
        answer: "Softwashing uses low-pressure water combined with biodegradable cleaning solutions to safely clean without damage. Pressure cleaning uses high-pressure jets and can damage surfaces like rendered walls, paint, and weatherboard."
      },
      {
        question: "How often should houses be soft washed?",
        answer: "Most Gold Coast homes benefit from soft washing every 1-2 years. Coastal properties, shaded areas, and humid locations may need annual service due to faster mould and algae growth."
      },
      {
        question: "Will softwashing damage my paint or render?",
        answer: "No, softwashing is specifically designed to be safe for painted surfaces, render, and weatherboard. We use proven techniques that clean effectively without causing damage."
      },
      {
        question: "How long does soft washing take to show results?",
        answer: "Results are visible immediately after cleaning. The treatment solution continues to prevent mould and algae growth for several months after the service."
      },
      {
        question: "Is soft washing safe for plants and gardens?",
        answer: "Yes, we use biodegradable solutions and proper run-off management to protect your landscaping, plants, and gardens during soft washing."
      },
      {
        question: "Can you soft wash second-story walls and high areas?",
        answer: "Yes, we use professional equipment and safety measures to safely reach and clean second-story walls and high areas of your home exterior."
      }
    ]
  },
  {
    name: "Pressure Cleaning",
    slug: "pressure-cleaning",
    parentPage: "PressureCleaning",
    shortDesc: "High-pressure cleaning for driveways, patios, and hard surfaces",
    benefits: [
      {
        title: "Powerful Stain Removal",
        description: "High-pressure equipment removes oil, algae, dirt, and stubborn stains from concrete, pavers, and hard surfaces."
      },
      {
        title: "Improves Safety",
        description: "Clean driveways and paths eliminate slippery algae and mould that can cause dangerous falls and accidents."
      },
      {
        title: "Extends Surface Life",
        description: "Regular pressure cleaning removes damaging substances that degrade concrete and pavers, extending their lifespan."
      },
      {
        title: "Enhances Property Value",
        description: "Clean outdoor surfaces dramatically improve curb appeal and increase your property's market attractiveness."
      },
      {
        title: "Prevents Weed Growth",
        description: "Removes soil and debris from cracks, reducing weed germination and the need for ongoing weed management."
      },
      {
        title: "Professional Quality Results",
        description: "Our commercial-grade equipment delivers superior results impossible to achieve with rental equipment or DIY methods."
      }
    ],
    process: [
      {
        step: 1,
        title: "Area Preparation",
        description: "Prepare the area, protect plants, and ensure safety before beginning pressure cleaning operations."
      },
      {
        step: 2,
        title: "Initial Cleaning Pass",
        description: "Use appropriate pressure settings to remove loose debris, dirt, and surface stains."
      },
      {
        step: 3,
        title: "Detailed Scrubbing",
        description: "Target stubborn stains, oil spots, and built-up grime with focused high-pressure treatment."
      },
      {
        step: 4,
        title: "Final Rinse",
        description: "Complete rinse removes all debris and cleaning residue, leaving surfaces perfectly clean."
      }
    ],
    pricingGuide: "Pressure cleaning in [suburb] starts at $220 for an average driveway, $440 for a medium driveway, and $660+ for an XL driveway. A full home package covering driveway, pathways, patio, and pool area is around $660. These are guide prices — every property is different, so contact us for a free quote.",
    faqs: [
      {
        question: "How often should driveways and patios be pressure cleaned?",
        answer: "Most Gold Coast properties benefit from annual pressure cleaning. High-traffic areas, coastal properties, and shaded areas may need twice-yearly service due to faster algae and dirt accumulation."
      },
      {
        question: "Can pressure cleaning damage my concrete or pavers?",
        answer: "When done professionally with proper techniques and pressure settings, pressure cleaning is safe for concrete and pavers. Improper use can cause damage, which is why professional service is recommended."
      },
      {
        question: "What removes oil stains from driveways?",
        answer: "Our pressure cleaning service removes fresh oil stains effectively. Old, set stains may require pre-treatment with degreaser. We'll assess your stains and recommend the best approach."
      },
      {
        question: "Is pressure cleaning safe for plant beds and gardens?",
        answer: "We use careful water direction and protective measures to avoid damaging plants and landscaping during pressure cleaning of nearby areas."
      },
      {
        question: "Can you remove algae from roof surfaces with pressure cleaning?",
        answer: "We don't recommend pressure cleaning roofs due to damage risk. Instead, we offer specialist soft washing which safely removes algae without damaging roof materials."
      },
      {
        question: "How long does a typical driveway pressure cleaning take?",
        answer: "A standard residential driveway typically takes 1-2 hours depending on size, condition, and stain severity. We'll provide a time estimate during your quote."
      }
    ]
  },
  {
    name: "Gutter Cleaning",
    slug: "gutter-cleaning",
    parentPage: "GutterCleaning",
    shortDesc: "Professional gutter and downpipe cleaning to maintain proper water drainage",
    benefits: [
      {
        title: "Prevents Water Damage",
        description: "Clear gutters ensure proper water drainage, preventing overflow that can damage fascia, walls, and foundations."
      },
      {
        title: "Eliminates Pest Habitats",
        description: "Clogged gutters attract insects, rodents, and mosquitoes. Clean gutters remove these breeding grounds."
      },
      {
        title: "Extends Gutter Life",
        description: "Regular cleaning prevents rust, corrosion, and deterioration that leads to costly gutter replacement."
      },
      {
        title: "Improves Appearance",
        description: "Clean gutters enhance your home's appearance and show proper maintenance to potential buyers."
      },
      {
        title: "Safe Professional Service",
        description: "Our team uses proper safety equipment to access gutters safely, eliminating dangerous ladder work risks."
      },
      {
        title: "Includes Downpipes",
        description: "Complete service includes clearing downpipes and ensuring water flows properly away from your home."
      }
    ],
    process: [
      {
        step: 1,
        title: "Safety Setup",
        description: "Position ladders and safety equipment for secure access to all gutter sections."
      },
      {
        step: 2,
        title: "Debris Removal",
        description: "Remove leaves, dirt, and debris from gutters using professional tools and techniques."
      },
      {
        step: 3,
        title: "Downpipe Clearing",
        description: "Ensure downpipes are clear and water flows freely away from your home's foundation."
      },
      {
        step: 4,
        title: "Final Inspection",
        description: "Complete inspection confirms gutters are flowing correctly and ready for wet season weather."
      }
    ],
    pricingGuide: "Gutter cleaning in [suburb] costs $220–$550 for a single-storey home depending on size and how full the gutters are. Double-storey homes are typically $330–$770. XL commercial properties or large homes are $550+. Price includes downpipe checks. These are guide prices — every property is different, so contact us for a free quote.",
    faqs: [
      {
        question: "How often should gutters be cleaned?",
        answer: "Most Gold Coast properties should have gutters cleaned every 3-4 months due to leaf drop and tree debris. Coastal areas with high salt spray require more frequent cleaning."
      },
      {
        question: "What happens if gutters aren't cleaned?",
        answer: "Clogged gutters can cause water overflow, water damage to fascia and walls, foundation problems, and pest infestations. Regular cleaning prevents costly damage."
      },
      {
        question: "Do you clean gutters on all roof types?",
        answer: "Yes, we safely clean gutters on all roof types including tile, metal, colorbond, and flat roofs using appropriate access methods."
      },
      {
        question: "Is gutter cleaning necessary on new homes?",
        answer: "Yes, even new homes accumulate debris during construction and natural tree drop. Regular cleaning prevents problems before they start."
      },
      {
        question: "What causes gutters to overflow?",
        answer: "Leaves, dirt, tree debris, and natural buildup clog gutters. Gold Coast's tropical climate and surrounding trees mean regular cleaning is essential."
      },
      {
        question: "Can you install gutter guards?",
        answer: "While we specialise in professional gutter cleaning, we can recommend quality gutter guard systems that reduce debris and cleaning frequency."
      }
    ]
  },
  {
    name: "Solar Panel Cleaning",
    slug: "solar-panel-cleaning",
    parentPage: "SolarPanelCleaning",
    shortDesc: "Professional solar panel cleaning to maintain maximum energy efficiency",
    benefits: [
      {
        title: "Restores Up to 30% Lost Output",
        description: "Dirty Gold Coast solar panels lose up to 30% efficiency due to salt spray, bird droppings, and subtropical humidity. Professional cleaning restores your full rated generation."
      },
      {
        title: "Extends Panel Life",
        description: "Salt aerosol and bird dropping acids etch panel glass over time. Regular cleaning prevents permanent surface damage that shortens panel lifespan."
      },
      {
        title: "Improves ROI",
        description: "Every percentage point of lost efficiency costs you money. Well-maintained panels generate more electricity, improving your return on the solar investment faster."
      },
      {
        title: "Safe Rooftop Service",
        description: "Cleaning panels involves working at height with live electrical equipment. Our trained team uses deionised water, soft brushes, and proper safety gear for every job."
      },
      {
        title: "Coastal Salt Air Specialists",
        description: "Gold Coast's salt aerosol deposits mineral residue on panels within weeks. Our pure-water process removes salt buildup completely without leaving streaks or residue."
      },
      {
        title: "Warranty-Safe Method",
        description: "We use soft brushes, pH-neutral solutions, and deionised rinse water — the method recommended by Tier-1 solar panel manufacturers to preserve anti-reflective coatings and warranties."
      }
    ],
    process: [
      {
        step: 1,
        title: "Safety & Access Assessment",
        description: "Assess roof safety, panel layout, and electrical systems before beginning. Confirm deionised water supply and access equipment for safe rooftop work."
      },
      {
        step: 2,
        title: "Panel Inspection",
        description: "Inspect panels for hotspots, micro-cracks, bird damage, and soiling patterns that may indicate underlying performance issues."
      },
      {
        step: 3,
        title: "Purified Water Pre-Rinse",
        description: "Pre-rinse with deionised pure water as required by most manufacturers to preserve anti-reflective coatings — no tap water streaks or mineral deposits."
      },
      {
        step: 4,
        title: "Soft-Brush Scrub",
        description: "Gently scrub panels with a pH-neutral solution and soft brush to remove bird droppings, salt deposits, pollen, and bonded organic matter."
      },
      {
        step: 5,
        title: "Output Check & Photo Report",
        description: "Final inspection confirms panels are clean and connections are undisturbed. Before/after photos provided on request to document the clean."
      }
    ],
    pricingGuide: "Solar panel cleaning in [suburb] starts at $220 for up to 20 panels. Additional panels are $4–$10 each depending on quantity and condition. These are guide prices — every system is different, so contact us for a free quote.",
    faqs: [
      {
        question: "How often should solar panels be cleaned?",
        answer: "Most Gold Coast properties benefit from cleaning every 3-6 months. Coastal properties with salt spray may need quarterly cleaning to maintain efficiency. We recommend annual cleaning at minimum."
      },
      {
        question: "How much efficiency is lost from dirty solar panels?",
        answer: "Dirty panels can lose 15-30% of energy output depending on the type of buildup. Salt crust, bird droppings, and pollen are the biggest culprits on Gold Coast roofs. This directly translates to higher electricity bills and slower ROI."
      },
      {
        question: "Can I clean solar panels myself?",
        answer: "We don't recommend DIY cleaning due to safety risks from working at height and damage risks to electrical systems and anti-reflective coatings. Professional cleaning is safer and more effective."
      },
      {
        question: "What damages solar panels during cleaning?",
        answer: "High-pressure cleaning, abrasive materials, tap water mineral deposits, and harsh chemicals can all damage anti-reflective coatings. Professional teams use soft brushes, pH-neutral solutions, and deionised water."
      },
      {
        question: "Is solar panel cleaning necessary in winter?",
        answer: "Yes, winter often brings algae, pollen, and debris. Regular cleaning year-round ensures consistent energy generation throughout all seasons, especially important on the Gold Coast where solar production is valuable all year."
      },
      {
        question: "Why do coastal solar panels get dirty faster?",
        answer: "Gold Coast's salt air deposits mineral residue on panels within weeks, combined with humidity that promotes algae growth and hinterland pollen that settles on glass. This is why coastal properties need more frequent professional cleaning."
      },
      {
        question: "How does Gold Coast's coastal salt air affect solar panels?",
        answer: "Salt aerosol from the ocean deposits mineral residue on panel glass within days of cleaning for coastal properties. This salt layer scatters and absorbs sunlight before it reaches the solar cells, reducing generation. Over time, salt deposits bond to the anti-reflective coating and can cause permanent micro-pitting if not regularly cleaned with purified water."
      },
      {
        question: "Will cleaning void my solar panel warranty?",
        answer: "No — as long as cleaning is done correctly. Our method uses soft brushes, pH-neutral solution, and deionised rinse water, which aligns with the manufacturer-recommended cleaning procedure for virtually all Tier-1 panel brands. We never use high-pressure jets or abrasive materials. We can provide our methodology in writing for your warranty records."
      },
      {
        question: "How much energy am I losing right now if my panels are dirty?",
        answer: "It depends on how dirty they are and your system size. A light dust film typically reduces output by 5–10%. Moderate soiling with bird droppings or salt crust can cause 15–25% losses. On a typical 6.6kW Gold Coast system, a 20% loss equates to roughly $300–500/year in missed electricity savings — often more than the cost of an annual professional clean."
      }
    ]
  },
  {
    name: "Solar Panel Bird Proofing",
    slug: "bird-proofing",
    parentPage: "BirdProofing",
    shortDesc: "Professional solar panel bird proofing mesh installation to stop pigeons and mynas nesting under your panels",
    benefits: [
      {
        title: "Protects Your Solar Panels",
        description: "Pigeons and mynas love nesting under solar panels. Our purpose-made mesh stops birds getting underneath without voiding your panel warranty."
      },
      {
        title: "Restores Energy Output",
        description: "Bird droppings and nesting debris drop solar panel efficiency significantly. Mesh keeps panels clean and performing at their best."
      },
      {
        title: "Stops Droppings & Mess",
        description: "Bird droppings are acidic and damage panels and the roof directly beneath them. Mesh keeps birds out from under the panels entirely."
      },
      {
        title: "Protects Your Health",
        description: "Bird nests under panels harbour mites, lice and bacteria. Solar panel mesh keeps your roof and home clean and healthy."
      },
      {
        title: "Humane & Long Lasting",
        description: "Exclusion-only mesh doesn't harm birds — we simply stop them getting under the panels. Marine-grade steel mesh and clips last 10+ years."
      },
      {
        title: "Warranty Safe",
        description: "We install mesh using panel clips (not screws or bolts) so your solar panel warranty remains intact. No drilling into panels or tiles."
      }
    ],
    process: [
      {
        step: 1,
        title: "Panel Inspection",
        description: "Assess the full solar array. Identify bird activity, entry points and existing damage under the panels."
      },
      {
        step: 2,
        title: "Clean & Clear",
        description: "Remove existing nests, droppings and debris from under the panels, then disinfect the area before installation."
      },
      {
        step: 3,
        title: "Mesh Installation",
        description: "Install marine-grade galvanised steel mesh around the entire solar array using warranty-safe panel clips."
      },
      {
        step: 4,
        title: "Final Check & Guarantee",
        description: "Verify full coverage with no gaps. We guarantee our bird proofing work against failure for long term peace of mind."
      }
    ],
    pricingGuide: "Solar panel bird proofing in [suburb] costs $25–$35 per metre, which includes roof and solar panel cleaning plus supply and installation of marine-grade mesh. These are guide prices — every installation is different, so contact us for a free quote.",
    faqs: [
      {
        question: "Why do I need bird proofing for my solar panels?",
        answer: "The gap beneath solar panels is the perfect nesting spot for pigeons and mynas. Nests damage wiring and leave acidic droppings all over your panels, dropping output significantly. Solar panel mesh stops the problem permanently."
      },
      {
        question: "Will the mesh void my solar panel warranty?",
        answer: "Not when installed correctly. We use purpose-built aluminium clips that attach to the panel frame — there is no drilling, screwing or bolting into your panels. Your panel and inverter warranties stay fully intact."
      },
      {
        question: "What birds cause the most problems on the Gold Coast?",
        answer: "Feral pigeons and common (Indian) mynas are the biggest culprits. Both love nesting under solar panels on Gold Coast rooftops, which is why mesh proofing is so effective."
      },
      {
        question: "How long does solar panel mesh last?",
        answer: "Our marine-grade galvanised steel mesh is rated for 10+ years, even in coastal Gold Coast conditions. It's UV stable, rust resistant and designed to withstand salt air."
      },
      {
        question: "Do you clean up the existing mess before installing?",
        answer: "Yes. Every job starts with removing nests, droppings and debris from under the panels, then disinfecting the area. You can add solar panel cleaning to the same visit for a fully restored system."
      },
      {
        question: "Is solar panel bird proofing humane?",
        answer: "Absolutely. Our mesh is exclusion only — we don't harm birds. It simply stops them getting under your panels so they move on and nest elsewhere."
      }
    ]
  },
  {
    name: "Patio Cleaning",
    slug: "patio-cleaning",
    parentPage: "PatioCleaning",
    shortDesc: "Professional patio pressure cleaning to remove mould, algae and stains from pavers, concrete and tiled patios",
    benefits: [
      {
        title: "Restores Surface Beauty",
        description: "Professional cleaning removes years of dirt, stains, and organic growth to reveal the original beauty of your patio surfaces."
      },
      {
        title: "Improves Outdoor Safety",
        description: "Eliminate slippery mould, algae, and moss that create dangerous slip hazards on patio surfaces, making outdoor areas safe for family."
      },
      {
        title: "Makes Patios Inviting Again",
        description: "Transform neglected outdoor spaces into welcoming entertainment areas where you'll actually want to spend time."
      },
      {
        title: "Increases Property Value",
        description: "Clean, well-maintained outdoor spaces significantly boost curb appeal and add value to your property investment."
      },
      {
        title: "Extends Surface Life",
        description: "Regular professional cleaning prevents permanent staining and deterioration, protecting your patio investment long-term."
      },
      {
        title: "Prepares for Entertainment",
        description: "Create the perfect backdrop for outdoor dining, BBQs, and gatherings with clean, attractive patio surfaces."
      }
    ],
    process: [
      {
        step: 1,
        title: "Surface Assessment",
        description: "Identify the patio surface type — concrete, pavers, natural stone, brick, tile, or composite — and adjust pressure and chemistry accordingly."
      },
      {
        step: 2,
        title: "Pre-Treatment",
        description: "Apply pH-appropriate softwash solution to break down mould, algae, and embedded organic stains before pressure cleaning."
      },
      {
        step: 3,
        title: "Pressure Clean",
        description: "Surface clean with a calibrated rotary head for an even, streak-free finish — no zebra striping, no etching."
      },
      {
        step: 4,
        title: "Detail & Edge Work",
        description: "Hand-wand the perimeters, garden edges, drains, and corners that the rotary cleaner can't reach for a fully finished result."
      },
      {
        step: 5,
        title: "Sand Refill (optional)",
        description: "For pavers, replace lost joint sand with kiln-dried polymeric sand to prevent weed growth and stabilise the patio surface."
      }
    ],
    pricingGuide: "Patio cleaning in [suburb] is typically included in our full-home exterior package (around $660 covering driveway, pathways, patio and pool surrounds). Patio-only jobs are quoted by area — most suburban patios fall in the $180–$380 range. These are guide prices — every property is individual, so contact us for a free quote.",
    faqs: [
      {
        question: "How much does patio cleaning cost on the Gold Coast?",
        answer: "Patio pressure cleaning on the Gold Coast is typically included in our full home package of around $660, which covers the driveway, pathways, patio, and pool area. For patio-only jobs, pricing depends on the size of the area. These are guide prices — every property is individual, so contact us for a free, no-obligation quote."
      },
      {
        question: "What types of patio surfaces can you clean?",
        answer: "We clean all types of patio surfaces including concrete, pavers, natural stone, brick, tile, and composite decking. Our techniques are adapted for each specific material."
      },
      {
        question: "How do you handle delicate patio surfaces?",
        answer: "For delicate surfaces like natural stone or aged pavers, we use lower pressure settings and specialised cleaning solutions to achieve excellent results without damage."
      },
      {
        question: "Can you remove stains from patio furniture areas?",
        answer: "Yes, we can remove most stains including rust marks from furniture, food and drink spills, and organic stains. We use specialised treatments for different stain types."
      },
      {
        question: "Will you clean around plants and garden areas?",
        answer: "Absolutely. We take special care around landscaping, pre-wetting plants and using plant-safe cleaning solutions. We protect your garden while cleaning effectively."
      },
      {
        question: "How long before I can use my patio after cleaning?",
        answer: "Most patios are ready to use immediately after cleaning and drying. For treatments that require curing time, we'll let you know the recommended wait period."
      }
    ]
  }
];

// Commercial & Strata services — mirrors SERVICES but with copy, benefits, process and FAQs
// geared toward commercial buildings, body corporates, strata committees, facility managers,
// retail, hospitality, offices, industrial, schools and healthcare sites.
export const COMMERCIAL_SERVICES = [
  {
    name: "Commercial Window Cleaning",
    slug: "window-cleaning",
    shortDesc: "Scheduled commercial and strata window cleaning for offices, retail, hospitality and high-rise buildings on the Gold Coast",
    hero: "Commercial & Strata Window Cleaning",
    subhead: "Offices • Retail • Hospitality • Strata & Body Corporate",
    intro: "A clean, streak-free glass facade is the first impression your customers, tenants and residents see. We deliver professional commercial window cleaning across the Gold Coast on schedules that suit your trading hours and minimise disruption to staff, customers and residents. Fully insured, SWMS-documented, and experienced with everything from ground-floor shopfronts through to multi-storey strata towers.",
    benefits: [
      { title: "Fixed Scheduled Maintenance", description: "Weekly, fortnightly, monthly or quarterly cleaning programs with a fixed cost per visit so you can budget confidently and never miss a clean." },
      { title: "After-Hours & Weekend Service", description: "We work around your trading hours — early mornings, evenings or weekends — so customers and staff are never interrupted." },
      { title: "High-Rise & Reach-and-Wash Systems", description: "Pure-water reach poles up to 4+ storeys and traditional rope access partners for taller facades, covering almost any commercial or strata building." },
      { title: "Strata & Body Corporate Specialists", description: "Detailed quotes, invoices and reports designed for body corporate committees, building managers and strata managers." },
      { title: "$20 Million Public Liability", description: "Fully insured with $20 million public liability and workers compensation. Certificates of currency provided on request for tenders and compliance." },
      { title: "SWMS & Site Safety", description: "Site-specific Safe Work Method Statements, JSA documentation, WHS inductions and police-checked technicians for every commercial job." }
    ],
    process: [
      { step: 1, title: "Site Inspection", description: "Walkthrough of your facade, access points and safety requirements to build an accurate, fixed-price scope." },
      { step: 2, title: "SWMS & Scheduling", description: "Produce site-specific SWMS, lock in a cleaning schedule, and coordinate with building management and tenants." },
      { step: 3, title: "Professional Clean", description: "Pure-water reach-and-wash on external glass, traditional squeegee on interior and low-level glass, frames and tracks wiped down." },
      { step: 4, title: "Sign-Off & Reporting", description: "Completion report with photos where required, itemised invoice, and a locked-in date for the next scheduled visit." }
    ],
    faqs: [
      { question: "How much does commercial window cleaning cost on the Gold Coast?", answer: "Commercial window cleaning on the Gold Coast is $220–$440 for most apartments and small offices (inside and out). Single-storey homes and medium businesses are $385–$550, including deep track and screen cleaning. Double-storey and larger businesses or offices are $500–$800, including deep track and screen cleaning. Large commercial buildings, car dealerships, shopping centres and large properties with lots of glass are $800+ and require a site visit. All prices are a guide — contact us for a free, no-obligation quote." },
      { question: "How often should a commercial building have windows cleaned?", answer: "Most Gold Coast commercial properties benefit from monthly or fortnightly external window cleaning, with retail and hospitality venues often opting for weekly programs. Strata buildings typically schedule quarterly or bi-annual full cleans. We'll recommend a frequency based on your facade, location and exposure to salt air, traffic and pollution." },
      { question: "Do you service strata and body corporate buildings?", answer: "Yes — strata and body corporate work is a large part of what we do. We provide detailed quotes, itemised invoices, certificates of currency and incident reporting that strata managers and committees need for their records." },
      { question: "Can you work outside of trading hours?", answer: "Absolutely. Early mornings, late evenings and weekends are standard for our commercial clients. We plan cleans around trading hours so customers and tenants are never disrupted." },
      { question: "How high can you clean?", answer: "Our pure-water reach-and-wash systems safely reach up to 4+ storeys from the ground. For taller facades we partner with licensed rope access technicians and use boom lifts or swing stages where required. We'll identify the safest, most cost-effective access method during the site inspection." },
      { question: "Are you fully insured and compliant?", answer: "Yes. We carry $20 million public liability, workers compensation, and supply site-specific SWMS, JSA and certificates of currency on request. All technicians are police-checked, uniformed and WHS-inducted." },
      { question: "Do you offer contract pricing?", answer: "Yes. We offer fixed-price monthly, quarterly and annual contracts with locked-in visit rates, which lets facility managers and strata committees budget accurately and avoid surprise invoices." }
    ]
  },
  {
    name: "Commercial Roof Cleaning",
    slug: "roof-cleaning",
    shortDesc: "Professional soft-wash roof cleaning for commercial, industrial and strata buildings on the Gold Coast",
    hero: "Commercial & Strata Roof Cleaning",
    subhead: "Soft Wash • Large Roof Areas • Strata & Industrial",
    intro: "Dirty commercial and strata roofs don't just look neglected — moss, lichen and algae trap moisture, shorten roof life and drive up maintenance bills. Our commercial roof cleaning team services warehouses, offices, retail centres, schools, hotels and strata buildings across the Gold Coast using low-pressure soft washing that's safe for tile, Colorbond, metal deck and Kliplok profiles.",
    benefits: [
      { title: "Protects Your Roof Asset", description: "Removing moss, lichen and algae prevents tile degradation and rust, extending the serviceable life of a major capital asset by years." },
      { title: "Soft Wash Safe for All Profiles", description: "Low-pressure soft-wash methodology is safe on Colorbond, metal deck, Kliplok, terracotta and concrete tile roofs commonly used on commercial buildings." },
      { title: "Large-Area Pricing", description: "Efficient systems and dedicated commercial crews mean competitive square-metre pricing for warehouses, factory roofs, shopping centres and multi-unit strata." },
      { title: "Sinking Fund & Capital Works Ready", description: "We provide the detailed scope documentation, photos and invoices strata committees need for sinking fund or capital works approval." },
      { title: "Minimal Business Disruption", description: "We work around your operations and can access most commercial roofs without interrupting staff, tenants or customers below." },
      { title: "Licensed & Insured", description: "Fully insured with $20 million public liability, height safety trained, and SWMS-documented for every commercial roof site." }
    ],
    process: [
      { step: 1, title: "Roof Assessment", description: "Drone and ground inspection of your roof condition, profile and access, producing a detailed fixed-price scope." },
      { step: 2, title: "Pre-Treatment", description: "Apply biodegradable treatment to kill moss, lichen and algae at the root so regrowth is dramatically slower." },
      { step: 3, title: "Soft Wash Clean", description: "Low-pressure rinse across the entire roof surface, restoring original colour and removing built-up contamination." },
      { step: 4, title: "Gutter & Downpipe Flush", description: "Flush debris out of gutters and downpipes dislodged during the clean, and provide a completion report with photos." }
    ],
    faqs: [
      { question: "Can you clean large commercial roofs like warehouses or shopping centres?", answer: "Yes. We regularly service large commercial roof areas including warehouses, factories, schools, retail centres and strata towers. We have the crews, equipment and insurance to handle jobs from a single retail tenancy through to multi-thousand square metre industrial roofs." },
      { question: "Is pressure cleaning safe for my commercial roof?", answer: "We don't use high pressure on roofs. Our soft-wash method uses low-pressure rinsing combined with biodegradable treatments, which is the manufacturer-recommended approach for Colorbond, Kliplok, metal deck and tile roofs. High pressure voids many roof warranties — soft washing does not." },
      { question: "Will cleaning void my Colorbond or solar warranty?", answer: "No. Soft washing at low pressure is compatible with Colorbond warranty requirements and is safe around solar arrays. We can work around rooftop solar installations, HVAC plant and skylights without damage." },
      { question: "How often should a commercial roof be cleaned?", answer: "Most Gold Coast commercial roofs benefit from cleaning every 2-3 years. Coastal or heavily shaded roofs may need annual treatment due to accelerated moss and algae growth in the humid salt air." },
      { question: "Do you provide documentation for strata capital works?", answer: "Yes. We provide detailed written scopes, before/after photos, invoices and certificates of currency suitable for strata committees, building managers and sinking fund or capital works approvals." },
      { question: "Will the run-off damage our landscaping or parking?", answer: "Our treatments are biodegradable and we manage run-off carefully. We pre-wet vegetation and coordinate drainage to protect carparks, entries and landscaping throughout the clean." },
      { question: "How much does commercial roof cleaning cost on the Gold Coast?", answer: "Commercial roof cleaning on the Gold Coast starts from $700 for small flat single-storey commercial roofs. Larger commercial roofs, warehouses, strata buildings and industrial sheds are priced per square metre based on roof size, pitch, access complexity and contamination level — typically requiring a site inspection for an accurate fixed price. Large commercial jobs of 3 storeys or more start from $1,600+. All prices are a guide — every property is individual, so contact us for a free, no-obligation quote." },
      { question: "Can you clean a commercial roof after a storm?", answer: "Yes. After major storms we prioritise commercial clients with debris-loaded roofs and gutters. We can clear storm debris, flush downpipes, and inspect for damage, then provide a condition report for your insurer or building manager." },
      { question: "Do you apply anti-moss coating after cleaning commercial roofs?", answer: "Yes. For commercial roofs with recurring moss or lichen problems, we can apply a professional-grade biocide coating after cleaning that dramatically slows regrowth — typically extending time between cleans from 2 years to 3–4 years." }
    ]
  },
  {
    name: "Commercial Building Softwash",
    slug: "house-softwash",
    shortDesc: "Professional soft-wash exterior building cleaning for commercial, retail and strata properties",
    hero: "Commercial & Strata Building Softwash",
    subhead: "Facades • Render • Cladding • Multi-Unit",
    intro: "Mould, mildew and algae on building facades signal neglect to customers and devalue strata property. Our commercial softwash service uses low-pressure biodegradable cleaning to restore render, painted walls, cladding, brickwork and multi-unit strata facades across the Gold Coast — without damaging paintwork or finishes.",
    benefits: [
      { title: "Restores Facade Appearance", description: "Brings rendered and painted facades back to like-new appearance in a fraction of the cost of repainting — a common strata sinking fund win." },
      { title: "Safe for Paint & Render", description: "Low-pressure soft wash technique is safe for paint, render, acrylic coatings, fibre cement and all modern commercial cladding systems." },
      { title: "Kills Mould at the Source", description: "Biodegradable treatment kills mould, mildew and algae spores so results last much longer than pressure washing alone." },
      { title: "Strata & Multi-Unit Specialists", description: "Experienced with multi-unit townhouse complexes, apartment blocks and mixed-use developments, coordinating with residents and committees." },
      { title: "Improves Tenant & Customer Perception", description: "A clean, well-maintained facade directly improves leasing outcomes, customer perception and property value for owners and investors." },
      { title: "Minimal Disruption", description: "We schedule around trading hours and tenants and protect landscaping, signage and parking throughout the clean." }
    ],
    process: [
      { step: 1, title: "Site Walkthrough", description: "Identify finish types, problem areas and access requirements, then produce a fixed-price scope." },
      { step: 2, title: "Protection & Prep", description: "Protect landscaping, signage, electrical and entry points before work starts." },
      { step: 3, title: "Soft Wash Clean", description: "Apply biodegradable treatment, dwell, and low-pressure rinse across the full facade." },
      { step: 4, title: "Final Inspection", description: "Walk the finished facade with the client or building manager and provide a completion report." }
    ],
    faqs: [
      { question: "How much does commercial building softwash cost on the Gold Coast?", answer: "Commercial building softwash on the Gold Coast starts from $495 for small single-storey offices or retail tenancies. Larger single-storey commercial buildings are typically $770–$990, and multi-storey or XL commercial buildings start from $1,200+. Large strata complexes and multi-unit buildings are quoted based on facade area after a site inspection. All prices are a guide — every building is individual, so contact us for a free, no-obligation quote." },
      { question: "Is soft washing safe for painted or rendered facades?", answer: "Yes. Soft washing is specifically designed for painted, rendered and coated finishes. Unlike high-pressure cleaning, it will not lift paint, chip render or damage acrylic finishes commonly used on commercial buildings." },
      { question: "Can you clean multi-unit strata buildings?", answer: "Yes — strata facades are a core part of our commercial work. We coordinate with building managers and residents, provide the documentation strata committees need, and work in staged visits if required to avoid disrupting any single tenant." },
      { question: "How long do the results last?", answer: "Because our treatments kill mould and algae at the spore level, a professional soft wash typically lasts 12-24 months on Gold Coast buildings — significantly longer than a plain pressure clean." },
      { question: "Will the cleaning solution harm plants or run into drains?", answer: "We use biodegradable solutions, pre-wet surrounding landscaping and manage run-off carefully. Our techniques are designed to protect gardens, drains and adjacent tenancies." },
      { question: "Do you clean high-level facades?", answer: "Yes — we use extension soft wash systems, boom lifts and rope access partners to safely reach multi-storey facades up to high-rise height." },
      { question: "Can cleaning delay or replace a repaint?", answer: "Absolutely. A professional soft wash often delays a facade repaint by several years, which is a significant saving for commercial owners and strata sinking funds." }
    ]
  },
  {
    name: "Commercial Pressure Cleaning",
    slug: "pressure-cleaning",
    shortDesc: "Heavy-duty commercial pressure cleaning for driveways, carparks, footpaths, loading docks and industrial sites",
    hero: "Commercial & Strata Pressure Cleaning",
    subhead: "Carparks • Footpaths • Loading Docks • Industrial",
    intro: "Commercial hard surfaces take a beating — oil, tyre marks, gum, grease and grime build up fast on carparks, footpaths, loading docks and industrial slabs. Our commercial pressure cleaning crews restore concrete, pavers and exposed aggregate across the Gold Coast using industrial hot-water equipment and surface cleaners, on schedules that suit your operations.",
    benefits: [
      { title: "Heavy-Duty Industrial Equipment", description: "High-flow hot-water pressure units and surface cleaners deliver fast, even results across large commercial areas that domestic units can't touch." },
      { title: "Gum, Oil & Tyre Mark Removal", description: "Specialist treatments and degreasers to handle chewing gum, oil stains, tyre marks, rubber and fuel spills on commercial hardstand." },
      { title: "Scheduled Maintenance Programs", description: "Monthly, quarterly or annual programs keep carparks, entries and footpaths consistently presentable at a predictable fixed price." },
      { title: "After-Hours Operations", description: "Overnight and weekend work for retail centres, hospitality and offices so trading is never affected." },
      { title: "Strata & Facility Manager Ready", description: "Detailed quotes, invoices and progress reports designed for strata committees and facility managers." },
      { title: "Fully Insured & Compliant", description: "$20 million public liability, site-specific SWMS, JSA and workers compensation for every commercial pressure cleaning job." }
    ],
    process: [
      { step: 1, title: "Site Inspection", description: "Walk the site to map problem areas, measure square metres and confirm water access and run-off management." },
      { step: 2, title: "Pre-Treatment", description: "Apply degreasers and stain treatments to gum, oil and organic staining before pressure cleaning begins." },
      { step: 3, title: "Surface Clean", description: "Surface cleaner attachments deliver consistent, streak-free results across large flat areas of concrete and pavers." },
      { step: 4, title: "Final Detail", description: "Detail edges, corners and high-traffic points, then walk the finished area with the client and issue completion report." }
    ],
    faqs: [
      { question: "How much does commercial pressure cleaning cost on the Gold Coast?", answer: "Commercial pressure cleaning on the Gold Coast starts from $220 for small areas like a single driveway or entry. Medium carparks and hardstand areas are typically $440–$660. Full-site cleans covering carparks, footpaths, loading docks and common areas are quoted based on square metres after a site inspection. Scheduled maintenance contracts are available at fixed per-visit rates. All prices are a guide — every site is individual, so contact us for a free, no-obligation quote." },
      { question: "Can you clean large carparks and industrial slabs?", answer: "Yes — this is a major part of our commercial work. We use truck-mounted high-flow hot water units and 900mm+ surface cleaners to cover thousands of square metres per visit at consistent quality." },
      { question: "Do you remove chewing gum and oil stains?", answer: "Yes. Gum removal is a standard add-on for retail centres and entrances. For oil and fuel stains we use targeted degreasers and hot water extraction to lift contamination out of the concrete rather than just rinsing the surface." },
      { question: "Can you work overnight or on weekends?", answer: "Yes. Most of our carpark and hardstand cleaning is scheduled overnight or on weekends for retail centres, hospitality venues and office buildings so daily trading is unaffected." },
      { question: "How do you manage water run-off and drainage?", answer: "We manage run-off carefully and can use water recovery systems where required by the site or local council trade waste rules. Our team will confirm run-off management during the site inspection." },
      { question: "Do you offer scheduled contracts?", answer: "Yes. Monthly, quarterly and annual pressure cleaning contracts are common for shopping centres, service stations, strata complexes and industrial sites. Fixed visit pricing makes budgeting simple." },
      { question: "Will high pressure damage our concrete or pavers?", answer: "Not when done correctly. Our technicians select the right pressure, tip and technique for each surface. We use lower pressure on decorative finishes and exposed aggregate and only apply industrial pressure where the surface can handle it." }
    ]
  },
  {
    name: "Commercial Gutter Cleaning",
    slug: "gutter-cleaning",
    shortDesc: "Professional commercial gutter cleaning for strata, industrial, retail and body corporate buildings",
    hero: "Commercial & Strata Gutter Cleaning",
    subhead: "Strata • Industrial • Retail • Scheduled Programs",
    intro: "Blocked commercial gutters cause roof leaks, water ingress, damaged ceilings, insurance claims and fire risk — and it's the building owner or strata committee that wears the cost. Our commercial gutter cleaning team services strata, industrial, retail and body corporate buildings across the Gold Coast using vacuum systems that are fast, safe and minimally disruptive.",
    benefits: [
      { title: "Prevents Water Ingress Claims", description: "Routine gutter cleaning dramatically reduces the risk of leaks, internal water damage and expensive insurance claims." },
      { title: "Fire Risk Management", description: "Removes leaf litter and debris that fuels ember attack — critical for bushfire-prone sites and a common strata compliance item." },
      { title: "Vacuum Systems — Minimal Mess", description: "Industrial gutter vacuums remove debris cleanly without scattering leaves or sludge across carparks, tenancies or landscaping." },
      { title: "Photographic Reporting", description: "Before/after photos of every section cleaned, plus any identified damage, for building managers and strata records." },
      { title: "Scheduled Maintenance", description: "Quarterly, bi-annual or annual programs keep gutters clear at a fixed price — a small preventative cost that avoids major repairs." },
      { title: "Height Safety Compliant", description: "All technicians are height safety trained, with site-specific SWMS, harnesses, anchor points and $20 million public liability." }
    ],
    process: [
      { step: 1, title: "Roof & Gutter Inspection", description: "Assess roof, gutter and downpipe condition, and identify any damage before work begins." },
      { step: 2, title: "Vacuum Debris Removal", description: "Industrial gutter vacuums remove leaves, sludge and debris from every run without mess." },
      { step: 3, title: "Downpipe Flush", description: "Downpipes are flushed to confirm free flow and to clear any blockages identified during inspection." },
      { step: 4, title: "Photo Report & Sign-Off", description: "Photo report of every section cleaned, noting any damage to flag to the building manager or strata committee." }
    ],
    faqs: [
      { question: "How much does commercial gutter cleaning cost on the Gold Coast?", answer: "Commercial gutter cleaning on the Gold Coast starts from $550 for smaller single-storey commercial buildings, ranging up to $770+ for double-storey properties depending on size and how full the gutters are. Large industrial, strata or multi-building sites are quoted on inspection. All prices are a guide — every property is individual, so contact us for a free, no-obligation quote." },
      { question: "How often should commercial gutters be cleaned?", answer: "Most Gold Coast commercial buildings benefit from cleaning at least twice a year — typically pre-storm season and again mid-year. Sites with heavy tree cover should consider quarterly cleaning to prevent overflow and fire risk." },
      { question: "Do you service large industrial or strata buildings?", answer: "Yes. We regularly clean gutters and box gutters on warehouses, industrial sheds, strata towers and multi-unit complexes using commercial-grade vacuum systems and rope access where needed." },
      { question: "Do you flush downpipes?", answer: "Yes — downpipes are flushed as part of every commercial service, and we flag any blockages or damage in the photo report." },
      { question: "Will you provide documentation for strata records?", answer: "Yes. We provide invoices, certificates of currency, SWMS and photographic reports suitable for strata committees, building managers and insurance records." },
      { question: "Is this service covered by insurance?", answer: "We carry $20 million public liability and full workers compensation. All height work is performed under a site-specific SWMS with appropriate fall arrest and harness systems." },
      { question: "Do blocked gutters really cause fire risk?", answer: "Yes. Leaf and debris buildup in gutters is a major ember-attack fuel source during bushfire season. Regular cleaning is a simple, low-cost mitigation that insurers and councils actively encourage." }
    ]
  },
  {
    name: "Commercial Solar Panel Cleaning",
    slug: "solar-panel-cleaning",
    shortDesc: "Professional commercial and strata solar panel cleaning to restore generation output on large solar arrays",
    hero: "Commercial & Strata Solar Panel Cleaning",
    subhead: "Commercial Arrays • Strata • Warehouses • Schools",
    intro: "Commercial solar arrays lose significant output to dust, bird droppings, salt and pollution — and at scale, lost generation means lost money every day. Our commercial solar cleaning team services large rooftop arrays on warehouses, offices, schools, strata buildings and retail centres across the Gold Coast, restoring generation and protecting your solar investment.",
    benefits: [
      { title: "Measurable Generation Recovery", description: "Professional cleaning routinely restores 10-30% lost generation on dirty commercial arrays — paying for itself in a single billing cycle for many sites." },
      { title: "Pure Water & Deionised Systems", description: "Pure water and deionised rinse systems leave zero streaks or residue, as recommended by tier-1 panel manufacturers." },
      { title: "Warranty-Safe Methodology", description: "Soft-brush and pure-water technique is aligned with Tier-1 panel manufacturer warranty requirements — no high-pressure, no abrasive chemicals." },
      { title: "Large-Array Capability", description: "Equipped to clean hundreds of panels per visit on warehouses, industrial sheds, strata roofs and school buildings." },
      { title: "Bird Dropping & Salt Removal", description: "Bird droppings and coastal salt buildup cause hotspots and permanent cell damage if left — we remove both safely without damage." },
      { title: "Height Safety & Insurance", description: "Height safety trained, SWMS-documented and carrying $20 million public liability for every commercial solar job." }
    ],
    process: [
      { step: 1, title: "Array Inspection", description: "Visual inspection of the array for soiling, damage, hotspots and access constraints to build a fixed-price scope." },
      { step: 2, title: "Safe Roof Access", description: "Set up height safety anchors and access routes in accordance with the site-specific SWMS." },
      { step: 3, title: "Pure Water Clean", description: "Soft-brush and deionised pure-water clean across the full array, removing dust, salt, pollen and bird droppings." },
      { step: 4, title: "Final Rinse & Report", description: "Final rinse, visual verification, and a photo report highlighting any damage or issues identified on the array." }
    ],
    faqs: [
      { question: "How much does commercial solar panel cleaning cost on the Gold Coast?", answer: "Commercial solar panel cleaning on the Gold Coast starts from $220, which covers the first 20 panels. After that, it's $4–$10 per additional panel depending on the total number of panels and how dirty they are. Large commercial arrays on warehouses, schools and strata buildings are quoted based on panel count and access requirements. All prices are a guide — every system is different, so contact us for a free, no-obligation quote." },
      { question: "How much generation can a clean recover?", answer: "On dirty commercial arrays in the Gold Coast we commonly see 10-30% recovery in generation after a professional clean, with coastal and industrial sites often at the higher end due to salt and pollution buildup." },
      { question: "Will cleaning void my solar warranty?", answer: "No. Our pure-water, soft-brush methodology aligns with Tier-1 panel manufacturer cleaning guidelines. We never use high pressure or abrasive chemicals. We can supply our methodology in writing for your warranty records." },
      { question: "Can you clean large warehouse or industrial arrays?", answer: "Yes. We regularly service commercial arrays on warehouses, factories, schools, strata towers and retail centres. We're equipped for large-array cleans with the crews, water systems and height safety required." },
      { question: "How often should commercial solar panels be cleaned?", answer: "Most commercial Gold Coast arrays benefit from cleaning every 6-12 months. Coastal sites, sites near roads or industry, and arrays with heavy bird activity should consider more frequent cleans to protect generation and prevent hotspots." },
      { question: "Do you clean around inverters and DC isolators?", answer: "Yes — our technicians are trained to work safely around inverters, combiner boxes and DC isolators, and to spot and report any visible damage to the wider system during the clean." },
      { question: "Can dirty panels actually damage the array?", answer: "Yes. Uneven soiling and bird droppings create hotspots that can permanently damage cells and shorten panel life, on top of the ongoing generation loss. Regular cleaning is both a performance and a protection measure." },
      { question: "Do you clean solar panels on Gold Coast high-rise and multi-storey buildings?", answer: "Yes. We have the height safety training, equipment, and insurance to clean solar arrays on multi-storey strata, high-rise residential, and commercial towers across the Gold Coast. We'll assess access requirements and produce a site-specific SWMS for every elevated job." },
      { question: "Will cleaning void the solar panel warranty on our commercial system?", answer: "No. Our pure-water, soft-brush method aligns with Tier-1 manufacturer cleaning guidelines. We never use high pressure or abrasive chemicals. We supply our methodology in writing for your warranty records — useful for strata and body corporate compliance files." },
      { question: "How much generation revenue are we losing from dirty commercial panels?", answer: "On a dirty commercial array in Gold Coast conditions, 10–30% generation loss is common. For a 100kW commercial system generating $15,000/year in electricity value, a 20% loss costs $3,000/year in foregone export income or bill offsets — often 5–10× the cost of an annual clean." }
    ]
  },
  {
    name: "Commercial Solar Panel Bird Proofing",
    slug: "bird-proofing",
    shortDesc: "Professional solar panel bird proofing mesh for commercial and strata solar arrays on the Gold Coast",
    hero: "Commercial & Strata Solar Bird Proofing",
    subhead: "Pigeon Mesh • Warranty Safe • Large Arrays",
    intro: "Pigeons and mynas nesting under commercial solar arrays cause droppings, noise complaints, corrosion, fire risk and permanent damage to panels and roofing. Our commercial bird proofing team installs marine-grade stainless mesh around entire commercial and strata solar arrays across the Gold Coast — humane, warranty-safe and built to last.",
    benefits: [
      { title: "Stops Pigeons & Mynas Permanently", description: "Marine-grade stainless mesh permanently excludes pigeons and mynas from nesting under your commercial array — no ongoing pest control costs." },
      { title: "Protects the Solar Investment", description: "Droppings and nesting material cause corrosion, hotspots and fire risk. Bird proofing protects both panels and the roof underneath." },
      { title: "Warranty-Safe Panel Clips", description: "Stainless panel clips attach mesh without drilling into frames, keeping your panel and roof warranties intact." },
      { title: "Humane & Exclusion-Only", description: "Mesh simply prevents access — no harm to birds, no spikes, no poisons. A strata- and community-friendly solution." },
      { title: "Marine-Grade Durability", description: "316 stainless mesh rated for coastal Gold Coast conditions with a 10-year product life and our workmanship warranty." },
      { title: "Clean-Out & Disinfect Included", description: "We clean out all existing nesting material, droppings and mess before fitting the mesh so the roof is left properly sanitised." }
    ],
    process: [
      { step: 1, title: "Array Inspection", description: "Inspect the array, measure perimeter and assess nesting and droppings to produce a fixed-price quote." },
      { step: 2, title: "Clean Out & Sanitise", description: "Remove all nesting material and droppings, then disinfect panels and underlying roof area." },
      { step: 3, title: "Mesh Installation", description: "Install marine-grade stainless mesh around the entire array using warranty-safe panel clips." },
      { step: 4, title: "Final Inspection & Guarantee", description: "Walk the installed mesh with the client and issue product and workmanship warranty documentation." }
    ],
    faqs: [
      { question: "How much does commercial solar panel bird proofing cost on the Gold Coast?", answer: "Commercial solar panel bird proofing on the Gold Coast costs $25–$35 per metre, depending on how dirty the roof and panels are. This price includes cleaning the roof and solar panels, plus supply and installation of marine-grade stainless mesh. Large commercial arrays on warehouses and strata buildings are quoted based on array perimeter after a site inspection. All prices are a guide — every installation is different, so contact us for a free, no-obligation quote." },
      { question: "Why is bird proofing important for commercial solar?", answer: "Pigeons and mynas nesting under commercial solar arrays cause corrosion, hotspots, roof damage, droppings and fire risk. Bird proofing protects a significant capital investment and eliminates ongoing pest, cleaning and complaint issues at strata and commercial sites." },
      { question: "Will drilling into panels void the warranty?", answer: "Yes, which is exactly why we don't drill into panel frames. We fit mesh using stainless panel clips that attach to the panel edge, protecting your Tier-1 manufacturer warranty while still delivering a permanent exclusion." },
      { question: "Can you service large commercial arrays?", answer: "Yes. We bird proof large commercial and strata arrays on warehouses, schools, offices and retail centres. Our system scales to hundreds of panels per install." },
      { question: "How long does the mesh last?", answer: "Our 316 marine-grade stainless mesh is rated for coastal Gold Coast conditions with a 10-year product life, and we back installation with our own workmanship warranty." },
      { question: "Is this humane?", answer: "Yes — it's exclusion-only. The mesh simply prevents birds from getting under the panels so they relocate and nest elsewhere. No harm, no spikes, no poisons." },
      { question: "Do you clean out the existing mess first?", answer: "Absolutely. Every install includes removing nesting material, cleaning out droppings and disinfecting the panels and roof underneath before the mesh goes on." }
    ]
  }
];

// Helper functions
export const getSuburbBySlug = (slug) => {
  return SUBURBS.find(s => s.slug === slug);
};

export const getServiceBySlug = (slug) => {
  return SERVICES.find(s => s.slug === slug);
};

export const getCommercialServiceBySlug = (slug) => {
  return COMMERCIAL_SERVICES.find(s => s.slug === slug);
};

export const getSuburbsByRegion = (region) => {
  return SUBURBS.filter(s => s.region === region);
};

export const getAllSlugs = () => {
  const slugs = [];
  SUBURBS.forEach(suburb => {
    SERVICES.forEach(service => {
      slugs.push({
        params: {
          service: service.slug,
          suburb: suburb.slug
        }
      });
    });
  });
  return slugs;
};

export const generateLocationPageUrl = (serviceSlug, suburbSlug) => {
  return `/${serviceSlug}/${suburbSlug}`;
};
