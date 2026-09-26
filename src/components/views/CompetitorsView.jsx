import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  ShieldAlert, 
  Radar, 
  Compass, 
  ArrowUpRight,
  TrendingDown,
  Filter,
  Eye,
  Sparkles
} from 'lucide-react';
import { mockData } from '../../data/mockData';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';

export default function CompetitorsView({ t, lang, onNavigate }) {
  const { ideaData } = useBusinessIdea();
  const [radius, setRadius] = useState(15);
  const [selectedThreat, setSelectedThreat] = useState('all');

  const filteredCompetitors = mockData.competitorsList.filter(item => {
    if (selectedThreat === 'all') return true;
    return item.threat === selectedThreat;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200 mb-2">
          <Radar className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          <span>{t.competitors.badge}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
          {t.competitors.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          {t.competitors.subtitle}
        </p>

        {/* Active Idea Context Bar */}
        {ideaData && (
          <div className="mt-4 p-3 bg-sky-50/70 border border-sky-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-semibold text-sky-950">
                {lang === 'ta' ? 'ரேடார் கவனம்:' : 'Scanning Vicinity for:'} <strong className="font-extrabold text-sky-900">{ideaData.category}</strong> in <strong className="font-extrabold text-sky-900">{ideaData.location}</strong>
              </span>
            </div>
            <button
              onClick={() => onNavigate('new-idea')}
              className="text-sky-700 font-bold hover:underline text-[11px]"
            >
              {lang === 'ta' ? 'புதிய பகுதி ஆய்வு' : 'Change Location / Category'}
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Radius Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">
              {t.competitors.radiusFilter}:
            </span>
            <div className="join">
              {[5, 15, 25].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`btn btn-xs join-item font-semibold ${
                    radius === r
                      ? 'btn-primary text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* Threat Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex gap-1.5">
              {[
                { id: 'all', labelEn: 'All Threats', labelTa: 'அனைத்தும்' },
                { id: 'low', labelEn: 'Low Threat', labelTa: 'குறைந்த போட்டி' },
                { id: 'medium', labelEn: 'Moderate', labelTa: 'மிதமானது' },
                { id: 'high', labelEn: 'Saturated', labelTa: 'அதிக போட்டி' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedThreat(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedThreat === f.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ta' ? f.labelTa : f.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* High-Value Market Gap Detected Alert */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-sky-950 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t.competitors.gapAlertTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl leading-relaxed">
                {t.competitors.gapAlertText}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('new-idea')}
            className="btn btn-sm bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold border-none rounded-xl shrink-0"
          >
            <span>{lang === 'ta' ? 'இந்த வாய்ப்பை ஆய்வு செய்க' : 'Capitalize on this Gap'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Competitors List Table & Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-slate-800 text-sm">
              {filteredCompetitors.length} {t.competitors.identifiedCount} ({radius} km)
            </span>
          </div>
        </div>

        {/* Responsive Table for Desktop & Cards for Mobile */}
        <div className="overflow-x-auto">
          <table className="table w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200/60">
              <tr>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderBusiness}</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderLocation}</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderCategory}</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderPricing}</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderThreat}</th>
                <th className="py-3.5 px-4 text-right">{t.competitors.tableHeaderAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCompetitors.map((item) => {
                let badgeClass = 'badge-success text-white';
                let threatLabel = t.competitors.threatLow;

                if (item.threat === 'medium') {
                  badgeClass = 'badge-warning text-slate-900';
                  threatLabel = t.competitors.threatMedium;
                } else if (item.threat === 'high') {
                  badgeClass = 'badge-error text-white';
                  threatLabel = t.competitors.threatHigh;
                }

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {lang === 'ta' ? item.statusTa : item.statusEn}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.distance}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {lang === 'ta' ? item.categoryTa : item.categoryEn}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {lang === 'ta' ? item.pricingTa : item.pricing}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge badge-sm font-bold ${badgeClass}`}>
                        {lang === 'ta' ? item.densityTa : item.densityEn}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => onNavigate('new-idea')}
                        className="btn btn-ghost btn-xs text-emerald-700 hover:bg-emerald-50 gap-1 font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lang === 'ta' ? 'அணுகுமுறை' : 'Strategy'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Rural Competitive Advantage Playbook */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-emerald-700" />
          <span>
            {lang === 'ta' ? 'கிராமப்புற போட்டியை வெல்ல AI உத்திகள்' : 'GramBiz AI Strategic Edge for New Entrants'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">
              {lang === 'ta' ? '1. நேரடி உழவர் கொள்முதல்' : '1. Direct Farmer Sourcing'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ta' 
                ? 'தரகர்களைத் தவிர்த்து விவசாயிகளிடமிருந்து நேரடியாக எண்ணெய் வித்துக்களை வாங்குவதன் மூலம் 18% மூலப்பொருள் செலவைக் குறைக்கலாம்.'
                : 'Bypassing wholesale mandi middlemen saves 18% in procurement while giving village farmers ₹150 more per quintal.'
              }
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">
              {lang === 'ta' ? '2. வெளிப்படையான உற்பத்தி' : '2. Visible Pure Processing'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ta'
                ? 'வாடிக்கையாளர் கண் முன்னால் மரச்செக்கு எண்ணெயை பிழிந்து தருவது உடனடி நற்பெயரையும் பிரீமியம் விலையையும் ஈட்டித் தரும்.'
                : 'Live wood-pressing demo in front of buyers builds instant authenticity, allowing a 25% price premium over supermarket brands.'
              }
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">
              {lang === 'ta' ? '3. உபரி புண்ணாக்கு வருமானம்' : '3. Cattle Feed By-Product Monetization'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'ta'
                ? 'எண்ணெய் பிழிந்த பின் கிடைக்கும் புண்ணாக்கை உள்ளூர் பால் உற்பத்தியாளர் சங்கங்களுக்கு விற்று மாதாந்திர மின் கட்டணத்தை ஈடுகட்டலாம்.'
                : 'Selling residual groundnut/sesame oil cake to dairy societies generates ₹22,000/month, covering 100% of electricity bills.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
