import React from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Store, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight, 
  Droplet, 
  Wheat, 
  Sun, 
  Sprout, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Calculator,
  Compass
} from 'lucide-react';
import { mockData } from '../../data/mockData';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';

export default function DashboardView({ t, lang, onNavigate }) {
  const { ideaData, analysisResult } = useBusinessIdea();
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'droplet': return <Droplet className="w-5 h-5 text-emerald-600" />;
      case 'wheat': return <Wheat className="w-5 h-5 text-amber-600" />;
      case 'sun': return <Sun className="w-5 h-5 text-sky-600" />;
      case 'sprout': return <Sprout className="w-5 h-5 text-teal-600" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Trusted Forest/Teal to Oceanic Blue Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-900 text-white p-6 sm:p-8 shadow-lg shadow-emerald-900/10">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ta' ? 'AI சந்தை நுண்ணறிவு நேரலை' : 'AI Rural Market Intelligence Active'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.dashboard.welcomeTitle}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
              {t.dashboard.welcomeSub}
            </p>
          </div>

          {/* Quick Actions inside Hero */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('new-idea')}
              className="btn btn-sm sm:btn-md bg-white hover:bg-emerald-50 text-emerald-900 font-bold border-none shadow-md gap-2 rounded-xl transition-transform hover:scale-102"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>{t.dashboard.quickActionNewIdea}</span>
            </button>
            <button 
              onClick={() => onNavigate('calculator')}
              className="btn btn-sm sm:btn-md bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold border border-emerald-400/30 backdrop-blur-md gap-2 rounded-xl transition-all"
            >
              <Calculator className="w-4 h-4 text-emerald-200" />
              <span>{t.dashboard.quickActionCalc}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Business Idea Spotlight */}
      {ideaData && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  {lang === 'ta' ? 'செயலில் உள்ள வணிக மதிப்பீடு' : 'Active Evaluated Idea'}
                </span>
                {analysisResult && (
                  <span className="text-xs font-bold text-emerald-700">
                    Viability: {analysisResult.viabilityScore}%
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base mt-0.5">
                {ideaData.category} in {ideaData.location}
              </h3>
              <p className="text-xs text-slate-500">
                Capital: ₹{Number(ideaData.investment).toLocaleString('en-IN')} • Est. Break-Even: {analysisResult?.breakEven || '6-8 months'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('new-idea')}
              className="btn btn-sm btn-primary flex-1 sm:flex-none font-bold rounded-xl text-white shadow-xs"
            >
              <span>{lang === 'ta' ? 'யோசனையை மதிப்பாய்வு செய்' : 'View Full Dossier'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Stat Cards (4 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Local Demand Index */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs card-hover-effect">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.dashboard.kpi1Title}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">94.2%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            {t.dashboard.kpi1Note}
          </p>
        </div>

        {/* KPI 2: Estimated Monthly Net */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs card-hover-effect">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.dashboard.kpi2Title}
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">₹52,400</span>
            <span className="text-xs font-bold text-sky-600">/ mo</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            {t.dashboard.kpi2Note}
          </p>
        </div>

        {/* KPI 3: Competitor Density */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs card-hover-effect">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.dashboard.kpi3Title}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">2</span>
            <span className="badge badge-sm badge-success text-white font-semibold">
              {lang === 'ta' ? 'குறைந்த போட்டி' : 'Low Density'}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            {t.dashboard.kpi3Note}
          </p>
        </div>

        {/* KPI 4: Government Subsidy Schemes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs card-hover-effect">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.dashboard.kpi4Title}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">35%</span>
            <span className="badge badge-sm bg-emerald-100 text-emerald-800 font-bold border-none">
              PMEGP / PMFME
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            {t.dashboard.kpi4Note}
          </p>
        </div>
      </div>

      {/* Main Section: High-Potential Ventures + Live Mandi Commodity Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Trending Opportunities in Taluk */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {t.dashboard.trendingIdeasTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.dashboard.trendingIdeasSub}
              </p>
            </div>
            <button 
              onClick={() => onNavigate('new-idea')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>{t.dashboard.viewMore}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.trendingIdeas.map((idea) => (
              <div 
                key={idea.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all card-hover-effect flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      {getIcon(idea.icon)}
                    </div>
                    <span className="badge badge-sm badge-outline font-semibold text-slate-600">
                      {lang === 'ta' ? idea.categoryTa : idea.categoryEn}
                    </span>
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900 text-base leading-snug">
                    {lang === 'ta' ? idea.titleTa : idea.titleEn}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        {lang === 'ta' ? 'அமைவு செலவு' : 'Setup Capital'}
                      </span>
                      <span className="font-extrabold text-slate-800">{idea.setupCost}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        {lang === 'ta' ? 'மாத நிகர லாபம்' : 'Monthly Net'}
                      </span>
                      <span className="font-extrabold text-emerald-700">{idea.monthlyProfit}</span>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1 text-xs text-slate-600">
                    {(lang === 'ta' ? idea.highlightsTa : idea.highlightsEn).map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {idea.subsidy}
                  </span>
                  <button 
                    onClick={() => onNavigate('calculator')}
                    className="btn btn-xs btn-primary gap-1 font-semibold rounded-lg"
                  >
                    <span>{t.dashboard.calculateRoi}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (1 col): Live Mandi Commodity Prices & Market Gap Spotlight */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {t.dashboard.marketPricesTitle}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {t.dashboard.marketPricesSub}
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {mockData.marketPrices.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {lang === 'ta' ? item.commodityTa : item.commodityEn}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.price}</span>
                  </div>
                  <div className={`flex items-center gap-0.5 font-bold ${item.trend === 'up' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {item.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{item.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-medium">
                {lang === 'ta' ? 'உழவர் சந்தை & APMC நேரலை நிலவரம்' : 'Direct APMC & Uzhavar Sandhai Feed'}
              </span>
            </div>
          </div>

          {/* Quick Competitor Gap Alert Spotlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/70 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ta' ? 'அருகிலுள்ள வணிக இடைவெளி' : 'Market Gap Opportunity'}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {lang === 'ta' 
                ? 'கல்லுப்பட்டியில் இருந்து 15 கி.மீ சுற்றளவில் மரச்செக்கு எண்ணெய் ஆலை இல்லை. உள்ளூர் நிலக்கடலை விலை சாதகமாக உள்ளது!'
                : 'Zero cold-pressed oil extraction units within 15km of Kallupatti. Farmers currently travel 28km to press oilseeds.'
              }
            </p>
            <button 
              onClick={() => onNavigate('competitors')}
              className="w-full btn btn-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg border-none shadow-xs"
            >
              {lang === 'ta' ? 'போட்டியாளர்கள் ரேடாரைப் பார்க்க' : 'Scan Competitor Radar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
