export const mockData = {
  trendingIdeas: [
    {
      id: "idea-1",
      titleEn: "Organic Cold-Pressed Groundnut & Sesame Oil Mill",
      titleTa: "மரச்செக்கு கடலை & நல்லெண்ணெய் உற்பத்தி ஆலை",
      categoryEn: "Agro-Processing",
      categoryTa: "வேளாண் பதப்படுத்துதல்",
      setupCost: "₹4,80,000",
      monthlyProfit: "₹58,000",
      demandLevel: "Very High",
      demandLevelTa: "மிக அதிகம்",
      payback: "9 months",
      paybackTa: "9 மாதங்கள்",
      subsidy: "35% PMEGP",
      badgeColor: "badge-success",
      icon: "droplet",
      highlightsEn: ["Abundant local groundnut farming", "Zero organic competitors in 15km", "High export to nearby towns"],
      highlightsTa: ["அதிக உள்ளூர் கடலை சாகுபடி", "15 கி.மீ-ல் போட்டி ஆலை இல்லை", "அருகிலுள்ள நகரங்களுக்கு நேரடி விற்பனை"]
    },
    {
      id: "idea-2",
      titleEn: "Multi-Millet Value Addition & Flour Packing Unit",
      titleTa: "சிறுதானிய மதிப்புக்கூட்டு & மாவு பேக்கிங் பிரிவு",
      categoryEn: "Food Tech",
      categoryTa: "உணவுத் தொழில்நுட்பம்",
      setupCost: "₹3,50,000",
      monthlyProfit: "₹46,500",
      demandLevel: "High Growth",
      demandLevelTa: "அதிவேக வளர்ச்சி",
      payback: "8 months",
      paybackTa: "8 மாதங்கள்",
      subsidy: "35% PMFME",
      badgeColor: "badge-primary",
      icon: "wheat",
      highlightsEn: ["NABARD millet cluster subsidy", "Rising urban health product demand", "Low electricity footprint"],
      highlightsTa: ["நபார்டு சிறுதானிய மானியம்", "நகர்ப்புறங்களில் ஆரோக்கிய உணவு தேவை", "குறைந்த மின்சார பயன்பாடு"]
    },
    {
      id: "idea-3",
      titleEn: "Solar-Powered Micro Cold Storage (5 Ton Capacity)",
      titleTa: "சூரிய ஒளி மின்சார நுண் குளிர்பதனக் கிடங்கு",
      categoryEn: "Agri-Infrastructure",
      categoryTa: "வேளாண் கட்டமைப்பு",
      setupCost: "₹7,20,000",
      monthlyProfit: "₹72,000",
      demandLevel: "Critical Need",
      demandLevelTa: "அத்தியாவசிய தேவை",
      payback: "14 months",
      paybackTa: "14 மாதங்கள்",
      subsidy: "50% Agri Infra Fund",
      badgeColor: "badge-warning",
      icon: "sun",
      highlightsEn: ["Prevents post-harvest vegetable spoilage", "Daily rental model for farmers", "Government green energy rebate"],
      highlightsTa: ["காய்கறி அழுகுவதைத் தடுக்கிறது", "விவசாயிகளுக்கு தினசரி வாடகை முறை", "பசுமை எரிசக்தி மானியம்"]
    },
    {
      id: "idea-4",
      titleEn: "Banana Pseudostem Fiber Extraction & Craft Unit",
      titleTa: "வாழை நார் பிரித்தெடுத்தல் மற்றும் கைவினைப் பிரிவு",
      categoryEn: "Rural Artisans & Eco",
      categoryTa: "சுற்றுச்சூழல் & கைவினை",
      setupCost: "₹2,20,000",
      monthlyProfit: "₹34,000",
      demandLevel: "Export Ready",
      demandLevelTa: "ஏற்றுமதி வாய்ப்பு",
      payback: "6 months",
      paybackTa: "6 மாதங்கள்",
      subsidy: "35% KVIC",
      badgeColor: "badge-info",
      icon: "sprout",
      highlightsEn: ["Zero raw material cost (farm waste)", "High demand for eco-bags", "Women SHG employment potential"],
      highlightsTa: ["மூலப்பொருள் இலவசம் (வாழைக் கழிவு)", "சுற்றுச்சூழல் பைகளுக்கு நல்ல மவுசு", "சுய உதவிக்குழு பெண்களுக்கு வேலை"]
    }
  ],

  marketPrices: [
    { commodityEn: "Groundnut (Pods)", commodityTa: "நிலக்கடலை", price: "₹7,450 / Qtl", change: "+4.2%", trend: "up" },
    { commodityEn: "Sesame (White)", commodityTa: "வெள்ளை எள்", price: "₹14,200 / Qtl", change: "+1.8%", trend: "up" },
    { commodityEn: "Barnyard Millet (Kuthiraivali)", commodityTa: "குதிரைவாலி", price: "₹4,100 / Qtl", change: "+6.5%", trend: "up" },
    { commodityEn: "Paddy (Ponni)", commodityTa: "பொன்னி நெல்", price: "₹2,680 / Qtl", change: "-0.5%", trend: "down" },
    { commodityEn: "Dry Red Chilli (Sannam)", commodityTa: "வத்தல் மிளகாய்", price: "₹22,500 / Qtl", change: "+3.1%", trend: "up" },
    { commodityEn: "Coconut (Grade A)", commodityTa: "தேங்காய்", price: "₹29 / Kg", change: "+0.8%", trend: "up" }
  ],

  competitorsList: [
    {
      id: "comp-1",
      name: "Murugan Agro Processing",
      distance: "4.2 km (Sedapatti Road)",
      categoryEn: "Flour & Pulverizing",
      categoryTa: "மாவு ஆலை",
      pricing: "Standard Market",
      pricingTa: "சராசரி சந்தை விலை",
      densityEn: "Medium Density",
      densityTa: "மிதமான போட்டி",
      threat: "medium",
      statusEn: "Operational (Single Shift)",
      statusTa: "செயல்பாட்டில் உள்ளது (ஒற்றை ஷிப்ட்)"
    },
    {
      id: "comp-2",
      name: "Sri Lakshmi Oil Expellers",
      distance: "14.8 km (Usilampatti Junction)",
      categoryEn: "Refined Oil Extraction",
      categoryTa: "சுத்திகரிக்கப்பட்ட எண்ணெய் ஆலை",
      pricing: "High (Bulk Industrial)",
      pricingTa: "அதிகம் (மொத்த விற்பனை)",
      densityEn: "Low (No Cold Press)",
      densityTa: "குறைவு (மரச்செக்கு இல்லை)",
      threat: "low",
      statusEn: "Only supplies chemical refined oils",
      statusTa: "மரச்செக்கு எண்ணெய் தயாரிக்கவில்லை"
    },
    {
      id: "comp-3",
      name: "Vaigai Farm Equipment Center",
      distance: "8.5 km (T.Kallupatti)",
      categoryEn: "Farm Machinery Rental",
      categoryTa: "வேளாண் இயந்திர வாடகை",
      pricing: "Affordable",
      pricingTa: "குறைந்த கட்டணம்",
      densityEn: "High (2 Tractor units)",
      densityTa: "அதிக போட்டி (2 டிராக்டர்கள்)",
      threat: "high",
      statusEn: "Well established in custom hiring",
      statusTa: "அதிக வாடிக்கையாளர்கள் உள்ளனர்"
    },
    {
      id: "comp-4",
      name: "Kaveri Spices & Packaging",
      distance: "18.2 km (Tirumangalam Road)",
      categoryEn: "Spices & Powders",
      categoryTa: "மசாலா தூள் பேக்கிங்",
      pricing: "Premium Retail",
      pricingTa: "பிரீமியம் சில்லறை விலை",
      densityEn: "Low in rural pockets",
      densityTa: "கிராமப்புறங்களில் குறைவு",
      threat: "low",
      statusEn: "Targeting district town shops",
      statusTa: "நகர கடைகளை மட்டுமே இலக்காகக் கொண்டது"
    }
  ],

  reportsList: [
    {
      id: "rep-101",
      titleEn: "Detailed Project Report (DPR): Organic Wood-Pressed Oil Mill",
      titleTa: "விரிவான திட்ட அறிக்கை: மரச்செக்கு எண்ணெய் உற்பத்தி ஆலை",
      scheme: "PMEGP Rural (35% Subsidy)",
      bank: "State Bank of India - Kallupatti Branch",
      date: "24 Sep 2026",
      cost: "₹4,80,000",
      status: "ready",
      statusEn: "Bank Ready",
      statusTa: "வங்கிக்கு தயார்",
      score: "94/100"
    },
    {
      id: "rep-102",
      titleEn: "Viability Audit: 5-Ton Solar Cold Room for Onion & Vegetables",
      titleTa: "சாத்தியக்கூறு தணிக்கை: 5-டன் சூரிய ஒளி குளிர்பதனக் கிடங்கு",
      scheme: "Agriculture Infrastructure Fund (AIF)",
      bank: "Canara Bank - Usilampatti",
      date: "18 Sep 2026",
      cost: "₹7,20,000",
      status: "ready",
      statusEn: "Bank Ready",
      statusTa: "வங்கிக்கு தயார்",
      score: "89/100"
    },
    {
      id: "rep-103",
      titleEn: "Micro Enterprise Plan: Banana Fiber Extraction Unit",
      titleTa: "நுண் தொழில் திட்டம்: வாழை நார் பிரித்தெடுக்கும் பிரிவு",
      scheme: "KVIC - Gramodyog Rozgar Yojana",
      bank: "Tamil Nadu Grama Bank",
      date: "10 Sep 2026",
      cost: "₹2,20,000",
      status: "draft",
      statusEn: "Draft Review",
      statusTa: "வரைவு நிலை",
      score: "82/100"
    }
  ],

  notifications: [
    {
      id: "notif-1",
      titleEn: "New PMEGP 35% Rural Subsidy Tranche Open",
      titleTa: "புதிய PMEGP 35% கிராமப்புற மானிய ஒதுக்கீடு துவக்கம்",
      time: "20 min ago",
      timeTa: "20 நிமிடம் முன்",
      unread: true
    },
    {
      id: "notif-2",
      titleEn: "Groundnut mandi price surged +4.2% today",
      titleTa: "நிலக்கடலை மண்டி விலை இன்று +4.2% உயர்ந்துள்ளது",
      time: "2 hours ago",
      timeTa: "2 மணி நேரம் முன்",
      unread: true
    },
    {
      id: "notif-3",
      titleEn: "AI Competitor Radar: Zero cold press mills in 15km",
      titleTa: "போட்டி ரேடார்: 15 கி.மீ-ல் மரச்செக்கு ஆலைகள் இல்லை",
      time: "1 day ago",
      timeTa: "1 நாள் முன்",
      unread: false
    }
  ]
};
