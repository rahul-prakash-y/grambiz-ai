import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  Percent, 
  Landmark, 
  FileDown, 
  CheckCircle, 
  Sparkles, 
  Coins, 
  Clock, 
  TrendingUp,
  Building,
  RefreshCw
} from 'lucide-react';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';

export default function CalculatorView({ t, lang, onNavigate }) {
  const { ideaData } = useBusinessIdea();
  const initInv = Number(ideaData?.investment) || 250000;

  const [machinery, setMachinery] = useState(Math.round(initInv * 0.55));
  const [infrastructure, setInfrastructure] = useState(Math.round(initInv * 0.15));
  const [workingCapital, setWorkingCapital] = useState(Math.round(initInv * 0.30));
  const [monthlySales, setMonthlySales] = useState(Math.round(initInv * 0.70));
  const [monthlyExpenses, setMonthlyExpenses] = useState(Math.round(initInv * 0.45));
  const [selectedScheme, setSelectedScheme] = useState('pmegp-special');
  const [exported, setExported] = useState(false);

  // Sync if ideaData changes
  useEffect(() => {
    if (ideaData?.investment) {
      const inv = Number(ideaData.investment);
      setMachinery(Math.round(inv * 0.55));
      setInfrastructure(Math.round(inv * 0.15));
      setWorkingCapital(Math.round(inv * 0.30));
      setMonthlySales(Math.round(inv * 0.70));
      setMonthlyExpenses(Math.round(inv * 0.45));
    }
  }, [ideaData?.investment, ideaData?.category]);

  // Scheme configurations
  const schemes = {
    'pmegp-special': {
      nameEn: 'PMEGP Rural (SC/ST/OBC/Women/Ex-Ser - 35% Subsidy)',
      nameTa: 'PMEGP கிராமப்புறம் (SC/ST/OBC/பெண்கள் - 35% மானியம்)',
      subsidyRate: 0.35,
      promoterRate: 0.05,
    },
    'pmegp-gen': {
      nameEn: 'PMEGP Rural General (25% Subsidy)',
      nameTa: 'PMEGP கிராமப்புற பொதுப் பிரிவு (25% மானியம்)',
      subsidyRate: 0.25,
      promoterRate: 0.10,
    },
    'pmfme': {
      nameEn: 'PMFME Food Processing Scheme (35% Subsidy, Max ₹10L)',
      nameTa: 'PMFME உணவு பதப்படுத்துதல் (35% மானியம், அதிகபட்சம் ₹10L)',
      subsidyRate: 0.35,
      promoterRate: 0.10,
    },
    'standard': {
      nameEn: 'Standard Commercial Bank Mudra Loan (0% Grant)',
      nameTa: 'நிலையான வணிக வங்கி முத்ரா கடன் (0% மானியம்)',
      subsidyRate: 0.0,
      promoterRate: 0.15,
    }
  };

  const currentScheme = schemes[selectedScheme];

  // Financial calculations
  const totalCost = machinery + infrastructure + workingCapital;
  const subsidyAmount = Math.round(totalCost * currentScheme.subsidyRate);
  const promoterEquity = Math.round(totalCost * currentScheme.promoterRate);
  const bankLoanRequired = Math.max(0, totalCost - subsidyAmount - promoterEquity);

  const monthlyNet = monthlySales - monthlyExpenses;
  const annualNet = monthlyNet * 12;

  // Payback period in months
  const paybackMonths = monthlyNet > 0 ? (totalCost / monthlyNet).toFixed(1) : 0;
  // ROI percentage
  const roiPercent = totalCost > 0 ? ((annualNet / totalCost) * 100).toFixed(1) : 0;

  // Approx monthly loan EMI at 8.5% for 5 years (60 months)
  const monthlyInterestRate = 0.085 / 12;
  const emi = bankLoanRequired > 0 
    ? Math.round((bankLoanRequired * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, 60)) / (Math.pow(1 + monthlyInterestRate, 60) - 1))
    : 0;

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.calculator.badge}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
          {t.calculator.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          {t.calculator.subtitle}
        </p>
      </div>

      {/* Synced Idea Banner */}
      {ideaData && (
        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-emerald-950 block">
                {lang === 'ta' ? 'வணிக யோசனை வழிகாட்டியுடன் இணைக்கப்பட்டுள்ளது' : 'Linked to Active Wizard Idea'}: <strong className="text-emerald-900">{ideaData.category}</strong> in <strong className="text-emerald-900">{ideaData.location}</strong>
              </span>
              <span className="text-emerald-700">
                {lang === 'ta' 
                  ? `திட்டமிட்ட மூலதனம்: ₹${Number(ideaData.investment).toLocaleString('en-IN')}` 
                  : `Configured capital: ₹${Number(ideaData.investment).toLocaleString('en-IN')} (Machinery 55%, Infrastructure 15%, Working Capital 30%)`}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('new-idea')}
            className="btn btn-xs bg-white hover:bg-emerald-100 text-emerald-800 border-emerald-300 font-bold rounded-lg shrink-0"
          >
            {lang === 'ta' ? 'வழிகாட்டியைத் திருத்து' : 'Edit in Wizard'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Sliders & Scheme Selector (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-slate-800 font-bold text-sm">
            <span className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              {lang === 'ta' ? 'திட்ட செலவு விவரங்கள்' : 'Project Cost & Operational Inputs'}
            </span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
              Live Calc
            </span>
          </div>

          {/* Scheme Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {t.calculator.schemeLabel}
            </label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="select select-bordered select-sm w-full text-xs font-semibold focus:border-emerald-600"
            >
              {Object.entries(schemes).map(([key, val]) => (
                <option key={key} value={key}>
                  {lang === 'ta' ? val.nameTa : val.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* 1. Machinery Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{t.calculator.machineryCost}</span>
              <span className="font-extrabold text-slate-900">₹{machinery.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="800000"
              step="10000"
              value={machinery}
              onChange={(e) => setMachinery(Number(e.target.value))}
              className="range range-xs range-primary"
            />
          </div>

          {/* 2. Shed / Infrastructure Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{t.calculator.infrastructureCost}</span>
              <span className="font-extrabold text-slate-900">₹{infrastructure.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="300000"
              step="5000"
              value={infrastructure}
              onChange={(e) => setInfrastructure(Number(e.target.value))}
              className="range range-xs range-secondary"
            />
          </div>

          {/* 3. Working Capital */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{t.calculator.workingCapital}</span>
              <span className="font-extrabold text-slate-900">₹{workingCapital.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="30000"
              max="400000"
              step="10000"
              value={workingCapital}
              onChange={(e) => setWorkingCapital(Number(e.target.value))}
              className="range range-xs range-accent"
            />
          </div>

          <div className="pt-2 border-t border-slate-100" />

          {/* 4. Expected Monthly Sales */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{t.calculator.monthlyRevenue}</span>
              <span className="font-extrabold text-emerald-700">₹{monthlySales.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="500000"
              step="5000"
              value={monthlySales}
              onChange={(e) => setMonthlySales(Number(e.target.value))}
              className="range range-xs range-primary"
            />
          </div>

          {/* 5. Monthly Operating Costs */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">{t.calculator.monthlyCost}</span>
              <span className="font-extrabold text-rose-600">₹{monthlyExpenses.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="30000"
              max="400000"
              step="5000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="range range-xs"
            />
          </div>
        </div>

        {/* Right: Financial Breakdown Card (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm">
                {t.calculator.summaryTitle}
              </span>
              <span className="badge badge-sm badge-success text-white font-bold">
                {Math.round(currentScheme.subsidyRate * 100)}% {lang === 'ta' ? 'மானியம்' : 'Subsidy'}
              </span>
            </div>

            {/* Financial Rows */}
            <div className="space-y-3 text-xs">
              {/* Total Project Cost */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-600">{t.calculator.totalProjectCost}</span>
                <span className="text-base font-extrabold text-slate-900">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Subsidy Grant Deduction */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-900">
                <div>
                  <span className="font-bold block">{t.calculator.subsidyDeduction}</span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {lang === 'ta' ? 'அரசு வழங்கும் இலவச உதவித்தொகை' : 'Non-repayable Govt Free Grant'}
                  </span>
                </div>
                <span className="text-base font-extrabold text-emerald-700">
                  + ₹{subsidyAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Promoter Own Equity */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-bold text-slate-700">{t.calculator.ownEquity}</span>
                  <span className="text-[11px] text-slate-400 block">
                    {lang === 'ta' ? 'தொழில் முனைவோரின் சொந்த பங்கு' : 'Promoter contribution'}
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-800">
                  ₹{promoterEquity.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Bank Loan Required */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-950">
                <div>
                  <span className="font-bold block">{t.calculator.bankLoan}</span>
                  <span className="text-[11px] text-sky-700 font-medium">
                    {lang === 'ta' ? `மாத தவணை (EMI): ~₹${emi.toLocaleString('en-IN')} (5 ஆண்டுகள்)` : `Estimated EMI: ~₹${emi.toLocaleString('en-IN')}/mo (60 mos)`}
                  </span>
                </div>
                <span className="text-base font-extrabold text-sky-700">
                  ₹{bankLoanRequired.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Bottom 3 KPI Badges: Profit, Payback, ROI */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  {t.calculator.monthlyNetProfit}
                </span>
                <span className="text-sm font-extrabold text-emerald-700 block mt-0.5">
                  ₹{monthlyNet.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  {t.calculator.breakEvenPeriod}
                </span>
                <span className="text-sm font-extrabold text-slate-800 block mt-0.5">
                  {paybackMonths} {lang === 'ta' ? 'மாதங்கள்' : 'mos'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-center border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  {t.calculator.roiAnnual}
                </span>
                <span className="text-sm font-extrabold text-sky-700 block mt-0.5">
                  {roiPercent}%
                </span>
              </div>
            </div>

            {/* Export Button */}
            <div className="pt-2">
              <button
                onClick={handleExport}
                className="w-full btn btn-primary gap-2 font-bold shadow-md rounded-xl text-white"
              >
                {exported ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>{lang === 'ta' ? 'அறிக்கை பதிவிறக்கப்பட்டது!' : 'Bank Proposal PDF Exported!'}</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4" />
                    <span>{t.calculator.printReportBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bank Tie-up Guidance Box */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <Landmark className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 space-y-1">
              <span className="font-bold text-emerald-950 block">
                {lang === 'ta' ? 'வங்கி கடன் வழிகாட்டுதல்' : 'PMEGP / Mudra Loan Submission Tip'}
              </span>
              <p className="leading-relaxed">
                {lang === 'ta'
                  ? 'கல்லுப்பட்டி ஸ்டேட் பேங்க் ஆஃப் இந்தியா (SBI) கிளையில் PMEGP விண்ணப்பங்கள் விரைவாக செயலாக்கப்படுகின்றன. விரிவான திட்ட அறிக்கையை (DPR) உடன் இணைக்கவும்.'
                  : 'SBI Kallupatti & Tamil Nadu Grama Bank branches support direct online PMEGP portal integration with 0% collateral up to ₹10 Lakh.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
