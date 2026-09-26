import React, { createContext, useContext, useState, useEffect } from 'react';

const BusinessIdeaContext = createContext(null);

export const CATEGORY_DETAILS = {
  'Grocery': {
    id: 'Grocery',
    nameEn: 'Grocery / Kirana Store',
    nameTa: 'மளிகை & பலசரக்கு கடை',
    icon: 'Store',
    margin: '15% - 22%',
    demand: 'Essential Daily Need (96%)',
    subsidy: 'Mudra Shishu / Kishore Loan (15-20% margin money)',
    subsidyTa: 'முத்ரா கடன் & தமிழ்நாடு UYEGP திட்டம்',
    breakEvenMonths: '5 - 7 months',
    breakEvenTa: '5 - 7 மாதங்கள்',
    profitRatio: 0.18, // 18% of monthly turnover or return on capital
    equipmentEn: [
      'Commercial digital weighing scale (Class III)',
      'Heavy-duty slotted angle display racks',
      'Double door commercial deep freezer & dairy cooler',
      'Thermal barcode POS billing machine with battery backup'
    ],
    equipmentTa: [
      'துல்லியமான டிஜிட்டல் எடை இயந்திரம்',
      'பொருட்கள் வைக்கும் அடுக்கு கம்பிகள் (Racks)',
      'பால் மற்றும் குளிர்பான குளிர்சாதன பெட்டி (Freezer)',
      'பில்லிங் மெஷின் & பேட்டரி பேக்-அப்'
    ],
    advantagesEn: [
      'Guaranteed daily cash flow from neighborhood households',
      'Fast inventory turnover for FMCG and staples',
      'Tie-up opportunities with local farmers for fresh vegetable supply'
    ],
    advantagesTa: [
      'கிராம மக்களிடமிருந்து தினசரி பணப் புழக்கம்',
      'மளிகைப் பொருட்கள் விரைவாக விற்றுத் தீரும்',
      'உள்ளூர் விவசாயிகளிடமிருந்து காய்கறிகளை நேரடியாகப் பெறலாம்'
    ],
    challengesEn: [
      'Credit (Udhaar) requests from local villagers require strict book-keeping',
      'Stock shelf-life management for perishable items'
    ],
    challengesTa: [
      'உள்ளூர் மக்களிடம் கடன் (உதார்) மேலாண்மை சவால்',
      'அழுகும் பொருட்களின் காலாவதியை கண்காணிப்பது அவசியம்'
    ]
  },
  'Tailoring': {
    id: 'Tailoring',
    nameEn: 'Tailoring & Apparel Unit',
    nameTa: 'தையல் & ஆடை வடிவமைப்பு பிரிவு',
    icon: 'Scissors',
    margin: '35% - 50%',
    demand: 'High Festival & School Demand (88%)',
    subsidy: 'PMEGP Women/Rural Grant (35% Subsidy)',
    subsidyTa: 'PMEGP மகளிர் / கிராமப்புற மானியம் (35%)',
    breakEvenMonths: '4 - 6 months',
    breakEvenTa: '4 - 6 மாதங்கள்',
    profitRatio: 0.24,
    equipmentEn: [
      'High-speed industrial lockstitch sewing machines (3 units)',
      '4-Thread interlock overlock machine',
      'Heavy-duty steam iron & vacuum ironing table',
      'Fabric cutting table & embroidery attachment'
    ],
    equipmentTa: [
      'அதிவேக தொழில்துறை தையல் இயந்திரங்கள் (3 அலகுகள்)',
      '4-நூல் ஓவர்லாக் இயந்திரம்',
      'நீராவி அயர்ன் பாக்ஸ் & கட்டிங் டேபிள்',
      'எம்பிராய்டரி வடிவமைப்பு கருவி'
    ],
    advantagesEn: [
      'High profit margins on customized stitching and festive attire',
      'Reliable annual bulk contracts for government & private school uniforms',
      'Low monthly utility overhead and minimal electricity usage'
    ],
    advantagesTa: [
      'விசேஷ ஆடைகள் தைப்பதில் 40%+ வரை அதிக லாப வரம்பு',
      'பள்ளி சீருடைகள் தைப்பதன் மூலம் நிலையான மொத்த ஆர்டர்கள்',
      'குறைந்த மின்சாரச் செலவு மற்றும் எளிதான பராமரிப்பு'
    ],
    challengesEn: [
      'Seasonal workload spikes during festivals and school reopening',
      'Requires trained machine operators during high volume months'
    ],
    challengesTa: [
      'திருவிழா காலங்களில் பணிச்சுமை அதிகம் ஏற்படும்',
      'திறமையான தையல் கலைஞர்களை தக்கவைப்பது சவால்'
    ]
  },
  'Agri-Inputs': {
    id: 'Agri-Inputs',
    nameEn: 'Agri-Inputs & Bio-Nutrients Center',
    nameTa: 'வேளாண் இடுபொருட்கள் & விதை மையம்',
    icon: 'Sprout',
    margin: '18% - 28%',
    demand: 'Continuous Crop Season Need (92%)',
    subsidy: 'Agri-Clinic & Agri-Business Centers (AC&ABC - 36% Subsidy)',
    subsidyTa: 'நபார்டு AC&ABC வேளாண் மையம் மானியம் (36%)',
    breakEvenMonths: '6 - 8 months',
    breakEvenTa: '6 - 8 மாதங்கள்',
    profitRatio: 0.20,
    equipmentEn: [
      'Certified seed germination storage racks with humidity control',
      'Bio-fertilizer & pesticide storage display counters',
      'Digital moisture meter and soil pH testing kit',
      'Dealer ERP inventory billing software & POS'
    ],
    equipmentTa: [
      'சான்றளிக்கப்பட்ட விதை பாதுகாப்பு ரேக்குகள்',
      'உயிர் உரங்கள் & பூச்சிக்கொல்லி வைக்கும் பகுதிகள்',
      'மண் பரிசோதனை & ஈரப்பதம் அளவிடும் கருவி',
      'உரங்கள் விற்பனைக்கான POS பில்லிங் மென்பொருள்'
    ],
    advantagesEn: [
      'High trust and recurring seasonal purchases by farmer community',
      'Opportunity to supply certified hybrid seeds, bio-manures, and drip spares',
      'Direct distribution tie-ups with fertilizer cooperatives (IFFCO/TANFED)'
    ],
    advantagesTa: [
      'விவசாயிகளுடன் நீடித்த தொடர்பு மற்றும் தொடர் விற்பனை',
      'தரமான விதைகள், சொட்டுநீர் உபகரணங்கள் விற்கும் வாய்ப்பு',
      'IFFCO மற்றும் அரசு உர நிறுவனங்களின் நேரடி விநியோகம்'
    ],
    challengesEn: [
      'Mandatory retail license required from District Agricultural Department',
      'Sales are tied to monsoon patterns and sowing cycles'
    ],
    challengesTa: [
      'வேளாண் துறையிடம் உரிமம் (License) பெறுவது கட்டாயம்',
      'மழை மற்றும் பருவகால சாகுபடியை சார்ந்தது'
    ]
  },
  'Dairy': {
    id: 'Dairy',
    nameEn: 'Dairy & Milk Chilling Unit',
    nameTa: 'பால் பண்ணை & பால் குளிரூட்டும் மையம்',
    icon: 'Milk',
    margin: '22% - 32%',
    demand: 'Uninterrupted Daily Demand (98%)',
    subsidy: 'NABARD Dairy Entrepreneurship Dev Scheme (25% - 33.3% Subsidy)',
    subsidyTa: 'நபார்டு பால் பண்ணை மேம்பாட்டு மானியம் (33.3%)',
    breakEvenMonths: '7 - 9 months',
    breakEvenTa: '7 - 9 மாதங்கள்',
    profitRatio: 0.22,
    equipmentEn: [
      'Stainless steel Bulk Milk Cooler (BMC 500L capacity)',
      'Digital ultrasonic milk fat & SNF testing analyzer',
      'Automatic hygienic milking machines (2 clusters)',
      'Insulated milk transport cans & chilled storage tank'
    ],
    equipmentTa: [
      '500 லிட்டர் பால் குளிரூட்டும் தொட்டி (BMC)',
      'டிஜிட்டல் பால் கொழுப்பு (FAT/SNF) பரிசோதனை கருவி',
      'தானியங்கி பால் கறக்கும் இயந்திரம்',
      'துருப்பிடிக்காத எஃகு பால் கேன்கள்'
    ],
    advantagesEn: [
      'Assured daily cash buy-back tie-ups with cooperatives like Aavin and private dairies',
      'Value addition potential in Paneer, Ghee, Curd, and Butter for 2.5x profits',
      'Cow dung and slurry can be converted to organic vermicompost'
    ],
    advantagesTa: [
      'ஆவின் அல்லது தனியார் பால் நிறுவனங்களுக்கு தினசரி விநியோகம் உறுதி',
      'நெய், பன்னீர், தயிர் தயாரிப்பதன் மூலம் 2.5 மடங்கு கூடுதல் லாபம்',
      'சாணம் மூலம் இயற்கை மண்புழு உரம் தயாரித்து விற்கலாம்'
    ],
    challengesEn: [
      'Strict cattle vaccination, veterinary care, and clean water availability needed',
      'Continuous electricity or diesel generator required for milk chilling'
    ],
    challengesTa: [
      'கால்நடைகளுக்கான தடுப்பூசி மற்றும் பராமரிப்பு அவசியம்',
      'பால் கெட்டுப்போகாமல் இருக்க தொடர் மின்சாரம் அல்லது ஜெனரேட்டர் தேவை'
    ]
  }
};

export function BusinessIdeaProvider({ children }) {
  // Global idea data
  const [ideaData, setIdeaData] = useState({
    location: 'Kallupatti Village, Madurai',
    detectedCoords: { lat: 9.7346, lng: 77.7984 },
    locationType: 'Village Center (Panchayat)',
    category: 'Grocery',
    investment: 250000,
    availableCapital: 250000,
  });

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStepText, setAnalysisStepText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // Initialize a default mock analysis on mount so other pages have rich initial data
  useEffect(() => {
    generateAnalysis(ideaData.location, ideaData.category, ideaData.investment, false);
  }, []);

  function generateAnalysis(location, category, investment, shouldDelay = true) {
    const details = CATEGORY_DETAILS[category] || CATEGORY_DETAILS['Grocery'];
    
    // Dynamic calculations based on investment
    const investNum = Number(investment) || 250000;
    const estimatedMonthlySales = Math.round(investNum * 0.75);
    const estimatedMonthlyProfitMin = Math.round(investNum * details.profitRatio * 0.85);
    const estimatedMonthlyProfitMax = Math.round(investNum * details.profitRatio * 1.15);

    // Subsidy calculation
    let subsidyPct = 0.35;
    let subsidySchemeName = 'PMEGP Rural Entrepreneur Subsidy (35% Grant)';
    let subsidySchemeNameTa = 'PMEGP கிராமப்புற தொழில்முனைவோர் மானியம் (35%)';
    
    if (category === 'Agri-Inputs') {
      subsidyPct = 0.36;
      subsidySchemeName = 'AC&ABC Agri Clinic Subsidy (36% Grant)';
      subsidySchemeNameTa = 'நபார்டு வேளாண் கிளினிக் மானிய திட்டம் (36%)';
    } else if (category === 'Dairy') {
      subsidyPct = 0.33;
      subsidySchemeName = 'NABARD Dairy Entrepreneurship Scheme (33.3% Grant)';
      subsidySchemeNameTa = 'நபார்டு பால் பண்ணை மேம்பாட்டு திட்டம் (33.3%)';
    } else if (category === 'Grocery') {
      subsidyPct = 0.25;
      subsidySchemeName = 'PMEGP / UYEGP Rural Micro-Retail Scheme (25% Grant)';
      subsidySchemeNameTa = 'UYEGP கிராமப்புற சிறு சில்லறை வணிக மானியம் (25%)';
    }

    const subsidyAmount = Math.round(investNum * subsidyPct);
    const ownContribution = Math.round(investNum * 0.10);
    const bankLoan = Math.max(0, investNum - subsidyAmount - ownContribution);

    // Viability Score
    let viabilityScore = 91;
    if (investNum >= 100000 && investNum <= 800000) viabilityScore += 3;
    if (category === 'Dairy' || category === 'Grocery') viabilityScore += 2;
    viabilityScore = Math.min(97, viabilityScore);

    const result = {
      location,
      category,
      categoryDetails: details,
      investment: investNum,
      viabilityScore,
      demandLevel: details.demand,
      marginRange: details.margin,
      breakEven: details.breakEvenMonths,
      breakEvenTa: details.breakEvenTa,
      monthlyProfitMin: estimatedMonthlyProfitMin,
      monthlyProfitMax: estimatedMonthlyProfitMax,
      monthlyProfitFormatted: `₹${estimatedMonthlyProfitMin.toLocaleString('en-IN')} - ₹${estimatedMonthlyProfitMax.toLocaleString('en-IN')}`,
      monthlySalesFormatted: `₹${estimatedMonthlySales.toLocaleString('en-IN')}`,
      subsidyScheme: subsidySchemeName,
      subsidySchemeTa: subsidySchemeNameTa,
      subsidyPercent: Math.round(subsidyPct * 100),
      subsidyAmount: subsidyAmount,
      subsidyAmountFormatted: `₹${subsidyAmount.toLocaleString('en-IN')}`,
      ownContributionFormatted: `₹${ownContribution.toLocaleString('en-IN')}`,
      bankLoanFormatted: `₹${bankLoan.toLocaleString('en-IN')}`,
      equipmentEn: details.equipmentEn,
      equipmentTa: details.equipmentTa,
      advantagesEn: details.advantagesEn,
      advantagesTa: details.advantagesTa,
      challengesEn: details.challengesEn,
      challengesTa: details.challengesTa,
      analyzedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    if (!shouldDelay) {
      setAnalysisResult(result);
      return Promise.resolve(result);
    }

    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisStepText('Connecting to Rural Demographic & Mandi Radar...');

    return new Promise((resolve) => {
      setTimeout(() => {
        setAnalysisProgress(35);
        setAnalysisStepText(`Analyzing ${category} demand & customer footfall in ${location}...`);
      }, 350);

      setTimeout(() => {
        setAnalysisProgress(65);
        setAnalysisStepText('Computing PMEGP, NABARD & Mudra subsidy allocations...');
      }, 750);

      setTimeout(() => {
        setAnalysisProgress(90);
        setAnalysisStepText('Benchmarking competitor gaps and financial ROI model...');
      }, 1150);

      setTimeout(() => {
        setAnalysisProgress(100);
        setAnalysisStepText('AI Feasibility Analysis Complete!');
        setAnalysisResult(result);
        setIsAnalyzing(false);
        resolve(result);
      }, 1500);
    });
  }

  const updateIdeaData = (fields) => {
    setIdeaData((prev) => {
      const updated = { ...prev, ...fields };
      if (fields.availableCapital !== undefined && fields.investment === undefined) {
        updated.investment = Number(fields.availableCapital);
      } else if (fields.investment !== undefined && fields.availableCapital === undefined) {
        updated.availableCapital = Number(fields.investment);
      }
      return updated;
    });
  };

  const triggerAnalysis = () => {
    return generateAnalysis(ideaData.location, ideaData.category, ideaData.investment, true);
  };

  return (
    <BusinessIdeaContext.Provider
      value={{
        ideaData,
        updateIdeaData,
        isAnalyzing,
        analysisProgress,
        analysisStepText,
        analysisResult,
        triggerAnalysis,
        categoryOptions: Object.keys(CATEGORY_DETAILS),
        categoryDetailsMap: CATEGORY_DETAILS
      }}
    >
      {children}
    </BusinessIdeaContext.Provider>
  );
}

export function useBusinessIdea() {
  const context = useContext(BusinessIdeaContext);
  if (!context) {
    throw new Error('useBusinessIdea must be used within a BusinessIdeaProvider');
  }
  return context;
}
