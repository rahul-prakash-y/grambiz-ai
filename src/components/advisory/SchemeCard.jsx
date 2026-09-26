import React from 'react';
import TranslatableText from './TranslatableText';
import { 
  Award, 
  ShieldCheck, 
  Check, 
  Landmark, 
  ArrowUpRight, 
  Coins
} from 'lucide-react';

export default function SchemeCard({
  scheme,
  lang = 'en',
  showDual = false,
  onNavigate,
  className = ''
}) {
  if (!scheme) return null;

  return (
    <div 
      className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all card-hover-effect flex flex-col justify-between relative overflow-hidden ${className}`}
      data-scheme-id={scheme.id}
    >
      {/* Top Banner with Scheme Short Code & Nodal Agency */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  {scheme.shortCode}
                </span>
                <span className="badge badge-sm badge-success text-white font-bold">
                  {scheme.subsidyPct}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 block truncate max-w-xs">
                {lang === 'ta' ? (scheme.nodalAgencyTa || scheme.nodalAgency) : scheme.nodalAgency}
              </span>
            </div>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 shrink-0">
            {lang === 'ta' ? 'அரசு மானியம்' : 'Govt Sponsored'}
          </span>
        </div>

        {/* Scheme Full Title */}
        <div className="mt-3">
          <TranslatableText
            text={scheme.name}
            tamilPlaceholder={scheme.tamilPlaceholder}
            lang={lang}
            showDual={showDual}
            className="font-bold text-slate-800 text-sm sm:text-base leading-snug block"
            as="h4"
          />
          <TranslatableText
            text={scheme.description}
            tamilPlaceholder={scheme.tamilDescriptionPlaceholder}
            lang={lang}
            showDual={showDual}
            className="text-xs text-slate-500 font-medium mt-1 leading-relaxed block"
            as="p"
          />
        </div>

        {/* REQUIRED TAGS: 'Eligibility' AND 'Max Subsidy' */}
        <div className="mt-4 space-y-2.5">
          {/* 1. TAG: Max Subsidy */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200">
            <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-[11px] uppercase tracking-wider mb-1">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ta' ? 'அதிகபட்ச மானியம் (Max Subsidy):' : 'Max Subsidy Tag:'}</span>
            </div>
            <TranslatableText
              text={scheme.maxSubsidy}
              tamilPlaceholder={scheme.tamilMaxSubsidyPlaceholder}
              lang={lang}
              showDual={showDual}
              className="text-xs sm:text-sm font-black text-emerald-800 leading-snug block"
              as="div"
            />
          </div>

          {/* 2. TAG: Eligibility */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-600 font-extrabold text-[11px] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>{lang === 'ta' ? 'தகுதி வரம்பு (Eligibility):' : 'Eligibility Tag:'}</span>
            </div>
            <TranslatableText
              text={scheme.eligibility}
              tamilPlaceholder={scheme.tamilEligibilityPlaceholder}
              lang={lang}
              showDual={showDual}
              className="text-xs text-slate-700 font-semibold leading-relaxed block"
              as="div"
            />
          </div>
        </div>

        {/* Financial Highlights & Partner Bank */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">
              {lang === 'ta' ? 'வட்டி விகிதம்' : 'Interest Rate'}
            </span>
            <span className="font-extrabold text-slate-800">{scheme.interestRate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">
              {lang === 'ta' ? 'திட்ட வரம்பு' : 'Target Outlay'}
            </span>
            <span className="font-extrabold text-slate-800">
              {lang === 'ta' ? (scheme.targetOutlayTa || scheme.targetOutlay) : scheme.targetOutlay}
            </span>
          </div>
        </div>

        {/* Key Features List */}
        {scheme.keyFeatures && (
          <ul className="mt-3.5 space-y-1.5 text-xs text-slate-600">
            {scheme.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <TranslatableText
                  text={feat.text}
                  tamilPlaceholder={feat.tamilPlaceholder}
                  lang={lang}
                  showDual={showDual}
                  className="leading-tight block"
                  as="span"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate">
          <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            {lang === 'ta' ? (scheme.bankPartnersTa || scheme.bankPartners) : scheme.bankPartners}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('calculator')}
          className="btn btn-xs btn-primary gap-1 font-bold rounded-lg text-white shrink-0 shadow-xs"
        >
          <span>{lang === 'ta' ? 'ROI கணக்கிடு' : 'Calculate EMI'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
