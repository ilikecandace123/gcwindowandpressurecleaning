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
    nearbySuburbs: ["Bilinga", "Kirra", "Tugun"]
  },
  {
    name: "Bilinga",
    slug: "bilinga",
    region: "south_coast",
    postcode: 4225,
    description: "Small coastal suburb with stunning ocean views. The salt spray and humidity common to beachfront properties make professional cleaning services essential.",
    landmarks: ["Bilinga Headland", "Coolangatta Beach", "National Park"],
    nearbySuburbs: ["Coolangatta", "Kirra", "Tugun"]
  },
  {
    name: "Kirra",
    slug: "kirra",
    region: "south_coast",
    postcode: 4225,
    description: "Popular beach suburb with excellent surfing conditions and family-friendly beaches. Coastal salt spray and sand accumulation require regular maintenance.",
    landmarks: ["Kirra Beach", "Kirra Reef", "Tallebudgera Valley"],
    nearbySuburbs: ["Coolangatta", "Tugun", "Tallebudgera"]
  },
  {
    name: "Tugun",
    slug: "tugun",
    region: "south_coast",
    postcode: 4224,
    description: "Quiet beachside village between major beaches. Residents appreciate the peaceful setting and require regular cleaning to maintain properties against coastal elements.",
    landmarks: ["Tugun Beach", "Tallebudgera Gorge", "Tallebudgera National Park"],
    nearbySuburbs: ["Kirra", "Currumbin", "Tallebudgera"]
  },
  {
    name: "Currumbin",
    slug: "currumbin",
    region: "south_coast",
    postcode: 4223,
    description: "Vibrant beachfront suburb with rock pools, wildlife sanctuary, and pristine beaches. High salt content in air and regular weather exposure demand professional cleaning.",
    landmarks: ["Currumbin Beach", "Currumbin Rock Pools", "Currumbin Wildlife Sanctuary"],
    nearbySuburbs: ["Tugun", "Currumbin Waters", "Palm Beach"]
  },
  {
    name: "Currumbin Waters",
    slug: "currumbin-waters",
    region: "south_coast",
    postcode: 4223,
    description: "Upmarket waterfront suburb with canals and exclusive properties. Regular professional cleaning maintains the premium appeal of waterfront homes.",
    landmarks: ["Currumbin Estuary", "Waterways", "Golf Courses"],
    nearbySuburbs: ["Currumbin", "Currumbin Valley", "Palm Beach"]
  },
  {
    name: "Currumbin Valley",
    slug: "currumbin-valley",
    region: "hinterland",
    postcode: 4223,
    description: "Picturesque hinterland suburb with rural properties and tree-covered homes. Dust, tree debris, and natural elements require regular professional maintenance.",
    landmarks: ["Tallebudgera National Park", "Rainforest", "Mountain Views"],
    nearbySuburbs: ["Currumbin Waters", "Bonogin", "Tallebudgera Valley"]
  },
  {
    name: "Palm Beach",
    slug: "palm-beach",
    region: "south_coast",
    postcode: 4221,
    description: "Family-oriented beach suburb with calm waters and patrolled beaches. Salt air exposure and regular beachgoer traffic require frequent property cleaning.",
    landmarks: ["Palm Beach", "Tallebudgera National Park", "Surf Club"],
    nearbySuburbs: ["Currumbin", "Elanora", "Tallebudgera"]
  },
  {
    name: "Elanora",
    slug: "elanora",
    region: "south_coast",
    postcode: 4221,
    description: "Exclusive hillside suburb with expansive views. Elevated position experiences coastal winds and requires professional cleaning for multi-level properties.",
    landmarks: ["Elanora Heights", "Tallebudgera National Park", "Valley Views"],
    nearbySuburbs: ["Palm Beach", "Tallebudgera", "Burleigh Heads"]
  },
  {
    name: "Tallebudgera",
    slug: "tallebudgera",
    region: "south_coast",
    postcode: 4220,
    description: "Stunning oceanside suburb nestled in a valley with protected beaches and lush surroundings. Perfect for families, requires regular window and house cleaning.",
    landmarks: ["Tallebudgera Beach", "Tallebudgera Valley", "National Park"],
    nearbySuburbs: ["Elanora", "Tallebudgera Valley", "Burleigh Heads"]
  },
  {
    name: "Tallebudgera Valley",
    slug: "tallebudgera-valley",
    region: "hinterland",
    postcode: 4220,
    description: "Hinterland retreat with rainforest surroundings and mountain homes. Tree pollen, sap, and natural debris accumulation need professional attention.",
    landmarks: ["Rainforest", "Mountain Streams", "National Park"],
    nearbySuburbs: ["Tallebudgera", "Bonogin", "Currumbin Valley"]
  },
  {
    name: "Burleigh Heads",
    slug: "burleigh-heads",
    region: "south_coast",
    postcode: 4220,
    description: "Premier beachfront suburb with iconic headland, upmarket dining, and pristine beaches. Coastal exposure and high foot traffic require professional maintenance.",
    landmarks: ["Burleigh Heads", "Headland Park", "Burleigh Beach"],
    nearbySuburbs: ["Tallebudgera", "Burleigh Waters", "Miami"]
  },
  {
    name: "Burleigh Waters",
    slug: "burleigh-waters",
    region: "central_coast",
    postcode: 4220,
    description: "Peaceful waterfront suburb with calm river access and family-friendly amenities. Water reflections and humidity create unique cleaning maintenance needs.",
    landmarks: ["Burleigh Lake", "Waterways", "Parkland"],
    nearbySuburbs: ["Burleigh Heads", "Miami", "Broadbeach"]
  },
  {
    name: "Miami",
    slug: "miami",
    region: "central_coast",
    postcode: 4220,
    description: "Charming beachfront suburb with village atmosphere and popular patrolled beach. Coastal salt and regular beachgoer activity necessitate frequent cleaning.",
    landmarks: ["Miami Beach", "Rock Pool", "Surf Club"],
    nearbySuburbs: ["Burleigh Heads", "Mermaid Beach", "Broadbeach"]
  },
  {
    name: "Mermaid Beach",
    slug: "mermaid-beach",
    region: "central_coast",
    postcode: 4218,
    description: "Beachfront suburb between Miami and Broadbeach with modern developments. Salt air and beachfront exposure require consistent professional cleaning services.",
    landmarks: ["Mermaid Beach", "Broadwater", "Beach Promenade"],
    nearbySuburbs: ["Miami", "Mermaid Waters", "Broadbeach"]
  },
  {
    name: "Mermaid Waters",
    slug: "mermaid-waters",
    region: "central_coast",
    postcode: 4218,
    description: "Luxury waterfront precinct with canals, high-end apartments, and resort facilities. Premium properties demand frequent professional cleaning and maintenance.",
    landmarks: ["Mermaid Waters Canal System", "Broadwater", "Shopping Centre"],
    nearbySuburbs: ["Mermaid Beach", "Broadbeach Waters", "Broadbeach"]
  },
  {
    name: "Broadbeach",
    slug: "broadbeach",
    region: "central_coast",
    postcode: 4218,
    description: "Major tourist and residential hub with bustling beach culture and high-rise living. Heavy salt exposure and urban dust require regular professional cleaning.",
    landmarks: ["Broadbeach Beach", "Kurrawa Beach", "Shopping Centre"],
    nearbySuburbs: ["Mermaid Waters", "Surfers Paradise", "Broadbeach Waters"]
  },
  {
    name: "Broadbeach Waters",
    slug: "broadbeach-waters",
    region: "central_coast",
    postcode: 4218,
    description: "Upscale waterfront suburb with canal estates and luxury properties. Water reflections and humidity create cleaning challenges requiring professional expertise.",
    landmarks: ["Broadwater", "Canal Estates", "Golf Course"],
    nearbySuburbs: ["Broadbeach", "Surfers Paradise", "Benowa"]
  },
  {
    name: "Surfers Paradise",
    slug: "surfers-paradise",
    region: "central_coast",
    postcode: 4217,
    description: "Iconic tourist destination with world-famous beach, high-rise buildings, and vibrant nightlife. Heavy foot traffic and coastal salt require frequent professional cleaning.",
    landmarks: ["Surfers Paradise Beach", "Cavill Avenue", "Q1 Tower"],
    nearbySuburbs: ["Broadbeach", "Main Beach", "Southport"]
  },
  {
    name: "Main Beach",
    slug: "main-beach",
    region: "central_coast",
    postcode: 4217,
    description: "Upmarket beachfront suburb with luxury properties and stunning views. Coastal exposure and premium property standards demand professional cleaning services.",
    landmarks: ["Main Beach", "Tallebudgera Channel", "Exclusive Apartments"],
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
    nearbySuburbs: ["Mudgeeraba", "Varsity Lakes", "Bundall"]
  },
  {
    name: "Mudgeeraba",
    slug: "mudgeeraba",
    region: "hinterland",
    postcode: 4213,
    description: "Charming hinterland village with rural properties and mountain appeal. Tree coverage and natural debris accumulation require regular professional maintenance.",
    landmarks: ["Mudgeeraba Creek", "Rainforest", "Mountain Homes"],
    nearbySuburbs: ["Currumbin Valley", "Bonogin", "Reedy Creek"]
  },
  {
    name: "Varsity Lakes",
    slug: "varsity-lakes",
    region: "central",
    postcode: 4227,
    description: "Rapidly growing suburb near Robina with modern houses and active lifestyle. Expanding urban environment with regular maintenance needs for growing families.",
    landmarks: ["Varsity Lakes", "Shopping Centre", "Schools"],
    nearbySuburbs: ["Robina", "Reedy Creek", "Ashmore"]
  },
  {
    name: "Reedy Creek",
    slug: "reedy-creek",
    region: "central",
    postcode: 4227,
    description: "Master-planned community with modern amenities and parks. Planned development areas require regular professional cleaning for maintained appearance.",
    landmarks: ["Reedy Creek", "Parks and Reserves", "Community Centre"],
    nearbySuburbs: ["Varsity Lakes", "Mudgeeraba", "Bonogin"]
  },
  {
    name: "Bonogin",
    slug: "bonogin",
    region: "hinterland",
    postcode: 4213,
    description: "Rural hinterland locality with farms and country properties. Significant tree coverage and agricultural dust require regular professional cleaning services.",
    landmarks: ["Tallebudgera National Park", "Agricultural Land", "Rainforest"],
    nearbySuburbs: ["Mudgeeraba", "Tallebudgera Valley", "Reedy Creek"]
  },
  {
    name: "Merrimac",
    slug: "merrimac",
    region: "central",
    postcode: 4226,
    description: "Suburban family neighbourhood near Robina with shops and facilities. Standard suburban properties with regular exposure to dust and weather.",
    landmarks: ["Shopping Centre", "Schools", "Parks"],
    nearbySuburbs: ["Robina", "Carrara", "Ashmore"]
  },
  {
    name: "Carrara",
    slug: "carrara",
    region: "central",
    postcode: 4226,
    description: "Established suburb between Robina and Southport. Mature properties with trees and gardens require regular professional cleaning and maintenance.",
    landmarks: ["Carrara Shopping Centre", "Parks", "Residential Areas"],
    nearbySuburbs: ["Merrimac", "Robina", "Nerang"]
  },
  {
    name: "Nerang",
    slug: "nerang",
    region: "hinterland",
    postcode: 4211,
    description: "Thriving hinterland town with river views and mixed properties. Natural surroundings with river influence require regular professional cleaning services.",
    landmarks: ["Nerang River", "Town Centre", "National Park Access"],
    nearbySuburbs: ["Carrara", "Merrimac", "Mudgeeraba"]
  },
  {
    name: "Highland Park",
    slug: "highland-park",
    region: "central",
    postcode: 4211,
    description: "Elevated suburb with views over Gold Coast. Higher altitude position exposed to more weather elements requiring professional maintenance.",
    landmarks: ["Highland Views", "Nerang River", "Parks"],
    nearbySuburbs: ["Nerang", "Gilston", "Worongary"]
  },
  {
    name: "Gilston",
    slug: "gilston",
    region: "hinterland",
    postcode: 4211,
    description: "Rural property area with acreage homes and natural surroundings. Tree coverage and natural debris require regular professional cleaning attention.",
    landmarks: ["Rural Properties", "National Park", "Scenic Views"],
    nearbySuburbs: ["Highland Park", "Worongary", "Mudgeeraba"]
  },
  {
    name: "Worongary",
    slug: "worongary",
    region: "hinterland",
    postcode: 4212,
    description: "Upmarket hinterland retreat with luxury acreage properties. Premium homes in natural surroundings require professional cleaning for maintenance.",
    landmarks: ["Scenic Properties", "Rainforest", "Mountain Views"],
    nearbySuburbs: ["Gilston", "Advancetown", "Mudgeeraba"]
  },
  {
    name: "Advancetown",
    slug: "advancetown",
    region: "hinterland",
    postcode: 4211,
    description: "Small hinterland community with rural character and natural beauty. Limited development with focus on preserving natural environment.",
    landmarks: ["Natural Bushland", "Rural Properties", "Scenic Drives"],
    nearbySuburbs: ["Worongary", "Mudgeeraba", "Bonogin"]
  },
  {
    name: "Ashmore",
    slug: "ashmore",
    region: "central",
    postcode: 4214,
    description: "Family-friendly inland suburb with schools and shopping. Well-established neighbourhood requiring regular professional window and house cleaning.",
    landmarks: ["Shopping Centre", "Schools", "Sports Facilities"],
    nearbySuburbs: ["Varsity Lakes", "Merrimac", "Benowa"]
  },
  {
    name: "Benowa",
    slug: "benowa",
    region: "central_coast",
    postcode: 4217,
    description: "Diverse suburb near Southport and beaches with mixed development. Good location with urban dust and salt air exposure requiring maintenance.",
    landmarks: ["Broadwater", "Shopping Areas", "Residential"],
    nearbySuburbs: ["Ashmore", "Bundall", "Southport"]
  },
  {
    name: "Bundall",
    slug: "bundall",
    region: "central",
    postcode: 4217,
    description: "Established suburb adjacent to major business areas and shopping. Central location with regular urban pollution and dust exposure.",
    landmarks: ["Shopping Centre", "Business District", "Broadwater Access"],
    nearbySuburbs: ["Benowa", "Robina", "Southport"]
  },
  {
    name: "Chevron Island",
    slug: "chevron-island",
    region: "central_coast",
    postcode: 4217,
    description: "Exclusive island suburb in the Broadwater with luxury waterfront properties. Premium properties require frequent professional cleaning services.",
    landmarks: ["Broadwater", "Exclusive Residences", "Water Views"],
    nearbySuburbs: ["Isle of Capri", "Southport", "Main Beach"]
  },
  {
    name: "Isle of Capri",
    slug: "isle-of-capri",
    region: "central_coast",
    postcode: 4217,
    description: "Premium waterfront suburb with Mediterranean-style properties. Luxury homes with water exposure require professional cleaning expertise.",
    landmarks: ["Broadwater", "Luxury Properties", "Canals"],
    nearbySuburbs: ["Chevron Island", "Southport", "Benowa"]
  },
  {
    name: "Clear Island Waters",
    slug: "clear-island-waters",
    region: "central_coast",
    postcode: 4217,
    description: "Exclusive island community with canal estates and luxury waterfront living. Premium waterfront properties require frequent maintenance.",
    landmarks: ["Broadwater", "Canals", "Exclusive Homes"],
    nearbySuburbs: ["Isle of Capri", "Biggera Waters", "Southport"]
  },
  {
    name: "Southport",
    slug: "southport",
    region: "central_coast",
    postcode: 4215,
    description: "Major business and entertainment hub on the Broadwater. High-rise living and commercial properties require frequent professional cleaning.",
    landmarks: ["Broadwater", "Business District", "Entertainment Venues"],
    nearbySuburbs: ["Surfers Paradise", "Benowa", "Labrador"]
  },
  {
    name: "Labrador",
    slug: "labrador",
    region: "central_coast",
    postcode: 4215,
    description: "Established suburb near Broadwater with mixed residential and commercial properties. Waterfront location with salt air exposure.",
    landmarks: ["Broadwater", "Parks", "Residential Areas"],
    nearbySuburbs: ["Southport", "Main Beach", "Biggera Waters"]
  },
  {
    name: "Biggera Waters",
    slug: "biggera-waters",
    region: "central_coast",
    postcode: 4216,
    description: "Waterfront suburb with canal estates and moderate waterside living. Water proximity creates cleaning maintenance needs requiring professional services.",
    landmarks: ["Broadwater", "Canals", "Parks"],
    nearbySuburbs: ["Clear Island Waters", "Labrador", "Runaway Bay"]
  },
  {
    name: "Runaway Bay",
    slug: "runaway-bay",
    region: "central_coast",
    postcode: 4216,
    description: "Family-oriented waterfront suburb with boat access and peaceful surroundings. Water exposure and maritime environment require regular cleaning.",
    landmarks: ["Broadwater", "Marina", "Parks"],
    nearbySuburbs: ["Biggera Waters", "Coombabah", "Paradise Point"]
  },
  {
    name: "Coombabah",
    slug: "coombabah",
    region: "northern",
    postcode: 4216,
    description: "Rapidly growing northern suburb with waterfront and hinterland properties. Expanding area with diverse properties requiring varied cleaning services.",
    landmarks: ["Broadwater", "National Park", "Waterways"],
    nearbySuburbs: ["Runaway Bay", "Paradise Point", "Hollywell"]
  },
  {
    name: "Paradise Point",
    slug: "paradise-point",
    region: "northern",
    postcode: 4216,
    description: "Exclusive waterfront community with stunning Broadwater views. Premium waterfront and hilltop properties require professional maintenance.",
    landmarks: ["Broadwater", "Lookout Point", "Luxury Homes"],
    nearbySuburbs: ["Coombabah", "Hollywell", "Hope Island"]
  },
  {
    name: "Hollywell",
    slug: "hollywell",
    region: "northern",
    postcode: 4216,
    description: "Peaceful residential suburb with mixed properties. Good location between beaches and hinterland requiring regular professional cleaning.",
    landmarks: ["Broadwater Access", "Parks", "Residential"],
    nearbySuburbs: ["Paradise Point", "Coombabah", "Hope Island"]
  },
  {
    name: "Hope Island",
    slug: "hope-island",
    region: "northern",
    postcode: 4212,
    description: "Upmarket island resort community with resort facilities and luxury homes. Premium properties and resort living require professional cleaning services.",
    landmarks: ["Resort Facilities", "Broadwater", "Golf Course"],
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
    nearbySuburbs: ["Pacific Pines", "Upper Coomera", "Hope Island"]
  },
  {
    name: "Pacific Pines",
    slug: "pacific-pines",
    region: "northern",
    postcode: 4211,
    description: "Family-oriented suburb with modern homes and community facilities. Well-planned suburb with regular window cleaning and property maintenance needs.",
    landmarks: ["Shopping Centre", "Sports Complex", "Parks"],
    nearbySuburbs: ["Helensvale", "Gaven", "Upper Coomera"]
  },
  {
    name: "Gaven",
    slug: "gaven",
    region: "northern",
    postcode: 4211,
    description: "Growing suburb with varied residential and commercial properties. Urban expansion creating steady demand for professional cleaning services.",
    landmarks: ["Shopping Areas", "Business District", "Schools"],
    nearbySuburbs: ["Pacific Pines", "Helensvale", "Oxenford"]
  },
  {
    name: "Oxenford",
    slug: "oxenford",
    region: "northern",
    postcode: 4210,
    description: "Modern suburb between Helensvale and the highway. Strategic location with diverse properties requiring regular professional maintenance.",
    landmarks: ["Highway Corridor", "Business Parks", "Residential"],
    nearbySuburbs: ["Gaven", "Coomera", "Pimpama"]
  },
  {
    name: "Coomera",
    slug: "coomera",
    region: "northern",
    postcode: 4209,
    description: "Expanding northern suburb with residential and commercial growth. River location and growing residential areas require regular cleaning services.",
    landmarks: ["Coomera River", "Shopping Centre", "Schools"],
    nearbySuburbs: ["Upper Coomera", "Oxenford", "Pimpama"]
  },
  {
    name: "Upper Coomera",
    slug: "upper-coomera",
    region: "northern",
    postcode: 4209,
    description: "Rural-residential suburb with acreage properties and natural surroundings. Tree coverage and larger properties require comprehensive cleaning services.",
    landmarks: ["Rural Properties", "Coomera River", "Natural Bushland"],
    nearbySuburbs: ["Coomera", "Helensvale", "Ormeau"]
  },
  {
    name: "Pimpama",
    slug: "pimpama",
    region: "northern",
    postcode: 4209,
    description: "Rapidly developing suburb with mixed residential and industrial areas. Urban expansion and diverse properties creating strong cleaning service demand.",
    landmarks: ["Industrial Area", "Residential Growth", "Highway Corridor"],
    nearbySuburbs: ["Oxenford", "Coomera", "Ormeau"]
  },
  {
    name: "Ormeau",
    slug: "ormeau",
    region: "northern",
    postcode: 4208,
    description: "Growing northern suburb with family homes and rural properties mixed. Diverse properties with tree coverage require regular professional maintenance.",
    landmarks: ["Town Centre", "Parks", "Rural and Urban Mix"],
    nearbySuburbs: ["Pimpama", "Ormeau Hills", "Jacobs Well"]
  },
  {
    name: "Ormeau Hills",
    slug: "ormeau-hills",
    region: "northern",
    postcode: 4208,
    description: "Elevated suburb with views and modern home developments. Hill location exposure to weather elements requiring professional cleaning services.",
    landmarks: ["Elevated Views", "Modern Homes", "Parks"],
    nearbySuburbs: ["Ormeau", "Jacobs Well", "Yatala"]
  },
  {
    name: "Jacobs Well",
    slug: "jacobs-well",
    region: "northern",
    postcode: 4208,
    description: "Semi-rural suburb with acreage properties and country homes. Natural surroundings and tree coverage requiring regular professional cleaning.",
    landmarks: ["Rural Properties", "Bushland", "Country Lifestyle"],
    nearbySuburbs: ["Ormeau", "Steiglitz", "Norwell"]
  },
  {
    name: "Steiglitz",
    slug: "steiglitz",
    region: "northern",
    postcode: 4207,
    description: "Rural locality with farmland and country properties. Agricultural environment with natural dust and debris requiring professional cleaning services.",
    landmarks: ["Farmland", "Rural Properties", "Natural Areas"],
    nearbySuburbs: ["Jacobs Well", "Norwell", "Yatala"]
  },
  {
    name: "Norwell",
    slug: "norwell",
    region: "northern",
    postcode: 4208,
    description: "Semi-rural community with acreage properties and natural bushland. Tree-covered properties with significant cleaning maintenance requirements.",
    landmarks: ["Bushland", "Acreage Properties", "Nature Reserve"],
    nearbySuburbs: ["Steiglitz", "Jacobs Well", "Yatala"]
  },
  {
    name: "Yatala",
    slug: "yatala",
    region: "northern",
    postcode: 4207,
    description: "Growing suburban and industrial hub on the Gold Coast/Brisbane border. Diverse properties with regular dust exposure requiring maintenance.",
    landmarks: ["Industrial Area", "Business Parks", "Highway"],
    nearbySuburbs: ["Ormeau Hills", "Stapylton", "Norwell"]
  },
  {
    name: "Stapylton",
    slug: "stapylton",
    region: "northern",
    postcode: 4207,
    description: "Semi-rural locality between Yatala and Brisbane. Mixed properties with agricultural and residential use requiring professional cleaning.",
    landmarks: ["Rural Areas", "Highway", "Business Parks"],
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
    nearbySuburbs: ["Tweed Heads South", "Banora Point", "Coolangatta"]
  },
  {
    name: "Tweed Heads South",
    slug: "tweed-heads-south",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Large residential NSW suburb just south of the QLD border with a mix of established homes and newer developments. Proximity to the coast means salt air and humidity still affect properties.",
    landmarks: ["Tweed City Shopping Centre", "Seagulls Club", "Boyd Street Parks"],
    nearbySuburbs: ["Tweed Heads", "Banora Point", "Terranora"]
  },
  {
    name: "Tweed Heads West",
    slug: "tweed-heads-west",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Inland NSW suburb with mixed residential and commercial development. Regular urban environment maintenance needs.",
    landmarks: ["Shopping Centre", "Schools", "Parks"],
    nearbySuburbs: ["Tweed Heads South", "Banora Point", "Bilambil"]
  },
  {
    name: "Banora Point",
    slug: "banora-point",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Picturesque locality with riverside and lakeside properties. Water proximity and natural surroundings require professional maintenance.",
    landmarks: ["Lakes", "Riverside Property", "Parkland"],
    nearbySuburbs: ["Tweed Heads West", "Terranora", "Bilambil"]
  },
  {
    name: "Terranora",
    slug: "terranora",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Peaceful residential community near border with mixed properties. Well-established neighbourhood requiring regular professional cleaning.",
    landmarks: ["Residential Areas", "Parks", "Community Centre"],
    nearbySuburbs: ["Banora Point", "Bilambil", "Cobaki"]
  },
  {
    name: "Bilambil",
    slug: "bilambil",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Semi-rural NSW community with acreage properties and natural surroundings. Tree coverage and rural environment creating cleaning needs.",
    landmarks: ["Acreage Properties", "Bushland", "Rural Setting"],
    nearbySuburbs: ["Terranora", "Bilambil Heights", "Cobaki"]
  },
  {
    name: "Bilambil Heights",
    slug: "bilambil-heights",
    region: "nsw_tweed",
    postcode: 2486,
    description: "Elevated NSW locality with scenic views and newer properties. Hilltop exposure to weather elements requiring professional maintenance.",
    landmarks: ["Scenic Views", "Modern Homes", "Bushland"],
    nearbySuburbs: ["Bilambil", "Cobaki Lakes", "Terranora"]
  },
  {
    name: "Cobaki",
    slug: "cobaki",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Riverside NSW community with mixed waterfront and inland properties. Water environment and natural settings requiring regular cleaning.",
    landmarks: ["Cobaki Broadwater", "Riverside Properties", "Cobaki Lakes"],
    nearbySuburbs: ["Bilambil", "Cobaki Lakes", "Chinderah"]
  },
  {
    name: "Cobaki Lakes",
    slug: "cobaki-lakes",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Modern waterfront community with lake views and mixed housing. Water reflection and humidity creating unique cleaning requirements.",
    landmarks: ["Lakes", "Waterfront Homes", "Community Facilities"],
    nearbySuburbs: ["Cobaki", "Chinderah", "Kingscliff"]
  },
  {
    name: "Chinderah",
    slug: "chinderah",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Scenic NSW locality with natural surroundings and mixed properties. Hinterland characteristics with tree coverage requiring maintenance.",
    landmarks: ["Scenic Surroundings", "Bushland", "Rural Areas"],
    nearbySuburbs: ["Cobaki Lakes", "Kingscliff", "Bilambil"]
  },
  {
    name: "Kingscliff",
    slug: "kingscliff",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Charming NSW beach town with strong community character. Coastal environment with salt air and beach proximity requiring professional cleaning.",
    landmarks: ["Kingscliff Beach", "Town Centre", "Headland"],
    nearbySuburbs: ["Chinderah", "Casuarina", "Salt"]
  },
  {
    name: "Casuarina",
    slug: "casuarina",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Beachfront NSW suburb with stunning coastline views. Strong coastal exposure and beach lifestyle creating cleaning maintenance needs.",
    landmarks: ["Casuarina Beach", "Headland", "Lookout"],
    nearbySuburbs: ["Kingscliff", "Salt", "Cudgen"]
  },
  {
    name: "Salt",
    slug: "salt",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Modern coastal resort community at Salt Village. Luxury beachfront properties requiring frequent professional maintenance and cleaning.",
    landmarks: ["Salt Village", "Beach Resort", "Premium Amenities"],
    nearbySuburbs: ["Casuarina", "Kingscliff", "Duranbah"]
  },
  {
    name: "Cudgen",
    slug: "cudgen",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Rural NSW locality with acreage properties and natural environment. Tree coverage and agricultural landscape requiring professional services.",
    landmarks: ["Rural Properties", "Bushland", "Natural Areas"],
    nearbySuburbs: ["Casuarina", "Duranbah", "Fingal Head"]
  },
  {
    name: "Duranbah",
    slug: "duranbah",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Small coastal hamlet with pristine beaches and natural character. Quiet, secluded location with property maintenance requirements.",
    landmarks: ["Duranbah Beach", "Secluded Coves", "Nature Reserve"],
    nearbySuburbs: ["Salt", "Cudgen", "Fingal Head"]
  },
  {
    name: "Fingal Head",
    slug: "fingal-head",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Scenic headland locality with dramatic coastline and exclusive properties. Elevated coastal position with significant weather exposure.",
    landmarks: ["Fingal Head", "Lighthouse", "Scenic Walks"],
    nearbySuburbs: ["Duranbah", "Pottsville", "Kings Forest"]
  },
  {
    name: "Kings Forest",
    slug: "kings-forest",
    region: "nsw_tweed",
    postcode: 2487,
    description: "Rural NSW community surrounded by bushland and natural forest. Natural environment with significant tree coverage and debris.",
    landmarks: ["Bushland", "Forest Areas", "Rural Properties"],
    nearbySuburbs: ["Fingal Head", "Pottsville", "Bogangar"]
  },
  {
    name: "Pottsville",
    slug: "pottsville",
    region: "nsw_tweed",
    postcode: 2489,
    description: "Peaceful NSW beach town with low-key coastal lifestyle. Beachfront properties with salt air exposure requiring regular professional cleaning.",
    landmarks: ["Pottsville Beach", "Town Centre", "Beach Access"],
    nearbySuburbs: ["Fingal Head", "Cabarita Beach", "Kings Forest"]
  },
  {
    name: "Cabarita Beach",
    slug: "cabarita-beach",
    region: "nsw_tweed",
    postcode: 2488,
    description: "Beautiful NSW beach suburb with family-friendly atmosphere. Pristine beaches with coastal salt exposure and regular maintenance needs.",
    landmarks: ["Cabarita Beach", "Beach Promenade", "Rock Pools"],
    nearbySuburbs: ["Pottsville", "Bogangar", "Hastings Point"]
  },
  {
    name: "Bogangar",
    slug: "bogangar",
    region: "nsw_tweed",
    postcode: 2488,
    description: "Scenic NSW village between Cabarita and Hastings Point. Elevated coastal position with stunning views and property maintenance needs.",
    landmarks: ["Scenic Views", "Headland", "Coastal Properties"],
    nearbySuburbs: ["Cabarita Beach", "Hastings Point", "Kings Forest"]
  },
  {
    name: "Hastings Point",
    slug: "hastings-point",
    region: "nsw_tweed",
    postcode: 2489,
    description: "Exclusive NSW headland community at the northern end of the Tweed. Premium coastal properties with significant salt air exposure.",
    landmarks: ["Hastings Point Headland", "Exclusive Homes", "Scenic Drives"],
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
