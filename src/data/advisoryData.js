import { 
  TrendingUp, 
  Store, 
  Sprout, 
  Milk, 
  Users, 
  Truck, 
  DollarSign, 
  Landmark, 
  Calendar, 
  Smartphone
} from 'lucide-react';

export const ADVISORY_DATA = {
  // Category-specific SWOT Analyses
  swotByCategory: {
    'Grocery': {
      strengths: [
        {
          text: "Guaranteed daily household cash flow with recurring demand for staples, cooking oils, and pulses.",
          tamilPlaceholder: "அத்தியாவசிய மளிகைப் பொருட்கள், சமையல் எண்ணெய் மற்றும் பருப்பு வகைகளிலிருந்து தினசரி நிலையான பணப்புழக்கம்.",
          impact: "High Liquidity",
          impactTa: "அதிக பணப்புழக்கம்"
        },
        {
          text: "Direct procurement tie-ups with Kallupatti farm gate producers reduces vegetable and onion wholesale costs by 18%.",
          tamilPlaceholder: "கல்லுப்பட்டி உள்ளூர் விவசாயிகளிடமிருந்து காய்கறிகளை நேரடியாகப் கொள்முதல் செய்வதால் 18% மொத்த கொள்முதல் செலவு மிச்சம்.",
          impact: "+18% Margin Edge",
          impactTa: "+18% கூடுதல் லாபம்"
        },
        {
          text: "Entrenched multi-generational trust and personal neighborhood rapport across 400+ village families.",
          tamilPlaceholder: "400-க்கும் மேற்பட்ட கிராமக் குடும்பங்களுடன் பல தலைமுறை நன்மதிப்பு மற்றும் நேரடி வாடிக்கையாளர் தொடர்பு.",
          impact: "Customer Stickiness",
          impactTa: "நம்பிக்கையான வாடிக்கையாளர்கள்"
        },
        {
          text: "Minimal product obsolescence risk on sealed dry provisions, grains, and non-perishable FMCG inventory.",
          tamilPlaceholder: "பேக் செய்யப்பட்ட உலர் தானியங்கள் மற்றும் அன்றாடப் பொருட்களில் காலாவதியாகும் இழப்பு மிகக் குறைவு.",
          impact: "Low Spoilage",
          impactTa: "குறைந்த சேதம்"
        }
      ],
      weaknesses: [
        {
          text: "Local villager expectation for credit ledger purchases ('Udhaar' book) locks up 15-20% of monthly operating capital.",
          tamilPlaceholder: "கிராம மக்களின் கடன் (உதார்) வாங்கும் பழக்கத்தால் 15-20% வரை மாதாந்திர நடைமுறை மூலதனம் முடங்கும் வாய்ப்பு.",
          impact: "Working Capital Strain",
          impactTa: "மூலதன முடக்கம்"
        },
        {
          text: "Floor area limitation (250 sq.ft standard rural shop) caps bulk sack procurement and visual commodity displays.",
          tamilPlaceholder: "250 சதுர அடி சிறிய கடை இடம் காரணமாக அதிக அளவிலான தானிய மூட்டைகளை அடுக்கி வைப்பதில் இடப்பற்றாக்குறை.",
          impact: "Storage Constraint",
          impactTa: "இடப்பற்றாக்குறை"
        },
        {
          text: "Vulnerability to unannounced rural power cuts requires battery backup or solar inverter for dairy coolers.",
          tamilPlaceholder: "கிராமப்புற மின்தடையால் பால், குளிர்பானங்கள் கெட்டுப்போகாமல் பாதுகாக்க பேட்டரி இன்வெர்ட்டர் தேவை.",
          impact: "Power Reliability Risk",
          impactTa: "மின்சார நம்பகத்தன்மை"
        },
        {
          text: "Manual billing without barcode POS leads to stock shrinkage and delayed reconciliation during evening rush hours.",
          tamilPlaceholder: "பார்கோடு பில்லிங் இல்லாததால் மாலை நேர நெரிசலில் இருப்பு மேலாண்மை மற்றும் வரவு செலவு கணக்கில் தாமதம்.",
          impact: "Admin Overhead",
          impactTa: "கணக்கு மேலாண்மை சவால்"
        }
      ],
      opportunities: [
        {
          text: "WhatsApp broadcast ordering with doorstep delivery to elder households across 4 peripheral hamlets.",
          tamilPlaceholder: "வாட்ஸ்அப் மூலம் ஆர்டர்களைப் பெற்று முதியோர் மற்றும் சுற்றியுள்ள குக்கிராமங்களுக்கு வீட்டுக்கே டெலிவரி செய்யும் வசதி.",
          impact: "+25% Order Basket",
          impactTa: "+25% கூடுதல் விற்பனை"
        },
        {
          text: "Value-added custom bagging of native Madurai millets (Thinai, Kuthiraivali) commanding 35% premium retail margins.",
          tamilPlaceholder: "உள்ளூர் சிறுதானியங்களை (தினை, குதிரைவாலி) கவர்ச்சிகரமான 500g பாக்கெட்டுகளில் அடைத்து 35% கூடுதல் லாபம் பெறுதல்.",
          impact: "High-Margin Segment",
          impactTa: "அதிக லாப வரம்பு"
        },
        {
          text: "Eligible for 25% - 35% PMEGP / UYEGP government subsidy to finance modern digital POS and commercial refrigeration.",
          tamilPlaceholder: "நவீன டிஜிட்டல் பில்லிங் மற்றும் குளிர்சாதன பெட்டி வாங்க 35% வரை PMEGP அரசு மானியத்தைப் பெறும் வாய்ப்பு.",
          impact: "Govt Capital Grant",
          impactTa: "அரசு மூலதன மானியம்"
        },
        {
          text: "Tie-up with local Women Self-Help Groups (SHGs) for exclusive retail shelf placement of homemade appalams and masalas.",
          tamilPlaceholder: "சுய உதவிக் குழு பெண்கள் தயாரிக்கும் அப்பளம், வீட்டு மசாலா பொடிகளை பிரத்யேகமாக விற்று கூடுதல் வருமானம் ஈட்டுதல்.",
          impact: "Hyperlocal Sourcing",
          impactTa: "உள்ளூர் தயாரிப்பு விற்பனை"
        }
      ],
      threats: [
        {
          text: "Wholesale commodity price volatility during deficient monsoons affecting pulses, groundnut oil, and sugar margins.",
          tamilPlaceholder: "மழைக்கால பற்றாக்குறையால் சமையல் எண்ணெய், பருப்பு மற்றும் சர்க்கரையின் மொத்த விலைகளில் திடீர் ஏற்ற இறக்கம்.",
          impact: "Input Price Shocks",
          impactTa: "விலை ஏற்ற இறக்கம்"
        },
        {
          text: "High street density: 3 traditional provision shops already operating near Kallupatti bus terminus.",
          tamilPlaceholder: "கல்லுப்பட்டி பேருந்து நிலையப் பகுதியில் ஏற்கனவே இயங்கும் 3 பாரம்பரிய மளிகைக் கடைகளின் நேரடிப் போட்டி.",
          impact: "Price Competition",
          impactTa: "விலை போட்டி"
        },
        {
          text: "Expanding mini-supermarkets on the Madurai-Theni highway attracting commuter vehicular basket sizes.",
          tamilPlaceholder: "மதுரை-தேனி நெடுஞ்சாலையில் பெருகிவரும் மினி சூப்பர் மார்க்கெட்டுகள் இருசக்கர, நான்கு சக்கர வாகன பயணிகளை ஈர்த்தல்.",
          impact: "Basket Cannibalization",
          impactTa: "வாடிக்கையாளர் இழப்பு"
        },
        {
          text: "Shift towards heavily advertised multinational FMCG packaged goods offering shrinking retailer dealer margins (under 6%).",
          tamilPlaceholder: "பன்னாட்டு பிராண்டட் பொருட்களுக்கு மக்கள் மாறுவதால் சில்லறை வணிகரின் விநியோக லாப வரம்பு 6%-க்கும் கீழ் குறைதல்.",
          impact: "Margin Compression",
          impactTa: "லாப வரம்பு சுருங்குதல்"
        }
      ]
    },
    'Tailoring': {
      strengths: [
        {
          text: "Superior gross margin potential of 38% - 50% on custom bridal blouse stitching, embroidery, and festive apparel.",
          tamilPlaceholder: "மணப்பெண் ஆடை வடிவமைப்பு, ஆரி எம்பிராய்டரி மற்றும் விசேஷ உடைகளில் 38% முதல் 50% வரை மிக உயர்ந்த லாப வரம்பு.",
          impact: "High Net Margin",
          impactTa: "அதிக நிகர லாபம்"
        },
        {
          text: "Predictable, bulk-cash revenue contracts for government, panchayat, and private school uniforms every May-July.",
          tamilPlaceholder: "ஒவ்வொரு ஆண்டும் மே-ஜூலை மாதங்களில் அரசு மற்றும் தனியார் பள்ளி சீருடைகளை தைப்பதற்கான மொத்த ஆர்டர்கள்.",
          impact: "Seasonal Anchor Revenue",
          impactTa: "பருவகால மொத்த வருமானம்"
        },
        {
          text: "Minimal monthly raw-material working capital required since clients generally supply their own base fabrics.",
          tamilPlaceholder: "வாடிக்கையாளர்களே துணிகளை வழங்குவதால், நூல் மற்றும் பொத்தான்களைத் தவிர ஆரம்ப மூலதனச் செலவு மிகக் குறைவு.",
          impact: "Low Working Capital",
          impactTa: "குறைந்த மூலதன தேவை"
        },
        {
          text: "Low recurring electricity consumption using modern servo-motor energy-efficient industrial stitchers.",
          tamilPlaceholder: "நவீன செர்வோ மோட்டார் தையல் இயந்திரங்கள் மூலம் மிகக் குறைந்த மின்சாரச் செலவு மற்றும் சத்தமில்லா இயக்கம்.",
          impact: "Low Overhead",
          impactTa: "குறைந்த பராமரிப்பு செலவு"
        }
      ],
      weaknesses: [
        {
          text: "Severe seasonal workload compression around Deepavali, Pongal, and school reopening demanding 14-hour workdays.",
          tamilPlaceholder: "தீபாவளி, பொங்கல் மற்றும் பள்ளி திறப்பு காலங்களில் வேலைப்பளு அதிகமாகி இரவு வரை உழைக்க வேண்டிய சூழல்.",
          impact: "Capacity Bottleneck",
          impactTa: "பணிச்சுமை நெரிசல்"
        },
        {
          text: "Scarcity of skilled button-hole and computerized Aari-work craftswomen available for hiring in rural hamlets.",
          tamilPlaceholder: "கிராமப்புறங்களில் ஆரி வேலைப்பாடு மற்றும் நவீன தையல் கலைஞர்களை பணியமர்த்துவதில் நிலவும் ஆட்கள் பற்றாக்குறை.",
          impact: "Skill Dependency",
          impactTa: "திறமையான ஆட்கள் பற்றாக்குறை"
        },
        {
          text: "Higher upfront capital expenditure required for 4-thread overlock and steam finishing presses.",
          tamilPlaceholder: "4-நூல் ஓவர்லாக் மற்றும் தொழில்முறை நீராவி அயர்ன் டேபிள் வாங்குவதற்கு ஆரம்ப முதலீடு அதிகம் தேவைப்படுதல்.",
          impact: "Equipment Capex",
          impactTa: "இயந்திர முதலீட்டு தேவை"
        },
        {
          text: "Customer fitment dissatisfaction risk necessitating unpaid alteration re-work cycles.",
          tamilPlaceholder: "அளவு சரியில்லை என வாடிக்கையாளர்கள் கூறும் போது மறு தையல் செய்வதற்கு கூடுதல் நேரம் விரயமாதல்.",
          impact: "Rework Cost",
          impactTa: "மறுவேலை விரயம்"
        }
      ],
      opportunities: [
        {
          text: "Launching digital catalog design consultations via tablet or smartphone showcasing trendy South Indian patterns.",
          tamilPlaceholder: "ஸ்மார்ட்போன் அல்லது டேப்லெட் மூலம் நவீன ஆடை டிசைன்களை வாடிக்கையாளர்களுக்கு காட்டி ஆர்டர் எடுக்கும் வசதி.",
          impact: "+40% Premium Fee",
          impactTa: "+40% கூடுதல் கட்டணம்"
        },
        {
          text: "Availing 35% PMEGP special women entrepreneur subsidy with zero processing fee and subsidized power.",
          tamilPlaceholder: "மகளிர் மற்றும் கிராமப்புற தொழில்முனைவோருக்கான 35% PMEGP மானியத்தைப் பெற்று நவீன அலகை அமைத்தல்.",
          impact: "35% Govt Grant",
          impactTa: "35% அரசு மானியம்"
        },
        {
          text: "Partnering with Tirumangalam and Madurai apparel boutiques for subcontracted overflow finishing jobs.",
          tamilPlaceholder: "மதுரை மற்றும் திருமங்கலம் நகர பூட்டிக் கடைகளிடமிருந்து உதிரி வேலைப்பாடுகளை பெற்று வருமானம் பெருக்குதல்.",
          impact: "Off-Season Volume",
          impactTa: "ஆண்டு முழுதும் வேலை"
        },
        {
          text: "Introducing upcycled cloth shopping bag stitching to replace banned single-use plastic covers for local stores.",
          tamilPlaceholder: "பிளாஸ்டிக் தடைக்கு மாற்றாக மளிகைக் கடைகளுக்கு பருத்தி துணிப்பைகளை தைத்து வழங்கும் புதிய வணிக வாய்ப்பு.",
          impact: "Eco-Diversification",
          impactTa: "சுற்றுச்சூழல் மாற்று தொழில்"
        }
      ],
      threats: [
        {
          text: "Aggressive penetration of low-cost ready-made garment markets from Tirupur and Surat in weekly village shandies.",
          tamilPlaceholder: "வாரச் சந்தைகளில் திருப்பூர் மற்றும் சூரத் குறைந்த விலை ரெடிமேட் ஆடைகளின் வரத்து அதிகரிப்பு.",
          impact: "Readymade Price Pressure",
          impactTa: "ரெடிமேட் ஆடை போட்டி"
        },
        {
          text: "Talent poaching where trained assistant tailors open competing shops in adjoining panchayat streets.",
          tamilPlaceholder: "பயிற்சி பெற்ற தையல் உதவியாளர்கள் அருகில் சென்று புதிய கடைகளைத் தொடங்குவதால் ஏற்படும் போட்டி.",
          impact: "Retention Vulnerability",
          impactTa: "பணியாளர் வெளியேற்றம்"
        },
        {
          text: "Rapid fashion trend turnover in synthetic fabrics requiring continuous master cutter re-skilling.",
          tamilPlaceholder: "ஆடை பாணி மாற்றங்களுக்கு ஏற்ப கட்டிங் மற்றும் டிசைனிங் முறைகளை தொடர்ந்து கற்றுக்கொள்வது அவசியம்.",
          impact: "Trend Obsolescence",
          impactTa: "மாறும் பேஷன் பாணி"
        },
        {
          text: "Fluctuating costs of zardozi stones, specialized lace borders, and high-tensile threads from Madurai markets.",
          tamilPlaceholder: "ஆரி கற்கள், லேஸ் பார்டர்கள் மற்றும் தரமான நூல்களின் விலைகள் மதுரை மொத்த சந்தையில் உயர்வது.",
          impact: "Consumable Inflation",
          impactTa: "மூலப்பொருள் விலை உயர்வு"
        }
      ]
    },
    'Agri-Inputs': {
      strengths: [
        {
          text: "Captive customer base: 2,400+ farming acres under active paddy, groundnut, and cotton cultivation within 8km.",
          tamilPlaceholder: "8 கி.மீ சுற்றளவில் 2,400 ஏக்கர் பரப்பளவில் நெல், நிலக்கடலை மற்றும் பருத்தி சாகுபடி செய்யும் நிலையான விவசாயிகள் பரப்பு.",
          impact: "High Captive Demand",
          impactTa: "நிலையான விவசாய வாடிக்கையாளர்கள்"
        },
        {
          text: "Repeat seasonal purchases of certified hybrid seeds, bio-fertilizers, and micronutrients every sowing cycle.",
          tamilPlaceholder: "ஒவ்வொரு நடவுப் பருவத்திலும் சான்றளிக்கப்பட்ட விதைகள், உயிர் உரங்கள் மற்றும் நுண்ணூட்டச் சத்துக்களின் தொடர் விற்பனை.",
          impact: "Predictable Cycles",
          impactTa: "பருவகால தொடர் வருமானம்"
        },
        {
          text: "High average transaction value (₹2,500 - ₹8,000 per farmer invoice) yielding high gross receipts.",
          tamilPlaceholder: "ஒரு விவசாயிக்கு சராசரியாக ₹2,500 முதல் ₹8,000 வரை விற்பனை ரசீது உருவாவதால் அதிக மொத்த பணப்புழக்கம்.",
          impact: "High Ticket Value",
          impactTa: "அதிக மதிப்புள்ள விற்பனை"
        },
        {
          text: "Direct institutional dealership tie-ups with leading cooperatives like IFFCO, TANFED, and certified seed breeders.",
          tamilPlaceholder: "இப்கோ (IFFCO), டான்பெட் (TANFED) மற்றும் அரசு விதை நிறுவனங்களுடன் நேரடி விநியோகஸ்தர் ஒப்பந்தம்.",
          impact: "Authorized Distributor",
          impactTa: "அரசு அங்கீகாரம்"
        }
      ],
      weaknesses: [
        {
          text: "Mandatory retail seed, fertilizer, and pesticide licensing required from District Joint Director of Agriculture.",
          tamilPlaceholder: "மாவட்ட வேளாண்மை இணை இயக்குநரிடமிருந்து விதை, உரம் மற்றும் பூச்சிக்கொல்லி உரிமங்கள் பெறுவது கட்டாயம்.",
          impact: "Regulatory Barrier",
          impactTa: "அரசு உரிம நிபந்தனை"
        },
        {
          text: "High working capital commitment required to stock bulk bags of DAP, Urea, and potash ahead of monsoon onset.",
          tamilPlaceholder: "மழைக்கால நடவுக்கு முன் டிஏபி, யூரியா, பொட்டாஷ் மூட்டைகளை மொத்தமாக இருப்பு வைக்க அதிக மூலதனம் தேவை.",
          impact: "Capital Intensive",
          impactTa: "அதிக மூலதன தேவை"
        },
        {
          text: "Perishable shelf life for bio-culture innoculants (Azospirillum, Phosphobacteria) needing cool storage.",
          tamilPlaceholder: "உயிர் உரங்கள் (அசோஸ்பைரில்லம், பாஸ்போபாக்டீரியா) 6 மாதங்களில் காலாவதியாவதால் குளிர்ச்சியான சேமிப்பு அவசியம்.",
          impact: "Shelf-Life Degradation",
          impactTa: "குறுகிய காலாவதி தேதி"
        },
        {
          text: "Strict technical advice accountability: incorrect dosage recommendations can harm farmers' crop yields.",
          tamilPlaceholder: "உரங்கள் மற்றும் பூச்சிக்கொல்லி மருந்துகளின் தவறான அளவு பயிர்களை பாதிக்கும் என்பதால் துல்லியமான வழிகாட்டுதல் தேவை.",
          impact: "Advisory Liability",
          impactTa: "தொழில்நுட்ப பொறுப்பு"
        }
      ],
      opportunities: [
        {
          text: "Setting up automated soil testing and pH diagnostic bench charging ₹150/sample with instantaneous fertilizer prescriptions.",
          tamilPlaceholder: "மண் பரிசோதனை மற்றும் pH கண்டறியும் சிறு ஆய்வகத்தை அமைத்து விவசாயிகளுக்கு உர பரிந்துரை வழங்கி வருமானம் ஈட்டுதல்.",
          impact: "High-Margin Service",
          impactTa: "கூடுதல் சேவை வருமானம்"
        },
        {
          text: "Eligible for 36% - 44% capital subsidy under NABARD's Agri-Clinics & Agri-Business Centres (AC&ABC) scheme.",
          tamilPlaceholder: "நபார்டின் AC&ABC வேளாண் மையம் திட்டத்தின் கீழ் 36% முதல் 44% வரை முதலீட்டு மானியம் பெறும் பிரத்யேக வாய்ப்பு.",
          impact: "36%-44% NABARD Subsidy",
          impactTa: "36%-44% நபார்டு மானியம்"
        },
        {
          text: "Expanding into drip-irrigation spares, micro-sprinklers, and solar fencing equipment with state subsidy linkage.",
          tamilPlaceholder: "அரசு மானியத்துடன் கூடிய சொட்டுநீர் பாசன உதிரிபாகங்கள் மற்றும் சூரிய மின்வேலி கருவிகளை விற்பனை செய்தல்.",
          impact: "Farm Tech Expansion",
          impactTa: "பாசனக் கருவிகள் விற்பனை"
        },
        {
          text: "Organizing village-level demo plots with progressive farmers to accelerate organic bio-stimulant adoption.",
          tamilPlaceholder: "முன்னோடி விவசாயிகளுடன் இணைந்து செயல்முறை விளக்கம் மூலம் இயற்கை பூச்சி விரட்டிகள் மற்றும் உயிர் உர விற்பனையை பெருக்குதல்.",
          impact: "Brand Leadership",
          impactTa: "விவசாயிகள் நன்மதிப்பு"
        }
      ],
      threats: [
        {
          text: "Monsoon failure or drought severely suppresses sowing acreage and fertilizer application by up to 45%.",
          tamilPlaceholder: "பருவமழை பொய்த்தால் பயிர் சாகுபடி பரப்பு குறைந்து உரங்கள் மற்றும் பூச்சிக்கொல்லி விற்பனை 45% வரை சரியும் அபாயம்.",
          impact: "Climate Sensitivity",
          impactTa: "மழை சார்ந்தது"
        },
        {
          text: "Subsidy delays from government DBT fertilizer portal impacting working capital re-investment cycles.",
          tamilPlaceholder: "அரசு உர மானிய போர்டல் (DBT) மூலம் பணம் வர தாமதமானால் நிறுவனத்தின் கொள்முதல் சுழற்சி பாதிக்கப்படலாம்.",
          impact: "Reimbursement Lag",
          impactTa: "மானியம் வருவதில் தாமதம்"
        },
        {
          text: "Competition from Primary Agricultural Cooperative Credit Societies (PACCS) offering subsidized fertilizer credit.",
          tamilPlaceholder: "தொடக்க வேளாண்மை கூட்டுறவு கடன் சங்கங்கள் (PACCS) குறைந்த விலையில் உரம் வழங்குவதால் ஏற்படும் போட்டி.",
          impact: "Cooperative Price Cap",
          impactTa: "கூட்டுறவு சங்க போட்டி"
        },
        {
          text: "Heavy scrutiny from district flying squads on fertilizer maximum retail price (MRP) compliance and stock ledgers.",
          tamilPlaceholder: "அரசு நிர்ணயித்த அதிகபட்ச சில்லறை விலையை (MRP) விட கூடுதல் விலை வைக்கக் கூடாது என்ற கடுமையான ஆய்வுகள்.",
          impact: "Regulatory Compliance",
          impactTa: "அரசு கட்டுப்பாடுகள்"
        }
      ]
    },
    'Dairy': {
      strengths: [
        {
          text: "Assured daily cash buy-back tie-ups with district milk unions like Aavin and leading private dairies.",
          tamilPlaceholder: "ஆவின் மற்றும் முன்னணி தனியார் பால் பண்ணைகளுடன் தினசரி பால் கொள்முதல் செய்வதற்கான உறுதி செய்யப்பட்ட ஒப்பந்தம்.",
          impact: "Guaranteed Off-take",
          impactTa: "உறுதியான கொள்முதல்"
        },
        {
          text: "Twice-daily cash settlement cycles offering superior liquidity and virtually zero customer bad debts.",
          tamilPlaceholder: "காலை மற்றும் மாலை என இருவேளை பால் கொள்முதல் மூலம் தினசரி ரொக்கப் புழக்கம் மற்றும் கடன் பாக்கி இல்லாத வணிகம்.",
          impact: "Zero Bad Debt",
          impactTa: "கடன் பாக்கி இல்லை"
        },
        {
          text: "High-value secondary byproduct generation: cow dung slurry converts to organic vermicompost selling at ₹8/kg.",
          tamilPlaceholder: "சாணம் மற்றும் கோமியம் மூலம் இயற்கை மண்புழு உரம் தயாரித்து கிலோ ₹8 வீதம் விற்று கூடுதல் லாபம் ஈட்டலாம்.",
          impact: "Circular Revenue",
          impactTa: "இயற்கை உர வருமானம்"
        },
        {
          text: "Abundance of local green fodder, maize stalks, and cotton-seed oilcake within Kallupatti agricultural belt.",
          tamilPlaceholder: "கல்லுப்பட்டி பகுதியில் பசுந்தீவனம், மக்காச்சோள தட்டை மற்றும் பருத்திக் கொட்டை புண்ணாக்கு தாராளமாக கிடைப்பது.",
          impact: "Low Feed Sourcing Cost",
          impactTa: "குறைந்த தீவனச் செலவு"
        }
      ],
      weaknesses: [
        {
          text: "Rigorous 365-day operational commitment: milking, hygiene sanitization, and chilling cannot pause for holidays.",
          tamilPlaceholder: "வருடத்தின் 365 நாட்களும் விடுமுறையின்றி அதிகாலை பால் கறத்தல் மற்றும் பராமரிப்பு பணிகளை மேற்கொள்ள வேண்டிய கட்டாயம்.",
          impact: "Intensive Labor Effort",
          impactTa: "தொடர் உழைப்பு தேவை"
        },
        {
          text: "High sensitivity to cattle health, mastitis, and veterinary emergencies requiring immediate doctor intervention.",
          tamilPlaceholder: "கால்நடைகளுக்கு ஏற்படும் மடிநோய், அம்மை நோய் மற்றும் மருத்துவ அவசரங்களுக்கு உடனடியாக மருத்துவர் உதவி தேவை.",
          impact: "Biological Risk",
          impactTa: "கால்நடை நோய் அபாயம்"
        },
        {
          text: "High continuous electrical refrigeration dependency: milk turns sour within 3 hours if unchilled at 4°C.",
          tamilPlaceholder: "பால் கெட்டுப்போகாமல் 4°C வெப்பநிலையில் பாதுகாக்க தொடர்ந்து மின்சாரம் அல்லது ஜெனரேட்டர் கட்டாயம்.",
          impact: "Perishability Hazard",
          impactTa: "குளிரூட்டும் தேவை"
        },
        {
          text: "High initial capital expenditure for Bulk Milk Cooler (BMC 500L), automatic milking machines, and lactometers.",
          tamilPlaceholder: "500 லிட்டர் பால் குளிரூட்டும் தொட்டி, தானியங்கி பால் கறவை இயந்திரம் வாங்க ஆரம்ப மூலதனச் செலவு அதிகம்.",
          impact: "High Capital Cost",
          impactTa: "ஆரம்ப இயந்திர செலவு"
        }
      ],
      opportunities: [
        {
          text: "Value addition into cultured Ghee, Paneer, Curd, and Khoa yielding 2.2x to 3.0x raw milk realization value.",
          tamilPlaceholder: "பாலை நெய், பன்னீர், தயிர் மற்றும் பால்கோவாவாக மாற்றி விற்பதன் மூலம் 2.5 மடங்கு கூடுதல் வருமானம் பெறுதல்.",
          impact: "+150% Value Addition",
          impactTa: "+150% கூடுதல் மதிப்பு"
        },
        {
          text: "Availing 33.3% capital subsidy under NABARD Dairy Entrepreneurship Development Scheme (DEDS).",
          tamilPlaceholder: "நபார்டு பால் பண்ணை மேம்பாட்டுத் திட்டத்தின் (DEDS) கீழ் 33.3% வரை அரசு மானியம் பெறும் வாய்ப்பு.",
          impact: "33.3% NABARD Grant",
          impactTa: "33.3% நபார்டு மானியம்"
        },
        {
          text: "Setting up digital Fat & SNF testing counter to attract surrounding individual cow owners to pool milk for a commission.",
          tamilPlaceholder: "டிஜிட்டல் பால் கொழுப்பு பரிசோதனை கருவி அமைத்து அக்கம் பக்கத்து விவசாயிகளின் பாலை சேர்த்து கமிஷன் பெறுதல்.",
          impact: "Hub Aggregator Model",
          impactTa: "பால் சேகரிப்பு மையம்"
        },
        {
          text: "Supply agreements with Madurai sweet stalls and hotels for standardized buffalo/cow milk contracts.",
          tamilPlaceholder: "மதுரை நகர இனிப்பகங்கள் மற்றும் பிரபல உணவகங்களுக்கு மொத்தமாக தரமான பால் விநியோகம் செய்யும் ஒப்பந்தம்.",
          impact: "B2B Contract Volume",
          impactTa: "மொத்த விற்பனை ஒப்பந்தம்"
        }
      ],
      threats: [
        {
          text: "Lumpy Skin Disease (LSD) or Foot & Mouth Disease (FMD) outbreaks temporarily slashing milk yield by over 50%.",
          tamilPlaceholder: "கால்நடைகளுக்கு பரவும் கோமாரி அல்லது அம்மை நோய்களால் பால் உற்பத்தி பாதியாக குறையும் அபாயம்.",
          impact: "Epidemic Vulnerability",
          impactTa: "தொற்றுநோய் அபாயம்"
        },
        {
          text: "Surging prices of commercial cattle feed concentrates, cotton seed, and dry paddy straw during dry months.",
          tamilPlaceholder: "கோடை காலங்களில் பருத்திக் கொட்டை, புண்ணாக்கு மற்றும் வைக்கோல் விலைகள் கடுமையான உயர்வை சந்திப்பது.",
          impact: "Feed Inflation",
          impactTa: "தீவன விலை உயர்வு"
        },
        {
          text: "Milk procurement price cuts by private dairy aggregators during peak lactation flush seasons (Nov-Feb).",
          tamilPlaceholder: "குளிர்காலத்தில் பால் உற்பத்தி அதிகரிக்கும் போது தனியார் நிறுவனங்கள் கொள்முதல் விலையை குறைப்பது.",
          impact: "Price Fluctuations",
          impactTa: "கொள்முதல் விலை வீழ்ச்சி"
        },
        {
          text: "Depleting groundwater in summer months affecting green grass fodder irrigation in Kallupatti taluk.",
          tamilPlaceholder: "கோடைக்காலத்தில் நிலத்தடி நீர் மட்டம் குறைந்து பசுந்தீவனப் பயிர்களை சாகுபடி செய்வதில் ஏற்படும் சிக்கல்.",
          impact: "Water Scarcity",
          impactTa: "கோடை தண்ணீர் தட்டுப்பாடு"
        }
      ]
    }
  },

  // Hyper-Local Market Insights
  marketInsightsByCategory: {
    'Grocery': [
      {
        category: "Demographic Catchment",
        categoryTa: "மக்கள் தொகை அளவு",
        icon: Users,
        metric: "8,400+ Citizens",
        metricTa: "8,400+ மக்கள்",
        text: "Kallupatti Panchayat center anchors 4 feeder hamlets within a 4.5km radius with ~1,850 households representing continuous FMCG demand.",
        tamilPlaceholder: "கல்லுப்பட்டி கிராம மையம் 4.5 கி.மீ சுற்றளவில் 4 குக்கிராமங்களையும், ~1,850 குடும்பங்களையும் கொண்டு தொடர் மளிகைத் தேவையை உருவாக்குகிறது."
      },
      {
        category: "Consumer Spend Velocity",
        categoryTa: "வாங்கும் திறன் & செலவு",
        icon: DollarSign,
        metric: "₹6,800 / household",
        metricTa: "₹6,800 / குடும்பம்",
        text: "Average rural household food and staples expenditure stands at ₹6,800/month, with 62% allocated to raw grains, cooking oil, spices, and tea.",
        tamilPlaceholder: "சராசரியாக ஒரு கிராம குடும்பம் மாதத்திற்கு ₹6,800 வரை மளிகைப் பொருட்களுக்கு செலவிடுகிறது; இதில் 62% தானியங்கள் மற்றும் சமையல் எண்ணெய்க்கானது."
      },
      {
        category: "Digital Financial Inclusion",
        categoryTa: "டிஜிட்டல் பணப்பரிவர்த்தனை",
        icon: Smartphone,
        metric: "58% UPI Payments",
        metricTa: "58% UPI கட்டணம்",
        text: "Over 58% of Kallupatti consumer purchases now settle via QR UPI codes (Google Pay / PhonePe), substantially reducing credit ledger friction.",
        tamilPlaceholder: "கல்லுப்பட்டியில் 58%-க்கும் அதிகமான பரிவர்த்தனைகள் UPI QR கோடு மூலம் நடைபெறுவதால் ரொக்க கையாளுதல் மற்றும் கடன் கணக்கு குறைகிறது."
      },
      {
        category: "Freight & Sourcing Advantage",
        categoryTa: "போக்குவரத்து & கொள்முதல்",
        icon: Truck,
        metric: "14 km Distance",
        metricTa: "14 கி.மீ தூரம்",
        text: "Direct proximity to Usilampatti & Sedapatti wholesale mandis (14km) cuts intermediate freight costs by ₹4,800 monthly compared to Madurai city vendors.",
        tamilPlaceholder: "உசிலம்பட்டி மற்றும் சேடபட்டி மொத்த சந்தைகள் (14 கி.மீ) அருகில் உள்ளதால் மதுரை சென்று வாங்குவதை விட மாதம் ₹4,800 சரக்குக் கட்டணம் மிச்சமாகிறது."
      },
      {
        category: "Seasonal Revenue Velocity",
        categoryTa: "பருவகால விற்பனை உச்சம்",
        icon: Calendar,
        metric: "2.6x Peak Multiplier",
        metricTa: "2.6x மடங்கு உச்சம்",
        text: "Pronounced sales surges during Thai Pongal (January), Chithirai festival (April/May), and Deepavali generate 42% of annual operating profits.",
        tamilPlaceholder: "தைப்பொங்கல், சித்திரை திருவிழா மற்றும் தீபாவளி பண்டிகைக் காலங்களில் விற்பனை 2.6 மடங்கு அதிகரித்து ஆண்டு லாபத்தில் 42% ஈட்டித் தருகிறது."
      }
    ],
    'Tailoring': [
      {
        category: "Demographic Target",
        categoryTa: "இலக்கு வாடிக்கையாளர்கள்",
        icon: Users,
        metric: "4,200 Women & Students",
        metricTa: "4,200 பெண்கள் & மாணவர்கள்",
        text: "Captive audience of 4,200 women and schoolchildren across Kallupatti panchayat with 3 government schools requiring mandatory dual uniforms.",
        tamilPlaceholder: "கல்லுப்பட்டி ஊராட்சியில் 4,200 பெண்கள் மற்றும் பள்ளி மாணவர்கள் உள்ளனர்; 3 அரசு பள்ளிகளுக்கு தலா 2 செட் சீருடைகள் தைப்பது கட்டாயம்."
      },
      {
        category: "Apparel Spend Benchmark",
        categoryTa: "ஆடை வடிவமைப்பு செலவு",
        icon: DollarSign,
        metric: "₹350 - ₹1,800 / piece",
        metricTa: "₹350 - ₹1,800 / ஆடை",
        text: "Standard rural blouse stitching fetches ₹250-₹350, while bridal zardozi/Aari-embroidered sets easily command ₹1,800-₹3,500 per piece.",
        tamilPlaceholder: "சாதாரண பிளவுஸ் தையல் ₹250-₹350 வரை பெறுகிறது; விசேஷ ஆரி வேலைப்பாடு கொண்ட மணப்பெண் ஆடைகள் ₹1,800 முதல் ₹3,500 வரை வருமானம் தருகின்றன."
      },
      {
        category: "Competitive Density Gap",
        categoryTa: "போட்டியாளர் இடைவெளி",
        icon: Store,
        metric: "Zero Industrial Units",
        metricTa: "தொழில்முறை ஆலை இல்லை",
        text: "Existing providers are informal home-based tailors with manual foot-treadle machines; zero motorized multi-worker workshops within 9km.",
        tamilPlaceholder: "தற்போதுள்ள தையல்காரர்கள் வீட்டு அடிப்படையிலான ஒற்றை மிதிவண்டி இயந்திரங்களை பயன்படுத்துகின்றனர்; 9 கி.மீ சுற்றளவில் நவீன தொழில்முறை ஆலை இல்லை."
      },
      {
        category: "Raw Material Sourcing",
        categoryTa: "மூலப்பொருள் கொள்முதல்",
        icon: Truck,
        metric: "Madurai Fabric Hub",
        metricTa: "மதுரை ஆடை சந்தை",
        text: "Madurai South Masi Street textile hub is accessible within 45 minutes by direct bus for weekly thread, zip, can-can, and canvas supplies at wholesale rates.",
        tamilPlaceholder: "மதுரை தெற்கு மாசி வீதி ஜவுளி சந்தை 45 நிமிட பேருந்து தூரத்தில் உள்ளதால் மொத்த விலையில் நூல்கள், லேஸ்கள், எம்பிராய்டரி பொருட்களை எளிதாகப் பெறலாம்."
      },
      {
        category: "Uniform Contracting Cycle",
        categoryTa: "சீருடை ஒப்பந்த சுழற்சி",
        icon: Calendar,
        metric: "May - July Peak",
        metricTa: "மே - ஜூலை உச்சம்",
        text: "School reopening season creates an immediate 3-month order backlog of 600+ uniform sets providing advance deposits for annual machine maintenance.",
        tamilPlaceholder: "பள்ளி திறக்கும் பருவத்தில் 600-க்கும் மேற்பட்ட சீருடை ஆர்டர்கள் குவிந்து முன்பணத்துடன் இயந்திர பராமரிப்பு செலவை ஈடுகட்ட உதவுகிறது."
      }
    ],
    'Agri-Inputs': [
      {
        category: "Cultivated Arable Area",
        categoryTa: "சாகுபடி நிலப்பரப்பு",
        icon: Sprout,
        metric: "3,100 Acres Arable",
        metricTa: "3,100 ஏக்கர் நிலம்",
        text: "Kallupatti cluster commands 3,100 acres of irrigated arable farmland actively producing paddy, cotton, groundnut, and black gram.",
        tamilPlaceholder: "கல்லுப்பட்டி வட்டத்தில் 3,100 ஏக்கர் பாசன நிலப்பரப்பில் நெல், பருத்தி, நிலக்கடலை மற்றும் உளுந்து தீவிரமாக சாகுபடி செய்யப்படுகிறது."
      },
      {
        category: "Seasonal Input Expenditure",
        categoryTa: "பருவகால இடுபொருள் செலவு",
        icon: DollarSign,
        metric: "₹5,200 / acre spend",
        metricTa: "₹5,200 / ஏக்கர் செலவு",
        text: "Local smallholders spend an average of ₹5,200 per acre per season across foundation seeds, basal fertilizers, micro-nutrients, and pest protectants.",
        tamilPlaceholder: "சிறு விவசாயிகள் ஏக்கருக்கு சராசரியாக ₹5,200 வீதம் விதை, அடி உரம், நுண்ணூட்டம் மற்றும் பூச்சி மருந்துகளுக்கு செலவிடுகின்றனர்."
      },
      {
        category: "Bio-Fertilizer Uptake Trend",
        categoryTa: "இயற்கை உர வளர்ச்சி",
        icon: TrendingUp,
        metric: "+28% YoY Adoption",
        metricTa: "+28% ஆண்டு வளர்ச்சி",
        text: "Surging farmer transition towards bio-stimulants, neem-coated urea, and organic soil health boosters as state subsidies penalize chemical runoff.",
        tamilPlaceholder: "அரசு வழிகாட்டுதல் மற்றும் விழிப்புணர்வால் வேப்பம்பூசப்பட்ட யூரியா மற்றும் இயற்கை உயிர் உரங்களின் பயன்பாடு ஆண்டுக்கு 28% அதிகரித்து வருகிறது."
      },
      {
        category: "Dealer Depot Proximity",
        categoryTa: "விநியோக கிடங்கு தூரம்",
        icon: Landmark,
        metric: "Direct TANFED Link",
        metricTa: "நேரடி டான்பெட் இணைப்பு",
        text: "Madurai TANFED regional warehouse provides direct stock delivery twice weekly, eliminating high transit freight margins for licensed dealers.",
        tamilPlaceholder: "மதுரை டான்பெட் மண்டல கிடங்கிலிருந்து வாரத்திற்கு இருமுறை நேரடி சரக்கு வாகனம் வருவதால் தனி சரக்கு வாடகை மிச்சமாகிறது."
      },
      {
        category: "Monsoon Sowing Window",
        categoryTa: "விதைப்பு பருவ கால அட்டவணை",
        icon: Calendar,
        metric: "Kharif & Rabi Dual Peak",
        metricTa: "காரிப் & ரபி இரட்டை பருவம்",
        text: "Peak input buying occurs between June-August (Southwest Monsoon) and October-December (Northeast Monsoon), ensuring two robust sales peaks.",
        tamilPlaceholder: "தென்மேற்கு பருவமழை (ஜூன்-ஆகஸ்ட்) மற்றும் வடகிழக்கு பருவமழை (அக்டோபர்-டிசம்பர்) என ஆண்டுக்கு இரண்டு முறை உச்சக்கட்ட விற்பனை நடைபெறுகிறது."
      }
    ],
    'Dairy': [
      {
        category: "Milch Cattle Population",
        categoryTa: "கறவை மாடுகளின் எண்ணிக்கை",
        icon: Milk,
        metric: "1,450+ Dairy Cows",
        metricTa: "1,450+ கறவை மாடுகள்",
        text: "Kallupatti and adjoining 3 panchayats count over 1,450 crossbred Holstein-Friesian and Jersey cows producing ~8,200 liters of raw milk daily.",
        tamilPlaceholder: "கல்லுப்பட்டி மற்றும் சுற்றியுள்ள 3 ஊராட்சிகளில் 1,450-க்கும் மேற்பட்ட கலப்பின மாடுகள் மூலம் நாள்தோறும் ~8,200 லிட்டர் பால் உற்பத்தியாகிறது."
      },
      {
        category: "Off-Take Procurement Price",
        categoryTa: "பால் கொள்முதல் விலை",
        icon: DollarSign,
        metric: "₹36 - ₹42 / liter",
        metricTa: "₹36 - ₹42 / லிட்டர்",
        text: "Aavin procurement rate benchmark is ₹38/L (4.2% Fat / 8.5% SNF), while local private dairies pay up to ₹42/L with on-the-spot digital payment.",
        tamilPlaceholder: "ஆவின் கொள்முதல் விலை சராசரியாக ₹38/லிட்டர்; தனியார் நிறுவனங்கள் கொழுப்பு சத்து அடிப்படையில் ₹42/லிட்டர் வரை உடனடியாக வழங்குகின்றன."
      },
      {
        category: "Cold-Chain Chilling Void",
        categoryTa: "குளிரூட்டும் கிடங்கு தேவை",
        icon: Truck,
        metric: "11 km Gap to BMC",
        metricTa: "11 கி.மீ தொலைவில் BMC",
        text: "Nearest functional bulk milk chiller is 11km away in T.Kallupatti bypass; local evening milk collection often suffers souring during summer months.",
        tamilPlaceholder: "அருகிலுள்ள பால் குளிரூட்டும் மையம் 11 கி.மீ தொலைவில் உள்ளதால் கோடைகாலத்தில் மாலை நேர பால் கெட்டுப்போகும் வாய்ப்பு அதிகம்."
      },
      {
        category: "Green Fodder Biomass",
        categoryTa: "பசுந்தீவன இருப்பு",
        icon: Sprout,
        metric: "Co-4 Napier Available",
        metricTa: "Co-4 தீவனப்புல் தாராளம்",
        text: "High availability of hybrid Napier grass (Co-4 / Co-5) and sorghum silage along Vaigai canal feeder channels reduces commercial feed reliance.",
        tamilPlaceholder: "வைகை பாசனப் பகுதிகளில் கோ-4 மற்றும் கோ-5 தீவனப்புல் தாராளமாக விளைவதால் வெளிப்புற தீவனச் செலவு 22% குறைகிறது."
      },
      {
        category: "Value-Addition Price Upside",
        categoryTa: "மதிப்புக் கூட்டு பால் பொருட்கள்",
        icon: TrendingUp,
        metric: "₹650/kg Native Ghee",
        metricTa: "₹650/கிலோ நாட்டு நெய்",
        text: "Local retail conversion into clarified pure cow Ghee (நெய்) and fresh Paneer yields gross margins in excess of 45% for town sweet shops.",
        tamilPlaceholder: "தூய நாட்டு மாட்டு நெய் கிலோ ₹650-க்கும், பன்னீர் கிலோ ₹380-க்கும் விற்கப்படுவதால் 45%-க்கும் அதிகமான மதிப்புக்கூட்டு லாபம் பெறலாம்."
      }
    ]
  },

  // Recommended Government Schemes with Eligibility & Max Subsidy Tags
  schemes: [
    {
      id: "scheme-pmegp",
      shortCode: "PMEGP",
      name: "Prime Minister's Employment Generation Programme",
      tamilPlaceholder: "பிரதமரின் வேலைவாய்ப்பு உருவாக்கும் திட்டம் (PMEGP)",
      nodalAgency: "KVIC / Tamil Nadu Khadi & Village Industries Board",
      nodalAgencyTa: "காதர் & கிராமத் தொழில்கள் வாரியம் (KVIC / KVIB)",
      eligibility: "Rural Resident • Age 18+ • 8th Pass for Projects >₹10L • No Collateral under CGTMSE",
      tamilEligibilityPlaceholder: "கிராமப்புற வசிப்பவர் • வயது 18+ • ₹10 லட்சத்திற்கு மேல் திட்டத்திற்கு 8-ஆம் வகுப்பு தேர்ச்சி • பிணையில்லா கடன்",
      maxSubsidy: "Up to 35% Capital Grant (Max ₹17.5 Lakh)",
      tamilMaxSubsidyPlaceholder: "35% வரை இலவச மூலதன மானியம் (அதிகபட்சம் ₹17.5 லட்சம்)",
      subsidyPct: "35%",
      interestRate: "8.50% - 10.25%",
      targetOutlay: "Up to ₹50 Lakhs (Mfg) / ₹20 Lakhs (Service/Retail)",
      targetOutlayTa: "₹50 லட்சம் வரை (உற்பத்தி) / ₹20 லட்சம் வரை (சேவை/சில்லறை)",
      badgeColor: "badge-success",
      description: "Credit-linked subsidy programme aimed at generating self-employment in rural and peri-urban sectors. Beneficiary equity is merely 5% for special categories and 10% for general categories.",
      tamilDescriptionPlaceholder: "கிராமப்புறங்களில் சுயதொழிலை ஊக்குவிக்கும் மத்திய அரசின் முதன்மை மானிய திட்டம். இதில் தொழில்முனைவோரின் சொந்த முதலீடு 5% முதல் 10% மட்டுமே.",
      keyFeatures: [
        { text: "35% government grant for rural projects (general category 25%)", tamilPlaceholder: "கிராமப்புற திட்டங்களுக்கு 35% அரசு இலவச மானியம் (பொதுப்பிரிவு 25%)" },
        { text: "Lock-in period of 3 years in bank term-deposit subsidy reserve fund", tamilPlaceholder: "மானியத் தொகை 3 ஆண்டுகளுக்கு வங்கியின் மானிய வைப்பு கணக்கில் வைக்கப்படும்" },
        { text: "100% CGTMSE collateral-free guarantee coverage supported by SBI & Canara Bank", tamilPlaceholder: "SBI, கனரா வங்கி மூலம் சொத்து பிணை ஏதுமின்றி கடன் பெறும் வசதி" }
      ],
      bankPartners: "SBI, Canara Bank, Indian Bank, Pandyan Grama Bank",
      bankPartnersTa: "பாரத ஸ்டேட் வங்கி, கனரா வங்கி, இந்தியன் வங்கி, தமிழ்நாடு கிராம வங்கி",
      applicationMode: "Online via KVIC PMEGP Portal (100% paperless)",
      applicationModeTa: "KVIC PMEGP இணையதளம் வழியாக ஆன்லைனில் விண்ணப்பிக்கலாம்"
    },
    {
      id: "scheme-mudra",
      shortCode: "MUDRA Yojana",
      name: "Pradhan Mantri MUDRA Yojana (PMMY)",
      tamilPlaceholder: "பிரதமர் முத்ரா கடன் யோஜனா திட்டம் (PMMY)",
      nodalAgency: "SIDBI / Scheduled Commercial Banks & RRBs",
      nodalAgencyTa: "SIDBI / வணிக வங்கிகள் & கிராம வங்கிகள்",
      eligibility: "Non-Farm Micro Enterprises • Valid Aadhaar & PAN • Clean Credit History • No Minimum Educational Cutoff",
      tamilEligibilityPlaceholder: "விவசாயம் அல்லாத நுண் வணிகங்கள் • ஆதார் & பான் அட்டை • நல்ல CIBIL மதிப்பெண் • கல்வித் தகுதி நிபந்தனை இல்லை",
      maxSubsidy: "100% Collateral-Free Micro Loan up to ₹10 Lakhs (2% Interest Subvention)",
      tamilMaxSubsidyPlaceholder: "₹10 லட்சம் வரை 100% பிணையில்லா கடன் (2% வட்டி மானியம்)",
      subsidyPct: "Collateral-Free",
      interestRate: "8.00% - 10.75%",
      targetOutlay: "Shishu (<₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L)",
      targetOutlayTa: "சிசு (<₹50k), கிஷோர் (₹50k-₹5L), தருண் (₹5L-₹10L)",
      badgeColor: "badge-primary",
      description: "Flagship funding scheme for non-corporate micro units. Offers term loans and working capital cash credit limits through MUDRA debit cards for frictionless daily inventory purchases.",
      tamilDescriptionPlaceholder: "சிறு வணிகங்களுக்கு இயந்திரங்கள் மற்றும் அன்றாட சரக்கு கொள்முதலுக்காக முத்ரா டெபிட் கார்டு மூலம் சுலபமாக கடன் வழங்கும் திட்டம்.",
      keyFeatures: [
        { text: "Zero collateral requirement and zero processing fee for Shishu segment", tamilPlaceholder: "சிசு கடன்களுக்கு (₹50,000 வரை) செயலாக்கக் கட்டணம் மற்றும் சொத்துப் பிணை முற்றிலும் இல்லை" },
        { text: "MUDRA RuPay card provides instant working capital revolving overdraft", tamilPlaceholder: "முத்ரா ருபே கார்டு மூலம் தேவைப்படும் போது பணத்தை எடுத்து பயன்படுத்தும் வசதி" },
        { text: "2% interest rebate under prompt repayment incentives for women entrepreneurs", tamilPlaceholder: "மகளிர் மற்றும் தவணை தவறாமல் செலுத்துவோருக்கு 2% வட்டி சலுகை" }
      ],
      bankPartners: "All Commercial PSU Banks, Pandyan Grama Bank, District Central Co-op",
      bankPartnersTa: "அனைத்து அரசுடைமை வங்கிகள், தமிழ்நாடு கிராம வங்கி, மாவட்ட கூட்டுறவு வங்கிகள்",
      applicationMode: "Direct Bank Branch or JanSamarth National Portal",
      applicationModeTa: "நேரடி வங்கி கிளை அல்லது JanSamarth மத்திய இணையதளம்"
    },
    {
      id: "scheme-pmfme",
      shortCode: "PMFME",
      name: "PM Formalisation of Micro food processing Enterprises",
      tamilPlaceholder: "பிரதமரின் நுண் உணவு பதப்படுத்தும் நிறுவனங்களை முறைப்படுத்தும் திட்டம் (PMFME)",
      nodalAgency: "Ministry of Food Processing Industries (MoFPI) & TN DIC",
      nodalAgencyTa: "உணவு பதப்படுத்தும் தொழில்கள் அமைச்சகம் (MoFPI) & மாவட்ட தொழில் மையம்",
      eligibility: "Micro Food Processors • SHGs • Farmer Producer Organisations (FPOs) • ODOP Category Alignment",
      tamilEligibilityPlaceholder: "நுண் உணவு தயாரிப்பாளர்கள் • சுய உதவிக்குழுக்கள் • உழவர் உற்பத்தியாளர் நிறுவனங்கள் (FPO) • ODOP திட்டம்",
      maxSubsidy: "Up to 35% Credit-Linked Grant (Max ₹10.0 Lakh)",
      tamilMaxSubsidyPlaceholder: "35% வரை மூலதன மானியம் (அதிகபட்சம் ₹10 லட்சம்)",
      subsidyPct: "35%",
      interestRate: "8.25% - 9.50%",
      targetOutlay: "Projects up to ₹30 Lakhs (Individual Micro Units)",
      targetOutlayTa: "₹30 லட்சம் வரை திட்ட மதிப்பீடு (தனிநபர் தொழில்)",
      badgeColor: "badge-warning",
      description: "Aims to enhance competitiveness of individual micro-enterprises in the unorganized food processing sector and support formalisation, packaging, FSSAI licensing, and market branding.",
      tamilDescriptionPlaceholder: "உணவு பதப்படுத்தும் சிறு தொழில்களை நவீனப்படுத்தவும், பேக்கிங், FSSAI தரச்சான்றிதழ் பெறவும் 35% மூலதன மானியம் வழங்கும் திட்டம்.",
      keyFeatures: [
        { text: "35% credit-linked capital subsidy capped at ₹10,00,000 per unit", tamilPlaceholder: "அலகு ஒன்றிற்கு அதிகபட்சம் ₹10 லட்சம் வரை 35% நேரடி மூலதன மானியம்" },
        { text: "Special support for One District One Product (ODOP) - Millet & Oilseeds in Madurai", tamilPlaceholder: "மதுரை மாவட்டத்தின் ஒரு மாவட்டம் ஒரு தயாரிப்பு (சிறுதானியம் & எண்ணெய்) சிறப்பு ஆதரவு" },
        { text: "50% subsidy grant on branding, FSSAI registration, and nutritional lab testing", tamilPlaceholder: "பிராண்டிங், FSSAI பதிவு மற்றும் ஊட்டச்சத்து ஆய்வகப் பரிசோதனைக்கு 50% மானியம்" }
      ],
      bankPartners: "Canara Bank (Nodal), SBI, Indian Overseas Bank, Union Bank",
      bankPartnersTa: "கனரா வங்கி, பாரத ஸ்டேட் வங்கி, இந்தியன் ஓவர்சீஸ் வங்கி",
      applicationMode: "PMFME MoFPI Online Portal via District Resource Persons (DRP)",
      applicationModeTa: "மாவட்ட தொழில் மையம் (DIC) மற்றும் PMFME போர்ட்டல் மூலம்"
    },
    {
      id: "scheme-uyegp",
      shortCode: "TN UYEGP",
      name: "Unemployed Youth Employment Generation Programme",
      tamilPlaceholder: "வேலைவாய்ப்பற்ற இளைஞர்களுக்கான வேலைவாய்ப்பு உருவாக்கும் திட்டம் (UYEGP)",
      nodalAgency: "Tamil Nadu MSME Department & District Industries Centre (DIC)",
      nodalAgencyTa: "தமிழ்நாடு MSME துறை & மாவட்ட தொழில் மையம் (DIC மதுரை)",
      eligibility: "Tamil Nadu Resident • Age 18-35 (45 for Women/SC/ST/BC) • 8th Standard Pass • Family Income < ₹5 Lakh",
      tamilEligibilityPlaceholder: "தமிழக வசிப்பவர் • வயது 18-35 (மகளிர்/பிற்படுத்தப்பட்டோருக்கு 45 வரை) • 8-ஆம் வகுப்பு தேர்ச்சி • குடும்ப வருமானம் < ₹5 லட்சம்",
      maxSubsidy: "25% State Government Subsidy (Max ₹3.75 Lakh)",
      tamilMaxSubsidyPlaceholder: "25% தமிழக அரசு நேரடி மானியம் (அதிகபட்சம் ₹3.75 லட்சம்)",
      subsidyPct: "25%",
      interestRate: "8.75% - 10.50%",
      targetOutlay: "Up to ₹15 Lakhs (Manufacturing) / ₹5 Lakhs (Service/Business)",
      targetOutlayTa: "₹15 லட்சம் வரை (உற்பத்தி) / ₹5 லட்சம் வரை (சேவை/சில்லறை வணிகம்)",
      badgeColor: "badge-accent",
      description: "State government flagship intervention assisting educated rural youth to setup micro-business enterprises. High approval rate in Madurai DIC with fast-track single-window sanctions.",
      tamilDescriptionPlaceholder: "கிராமப்புற படித்த இளைஞர்கள் சொந்தமாக தொழில் தொடங்க தமிழக அரசு வழங்கும் 25% நேரடி மானியத் திட்டம். எளிய மாவட்ட ஒப்புதல்.",
      keyFeatures: [
        { text: "25% direct state government subsidy directly adjusted against bank term loan", tamilPlaceholder: "25% மானியத் தொகை நேரடியாக வங்கிக் கடனில் வரவு வைக்கப்பட்டு அசல் குறையும்" },
        { text: "Promoter's contribution is only 5% for special categories and 10% for general", tamilPlaceholder: "தொழில் தொடங்குபவரின் சொந்த முதலீடு வெறும் 5% முதல் 10% மட்டுமே" },
        { text: "Mandatory 7-day EDP entrepreneurship training provided free by MSME-DI", tamilPlaceholder: "7 நாட்கள் தொழில்முனைவோர் பயிற்சி மாவட்ட தொழில் மையத்தால் இலவசமாக வழங்கப்படும்" }
      ],
      bankPartners: "All Tamil Nadu Nationalised Commercial Banks & Tamil Nadu Grama Bank",
      bankPartnersTa: "அனைத்து தேசியமயமாக்கப்பட்ட வங்கிகள் மற்றும் தமிழ்நாடு கிராம வங்கி",
      applicationMode: "Tamil Nadu MSME Online Portal (msmeonline.tn.gov.in)",
      applicationModeTa: "தமிழக அரசு msmeonline.tn.gov.in இணையதளம் வழியாக"
    },
    {
      id: "scheme-acabc",
      shortCode: "NABARD AC&ABC",
      name: "Agri-Clinics & Agri-Business Centres Scheme",
      tamilPlaceholder: "நபார்டு வேளாண் கிளினிக் மற்றும் வேளாண் வணிக மைய திட்டம் (AC&ABC)",
      nodalAgency: "NABARD & MANAGE (National Institute of Agricultural Extension)",
      nodalAgencyTa: "நபார்டு வங்கி & MANAGE தேசிய வேளாண் விரிவாக்க நிறுவனம்",
      eligibility: "Agri / Allied Science Graduates & Diploma Holders • 45-Day Residential Training Completed",
      tamilEligibilityPlaceholder: "வேளாண் / அறிவியல் பட்டதாரிகள் & டிப்ளமோ முடித்தவர்கள் • 45 நாள் சிறப்பு பயிற்சி நிறைவு செய்தவர்கள்",
      maxSubsidy: "36% (General) / 44% (Women & SC/ST) Composite Subsidy (Up to ₹20L Loan)",
      tamilMaxSubsidyPlaceholder: "36% முதல் 44% வரை நபார்டு கூட்டு மானியம் (₹20 லட்சம் வரை)",
      subsidyPct: "36% - 44%",
      interestRate: "7.00% - 9.00% (Concessional Refinance)",
      targetOutlay: "Individual: ₹20 Lakhs / Group of 5: ₹1.00 Crore",
      targetOutlayTa: "தனிநபர்: ₹20 லட்சம் / 5 பேர் குழு: ₹1.00 கோடி வரை",
      badgeColor: "badge-info",
      description: "Dedicated scheme to supplement public agricultural extension by creating gainful self-employment for agri-graduates in rural clinics, bio-fertilizer sales, and soil test units.",
      tamilDescriptionPlaceholder: "வேளாண் பட்டதாரிகள் கிராமங்களில் விதை, உரம், மண் பரிசோதனை மையம் அமைத்து விவசாயிகளுக்கு உதவ நபார்டு வழங்கும் சிறப்பு மானிய திட்டம்.",
      keyFeatures: [
        { text: "Composite capital + interest subsidy: 44% for women, SC/ST; 36% for others", tamilPlaceholder: "மகளிர் மற்றும் சிறப்பு பிரிவினருக்கு 44% மானியம்; இதர பிரிவினருக்கு 36% மானியம்" },
        { text: "Fully sponsored 45-day residential business training at accredited institutes", tamilPlaceholder: "அங்கீகரிக்கப்பட்ட நிறுவனங்களில் 45 நாட்கள் தங்கிப் படிக்கும் இலவச தொழில் பயிற்சி" },
        { text: "Concessional refinancing support at competitive rural rates via NABARD", tamilPlaceholder: "நபார்டு மூலம் மிகக் குறைந்த வட்டியில் சலுகை கடன் மறுநிதியளிப்பு வசதி" }
      ],
      bankPartners: "NABARD Partner PSU Banks, Pandyan Grama Bank, Madurai District Co-op",
      bankPartnersTa: "நபார்டு கூட்டாண்மை வங்கிகள், தமிழ்நாடு கிராம வங்கி, கூட்டுறவு வங்கிகள்",
      applicationMode: "Agri-Clinics MANAGE Portal (agriclinics.net)",
      applicationModeTa: "MANAGE agriclinics.net இணையதளம் வழியாக"
    }
  ]
};
