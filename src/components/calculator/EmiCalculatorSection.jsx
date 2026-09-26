import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Percent, 
  IndianRupee, 
  PieChart, 
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function EmiCalculatorSection({
  requiredLoanAmount,
  customLoanAmount,
  setCustomLoanAmount,
  interestRate,
  setInterestRate,
  tenureMonths,
  setTenureMonths,
  t,
  lang,
  projectedMonthlyProfit
}) {
  const [showAmortization, setShowAmortization] = useState(false);
  const [useCustomLoan, setUseCustomLoan] = useState(false);

  // Active principal: either user custom or auto-synced required loan
  const principal = useCustomLoan 
    ? (Number(customLoanAmount) || 0) 
    : (Number(requiredLoanAmount) || 0);

  const rate = Number(interestRate) || 0;
  const tenure = Number(tenureMonths) || 12;

  // Standard EMI calculation in JavaScript
  // Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const { monthlyEmi, totalInterest, totalPayable, principalPct, interestPct, amortizationSchedule } = useMemo(() => {
    if (principal <= 0 || tenure <= 0) {
      return {
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayable: 0,
        principalPct: 100,
        interestPct: 0,
        amortizationSchedule: []
      };
    }

    if (rate <= 0) {
      const emi = Math.round(principal / tenure);
      return {
        monthlyEmi: emi,
        totalInterest: 0,
        totalPayable: principal,
        principalPct: 100,
        interestPct: 0,
        amortizationSchedule: []
      };
    }

    // Monthly interest rate
    const r = (rate / 12) / 100;
    const factor = Math.pow(1 + r, tenure);
    const emi = Math.round((principal * r * factor) / (factor - 1));
    const payable = emi * tenure;
    const interest = Math.max(0, payable - principal);

    const pPct = payable > 0 ? Math.round((principal / payable) * 100) : 100;
    const iPct = Math.max(0, 100 - pPct);

    // Generate yearly amortization breakdown
    const schedule = [];
    let balance = principal;
    const totalYears = Math.ceil(tenure / 12);

    for (let yr = 1; yr <= totalYears; yr++) {
      const monthsInThisYear = Math.min(12, tenure - (yr - 1) * 12);
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let m = 1; m <= monthsInThisYear; m++) {
        const interestForMonth = balance * r;
        const principalForMonth = Math.min(balance, emi - interestForMonth);
        yearInterest += interestForMonth;
        yearPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      schedule.push({
        year: yr,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        balance: Math.round(balance)
      });
    }

    return {
      monthlyEmi: emi,
      totalInterest: interest,
      totalPayable: payable,
      principalPct: pPct,
      interestPct: iPct,
      amortizationSchedule: schedule
    };
  }, [principal, rate, tenure]);

  // Quick Rate presets
  const ratePresets = [
    { label: 'PMEGP (8.5%)', rate: 8.5 },
    { label: 'MUDRA (9.5%)', rate: 9.5 },
    { label: 'PSU Bank (10.5%)', rate: 10.5 },
    { label: 'Commercial (12.0%)', rate: 12.0 },
  ];

  // Quick Tenure presets
  const tenurePresets = [
    { labelEn: '1 Yr (12m)', labelTa: '1 வருடம் (12மா)', months: 12 },
    { labelEn: '2 Yrs (24m)', labelTa: '2 வருடம் (24மா)', months: 24 },
    { labelEn: '3 Yrs (36m)', labelTa: '3 வருடம் (36மா)', months: 36 },
    { labelEn: '5 Yrs (60m)', labelTa: '5 வருடம் (60மா)', months: 60 },
    { labelEn: '7 Yrs (84m)', labelTa: '7 வருடம் (84மா)', months: 84 },
  ];

  // Affordability check
  const isAffordable = projectedMonthlyProfit ? monthlyEmi <= projectedMonthlyProfit * 0.45 : true;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-6">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center font-black shadow-xs">
              <span className="text-xs">03</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <span>{t.calculator.emiSectionTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t.calculator.emiSectionSub}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Calculator className="w-3 h-3 text-teal-600" />
            <span>{lang === 'ta' ? 'நேரலை EMI' : 'Live EMI'}</span>
          </span>
        </div>

        {/* Principal Sync / Custom Controls */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-700 block">
                {lang === 'ta' ? 'கடன் அசல் தொகை (Principal)' : 'Loan Principal Amount (₹)'}
              </span>
              <span className="text-[11px] text-slate-400 block">
                {useCustomLoan 
                  ? (lang === 'ta' ? 'தனிப்பயன் கடன் தொகை அமைக்கப்பட்டுள்ளது' : 'Custom simulation mode active')
                  : (lang === 'ta' ? 'பிரிவு 2-ல் கணக்கிடப்பட்ட கடன் தேவையுடன் தானாக இணைக்கப்பட்டது' : 'Auto-synced to Required Loan from Section 2')}
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {useCustomLoan ? (
                <div className="flex items-center gap-1.5">
                  <div className="relative w-36">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="5000"
                      value={customLoanAmount}
                      onChange={(e) => setCustomLoanAmount(Math.max(0, Number(e.target.value)))}
                      className="input input-xs input-bordered w-full pl-6 pr-1 text-xs font-bold text-slate-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseCustomLoan(false)}
                    className="btn btn-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg border-none"
                    title="Reset to funding gap"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    ₹{principal.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomLoanAmount(principal);
                      setUseCustomLoan(true);
                    }}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
                  >
                    {lang === 'ta' ? 'மாற்று' : 'Customize'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inputs: Interest Rate (%) & Interactive Tenure Slider (Months) */}
        <div className="mt-5 space-y-5">
          {/* 1. Interest Rate (%) */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-emerald-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <Percent className="w-3.5 h-3.5" />
                </div>
                <div>
                  <label htmlFor="interest-rate" className="text-xs font-bold text-slate-800 block">
                    {t.calculator.interestRateLabel}
                  </label>
                  <span className="text-[11px] text-slate-400 block">
                    {lang === 'ta' ? 'ஆண்டு வட்டி விகிதம்' : 'Annual interest rate charged by bank'}
                  </span>
                </div>
              </div>

              {/* Number Input & Presets */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="relative w-24">
                  <input
                    id="interest-rate"
                    type="number"
                    min="1"
                    max="30"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                    className="input input-sm input-bordered w-full pr-6 pl-2 text-xs font-bold text-slate-800 text-right focus:border-emerald-600"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="5"
                max="20"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="range range-xs range-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                <span>5.0%</span>
                <span className="text-emerald-700 font-semibold">{rate}% p.a.</span>
                <span>20.0%</span>
              </div>
            </div>

            {/* Quick Rate Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {ratePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInterestRate(preset.rate)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    rate === preset.rate 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Loan Tenure Slider (Months) - REQUIRED INTERACTIVE SLIDER */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-teal-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <label htmlFor="loan-tenure" className="text-xs font-bold text-slate-800 block">
                    {t.calculator.loanTenureLabel}
                  </label>
                  <span className="text-[11px] text-slate-400 block">
                    {t.calculator.tenureSliderHelp}
                  </span>
                </div>
              </div>

              {/* Number Input & Duration Display */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {(tenure / 12).toFixed(1)} {lang === 'ta' ? 'ஆண்டுகள்' : 'Years'}
                </span>
                <div className="relative w-24">
                  <input
                    id="loan-tenure"
                    type="number"
                    min="6"
                    max="120"
                    step="6"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Math.max(6, Number(e.target.value)))}
                    className="input input-sm input-bordered w-full pr-8 pl-2 text-xs font-bold text-slate-800 text-right focus:border-teal-600"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">m</span>
                </div>
              </div>
            </div>

            {/* REQUIRED: Interactive Slider for Loan Tenure */}
            <div className="pt-2">
              <input
                id="interactive-tenure-slider"
                type="range"
                min="6"
                max="84"
                step="6"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="range range-xs range-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                <span>6m</span>
                <span>24m</span>
                <span className="text-teal-700 font-bold">{tenure} Months</span>
                <span>60m</span>
                <span>84m</span>
              </div>
            </div>

            {/* Quick Tenure Preset Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {tenurePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTenureMonths(preset.months)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    tenure === preset.months 
                      ? 'bg-teal-700 text-white shadow-xs' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {lang === 'ta' ? preset.labelTa : preset.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 DISTINCT, CLEAR SUMMARY CARDS (REQUIRED) */}
        <div className="mt-6 pt-1">
          <div className="text-xs font-extrabold text-slate-700 mb-3 flex items-center justify-between">
            <span>{lang === 'ta' ? 'EMI கணக்கீட்டு சுருக்கம்:' : 'EMI Calculation Results:'}</span>
            <span className="text-[11px] text-slate-400 font-normal">
              {principal > 0 ? `${tenure} monthly installments` : 'No loan required'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Card 1: Monthly EMI (Hero) */}
            <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-700 to-teal-800 text-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                    {t.calculator.monthlyEmi}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center">
                    <IndianRupee className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  ₹{monthlyEmi.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="mt-2 text-[10px] text-emerald-200/90 font-medium">
                {lang === 'ta' ? 'மாதந்தோறும் செலுத்த வேண்டிய தவணை' : 'Payable every month'}
              </div>
            </div>

            {/* Card 2: Total Interest */}
            <div className="rounded-xl p-4 bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-amber-100 uppercase tracking-wider">
                    {t.calculator.totalInterest}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center">
                    <Percent className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  ₹{totalInterest.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="mt-2 text-[10px] text-amber-100/90 font-medium flex items-center justify-between">
                <span>{lang === 'ta' ? 'கடன் மீதான மொத்த வட்டி' : 'Total interest cost'}</span>
                <span className="font-bold">{interestPct}% of total</span>
              </div>
            </div>

            {/* Card 3: Total Amount Payable */}
            <div className="rounded-xl p-4 bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {t.calculator.totalAmountPayable}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center">
                    <PieChart className="w-3.5 h-3.5 text-slate-200" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between">
                <span>{lang === 'ta' ? 'அசல் + வட்டி' : 'Principal + Interest'}</span>
                <span className="font-bold text-slate-300">{tenure} mos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Split Ratio: Principal vs Interest */}
        {totalPayable > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
                {lang === 'ta' ? 'அசல் தொகை' : 'Principal Loan'}: <strong>₹{principal.toLocaleString('en-IN')} ({principalPct}%)</strong>
              </span>
              <span className="text-amber-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                {lang === 'ta' ? 'வட்டி சுமை' : 'Total Interest'}: <strong>₹{totalInterest.toLocaleString('en-IN')} ({interestPct}%)</strong>
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${principalPct}%` }}
                className="bg-slate-800 h-full transition-all duration-300"
              />
              <div 
                style={{ width: `${interestPct}%` }}
                className="bg-amber-500 h-full transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Toggle Amortization Schedule */}
        {amortizationSchedule.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1.5 py-1"
            >
              <span>{showAmortization ? t.calculator.hideAmortization : t.calculator.showAmortization}</span>
              {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAmortization && (
              <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="table table-xs w-full bg-white text-slate-800">
                  <thead className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">
                    <tr>
                      <th className="py-2">{t.calculator.year}</th>
                      <th className="py-2 text-right">{t.calculator.principalPaid}</th>
                      <th className="py-2 text-right">{t.calculator.interestPaid}</th>
                      <th className="py-2 text-right">{t.calculator.remainingBalance}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-medium divide-y divide-slate-100">
                    {amortizationSchedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="font-bold text-slate-700">Year {row.year}</td>
                        <td className="text-right text-emerald-700 font-semibold">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                        <td className="text-right text-amber-700 font-semibold">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                        <td className="text-right text-slate-800 font-bold">₹{row.balance.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Affordability Advice Callout */}
      <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200/80 text-xs flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-slate-600">
          {monthlyEmi > 0 ? (
            isAffordable 
              ? t.calculator.viableAffordable 
              : t.calculator.viableCaution
          ) : (
            lang === 'ta' ? 'கடன் இல்லாததால் மாதாந்திர தவணை சுமை இல்லை.' : 'Zero debt obligation. No monthly EMI commitment required.'
          )}
        </span>
      </div>
    </div>
  );
}
