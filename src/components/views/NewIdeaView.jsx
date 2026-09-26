import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Navigation, 
  Store, 
  Scissors, 
  Sprout, 
  Milk, 
  IndianRupee, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Award, 
  Cpu, 
  AlertTriangle, 
  Check, 
  RefreshCw, 
  Sliders, 
  Building, 
  ChevronRight, 
  TrendingUp, 
  Coins, 
  FileCheck, 
  Info, 
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { useBusinessIdea, CATEGORY_DETAILS } from '../../context/BusinessIdeaContext';

export default function NewIdeaView({ t, lang, onNavigate }) {
  const { 
    ideaData, 
    updateIdeaData, 
    isAnalyzing, 
    analysisProgress, 
    analysisStepText, 
    analysisResult, 
    triggerAnalysis 
  } = useBusinessIdea();

  // Wizard state: 1: Location, 2: Category, 3: Investment
  const [currentStep, setCurrentStep] = useState(1);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState(null);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);

  // Quick village suggestions in Tamil Nadu / rural clusters
  const popularVillages = [
    'Kallupatti Village, Madurai',
    'Sedapatti, Madurai',
    'Usilampatti Taluk',
    'Tirumangalam Hub',
    'Vadipatti Market',
    'Melur Agri Center'
  ];

  // Capital presets
  const capitalPresets = [
    { label: '₹25,000', value: 25000, desc: 'Micro / Mudra Shishu' },
    { label: '₹50,000', value: 50000, desc: 'Mudra Shishu' },
    { label: '₹1,00,000', value: 100000, desc: 'Mudra Kishore' },
    { label: '₹2,50,000', value: 250000, desc: 'Recommended Village Setup' },
    { label: '₹5,00,000', value: 500000, desc: 'Semi-Automated Unit' },
    { label: '₹10,00,000', value: 1000000, desc: 'PMEGP High Capacity' },
  ];

  // Icon mapping for categories
  const getCategoryIcon = (iconName, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Store':
        return <Store className={className} />;
      case 'Scissors':
        return <Scissors className={className} />;
      case 'Sprout':
        return <Sprout className={className} />;
      case 'Milk':
        return <Milk className={className} />;
      default:
        return <Store className={className} />;
    }
  };

  // Detect location handler using real Geolocation API with graceful fallback
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setLocationSuccessMsg(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          
          // Set detected location
          const detectedName = `Madurai Rural Cluster (${lat}° N, ${lng}° E)`;
          updateIdeaData({
            location: detectedName,
            detectedCoords: { lat: Number(lat), lng: Number(lng) }
          });
          setIsDetectingLocation(false);
          setLocationSuccessMsg(
            lang === 'ta' 
              ? `GPS கண்டறியப்பட்டது: அட்சரேகை ${lat}°, தீர்க்கரேகை ${lng}°`
              : `GPS Pinpointed: Lat ${lat}°, Lng ${lng}°`
          );
        },
        (error) => {
          // Fallback if permission denied or timeout
          setTimeout(() => {
            const fallbackLoc = 'Kallupatti Village, Madurai';
            updateIdeaData({
              location: fallbackLoc,
              detectedCoords: { lat: 9.7346, lng: 77.7984 }
            });
            setIsDetectingLocation(false);
            setLocationSuccessMsg(
              lang === 'ta'
                ? 'உலாவி ஜிபிஎஸ் அனுமதி பெறப்படவில்லை. முதன்மை கிராம மையம் தேர்வு செய்யப்பட்டது.'
                : 'GPS permission not granted. Connected to default Kallupatti Rural Hub.'
            );
          }, 600);
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    } else {
      setTimeout(() => {
        updateIdeaData({ location: 'Kallupatti Village, Madurai' });
        setIsDetectingLocation(false);
        setLocationSuccessMsg(
          lang === 'ta' 
            ? 'முதன்மை கிராம மையம் இணைக்கப்பட்டது' 
            : 'Connected to local rural center'
        );
      }, 500);
    }
  };

  // Convert number to Indian currency words
  const formatIndianWords = (num) => {
    if (!num || isNaN(num)) return '';
    const n = Number(num);
    if (n >= 10000000) {
      return `${(n / 10000000).toFixed(2)} Crore Rupees`;
    } else if (n >= 100000) {
      return `${(n / 100000).toFixed(2)} Lakh Rupees`;
    } else if (n >= 1000) {
      return `${(n / 1000).toFixed(1)} Thousand Rupees`;
    }
    return `${n} Rupees`;
  };

  // Handle final analysis trigger
  const handleAnalyzeBusiness = async () => {
    setShowAnalysisResults(true);
    await triggerAnalysis();
  };

  // Categories list
  const categoriesList = [
    {
      id: 'Grocery',
      nameEn: 'Grocery',
      fullTitleEn: 'Grocery / Provision Store (Kirana)',
      fullTitleTa: 'மளிகை & பலசரக்கு கடை (கிரானா)',
      descEn: 'Daily household essentials, packaged grains, spices & personal care with fast cash turnaround.',
      descTa: 'தினசரி வீட்டு உபயோக மளிகைப் பொருட்கள் மற்றும் விரைவான பண புழக்கம் கொண்ட சில்லறை வணிகம்.',
      badgeEn: 'Daily Cashflow',
      badgeTa: 'தினசரி வருமானம்',
      margin: '18% - 22%',
      demand: '96% High',
      icon: 'Store',
      color: 'emerald'
    },
    {
      id: 'Tailoring',
      nameEn: 'Tailoring',
      fullTitleEn: 'Tailoring & Garments Unit',
      fullTitleTa: 'தையல் & ஆடை தயாரிப்பு பிரிவு',
      descEn: 'Custom women/kids stitching, festival embroidery, and bulk school uniform contracts.',
      descTa: 'விசேஷ ஆடைகள், எம்பிராய்டரி மற்றும் பள்ளி சீருடைகள் தைக்கும் அதிக லாப வரம்பு கொண்ட தொழில்.',
      badgeEn: '35% Margin',
      badgeTa: '35% லாப வரம்பு',
      margin: '35% - 50%',
      demand: '88% High',
      icon: 'Scissors',
      color: 'teal'
    },
    {
      id: 'Agri-Inputs',
      nameEn: 'Agri-Inputs',
      fullTitleEn: 'Agri-Inputs & Bio-Nutrients Center',
      fullTitleTa: 'வேளாண் இடுபொருட்கள் & விதை மையம்',
      descEn: 'Certified seeds, bio-fertilizers, micro-nutrients & organic pest sprays for local farmers.',
      descTa: 'சான்றளிக்கப்பட்ட விதைகள், உயிர் உரங்கள் மற்றும் சொட்டுநீர் உதிரிபாகங்கள் வழங்கும் விவசாயிகள் மையம்.',
      badgeEn: 'Seasonal High Volume',
      badgeTa: 'அதிக விற்பனை அளவு',
      margin: '20% - 28%',
      demand: '92% High',
      icon: 'Sprout',
      color: 'green'
    },
    {
      id: 'Dairy',
      nameEn: 'Dairy',
      fullTitleEn: 'Dairy & Milk Collection Unit',
      fullTitleTa: 'பால் பண்ணை & குளிரூட்டும் மையம்',
      descEn: 'Milk chilling tank, cooperative buy-back tie-ups, ghee & paneer value-addition.',
      descTa: 'பால் சேகரிப்பு, குளிரூட்டுதல், நெய் மற்றும் பன்னீர் தயாரித்து ஆவின்/தனியார் நிறுவனங்களுக்கு வழங்கல்.',
      badgeEn: 'Aavin Buyback Ready',
      badgeTa: 'ஆவின் நேரடி கொள்முதல்',
      margin: '22% - 32%',
      demand: '98% Critical',
      icon: 'Milk',
      color: 'sky'
    }
  ];

  const selectedCategoryMeta = categoriesList.find(c => c.id === ideaData.category) || categoriesList[0];
  const activeDetails = CATEGORY_DETAILS[ideaData.category] || CATEGORY_DETAILS['Grocery'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.newIdea.badge || 'AI Feasibility Engine'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {t.newIdea.title || 'New Business Idea Wizard'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {t.newIdea.subtitle || 'Step-by-step rural enterprise wizard to validate your business idea, calculate subsidy eligibility, and forecast 3-year profitability.'}
            </p>
          </div>

          {/* Quick Active Idea Summary Pill */}
          <div className="shrink-0 bg-slate-50 border border-slate-200/90 rounded-xl p-3 text-xs space-y-1 sm:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {lang === 'ta' ? 'தற்போதைய மதிப்பீடு' : 'Current Active Inputs'}
            </span>
            <div className="font-extrabold text-slate-800 flex sm:justify-end items-center gap-1.5">
              <span>{ideaData.category}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700">₹{(Number(ideaData.investment) || 0).toLocaleString('en-IN')}</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate max-w-xs">
              📍 {ideaData.location}
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Multi-Step Progress Tracker */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-extrabold text-xs">
              {lang === 'ta' ? `படி ${currentStep} / 3` : `Step ${currentStep} of 3`}
            </span>
            <span className="text-xs font-bold text-slate-700">
              {currentStep === 1 && (lang === 'ta' ? 'படி 1: கிராம இருப்பிடம்' : 'Step 1: Village Location')}
              {currentStep === 2 && (lang === 'ta' ? 'படி 2: வணிக வகை' : 'Step 2: Business Category')}
              {currentStep === 3 && (lang === 'ta' ? 'படி 3: முதலீட்டுத் தொகை' : 'Step 3: Available Investment')}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {currentStep === 1 ? '33% ' + (lang === 'ta' ? 'முடிந்தது' : 'Completed') :
             currentStep === 2 ? '66% ' + (lang === 'ta' ? 'முடிந்தது' : 'Completed') :
             '100% ' + (lang === 'ta' ? 'தயார்' : 'Ready to Analyze')}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
          <div 
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%' }}
          />
        </div>

        {/* Step Indicator Tabs / Pills */}
        <div className="grid grid-cols-3 gap-2">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
              currentStep === 1
                ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                : currentStep > 1
                ? 'bg-slate-50 border-emerald-300 text-slate-700 hover:bg-emerald-50/50'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
              currentStep === 1
                ? 'bg-emerald-600 text-white'
                : currentStep > 1
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-400'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                {lang === 'ta' ? 'படி 1' : 'Step 1'}
              </span>
              <span className="text-xs font-bold truncate block">
                {lang === 'ta' ? 'இருப்பிடம்' : 'Location'}
              </span>
            </div>
          </button>

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
              currentStep === 2
                ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                : currentStep > 2
                ? 'bg-slate-50 border-emerald-300 text-slate-700 hover:bg-emerald-50/50'
                : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
              currentStep === 2
                ? 'bg-emerald-600 text-white'
                : currentStep > 2
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-400'
            }`}>
              {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                {lang === 'ta' ? 'படி 2' : 'Step 2'}
              </span>
              <span className="text-xs font-bold truncate block">
                {lang === 'ta' ? 'வணிக வகை' : 'Category'}
              </span>
            </div>
          </button>

          {/* Step 3 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
              currentStep === 3
                ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
              currentStep === 3
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-400'
            }`}>
              '3'
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                {lang === 'ta' ? 'படி 3' : 'Step 3'}
              </span>
              <span className="text-xs font-bold truncate block">
                {lang === 'ta' ? 'முதலீடு' : 'Investment'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Wizard Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          
          {/* STEP 1: LOCATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 text-[11px] font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ta' ? 'படி 1: கிராம இருப்பிடம்' : 'Step 1 of 3: Location'}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                  {lang === 'ta' ? 'கிராமம் அல்லது நகரத்தைத் தேர்ந்தெடுக்கவும்' : 'Enter Your Village or Town Location'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'ta'
                    ? 'உங்கள் பகுதிக்கான சந்தை தேவை மற்றும் உள்ளூர் மக்கள் தொகை தகவல்களை AI பகுப்பாய்வு செய்யும்.'
                    : 'GramBiz AI fetches hyper-local agricultural yields, demographic density, and market trends for this pin.'}
                </p>
              </div>

              {/* Village/Town Input Field with Detect Button */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  {lang === 'ta' ? 'கிராமம் / நகரம் பெயர்' : 'Village / Town Name'} <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={ideaData.location}
                      onChange={(e) => updateIdeaData({ location: e.target.value })}
                      placeholder={lang === 'ta' ? 'எ.கா. கல்லுப்பட்டி கிராமம், மதுரை' : 'e.g. Kallupatti Village, Madurai'}
                      className="input input-bordered w-full pl-10 pr-4 text-sm font-semibold focus:border-emerald-600 rounded-xl"
                    />
                  </div>

                  {/* Detect My Location Button */}
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="btn bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-xs gap-2 rounded-xl shrink-0"
                  >
                    {isDetectingLocation ? (
                      <>
                        <span className="loading loading-spinner loading-xs text-emerald-700" />
                        <span>{lang === 'ta' ? 'GPS கண்டறிகிறது...' : 'Detecting...'}</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'ta' ? 'என் இருப்பிடத்தைக் கண்டறி' : 'Detect My Location'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Geolocation feedback badge if detected */}
                {locationSuccessMsg && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{locationSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* Popular Village Quick-Pick Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {lang === 'ta' ? 'அடிக்கடி தேர்ந்தெடுக்கப்படும் கிராம மையங்கள்:' : 'Quick Select Rural Hubs:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularVillages.map((village) => (
                    <button
                      key={village}
                      type="button"
                      onClick={() => updateIdeaData({ location: village })}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                        ideaData.location === village
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                      }`}
                    >
                      {village}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Classification Type */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  {lang === 'ta' ? 'இருப்பிட வகைப்பாடு' : 'Location Setting'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'Village Center (Panchayat)', labelEn: 'Village Center', labelTa: 'கிராம மையம் (ஊராட்சி)' },
                    { id: 'Taluk Market / Block Junction', labelEn: 'Taluk Market', labelTa: 'வட்டார சந்தை' },
                    { id: 'Highway / Connecting Road', labelEn: 'Highway Junction', labelTa: 'நெடுஞ்சாலை சந்திப்பு' },
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => updateIdeaData({ locationType: loc.id })}
                      className={`py-2 px-3 text-center rounded-xl text-xs font-semibold border transition-all ${
                        ideaData.locationType === loc.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'ta' ? loc.labelTa : loc.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1 Actions: Next button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!ideaData.location || ideaData.location.trim() === ''}
                  className="btn btn-primary gap-2 font-bold rounded-xl shadow-md text-white px-6"
                >
                  <span>{lang === 'ta' ? 'அடுத்த படி: வணிக வகை' : 'Next: Business Category'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BUSINESS CATEGORY */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 text-[11px] font-bold mb-2">
                  <Store className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ta' ? 'படி 2: வணிக வகை' : 'Step 2 of 3: Category'}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                  {lang === 'ta' ? 'வணிக வகையைத் தேர்ந்தெடுக்கவும்' : 'Choose Your Business Category'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'ta'
                    ? 'உங்கள் கிராமத்திற்கு மிகவும் பொருத்தமான மற்றும் அதிக லாபம் தரும் தொழில் மாதிரியைத் தேர்வு செய்க.'
                    : 'Select from tested rural enterprise models with established supply chains and government subsidy backing.'}
                </p>
              </div>

              {/* Requirement: Dropdown with options like 'Grocery', 'Tailoring', 'Agri-Inputs', 'Dairy' */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {lang === 'ta' ? 'வணிக வகை தேர்வு (Dropdown)' : 'Business Category Dropdown'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={ideaData.category}
                    onChange={(e) => updateIdeaData({ category: e.target.value })}
                    className="select select-bordered select-md w-full text-sm font-bold text-slate-800 focus:border-emerald-600 rounded-xl"
                  >
                    <option value="Grocery">
                      {lang === 'ta' ? 'மளிகை கடை (Grocery / Kirana Store)' : 'Grocery (Kirana / Provision Store)'}
                    </option>
                    <option value="Tailoring">
                      {lang === 'ta' ? 'தையல் & ஆடை தயாரிப்பு (Tailoring & Garments Unit)' : 'Tailoring (Apparel & Stitching Unit)'}
                    </option>
                    <option value="Agri-Inputs">
                      {lang === 'ta' ? 'வேளாண் இடுபொருட்கள் & விதை மையம் (Agri-Inputs Center)' : 'Agri-Inputs (Seeds, Bio-Fertilizers & Nutrients)'}
                    </option>
                    <option value="Dairy">
                      {lang === 'ta' ? 'பால் பண்ணை & குளிரூட்டும் மையம் (Dairy Unit)' : 'Dairy (Milk Chilling & Dairy Products)'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Interactive Visual Category Cards */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {lang === 'ta' ? 'விரைவு அட்டை தேர்வு (Quick Cards):' : 'Interactive Category Cards:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categoriesList.map((cat) => {
                    const isSelected = ideaData.category === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => updateIdeaData({ category: cat.id })}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-500'
                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {getCategoryIcon(cat.icon, "w-5 h-5")}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 text-sm">
                                {lang === 'ta' ? cat.fullTitleTa : cat.nameEn}
                              </h3>
                              <span className="text-[10px] font-semibold text-emerald-700">
                                {lang === 'ta' ? cat.badgeTa : cat.badgeEn}
                              </span>
                            </div>
                          </div>

                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                          {lang === 'ta' ? cat.descTa : cat.descEn}
                        </p>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                          <span>Margin: <strong className="text-emerald-700">{cat.margin}</strong></span>
                          <span>Demand: <strong className="text-sky-700">{cat.demand}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Actions: Back & Next buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline border-slate-300 hover:bg-slate-100 text-slate-700 gap-1.5 font-bold rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'பின்செல் (இருப்பிடம்)' : 'Back to Location'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-primary gap-2 font-bold rounded-xl shadow-md text-white px-6"
                >
                  <span>{lang === 'ta' ? 'அடுத்த படி: முதலீடு' : 'Next: Set Investment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AVAILABLE INVESTMENT */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 text-[11px] font-bold mb-2">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ta' ? 'படி 3: முதலீடு' : 'Step 3 of 3: Available Investment'}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                  {lang === 'ta' ? 'கிடைக்கக்கூடிய முதலீட்டுத் தொகையைக் குறிப்பிடவும்' : 'Specify Your Available Investment'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'ta'
                    ? 'உங்கள் மூலதனத்தை உள்ளிட்டு அதற்கான அரசு மானியம் மற்றும் வங்கி கடன் தேவைகளை கணக்கிடுங்கள்.'
                    : 'Enter the planned capital to determine equipment sizing, MUDRA/PMEGP subsidy limits, and expected payback.'}
                </p>
              </div>

              {/* Requirement: Number input field for ₹ capital */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">
                    {lang === 'ta' ? 'முதலீட்டு மூலதனம் (₹)' : 'Investment Capital (₹)'} <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-extrabold text-emerald-700">
                    {formatIndianWords(ideaData.investment)}
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-lg pointer-events-none">
                    ₹
                  </div>
                  <input
                    type="number"
                    min="10000"
                    max="5000000"
                    step="5000"
                    value={ideaData.investment}
                    onChange={(e) => updateIdeaData({ investment: Math.max(0, Number(e.target.value)) })}
                    placeholder="250000"
                    className="input input-bordered w-full pl-10 pr-4 py-3 text-lg font-extrabold text-slate-800 focus:border-emerald-600 rounded-xl"
                  />
                </div>
              </div>

              {/* Quick Investment Presets */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  {lang === 'ta' ? 'விரைவு முதலீட்டுத் தேர்வுகள் (Standard Presets):' : 'Standard Rural Capital Presets:'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {capitalPresets.map((preset) => {
                    const isSelected = Number(ideaData.investment) === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => updateIdeaData({ investment: preset.value })}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-800">{preset.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{preset.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Capital Allocation & Subsidy Projection Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{lang === 'ta' ? 'உத்தேச மூலதனப் பகிர்வு' : 'Estimated Capital Allocation'}</span>
                  <span className="text-emerald-700 font-extrabold">₹{Number(ideaData.investment).toLocaleString('en-IN')} Total</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-semibold block">Machinery (55%)</span>
                    <strong className="text-slate-800 font-bold">
                      ₹{Math.round(ideaData.investment * 0.55).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-semibold block">Inventory (30%)</span>
                    <strong className="text-slate-800 font-bold">
                      ₹{Math.round(ideaData.investment * 0.30).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-semibold block">Shop/Shed (15%)</span>
                    <strong className="text-slate-800 font-bold">
                      ₹{Math.round(ideaData.investment * 0.15).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'ta' 
                      ? `அரசு மானிய தகுதி: 35% வரை மானியம் (₹${Math.round(ideaData.investment * 0.35).toLocaleString('en-IN')} இலவச மானியம்)`
                      : `Eligible for up to 35% Government Grant (Est. ₹${Math.round(ideaData.investment * 0.35).toLocaleString('en-IN')} subsidy)`}
                  </span>
                </div>
              </div>

              {/* Step 3 Actions: Back & Final 'Analyze Business' Button with Loading Spinner */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-outline border-slate-300 hover:bg-slate-100 text-slate-700 gap-1.5 font-bold rounded-xl order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'பின்செல் (வகை)' : 'Back to Category'}</span>
                </button>

                {/* Final 'Analyze Business' Button */}
                <button
                  type="button"
                  onClick={handleAnalyzeBusiness}
                  disabled={isAnalyzing || !ideaData.investment || ideaData.investment <= 0}
                  className="btn btn-primary gap-2 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-700/20 text-white px-7 py-3 order-1 sm:order-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 border-none transition-transform hover:scale-102"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="loading loading-spinner loading-sm text-white" />
                      <span>{lang === 'ta' ? 'பகுப்பாய்வு செய்கிறது...' : 'Analyzing Business...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{t.newIdea.analyzeBtn || 'Analyze Business'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Preview / Real-Time Live Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Configuration Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட விவரங்கள்' : 'Wizard Input Summary'}
                </span>
              </div>
              <span className="badge badge-sm badge-success text-white font-semibold">
                {lang === 'ta' ? 'நேரலை' : 'Live Sync'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Location item */}
              <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      {lang === 'ta' ? 'இருப்பிடம்' : 'Location'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {ideaData.location || (lang === 'ta' ? 'குறிப்பிடப்படவில்லை' : 'Not entered')}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-emerald-700 hover:underline font-bold text-[11px] shrink-0"
                >
                  {lang === 'ta' ? 'மாற்று' : 'Edit'}
                </button>
              </div>

              {/* Category item */}
              <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-800">
                    {getCategoryIcon(selectedCategoryMeta.icon, "w-4 h-4")}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      {lang === 'ta' ? 'வணிக வகை' : 'Category'}
                    </span>
                    <span className="font-bold text-slate-800">
                      {lang === 'ta' ? selectedCategoryMeta.fullTitleTa : selectedCategoryMeta.fullTitleEn}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-emerald-700 hover:underline font-bold text-[11px] shrink-0"
                >
                  {lang === 'ta' ? 'மாற்று' : 'Edit'}
                </button>
              </div>

              {/* Investment item */}
              <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-800">
                    <IndianRupee className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      {lang === 'ta' ? 'முதலீடு' : 'Investment Capital'}
                    </span>
                    <span className="font-bold text-emerald-800 text-sm">
                      ₹{(Number(ideaData.investment) || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-emerald-700 hover:underline font-bold text-[11px] shrink-0"
                >
                  {lang === 'ta' ? 'மாற்று' : 'Edit'}
                </button>
              </div>
            </div>

            {/* Benchmark Highlights for this category */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                {lang === 'ta' ? 'வணிக நுண்ணறிவு குறிப்பு' : 'Market Intelligence Snapshot'}
              </span>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                {lang === 'ta'
                  ? `${ideaData.category} வணிகத்திற்கு ${ideaData.location}-ல் நல்ல வரவேற்பு உள்ளது. PMEGP மற்றும் முத்ரா கடன் கீழ் தகுதியானது.`
                  : `${ideaData.category} operations in ${ideaData.location} benefit from steady local consumption and qualify for high PMEGP/Mudra priority.`}
              </p>
            </div>
          </div>

          {/* Quick Help / Subsidy Guide Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs">
                  {lang === 'ta' ? 'PMEGP & நபார்டு மானிய உதவி' : 'PMEGP & NABARD Grant Guide'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {lang === 'ta' ? 'கிராமப்புற தொழில்முனைவோருக்கு 35% வரை இலவச மானியம்.' : 'Rural entrepreneurs qualify for 25% - 35% government subsidies.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('calculator')}
              className="btn btn-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border-none shrink-0"
            >
              {lang === 'ta' ? 'கணக்கிடு' : 'Plan'}
            </button>
          </div>
        </div>
      </div>

      {/* LOADING STATE OVERLAY / CARD WHEN ANALYZING */}
      {isAnalyzing && (
        <div className="bg-white rounded-2xl p-8 border-2 border-emerald-500/80 shadow-xl space-y-5 animate-pulse">
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
            {/* Pulsing Spinner Icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-emerald-700">
                <Sparkles className="w-6 h-6 animate-bounce" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-800">
                {lang === 'ta' ? 'வணிக சாத்தியக்கூறு பகுப்பாய்வு நடக்கிறது...' : 'Analyzing Rural Feasibility & ROI...'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {analysisStepText || (lang === 'ta' ? 'சந்தை தகவல்களை ஒருங்கிணைக்கிறது...' : 'Synthesizing village market trends & subsidy criteria...')}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-emerald-800">
              {analysisProgress}% Completed
            </span>
          </div>
        </div>
      )}

      {/* FEASIBILITY ANALYSIS RESULTS (SCORECARD & DOSSIER) */}
      {!isAnalyzing && analysisResult && showAnalysisResults && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-fadeIn">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ta' ? 'AI சாத்தியக்கூறு மதிப்பீடு முடிந்தது' : 'AI Feasibility Analysis Generated'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                {analysisResult.category} in {analysisResult.location}
              </h2>
              <span className="text-xs text-slate-500">
                Generated today at {analysisResult.analyzedAt} • Based on ₹{analysisResult.investment.toLocaleString('en-IN')} Capital
              </span>
            </div>

            {/* Score Radial Progress Badge */}
            <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200 shrink-0">
              <div 
                className="radial-progress text-emerald-600 font-black text-base" 
                style={{"--value": analysisResult.viabilityScore, "--size": "3.8rem", "--thickness": "5px"}} 
                role="progressbar"
              >
                {analysisResult.viabilityScore}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-emerald-800 block">
                  {lang === 'ta' ? 'சாத்தியக்கூறு மதிப்பெண்' : 'Viability Score'}
                </span>
                <span className="text-sm font-extrabold text-emerald-700">
                  {lang === 'ta' ? 'அதிக சாத்தியம் (High)' : 'Highly Recommended'}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Payback period */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {lang === 'ta' ? 'முதலீடு மீட்புக் காலம்' : 'Est. Break-Even'}
              </span>
              <div className="flex items-center gap-1.5 font-extrabold text-slate-800 text-base">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ta' ? analysisResult.breakEvenTa : analysisResult.breakEven}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Fast capital turnaround</span>
            </div>

            {/* Projected profit */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {lang === 'ta' ? 'மாதாந்திர நிகர லாபம்' : 'Est. Monthly Net'}
              </span>
              <div className="flex items-center gap-1.5 font-extrabold text-emerald-700 text-base">
                <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{analysisResult.monthlyProfitFormatted}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Margin: {analysisResult.marginRange}</span>
            </div>

            {/* Subsidy grant */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {lang === 'ta' ? 'அரசு மானிய தொகை' : 'Govt Subsidy Grant'}
              </span>
              <div className="flex items-center gap-1.5 font-extrabold text-sky-700 text-base">
                <Award className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{analysisResult.subsidyAmountFormatted}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">{analysisResult.subsidyPercent}% Grant (Non-repayable)</span>
            </div>

            {/* Bank loan required */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {lang === 'ta' ? 'வங்கி கடன் தேவை' : 'Bank Loan Required'}
              </span>
              <div className="flex items-center gap-1.5 font-extrabold text-slate-800 text-base">
                <Building className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{analysisResult.bankLoanFormatted}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Under Mudra / PMEGP</span>
            </div>
          </div>

          {/* Advantages & Operational Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Advantages */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ta' ? 'முக்கிய நன்மைகள் & வாய்ப்புகள்' : 'Key Rural Advantages'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {(lang === 'ta' ? analysisResult.advantagesTa : analysisResult.advantagesEn).map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges / Considerations */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ta' ? 'கவனிக்க வேண்டிய நடைமுறை சவால்கள்' : 'Operational Considerations & Risks'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {(lang === 'ta' ? analysisResult.challengesTa : analysisResult.challengesEn).map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Essential Machinery & Sourcing List */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                <Cpu className="w-4 h-4 text-sky-600" />
                <span>{lang === 'ta' ? 'தேவையான முக்கிய இயந்திரங்கள் & கருவிகள்' : 'Recommended Machinery & Infrastructure'}</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">
                {lang === 'ta' ? 'MSME சான்றளிக்கப்பட்ட உபகரணங்கள்' : 'Eligible for 35% Capital Subsidy'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(lang === 'ta' ? analysisResult.equipmentTa : analysisResult.equipmentEn).map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Actions to Other Modules */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-extrabold text-slate-800 text-sm">
                {lang === 'ta' ? 'அடுத்த கட்ட நடவடிக்கைக்கான இணைப்புகள்' : 'Pass Data to Financial & Competitor Modules'}
              </h4>
              <p className="text-xs text-slate-600 max-w-xl">
                {lang === 'ta'
                  ? 'இந்த வணிக யோசனை தகவல்கள் கணினி முழுவதும் சேமிக்கப்பட்டுள்ளன. நீங்கள் கால்குலேட்டர் அல்லது அறிக்கைகளில் நேரடியாகப் பயன்படுத்தலாம்.'
                  : 'Your business inputs are active in global state. Continue to Financial Calculator to tune exact machinery EMIs or view local competitors.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('advisory')}
                className="btn btn-sm btn-primary gap-1.5 font-bold rounded-xl shadow-sm text-white"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'ta' ? 'AI ஆலோசனை அறிக்கை' : 'AI Advisory Report'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('calculator')}
                className="btn btn-sm bg-white hover:bg-slate-50 text-slate-700 border-slate-200 font-bold rounded-xl gap-1"
              >
                <span>{lang === 'ta' ? 'நிதி கால்குலேட்டர்' : 'Loan Calculator'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('competitors')}
                className="btn btn-sm bg-white hover:bg-slate-50 text-slate-700 border-slate-200 font-bold rounded-xl"
              >
                <span>{lang === 'ta' ? 'போட்டியாளர்கள் ரேடார்' : 'View Competitors'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAnalysisResults(false);
                  setCurrentStep(1);
                }}
                className="btn btn-sm btn-ghost text-slate-600 hover:text-slate-900 font-semibold rounded-xl"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'புதிய மதிப்பீடு' : 'Re-run Wizard'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
