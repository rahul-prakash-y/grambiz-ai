import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Store, 
  Scissors, 
  Sprout, 
  Milk, 
  Languages, 
  Sliders, 
  Compass, 
  Calculator, 
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';
import { ADVISORY_DATA } from '../../data/advisoryData';
import SWOTQuadrant from '../advisory/SWOTQuadrant';
import MarketInsightsCard from '../advisory/MarketInsightsCard';
import SchemeCard from '../advisory/SchemeCard';
import TranslatableText from '../advisory/TranslatableText';
import { exportAdvisoryReportToPdf } from '../../utils/pdfExport';

export default function AdvisoryView({ t, lang = 'en', onNavigate }) {
  const { 
    ideaData, 
    updateIdeaData, 
    analysisResult 
  } = useBusinessIdea();

  // Active Category state (synced with global ideaData or switchable)
  const currentCategory = ideaData?.category || 'Grocery';
  const locationName = ideaData?.location || 'Kallupatti Village, Madurai';
  const capitalAmount = Number(ideaData?.investment) || 250000;

  // Local UI states
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showDual, setShowDual] = useState(false);

  // Active category SWOT and Market Insights from data module
  const swotData = ADVISORY_DATA.swotByCategory[currentCategory] || ADVISORY_DATA.swotByCategory['Grocery'];
  const marketInsights = ADVISORY_DATA.marketInsightsByCategory[currentCategory] || ADVISORY_DATA.marketInsightsByCategory['Grocery'];
  const schemesList = ADVISORY_DATA.schemes;

  // Category Icon helper
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Grocery': return <Store className="w-4 h-4 text-emerald-600" />;
      case 'Tailoring': return <Scissors className="w-4 h-4 text-teal-600" />;
      case 'Agri-Inputs': return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'Dairy': return <Milk className="w-4 h-4 text-sky-600" />;
      default: return <Store className="w-4 h-4 text-emerald-600" />;
    }
  };

  // PDF Export Trigger
  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    setExportSuccess(false);

    try {
      await exportAdvisoryReportToPdf({
        elementId: 'feasibility-report-container',
        category: currentCategory,
        location: locationName,
        investment: capitalAmount,
        viabilityScore: analysisResult?.viabilityScore || 94,
        breakEven: analysisResult?.breakEven || '5 - 7 months',
        monthlyProfit: analysisResult?.monthlyProfitFormatted || '₹38,000 - ₹52,000',
        subsidyAmount: analysisResult?.subsidyAmountFormatted || `₹${Math.round(capitalAmount * 0.35).toLocaleString('en-IN')}`,
        subsidyScheme: analysisResult?.subsidyScheme || "PMEGP Rural Entrepreneur Subsidy (35% Grant)",
        swotData,
        insightsData: marketInsights,
        schemesData: schemesList,
        lang
      });

      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
      }, 3500);
    } catch (err) {
      console.error('PDF Export encountered error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Advisory Banner & PDF Action Bar */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.advisory?.badge || (lang === 'ta' ? 'AI ஆலோசனை மையம்' : 'AI Advisory Dashboard')}</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {lang === 'ta' ? 'நபார்டு & PMEGP சரிபார்க்கப்பட்டது' : 'NABARD & PMEGP Ready'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            <TranslatableText
              text={t.advisory?.title || "Personalized Business Feasibility & Advisory Report"}
              tamilPlaceholder="வணிக சாத்தியக்கூறு & விரிவான AI ஆலோசனை அறிக்கை"
              lang={lang}
              showDual={false}
            />
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            <TranslatableText
              text={t.advisory?.subtitle || "Comprehensive appraisal evaluating SWOT dynamics, hyper-local demographic signals, and eligibility for bankable government subsidies."}
              tamilPlaceholder="சந்தை சாத்தியக்கூறு, SWOT பகுப்பாய்வு, உள்ளூர் தேவை மற்றும் அரசு மானியங்களை உள்ளடக்கிய விரிவான வணிக மதிப்பீட்டு அறிக்கை."
              lang={lang}
              showDual={showDual}
            />
          </p>
        </div>

        {/* Action Controls: Dual-Lang Toggle & REQUIRED 'Download as PDF' Button */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-center">
          {/* Dual Language Tamil Subtitle Toggle */}
          <button
            type="button"
            onClick={() => setShowDual(!showDual)}
            className={`btn btn-sm gap-1.5 font-bold rounded-xl border transition-all ${
              showDual
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
            title="Toggle Tamil translation subtitles for all text blocks"
          >
            <Languages className="w-4 h-4 text-emerald-600" />
            <span className="text-xs">
              {showDual ? (lang === 'ta' ? 'தமிழ் மட்டும்' : 'Tamil Subtitles: ON') : (lang === 'ta' ? 'இருமொழி முறை' : 'Tamil Subtitles')}
            </span>
          </button>

          {/* REQUIRED 'Download as PDF' button at the top using jspdf */}
          <button
            id="download-advisory-pdf-btn"
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="btn btn-sm sm:btn-md btn-primary gap-2 font-extrabold text-white rounded-xl shadow-md shadow-emerald-700/20 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 border-none transition-transform hover:scale-102"
          >
            {isExportingPdf ? (
              <>
                <span className="loading loading-spinner loading-xs text-white" />
                <span>{lang === 'ta' ? 'PDF தயாராகிறது...' : 'Generating PDF...'}</span>
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{lang === 'ta' ? 'பதிவிறக்கப்பட்டது!' : 'Report Downloaded!'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-300" />
                <span>{t.advisory?.downloadPdf || (lang === 'ta' ? 'PDF-ஆக பதிவிறக்கு' : 'Download as PDF')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Enterprise Category Selector Pill Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {lang === 'ta' ? 'மதிப்பீட்டு வணிக வகை:' : 'Select Evaluated Sector:'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['Grocery', 'Tailoring', 'Agri-Inputs', 'Dairy'].map((cat) => {
            const isSelected = currentCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateIdeaData({ category: cat })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/25 ring-2 ring-emerald-600/30'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>
                  {cat === 'Grocery' && (lang === 'ta' ? 'மளிகை கடை' : 'Grocery Store')}
                  {cat === 'Tailoring' && (lang === 'ta' ? 'தையல் பிரிவு' : 'Tailoring Unit')}
                  {cat === 'Agri-Inputs' && (lang === 'ta' ? 'வேளாண் மையம்' : 'Agri-Inputs')}
                  {cat === 'Dairy' && (lang === 'ta' ? 'பால் பண்ணை' : 'Dairy Unit')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEASIBILITY REPORT PRINT CONTAINER (Target for PDF capture & display) */}
      <div id="feasibility-report-container" className="space-y-6">
        
        {/* Executive Feasibility Report Card */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-900 rounded-2xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-950/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'ta' ? 'அரசு மானிய தகுதி மதிப்பீடு' : 'Bank Feasibility Appraisal Ready'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {currentCategory} Enterprise — {locationName}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                {lang === 'ta' 
                  ? `திட்ட மூலதனம்: ₹${capitalAmount.toLocaleString('en-IN')} • உத்தேச மாதாந்திர நிகர லாபம்: ${analysisResult?.monthlyProfitFormatted || '₹38,000 - ₹52,000'} • 35% PMEGP/நபார்டு மானிய ஒதுக்கீடு.`
                  : `Total Outlay: ₹${capitalAmount.toLocaleString('en-IN')} • Projected Net Profit: ${analysisResult?.monthlyProfitFormatted || '₹38,000 - ₹52,000'} • Eligible for 35% PMEGP/NABARD subsidy.`}
              </p>
            </div>

            {/* Radial Viability Gauge & Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
              <div className="flex items-center gap-3">
                <div 
                  className="radial-progress text-amber-300 font-black text-lg" 
                  style={{
                    "--value": analysisResult?.viabilityScore || 94, 
                    "--size": "4.2rem", 
                    "--thickness": "6px"
                  }} 
                  role="progressbar"
                >
                  {analysisResult?.viabilityScore || 94}%
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider text-emerald-200 block">
                    {lang === 'ta' ? 'சாத்தியக்கூறு குறியீடு' : 'Feasibility Index'}
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {lang === 'ta' ? 'உயர் சாத்தியம்' : 'High Potential'}
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-white/20 hidden sm:block" />

              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-emerald-200 text-[10px] uppercase font-bold block">
                    {lang === 'ta' ? 'முதலீடு மீட்பு காலம்' : 'Break-Even Period'}
                  </span>
                  <span className="font-extrabold text-white">
                    {analysisResult?.breakEven || '5 - 7 months'}
                  </span>
                </div>
                <div>
                  <span className="text-emerald-200 text-[10px] uppercase font-bold block">
                    {lang === 'ta' ? 'அரசு மானிய உதவி' : 'Max Subsidy Match'}
                  </span>
                  <span className="font-extrabold text-amber-300">
                    {analysisResult?.subsidyAmountFormatted || `₹${Math.round(capitalAmount * 0.35).toLocaleString('en-IN')}`} (35%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: SWOT ANALYSIS (FOUR COLORED QUADRANTS) */}
        <section aria-labelledby="swot-analysis-heading" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 id="swot-analysis-heading" className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
                  <TranslatableText
                    text={t.advisory?.swotTitle || "Enterprise SWOT Analysis Matrix"}
                    tamilPlaceholder="SWOT பகுப்பாய்வு அணி (நன்மைகள் & சவால்கள்)"
                    lang={lang}
                    showDual={false}
                  />
                </h2>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  4 Quadrants
                </span>
              </div>
              <TranslatableText
                text={t.advisory?.swotSub || "Four colored quadrants detailing internal operational capabilities and external village market opportunities & competitive threats."}
                tamilPlaceholder="உள்நாட்டு பலங்கள், பலவீனங்கள் மற்றும் வெளிநாட்டு வாய்ப்புகள், அச்சுறுத்தல்கள் குறித்த மூலோபாய மதிப்பீடு."
                lang={lang}
                showDual={showDual}
                className="text-xs text-slate-500 font-medium"
                as="p"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Strengths
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-1" /> Weaknesses
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ml-1" /> Opportunities
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-1" /> Threats
            </div>
          </div>

          {/* 4 Colored Quadrants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* QUADRANT 1: STRENGTHS (Emerald) */}
            <SWOTQuadrant
              type="strengths"
              title={t.advisory?.strengths || "Strengths"}
              tamilTitlePlaceholder="பலங்கள் (Strengths)"
              subtitle={t.advisory?.strengthsSub || "Internal operational and local sourcing advantages"}
              tamilSubtitlePlaceholder="உள்நாட்டு நன்மைகள் மற்றும் செயல்பாட்டு சாதகங்கள்"
              items={swotData.strengths}
              lang={lang}
              showDual={showDual}
            />

            {/* QUADRANT 2: WEAKNESSES (Amber) */}
            <SWOTQuadrant
              type="weaknesses"
              title={t.advisory?.weaknesses || "Weaknesses"}
              tamilTitlePlaceholder="பலவீனங்கள் (Weaknesses)"
              subtitle={t.advisory?.weaknessesSub || "Internal operational bottlenecks and capital limits"}
              tamilSubtitlePlaceholder="உள் தடைகள் மற்றும் மூலதனக் கட்டுப்பாடுகள்"
              items={swotData.weaknesses}
              lang={lang}
              showDual={showDual}
            />

            {/* QUADRANT 3: OPPORTUNITIES (Sky) */}
            <SWOTQuadrant
              type="opportunities"
              title={t.advisory?.opportunities || "Opportunities"}
              tamilTitlePlaceholder="வாய்ப்புகள் (Opportunities)"
              subtitle={t.advisory?.opportunitiesSub || "Market trends, value-addition and expansion levers"}
              tamilSubtitlePlaceholder="வளர்ச்சி வாய்ப்புகள் மற்றும் சந்தை தேவைகள்"
              items={swotData.opportunities}
              lang={lang}
              showDual={showDual}
            />

            {/* QUADRANT 4: THREATS (Rose) */}
            <SWOTQuadrant
              type="threats"
              title={t.advisory?.threats || "Threats"}
              tamilTitlePlaceholder="அச்சுறுத்தல்கள் (Threats)"
              subtitle={t.advisory?.threatsSub || "External risks, compliance standards and competition"}
              tamilSubtitlePlaceholder="வெளிப்புற அபாயங்கள் மற்றும் போட்டி சவால்கள்"
              items={swotData.threats}
              lang={lang}
              showDual={showDual}
            />
          </div>
        </section>

        {/* SECTION 2: MARKET INSIGHTS TEXT CARD WITH BULLET POINTS */}
        <section aria-labelledby="market-insights-heading">
          <MarketInsightsCard
            title={t.advisory?.marketInsightsTitle || "Hyper-Local Market Insights"}
            tamilTitlePlaceholder="உள்ளூர் சந்தை நுண்ணறிவுகள்"
            subtitle={t.advisory?.marketInsightsSub || `Demographic telemetry, customer spending power, and supply chain telemetry for ${locationName}`}
            tamilSubtitlePlaceholder={`மக்கள் தொகை தேவை, நுகர்வோர் வாங்கும் திறன் மற்றும் விநியோகச் சங்கிலி குறித்த தரவு வழிகாட்டுதல் (${locationName})`}
            insights={marketInsights}
            location={locationName}
            lang={lang}
            showDual={showDual}
          />
        </section>

        {/* SECTION 3: RECOMMENDED GOVERNMENT SCHEMES SECTION (WITH ELIGIBILITY & MAX SUBSIDY TAGS) */}
        <section aria-labelledby="govt-schemes-heading" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 id="govt-schemes-heading" className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
                  <TranslatableText
                    text={t.advisory?.schemesTitle || "Recommended Government Schemes & Capital Subsidies"}
                    tamilPlaceholder="பரிந்துரைக்கப்படும் அரசு மானியத் திட்டங்கள்"
                    lang={lang}
                    showDual={false}
                  />
                </h2>
                <span className="badge badge-sm badge-success text-white font-extrabold">
                  {schemesList.length} Schemes
                </span>
              </div>
              <TranslatableText
                text={t.advisory?.schemesSub || "Credit-linked capital subsidies with dedicated tags for Eligibility and Max Subsidy to maximize non-repayable grants."}
                tamilPlaceholder="உங்கள் வணிகத்திற்கு ஏற்ற கடன் இணைக்கப்பட்ட மூலதன மானியங்கள் மற்றும் தகுதி வரம்புகள்."
                lang={lang}
                showDual={showDual}
                className="text-xs text-slate-500 font-medium"
                as="p"
              />
            </div>

            <button
              onClick={() => onNavigate && onNavigate('calculator')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto hover:underline"
            >
              <span>{lang === 'ta' ? 'அனைத்து கடன் திட்டங்களையும் ஒப்பிடுக' : 'Compare Scheme EMIs in Calculator'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Schemes Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schemesList.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                lang={lang}
                showDual={showDual}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>

        {/* Action Next Steps & Navigation Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === 'ta' ? 'அடுத்த கட்ட நடைமுறை நடவடிக்கைகள்' : 'Ready to Operationalize Your Enterprise?'}
              </h3>
            </div>
            <p className="text-xs text-slate-600 max-w-xl">
              {lang === 'ta'
                ? 'உங்கள் AI சாத்தியக்கூறு மதிப்பீடு முடிந்தது. நிதி கால்குலேட்டரில் துல்லியமான EMI-யை கணக்கிடலாம் அல்லது வங்கி DPR அறிக்கையை பதிவிறக்கலாம்.'
                : 'Your advisory feasibility data is synchronized across GramBiz. Proceed to calculate monthly EMIs or generate institutional DPR dossiers.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('calculator')}
              className="btn btn-sm btn-primary gap-1.5 font-bold rounded-xl shadow-xs text-white"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'நிதி கால்குலேட்டர்' : 'Open Loan Calculator'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('competitors')}
              className="btn btn-sm bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-xl"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ta' ? 'போட்டியாளர்கள் வரைபடம்' : 'Scan Competitor Radar'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('reports')}
              className="btn btn-sm bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-xl"
            >
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              <span>{lang === 'ta' ? 'வங்கி DPR அறிக்கைகள்' : 'Bank DPR Reports'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
