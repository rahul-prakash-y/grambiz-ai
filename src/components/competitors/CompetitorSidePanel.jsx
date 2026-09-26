import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Star, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ChevronRight, 
  Navigation, 
  Clock, 
  Phone,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function CompetitorSidePanel({
  competitors = [],
  allCompetitorsCount = 0,
  radiusKm = 5,
  setRadiusKm,
  selectedCompetitor = null,
  onSelectCompetitor,
  selectedThreat = 'all',
  setSelectedThreat,
  lang = 'en',
  onNavigate,
  onOpenPlacesApiModal
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter competitors based on search term & threat
  const displayList = competitors.filter((item) => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nameTa && item.nameTa.includes(searchQuery)) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.speciality && item.speciality.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesThreat = selectedThreat === 'all' || item.threat === selectedThreat;

    return matchesSearch && matchesThreat;
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Side Panel Header with Radius Toggle */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
                {lang === 'ta' ? 'அருகிலுள்ள வணிகங்கள்' : 'Local Competitors'}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                {displayList.length} {lang === 'ta' ? 'வணிகங்கள் கண்டறியப்பட்டன' : 'enterprises within'} {radiusKm} km
              </span>
            </div>
          </div>

          <button
            onClick={onOpenPlacesApiModal}
            className="btn btn-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-bold rounded-lg gap-1"
            title="Google Places API Integration Status"
          >
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span className="hidden sm:inline">Places API</span>
          </button>
        </div>

        {/* Search Radius Toggle (1km, 5km, 10km) as required */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
              {lang === 'ta' ? 'தேடல் சுற்றளவு:' : 'Search Radius:'}
            </span>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">
              {radiusKm} km ({radiusKm * 1000}m)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
            {[1, 5, 10].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusKm(r)}
                className={`py-1.5 px-2 rounded-lg text-xs font-extrabold transition-all duration-200 ${
                  radiusKm === r
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        {/* Keyword Search & Threat Filter */}
        <div className="mt-3 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ta' ? 'பெயர் அல்லது பொருள் மூலம் தேடுக...' : 'Search by store name or item...'}
              className="input input-sm input-bordered w-full pl-9 pr-3 text-xs rounded-xl bg-white border-slate-200 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          {/* Quick Threat Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-[11px]">
            {[
              { id: 'all', label: lang === 'ta' ? 'அனைத்தும்' : 'All' },
              { id: 'high', label: lang === 'ta' ? 'அதிக போட்டி' : 'High Threat' },
              { id: 'medium', label: lang === 'ta' ? 'மிதமான' : 'Moderate' },
              { id: 'low', label: lang === 'ta' ? 'குறைந்த' : 'Low / Gap' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedThreat(f.id)}
                className={`px-2.5 py-0.5 rounded-lg font-bold shrink-0 transition-colors ${
                  selectedThreat === f.id
                    ? 'bg-slate-800 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Competitors Scrollable List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-h-[560px]">
        {displayList.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Store className="w-8 h-8 mx-auto opacity-40" />
            <p className="text-xs font-semibold">
              {lang === 'ta' 
                ? 'இந்த சுற்றளவில் வணிகங்கள் இல்லை. சுற்றளவை அதிகரிக்கவும்.' 
                : 'No businesses found in this radius. Try selecting 5km or 10km.'}
            </p>
            <button
              onClick={() => {
                setRadiusKm(10);
                setSelectedThreat('all');
                setSearchQuery('');
              }}
              className="btn btn-xs btn-outline border-slate-300 text-slate-600 rounded-lg"
            >
              Reset to 10 km
            </button>
          </div>
        ) : (
          displayList.map((comp) => {
            const isSelected = selectedCompetitor?.id === comp.id;

            let threatBadge = 'bg-amber-100 text-amber-800 border-amber-200';
            let threatText = lang === 'ta' ? 'மிதமான போட்டி' : 'Moderate Threat';

            if (comp.threat === 'high') {
              threatBadge = 'bg-rose-100 text-rose-800 border-rose-200';
              threatText = lang === 'ta' ? 'அதிக போட்டி' : 'High Threat';
            } else if (comp.threat === 'low') {
              threatBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';
              threatText = lang === 'ta' ? 'குறைந்த போட்டி' : 'Low Threat';
            }

            return (
              <div
                key={comp.id}
                onClick={() => onSelectCompetitor(comp)}
                className={`group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-sky-50/70 border-sky-400 ring-2 ring-sky-300/50 shadow-md'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Header: Name & Distance */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                      {lang === 'ta' && comp.nameTa ? comp.nameTa : comp.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {lang === 'ta' && comp.addressTa ? comp.addressTa : comp.address}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-extrabold">
                      {comp.distanceText}
                    </span>
                  </div>
                </div>

                {/* Rating, Category & Threat Pill */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 font-extrabold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{comp.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({comp.userRatingCount})
                    </span>
                  </div>

                  {/* Threat Level */}
                  <span className={`px-2 py-0.5 rounded-md border font-bold text-[10px] ${threatBadge}`}>
                    {threatText}
                  </span>

                  {/* Pricing / Category */}
                  <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                    {comp.pricingDesc}
                  </span>
                </div>

                {/* AI Opportunity Gap Insight */}
                {comp.marketGap && (
                  <div className="mt-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed group-hover:bg-amber-50/60 group-hover:border-amber-200/50 transition-colors">
                    <span className="font-bold text-slate-700 block text-[10px] text-amber-900 mb-0.5">
                      {lang === 'ta' ? 'சந்தை இடைவெளி:' : 'GramBiz Gap Insight:'}
                    </span>
                    {lang === 'ta' && comp.marketGapTa ? comp.marketGapTa : comp.marketGap}
                  </div>
                )}

                {/* Footer Status and Focus Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lang === 'ta' && comp.statusTa ? comp.statusTa : comp.status}
                  </span>

                  <span className="text-sky-700 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[11px]">
                    <span>{lang === 'ta' ? 'வரைபடத்தில் பார்க்க' : 'Locate on Map'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Side Panel Footer Stats */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">
          {lang === 'ta' ? 'மொத்த பகுப்பாய்வு:' : 'Total Scanned:'} <strong className="text-slate-800">{competitors.length}</strong>
        </span>
        <button
          onClick={() => onNavigate('new-idea')}
          className="text-emerald-700 font-bold hover:underline text-[11px] flex items-center gap-1"
        >
          <span>{lang === 'ta' ? 'புதிய பகுதி' : 'Change Center'}</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
