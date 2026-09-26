import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Key,
  Layers,
  Info,
  RefreshCw
} from 'lucide-react';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';
import GoogleCompetitorMap from '../competitors/GoogleCompetitorMap';
import CompetitorSidePanel from '../competitors/CompetitorSidePanel';
import GooglePlacesApiModal from '../competitors/GooglePlacesApiModal';
import { 
  TAMIL_NADU_RURAL_CENTER, 
  MOCK_COMPETITORS, 
  fetchNearbyPlaces 
} from '../../services/googlePlacesService';

export default function CompetitorsView({ t, lang, onNavigate }) {
  const { ideaData, competitors: globalCompetitors } = useBusinessIdea();

  // Search radius: 1km, 5km, 10km
  const [radiusKm, setRadiusKm] = useState(5);
  const [selectedThreat, setSelectedThreat] = useState('all');
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [isPlacesModalOpen, setIsPlacesModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('grambiz_google_maps_api_key') || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    } catch {
      return '';
    }
  });

  // Effective center: from ideaData or default Tamil Nadu rural center
  const center = {
    lat: ideaData?.detectedCoords?.lat || TAMIL_NADU_RURAL_CENTER.lat,
    lng: ideaData?.detectedCoords?.lng || TAMIL_NADU_RURAL_CENTER.lng,
    name: ideaData?.location || TAMIL_NADU_RURAL_CENTER.name,
    district: TAMIL_NADU_RURAL_CENTER.district
  };

  // Base list prefers live backend competitors from /api/competitors, fallback to MOCK_COMPETITORS
  const baseCompetitorsList = (globalCompetitors && globalCompetitors.length > 0)
    ? globalCompetitors
    : MOCK_COMPETITORS;

  // Filter competitors strictly within the selected radius (1km, 5km, 10km)
  const competitorsInRadius = baseCompetitorsList.filter(
    (c) => (c.distanceKm !== undefined ? c.distanceKm : 1.0) <= radiusKm + 0.1
  );

  // Filtered by threat for table view
  const tableCompetitors = competitorsInRadius.filter((item) => {
    if (selectedThreat === 'all') return true;
    return item.threat === selectedThreat;
  });


  // Select first competitor if none selected
  useEffect(() => {
    if (competitorsInRadius.length > 0 && !selectedCompetitor) {
      setSelectedCompetitor(competitorsInRadius[0]);
    } else if (selectedCompetitor && !competitorsInRadius.some(c => c.id === selectedCompetitor.id)) {
      setSelectedCompetitor(competitorsInRadius[0] || null);
    }
  }, [radiusKm]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200 mb-2">
              <Radar className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span>{t.competitors.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {t.competitors.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {t.competitors.subtitle}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPlacesModalOpen(true)}
              className="btn btn-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold rounded-xl gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Google Places API Suite</span>
            </button>
          </div>
        </div>

        {/* Active Idea Context Bar */}
        {ideaData && (
          <div className="mt-4 p-3 bg-sky-50/70 border border-sky-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-semibold text-sky-950">
                {lang === 'ta' ? 'ரேடார் கவனம்:' : 'Scanning Vicinity for:'}{' '}
                <strong className="font-extrabold text-sky-900">{ideaData.category}</strong> in{' '}
                <strong className="font-extrabold text-sky-900">{ideaData.location}</strong>
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

        {/* Fast Radius Toggle & Threat Filter in Header */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Radius Selector: 1km, 5km, 10km as explicitly required */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              {t.competitors.radiusFilter}:
            </span>
            <div className="join bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              {[1, 5, 10].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadiusKm(r)}
                  className={`btn btn-xs join-item font-extrabold transition-all ${
                    radiusKm === r
                      ? 'btn-primary text-white shadow-xs'
                      : 'btn-ghost text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              ({competitorsInRadius.length} businesses)
            </span>
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

      {/* Main Split Layout: Side Panel & Map Component */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Side Panel Next to Map (Desktop: 5 cols, Mobile: full width) */}
        <div className="lg:col-span-5 h-[580px]">
          <CompetitorSidePanel
            competitors={competitorsInRadius}
            allCompetitorsCount={baseCompetitorsList.length}
            radiusKm={radiusKm}
            setRadiusKm={setRadiusKm}
            selectedCompetitor={selectedCompetitor}
            onSelectCompetitor={setSelectedCompetitor}
            selectedThreat={selectedThreat}
            setSelectedThreat={setSelectedThreat}
            lang={lang}
            onNavigate={onNavigate}
            onOpenPlacesApiModal={() => setIsPlacesModalOpen(true)}
          />
        </div>

        {/* Map Area with @react-google-maps/api (Desktop: 7 cols) */}
        <div className="lg:col-span-7 h-[580px]">
          <GoogleCompetitorMap
            center={center}
            competitors={competitorsInRadius}
            radiusKm={radiusKm}
            selectedCompetitor={selectedCompetitor}
            onSelectCompetitor={setSelectedCompetitor}
            proposedIdeaTitle={ideaData?.category ? `${ideaData.category} Enterprise` : "Proposed Rural Enterprise"}
            lang={lang}
            apiKey={apiKey}
            onOpenApiKeyModal={() => setIsPlacesModalOpen(true)}
          />
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
              <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-3xl leading-relaxed">
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

      {/* Detailed Competitors Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-slate-800 text-sm">
              {tableCompetitors.length} {t.competitors.identifiedCount} ({radiusKm} km radius)
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Center: <strong className="text-slate-600 font-medium">{center.name}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200/60">
              <tr>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderBusiness}</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderLocation}</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderPricing}</th>
                <th className="py-3.5 px-4">{t.competitors.tableHeaderThreat}</th>
                <th className="py-3.5 px-4 text-right">{t.competitors.tableHeaderAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {tableCompetitors.map((item) => {
                let badgeClass = 'badge-success text-white';
                if (item.threat === 'medium') {
                  badgeClass = 'badge-warning text-slate-900';
                } else if (item.threat === 'high') {
                  badgeClass = 'badge-error text-white';
                }

                const isCurrent = selectedCompetitor?.id === item.id;

                return (
                  <tr 
                    key={item.id} 
                    onClick={() => setSelectedCompetitor(item)}
                    className={`cursor-pointer transition-colors ${
                      isCurrent ? 'bg-sky-50/70' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {lang === 'ta' && item.nameTa ? item.nameTa : item.name}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {lang === 'ta' && item.statusTa ? item.statusTa : item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.distanceText} ({lang === 'ta' && item.addressTa ? item.addressTa : item.address})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 font-bold text-slate-700">
                        <span className="text-amber-500">★</span>
                        <span>{item.rating}</span>
                        <span className="text-slate-400 text-[11px]">({item.userRatingCount})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {item.pricingDesc}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge badge-sm font-bold ${badgeClass}`}>
                        {item.threat.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCompetitor(item);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="btn btn-ghost btn-xs text-sky-700 hover:bg-sky-50 gap-1 font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lang === 'ta' ? 'வரைபடம்' : 'Focus Map'}</span>
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

      {/* Google Places API Modal */}
      <GooglePlacesApiModal
        isOpen={isPlacesModalOpen}
        onClose={() => setIsPlacesModalOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        currentRadiusKm={radiusKm}
        lang={lang}
      />
    </div>
  );
}
