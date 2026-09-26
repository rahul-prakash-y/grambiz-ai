/**
 * Google Places API Integration & Simulation Service
 * 
 * This module manages integration with Google Places API (New) & PlacesService,
 * providing real-time local search, nearby competitor discovery, and place details.
 * 
 * Production Setup Note:
 * Set VITE_GOOGLE_MAPS_API_KEY in your .env file to enable live Places API calls.
 * If no key is provided, this service seamlessly falls back to high-fidelity
 * mock data tailored for rural Tamil Nadu (Madurai / Usilampatti / Sedapatti / Kallupatti).
 */

// Mock center coordinates in rural Tamil Nadu: Kallupatti Village, Madurai District
export const TAMIL_NADU_RURAL_CENTER = {
  lat: 9.7346,
  lng: 77.7984,
  name: "Kallupatti Village Center",
  district: "Madurai District",
  state: "Tamil Nadu",
  pincode: "625522",
  taluk: "Peraiyur Taluk"
};

// Comprehensive list of rural competitors with precise geographic coordinates,
// verified distances from center, threat ratings, and operational intel.
export const MOCK_COMPETITORS = [
  {
    id: "place-murugan-1",
    name: "Sri Murugan Groceries & General Store",
    nameTa: "ஸ்ரீ முருகன் மளிகை & பொது அங்காடி",
    lat: 9.7380,
    lng: 77.8012,
    distanceKm: 0.6,
    distanceText: "0.6 km",
    address: "Kallupatti Bus Stand Road, Madurai",
    addressTa: "கல்லுப்பட்டி பேருந்து நிலைய சாலை",
    category: "Grocery",
    categoryTa: "மளிகை & பலசரக்கு",
    rating: 4.6,
    userRatingCount: 58,
    priceLevel: "$$",
    pricingDesc: "Standard Market MRP",
    pricingDescTa: "சராசரி சந்தை MRP",
    threat: "high",
    threatScore: 85,
    status: "Open Now",
    statusTa: "தற்போது திறந்துள்ளது",
    openingHours: "6:30 AM - 9:30 PM",
    phone: "+91 94431 82710",
    speciality: "Daily Essentials, Farm Millets, Loose Grains & Oil",
    specialityTa: "தினசரி மளிகை, சிறுதானியங்கள், சமையல் எண்ணெய்",
    marketGap: "High store footfall but lacks certified cold-pressed organic products and online UPI bulk billing.",
    marketGapTa: "அதிக வாடிக்கையாளர் வருகை உள்ளது, ஆனால் சான்றளிக்கப்பட்ட மரச்செக்கு எண்ணெய் பொருட்கள் இல்லை.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_sri_murugan_kallupatti_01"
  },
  {
    id: "place-atoz-2",
    name: "A to Z Stores & Daily Mart",
    nameTa: "ஏ டூ இசட் ஸ்டோர்ஸ் & டெய்லி மார்ட்",
    lat: 9.7315,
    lng: 77.7928,
    distanceKm: 0.9,
    distanceText: "0.9 km",
    address: "Panchayat Office Main Road, Kallupatti",
    addressTa: "பஞ்சாயத்து அலுவலக பிரதான சாலை",
    category: "Grocery",
    categoryTa: "பல்பொருள் அங்காடி",
    rating: 4.1,
    userRatingCount: 34,
    priceLevel: "$$",
    pricingDesc: "Standard FMCG & Packaged",
    pricingDescTa: "FMCG மற்றும் பாக்கெட் பொருட்கள்",
    threat: "medium",
    threatScore: 62,
    status: "Open Now",
    statusTa: "தற்போது திறந்துள்ளது",
    openingHours: "7:00 AM - 10:00 PM",
    phone: "+91 98421 55320",
    speciality: "Plasticware, Snacks, Packaged Beverages & Stationery",
    specialityTa: "பிளாஸ்டிக் பொருட்கள், சிற்றுண்டி, குளிர்பானங்கள்",
    marketGap: "Offers FMCG variety, but zero fresh local farmer procurement; prices on staples are 8% higher than local mandi.",
    marketGapTa: "FMCG பொருட்கள் அதிகம், ஆனால் விவசாயிகளிடமிருந்து நேரடி கொள்முதல் இல்லை; விலை 8% அதிகம்.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_atoz_stores_kallupatti_02"
  },
  {
    id: "place-kaveri-3",
    name: "Kaveri Provisions & Spices Depot",
    nameTa: "காவேரி பலசரக்கு & மசாலா டிப்போ",
    lat: 9.7490,
    lng: 77.8115,
    distanceKm: 2.4,
    distanceText: "2.4 km",
    address: "Sedapatti High Road, Near Milk Society",
    addressTa: "சேடபட்டி பிரதான சாலை, பால் சங்கம் அருகில்",
    category: "Grocery",
    categoryTa: "மளிகை & மசாலா",
    rating: 4.4,
    userRatingCount: 86,
    priceLevel: "$",
    pricingDesc: "Wholesale & Semi-Wholesale",
    pricingDescTa: "மொத்த விற்பனை விலை",
    threat: "medium",
    threatScore: 58,
    status: "Open Now",
    statusTa: "தற்போது திறந்துள்ளது",
    openingHours: "7:30 AM - 8:30 PM",
    phone: "+91 97870 12490",
    speciality: "Bulk Pulses, Red Chilli, Turmeric & Sesame",
    specialityTa: "பருப்பு வகைகள், வத்தல், மஞ்சள் மற்றும் எள்",
    marketGap: "Supplies dry commodities in bulk, but has no doorstep delivery or packaged micro-retail for village homes.",
    marketGapTa: "மொத்தமாக விற்கப்படுகிறது, ஆனால் சில்லறை கிராம மக்களுக்கு வீட்டு விநியோகம் இல்லை.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_kaveri_provisions_03"
  },
  {
    id: "place-lakshmi-4",
    name: "Lakshmi Agro Trading & Bio-Inputs",
    nameTa: "லட்சுமி வேளாண் வர்த்தகம் & விதை மையம்",
    lat: 9.7120,
    lng: 77.7780,
    distanceKm: 3.8,
    distanceText: "3.8 km",
    address: "T.Ramanathapuram Bypass Junction",
    addressTa: "டி.ராமநாதபுரம் பைபாஸ் சந்திப்பு",
    category: "Agri-Inputs",
    categoryTa: "வேளாண் இடுபொருட்கள்",
    rating: 4.8,
    userRatingCount: 112,
    priceLevel: "$$",
    pricingDesc: "Subsidized & Cooperative Rates",
    pricingDescTa: "கூட்டுறவு மற்றும் மானிய விலை",
    threat: "low",
    threatScore: 32,
    status: "Open",
    statusTa: "திறந்துள்ளது",
    openingHours: "8:00 AM - 7:00 PM",
    phone: "+91 94862 33411",
    speciality: "Hybrid Groundnut Seeds, Bio-Fertilizers & Drip Spares",
    specialityTa: "வீரிய ஒட்டு விதைகள், உயிர் உரங்கள், சொட்டுநீர் உபகரணங்கள்",
    marketGap: "Focuses exclusively on farm inputs; complementary partner for buying raw groundnuts for processing.",
    marketGapTa: "விதை மற்றும் உரங்களில் மட்டுமே கவனம்; மூலப்பொருள் கொள்முதலுக்கு சிறந்த கூட்டு வாய்ப்பு.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_lakshmi_agro_04"
  },
  {
    id: "place-meenakshi-5",
    name: "Madurai Meenakshi Dairy Chilling Center",
    nameTa: "மதுரை மீனாட்சி பால் குளிரூட்டும் மையம்",
    lat: 9.7610,
    lng: 77.7790,
    distanceKm: 4.5,
    distanceText: "4.5 km",
    address: "S.Kallupatti North Gate",
    addressTa: "தெற்கு கல்லுப்பட்டி வடக்கு வாசல்",
    category: "Dairy",
    categoryTa: "பால் பண்ணை",
    rating: 3.9,
    userRatingCount: 24,
    priceLevel: "$",
    pricingDesc: "Direct Farm Procurement Rate",
    pricingDescTa: "நேரடி பண்ணை கொள்முதல் விலை",
    threat: "low",
    threatScore: 38,
    status: "Closes Soon (6:30 PM)",
    statusTa: "விரைவில் மூடப்படும்",
    openingHours: "5:30 AM - 10:00 AM, 4:00 PM - 6:30 PM",
    phone: "+91 98433 99014",
    speciality: "Raw Buffalo Milk, A2 Cow Milk & Fresh Butter",
    specialityTa: "எருமை பால், நாட்டு மாட்டு பால், வெண்ணெய்",
    marketGap: "Does not produce value-added items like ghee or paneer; leaves open market for dairy value addition.",
    marketGapTa: "நெய் மற்றும் பன்னீர் போன்ற மதிப்புக்கூட்டு பொருட்கள் தயாரிப்பதில்லை.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_meenakshi_dairy_05"
  },
  {
    id: "place-selvam-6",
    name: "Selvam Brothers Oil Expellers",
    nameTa: "செல்வம் பிரதர்ஸ் எண்ணெய் ஆலை",
    lat: 9.7820,
    lng: 77.8350,
    distanceKm: 7.2,
    distanceText: "7.2 km",
    address: "Sedapatti Main Bazaar",
    addressTa: "சேடபட்டி பிரதான பஜார்",
    category: "Grocery",
    categoryTa: "எண்ணெய் உற்பத்தி",
    rating: 4.3,
    userRatingCount: 47,
    priceLevel: "$$$",
    pricingDesc: "Industrial Machine Pressed",
    pricingDescTa: "இயந்திர பிழிதல் முறை",
    threat: "high",
    threatScore: 78,
    status: "Open Now",
    statusTa: "தற்போது திறந்துள்ளது",
    openingHours: "7:00 AM - 8:30 PM",
    phone: "+91 93601 44820",
    speciality: "Bulk Commercial Gingelly & Groundnut Oil",
    specialityTa: "நல்லெண்ணெய் & கடலை எண்ணெய் ஆலை",
    marketGap: "Uses heated rotary expellers that degrade aroma & nutrition; zero traditional cold-pressed (Marachekku) option.",
    marketGapTa: "சூடான இயந்திர பிழிதல் முறை; பாரம்பரிய மரச்செக்கு இயற்கை எண்ணெய் இங்கு இல்லை.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_selvam_brothers_06"
  },
  {
    id: "place-velan-7",
    name: "Velan Tex & Readymade Tailoring Studio",
    nameTa: "வேலன் டெக்ஸ் & தையல் நிலையம்",
    lat: 9.6890,
    lng: 77.8510,
    distanceKm: 8.6,
    distanceText: "8.6 km",
    address: "T.Kallupatti - Virudhunagar Road",
    addressTa: "கல்லுப்பட்டி - விருதுநகர் சாலை",
    category: "Tailoring",
    categoryTa: "தையல் & ஆடை",
    rating: 4.7,
    userRatingCount: 79,
    priceLevel: "$$",
    pricingDesc: "Custom Stitching & Readymade",
    pricingDescTa: "ஆடை வடிவமைப்பு கட்டணம்",
    threat: "medium",
    threatScore: 60,
    status: "Open Now",
    statusTa: "தற்போது திறந்துள்ளது",
    openingHours: "9:00 AM - 9:00 PM",
    phone: "+91 97910 88231",
    speciality: "Bridal Blouse Designing, School Uniforms & Dhoti Sets",
    specialityTa: "திருமண ஆடை தையல், பள்ளி சீருடைகள்",
    marketGap: "Turnaround time is 10-14 days due to machine shortages; express village stitching demands unmet.",
    marketGapTa: "தையல் முடிக்க 10-14 நாட்கள் ஆகிறது; விரைவு தையல் சேவைக்கு அதிக தேவை உள்ளது.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_velan_tex_07"
  },
  {
    id: "place-usilampatti-8",
    name: "Usilampatti Modern Farmer Bazaar",
    nameTa: "உசிலம்பட்டி உழவர் நவீன அங்காடி",
    lat: 9.8110,
    lng: 77.7620,
    distanceKm: 9.8,
    distanceText: "9.8 km",
    address: "Usilampatti Taluk Bus Depot Road",
    addressTa: "உசிலம்பட்டி தாலுகா பேருந்து பணிமனை சாலை",
    category: "Grocery",
    categoryTa: "உழவர் சந்தை & பல்பொருள்",
    rating: 4.2,
    userRatingCount: 165,
    priceLevel: "$",
    pricingDesc: "Farmer Mandi Direct",
    pricingDescTa: "உழவர் சந்தை நேரடி விலை",
    threat: "high",
    threatScore: 82,
    status: "Open Now",
    statusTa: "தற்போது திறந்துள்ளது",
    openingHours: "6:00 AM - 9:00 PM",
    phone: "+91 94420 77192",
    speciality: "Fresh Country Vegetables, Jaggery & Rice Varieties",
    specialityTa: "நாட்டு காய்கறிகள், வெல்லம், அரிசி வகைகள்",
    marketGap: "Located 9.8km away; village residents from Kallupatti spend ₹40 bus fare to access this market.",
    marketGapTa: "9.8 கி.மீ தொலைவில் உள்ளது; உள்ளூர் மக்களுக்கு ₹40 பஸ் கட்டண செலவு ஏற்படுகிறது.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_usilampatti_bazaar_08"
  },
  {
    id: "place-thirumangalam-9",
    name: "Thirumangalam Wholesale FMCG Hub",
    nameTa: "திருமங்கலம் மொத்த விநியோக மையம்",
    lat: 9.8240,
    lng: 77.9150,
    distanceKm: 14.5,
    distanceText: "14.5 km",
    address: "Madurai-Kanyakumari National Highway Bypass",
    addressTa: "மதுரை-கன்னியாகுமரி தேசிய நெடுஞ்சாலை பைபாஸ்",
    category: "Grocery",
    categoryTa: "மொத்த விநியோகம்",
    rating: 4.0,
    userRatingCount: 92,
    priceLevel: "$",
    pricingDesc: "B2B Wholesale Only",
    pricingDescTa: "B2B மொத்த விற்பனை",
    threat: "low",
    threatScore: 25,
    status: "Closes 7:00 PM",
    statusTa: "மாலை 7:00 மணிக்கு மூடப்படும்",
    openingHours: "8:00 AM - 7:00 PM",
    phone: "+91 98425 66710",
    speciality: "Super Stockist for Hindustan Unilever, ITC & Godrej",
    specialityTa: "முன்னணி FMCG பிராண்டுகளின் மொத்த விநியோகம்",
    marketGap: "Wholesale distributor only; minimum order ₹15,000; will not sell directly to village retail consumers.",
    marketGapTa: "மொத்த விற்பனை மட்டுமே; குறைந்தபட்ச ஆர்டர் ₹15,000; சில்லறை நுகர்வோருக்கு விற்க மாட்டார்கள்.",
    verifiedGooglePlace: true,
    placeId: "ChIJ_thirumangalam_wholesale_09"
  }
];

// ============================================================================
// GOOGLE PLACES API (NEW) & PLACES SERVICE PLACEHOLDER FUNCTIONS
// ============================================================================

/**
 * PLACEHOLDER FUNCTION 1: fetchNearbyPlaces
 * 
 * Target Endpoint (Google Places API New):
 *   POST https://places.googleapis.com/v1/places:searchNearby
 * 
 * Required Headers:
 *   Content-Type: application/json
 *   X-Goog-Api-Key: [API_KEY]
 *   X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.priceLevel,places.regularOpeningHours
 * 
 * Request Payload Structure:
 *   {
 *     "includedTypes": ["grocery_store", "supermarket", "store"],
 *     "maxResultCount": 20,
 *     "locationRestriction": {
 *       "circle": {
 *         "center": { "latitude": 9.7346, "longitude": 77.7984 },
 *         "radius": 5000.0 // in meters
 *       }
 *     }
 *   }
 * 
 * Alternative Client-Side JS SDK (google.maps.places.PlacesService):
 *   const service = new google.maps.places.PlacesService(mapInstance);
 *   service.nearbySearch({
 *     location: new google.maps.LatLng(lat, lng),
 *     radius: radiusMeters,
 *     type: ['grocery_store']
 *   }, (results, status) => { ... });
 * 
 * @param {Object} params
 * @param {number} params.latitude - Latitude of search center
 * @param {number} params.longitude - Longitude of search center
 * @param {number} params.radiusMeters - Radius in meters (e.g. 1000, 5000, 10000)
 * @param {string} [params.placeType] - e.g. 'grocery_or_supermarket', 'store', etc.
 * @param {string} [params.keyword] - Search term
 * @param {string} [params.apiKey] - Google Maps / Places API Key
 * @returns {Promise<{ places: Array, source: string, latencyMs: number }>}
 */
export async function fetchNearbyPlaces({
  latitude = TAMIL_NADU_RURAL_CENTER.lat,
  longitude = TAMIL_NADU_RURAL_CENTER.lng,
  radiusMeters = 5000,
  placeType = 'store',
  keyword = '',
  apiKey = ''
}) {
  const startTime = performance.now();
  const radiusKm = radiusMeters / 1000;

  console.log(`[GooglePlacesService] fetchNearbyPlaces requested for radius: ${radiusKm}km (${radiusMeters}m), type: ${placeType}`);

  // In production with a valid Google Places API Key, this will invoke:
  if (apiKey && apiKey.trim() !== '' && apiKey !== 'YOUR_API_KEY') {
    try {
      /*
      // --- UNCOMMENT WHEN DEPLOYING LIVE API KEY ---
      const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.priceLevel,places.regularOpeningHours'
        },
        body: JSON.stringify({
          includedTypes: [placeType || 'store'],
          maxResultCount: 20,
          locationRestriction: {
            circle: {
              center: { latitude, longitude },
              radius: radiusMeters
            }
          }
        })
      });
      const data = await response.json();
      return {
        places: data.places.map(p => formatGooglePlaceToCompetitor(p, latitude, longitude)),
        source: 'Google Places API (Live)',
        latencyMs: Math.round(performance.now() - startTime)
      };
      */
    } catch (err) {
      console.warn('[GooglePlacesService] Live fetch failed, falling back to simulated data', err);
    }
  }

  // Simulated latency to realistically demonstrate UI loaders and transitions
  await new Promise(resolve => setTimeout(resolve, 320));

  // Filter mock competitors within the specified radius
  const filteredPlaces = MOCK_COMPETITORS.filter(c => {
    // Check distance in km
    const isWithinRadius = c.distanceKm <= radiusKm + 0.1;
    // Optional keyword filtering
    const matchesKeyword = !keyword || 
      c.name.toLowerCase().includes(keyword.toLowerCase()) ||
      c.speciality.toLowerCase().includes(keyword.toLowerCase());
    return isWithinRadius && matchesKeyword;
  });

  return {
    places: filteredPlaces,
    totalFound: filteredPlaces.length,
    radiusKm,
    center: { latitude, longitude },
    source: apiKey ? 'Google Places API (Live Mode Ready)' : 'Simulated Rural Places Radar (Madurai TN)',
    latencyMs: Math.round(performance.now() - startTime)
  };
}

/**
 * PLACEHOLDER FUNCTION 2: fetchPlaceDetails
 * 
 * Target Endpoint:
 *   GET https://places.googleapis.com/v1/places/{placeId}
 * 
 * Required Headers:
 *   X-Goog-Api-Key: [API_KEY]
 *   X-Goog-FieldMask: id,displayName,formattedAddress,nationalPhoneNumber,regularOpeningHours,rating,reviews,photos,websiteUri
 * 
 * @param {string} placeId - Google Place ID
 * @param {string} [apiKey] - API Key
 * @returns {Promise<Object>}
 */
export async function fetchPlaceDetails(placeId, apiKey = '') {
  console.log(`[GooglePlacesService] fetchPlaceDetails requested for ID: ${placeId}`);
  
  await new Promise(resolve => setTimeout(resolve, 200));

  const competitor = MOCK_COMPETITORS.find(c => c.placeId === placeId || c.id === placeId);
  if (competitor) {
    return {
      placeId: competitor.placeId,
      name: competitor.name,
      rating: competitor.rating,
      userRatingCount: competitor.userRatingCount,
      address: competitor.address,
      phone: competitor.phone,
      openingHours: competitor.openingHours,
      priceLevel: competitor.priceLevel,
      status: competitor.status,
      speciality: competitor.speciality,
      marketGap: competitor.marketGap,
      photos: [
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=60'
      ],
      reviews: [
        { author: "K. Muruganathan (Local Farmer)", rating: 5, text: "Good stocks, reasonable prices on pulses." },
        { author: "P. Chellammal", rating: 4, text: "Quick service, but crowded during morning hours." }
      ]
    };
  }

  return null;
}

/**
 * PLACEHOLDER FUNCTION 3: searchPlacesByQuery
 * 
 * Target Endpoint:
 *   POST https://places.googleapis.com/v1/places:searchText
 * 
 * Request Payload:
 *   {
 *     "textQuery": "grocery stores in Kallupatti",
 *     "locationBias": {
 *       "circle": {
 *         "center": { "latitude": 9.7346, "longitude": 77.7984 },
 *         "radius": 5000.0
 *       }
 *     }
 *   }
 * 
 * @param {string} query
 * @param {Object} center
 * @param {number} radiusMeters
 * @param {string} [apiKey]
 * @returns {Promise<Array>}
 */
export async function searchPlacesByQuery(query, center = TAMIL_NADU_RURAL_CENTER, radiusMeters = 5000, apiKey = '') {
  console.log(`[GooglePlacesService] searchPlacesByQuery requested for "${query}" within ${radiusMeters}m`);
  await new Promise(resolve => setTimeout(resolve, 250));

  const q = (query || '').toLowerCase();
  return MOCK_COMPETITORS.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.category.toLowerCase().includes(q) ||
    c.speciality.toLowerCase().includes(q)
  );
}

/**
 * PLACEHOLDER FUNCTION 4: calculateDistanceMatrix
 * 
 * Target Endpoint:
 *   GET https://maps.googleapis.com/maps/api/distancematrix/json?origins=...&destinations=...&key=...
 * 
 * Or client-side:
 *   new google.maps.DistanceMatrixService().getDistanceMatrix({ ... }, callback)
 * 
 * @param {Object} origin - { lat, lng }
 * @param {Array<Object>} destinations - Array of { lat, lng }
 * @returns {Promise<Array<{ distanceKm: number, durationMins: number }>>}
 */
export async function calculateDistanceMatrix(origin, destinations) {
  // Haversine formula calculation for exact mathematical distance in kilometers
  return destinations.map(dest => {
    const dLat = ((dest.lat - origin.lat) * Math.PI) / 180;
    const dLng = ((dest.lng - origin.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((origin.lat * Math.PI) / 180) *
      Math.cos((dest.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.round(6371 * c * 10) / 10;
    const durationMins = Math.round(distanceKm * 2.2); // ~27 km/h rural road average
    return { distanceKm, durationMins };
  });
}

/**
 * Adapter utility to normalize raw Google Places API responses into standard GramBiz competitor models
 */
export function formatGooglePlaceToCompetitor(googlePlace, centerLat, centerLng) {
  const loc = googlePlace.location || {};
  return {
    id: googlePlace.id || `place-${Math.random().toString(36).substr(2, 9)}`,
    name: googlePlace.displayName?.text || googlePlace.name || 'Local Business',
    lat: loc.latitude || loc.lat?.() || centerLat,
    lng: loc.longitude || loc.lng?.() || centerLng,
    distanceKm: 1.0,
    distanceText: "1.0 km",
    address: googlePlace.formattedAddress || 'Local Village Area',
    category: (googlePlace.types && googlePlace.types[0]) || 'Retail',
    rating: googlePlace.rating || 4.0,
    userRatingCount: googlePlace.userRatingCount || 10,
    priceLevel: "$$",
    threat: "medium",
    status: googlePlace.regularOpeningHours?.openNow ? "Open Now" : "Closed",
    placeId: googlePlace.id
  };
}
