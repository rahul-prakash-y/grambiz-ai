import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Landmark,
  Edit3,
  Check
} from 'lucide-react';

export default function FundingGapSection({
  totalProjectCost,
  availableCapital,
  onUpdateAvailableCapital,
  selectedScheme,
  setSelectedScheme,
  t,
  lang,
  category,
  location
}) {
  const [isEditingCapital, setIsEditingCapital] = useState(false);
  const [tempCapital, setTempCapital] = useState(availableCapital);

  // Scheme list
  const schemes = {
    'pmegp-special': {
      nameEn: 'PMEGP Rural Special (35% Grant)',
      nameTa: 'PMEGP கிராமப்புற சிறப்பு (35% மானியம்)',
      subsidyRate: 0.35,
      minPromoterRate: 0.05,
      badge: '35% Grant'
    },
    'pmegp-general': {
      nameEn: 'PMEGP Rural General (25% Grant)',
      nameTa: 'PMEGP கிராமப்புற பொது (25% மானியம்)',
      subsidyRate: 0.25,
      minPromoterRate: 0.10,
      badge: '25% Grant'
    },
    'mudra-kishore': {
      nameEn: 'MUDRA Kishore / Shishu (0% Grant, Collateral Free)',
      nameTa: 'முத்ரா கடன் (பிணை தேவையில்லை)',
      subsidyRate: 0.0,
      minPromoterRate: 0.15,
      badge: '0% Grant'
    },
    'nabard-agri': {
      nameEn: 'NABARD Agri-Infra Scheme (33% Grant)',
      nameTa: 'நபார்டு வேளாண் உள்கட்டமைப்பு (33% மானியம்)',
      subsidyRate: 0.33,
      minPromoterRate: 0.10,
      badge: '33% Grant'
    }
  };

  const activeScheme = schemes[selectedScheme] || schemes['pmegp-special'];

  // Calculations
  const available = Number(availableCapital) || 0;
  const total = Number(totalProjectCost) || 0;
  const fundingGap = total - available;
  const requiredLoanAmount = Math.max(0, fundingGap);
  const surplusCapital = Math.max(0, available - total);

  // Percentages
  const selfFundedPct = total > 0 ? Math.min(100, Math.round((available / total) * 100)) : 100;
  const loanPct = total > 0 ? Math.max(0, 100 - selfFundedPct) : 0;

  // Potential subsidy grant calculation on total project cost
  const subsidyAmount = Math.round(total * activeScheme.subsidyRate);
  const netDebtAfterSubsidy = Math.max(0, requiredLoanAmount - subsidyAmount);

  const handleSaveCapital = () => {
    onUpdateAvailableCapital(Math.max(0, Number(tempCapital)));
    setIsEditingCapital(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-800 flex items-center justify-center font-black shadow-xs">
              <span className="text-xs">02</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <span>{t.calculator.fundingGapTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t.calculator.fundingGapSub}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
            <Building2 className="w-3 h-3 text-sky-600" />
            <span>{lang === 'ta' ? 'கடன் தேவை' : 'Gap Analysis'}</span>
          </span>
        </div>

        {/* Global State Connection Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-sky-50/90 border border-emerald-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-emerald-950">
                    {t.calculator.availableCapitalLabel}
                  </span>
                  <span className="badge badge-xs bg-emerald-600 text-white font-bold border-none">
                    {t.calculator.fromGlobalState}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  {lang === 'ta' 
                    ? `${category} யோசனைக்காக நீங்கள் ஒதுக்கிய சொந்த முதலீடு`
                    : `Self-promoter equity allocated for ${category} in ${location}`}
                </div>
              </div>
            </div>

            {/* Editable Available Capital Control */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {isEditingCapital ? (
                <div className="flex items-center gap-1.5">
                  <div className="relative w-32">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="5000"
                      value={tempCapital}
                      onChange={(e) => setTempCapital(e.target.value)}
                      className="input input-xs input-bordered w-full pl-6 pr-1 text-xs font-bold text-slate-800"
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveCapital}
                    className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg border-none"
                    title={t.calculator.saveCapital}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-emerald-900 tracking-tight">
                    ₹{available.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTempCapital(available);
                      setIsEditingCapital(true);
                    }}
                    className="btn btn-xs btn-ghost text-emerald-700 hover:bg-emerald-100/60 font-semibold p-1 h-7 rounded-lg"
                    title="Change available capital"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick presets for available capital */}
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-emerald-200/60 text-[11px]">
            <span className="text-emerald-800 font-semibold text-[10px] uppercase tracking-wider">
              {lang === 'ta' ? 'தேர்வுகள்:' : 'Quick Presets:'}
            </span>
            {[100000, 250000, 500000, 1000000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => onUpdateAvailableCapital(amt)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  available === amt 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'bg-white/80 hover:bg-white text-emerald-900 border border-emerald-200'
                }`}
              >
                ₹{(amt / 100000).toFixed(amt % 100000 === 0 ? 0 : 1)}L
              </button>
            ))}
          </div>
        </div>

        {/* Calculation Bridge: Total Cost - Available Capital */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
          <div className="text-xs font-bold text-slate-700 mb-1">
            {lang === 'ta' ? 'நிதி இடைவெளி கணக்கீடு முறை:' : 'Gap Formula Breakdown:'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Step 1: Total Cost */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {t.calculator.totalProjectCost}
              </span>
              <span className="text-sm font-extrabold text-slate-800 block mt-1">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Step 2: Available Capital (Subtracted) */}
            <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                - {t.calculator.availableCapitalLabel}
              </span>
              <span className="text-sm font-extrabold text-emerald-800 block mt-1">
                ₹{available.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Step 3: Resulting Loan Required */}
            <div className={`p-3 rounded-lg border shadow-2xs ${
              requiredLoanAmount > 0 
                ? 'bg-sky-50 border-sky-200 text-sky-950' 
                : 'bg-teal-50 border-teal-200 text-teal-950'
            }`}>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                = {t.calculator.requiredLoanAmount}
              </span>
              <span className={`text-sm font-extrabold block mt-1 ${
                requiredLoanAmount > 0 ? 'text-sky-700' : 'text-teal-700'
              }`}>
                ₹{requiredLoanAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Funding Ratio Progress Meter */}
          <div className="pt-2 space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {t.calculator.selfFundedShare}: {selfFundedPct}%
              </span>
              <span className="text-sky-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                {t.calculator.debtShare}: {loanPct}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${selfFundedPct}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
              />
              <div 
                style={{ width: `${loanPct}%` }}
                className="bg-sky-500 h-full transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Subsidy Scheme Selection & Offset Guidance */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="scheme-select" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.calculator.schemeLabel}</span>
            </label>
            <span className="text-[11px] text-emerald-700 font-bold">
              {activeScheme.badge}
            </span>
          </div>

          <select
            id="scheme-select"
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="select select-sm select-bordered w-full text-xs font-semibold focus:border-sky-600 rounded-xl"
          >
            {Object.entries(schemes).map(([key, val]) => (
              <option key={key} value={key}>
                {lang === 'ta' ? val.nameTa : val.nameEn}
              </option>
            ))}
          </select>

          {activeScheme.subsidyRate > 0 && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/70 text-xs flex items-center justify-between">
              <div>
                <span className="text-emerald-950 font-bold block">
                  {lang === 'ta' ? 'அரசு மானிய உதவி (திரும்ப செலுத்த தேவையில்லை):' : 'Eligible Govt Grant (Non-repayable):'}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {Math.round(activeScheme.subsidyRate * 100)}% of total project cost
                </span>
              </div>
              <span className="text-sm font-black text-emerald-700">
                + ₹{subsidyAmount.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Output Card: Required Loan Amount */}
      <div className={`rounded-xl p-4 text-white shadow-md space-y-2 transition-all ${
        requiredLoanAmount > 0 
          ? 'bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900' 
          : 'bg-gradient-to-br from-emerald-900 via-teal-800 to-teal-900'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              {requiredLoanAmount > 0 ? (
                <span className="badge badge-sm bg-sky-400 text-sky-950 font-black border-none">
                  {lang === 'ta' ? 'வங்கி கடன் தேவை' : 'External Finance Needed'}
                </span>
              ) : (
                <span className="badge badge-sm bg-emerald-400 text-emerald-950 font-black border-none">
                  {lang === 'ta' ? 'முழு சுய முதலீடு' : 'Self-Funded'}
                </span>
              )}
            </div>
            <span className="text-xs text-sky-100/90 font-bold block">
              {t.calculator.requiredLoanAmount}
            </span>
          </div>

          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
              ₹{requiredLoanAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-sky-200/80">
              {requiredLoanAmount > 0 
                ? (lang === 'ta' ? 'அடுத்த கட்டமாக EMI-யை கணக்கிடவும்' : 'Auto-routed to EMI Calculator')
                : (lang === 'ta' ? 'கடன் தேவையில்லை' : 'Zero debt obligation')}
            </span>
          </div>
        </div>

        {/* Status Callout */}
        <div className="pt-2 border-t border-white/10 text-xs">
          {requiredLoanAmount > 0 ? (
            <div className="flex items-center gap-2 text-sky-100">
              <AlertCircle className="w-4 h-4 text-sky-300 shrink-0" />
              <span>
                {lang === 'ta'
                  ? `மொத்த திட்ட செலவை பூர்த்தி செய்ய ₹${requiredLoanAmount.toLocaleString('en-IN')} கடன் தேவைப்படுகிறது.`
                  : `Funding gap of ₹${requiredLoanAmount.toLocaleString('en-IN')} must be financed via bank term loan.`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>
                {lang === 'ta'
                  ? `உங்களிடம் உள்ள ₹${available.toLocaleString('en-IN')} மூலதனம் போதுமானது! ₹${surplusCapital.toLocaleString('en-IN')} உபரி உள்ளது.`
                  : `Your available capital of ₹${available.toLocaleString('en-IN')} covers 100% of the project with ₹${surplusCapital.toLocaleString('en-IN')} surplus cushion.`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
